const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  const arr = [];
  let count = 1;
  for (let i = 1; i < str.length; i += 1) {
    if (str[i] === str[i - 1]) {
      count += 1;
      if (i === str.length - 1) {
        arr.push(`${count}${str[i]}`);
      }
    } else {
      if (i === str.length - 1 && str[i] !== str[i - 1]) {
        arr.push(`${count === 1 ? "" : count}${str[i - 1]}${str[i]}`);
      } else {
        arr.push(`${count === 1 ? "" : count}${str[i - 1]}`);
      }
      count = 1;
    }
  }
  return arr.join("");
}

module.exports = {
  encodeLine,
};
