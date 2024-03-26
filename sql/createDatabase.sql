CREATE DATABASE bob_ross_database;
USE bob_ross_database;

CREATE TABLE Paintings (
    PaintingID SERIAL PRIMARY KEY,
    Title VARCHAR(255),
    Episode INT,
    Season INT,
    ImageURL TEXT,
    VideoURL TEXT
);

CREATE TABLE Colors (
    ColorID SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    HexValue VARCHAR(7)
);

CREATE TABLE PaintingsColors (
    PaintingID INT,
    ColorID INT,
    FOREIGN KEY (PaintingID) REFERENCES Paintings(PaintingID),
    FOREIGN KEY (ColorID) REFERENCES Colors(ColorID)
);

CREATE TABLE Episodes (
    EpisodeID SERIAL PRIMARY KEY,
    Title VARCHAR(255),
    AirDate DATE
);

CREATE TABLE Subjects (
    SubjectID SERIAL PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE PaintingsSubjects (
    PaintingID INT,
    SubjectID INT,
    FOREIGN KEY (PaintingID) REFERENCES Paintings(PaintingID),
    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID)
);
