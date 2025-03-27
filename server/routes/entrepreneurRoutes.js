// server/routes/entrepreneurRoutes.js
const express = require('express');
const { createEntrepreneur, getAllEntrepreneurs } = require('../controllers/entrepreneurController');

const router = express.Router();

router.post('/entrepreneurs', createEntrepreneur);
router.get('/entrepreneurs', getAllEntrepreneurs);

module.exports = router;