const Calculation = require('@src/models/Calculation');

// Save a new calculation
exports.saveCalculation = async (req, res) => {
  try {
    const { expression, result } = req.body;
    if (!expression || result === undefined) {
      return res.status(400).json({ error: 'Expression and result are required' });
    }
    const calculation = new Calculation({ expression, result });
    const savedCalculation = await calculation.save();
    res.status(201).json(savedCalculation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get calculation history
exports.getHistory = async (req, res) => {
  try {
    const calculations = await Calculation.find().sort({ createdAt: -1 });
    res.status(200).json(calculations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
