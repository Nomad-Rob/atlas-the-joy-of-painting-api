# The Joy of Painting API

## Introduction

This project aims to provide easy access to information about "The Joy of Painting" episodes. Fans and viewers can filter episodes based on the month of original broadcast, subject matter, and color palette, enhancing their viewing experience. This solution comprises a detailed database design, a custom Extract Transform Load process for data integration, and a user-friendly API.

## Features



## Installation

### Prerequisites


### Setup

## PgAdmin and Postgresql Setup

1. Install PostgreSQL and PgAdmin
2. Open PgAdmin and create a new server
3. Create a new database called `BobRoss`
4. Create a new user called `usernamehere` with password `passwordhere`
5. Grant all privileges to the user `usernamehere` on the database `BobRoss`
6. Start the server and connect to the database
7. Run the SQL script `create_tables.sql` to create the tables
8. Run the SQL script `insert_data.sql` to insert data into the tables

Some commands for PostgreSQL in the CLI:

- `service postgresql start` Start the PostgreSQL service
- `service postgresql stop` Stop the PostgreSQL service
- `service postgresql restart` Restart the PostgreSQL service
- `sudo -u postgres psql` Access the PostgreSQL CLI
- `\q`: Quit the PostgreSQL CLI
- `\du`: List all users
- `psql -U username -d database_name`: Connect to a database
- `\l`: List all databases
- `\c database_name`: Connect to a database
- `\dt`: List all tables
- `\d table_name`: Describe a table
- `SELECT * FROM table_name;`: Show all rows in a table


## Database Design
Structure of the DB using PostgreSQL

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
SubjectID (Foreign Key, Integer) <br>

 Used dbdiagram.io to create the database diagram. The diagram can be found in the root directory of the project as db_diagram.png.
![Database Diagram](/db_diagram.png)

- Relationships:
An episode can have multiple colors and subjects, thus EpisodeColors and EpisodeSubjects serve as junction tables to represent these many-to-many relationships.
The OriginalAirDate in the Episodes table allows for filtering episodes based on the month they were aired, fulfilling one of the project requirements.

## Resources
- https://aws.amazon.com/what-is/etl/#:~:text=Extract%2C%20transform%2C%20and%20load%20(,and%20machine%20learning%20(ML).
