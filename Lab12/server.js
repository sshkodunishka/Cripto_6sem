const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const stream = require("stream");
const { ServerShnorr } = require('./ESignatureShnorr');
const { ServerElgam } = require('./ESignatureElgamal');
const { ServerRSA } = require('./ESignatureRSA');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/rsa', (req, res) => {
    console.log('----------------------------/rsa');
    try {
        const textStream = fs.createReadStream(`${__dirname}/file.txt`);
        const text1 = new stream.PassThrough({ allowHalfOpen: false });
        const text2 = new stream.PassThrough({ allowHalfOpen: false });
        let text = '';
        text1.on('data', (chunk) => {
            text += chunk.toString();
        });
        text1.on('end', () => {
            console.log('My TEXT RSA: ',text);
            console.time('RSA')
            const ss = new ServerRSA();
            ss.getContext(text2, (сontext) => {
                res.send({
                    file: text,
                    sign: сontext
                });
            });
            console.timeEnd('RSA')
        })
        textStream.pipe(text1);
        textStream.pipe(text2);
    }
    catch (e) {
        console.log('RSA ERROR: ', e);
    }
});

app.get('/elgamal', (req, res) => {
    console.log('---------------------------/elgamal');
    try {
        const textStream = fs.createReadStream(`${__dirname}/file.txt`);
        const text1 = new stream.PassThrough({ allowHalfOpen: false });
        const text2 = new stream.PassThrough({ allowHalfOpen: false });
        let text = '';
        text1.on('data', (chunk) => {
            text += chunk.toString();
        });
        text1.on('end', () => {
            console.log(text);
            console.time('ElGamal')
            const ss = new ServerElgam();
            ss.getContext(text2, (context) => {
                console.log('RES SEND')
                res.send({
                    file: text,
                    sign: context
                });
            });
            console.timeEnd('ElGamal')
        })
        textStream.pipe(text1);
        textStream.pipe(text2);
    }
    catch (e) {
        console.log('Elgamal ERROR: ', e);
    }
});

app.get('/shnorr', (req, res) => {
    console.log('-------------------------------/shnorr');
    try {
        const text = fs.readFileSync(`${__dirname}/file.txt`, 'utf8');
        console.time('Shnorr')
        let ss = new ServerShnorr();
        ss = ss.getContext(text);
        res.json({
            file: text,
            sign: ss
        });
        console.timeEnd('Shnorr')
    }
    catch (e) {
        console.log('Shnorr ERROR: ', e);
    }
});

app.listen(PORT, () => {
    console.log(`SERVER IS WORKING`);
})
