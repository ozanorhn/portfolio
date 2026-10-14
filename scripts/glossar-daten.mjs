/**
 * Holt veröffentlichte Glossarbegriffe aus Strapi und legt sie als statische Dateien ab:
 *   public/glossar/begriffe.json          Liste für /glossar und die Navigation
 *   public/glossar/<slug>/begriff.json    Begriff mit fertigem HTML (für /glossar/<slug>)
 *   public/glossar/<slug>/llms.txt        Markdown-Fassung für Antwortsysteme
 *
 * GLOSSAR_VORSCHAU=1 nimmt stattdessen scripts/glossar-vorschau.json (lokale Entwürfe zum
 * Testen der Vorlage). Solche Seiten sind noindex und dürfen nicht hochgeladen werden.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { rendern } from './markdown.mjs';
import { ORIGIN, blogArtikel, projekte, seiteUrl } from './routen.mjs';

const CMS = process.env.STRAPI_URL || 'https://cms.ozan-orhan.com';
const TOKEN = process.env.STRAPI_TOKEN;
const VORSCHAU = process.env.GLOSSAR_VORSCHAU === '1';
const ZIEL = 'public/glossar';
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const liste = (x) => (Array.isArray(x) ? x : []);
const httpUrl = (u) => typeof u === 'string' && /^https?:\/\//.test(u);

/** Werte der Strapi-Enumeration „thema“ (siehe strapi/). Reihenfolge = Reihenfolge auf /glossar. */
export const THEMEN = {
  ki_grundlagen: 'KI-Grundlagen',
  rag_suche: 'RAG und Suche',
  agenten_mcp: 'Agenten und MCP',
  automatisierung: 'Automatisierung',
  sicherheit: 'Sicherheit',
  ki_sichtbarkeit: 'Sichtbarkeit in KI-Suchen',
};

/** IDs aus Layout und Begriffsvorlage; Überschriften im Inhalt dürfen sie nicht vergeben. */
const VORLAGEN_IDS = [
  'inhalt', 'hauptmenue', 'seiten-schema', 'beispiel', 'verwandt', 'quellen', 'faq', 'weiter',
  'kontakt', 't-steckbrief', 't-beispiel', 't-verwandt', 't-quellen', 't-faq', 't-weiter',
];

function leer(grund) {
  rmSync(ZIEL, { recursive: true, force: true });
  mkdirSync(ZIEL, { recursive: true });
  writeFileSync(`${ZIEL}/begriffe.json`, '[]\n');
  console.log(`glossar: ${grund}, Glossar bleibt leer`);
  process.exit(0);
}

async function ausStrapi() {
  const roh = [];
  for (let nr = 1; ; nr++) {
    const url = new URL('/api/glossarbegriffe', CMS);
    url.searchParams.set('status', 'published');
    url.searchParams.set('sort', 'begriff:asc');
    for (const f of ['steckbriefAussagen', 'steckbriefFakten', 'faq', 'quellen']) {
      url.searchParams.set(`populate[${f}]`, 'true');
    }
    url.searchParams.set('populate[verwandteBegriffe][fields][0]', 'slug');
    url.searchParams.set('populate[verwandteArtikel][fields][0]', 'slug');
    url.searchParams.set('pagination[page]', String(nr));
    url.searchParams.set('pagination[pageSize]', '100');
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    // 404: Inhaltstyp existiert noch nicht · 403: Token hat noch keine Leserechte darauf
    if (res.status === 404 || res.status === 403) return null;
    if (!res.ok) throw new Error(`Strapi antwortet mit ${res.status} ${res.statusText}`);
    const { data, meta } = await res.json();
    roh.push(...data);
    if (nr >= meta.pagination.pageCount) break;
  }
  return roh.map((b) => ({
    slug: b.slug,
    begriff: b.begriff,
    h1: b.h1 || b.begriff,
    alternativeNamen: liste(b.alternativeNamen).filter((x) => typeof x === 'string'),
    thema: b.thema,
    kurzdefinition: b.kurzdefinition ?? '',
    aussagen: liste(b.steckbriefAussagen).map((a) => a.text).filter(Boolean),
    fakten: liste(b.steckbriefFakten).filter((f) => f.label && f.wert).map(({ label, wert }) => ({ label, wert })),
    beispiel: b.beispiel ?? '',
    inhalt: b.inhalt ?? '',
    faq: liste(b.faq).filter((f) => f.frage && f.antwort).map(({ frage, antwort }) => ({ frage, antwort })),
    verwandt: liste(b.verwandteBegriffe).map((r) => r.slug).filter(Boolean),
    artikel: liste(b.verwandteArtikel).map((r) => r.slug).filter(Boolean),
    projekte: liste(b.verwandteProjekte).filter((s) => typeof s === 'string'),
    quellen: liste(b.quellen).filter((q) => q.titel && httpUrl(q.url))
      .map(({ titel, url, abgerufen }) => ({ titel, url, abgerufen: abgerufen ?? null })),
    seoTitel: b.seoTitle || b.begriff,
    seoBeschreibung: b.seoDescription || b.kurzdefinition || '',
    datum: b.erstveroeffentlicht || b.publishedAt,
    geaendert: b.updatedAt,
  }));
}

let begriffe;
if (VORSCHAU) {
  const jetzt = new Date().toISOString();
  begriffe = JSON.parse(readFileSync(new URL('./glossar-vorschau.json', import.meta.url), 'utf8'))
    .map((b) => ({ beispiel: '', inhalt: '', aussagen: [], fakten: [], quellen: [], artikel: [], projekte: [],
      alternativeNamen: [], verwandt: [], seoTitel: b.begriff, seoBeschreibung: b.kurzdefinition,
      datum: jetzt, geaendert: jetzt, ...b, vorschau: true }));
} else {
  if (!TOKEN) {
    if (!existsSync(`${ZIEL}/begriffe.json`)) leer('kein STRAPI_TOKEN gesetzt');
    console.log('glossar: kein STRAPI_TOKEN gesetzt, vorhandene Begriffe bleiben unverändert');
    process.exit(0);
  }
  begriffe = await ausStrapi();
  if (begriffe === null) leer('Inhaltstyp „glossarbegriff“ in Strapi fehlt oder Token ohne Leserecht');
}

begriffe = begriffe.filter((b) => SLUG.test(b.slug ?? '') && b.begriff && THEMEN[b.thema]);
const doppelt = begriffe.map((b) => b.slug).filter((s, i, a) => a.indexOf(s) !== i);
if (doppelt.length) {
  console.error(`glossar: doppelte Slugs: ${[...new Set(doppelt)].join(', ')}. Abbruch.`);
  process.exit(1);
}
if (!VORSCHAU) await gegenLiveAbgleichen(new Set(begriffe.map((b) => b.slug)));

// Verweise nur auf vorhandene Begriffe, Artikel und Projekte
const bySlug = new Map(begriffe.map((b) => [b.slug, b]));
const ARTIKEL = new Map(blogArtikel().map((a) => [a.slug, a]));
const PROJEKTE = new Map((await projekte()).map((p) => [p.slug, p]));

rmSync(ZIEL, { recursive: true, force: true });
mkdirSync(ZIEL, { recursive: true });

const listenfeld = ({ slug, begriff, h1, thema, kurzdefinition, alternativeNamen, datum, geaendert, vorschau }) =>
  ({ slug, begriff, h1, thema, kurzdefinition, alternativeNamen, datum, geaendert, ...(vorschau ? { vorschau } : {}) });

for (const b of begriffe) {
  const pfad = `/glossar/${b.slug}/`;
  const beispiel = rendern(b.beispiel, pfad, VORLAGEN_IDS);
  const haupt = rendern(b.inhalt, pfad, VORLAGEN_IDS);
  const daten = {
    ...b,
    beispiel: undefined,
    beispielHtml: beispiel.html,
    inhalt: haupt.inhalt,
    html: haupt.html,
    woerter: beispiel.woerter + haupt.woerter,
    verwandt: b.verwandt.filter((s) => s !== b.slug && bySlug.has(s))
      .map((s) => ({ slug: s, begriff: bySlug.get(s).begriff, kurzdefinition: bySlug.get(s).kurzdefinition })),
    artikel: b.artikel.filter((s) => ARTIKEL.has(s)).map((s) => ({ slug: s, titel: ARTIKEL.get(s).titel })),
    projekte: b.projekte.filter((s) => PROJEKTE.has(s))
      .map((s) => ({ slug: s, titel: PROJEKTE.get(s).titel, kurz: PROJEKTE.get(s).kicker })),
  };
  mkdirSync(`${ZIEL}/${b.slug}`, { recursive: true });
  writeFileSync(`${ZIEL}/${b.slug}/begriff.json`, JSON.stringify(daten));
  writeFileSync(`${ZIEL}/${b.slug}/llms.txt`, llmsText(b, daten));
}
writeFileSync(`${ZIEL}/begriffe.json`, JSON.stringify(begriffe.map(listenfeld), null, 2) + '\n');
console.log(`glossar: ${begriffe.length} Begriffe${VORSCHAU ? ' (VORSCHAU, nicht hochladen)' : ''} geschrieben`);
for (const b of begriffe) console.log(`  ${THEMEN[b.thema].padEnd(26)} ${b.slug}`);

function llmsText(b, d) {
  return [
    `# ${b.begriff}`, '', `> ${b.kurzdefinition}`, '',
    `URL: ${seiteUrl(`/glossar/${b.slug}`)}`,
    b.alternativeNamen.length ? `Auch: ${b.alternativeNamen.join(', ')}` : null,
    `Thema: ${THEMEN[b.thema]}`,
    `Veröffentlicht: ${b.datum.slice(0, 10)}`,
    `Aktualisiert: ${b.geaendert.slice(0, 10)}`,
    `Autor: Ozan Orhan, AI Automation Engineer (${ORIGIN})`,
    b.aussagen.length || b.fakten.length
      ? `\n## Steckbrief\n\n${[...b.aussagen.map((a) => `- ${a}`), ...b.fakten.map((f) => `- ${f.label}: ${f.wert}`)].join('\n')}`
      : null,
    b.beispiel.trim() ? `\n## Beispiel aus der Praxis\n\n${b.beispiel.trim()}` : null,
    b.inhalt.trim() ? `\n${b.inhalt.trim()}` : null,
    d.verwandt.length ? `\n## Verwandte Begriffe\n\n${d.verwandt.map((v) => `- [${v.begriff}](${seiteUrl(`/glossar/${v.slug}`)})`).join('\n')}` : null,
    b.faq.length ? `\n## Häufige Fragen\n\n${b.faq.map((f) => `### ${f.frage}\n\n${f.antwort}`).join('\n\n')}` : null,
    b.quellen.length ? `\n## Quellen\n\n${b.quellen.map((q) => `- [${q.titel}](${q.url})`).join('\n')}` : null,
    '',
  ].filter((z) => z !== null).join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

/** Wie beim Blog: Bricht ab, wenn live veröffentlichte Begriffe im Abruf fehlen. */
async function gegenLiveAbgleichen(neu) {
  let live;
  try {
    const res = await fetch(`${ORIGIN}/glossar/begriffe.json`, { signal: AbortSignal.timeout(15000) });
    if (res.status === 404) return;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    live = await res.json();
  } catch (e) {
    console.warn(`glossar: Live-Abgleich nicht möglich (${e.message}), wird übersprungen.`);
    return;
  }
  const fehlend = live.filter((b) => !b.vorschau).map((b) => b.slug).filter((s) => !neu.has(s));
  if (!fehlend.length) return;
  console.error(`glossar: ${fehlend.length} live veröffentlichte Begriffe fehlen im Strapi-Abruf: ${fehlend.join(', ')}`);
  if (process.env.ERLAUBE_ENTFERNEN === '1') return;
  console.error('glossar: Abbruch, public/glossar bleibt unverändert. Bewusst depubliziert? ERLAUBE_ENTFERNEN=1 setzen.');
  process.exit(1);
}
