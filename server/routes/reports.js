const express = require('express');
const router = express.Router();
const Entrepreneur = require('../models/Entrepreneur'); // Import Entrepreneur Model

// API to register an entrepreneur
router.post('/entrepreneurs', async (req, res) => {
    try {
        const newEntrepreneur = new Entrepreneur(req.body);
        await newEntrepreneur.save();
        res.status(201).json({ message: 'Entrepreneur registered successfully' });
    } catch (error) {
        console.error('Error registering entrepreneur:', error);
        res.status(400).json({ error: error.message });
    }
});

// API to fetch reports based on year
router.get('/reports', async (req, res) => {
    try {
        const { year } = req.query;
        let reports;

        if (year) {
            reports = await Entrepreneur.find({ establishmentPeriod: year });
        } else {
            reports = await Entrepreneur.find();
        }

        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
