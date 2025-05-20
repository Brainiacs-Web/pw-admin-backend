// models/Chapter.js
const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  testId:   { type: String, ref: 'Test' },
  subject:  String,
  chapters: [String]
});

module.exports = mongoose.model('Chapter', chapterSchema);
