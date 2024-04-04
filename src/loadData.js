const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");
const util = require("util");
const createDBConnection = require("./dbConnection");

// Log script initiation
console.log('Script started');

// Function to load data into the database
async function loadData() {
  let colorsData, episodesData, subjectsData;

  // Read data files and handle potential errors
  try {
    colorsData = fs.readFileSync(path.join(__dirname, "../data/colors.csv"), "utf-8");
    console.log('Successfully read colors data.');
  } catch (error) {
    console.error('Failed to read colors data:', error);
    return; // Exit if we can't read the data
  }

  try {
    episodesData = fs.readFileSync(path.join(__dirname, "../data/episodes.csv"), "utf-8");
    console.log('Successfully read episodes data.');
  } catch (error) {
    console.error('Failed to read episodes data:', error);
    return;
  }

  try {
    subjectsData = fs.readFileSync(path.join(__dirname, "../data/subjects.csv"), "utf-8");
    console.log('Successfully read subjects data.');
  } catch (error) {
    console.error('Failed to read subjects data:', error);
    return;
  }

  // Parse the data files
  const colors = Papa.parse(colorsData, { header: true }).data;
  const episodes = Papa.parse(episodesData, { header: true }).data;
  const subjects = Papa.parse(subjectsData, { header: true }).data;

  // Extract color and subject names
  const colorNames = Object.keys(colors[0]).filter(
    (key) =>
      key !== "" &&
      key !== "painting_index" &&
      key !== "img_src" &&
      key !== "painting_title" &&
      key !== "season" &&
      key !== "episode" &&
      key !== "num_colors" &&
      key !== "youtube_src" &&
      key !== "colors" &&
      key !== "color_hex"
  );

  const subjectNames = Object.keys(subjects[0]).filter(
    (header) => header !== "EPISODE" && header !== "TITLE"
  );

  // Establish a database connection
  let db;
  try {
    db = createDBConnection();
    console.log('Database connection successfully established.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return; // Exit if connection fails
  }

  const query = util.promisify(db.query).bind(db);

  // Insert data into the database
  try {
    // Insert colors
    for (let colorName of colorNames) {
      const sql = "INSERT INTO Colors (Color_Name) VALUES (?)";
      await query(sql, [colorName]);
      console.log(`Successfully inserted color ${colorName} into the database.`);
    }

    // Insert subjects
    for (let subjectName of subjectNames) {
      const sql = "INSERT INTO Subjects (Subject_Name) VALUES (?)";
      await query(sql, [subjectName]);
      console.log(`Successfully inserted subject ${subjectName} into the database.`);
    }

    // Insert episodes and their associations
    for (let index = 0; index < episodes.length; index++) {
      const episodeData = episodes[index];
      const title = episodeData.TITLE;
      console.log('Processing DATE for episode:', episodeData.TITLE, 'with DATE:', episodeData.DATE);
      const month = episodeData.DATE.replace(/ "/g, "").split(" ")[0];
      const season = episodeData.SEASON;
      const episode = episodeData.EPISODE;

      const sql = "INSERT INTO Episodes (episode_title, season, episode, month) VALUES (?, ?, ?, ?)";
      const result = await query(sql, [title, season, episode, month]);
      console.log(`Successfully inserted episode ${title} into the database.`);
      const episodeId = result.insertId;

      // Insert associations (colors and subjects)
      await Promise.all([
        ...colorNames.filter(colorName => colors[index][colorName] === "1").map(async (colorName) => {
          const sqlColorId = "SELECT Color_Id FROM Colors WHERE Color_Name = ?";
          const resultColor = await query(sqlColorId, [colorName]);
          const colorId = resultColor[0].Color_Id;

          const sqlAssociationColor = "INSERT INTO Episode_Color (Episode_Id, Color_Id) VALUES (?, ?)";
          await query(sqlAssociationColor, [episodeId, colorId]);
          console.log(`Successfully associated color ${colorName} with episode ${title}.`);
        }),
        ...subjectNames.filter(subjectName => subjects[index][subjectName] === "1").map(async (subjectName) => {
          const sqlSubjectId = "SELECT Subject_Id FROM Subjects WHERE Subject_Name = ?";
          const resultSubject = await query(sqlSubjectId, [subjectName]);
          const subjectId = resultSubject[0].Subject_Id;

          const sqlAssociationSubject = "INSERT INTO Episode_Subject (Episode_Id, Subject_Id) VALUES (?, ?)";
          await query(sqlAssociationSubject, [episodeId, subjectId]);
          console.log(`Successfully associated subject ${subjectName} with episode ${title}.`);
        })
      ]);
    }

    console.log('All operations completed successfully.');
  } catch (error) {
    console.error('An error occurred during operations:', error);
  } finally {
    db.end();
    console.log('Database connection closed.');
  }
}

// Export the function for external use
module.exports = loadData;

// Execute the function and handle any errors
loadData().catch(error => console.error('Script execution failed:', error));
