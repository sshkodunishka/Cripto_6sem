const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

const encryptRoute = (text, rows, cols, res) => {
  const n = text.length;
  if (n <= rows * cols) {
    const matrix = [];
    let k = 0;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if (k < n) {
          row.push(text[k++]);
        } else {
          row.push(' '); // add padding if the text length is less than rows*cols
        }
      }
      matrix.push(row);
    }
    console.log(matrix)
    let encryptString = "";
    for (let j = 0; j < cols; j++) {
      if (j % 2 === 0) {
        // Движение снизу вверх для нечетных столбцов
        for (let i = rows - 1; i >= 0; i--) {
          encryptString += matrix[i][j];
        }
      } else {
        // Движение сверху вниз для четных столбцов
        for (let i = 0; i < rows; i++) {
          encryptString += matrix[i][j];
        }
      }
    }
    res.send(`Decode string : ${text} \n 
              Encrypt string : ${encryptString} \n`);
  } else {
    res.send("Input correct value of rows and columns");
  }
};


const decryptRoute = (text, rows, cols, res) => {
  const matrix = new Array(+rows).fill(" ").map(() => new Array(+cols).fill(" "));
  let k = 0;
  console.log(matrix)
  // Fill matrix with text characters in zigzag pattern
  for (let j = 0; j < cols; j++) {
    if (j % 2 === 0) {
      for (let i = rows - 1; i >= 0; i--) {
        console.log(i)
        console.log(j)
        console.log(k)
        console.log(text)
        matrix[i][j] = text[k++];
      }
    } else {
      for (let i = 0; i < rows; i++) {
        matrix[i][j] = text[k++];
      }
    }
  }
  // Read matrix in row-major order to get the decrypted string
  let decryptString = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] !== " ") {
        decryptString += matrix[i][j];
      }
    }
  }
  res.send(`Encrypted string: ${text}\nDecrypted string: ${decryptString}\n`);
};


const printMatrix = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    let rowStr = '';
    for (let j = 0; j < matrix[i].length; j++) {
      rowStr += matrix[i][j] + ' ';
    }
    console.log(rowStr.trim());
  }
}

const enctyptRoute2 = (lastName, firstName, text, res) => {
  const n = text.length;
  if (n > lastName.length * firstName.length)
    res.send("Invalid input n>row*col");
  const key1 = lastName.toLowerCase().split("");
  const key2 = firstName.toLowerCase().split("");
  const rows = key1.length;
  const cols = key2.length;
  let matrix = [];

  for (let i = 0, k = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++, k++) {
      row.push(text[k] ?? ' ')
    }
    matrix.push(row);
  }
  console.log('Исходная таблица')
  printMatrix(matrix)

  for (let j = 0; j < key1.length - 1; j++) {
    for (let i = 0; i < key1.length - 1; i++) {
      if (key1[i].charCodeAt(0) > key1[i + 1].charCodeAt(0)) {
        let save;
        save = [...matrix[i]];
        matrix[i] = [...matrix[i + 1]];
        matrix[i + 1] = save;

        save = key1[i];
        key1[i] = key1[i + 1];
        key1[i + 1] = save;
      }
    }
  }

  console.log('Таблица после сортировки по строкам')
  printMatrix(matrix);

  for (let c = 0; c < key2.length - 1; c++) {
    for (let i = 0; i < key2.length - 1; i++) {
      if (key2[i].charCodeAt(0) > key2[i + 1].charCodeAt(0)) {
        let temp = []
        for (let j = 0; j < key1.length; j++) {
          temp[j] = matrix[j][i]
          matrix[j][i] = matrix[j][i + 1]
        }
        for (let j = 0; j < key1.length; j++) {
          matrix[j][i + 1] = temp[j]
        }

        let save = key2[i];
        key2[i] = key2[i + 1];
        key2[i + 1] = save;
      }
    }
  }

  console.log('Таблица после сортировки по столбцам')
  printMatrix(matrix);

  let encryptedString = ""
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      encryptedString += matrix[i][j]
    }
  }
  res.send(encryptedString);
}

const decryptRoute2 = (lastName, firstName, text, res) => {
  const n = text.length;
  if (n > lastName.length * firstName.length) {
    throw new Error("Invalid input n > row * col");
  }
  const key1 = lastName.toLowerCase().split("").sort();
  const key2 = firstName.toLowerCase().split("").sort();
  const rows = key1.length;
  const cols = key2.length;
  const matrix = [];
  const rowMatrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  const colMatrix = [];
  for (let i = 0, k = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++, k++) {
      row.push(text[k] ?? ' ')
    }
    matrix.push(row);
  }
  console.log('Исходная таблица')
  printMatrix(matrix)

  let key2Map = new Map();
  key2.forEach(symbol => {
    key2Map.set(symbol, 1)
  })

  for (let i = 0; i < firstName.length; i++) {
    let index = key2.indexOf(firstName[i])
    if (key2Map.get(firstName[i]) > 1) {
      index = key2.indexOf(firstName[i], index + 1)
    }
    key2Map.set(firstName[i], key2Map.get(firstName[i]) + 1)
    for (let j = 0; j < rows; j++) {
      rowMatrix[j][i] = matrix[j][index]
    }
  }

  console.log('Таблица после сортировки по cтолбцам')
  printMatrix(rowMatrix)

  let key1Map = new Map();
  key1.forEach(symbol => {
    key1Map.set(symbol, 1)
  })

  for (let i = 0; i < lastName.length; i++) {
    let index = key1.indexOf(lastName[i])
    if (key1Map.get(lastName[i]) > 1) {
      index = key1.indexOf(lastName[i], index + 1)
    }
    key1Map.set(lastName[i], key1Map.get(lastName[i]) + 1)
    colMatrix.push(rowMatrix[index])
  }

  console.log('Таблица после сортировки по строкам')
  printMatrix(colMatrix)

  let decryptedText = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      decryptedText += colMatrix[i][j];
    }
  }

  res.send(decryptedText);
}


//const text = "abcdefbniuyt";
// const text = "ieabfuybcdnt"
// const rows = 3;
// const cols = 4;

// encryptRoute(text, rows, cols, {
//   send: (message) => console.log(message)
// });

// decryptRoute(text, rows, cols, {
//   send: (message) => console.log(message)
// });

app.post('/encrypt', (req, res) => {
  encryptRoute(req.body.text, req.body.rows, req.body.cols, res);
})

app.post('/decrypt', (req, res) => {
  console.log(req.body)
  decryptRoute(req.body.text, req.body.rows, req.body.cols, res);
})

app.post('/encrypt2', (req, res) => {
  enctyptRoute2(req.body.lastName, req.body.firstName, req.body.text, res);
})
app.post('/dencrypt2', (req, res) => {
  decryptRoute2(req.body.lastName, req.body.firstName, req.body.text, res);
})

app.listen(port, (err) => {
  console.log(err);
  console.log('start 3000')
})
//thequickbrownfoxjumpsoverthelazydog1234567890kma