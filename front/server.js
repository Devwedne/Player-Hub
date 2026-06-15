import { createReadStream, existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { createServer } from 'node:http';

const PORT = process.env.PORT || 5173;
const ROOT = resolve('.');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const server = createServer((req, res) => {
  const urlPath = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  const filePath = resolve(join(ROOT, urlPath));

  if (!filePath.startsWith(ROOT) || !existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Arquivo nao encontrado');
    return;
  }

  res.writeHead(200, {
    'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
  });
  createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Front rodando em http://localhost:${PORT}`);
});
