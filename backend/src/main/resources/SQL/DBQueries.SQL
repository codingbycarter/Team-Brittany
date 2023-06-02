-- Creates a site user table in the designated database
CREATE TABLE siteUser (
id INT NOT NULL AUTO_INCREMENT,
email VARCHAR(45) NOT NULL,
pwd VARCHAR(200) NOT NULL,
role VARCHAR(45) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO User (email, pwd, role) VALUES ('eric@example.org', '98765', 'admin');