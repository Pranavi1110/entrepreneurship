const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Student = require('./models/Student');

// Replace with your MongoDB Atlas connection string
const uri = 'mongodb+srv://:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  importCSV();
})
.catch((err) => console.error("MongoDB connection error:", err));

function importCSV() {
  const results = [];

  fs.createReadStream('students.csv')
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      try {
        // Insert all student documents
        await Student.insertMany(results);
        console.log("Data imported successfully");
      } catch (err) {
        console.error("Error importing data:", err);
      } finally {
        mongoose.disconnect();
      }
    });
}
