const sqlite3 = require('sqlite3').verbose();

// Connecting to the database
const dbPath = '../request_logs.db';
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database');
    }
});

function calculateUptime() {
    db.all(`SELECT response_status FROM request_logs`, [], (err, rows) => {
        if (err) {
            console.error('Error reading from the database:', err.message);
            return;
        }
        const totalRequests = rows.length;
        const successfulRequests = rows.filter(row => row.response_status === 200).length;

        const uptimePercentage = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;

        console.log(`Total requests: ${totalRequests}`);
        console.log(`Successful requests: ${successfulRequests}`);
        console.log(`Uptime: ${uptimePercentage.toFixed(2)}%`);
    });
}

calculateUptime();
