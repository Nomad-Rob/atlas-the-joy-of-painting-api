const {
  checkDbExists,
  createDBConnectionWithoutDB,
} = require("./src/checkDb");
const fs = require("fs");
const path = require("path");
const loadData = require("./src/loadData");
const createDBConnection = require("./src/dbConnection");
const express = require("express");

// Check if the database exists
checkDbExists()
  .then((exists) => {
    if (!exists) {
      // Read the SQL file for creating the database
      const createDatabaseSQL = fs.readFileSync(
        path.join(__dirname, "./sql/database.sql"),
        "utf-8"
      );

      // Create a database connection without specifying a database
      const db = createDBConnectionWithoutDB();

      // Create the database using the SQL script
      db.query(createDatabaseSQL, (error, results, fields) => {
        if (error) {
          console.log("An error occurred while creating the database: ", error);
          db.end(); // Close the connection if there's an error
          return;
        }

        console.log("Database and tables created successfully.");
        db.end(); // Close the connection when done
      });

      // If database was just created or already existed, load data into it
      loadData();

    } else {
      console.log("Database already exists.");
    }
  })
  .then(() => {
    const app = express();
    const port = 3000;

    // Setup the database connection
    const connection = createDBConnection();

    // API endpoint for searching episodes
    app.get("/api/episodes/search", async (req, res) => {
      const { month, subject, color } = req.query;
      // Provide a default value for matchType if it's not specified in the request
      const matchType = req.query.matchType ? req.query.matchType.toUpperCase() : "ALL";

      let filters = [];
      if (month) filters.push(`month = ${connection.escape(month)}`);
      if (subject) filters.push(`s.subject_name = ${connection.escape(subject)}`);
      if (color) filters.push(`c.color_name = ${connection.escape(color)}`);

      let filterString = filters.join(
        matchType === "ALL" ? " AND " : " OR "
      );

      // Construct the SQL query with necessary join and grouping conditions
      let sql = `
      SELECT e.episode_title
      FROM Episodes e 
      LEFT JOIN Episode_Subject es ON e.episode_id = es.Episode_Id
      LEFT JOIN Subjects s ON es.Subject_Id = s.Subject_Id
      LEFT JOIN Episode_Color ec ON e.episode_id = ec.Episode_Id
      LEFT JOIN Colors c ON ec.Color_Id = c.Color_Id
      `;

      // If filters exist, append WHERE clause
      if (filterString) sql += `WHERE ${filterString}`;

      // Execute the SQL query
      connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
      });
    });

    // Start the Express server
    app.listen(port, () => {
      console.log(`API is running at http://localhost:${port}`);
    });

    // Close connection when app is shutting down
    process.on("SIGINT", () => {
      connection.end();
      process.exit();
    });
  })
  .catch((err) => {
    console.log("An error occurred: ", err);
  });
