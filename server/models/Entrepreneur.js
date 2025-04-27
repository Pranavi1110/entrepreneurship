// server/models/Entrepreneur.js
const mongoose = require('mongoose');

const entrepreneurSchema = new mongoose.Schema({
  rollNo:{type:String,required:true},
  candidateName: { type: String, required: true },
  academicYear:{
    type:String
  },
  enterpriseName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String},
  phone: { type: String, required: true },
  dinPan: { type: String },
  establishmentPeriod: { type: String },
  websiteUrl: { type: String},
}, { timestamps: true });

module.exports = mongoose.model('entrepreneur', entrepreneurSchema);