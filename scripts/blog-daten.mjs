/**
 * Holt veröffentlichte Artikel aus Strapi und legt sie als statische Dateien ab:
 *   public/blog/artikel.json          Liste ohne Inhalt (für /blog)
 *   public/blog/<slug>/artikel.json   Artikel mit fertigem HTML (für /blog/<slug>)
 *   public/blog/<slug>/llms.txt       Markdown-Fassung für Antwortsysteme
 *
 * Die Details liegen im Ordner des Slugs, damit kein Slug die Liste überschreiben kann.
 *
 * Ohne STRAPI_TOKEN bleibt der bisherige Stand liegen, damit lokale Builds offline gehen.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { rendern } from './markdown.mjs';
import { projekte, seiteUrl } from './routen.mjs';

const CMS = process.env.STRAPI_URL || 'https://cms.ozan-orhan.com';
const TOKEN = process.env.STRAPI_TOKEN;
const ZIEL = 'public/blog';
const ORIGIN = 'https://ozan-orhan.com';

if (!TOKEN) {
  if (!existsSync(`${ZIEL}/artikel.json`)) {
    mkdirSync(ZIEL, { recursive: true });
    writeFileSync(`${ZIEL}/artikel.json`, '[]\n');
  }
  console.log('blog: kein STRAPI_TOKEN gesetzt, vorhandene Artikel bleiben unverändert');
  process.exit(0);
}

async function seite(nr) {
  const url = new URL('/api/articles', CMS);
  url.searchParams.set('status', 'published');
  url.searchParams.set('sort', 'publishedAt:desc');
  for (const feld of ['coverImage', 'takeaways', 'keyFacts', 'faq', 'sources']) {
    url.searchParams.set(`populate[${feld}]`, 'true');
  }
  url.searchParams.set('populate[relatedArticles][fields][0]', 'slug');
  url.searchParams.set('pagination[page]', String(nr));
  url.searchParams.set('pagination[pageSize]', '100');
  const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!res.ok) throw new Error(`Strapi antwortet mit ${res.status} ${res.statusText}`);
  return res.json();
}

const roh = [];
for (let nr = 1; ; nr++) {
  const { data, meta } = await seite(nr);
  roh.push(...data);
  if (nr >= meta.pagination.pageCount) break;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const bildUrl = (b) => (b?.url ? new URL(b.url, CMS).href : undefined);
const liste = (x) => (Array.isArray(x) ? x : []);
const httpUrl = (u) => typeof u === 'string' && /^https?:\/\//.test(u);

/** IDs aus Layout und Artikelvorlage; Überschriften dürfen sie nicht noch einmal vergeben. */
const VORLAGEN_IDS = [
  'inhalt', 'hauptmenue', 'seiten-schema', 'faq', 'quellen', 'autor',
  't-kurz', 't-fakten', 't-faq', 't-quellen', 't-autor', 't-weiter',
];

/** Originaldaten (UTC) für Artikel, die vor dem Strapi-Feld erstveroeffentlicht erschienen sind. */
// ponytail: Datei im Repo; entfällt, sobald erstveroeffentlicht in Strapi gepflegt ist
const ERSTVEROEFFENTLICHT = JSON.parse(
  readFileSync(new URL('./erstveroeffentlicht.json', import.meta.url), 'utf8'),
);

const PROJEKTE = new Map((await projekte()).map((p) => [p.slug, p]));

const artikel = roh
  .filter((a) => SLUG.test(a.slug ?? ''))
  .map((a) => ({
    slug: a.slug,
    titel: a.title,
    kurz: a.excerpt ?? '',
    // Strapi setzt publishedAt bei jedem erneuten Veröffentlichen neu. Vorrang: Strapi-Feld
    // erstveroeffentlicht, dann scripts/erstveroeffentlicht.json, sonst publishedAt.
    datum: a.erstveroeffentlicht || ERSTVEROEFFENTLICHT[a.slug] || a.publishedAt,
    geaendert: a.updatedAt,
    autor: a.author ?? 'Ozan Orhan',
    tags: Array.isArray(a.tags) ? a.tags.filter((t) => typeof t === 'string') : [],
    seoTitel: a.seoTitle || a.title,
    seoBeschreibung: a.seoDescription || a.excerpt || '',
    bild: bildUrl(a.coverImage),
    bildAlt: a.coverImage?.alternativeText ?? '',
    kernaussagen: liste(a.takeaways).map((t) => t.text).filter(Boolean),
    fakten: liste(a.keyFacts).filter((f) => f.label && f.wert).map(({ label, wert }) => ({ label, wert })),
    faq: liste(a.faq).filter((f) => f.frage && f.antwort).map(({ frage, antwort }) => ({ frage, antwort })),
    quellen: liste(a.sources)
      .filter((q) => q.titel && httpUrl(q.url))
      .map(({ titel, url, abgerufen }) => ({ titel, url, abgerufen: abgerufen ?? null })),
    verwandt: liste(a.relatedArticles).map((r) => r.slug).filter(Boolean),
    projekte: liste(a.relatedProjects).filter((s) => PROJEKTE.has(s)),
    markdown: a.content ?? '',
  }))
  // Neueste zuerst nach Erstveröffentlichung, nicht nach dem letzten Veröffentlichen
  .sort((x, y) => y.datum.localeCompare(x.datum));

// Interne Links nur auf veröffentlichte Artikel und vorhandene Projekte
const bySlug = new Map(artikel.map((a) => [a.slug, a]));
for (const a of artikel) {
  a.verwandt = a.verwandt
    .filter((s) => s !== a.slug && bySlug.has(s))
    .map((s) => ({ slug: s, titel: bySlug.get(s).titel, kurz: bySlug.get(s).kurz }));
  a.projekte = a.projekte.map((s) => ({ slug: s, titel: PROJEKTE.get(s).titel, kurz: PROJEKTE.get(s).kicker }));
}

// Schutz vor Datenverlust: erst prüfen, dann den Ordner leeren.
if (!artikel.length && process.env.LEERER_BLOG !== '1') {
  console.error('blog: Strapi lieferte 0 veröffentlichte Artikel. Abbruch, public/blog bleibt unverändert.');
  console.error('      Token-Rechte (find auf "article") und Veröffentlichungsstatus in Strapi prüfen.');
  process.exit(1);
}
const doppelt = artikel.map((a) => a.slug).filter((s, i, alle) => alle.indexOf(s) !== i);
if (doppelt.length) {
  console.error(`blog: doppelte Slugs in Strapi: ${[...new Set(doppelt)].join(', ')}. Abbruch.`);
  process.exit(1);
}
await gegenLiveAbgleichen(new Set(artikel.map((a) => a.slug)));

// Neu schreiben, damit zurückgezogene Artikel verschwinden.
rmSync(ZIEL, { recursive: true, force: true });
mkdirSync(ZIEL, { recursive: true });

const listenfeld = ({ slug, titel, kurz, datum, geaendert, autor, tags, seoTitel, seoBeschreibung, bild, bildAlt }) =>
  ({ slug, titel, kurz, datum, geaendert, autor, tags, seoTitel, seoBeschreibung, bild, bildAlt });

for (const artikelRoh of artikel) {
  const r = rendern(artikelRoh.markdown, `/blog/${artikelRoh.slug}/`, VORLAGEN_IDS);
  Object.assign(artikelRoh, { lesezeit: r.lesezeit, woerter: r.woerter });
  const { markdown, ...a } = artikelRoh;
  mkdirSync(`${ZIEL}/${a.slug}`, { recursive: true });
  writeFileSync(`${ZIEL}/${a.slug}/artikel.json`, JSON.stringify({ ...a, html: r.html, inhalt: r.inhalt }));
  writeFileSync(
    `${ZIEL}/${a.slug}/llms.txt`,
    [
      `# ${a.titel}`, '', `> ${a.kurz}`, '',
      `URL: ${seiteUrl(`/blog/${a.slug}`)}`,
      `Veröffentlicht: ${a.datum.slice(0, 10)}`,
      `Aktualisiert: ${a.geaendert.slice(0, 10)}`,
      `Autor: ${a.autor}, AI Automation Engineer (${ORIGIN})`,
      a.kernaussagen.length || a.fakten.length
        ? `\n## Steckbrief\n\n${[
            ...a.kernaussagen.map((k) => `- ${k}`),
            ...a.fakten.map((f) => `- ${f.label}: ${f.wert}`),
          ].join('\n')}`
        : null,
      '', markdown.trim(),
      a.faq.length ? `\n## Häufige Fragen\n\n${a.faq.map((f) => `### ${f.frage}\n\n${f.antwort}`).join('\n\n')}` : null,
      a.quellen.length ? `\n## Quellen\n\n${a.quellen.map((q) => `- [${q.titel}](${q.url})`).join('\n')}` : null,
      '',
    ].filter((z) => z !== null).join('\n').replace(/\n{3,}/g, '\n\n') + '\n',
  );
}

// projektSlugs: Slugs der in Strapi zugeordneten Fallstudien, damit diese auf ihre Artikel verlinken
writeFileSync(
  `${ZIEL}/artikel.json`,
  JSON.stringify(
    artikel.map((a) => ({ ...listenfeld(a), lesezeit: a.lesezeit, projektSlugs: a.projekte.map((p) => p.slug) })),
    null,
    2,
  ) + '\n',
);

console.log(`blog: ${artikel.length} Artikel aus ${CMS} geschrieben`);
for (const a of artikel) console.log(`  ${a.datum.slice(0, 10)}  ${a.slug}`);

/**
 * Jeder live veröffentlichte Artikel muss im neuen Abruf enthalten sein, sonst würde der
 * Upload eine indexierte URL in einen 404 verwandeln. Gewolltes Depublizieren: ERLAUBE_ENTFERNEN=1.
 */
async function gegenLiveAbgleichen(neu) {
  let live;
  try {
    const res = await fetch(`${ORIGIN}/blog/artikel.json`, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    live = await res.json();
  } catch (e) {
    console.warn(`blog: Live-Abgleich nicht möglich (${e.message}), wird übersprungen.`);
    return;
  }
  const fehlend = live.map((a) => a.slug).filter((s) => !neu.has(s));
  if (!fehlend.length) {
    console.log(`blog: Live-Abgleich ok, alle ${live.length} Live-Artikel sind enthalten.`);
    return;
  }
  console.error(`blog: ${fehlend.length} live veröffentlichte Artikel fehlen im Strapi-Abruf:`);
  for (const s of fehlend) console.error(`  - ${s}`);
  if (process.env.ERLAUBE_ENTFERNEN === '1') {
    console.warn('blog: ERLAUBE_ENTFERNEN=1 gesetzt, die Artikel werden entfernt.');
    return;
  }
  console.error('blog: Abbruch, public/blog bleibt unverändert. Bewusst depubliziert? ERLAUBE_ENTFERNEN=1 setzen.');
  process.exit(1);
}
