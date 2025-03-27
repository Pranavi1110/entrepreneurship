// server/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const entrepreneurRoutes = require('./routes/entrepreneurRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api', entrepreneurRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});