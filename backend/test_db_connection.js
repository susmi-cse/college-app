const db = require('./db_config');

async function testConnection() {
    try {
        console.log('Testing DB Connection...');
        const [rows] = await db.query('SELECT 1');
        console.log('DB Connection SUCCESS:', rows);
        process.exit(0);
    } catch (err) {
        console.error('DB Connection FAILED:', err);
        process.exit(1);
    }
}

testConnection();
