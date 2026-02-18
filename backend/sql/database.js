const mysql = require('mysql2/promise');
const fs = require('fs/promises');

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
const pool3 = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'szogyak',
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

async function updateCategories(id, name) {
    try {
        const query = `
        UPDATE categories 
        SET name = ?
        WHERE id = ?
        `;
        const [rows] = await pool2.execute(query, [name, id]);
        return rows.affectedRows;
    } catch (error) {
        throw new Error(error);
    }
}
async function deleteCategory(id) {
    try {
        const query = `
        DELETE FROM categories
        WHERE id = ? 
        `;
        const [rows] = await pool2.execute(query, [id]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

async function selectUsers() {
    try {
        const query = `SELECT * FROM users`;
        const [rows] = await pool2.execute(query);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

async function addUsers(name, email) {
    try {
        const query = `
        INSERT INTO users(name, email)
        VALUES(?, ?)
        `;
        const [rows] = await pool2.execute(query, [name, email]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}
async function updateUsers(name, email, id) {
    try {
        const query = `
        UPDATE users
        SET name = ?, email = ?
        WHERE id = ?
        `;
        const [rows] = await pool2.execute(query, [name, email, id]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}
async function deleteUser(id) {
    try {
        const query = `
        DELETE FROM users
        WHERE id = ?
        `;
        const [rows] = await pool2.execute(query, [id]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}
async function selectProducts() {
    try {
        const query = `
        SELECT *
        FROM products
        `;
        const [rows] = await pool2.execute(query);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

async function addProducts(name, price, stock) {
    try {
        const query = `
        INSERT INTO products(name, price, stock)
        VALUES(?, ?, ?)
        `;
        const [rows] = await pool2.execute(query, [name, price, stock]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}
async function updateProducts(name, price, stock, id) {
    try {
        const query = `
        UPDATE products
        SET name = ?, price = ?, stock = ?
        WHERE id = ?
        `;
        const [rows] = await pool2.execute(query, [name, price, stock, id]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

async function deleteProduct(id) {
    try {
        const query = `
        DELETE FROM products
        WHERE id = ?
        `;
        const [rows] = await pool2.execute(query, [id]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}
async function selectInventory() {
    try {
        const query = `
        SELECT *
        FROM inventory
        `;
        const [rows] = await pool2.execute(query);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

async function inventoryAdd(product_id, quantity) {
    try {
        const query = `
        INSERT INTO inventory(product_id, quantity)
        VALUES(?, ?)
        `;
        const [rows] = await pool2.execute(query, [product_id, quantity]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}
async function updateinventory(name, price, stock, id) {
    try {
        const query = `
        UPDATE inventory
        SET name = ?, price = ?, stock = ?
        WHERE id = ?
        `;
        const [rows] = await pool2.execute(query, [name, price, stock, id]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

async function deleteinventory(id) {
    try {
        const query = `
        DELETE FROM inventory
        WHERE id = ?
        `;
        const [rows] = await pool2.execute(query, [id]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

const readTextFile = async (filePath) => {
    try {
        const text = await fs.readFile(filePath, 'utf8');
        return text;
    } catch (err) {
        throw new Error(`Olvasási hiba: (text): ${err.message}`);
    }
};

async function szoImport() {
    try {
        let text = (await readTextFile('../backend/sql/szo10000.csv')).toString().split('\n');
        for (let i = 0; i < text.length; i++) {
            text[i] = text[i].split(';');
        }

        console.log(text);
    } catch (error) {
        console.error(error);
    }
}

szoImport();
//!Export
module.exports = {
    selectall,
    insertInto,
    averagePrice,
    selectKaja,
    allCategories,
    insertCategories,
    updateCategories,
    deleteCategory,
    selectUsers,
    addUsers,
    updateUsers,
    deleteUser,
    selectProducts,
    addProducts,
    updateProducts,
    deleteProduct,
    selectInventory,
    inventoryAdd,
    updateinventory,
    deleteinventory
};
