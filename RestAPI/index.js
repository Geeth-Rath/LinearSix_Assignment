require('dotenv').config(); 
const readline = require('readline');
const { authorize } = require('./auth');
const { getFreeBusy } = require('./calendar');

/**
 * Prompt user for input and start the application.
 */
function promptUserAndStart() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Enter the start time (YYYY-MM-DDTHH:MM:SSZ): ', (timeMin) => {
        rl.question('Enter the end time (YYYY-MM-DDTHH:MM:SSZ): ', (timeMax) => {
            rl.close();

            if (!validateDateTime(timeMin) || !validateDateTime(timeMax)) {
                console.error('Invalid date-time format. Please use the format YYYY-MM-DDTHH:MM:SSZ');
                return;
            }

            if (new Date(timeMin) >= new Date(timeMax)) {
                console.error('The start time must be before the end time.');
                return;
            }

            authorize((auth) => {
                getFreeBusy(auth, timeMin, timeMax);
            });
        });
    });
}

/**
 * Validate the date-time string format.
 * @param {string} dateTime The date-time string to validate.
 * @returns {boolean} Whether the date-time format is valid.
 */
function validateDateTime(dateTime) {
    const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    return isoDateTimeRegex.test(dateTime);
}

promptUserAndStart();
