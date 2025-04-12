const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    title: String,
    description: String,
    year: String
});

module.exports = mongoose.model('Report', ReportSchema);