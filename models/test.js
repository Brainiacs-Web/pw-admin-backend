// models/Test.js
const mongoose = require('mongoose');

const questionSubSchema = new mongoose.Schema({
  questionId:    String,
  question:      String,
  questionImage: String,
  questionType:  String,
  options:       [String],      // MCQ options
  correctAnswer: String,        // for MCQ
  answer:        String,        // for integer
  solution:      String,
  solutionImage: String,
  addedAt:       { type: Date, default: Date.now }
});

const subjectSchema = new mongoose.Schema({
  subjectName: String,
  questions:   [questionSubSchema]
});

const testSchema = new mongoose.Schema({
  _id:          String,            // use testName as ID
  testName:     String,
  batch:        { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  testDuration: Number,
  subjects:     [String],          // for dropdowns
  scheduledAt:  Date,
  published:    { type: Boolean, default: false },
  publishedAt:  Date,
  createdAt:    { type: Date, default: Date.now },
  subjectDocs:  [subjectSchema]
});

module.exports = mongoose.model('Test', testSchema);
