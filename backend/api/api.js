const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/selectAll', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});
router.get('/averagePrice', async (request, response) => {
    try {
        const averagePrice = await database.averagePrice();
        console.log(averagePrice);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: averagePrice
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});
router.post('/selectKaja', async (request, response) => {
    try {
        const body = request.body;
        const kaj = await database.selectKaja(body.nev);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: kaj
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/insertInto', async (request, response) => {
    try {
        const body = request.body;
        const insertInto = await database.insertInto(body.nev, body.ar, body.finom);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            insertId: insertInto
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/selectCategories', async (request, response) => {
    try {
        const selectCategories = await database.allCategories();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            categories: selectCategories
        });
    } catch (error) {
        console.error(error);
    }
});
router.post('/insertCategories', async (request, response) => {
    try {
        const body = request.body;
        const insertCategories = await database.insertCategories(body.name);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            insertId: insertCategories
        });
    } catch (error) {
        console.error(error);
    }
});
router.post('/updateCategories/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const body = request.body;
        const updateCategories = await database.updateCategories(id, body.name);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            update: updateCategories
        });
    } catch (error) {
        console.error(error);
    }
});
router.post('/deleteCategory/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const deleteCategory = await database.deleteCategory(id);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            update: deleteCategory
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/selectUsers', async (request, response) => {
    try {
        const selectCategories = await database.selectUsers();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            categories: selectCategories
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/addUsers', async (request, response) => {
    try {
        const body = request.body;
        const addUsers = await database.addUsers(body.name, body.email);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            categories: addUsers
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/updateUsers/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const body = request.body;
        const updateUsers = await database.updateUsers(body.name, body.email, id);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            categories: updateUsers
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/deleteUser/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const deleteUser = await database.deleteUser(id);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            update: deleteUser
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/selectProducts', async (request, response) => {
    try {
        const selectAll = await database.selectProducts();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            select: selectAll
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/addProducts', async (request, response) => {
    try {
        const body = request.body;
        const addProducts = await database.addProducts(body.name, body.price, body.stock);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            prod: addProducts
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/updateProducts/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const body = request.body;
        const updateProducts = await database.updateProducts(body.name, body.price, body.stock, id);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            categories: updateProducts
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/deleteProducts/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const deleteProduct = await database.deleteProduct(id);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            update: deleteProduct
        });
    } catch (error) {
        console.error(error);
    }
});

//!---

router.get('/inventory', async (request, response) => {
    try {
        const inventory = await database.selectInventory();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            select: inventory
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/inventoryAdd', async (request, response) => {
    try {
        const body = request.body;
        const inventoryAdd = await database.inventoryAdd(body.product_id, body.quantity);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            prod: inventoryAdd
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/updateinventory/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const body = request.body;
        const updateinventory = await database.updateinventory(
            body.name,
            body.price,
            body.stock,
            id
        );
        response.status(200).json({
            message: 'Ez a végpont működik.',
            categories: updateinventory
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/deleteinventory/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const deleteinventory = await database.deleteinventory(id);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            update: deleteinventory
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/import', async (request, response) => {
    try {
        await database.szoImport();
        response.status(200).json({
            uzenet: 'Sikeres importálás'
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/ige500', async (request, response) => {
    try {
        let igek = await database.igek();
        response.status(200).json({
            uzenet: 'Sikeres importálás',
            igek: igek
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/brmellek', async (request, response) => {
    try {
        let melleknevek = await database.melleknev();
        response.status(200).json({
            uzenet: 'Sikeres importálás',
            melleknevek: melleknevek
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/hatar10', async (request, response) => {
    try {
        let hatar = await database.hatarozo();
        response.status(200).json({
            uzenet: 'Sikeres importálás',
            hatarozok: hatar
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/szofajok', async (request, response) => {
    try {
        let szofajok = await database.szofajok();
        response.status(200).json({
            uzenet: 'Sikeres importálás',
            szofajok: szofajok
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/tobbszoros', async (request, response) => {
    try {
        let tobbszoros = await database.tobbszoros();
        response.status(200).json({
            uzenet: 'Sikeres importálás',
            tobbszoros: tobbszoros
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/diakok', async (request, response) => {
    try {
        let diakok = await database.diakok();
        response.status(200).json({
            diakok: diakok
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/jegyek/:diakId', async (request, response) => {
    try {
        let diak = request.params.diakId;
        let jegyek = await database.jegyek(diak);
        response.status(200).json({
            result: jegyek
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/jegyek', async (request, response) => {
    try {
        let body = request.body;
        const fields = await database.ujJegy(body.diakId, body.tanarId, body.tantargy, body.jegy);
        response.status(200).json({
            Status: 'Success'
        });
    } catch (error) {
        console.error(error);
    }
});
module.exports = router;
