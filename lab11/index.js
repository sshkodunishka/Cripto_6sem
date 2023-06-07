const crypto = require('crypto');

function getMd5(input) {
    const hash = crypto.createHash('md5');
    hash.update(input);
    return hash.digest('hex');
}

function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Input string: ', (input) => {
        console.time('hash')
        const md5 = getMd5(input);
        console.timeEnd('hash')
        console.log(`MD5: ${md5}`);
        rl.close();
    });
}

main();
