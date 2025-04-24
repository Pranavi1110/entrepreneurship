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
  websiteUrl: { type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/.test(v);
      },
      message: "Enter a valid URL!",
    },},
}, { timestamps: true });

module.exports = mongoose.model('Entrepreneur', entrepreneurSchema);