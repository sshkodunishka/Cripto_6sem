const crypto = require('crypto');

class ServerShnorr {
    constructor() {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('ed25519', {
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        });
        this.prKey = privateKey;
        this.pubKey = publicKey;
    }

    getContext(rs) {
        return {
            signature: crypto.sign(null, Buffer.from(rs), this.prKey),
            publicKey: this.pubKey.toString('hex')
        };
    }
}

class ClientShnorr {
    constructor() {
    }

    async verify(signContext, rs) {
        return crypto.verify(null, Buffer.from(rs), signContext.publicKey, Buffer.from(signContext.signature));
    };
}

module.exports.ServerShnorr = ServerShnorr;
module.exports.ClientShnorr = ClientShnorr;
