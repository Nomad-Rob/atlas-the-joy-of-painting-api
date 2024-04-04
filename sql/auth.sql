-- Alter the password for the 'root' user
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'PAss123!@#';

-- Flush privileges to apply the changes
FLUSH PRIVILEGES;
