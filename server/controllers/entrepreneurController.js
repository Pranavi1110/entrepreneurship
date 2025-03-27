// server/controllers/entrepreneurController.js
const Entrepreneur = require('../models/Entrepreneur');

exports.createEntrepreneur = async (req, res) => {
  try {
    const newEntrepreneur = new Entrepreneur(req.body);
    const savedEntrepreneur = await newEntrepreneur.save();
    res.status(201).json(savedEntrepreneur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    res.status(200).json(entrepreneurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};