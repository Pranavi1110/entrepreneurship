// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ slNo: 1 });
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new student
router.post('/', async (req, res) => {
  const { slNo, name, htNo, linkedinUrl, role } = req.body;

  try {
    const newStudent = new Student({
      slNo,
      name,
      htNo,
      linkedinUrl,
      role
    });

    const student = await newStudent.save();
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  const { slNo, name, htNo, linkedinUrl, role } = req.body;
  
  // Build student object
  const studentFields = {};
  if (slNo) studentFields.slNo = slNo;
  if (name) studentFields.name = name;
  if (htNo) studentFields.htNo = htNo;
  if (linkedinUrl !== undefined) studentFields.linkedinUrl = linkedinUrl;
  if (role !== undefined) studentFields.role = role;
  
  try {
    let student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Update
    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: studentFields },
      { new: true }
    );
    
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    await Student.findByIdAndRemove(req.params.id);
    
    res.json({ message: 'Student removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Bulk insert students
router.post('/bulk', async (req, res) => {
  try {
    await Student.insertMany(req.body);
    res.json({ message: 'Students added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;