const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const url = 'https://qa-challenge-nine.vercel.app/api/name-checker';
const dbPath = '../request_logs.db';
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database');
    }
});

// Create the table if not exists
function createTable() {
    const schemaPath = path.join(__dirname, '../schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    db.run(schema, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created or already exists');
        }
    });
}

createTable();

let requestCount = 0;
const totalRequests = 10 * 60 * 2;  // 10 minutes at 2 requests per second (10 minutes * 60 seconds * 2 requests per second)
let successfulRequests = 0;

function logRequest(name, status, responseText) {
    const timestamp = new Date().toISOString();

    db.run(`INSERT INTO request_logs (url, name_parameter, response_status, response_text, timestamp) 
            VALUES (?, ?, ?, ?, ?)`,
        [url, name, status, responseText, timestamp],
        (err) => {
            if (err) {
                console.error('Error inserting into the database:', err.message);
            }
        });
}


async function monitorAPI() {
    try {

        if (requestCount >= totalRequests) {
            console.log(`Monitoring complete. Successful requests: ${successfulRequests} out of ${totalRequests}`);
            const uptimePercentage = (successfulRequests / totalRequests) * 100;
            console.log(`Uptime: ${uptimePercentage.toFixed(2)}%`);
            clearInterval(monitorInterval);
        }

        const response = await axios.get(url, {
            data: { name: `test-${Math.random().toString(36).substring(7)}` }
        });

        const status = response.status;
        const name = response.data.name || "unknown";
        const timestamp = new Date().toISOString();

        console.log(`[${timestamp}] Status: ${status}`);

        logRequest(name, status, name);

        if (status === 200) {
            successfulRequests++;
        }

        requestCount++;

    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const errorMessage = error.response ? error.response.data : error.message;
        const timestamp = new Date().toISOString();

        console.log(`[${timestamp}] Error: ${status}`);

        logRequest('error', status, errorMessage);

        requestCount++;
    }
}

// Running requests every 500 ms for 10 minutes
const monitorInterval = setInterval(monitorAPI, 500);
