require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clerk = require('@clerk/express'); // Corrected import'

const app = express();
const reportRoutes = require('./routes/reports');
const studentRoutes = require('./routes/students');
const uploadRoutes=require('./routes/upload')
// app.use(clerk.expressWithAuth());
// Middlewares
app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow your frontend
//   credentials: true               // Important if you're using Clerk (auth headers/cookies)
// }));
// app.use(ClerkExpressWithAuth()); 
app.use(express.json());

// Corrected middleware usage

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB connection error:", err));

// Routes
app.use('/api', reportRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/upload-csv',uploadRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


 // Temp upload folder





