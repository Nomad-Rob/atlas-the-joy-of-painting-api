# The Joy of Painting API

## Introduction

This project aims to provide easy access to information about "The Joy of Painting" episodes. Fans and viewers can filter episodes based on the month of original broadcast, subject matter, and color palette, enhancing their viewing experience. This solution comprises a detailed database design, a custom Extract Transform Load process for data integration, and a user-friendly API.

## Tech Stack Used

- MySQL
- JavaScript
- Node.js
- Express.js
- Postman

## Features

- Filter episodes by season, episode number, and airdate.
- Filter episodes by subject matter and color palette.
- Retrieve detailed information about each episode, including the title, airdate, subject matter, and color palette.
- Add new episodes to the database.
- Update existing episodes in the database.
- Delete episodes from the database.

## Installation

To run this project, you need to have Node.js and MySQL installed on your machine.

Clone the repository:

`https://github.com/Nomad-Rob/atlas-the-joy-of-painting-api`

Navigate to the project directory:

`cd atlas-the-joy-of-painting-api`

Install the dependencies:

`npm install`

Start the server:

`npm start`

The server will start running on `http://localhost:3000`.


## MySQL how to setup

MySql is being ran on port 3306. The default username is `root` and the password is `password`. The database is called `joy_of_painting`.

1. Install MySQL on your machine. You can download the installer from the official website: https://dev.mysql.com/downloads/installer/
2. Run the installer and follow the instructions to install MySQL.
3. Once the installation is complete, open the MySQL Command Line Client or MySQL Workbench.
4. You can create a new database using the following command:
- `CREATE DATABASE joy_of_painting;`


Some commands for MySql in the CLI:
- `CREATE DATABASE database_name;` - Creates a new database with the specified name.
- `DROP DATABASE database_name;` - Deletes the specified database.
-  `show users;` - Shows all the users in the MySQL server.
- `SHOW DATABASES;` - Shows all the databases in the MySQL server.
- `USE joy_of_painting;` - Switches to the joy_of_painting database.
- `SHOW TABLES;` - Shows all the tables in the current database.
- `DESCRIBE table_name;` - Shows the structure of the specified table.
- `SELECT * FROM table_name;` - Shows all the records in the specified table.


https://www.postgresql.org/docs/
## Database Design
Need to update
<!-- Structure of the DB using PostgreSQL

The database design for this project is as follows:

Table Episode {
    Episode_ID serial [pk]
    Title varchar(255)
    Season int
    Episode int
    Air_Date date
    ImageURL text
    VideoURL text
    Note: 'Contains details about each episode, including the title, season, and episode number, along with URLs to the image and video of the painting featured.'
}

Table Colors {
    Color_ID serial [pk]
    Color_Name varchar(255)
    Color_Hex varchar(7)
    Note: 'Defines all unique colors used in the paintings, listed by name and hex value.'
}

Table Episode_Colors {
    Episode_ID int [ref: > Episode.Episode_ID]
    Color_ID int [ref: > Colors.Color_ID]
    Note: 'A many-to-many relationship table linking episodes to the colors used in the paintings featured in those episodes.'
}

Table Subjects {
    Subject_ID serial [pk]
    Subject_Name varchar(255)
    Note: 'Catalogs subjects or themes of the paintings, such as "Mountain", "River", etc.'
}

- EpisodeID (Foreign Key, Integer) <br>
SubjectID (Foreign Key, Integer) <br> -->

## Example Queries

`curl "http://localhost:3000/api/episodes/search?subject=Mountain"`




## ETL Process

The ETL (Extract, Transform, Load) process is a crucial step in data integration, where data is extracted from various sources, transformed into a suitable format, and loaded into a target database. In this project, the ETL process involves extracting data from a CSV file containing information about "The Joy of Painting" episodes, transforming the data into the appropriate structure, and loading it into the MySQL database.


### Extract

The data for this project is extracted from a CSV file containing information about "The Joy of Painting" episodes. The CSV file includes details such as the episode title, season, episode number, airdate, subject matter, color palette, image URL, and video URL. The data is read from the CSV file using the `csv-parser` library in Node.js.


### Transform

The extracted data is transformed into the appropriate structure to be loaded into the MySQL database. The transformation process involves cleaning the data, splitting the color palette into individual colors, and creating relationships between episodes, colors, and subjects. The transformed data is stored in memory as objects and arrays.

### Load

The transformed data is loaded into the MySQL database using the `mysql` library in Node.js. The data is inserted into the appropriate tables, such as `Episode`, `Colors`, `Subjects`, and the relationship tables `Episode_Colors` and `Episode_Subject`. The load process ensures that the data is stored correctly in the database and that relationships between entities are maintained.


## Postgresql commands
1. Accessing PostgreSQL
To start, access the PostgreSQL command line interface. If you're using the default user, you can do this by executing:
psql postgres

2. Creating a Database

Create a new database using the following command:
CREATE DATABASE mydatabase;

To switch to your newly created database:
\c mydatabase

3. Creating Tables

Suppose we want to create a database for a simple blog system. We'll need tables for users, posts, and comments.

Users Table

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
Posts Table

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
Comments Table

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

4. Inserting Data
Insert data into the users table:

INSERT INTO users (username, email) VALUES ('john_doe', 'john@example.com');
Insert data into the posts table:

INSERT INTO posts (title, content, user_id) VALUES ('My First Post', 'This is the content of my first post.', 1);
5. Querying Data
Retrieve all posts:

SELECT * FROM posts;
Retrieve all comments for a specific post:

SELECT * FROM comments WHERE post_id = 1;
6. Updating Data
Update a user's email:


UPDATE users SET email = 'newemail@example.com' WHERE id = 1;
7. Deleting Data
Delete a comment:


DELETE FROM comments WHERE id = 1;
8. Dropping Tables and Database
To remove a table:


DROP TABLE comments;
To drop the database:

DROP DATABASE mydatabase;
9. Exiting PostgreSQL
To exit psql, you can use:

\q

## Resources
- https://aws.amazon.com/what-is/etl/#:~:text=Extract%2C%20transform%2C%20and%20load%20(,and%20machine%20learning%20(ML).
