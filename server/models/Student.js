const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  linkedinUrl: {
    type: String,
    trim: true
  },
  // role: {
  //   type: String,
  //   trim: true
  // },
  passedOutYear: {
    type: Number
  }
});

module.exports = mongoose.model('student', studentSchema);
