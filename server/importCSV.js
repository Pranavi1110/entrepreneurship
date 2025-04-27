const fs = require('fs');
const csv = require('csv-parser');
const Student = require('./models/Student');
const axios = require('axios'); // for role fetching if needed
const cheerio=require('cheerio');

// async function fetchRoleFromGoogle(name, rollNo) {
//   try {
//     // Build a more specific search query with college and graduation year context
//     const yearPrefix = rollNo.slice(0, 2);
//     const graduationYear = 2000 + parseInt(yearPrefix) + 4;
    
//     // Create a search query that's more likely to find the right person
//     const query = `${name} VNR ${graduationYear} site:linkedin.com/in`;
//     const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
//     // Use a proxy service to avoid direct scraping blocks
//     const response = await axios.get(googleSearchUrl, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//       },
//       timeout: 5000 // Set a reasonable timeout
//     });

//     const $ = cheerio.load(response.data);
    
//     // Multiple selectors to try for finding the role description in Google search results
//     const selectors = [
//       "div.VwiC3b.yXK7lf.MUxGbd.yDYNvb.lyLwlc.lEBKkf span",
//       "span.VwiC3b.yXK7lf.MUxGbd.yDYNvb.lyLwlc",
//       "div.BNeawe.s3v9rd.AP7Wnd", // Alternate format
//       "div.BNeawe.vvjwJb.AP7Wnd"  // Another alternate format
//     ];
    
//     let snippet = '';
    
//     // Try each selector until we find something
//     for (const selector of selectors) {
//       snippet = $(selector).first().text().trim();
//       if (snippet) break;
//     }

//     if (!snippet) {
//       return "Role not found";
//     }
    
//     // Different patterns to extract role information
//     const patterns = [
//       /- ([^·]+) ·/,                    // Standard LinkedIn format: "Name - Role · Company"
//       /- ([^·]+) at ([^·]+)/i,          // "Name - Role at Company"
//       /([^·]+) at ([^·]+)/i,            // "Role at Company" 
//       /([^·]+) \| ([^·]+)/              // "Role | Company"
//     ];
    
//     // Try each pattern
//     for (const pattern of patterns) {
//       const match = snippet.match(pattern);
//       if (match && match[1]) {
//         return match[1].trim();
//       }
//     }
    
//     // If no pattern matches but we have a snippet, return a truncated version
//     if (snippet.length > 50) {
//       return snippet.substring(0, 50) + "...";
//     }
    
//     return snippet || "Role not found";
//   } catch (error) {
//     console.error(`Error fetching role for ${name}: ${error.message}`);
//     return "N/A"; // Consistent with your existing data
//   }
// }


// const axios = require('axios');

async function fetchRoleFromDerrick(name, rollNo) {
  try {
    // Your API key from derrick-app
    const API_KEY = '0JTM4XKPW8H6VJ6Z';
    
    // Make the API request to derrick-app
    const response = await axios.post('https://api.derrick-app.com/data-enrichment/find-jobtitle-by-fullname', {
      fullName: name
      // You can add additional parameters if needed:
      // company: "VNR",
      // additionalContext: `Graduated in ${2000 + parseInt(rollNo.slice(0, 2)) + 4}`
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Check the response and extract the job title
    if (response.data && response.data.jobTitle) {
      return response.data.jobTitle;
    } else if (response.data && response.data.currentRole) {
      return response.data.currentRole;
    } else {
      // If the structure is different, log it to understand the response format
      console.log('API Response structure:', JSON.stringify(response.data));
      return "Role not found";
    }
  } catch (error) {
    // Handle errors and provide debugging information
    console.error(`Error fetching role for ${name} from Derrick:`, error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
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

          // In your main code where you're updating students
for (const student of insertedStudents) {
  const linkedinUrl = generateLinkedInUrl(student.name);
  // Now using the new Derrick API function
  const role = await fetchRoleFromDerrick(student.name, student.rollNo);

  await Student.findByIdAndUpdate(student._id, {
    linkedinUrl: linkedinUrl,
    role: role
  });
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

