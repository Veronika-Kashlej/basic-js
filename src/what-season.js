const { NotImplementedError } = require("../extensions/index.js");

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  if (date === undefined || date === null) {
    return "Unable to determine the time of year!";
  }
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date!");
  }
  const month = date.getMonth();
  if (month < 5 && month > 1) {
    return "spring";
  }
  if (month < 8 && month > 4) {
    return "summer";
  }
  if (month < 11 && month > 7) {
    return "autumn";
  }
  if (month === 11 || month === 1 || month === 0) {
    return "winter";
  }
  throw new Error("Invalid date!");
}

module.exports = {
  getSeason,
};
