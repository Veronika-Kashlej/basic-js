const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(rev = false) {
    this.flag = !rev;
  }
  encrypt(str, key) {
    if (!str || !key) {
      throw new Error("Incorrect arguments!");
    }

    const s = str.toUpperCase();
    let k = "";
    let ki = 0;
    for (let i = 0; i < s.length; i++) {
      const charCode = s[i].charCodeAt();
      if (charCode >= 65 && charCode <= 90) {
        k += key[ki % key.length].toUpperCase();
        ki += 1;
      } else {
        k += s[i];
      }
    }

    let result = "";

    for (let i = 0; i < s.length; i++) {
      const charCode = s[i].charCodeAt();
      if (charCode >= 65 && charCode <= 90) {
        const keyCode = k[i].charCodeAt();
        let code;
        code = ((charCode - 65 + (keyCode - 65)) % 26) + 65;

        result += String.fromCharCode(code);
      } else {
        result += s[i];
      }
    }
    return this.flag ? result : result.split("").reverse("").join("");
  }
  decrypt(str, key) {
    if (!str || !key) {
      throw new Error("Incorrect arguments!");
    }
    const s = this.flag
      ? str.toUpperCase()
      : str.split("").reverse().join("").toUpperCase();
    let k = "";
    let ki = 0;
    for (let i = 0; i < s.length; i++) {
      const charCode = s[i].charCodeAt();
      if (charCode >= 65 && charCode <= 90) {
        k += key[ki % key.length].toUpperCase();
        ki += 1;
      } else {
        k += s[i];
      }
    }

    let result = "";
    for (let i = 0; i < s.length; i++) {
      const charCode = s[i].charCodeAt();
      if (charCode >= 65 && charCode <= 90) {
        const keyCode = k[i].charCodeAt();
        let code;
        code = ((charCode - 65 - (keyCode - 65) + 26) % 26) + 65;
        result += String.fromCharCode(code);
      } else {
        result += s[i];
      }
    }
    return this.flag ? result : result.split("").reverse("").join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
