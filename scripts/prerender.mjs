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
import { blogArtikel, routen } from './routen.mjs';

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

const esc = (t) =>
  String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Vorlage für das automatisch erzeugte OG-Bild eines Artikels (1200 × 630). */
function ogHtml(a) {
  const datum = new Date(a.geaendert || a.datum).toLocaleDateString('de-DE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face { font-family: Archivo; src: url(/assets/fonts/archivo-normal-latin.woff2) format('woff2'); font-weight: 100 900; }
@font-face { font-family: Mono; src: url(/assets/fonts/spline-sans-mono-normal-latin.woff2) format('woff2'); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; padding: 72px 80px; background: #F5F2ED; color: #1A1917;
  display: flex; flex-direction: column; justify-content: space-between; font-family: Archivo, sans-serif; }
.mono { font-family: Mono, monospace; font-size: 24px; color: #6E6A63; letter-spacing: .02em; }
h1 { font-size: 66px; line-height: 1.08; font-weight: 700; letter-spacing: -.02em; max-width: 1000px;
  display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.fuss { display: flex; justify-content: space-between; border-top: 2px solid #D6D1C8; padding-top: 28px; }
</style></head><body>
<p class="mono">ozan.orhan / Blog</p>
<h1>${esc(a.titel)}</h1>
<div class="fuss mono"><span>Ozan Orhan · AI Automation Engineer</span><span>${esc(datum)}</span></div>
</body></html>`;
}

function server() {
  return createServer(async (req, res) => {
    const pfad = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const og = pfad.match(/^\/__og\/([a-z0-9-]+)$/);
    if (og) {
      const a = blogArtikel().find((x) => x.slug === og[1]);
      if (!a) return res.writeHead(404).end('nicht gefunden');
      res.writeHead(200, { 'Content-Type': TYPEN['.html'] });
      return res.end(ogHtml(a));
    }
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

// Ohne STRAPI_TOKEN bleibt public/blog leer; ein Upload würde alle Artikel live löschen.
if (!blogArtikel().length && process.env.LEERER_BLOG !== '1') {
  console.error('Abbruch: keine Blogartikel in public/blog/artikel.json. STRAPI_TOKEN setzen und neu bauen');
  console.error('(oder LEERER_BLOG=1, wenn der Blog wirklich leer sein soll).');
  process.exit(1);
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
    // Der Renderer hat keine gespeicherte Wahl und zeigt den Consent-Dialog. Der gehört nicht
    // ins statische HTML (Suchmaschinen, Aufblitzen); Angular blendet ihn bei Bedarf selbst ein.
    stdout = stdout.replace(/(<app-consent[^>]*>)[\s\S]*?(<\/app-consent>)/, '$1$2');

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

// OG-Bild je Artikel, sofern in Strapi kein eigenes Titelbild gepflegt ist
for (const a of blogArtikel().filter((x) => !x.bild)) {
  const ziel = join(WURZEL, 'blog', a.slug, 'og.png');
  try {
    await mkdir(join(ziel, '..'), { recursive: true });
    await run(CHROME, [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=3000',
      `--screenshot=${ziel}`,
      `http://127.0.0.1:${port}/__og/${a.slug}`,
    ]);
    if (!existsSync(ziel)) throw new Error('kein Bild geschrieben');
    console.log(`  ✔ og.png ${a.slug}`);
  } catch (e) {
    console.error(`  ✘ og.png ${a.slug} — ${e.message}`);
    fehler++;
  }
}

srv.close();
console.log(`\nPrerendering: ${ok} Routen geschrieben, ${fehler} Fehler.`);
process.exit(fehler ? 1 : 0);
