const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',       // e.g., gateway01.us-west-2...
    user: '2uz1LmQhnPQRyND.root',       // e.g., 2a4b.root
    password: 'zHb4zosNInFqR4ex',
    database: 'test',                   // Keep this as 'test'
    port: 4000,
    ssl: {
        rejectUnauthorized: true
    }
});


db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to TiDB Cloud successfully!');
});


module.exports = db;
