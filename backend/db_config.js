
const mysql = require('mysql2/promise'); 
const db = mysql.createPool({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com', // Your Host
    user: '2uz1LmQhnPQRyND.root',                              // Your User
    password: 'eo9ixNwkgZEKWfyv',                            
    database: 'test',
    port: 4000,
    ssl: {
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection (Optional, but good for logs)
db.getConnection()
    .then(conn => {
        console.log('✅ Connected to TiDB Cloud (Promise Mode) successfully!');
        conn.release();
    })
    .catch(err => {
        console.error('❌ Connection Failed:', err);
    });

module.exports = db;
