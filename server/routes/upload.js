const express = require('express');
const router = express.Router();
const Entrepreneur = require('../models/Entrepreneur');
const multer = require('multer');
const importCSV = require('../importCSV');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    try {
      await importCSV(req.file.path);
      res.json({ message: 'CSV Imported Successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Import failed' });
    }
  });
  module.exports=router;