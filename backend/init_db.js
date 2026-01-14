const fs = require('fs');
const path = require('path');
const db = require('./db_config'); 

async function initDatabase() {
    try {
        const sqlPath = path.join(__dirname, 'setup_database.sql');
        console.log(`Reading SQL file from: ${sqlPath}`);
        
      
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
       
        const queries = sql
            .split(';')
            .map(query => query.trim())
            .filter(query => query.length > 0);

        console.log(`Found ${queries.length} queries to run.`);

        
        for (const query of queries) {
            await db.query(query);
            console.log('Executed query.');
        }

        console.log('✅ Success! All tables created.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error initializing database:', err);
        process.exit(1);
    }
}

initDatabase();