import { existsSync, readFileSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const require_ = createRequire(import.meta.url);
export const ORIGIN = 'https://ozan-orhan.com';

/** Wie seiteUrl() in src/app/core/site.ts: Seiten-URLs immer mit Schrägstrich am Ende. */
export const seiteUrl = (pfad) => ORIGIN + (pfad.endsWith('/') ? pfad : `${pfad}/`);

/** works.ts einmal kompilieren und laden, damit Sitemap und llms.txt nie driften. */
export async function projekte() {
  const esbuild = require_('esbuild');
  const quelle = new URL('../src/app/data/works.ts', import.meta.url).pathname;
  const out = join(mkdtempSync(join(tmpdir(), 'works-')), 'works.cjs');
  await esbuild.build({
    entryPoints: [quelle],
    bundle: true,
    format: 'cjs',
    platform: 'node',
    outfile: out,
    logLevel: 'silent',
  });
  return require_(out).WORKS;
}

/** Von scripts/blog-daten.mjs erzeugt; fehlt die Datei, gibt es noch keine Artikel. */
export function blogArtikel() {
  const datei = new URL('../public/blog/artikel.json', import.meta.url);
  return existsSync(datei) ? JSON.parse(readFileSync(datei, 'utf8')) : [];
}

export async function routen() {
  const w = await projekte();
  const b = blogArtikel();
  return [
    { pfad: '/', prio: '1.0', freq: 'monthly' },
    { pfad: '/projekte', prio: '0.9', freq: 'monthly' },
    ...w.map((p) => ({ pfad: `/projekte/${p.slug}`, prio: '0.8', freq: 'yearly' })),
    { pfad: '/blog', prio: '0.8', freq: 'weekly' },
    ...b.map((a) => ({ pfad: `/blog/${a.slug}`, prio: '0.7', freq: 'monthly' })),
    { pfad: '/facts', prio: '0.5', freq: 'yearly' },
    { pfad: '/impressum', prio: '0.2', freq: 'yearly' },
    { pfad: '/datenschutz', prio: '0.2', freq: 'yearly' },
  ];
}
