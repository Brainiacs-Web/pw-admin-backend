// routes/chapters.js
const express = require('express');
const Chapter = require('../models/Chapter');

const router = express.Router();

// POST /api/chapters/:testId/:subject  → add chapter
router.post('/:testId/:subject', async (req, res) => {
  const { testId, subject } = req.params;
  const { chapterName }     = req.body;
  await Chapter.findOneAndUpdate(
    { testId, subject },
    { $addToSet: { chapters: chapterName } },
    { upsert: true }
  );
  res.status(201).json({ message: 'Chapter added' });
});

// GET /api/chapters/:testId/:subject   → list chapters
router.get('/:testId/:subject', async (req, res) => {
  const { testId, subject } = req.params;
  const doc = await Chapter.findOne({ testId, subject });
  res.json(doc?.chapters || []);
});

module.exports = router;
