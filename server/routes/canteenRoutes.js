const express = require('express');
const router = express.Router();
const db = require('../db_config');

// GET Menu from DB
router.get('/menu', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM menu_items');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error fetching menu' });
    }
});

// POST Add New Menu Item (Seller Mode)
router.post('/menu', async (req, res) => {
    const { name, price, shop_name, category, image_url } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO menu_items (name, price, shop_name, category, image_url) VALUES (?, ?, ?, ?, ?)',
            [name, price, shop_name, category, image_url]
        );
        res.status(201).json({ message: 'Item added to menu', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error adding item' });
    }
});

// GET My Orders (Simple dump of all orders for now, or filtered by user if needed)
router.get('/orders', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM canteen_orders');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST Order
router.post('/order', async (req, res) => {
    const { student_id, item_name, price } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO canteen_orders (student_id, item_name, price, status) VALUES (?, ?, ?, ?)',
            [student_id || 1, item_name, price, 'pending']
        );
        res.status(201).json({ message: 'Order placed', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
