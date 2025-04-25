const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  linkedinUrl: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  passedOutYear: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
