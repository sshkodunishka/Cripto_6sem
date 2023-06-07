const ElGamal = require("elgamal");
const NodeRSA = require('node-rsa');
const fs = require('fs')

var Alphabet = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ π®ƒ©∆";
Alphabet = Alphabet.split("");

let Alice;
let Bob;

const keyRSA = new NodeRSA({ b: 2048 });
let keyEl = null;





function runRSA() {
    const file = fs.readFileSync('./text.txt').toString()
    console.time('KEY GENERATION')
    const key = new NodeRSA({ b: 2048 });
    console.timeEnd('KEY GENERATION')
    const text = file;
    console.time('START ENCRYPTION');
    console.log('---------------START ENCRYPTION RSA----------------');
    const encrypted = key.encrypt(text, 'base64');
    console.timeEnd('START ENCRYPTION')
    console.log('encrypted: ', encrypted);
    console.time('START DECRYPTION');
    console.log('---------------START DECRYPTION RSA----------------');
    const decrypted = key.decrypt(encrypted, 'utf8');
    console.timeEnd('START DECRYPTION');
    console.log('decrypted: ', decrypted);
}

async function runElGamal() {
    const file = fs.readFileSync('./text.txt').toString()
    console.time('KEY GENERATE ElGAMAL');
    const eg = await ElGamal.default.generateAsync(2048);
    console.timeEnd('KEY GENERATE ElGAMAL');
    const secret = file;
    console.time('ENCRYPT ElGAMAL');
    console.log('---------------START ENCRYPTION ELGAMAL----------------');
    const encrypted = await eg.encryptAsync(secret);
    console.timeEnd('ENCRYPT ElGAMAL');
    console.time('DECRYPT ElGAMAL');
    console.log('---------------START DECRYPTION ELGAMAL----------------');
    const decrypted = await eg.decryptAsync(encrypted);
    console.timeEnd('DECRYPT ElGAMAL');
    console.log(decrypted.toString() === secret);
}

runRSA();
runElGamal();
