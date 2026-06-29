// Zero-dependency static server for the built site (dist/).
// Runs with the Node that ships in this project — no install needed.
// Double-click `abrir-site.command` to launch it.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, extname } from 'node:path';
import { exec } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const START_PORT = 4321;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolveFile(urlPath) {
  // Decode + strip query/hash, block path traversal.
  let p = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  p = normalize(p).replace(/^(\.\.[/\\])+/, '');
  let full = join(ROOT, p);
  if (!full.startsWith(ROOT)) return null;

  const tryPaths = [];
  if (p.endsWith('/')) {
    tryPaths.push(join(full, 'index.html'));
  } else {
    tryPaths.push(full);
    if (!extname(full)) {
      tryPaths.push(full + '.html');
      tryPaths.push(join(full, 'index.html'));
    }
  }
  for (const candidate of tryPaths) {
    try {
      const s = await stat(candidate);
      if (s.isDirectory()) {
        const idx = join(candidate, 'index.html');
        await stat(idx);
        return idx;
      }
      return candidate;
    } catch { /* try next */ }
  }
  return null;
}

const server = createServer(async (req, res) => {
  try {
    const file = await resolveFile(req.url || '/');
    if (!file) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404</h1><p>Não encontrado.</p>');
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500: ' + err.message);
  }
});

function listen(port, attemptsLeft) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      listen(port + 1, attemptsLeft - 1);
    } else {
      console.error('\n  Erro ao arrancar o servidor:', err.message, '\n');
      process.exit(1);
    }
  });
  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log('\n  ────────────────────────────────────────');
    console.log('   RE/MAX Collection Vintage — pré-visualização');
    console.log('  ────────────────────────────────────────');
    console.log(`\n   Site a correr em:  ${url}`);
    console.log('\n   (a abrir no navegador automaticamente…)');
    console.log('   Para parar: fecha esta janela ou carrega Ctrl + C.\n');
    exec(`open "${url}"`);
  });
}

listen(START_PORT, 15);
