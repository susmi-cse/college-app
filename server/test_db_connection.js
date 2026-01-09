const mysql = require('mysql2/promise');
const config = require('./db_config');

async function testConnection() {
    console.log('Attempting to connect with config:', { ...config, password: '***' });
    try {
        const connection = await mysql.createConnection(config);
        console.log('✅ Success! Connected to database.');
        await connection.end();
    } catch (err) {
        console.error('❌ Connection Failed!');
        console.error('Error Code:', err.code);
        console.error('Message:', err.message);

        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\n--> TIP: This usually means your MySQL user/password is wrong.');
            console.log('    If you have a password for root, you need to add it to db_config.js.');
        } else if (err.code === 'ER_BAD_DB_ERROR') {
            console.log('\n--> TIP: The database "college_app" does not exist.');
            console.log('    You need to create it in phpMyAdmin or MySQL Workbench.');
        } else if (err.code === 'ECONNREFUSED') {
            console.log('\n--> TIP: MySQL server is NOT running.');
            console.log('    Start "MySQL" in XAMPP Control Panel.');
        }
    }
}

testConnection();
