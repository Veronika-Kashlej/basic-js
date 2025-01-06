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
    this.flag = !rev; // true для прямой, false для обратной
  }

  encrypt(str, key) {
    if (!str || !key) {
      throw new Error("Incorrect arguments!");
    }

    const s = this.flag
      ? str.toUpperCase()
      : str.split("").reverse().join("").toUpperCase();
    let k = "";
    let ki = 0;

    // Генерация ключа
    for (let i = 0; i < s.length; i++) {
      const charCode = s[i].charCodeAt();
      if (charCode >= 65 && charCode <= 90) {
        k += key[ki % key.length].toUpperCase();
        ki++;
      } else {
        k += s[i]; // Сохраняем неалфавитные символы
      }
    }

    let result = "";

    // Шифрование
    for (let i = 0; i < s.length; i++) {
      const charCode = s[i].charCodeAt();
      if (charCode >= 65 && charCode <= 90) {
        const keyCode = k[i].charCodeAt();
        const code = ((charCode - 65 + (keyCode - 65)) % 26) + 65;
        result += String.fromCharCode(code);
      } else {
        result += s[i]; // Сохраняем неалфавитные символы
      }
    }

    return this.flag ? result : result.split("").reverse().join("");
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

    // Генерация ключа
    for (let i = 0; i < s.length; i++) {
      const charCode = s[i].charCodeAt();
      if (charCode >= 65 && charCode <= 90) {
        k += key[ki % key.length].toUpperCase();
        ki++;
      } else {
        k += s[i]; // Сохраняем неалфавитные символы
      }
    }

    let result = "";

    // Расшифровка
    for (let i = 0; i < s.length; i++) {
      const charCode = s[i].charCodeAt();
      if (charCode >= 65 && charCode <= 90) {
        const keyCode = k[i].charCodeAt();
        const code = ((charCode - 65 - (keyCode - 65) + 26) % 26) + 65;
        result += String.fromCharCode(code);
      } else {
        result += s[i]; // Сохраняем неалфавитные символы
      }
    }

    return this.flag ? result : result.split("").reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
