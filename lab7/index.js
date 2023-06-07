const crypto = require('crypto');

function encryptDES_EDE3(plaintext, key) {
    console.time('encrypt')
    const keyData = Buffer.from(key, 'hex');
    const iv = Buffer.alloc(8, 0);

    const cipher = crypto.createCipheriv('des-ede3-cbc', keyData, iv);
    let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
    ciphertext += cipher.final('hex');
    console.timeEnd('encrypt')
    return ciphertext;
}


function decryptDES_EDE3(ciphertext, key) {
    console.time('decrypt')
    const keyData = Buffer.from(key, 'hex');
    const iv = Buffer.alloc(8, 0);

    const decipher = crypto.createDecipheriv('des-ede3-cbc', keyData, iv);
    let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
    plaintext += decipher.final('utf8');

    console.timeEnd('decrypt')
    return plaintext;
}
function hexToUtf8(hexStr) {
    let utf8Str = '';
    for (let i = 0; i < hexStr.length; i += 2) {
      const hexCode = parseInt(hexStr.substr(i, 2), 16);
      utf8Str += String.fromCharCode(hexCode);
    }
    return utf8Str;
  }

const plaintext = 'My inst: @shkodunishka';
const key = '0123456789abcdef0123456789abcdef0123456789abcdef';
const ciphertext = encryptDES_EDE3(plaintext, key);
const decryptedText = decryptDES_EDE3(ciphertext, key);
console.log(hexToUtf8(ciphertext)); 
console.log(decryptedText); 