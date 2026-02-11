const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'suloskaja',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const pool2 = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'feladat1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM kaja;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function insertInto(nev, ar, finom) {
    /*
    const [rows] = await pool.execute(query, [nev, ar, finom]);
    return rows.insertId;*/
    const query = `INSERT INTO kaja(nev, ar, finom) VALUES(?, ?, ?);`;
    try {
        const [rows] = await pool.execute(query, [nev, ar, finom]);
        return rows.insertId;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('Az étel neve vagy finomsága már létezik az adatbázisban');
        }
        throw error;
    }
}

async function averagePrice() {
    const query = `SELECT AVG(ar) AS 'atlagar' FROM kaja;`;
    try {
        const [rows] = await pool.execute(query);
        return rows[0].atlagar;
    } catch (error) {
        throw new Error('Az étel neve vagy finomsága már létezik az adatbázisban');
    }
}
async function selectKaja(kaja) {
    const query = `SELECT nev, ar, finom FROM kaja WHERE nev = ?;`;
    try {
        const [rows] = await pool.execute(query, [kaja]);
        return rows;
    } catch (error) {
        throw new Error('Az étel neve vagy finomsága már létezik az adatbázisban');
    }
}

async function allCategories() {
    try {
        const query = `SELECT * FROM categories`;
        const [rows] = await pool2.execute(query);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}
async function insertCategories(name) {
    try {
        const query = `INSERT INTO categories(name) VALUES(?)`;
        const [rows] = await pool2.execute(query, [name]);
        return rows.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

async function updateCategories(id, name) {}

//!Export
module.exports = {
    selectall,
    insertInto,
    averagePrice,
    selectKaja,
    allCategories,
    insertCategories
};
