const mongoose = require('mongoose');

const CalculationSchema = new mongoose.Schema({
  expression: { type: String, required: true },
  result: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Calculation = mongoose.model('Calculation', CalculationSchema);

module.exports = Calculation;
