CREATE DATABASE IF NOT EXISTS iskola
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE iskola;

CREATE TABLE Diak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    osztaly VARCHAR(10) NOT NULL
) ENGINE=InnoDB;
CREATE TABLE Tanar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    szak VARCHAR(50) NOT NULL
) ENGINE=InnoDB;
CREATE TABLE Jegy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    diak_id INT NOT NULL,
    tanar_id INT NOT NULL,
    tantargy VARCHAR(50) NOT NULL,
    jegy TINYINT NOT NULL CHECK (jegy BETWEEN 1 AND 5),
    datum DATE NOT NULL,

    CONSTRAINT fk_jegy_diak
        FOREIGN KEY (diak_id) REFERENCES Diak(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_jegy_tanar
        FOREIGN KEY (tanar_id) REFERENCES Tanar(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB;

INSERT INTO Diak (nev, osztaly) VALUES
('Kiss Ádám', '9.A'),
('Nagy Anna', '9.A'),
('Tóth Bence', '9.B'),
('Szabó Dóra', '9.B'),
('Varga Péter', '10.A'),
('Kovács Lilla', '10.A'),
('Farkas Máté', '10.B'),
('Horváth Eszter', '10.B'),
('Balogh Zoltán', '11.A'),
('Molnár Réka', '11.A'),
('Lakatos Gergő', '11.B'),
('Papp Nóra', '11.B'),
('Oláh Tamás', '12.A'),
('Bíró Kata', '12.A'),
('Sipos Levente', '12.B');

INSERT INTO Tanar (nev, szak) VALUES
('Dr. Fehér István', 'Matematika'),
('Kelemen Éva', 'Magyar'),
('Szántó András', 'Történelem'),
('Németh Júlia', 'Biológia'),
('Lukács Zsolt', 'Informatika');

INSERT INTO Jegy (diak_id, tanar_id, tantargy, jegy, datum) VALUES
(1, 1, 'Matematika', 4, '2025-01-10'),
(1, 2, 'Magyar', 5, '2025-01-12'),
(2, 1, 'Matematika', 3, '2025-01-10'),
(2, 3, 'Történelem', 4, '2025-01-15'),
(3, 1, 'Matematika', 2, '2025-01-10'),
(3, 5, 'Informatika', 5, '2025-01-18'),
(4, 2, 'Magyar', 4, '2025-01-12'),
(4, 4, 'Biológia', 3, '2025-01-20'),
(5, 1, 'Matematika', 5, '2025-01-10'),
(5, 5, 'Informatika', 4, '2025-01-18'),
(6, 2, 'Magyar', 3, '2025-01-12'),
(6, 4, 'Biológia', 4, '2025-01-20'),
(7, 1, 'Matematika', 2, '2025-01-10'),
(7, 3, 'Történelem', 3, '2025-01-15'),
(8, 2, 'Magyar', 5, '2025-01-12'),
(8, 5, 'Informatika', 5, '2025-01-18'),
(9, 1, 'Matematika', 4, '2025-01-10'),
(9, 3, 'Történelem', 5, '2025-01-15'),
(10, 4, 'Biológia', 3, '2025-01-20'),
(10, 2, 'Magyar', 4, '2025-01-12'),
(11, 5, 'Informatika', 5, '2025-01-18'),
(11, 1, 'Matematika', 3, '2025-01-10'),
(12, 2, 'Magyar', 4, '2025-01-12'),
(12, 3, 'Történelem', 2, '2025-01-15'),
(13, 1, 'Matematika', 5, '2025-01-10'),
(13, 5, 'Informatika', 4, '2025-01-18'),
(14, 4, 'Biológia', 5, '2025-01-20'),
(14, 2, 'Magyar', 3, '2025-01-12'),
(15, 3, 'Történelem', 4, '2025-01-15'),
(15, 1, 'Matematika', 2, '2025-01-10');