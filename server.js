const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const batchRoutes = require('./routes/batches');
const chapterRoutes = require('./routes/chapters');
app.use('/api/batches', batchRoutes);
app.use('/api/chapters', chapterRoutes);

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Root route (for index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'your-default-mongo-uri-here';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
