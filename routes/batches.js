// routes/batches.js
const express = require('express');
const Batch   = require('../models/Batch');

const router = express.Router();

// GET /api/batches  → list all
router.get('/', async (req, res) => {
  const batches = await Batch.find().sort('-createdAt');
  res.json(batches);
});

// POST /api/batches → create new
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const batch = await Batch.create({ name });
  res.status(201).json(batch);
});

module.exports = router;
