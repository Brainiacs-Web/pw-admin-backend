// models/Batch.js
const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  createdAt: { type: Date,   default: Date.now }
});

module.exports = mongoose.model('Batch', batchSchema);
