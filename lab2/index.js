const fs = require('fs');

let tadjikText = fs.readFileSync('./tadjik.txt');
let czechText = fs.readFileSync('./czech.txt');
let bynaryText = fs.readFileSync('./binary.txt');

const tadjik = 'абвгғдеёжзиӣйкқлмнопрстуӯфхҳчҷшъэюя';
const czech = 'abcdefghijklmnoprstuvyz'
const binary = '01'
const english = "abcdefghijklmnopqrstuvwxyz.!"

tadjikText = tadjikText.toString().toLowerCase().replace(/[^а-яёғӣқҳҷ]/gi, '');
czechText = czechText.toString().toLowerCase().replace(/[^a-z]/gi, '');
bynaryText = bynaryText.toString().toLowerCase().replace(/[^01]/gi, '');

const name = 'Шкода Кристина Михайловна';
const name1 = name.toLowerCase().replace(/[^а-яёғӣқҳҷ]/g, '');

const name2 = 'Skoda Kristina Mikhailovna';
const name3 = name2.toLowerCase().replace(/[^a-z]/g, '');

let shanon = (str, alphabet) => {
    let H = 0;
    for (let i = 0; i < alphabet.length; i++) {
        let symbol = alphabet.charAt(i),
            s = new RegExp(symbol, 'g'),
            p = (str.match(s) === null) ? 0 : str.match(s).length / str.length;
        //  console.log(`Symbol: '${symbol}', P = ${p}`);
        if (p !== 0) {
            H += p * Math.log2(p);
        }
    }
    return -H;
};

let lastTask = (p, alf) => {
    const q = 1 - p;
    if (alf.length === 2 || p < 0.99) {
        const h = (- p * Math.log2(p) - q * Math.log2(q));
        return (h);
    } else {
        return 1
    }
};


let countOfInformation = (name, H) => name.length * H;

const ASCII = name1.split('').map((letter) =>
    (letter.charCodeAt() - 848).toString(2)).join('');

const ASCII2 = name3.split('').map((letter) =>
    (letter.charCodeAt() - 848).toString(2)).join('');

console.log('                   TASK 1');
console.log('                   tadjik');
let tadjikEntr = shanon(tadjikText, tadjik)
console.log(`Энтропия = ${tadjikEntr}`);
console.log('                   czech');
let czechEntr = shanon(czechText, czech)
console.log(`Энтропия = ${czechEntr}`);


console.log('                   TASK 2');
let bynaryEntr = shanon(bynaryText, binary);
console.log(`Энтропия = ${bynaryEntr}`);


console.log('                   TASK 3');
console.log(`Count of information for tadjik= ${countOfInformation(name1, tadjikEntr)}`);
console.log(`Count of information for czech = ${countOfInformation(name3, czechEntr)}`);
console.log(`Count of information (ASCII) for tadjik: ${countOfInformation(ASCII, bynaryEntr)}`);
console.log(`Count of information (ASCII) for czech: ${countOfInformation(ASCII2, bynaryEntr)}`);

console.log('                   TASK 4');
console.log('                   tadjik');
console.log("0,1 ", (1 - lastTask(0.1,tadjik)) * name1.length);
console.log("0,5 ", (1 - lastTask(0.5,tadjik)) * name1.length);
console.log("1 ", (1 - lastTask(0.99,tadjik)) * name1.length);

console.log('                   tadjik ASCII');
console.log("0,1 ", (1 - lastTask(0.1,binary)) * ASCII.length);
console.log("0,5 ", (1 - lastTask(0.5,binary)) * ASCII.length);
console.log("1 ", (1 - lastTask(0.99,binary)) * ASCII.length);

console.log('                   czech');
console.log("0,1 ", (1 - lastTask(0.1,czech)) * name3.length);
console.log("0,5 ", (1 - lastTask(0.5,czech)) * name3.length);
console.log("1 ", (1 - lastTask(1,czech)) * name3.length);
console.log('                   czech ASCII');
console.log("0,1 ", (1 - lastTask(0.1,binary)) * ASCII2.length);
console.log("0,5 ", (1 - lastTask(0.5,binary)) * ASCII2.length);
console.log("1 ", (1 - lastTask(0.99,binary)) * ASCII2.length);

// console.log('                   binary');
// console.log("0,1 ", bynaryEntr * bynaryText.length * (1 - 0.1));
// console.log("0,5 ", bynaryEntr * bynaryText.length * (1 - 0.5));
// console.log("1 ", bynaryEntr * bynaryText.length * (1 - 0.9999999));
// let decryptedString = fs.readFileSync('./decryptedString.txt');
// decryptedString = decryptedString.toString().toLowerCase().replace(/[^a-z]/gi, '');
// console.log('---------decryptedString')
// console.log(shanon(decryptedString, english))
// console.log('---------decryptedStringTrismus')
// let decryptedStringTrismus = fs.readFileSync('./decryptedStringTrismus.txt');
// decryptedStringTrismus = decryptedStringTrismus.toString().toLowerCase().replace(/[^a-z]/gi, '');
// console.log(shanon(decryptedStringTrismus, english))
// console.log('---------encryptedString')
// let encryptedString = fs.readFileSync('./encryptedString.txt');
// encryptedString = encryptedString.toString().toLowerCase().replace(/[^a-z]/gi, '');
// console.log(shanon(encryptedString, english))
// console.log('---------encryptedStringTrismus')
// let encryptedStringTrismus = fs.readFileSync('./encryptedStringTrismus.txt');
// encryptedStringTrismus = encryptedStringTrismus.toString().toLowerCase().replace(/[^a-z]/gi, '');
// console.log(shanon(encryptedStringTrismus, english))