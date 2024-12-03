
# QA Automation Challenge

This project is an exercise in automation testing, implemented using JavaScript.

## Prerequisites
Before running the scripts, ensure the following are installed:
- **Node.js** 
- **Dependencies**: Install required packages using:
  ```bash
  npm install sqlite3 axios
  ```

## Running the Scripts

### Monitoring Script
To execute the monitoring script:
```bash
node monitor.js
```

#### What does `monitor.js` do?
1. **Database Connection**: Attempts to connect to the database and creates a `request_logs` table if it doesn't already exist.
2. **Monitoring API Endpoint**: Monitors the API endpoint for **10 minutes**, sending **2 requests per second**.
3. **Logging Responses**: Logs all server responses (HTTP status and response body) into the `request_logs` table. Both successful requests and errors are recorded for analysis.

---

### Uptime Script
To execute the uptime script:
```bash
node uptime-script.js
```

#### What does `uptime-script.js` do?
1. **Database Connection**: Connects to the database and reads all entries from the `request_logs` table.
2. **Uptime Calculation**: Calculates the percentage of successful requests.
3. **Uptime Report**: Displays the uptime percentage for the monitored API endpoint.

---

## Known Bugs

### Bug 1: Names with Multiple Lowercase 'p'
**Description**: The system does not accept names containing more than one lowercase 'p' (e.g., `pepe`, `Poppy`, `Clipp`). When such names are submitted, the server responds with a `500 Internal Server Error`.

#### Steps to Reproduce:
1. Enter a name containing two lowercase 'p' characters, e.g., `Pepe`.
2. Submit the name to the API.
3. Verify the server responds with `200 OK`.
4. Change the first 'p' to lowercase.
5. Resubmit the name.

**Actual Result**: The server responds with a `500 Internal Server Error`.

**Expected Result**: The server should respond with `200 OK`.

---

### Bug 2: Names Containing Only Numbers
**Description**: The system fails to handle names consisting only of numbers (e.g., `10`, `40`, `667` without quotes). When such input is submitted, the server returns a `500 Internal Server Error`.

#### Steps to Reproduce:
1. Enter a numeric name without quotes, e.g., `40`.
2. Submit the name to the API.

**Actual Result**: The server responds with a `500 Internal Server Error`.

**Expected Result**: The server should either:
1. Return a `400 Bad Request` indicating the input is invalid, or
2. Accept the numeric name and return `200 OK`.

**Status**: This bug has been **fixed**.
