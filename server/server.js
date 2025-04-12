const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reportRoutes = require('./routes/reports'); // ✅ Correct route import

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/entrepreneurDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.log("Database connection error:", err));


app.use('/api', reportRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
