// server.js
require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const batchRoutes   = require('./routes/batches');
const testRoutes    = require('./routes/tests');
const chapterRoutes = require('./routes/chapters');

const app = express();
app.use(cors());
app.use(express.json());

// ── Connect to MongoDB ──────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()  => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/batches',   batchRoutes);
app.use('/api/tests',     testRoutes);
app.use('/api/chapters',  chapterRoutes);

// ── Start server ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
