function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const CalculateNOD = (x, y) => {
    while (x !== 0 && y !== 0) {
        if (x > y) {
            x = x % y;
        } else {
            y = y % x;
        }
    }
    return Math.max(x, y);
}

const generateCloseKey = (z) => {
    let di = z;
    const arrD = [];
    let sum = 0;
    for (let i = 0; i < z; i++) {
        do {
            di = getRandomInt(z) + sum;
        } while (di <= sum)
        arrD.push(di);
        sum += arrD[i];
    }
    return arrD;
}

const generateCoefA = (n) => {
    let a = 0;
    do {
        a = getRandomInt(n) + 1;
    } while (CalculateNOD(n, a) !== 1)
    return a;
}

const getInvMod = (a, m) => {
    [a, m] = [+a, +m];
    a = (a % m + m) % m;
    if (!a || m < 2)
        return `входные данные не верны`;
    let [s, b] = [[], m];
    while (b)
        ([a, b] = [b, a % b], s.push({a, b}));
    if (a !== 1)
        return `'a' не обратимое, то есть не имеет обратного`;
    let [x, y] = [1, 0];
    for (let i = s.length - 2; i >= 0; --i)
        [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)];
    return (y % m + m) % m;
}

const generateOpenKey = (closeKey, a, n) => {
    return closeKey.map(number => (number * a) % n)
}

const encryptText = (byteTextArray, e) => {
    return byteTextArray.map(byteText => {
        return byteText.split('').reduce((acc, byte, index) => {
            if (byte === '1')
                return acc += e[index]
            return acc;
        }, 0)
    })
}

const decryptText = (decryptedArray, invertA, n) => {
    return decryptedArray.map(number => (number * invertA) % n)
}

const generateLetters = (numberArray, closeKey) => {
    let word = '';
    closeKey = closeKey.reverse();
    numberArray.forEach(number => {
        let letter = '';
        for (let i = 0; i < closeKey.length; i++) {
            if (number - closeKey[i] >= 0) {
                letter = '1' + letter;
                number -= closeKey[i]
            }
            else{
                letter = '0' + letter;
            }
        }
        letter = parseInt(letter,2);
        word +=  String.fromCharCode(letter);
    })
    return word;
}

const closeKey = generateCloseKey(8);
console.log({closeKey});
const n = closeKey.reduce((acc, curValue) => acc + curValue, 0) + 2;
console.log({n});
const a = generateCoefA(n)
console.log({a});
const e = generateOpenKey(closeKey, a, n);
console.log({e});
const invertA = getInvMod(a, n);
console.log({invertA});
const inputText = 'shkoda';
console.log({inputText});
const inputBytesText = inputText.split('').map(symbol => {
    let letter = symbol.charCodeAt(0).toString(2);
    if(letter.length !== 8){
        const sizeOfZeros = 8 - letter.length;
        letter = '0'.repeat(sizeOfZeros) + letter;
    }
    return letter;
});
console.log({inputBytesText});
const encryptedTextT = encryptText(inputBytesText, e);
console.log({encryptedTextT})
console.time('ENCRYPT')
const encryptedText = encryptText(inputBytesText, e).map(number => String.fromCharCode(number)).join('');
console.log({encryptedText});
console.timeEnd('ENCRYPT')
console.time('DECRYPT')
const decryptedNumber = decryptText(encryptedText.split('').map(symbol => symbol.charCodeAt(0)), invertA, n )
console.log({decryptedNumber})
const decryptedText = generateLetters(decryptedNumber, closeKey);
console.log({decryptedText})
console.timeEnd('DECRYPT')


// Импортируем модуль для работы с base64
const { encode, decode } = require('base-64');

// Функция для шифрования строки на основе алгоритма укладки ранца и base64
function encryptString(plainText, publicKey) {
  // Преобразуем публичный ключ в бинарное представление
  const binaryKey = publicKey.split(',').map(Number);

  // Преобразуем символы строки в числовые значения
  const charCodes = Array.from(plainText, (char) => char.charCodeAt(0));

  // Шифруем символы строки
  const encryptedCodes = charCodes.map((charCode, index) => charCode * binaryKey[index]);

  // Преобразуем зашифрованные числовые значения в base64
  const base64Encoded = encode(encryptedCodes.join(','));

  return base64Encoded;
}

// Функция для расшифровки строки на основе алгоритма укладки ранца и base64
function decryptString(cipherText, privateKey) {
  // Преобразуем приватный ключ в бинарное представление
  const binaryKey = privateKey.split(',').map(Number);

  // Декодируем base64
  const base64Decoded = decode(cipherText);

  // Преобразуем числовые значения из base64 в массив
  const encryptedCodes = base64Decoded.split(',').map(Number);

  // Расшифровываем числовые значения
  const decryptedCodes = encryptedCodes.map((code, index) => Math.round(code / binaryKey[index]));

  // Преобразуем числовые значения в символы
  const decryptedTextBase = String.fromCharCode(...decryptedCodes);

  return decryptedTextBase;
}

// Пример использования
const publicKey = '1,0,1,1,0,1'; // Публичный ключ
const privateKey = '1,0,1,1,0,1'; // Приватный ключ

const plainText = 'Hello, World!';
const encryptedTextBase = encryptString(plainText, publicKey);
console.log('Зашифрованный текст:', encryptedTextBase);

const decryptedTextBase = decryptString(encryptedTextBase, privateKey);
console.log('Расшифрованный текст:', decryptedTextBase);
