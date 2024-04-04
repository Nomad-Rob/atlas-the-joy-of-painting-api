const mysql = require('mysql');

// Function to check if a database exists
function checkDbExists() {
  // Create a database connection without specifying a database
  const db = createDBConnectionWithoutDB();

  return new Promise((resolve, reject) => {
    // Query to check if the database exists
    db.query("SHOW DATABASES LIKE 'BobRossDatabase'", (error, results, fields) => {
      if (error) reject(error);
      
      // Close the database connection
      db.end();

      // Resolve the promise with true if the database exists, otherwise resolve with false
      results.length === 0 ? resolve(false) : resolve(true);
    });
  });
}

// Function to create a database connection without specifying a database
function createDBConnectionWithoutDB() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PAss123!@#',
    multipleStatements: true // Allow executing multiple statements in one query
  });

  // Connect to the database
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to database: ' + error.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });

  return connection; // Return the database connection object
}

// Export the functions to be used externally
module.exports = { checkDbExists, createDBConnectionWithoutDB };
