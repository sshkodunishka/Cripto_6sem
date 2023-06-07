const app = require('express')();
const fs = require('fs');
const { ClientShnorr } = require('./ESignatureShnorr');
const { ClientElgam } = require('./ESignatureElgamal');
const { ClientRSA } = require('./ESignatureRSA');
const request = require('request-promise');

const PORT = 3001;


app.listen(PORT, async () => {
    await request({
        method: 'GET',
        uri: 'http://localhost:3000/rsa',
        json: true
    })
        .then((response) => {
            console.log('---------------------RSA')
            let signature = response.sign;
            console.log('-----------Signature:  ', signature)
            let txt = response.file;
            console.log('-----------Txt:  ', txt)
            let cv = new ClientRSA();
            cv.verify(signature, txt).then((isVerify) => {
                if (isVerify) {
                    console.log('Verified RSA')
                } else {
                    console.log('Fake RSA')
                }
            }
            )
        })
        .catch((err) => {
            console.log(`RSA ERROR: ${err}`);
        });

    await request({
        method: 'GET',
        uri: 'http://localhost:3000/elgamal',
        json: true
    })
        .then((response) => {
            console.log('---------------------ELGAMAL')
            let signature = response.sign;
            console.log('-----------Signature:  ', signature)
            let txt = response.file;
            console.log('-----------Txt:  ', txt)
            let cv = new ClientElgam();
            cv.verify(signature, txt).then((isVerify) => {
                if (isVerify) {
                    console.log('Verified ELGAM')
                } else {
                    console.log('Fake ELGAM')
                }
            }
            )
        })
        .catch((err) => {
            console.log(`Elgamal ERROR: ${err}`);
        });

    await request({
        method: 'GET',
        uri: 'http://localhost:3000/shnorr',
        json: true
    })
        .then((response) => {
            console.log('---------------------SHNORR')
            let signature = response.sign;
            console.log('-----------Signature:  ', signature)
            let txt = response.file;
            console.log('-----------Txt:  ', txt)
            let cv = new ClientShnorr();
            cv.verify(signature, txt).then((isVerify) => {
                if (isVerify) {
                    console.log('Verified Shnorr')
                } else {
                    console.log('Fake Shnorr')
                }
            }
            )
        })
        .catch((err) => {
            console.log(`Shnorr ERROR: ${err}`);
        });
})
