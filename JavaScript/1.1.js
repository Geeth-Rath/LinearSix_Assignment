const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;


/**
 * Extends the Date prototype with a method to calculate complete days between two dates.
 * 
 * @param {Date} targetDate - The date to compare to the current date.
 * @returns {number} The number of complete days between the two dates.
 * @throws {TypeError} If the targetDate is not a valid Date object.
 */

Date.prototype.daysTo = function(targetDate) {
    if (!(targetDate instanceof Date) || isNaN(targetDate)) {
        throw new TypeError('The targetDate must be a valid Date object.');
    }

    const currentDate = this; 
    const timeDifference = targetDate - currentDate;
    const completeDaysDifference = Math.floor(timeDifference / MILLISECONDS_PER_DAY);

    return completeDaysDifference;
};

const startDate = new Date('2024-01-01');
const endDate = new Date('2024-01-10');
console.log(startDate.daysTo(endDate)); 
