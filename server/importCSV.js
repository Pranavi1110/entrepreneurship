const fs = require('fs');
const csv = require('csv-parser');
const Student = require('./models/Student');
const axios = require('axios'); // for role fetching if needed
const cheerio=require('cheerio');

async function fetchRoleFromGoogle(name) {
  try {
    const query = `${name} site:linkedin.com/in`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    // Use allorigins to bypass CORS
    const response = await axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(googleSearchUrl)}`);

    const $ = cheerio.load(response.data);

    // First result title
    const firstResultTitle = $("h3").first().text();

    if (firstResultTitle.includes('-')) {
      const role = firstResultTitle.split('-')[1].trim();
      return role;
    } else {
      return "Role not found";
    }

  } catch (error) {
    console.error("Error fetching role from Google:", error.message);
    return "N/A";
  }
}

function generateLinkedInUrl(name) {
  const nameParts = name.trim().split(/\s+/);
  // const includesVNR = nameParts.some((part) => part.toLowerCase() === "vnr");
  const filteredParts = nameParts.filter(
    (part) => part.toLowerCase() !== "vnr"
  );
  const firstName = filteredParts[0];
  const lastName = filteredParts.length > 1 ? filteredParts[filteredParts.length - 1] : "";
  const keyword = `${firstName}${lastName ? "+" + lastName : ""}${"+VNR"}`;
  return `https://www.linkedin.com/search/results/people/?keywords=${keyword}`;
}

async function importCSV(filePath) {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const rollNoPrefix = data.rollNo.slice(0, 2); // Get the first two digits of roll number
        const passedOutYear = 2000 + parseInt(rollNoPrefix) + 4;
        results.push({
          rollNo: data.rollNo,
          name: data.name,
          linkedinUrl: '', // temporarily empty
          role: '',
          passedOutYear: passedOutYear
        });
      })
      .on('end', async () => {
        try {
          console.log(results);
          const insertedStudents = await Student.insertMany(results);
          console.log("Students inserted!");

          // Now update LinkedIn URL and Role for each student
          for (const student of insertedStudents) {
            const linkedinUrl = generateLinkedInUrl(student.name);
            // Optional: Fetch role from Bing
            const role = await fetchRoleFromGoogle(student.name);

            await Student.findByIdAndUpdate(student._id, {
              linkedinUrl: linkedinUrl,
              role: role
            });
            // const role=fetchRoleFromBing(student.name);

            
          }

          console.log("LinkedIn URLs updated successfully");
          resolve();
        } catch (err) {
          console.error("Error importing data:", err);
          reject(err);
        }
      });
  });
}

module.exports = importCSV;

