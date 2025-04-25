const fs = require('fs');
const csv = require('csv-parser');
const Student = require('./models/Student');

async function importCSV(filePath) {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Map CSV headers to schema fields
        results.push({
          rollNo: data.rollNo,           // mapped from htNo
          name: data.name,             // as-is
          linkedinUrl: '',             // optional: add default values
          role: '',
          passedOutYear: ''
        });
      })
      .on('end', async () => {
        try {
          console.log(results);
          await Student.insertMany(results);
          console.log("Data imported successfully");
          resolve();
        } catch (err) {
          console.error("Error importing data:", err);
          reject(err);
        }
      });
  });
}

module.exports = importCSV;
