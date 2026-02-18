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

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE inventory(
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE DATABASE szogyak
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE szogyak;

CREATE TABLE szavak(
    azon INT NOT NULL,
    szoto VARCHAR(200) NOT NULL,
    szofaj VARCHAR(200) NOT NULL,
    gyakori INT NOT NULL
);