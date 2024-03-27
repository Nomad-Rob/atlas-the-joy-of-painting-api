# The Joy of Painting API

## Introduction

This project aims to provide easy access to information about "The Joy of Painting" episodes. Fans and viewers can filter episodes based on the month of original broadcast, subject matter, and color palette, enhancing their viewing experience. This solution comprises a detailed database design, a custom Extract Transform Load process for data integration, and a user-friendly API.

## Features



## Installation

### Prerequisites


### Setup

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
