/**
 * Statisches Prerendering ohne Node-Server im Betrieb.
 * Jede Route wird von Headless-Chrome gerendert und als eigene index.html
 * abgelegt — direkt auf Apache-Shared-Hosting deploybar.
 */
import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { routen } from './routen.mjs';

const run = promisify(execFile);
const WURZEL = 'dist/portfolio/browser';
const CHROME =
  process.env.CHROME_PFAD ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const TYPEN = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function server() {
  return createServer(async (req, res) => {
    const pfad = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let datei = join(WURZEL, normalize(pfad).replace(/^(\.\.[/\\])+/, ''));
    if (!existsSync(datei) || !extname(datei)) datei = join(WURZEL, 'index.html');
    try {
      const inhalt = await readFile(datei);
      res.writeHead(200, { 'Content-Type': TYPEN[extname(datei)] ?? 'application/octet-stream' });
      res.end(inhalt);
    } catch {
      res.writeHead(404).end('nicht gefunden');
    }
  });
}

const srv = server();
await new Promise((ok) => srv.listen(0, '127.0.0.1', ok));
const port = srv.address().port;

let ok = 0;
let fehler = 0;

for (const { pfad } of await routen()) {
  const url = `http://127.0.0.1:${port}${pfad}`;
  try {
    let { stdout } = await run(
      CHROME,
      [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--hide-scrollbars',
        '--virtual-time-budget=12000',
        '--run-all-compositor-stages-before-draw',
        '--dump-dom',
        url,
      ],
      { maxBuffer: 64 * 1024 * 1024 },
    );

    if (!stdout.includes('<app-root') || stdout.length < 2000) {
      throw new Error(`leeres Ergebnis (${stdout.length} Zeichen)`);
    }

    // Das Theme darf nicht ins statische HTML einbrennen: der Renderer hat ein
    // eigenes Farbschema, der Besucher ein anderes. Das Inline-Skript entscheidet.
    stdout = stdout.replace(/<html([^>]*?)\sdata-theme="[^"]*"/, '<html$1');

    const ziel = pfad === '/' ? join(WURZEL, 'index.html') : join(WURZEL, pfad, 'index.html');
    await mkdir(join(ziel, '..'), { recursive: true });
    await writeFile(ziel, stdout, 'utf8');
    console.log(`  ✔ ${pfad.padEnd(44)} ${(stdout.length / 1024).toFixed(0)} kB`);
    ok++;
  } catch (e) {
    console.error(`  ✘ ${pfad} — ${e.message}`);
    fehler++;
  }
}

srv.close();
console.log(`\nPrerendering: ${ok} Routen geschrieben, ${fehler} Fehler.`);
process.exit(fehler ? 1 : 0);
