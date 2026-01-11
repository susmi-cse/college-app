const express = require('express');
const router = express.Router();
const db = require('../db_config');

// GET all rides
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM rides');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST new ride
router.post('/', async (req, res) => {
    const { driver_id, origin, destination, time_of_dept, price } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO rides (driver_id, origin, destination, time_of_dept, price) VALUES (?, ?, ?, ?, ?)',
            [driver_id || 1, origin, destination, time_of_dept, price] // Default driver_id to 1 for now
        );
        res.status(201).json({ message: 'Ride offered', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
