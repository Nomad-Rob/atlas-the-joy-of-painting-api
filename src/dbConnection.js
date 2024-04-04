var mysql = require('mysql');

// Function to create a database connection
function createDBConnection() {
  // Configure the connection parameters
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PAss123!@#',
    database: 'BobRossDatabase',
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

  return connection; // Return the connection object
}

// Export the function to be used externally
module.exports = createDBConnection;
