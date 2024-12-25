const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!(arr instanceof Array)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  const a = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === "--double-next") {
      if (i === arr.length - 1) {
        break;
      }
      a.push(arr[i + 1]);
      continue;
    }
    if (arr[i] === "--double-prev") {
      if (i === 0) {
        continue;
      }
      if (arr[i - 2] === "--discard-next") {
        continue;
      } else {
        a.push(arr[i - 1]);
        continue;
      }
    }
    if (arr[i] === "--discard-next") {
      i += 1;
      continue;
    }
    if (arr[i] === "--discard-prev") {
      if (i === 0) {
        continue;
      }
      if (arr[i - 2] === "--discard-next") {
        continue;
      } else {
        a.pop();
        continue;
      }
    }
    a.push(arr[i]);
  }
  console.log(arr);
  return a;
}

module.exports = {
  transform,
};
