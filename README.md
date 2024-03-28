# The Joy of Painting API

## Introduction

This project aims to provide easy access to information about "The Joy of Painting" episodes. Fans and viewers can filter episodes based on the month of original broadcast, subject matter, and color palette, enhancing their viewing experience. This solution comprises a detailed database design, a custom Extract Transform Load process for data integration, and a user-friendly API.

## Features



## Installation

### Prerequisites


### Setup

https://www.postgresql.org/docs/
## Database Design
Need to update
<!-- Structure of the DB using PostgreSQL

Tables: <br>
Episodes

- EpisodeID (Primary Key, Auto-increment, Integer) <br>
Title (Text) <br>
Season (Integer) <br>
EpisodeNumber (Integer) <br>
OriginalAirDate (Date) <br>
Colors <br>

- ColorID (Primary Key, Auto-increment, Integer) <br>
Name (Text) <br>
HexValue (Text) <br>
EpisodeColors <br>

- EpisodeID (Foreign Key, Integer) <br>
ColorID (Foreign Key, Integer) <br>
Subjects <br>

- SubjectID (Primary Key, Auto-increment, Integer) <br>
Name (Text) <br>
EpisodeSubjects <br>

- EpisodeID (Foreign Key, Integer) <br>
SubjectID (Foreign Key, Integer) <br> -->

 Used dbdiagram.io to create the database diagram. The diagram can be found in the root directory of the project as db_diagram.png.
![Database Diagram](/db_diagram.png)

- Relationships:
An episode can have multiple colors and subjects, thus EpisodeColors and EpisodeSubjects serve as junction tables to represent these many-to-many relationships.
The OriginalAirDate in the Episodes table allows for filtering episodes based on the month they were aired, fulfilling one of the project requirements.

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
