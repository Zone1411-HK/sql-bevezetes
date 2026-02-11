CREATE DATABASE suloskaja
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE suloskaja;

CREATE TABLE kaja(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(67) NOT NULL UNIQUE,
    ar INT NOT NULL,
    finom VARCHAR(67) NOT NULL UNIQUE
);


--! -------------------------------------------------------------------------


CREATE DATABASE feladat1
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE feladat1;

CREATE TABLE categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);