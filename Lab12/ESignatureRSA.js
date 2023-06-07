const crypto = require('crypto');

class ServerRSA {
    constructor() {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        });
        this.prKey = privateKey;
        this.pubKey = publicKey;
        this.s = crypto.createSign('sha256');
    }

    getContext(rs, cb) {
        rs.pipe(this.s);
        rs.on('end', () => {
            const signature = this.s.sign(this.prKey).toString('hex');
            cb({
                signature,
                publicKey: this.pubKey.toString('hex')
            });
        });
    }
}

class ClientRSA {
    constructor() {
        this.v = crypto.createVerify('sha256');
    }

    async verify(сontext, rs) {
        this.v.write(rs);
        this.v.end();
        return await this.v.verify(сontext.publicKey, сontext.signature, 'hex');
    }
}

module.exports.ServerRSA = ServerRSA;
module.exports.ClientRSA = ClientRSA;
