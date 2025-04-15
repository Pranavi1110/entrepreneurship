const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  slNo: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  htNo: {
    type: String,
    required: true,
    unique: true
  },
  linkedinUrl: {
    type: String
  },
  role: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', StudentSchema);