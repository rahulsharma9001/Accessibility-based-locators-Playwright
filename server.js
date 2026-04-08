const http = require('http');
const fs = require('fs');
const path = require('path');
const { env } = require('./config/env');

const host = '127.0.0.1';
const port = env.port;
const publicDir = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

const defaultState = {
  formStatus: 'Waiting for input',
  cartStatus: 'Cart is empty'
};

let demoState = { ...defaultState };

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

function sendFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/state' && req.method === 'GET') {
    sendJson(res, 200, demoState);
    return;
  }

  if (req.url === '/api/state/reset' && req.method === 'POST') {
    demoState = { ...defaultState };
    sendJson(res, 200, demoState);
    return;
  }

  if (req.url === '/api/signup' && req.method === 'POST') {
    parseJsonBody(req)
      .then(({ fullName, email, plan }) => {
        demoState.formStatus = `${fullName} joined the ${plan} plan waitlist using ${email}.`;
        sendJson(res, 200, demoState);
      })
      .catch(() => {
        sendJson(res, 400, { error: 'Invalid request body' });
      });
    return;
  }

  if (req.url === '/api/cart' && req.method === 'POST') {
    parseJsonBody(req)
      .then(({ productName }) => {
        demoState.cartStatus = `${productName} added to cart.`;
        sendJson(res, 200, demoState);
      })
      .catch(() => {
        sendJson(res, 400, { error: 'Invalid request body' });
      });
    return;
  }

  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const normalizedPath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(publicDir, normalizedPath);

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  sendFile(filePath, res);
});

server.listen(port, host, () => {
  console.log(`Demo app running at http://${host}:${port}`);
});
