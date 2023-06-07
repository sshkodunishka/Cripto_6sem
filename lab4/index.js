const fs = require("fs");

const english = "abcdefghijklmnopqrstuvwxyz.!-"
console.log(english.length)
const N = english.length;
const a = 6;
const b = 7;
let encryptedT = ""
let decriptedT = ""
let encryptedS = ""
let decriptedS = ""

function findModularInverse(num, modulus) {
    let [prevRem, currRem] = [modulus, num];
    let [prevCoeff, currCoeff] = [0, 1];

    while (currRem !== 0) {
        let quotient = Math.floor(prevRem / currRem);
        [prevCoeff, currCoeff] = [currCoeff, prevCoeff - quotient * currCoeff];
        [prevRem, currRem] = [currRem, prevRem - quotient * currRem];
    }
    if (prevRem > 1) {
        throw new Error(`${num} is not invertible modulo ${modulus}`);
    }
    if (prevCoeff < 0) {
        prevCoeff += modulus;
    }
    return prevCoeff;
}

let aInverse = findModularInverse(a, N)
//---------------------------------ENCRIPTED
const string = fs.readFileSync("text.txt", "utf8").toLowerCase();
console.log(string.length)
console.time('encrypt')
for (let i = 0; i < string.length; i++) {
    let letter = string.charAt(i)
    let position = english.indexOf(letter)
    if (position < 0) {
        encryptedT += letter;
        continue
    }
    let newPosition = (a * position + b) % N;
    let newLetter = english.charAt(newPosition)
    encryptedT += newLetter
}
console.timeEnd('encrypt')
fs.writeFileSync("encryptedString.txt", encryptedT);
//------------------------------DECRIPTED
const encryptedString = fs.readFileSync("encryptedString.txt", "utf8").toLowerCase();
console.time('decrypt')
for (let i = 0; i < encryptedString.length; i++) {
    let letter = encryptedString.charAt(i)

    let position = english.indexOf(letter)
    if (position < 0) {
        decriptedT += letter;
        continue
    }
    let newPosition = aInverse * (position + N - b) % N;
    let newLetter = english.charAt(newPosition)
    decriptedT += newLetter
}
console.timeEnd('decrypt')
fs.writeFileSync("decryptedString.txt", decriptedT);



let newEnglish = "abcdefghijklmnopqrstuvwxyz!-"
let keyWord = 'security'

for (let i = 0; i < keyWord.length; i++) {
    for (let j = 0; j < newEnglish.length; j++) {
        if (keyWord.charAt(i) === newEnglish.charAt(j)) {
            newEnglish = newEnglish.split(newEnglish.charAt(j)).join('')
        }
    }
}
newEnglish = 'security' + newEnglish;
let indexOfLetter = 0
let table = [[], [], [], [], [], [], []]
for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 4; j++) {
        table[i][j] = newEnglish.charAt(indexOfLetter)
        indexOfLetter++
    }
}
// console.log(table.)
console.log(table)
console.log(newEnglish)
console.time('encryptTrismus')
for (let i = 0; i < string.length; i++) {
    let letter = string.charAt(i)
    let column = newEnglish.indexOf(letter)
    let row = Math.floor((column + 0.01) / 4)
    if (column < 0) {
        encryptedS += letter;
        continue
    }
    let newLetter
    if (row === 6) {
        newLetter = table[0][column % 4]
    } else {
        newLetter = table[row + 1][column % 4]
    }
    // console.log(letter + '----' + row + '---' + column % 4 + '=====' + newLetter)
    encryptedS += newLetter
}
console.timeEnd('encryptTrismus')
fs.writeFileSync("encryptedStringTrismus.txt", encryptedS);
console.time('decryptTrismus')
for (let i = 0; i < encryptedS.length; i++) {
    let letter = encryptedS.charAt(i)
    let column = newEnglish.indexOf(letter)
    let row = Math.floor((column + 0.01) / 4)

    if (column < 0) {
        decriptedS += letter;
        continue
    }
    let newLetter
    if (row === 0) {
        newLetter = table[6][column % 4]
    } else {
        newLetter = table[row - 1][column % 4]
    }
    decriptedS += newLetter
}
console.timeEnd('decryptTrismus')
fs.writeFileSync("decryptedStringTrismus.txt", decriptedS);

