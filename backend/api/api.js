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

module.exports = router;
