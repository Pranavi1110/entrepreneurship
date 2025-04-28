const express = require('express');
const Entrepreneur = require('../models/Entrepreneur');

const router = express.Router();

// Get all entrepreneurs
router.get('/', async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    console.log('Fetched entrepreneurs:', entrepreneurs); // Add log to check the data
    res.json(entrepreneurs);
  } catch (err) {
    console.error(err);  // Log any errors
    res.status(500).json({ message: err.message });
  }
});

// Delete entrepreneur by candidateName
router.delete('/:candidateName', async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findOneAndDelete({ candidateName: req.params.candidateName });
    if (!entrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }
    res.json({ message: 'Entrepreneur deleted successfully' });
  } catch (err) {
    console.error(err);  // Log any errors
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;