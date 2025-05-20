// models/AnswerMap.js
const mongoose = require('mongoose');

const answerMapSchema = new mongoose.Schema({
  batchId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', unique: true },
  answersMap: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('AnswerMap', answerMapSchema);
