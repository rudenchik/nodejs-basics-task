const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url) {
        const parsedUrl = url.parse(req.url, true);
        switch (parsedUrl.pathname) {
            case '/hello':
                hello(res, parsedUrl);
                break;
            case '/goodbye':
                bye(res, parsedUrl);
                break;
            default:
                error(res);
                break;
        }
    } else {
        error(res);
    }
});

const hello = (res, parsedUrl) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (parsedUrl.query.name) {
        res.end(`Hello, ${parsedUrl.query.name}`);
    } else {
        res.end('Hello World');
    }
}

const bye = (res, parsedUrl) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (parsedUrl.query.name) {
        res.end(`Goodbye, ${parsedUrl.query.name}`);
    } else {
        res.end('Goodbye World');
    }
}
const error = (res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Oops, something went wrong');
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});