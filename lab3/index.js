const http = require('http')
const url = require('url')
const fs = require('fs')

let server = http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        let page = fs.readFileSync('./index.html');
        res.end(page)
    }
})
server.listen(3000)



