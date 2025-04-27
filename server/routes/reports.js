
const express = require('express');
const router = express.Router();
const Entrepreneur = require('../models/Entrepreneur');

// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() }); // or use diskStorage
router.post('/entrepreneurs', async (req, res) => {
  try {
    const { candidateName, enterpriseName, rollNo, academicYear, certificateText } = req.body;

    if (!candidateName || !enterpriseName || !rollNo || !academicYear || !certificateText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save this data into your database
    const entrepreneur = new Entrepreneur({
      candidateName,
      enterpriseName,
      rollNo,
      academicYear,
      certificate: certificateText  // notice: storing certificateText into 'certificate' field if needed
    });

    await entrepreneur.save();

    res.status(201).json({ message: "Entrepreneur created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// router.post('/entrepreneurs',  async (req, res) => {
//   try {
//     console.log(req.body);
//     const {
//       candidateName,
//       enterpriseName,
//       rollNo,
//       address,
//       email,
//       phone,
//       dinPan,
//       establishmentPeriod,
//       websiteUrl
//     } = req.body;

  

//     const newEntrepreneur = new Entrepreneur({
//       candidateName,
//       enterpriseName,
//       rollNo,
//       address,
//       email,
//       phone,
//       dinPan,
//       establishmentPeriod,
//       websiteUrl // Save the file buffer as base64 or store in cloud
//     });
 
//     await newEntrepreneur.save();
//     res.status(201).json({ message: 'Entrepreneur registered successfully' });
//   } catch (error) {
//     console.error('Error registering entrepreneur:', error);
//     res.status(400).json({ error: error.message });
//   }
// });


// Admin-only: Get Reports
router.get('/entrepreneurs/:id', async (req, res) => {
  try {
    // const userId = req.auth?.userId;
    const userId = req.params;
    console.log('userId:', userId);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (userId.id !== process.env.ADMIN_USER_ID) {
      return res.status(403).json({ error: 'Forbidden: Not an admin' });
    }

    const { year } = req.query;
    const reports = year
      ? await Entrepreneur.find({ establishmentPeriod: year })
      : await Entrepreneur.find();

    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
