-- Create the Episodes table if it doesn't exist
CREATE TABLE IF NOT EXISTS Episodes (
    EpisodeID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Season INT NOT NULL,
    EpisodeNumber INT NOT NULL,
    OriginalAirDate DATE NOT NULL
);

-- Create the Colors table if it doesn't exist
CREATE TABLE IF NOT EXISTS Colors (
    ColorID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    HexValue VARCHAR(7) NOT NULL
);

-- Create the Subjects table if it doesn't exist
CREATE TABLE IF NOT EXISTS Subjects (
    SubjectID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);

-- Create the EpisodeColors junction table if it doesn't exist
CREATE TABLE IF NOT EXISTS EpisodeColors (
    EpisodeID INT NOT NULL,
    ColorID INT NOT NULL,
    CONSTRAINT FK_EpisodeID FOREIGN KEY (EpisodeID) REFERENCES Episodes(EpisodeID) ON DELETE CASCADE,
    CONSTRAINT FK_ColorID FOREIGN KEY (ColorID) REFERENCES Colors(ColorID) ON DELETE CASCADE,
    PRIMARY KEY (EpisodeID, ColorID)
);

-- Create the EpisodeSubjects junction table if it doesn't exist
CREATE TABLE IF NOT EXISTS EpisodeSubjects (
    EpisodeID INT NOT NULL,
    SubjectID INT NOT NULL,
    CONSTRAINT FK_EpisodeSubjectID FOREIGN KEY (EpisodeID) REFERENCES Episodes(EpisodeID) ON DELETE CASCADE,
    CONSTRAINT FK_SubjectID FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID) ON DELETE CASCADE,
    PRIMARY KEY (EpisodeID, SubjectID)
);
