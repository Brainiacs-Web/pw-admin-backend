// routes/tests.js
const express  = require('express');
const mongoose = require('mongoose');
const Test     = require('../models/Test');
const AnswerMap = require('../models/AnswerMap');

const router = express.Router();

// POST /api/tests       → create a test
router.post('/', async (req, res) => {
  const { testName, batch, testDuration, subjects, scheduledAt } = req.body;
  await Test.create({
    _id: testName,
    testName,
    batch: mongoose.Types.ObjectId(batch),
    testDuration,
    subjects,
    scheduledAt
  });
  res.status(201).json({ message: 'Test created' });
});

// GET /api/tests        → list all tests
router.get('/', async (req, res) => {
  const tests = await Test.find().populate('batch');
  res.json(tests);
});

// POST /api/tests/:id/publish → publish test
router.post('/:id/publish', async (req, res) => {
  await Test.findByIdAndUpdate(req.params.id, {
    published:   true,
    publishedAt: new Date()
  });
  res.json({ message: 'Published' });
});

// DELETE /api/tests/:id → delete test
router.delete('/:id', async (req, res) => {
  await Test.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// POST /api/tests/:testId/subjects/:subjectName/questions
//   → add a question under that subject
router.post('/:testId/subjects/:subjectName/questions', async (req, res) => {
  const { testId, subjectName } = req.params;
  const qData = req.body;  // same shape as your front-end data
  const test  = await Test.findById(testId);
  let subject = test.subjectDocs.find(s => s.subjectName === subjectName);

  if (!subject) {
    subject = { subjectName, questions: [] };
    test.subjectDocs.push(subject);
  }

  const questionId = new mongoose.Types.ObjectId().toString();
  subject.questions.push({ questionId, ...qData });
  await test.save();

  // update AnswerMap
  const batchId = test.batch;
  const mapKey  = `answersMap.${subjectName}.${questionId}`;
  const mapVal  = qData.questionType === 'MCQ'
    ? qData.correctAnswer
    : qData.answer;

  await AnswerMap.findOneAndUpdate(
    { batchId },
    { $set: { [mapKey]: mapVal } },
    { upsert: true }
  );

  res.status(201).json({ message: 'Question added' });
});

module.exports = router;
