const fs = require('fs');
const csv = require('csv-parser');

// Function to parse a CSV file and return its data as an array of objects
function parseCSVFile(filePath) {
  const data = []; // Array to store parsed data
  return new Promise((resolve, reject) => {
    // Create a read stream for the CSV file
    fs.createReadStream(filePath)
      .pipe(csv()) // Pipe the read stream to the CSV parser
      .on('data', (row) => data.push(row)) // Append each parsed row to the data array
      .on('end', () => resolve(data)) // Resolve the promise with the parsed data when parsing is complete
      .on('error', (error) => reject(error)); // Reject the promise if an error occurs during parsing
  });
}

// Export the function to be used externally
module.exports = parseCSVFile;
