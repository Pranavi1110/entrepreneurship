const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node'); // Corrected import
require('dotenv').config();

const reportRoutes = require('./routes/reports');
const studentRoutes = require('./routes/students');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
// app.use(ClerkExpressWithAuth()); // Corrected middleware usage

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/entrepreneurDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB connection error:", err));

// Routes
app.use('/api', reportRoutes);
app.use('/api/students', studentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));