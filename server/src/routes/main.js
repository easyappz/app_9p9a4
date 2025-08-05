const express = require('express');
const mongoose = require('mongoose');
const { saveCalculation, getHistory } = require('@src/controllers/calculationController');

/**
 * Пример создания модели в базу данных
 */
// const MongoTestSchema = new mongoose.Schema({
//   value: { type: String, required: true },
// });

// const MongoModelTest = mongoose.model('Test', MongoTestSchema);

// const newTest = new MongoModelTest({
//   value: 'test-value',
// });

// newTest.save();

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/calculations - Save a calculation
router.post('/calculations', saveCalculation);

// GET /api/calculations - Get calculation history
router.get('/calculations', getHistory);

module.exports = router;
