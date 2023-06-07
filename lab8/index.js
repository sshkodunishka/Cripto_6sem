function getGenerate() {
    // задаем начальное значение
    let x = 7; // можно выбрать любое число, которое является взаимно простым с n

    // задаем константы
    const p = 23;
    const q = 11;
    const n = p * q;

    // генерируем псевдослучайные числа
    for (let i = 0; i < 10; i++) { // генерируем 10 чисел
        x = Math.pow(x, 2) % n; // возводим в квадрат по модулю n
        const bit = x % 2; // берем младший бит
        console.log(bit);
    }
}

function rc4(plaintext) { 
    const key = [61, 60, 23, 22, 21, 20];
    const keyLength = key.length;
    const n = 8;
    const stateSize = 2 ** n;
    const state = new Array(stateSize);
    let index1 = 0;
    let index2 = 0;
    let ciphertext = '';
    console.time('rc4');

    for (let i = 0; i < stateSize; i++) {
      state[i] = i;
    }
    
    for (let i = 0; i < stateSize; i++) {
      index2 = (index2 + state[i] + key[i % keyLength]) % stateSize;
      [state[i], state[index2]] = [state[index2], state[i]];
    }
    index2 = 0

    for (let i = 0; i < plaintext.length; i++) {
      index1 = (index1 + 1) % stateSize;
      index2 = (index2 + state[index1]) % stateSize;
      [state[index1], state[index2]] = [state[index2], state[index1]];
      const keystreamByte = state[(state[index1] + state[index2]) % stateSize];
      const ciphertextByte = plaintext.charCodeAt(i) ^ keystreamByte;
      ciphertext += String.fromCharCode(ciphertextByte);
    }
    console.log(state)
    console.timeEnd('rc4');
    console.log(ciphertext);
    return ciphertext;
  }
  

rc4('kris')
rc4('nÍhC')
getGenerate()