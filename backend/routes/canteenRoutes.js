const express = require('express');
const router = express.Router();
const db = require('../db_config');

// 1. GET all menu items
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM canteen');
        res.json(rows);
    } catch (err) {
        console.error("Error fetching menu:", err);
        res.status(500).json({ error: err.message });
    }
});

// 2. ADD a new item (Fixed for Promises & Shop Outlet)
router.post('/', async (req, res) => {
    // We expect 'shopOutlet' from the frontend
    const { name, price, category, shopOutlet, image_url } = req.body;

    try {
        const query = `
            INSERT INTO canteen (name, price, category, shop_outlet, image_url) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        await db.query(query, [name, price, category, shopOutlet, image_url]);
        
        res.status(201).json({ message: 'Item added successfully' });
    } catch (err) {
        console.error("Error adding item:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
