/**
 * getISODateWithoutTime
 * @param {Date} date input
 * @returns date string without time (e.g: '2022-08-22')
 */
export function getISODateWithoutTime(date) {
    return date.toISOString().substring(0, 10);
}

/**
 * addDayDate
 * @param {Date} current current date
 * @param {number} daysToAdd number of days to be added
 * @returns new Date object
 */
export function addDayDate(current, daysToAdd) {
    const newDate = new Date(+current);
    newDate.setDate(current.getDate() + daysToAdd);
    return newDate;
}

/**
 * calculateNumberOfDaysBetweenTwoDates
 * @param {Date} date1
 * @param {Date} date2
 * @returns date2 - date1 in day
 */
export function calculateNumberOfDaysBetweenTwoDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.ceil( (date2 - date1) / oneDay);
}