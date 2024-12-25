const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const obj = {};
  const arr = domains.map((x) => (x = x.split(".").reverse()));
  const arrayKeys = [];

  for (let i = 0; i < arr.length; i += 1) {
    let key = "";
    for (let j = 0; j < arr[i].length; j += 1) {
      key += ".";
      key += `${arr[i][j]}`;
      arrayKeys.push(key);
    }
  }
  const set = new Set(arrayKeys);
  set.forEach((key, value) => {
    let count = 0;
    arrayKeys.forEach((x) => {
      if (x === key) {
        count += 1;
      }
    });
    obj[key] = count;
  });
  return obj;
}

module.exports = {
  getDNSStats,
};
