const express = require('express');
const cors = require('cors');
const marketRoutes = require('./routes/marketRoutes');
const canteenRoutes = require('./routes/canteenRoutes');
const transportRoutes = require('./routes/transportRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/market', marketRoutes);
app.use('/api/canteen', canteenRoutes);
app.use('/api/transport', transportRoutes);

// Root route
app.use('/', (req, res) => {
    res.send('College App Backend is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
