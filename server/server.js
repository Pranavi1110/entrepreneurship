// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reportRoutes = require('./routes/reports'); 
const studentRoutes = require('./routes/students'); // Add this line

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/entrepreneurDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.log("Database connection error:", err));

// Use routes
app.use('/api', reportRoutes);
app.use('/api/students', studentRoutes); // Add this line

app.listen(5000, () => console.log('Server running on port 5000'));