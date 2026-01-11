const express = require('express');
const router = express.Router();
const db = require('../db_config');

// GET all items
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM marketplace');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// POST new item
router.post('/', async (req, res) => {
    const { title, price, description, contact, image_url } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO marketplace (title, price, description, contact, image_url) VALUES (?, ?, ?, ?, ?)',
            [title, price, description, contact, image_url]
        );
        res.status(201).json({ message: 'Item added', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
