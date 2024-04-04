-- Create the database if it doesn't exist and switch to it
CREATE DATABASE IF NOT EXISTS BobRossDatabase;
USE BobRossDatabase;

-- Create the Episodes table
CREATE TABLE IF NOT EXISTS Episodes (
  episode_id INT AUTO_INCREMENT PRIMARY KEY,
  episode_number VARCHAR(50),
  episode_title VARCHAR(255),
  season INT,
  episode INT,
  month VARCHAR(50)
);

-- Create the Colors table
CREATE TABLE IF NOT EXISTS Colors (
  color_id INT AUTO_INCREMENT PRIMARY KEY,
  color_name VARCHAR(255)
);

-- Create the Episode_Color table for many-to-many relationship between Episodes and Colors
CREATE TABLE IF NOT EXISTS Episode_Color (
  episode_color_id INT AUTO_INCREMENT PRIMARY KEY,
  episode_id INT,
  color_id INT,
  FOREIGN KEY (episode_id) REFERENCES Episodes(episode_id),
  FOREIGN KEY (color_id) REFERENCES Colors(color_id)
);

-- Create the Subjects table
CREATE TABLE IF NOT EXISTS Subjects (
  subject_id INT AUTO_INCREMENT PRIMARY KEY,
  subject_name VARCHAR(255)
);

-- Create the Episode_Subject table for many-to-many relationship between Episodes and Subjects
CREATE TABLE IF NOT EXISTS Episode_Subject (
  episode_subject_id INT AUTO_INCREMENT PRIMARY KEY,
  episode_id INT,
  subject_id INT,
  FOREIGN KEY (episode_id) REFERENCES Episodes(episode_id),
  FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
);
