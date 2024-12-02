# QA Automation Challenge

This exercise was done using javascript

### Prerequisites
* Node installed
* axios installed (npm install sqlite3 axios)

### Monitoring script

node monitor.js

### Uptime script

node uptime-script.js

### The Bug

There is a bug in this application pertaining the format of names. The API will return a specific error when this happens - you are expected to find out the pattern of this error.

Answer:
The bug related to format of names its that if we enter numbers the system returns 500 Internal Server Error. It should return a 400 Bad Request or allow numbers instead