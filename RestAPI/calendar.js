const { google } = require('googleapis');

/**
 * Fetch free/busy data for a given calendar and time period.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {string} timeMin The start time for the query - 2024-07-29T00:00:00Z
 * @param {string} timeMax The end time for the query - 2024-08-05T00:00:00Z
 */
function getFreeBusy(auth, timeMin, timeMax) {
    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = process.env.CALENDAR_ID || 'defaultCalendarId'; 

    calendar.freebusy.query(
        {
            requestBody: {
                timeMin,
                timeMax,
                items: [{ id: calendarId }],
            },
        },
        (err, res) => {
            if (err) {
                console.error('The API returned an error:', err.message);
                return;
            }
            const busyTimes = res.data.calendars[calendarId].busy;
            console.log('Busy times:', busyTimes);
        }
    );
}

module.exports = { getFreeBusy };
