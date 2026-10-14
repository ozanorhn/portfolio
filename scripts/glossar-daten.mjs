/**
 * Baut das Glossar aus content/glossar/<slug>.md (JSON-Kopf zwischen ---, darunter Markdown):
 *   public/glossar/begriffe.json          Liste für /glossar und die Navigation
 *   public/glossar/<slug>/begriff.json    Begriff mit fertigem HTML (für /glossar/<slug>)
 *   public/glossar/<slug>/llms.txt        Markdown-Fassung für Antwortsysteme
 *
 * Nur Begriffe mit "status": "veroeffentlicht" kommen in den Build. GLOSSAR_VORSCHAU=1 nimmt
 * auch Entwürfe mit (noindex, nur lokal ansehen, nicht hochladen). Format: content/glossar/README.md
 */
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { rendern } from './markdown.mjs';
import { ORIGIN, blogArtikel, projekte, seiteUrl } from './routen.mjs';

const QUELLE = new URL('../content/glossar/', import.meta.url);
const ZIEL = 'public/glossar';
const VORSCHAU = process.env.GLOSSAR_VORSCHAU === '1';
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Reihenfolge = Reihenfolge auf /glossar; wie THEMEN in src/app/data/glossar.ts */
const THEMEN = {
  ki_grundlagen: 'KI-Grundlagen',
  rag_suche: 'RAG und Suche',
  agenten_mcp: 'Agenten und MCP',
  automatisierung: 'Automatisierung',
  sicherheit: 'Sicherheit',
  ki_sichtbarkeit: 'Sichtbarkeit in KI-Suchen',
};

/** IDs aus Layout und Begriffsvorlage; Überschriften im Text dürfen sie nicht vergeben. */
const VORLAGEN_IDS = [
  'inhalt', 'hauptmenue', 'seiten-schema', 'verwandt', 'quellen', 'faq', 'weiter', 'autor',
  't-steckbrief', 't-verwandt', 't-quellen', 't-faq', 't-praxis', 't-autor',
];

const fehler = [];
const pruefe = (bedingung, datei, text) => bedingung || fehler.push(`${datei}: ${text}`);
const liste = (x) => (Array.isArray(x) ? x : []);

function lesen(datei) {
  const roh = readFileSync(new URL(datei, QUELLE), 'utf8');
  const m = roh.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return void fehler.push(`${datei}: JSON-Kopf zwischen --- fehlt`);
  let k;
  try {
    k = JSON.parse(m[1]);
  } catch (e) {
    return void fehler.push(`${datei}: JSON-Kopf ungültig (${e.message})`);
  }
  const slug = datei.replace(/\.md$/, '');
  pruefe(SLUG.test(slug), datei, 'Dateiname muss ein gültiger Slug sein');
  pruefe(['entwurf', 'veroeffentlicht'].includes(k.status), datei, 'status: entwurf oder veroeffentlicht');
  pruefe(k.begriff && k.begriff.length <= 60, datei, 'begriff fehlt oder länger als 60');
  pruefe(k.h1 && k.h1.length <= 90, datei, 'h1 fehlt oder länger als 90');
  pruefe(THEMEN[k.thema], datei, `thema muss einer von ${Object.keys(THEMEN).join(', ')} sein`);
  pruefe(k.kurzdefinition && k.kurzdefinition.length <= 300, datei, 'kurzdefinition fehlt oder länger als 300');
  pruefe(!k.seoTitel || k.seoTitel.length <= 60, datei, 'seoTitel länger als 60');
  pruefe(!k.seoBeschreibung || k.seoBeschreibung.length <= 160, datei, 'seoBeschreibung länger als 160');
  if (k.status === 'veroeffentlicht') {
    pruefe(k.erstveroeffentlicht, datei, 'erstveroeffentlicht fehlt (ISO-Datum)');
    pruefe(liste(k.faq).length >= 2, datei, 'mindestens 2 FAQ');
    pruefe(liste(k.quellen).length >= 2, datei, 'mindestens 2 Quellen');
    pruefe(liste(k.steckbriefAussagen).length >= 3, datei, 'mindestens 3 Steckbrief-Aussagen');
  }
  // Kommentare sind Notizen für Autoren, nicht für die Seite
  const markdown = m[2].replace(/<!--[\s\S]*?-->/g, '').trim();
  const jetzt = new Date().toISOString();
  const datum = k.erstveroeffentlicht || jetzt;
  return {
    slug,
    status: k.status,
    begriff: k.begriff,
    h1: k.h1,
    thema: k.thema,
    alternativeNamen: liste(k.alternativeNamen).filter((x) => typeof x === 'string'),
    kurzdefinition: k.kurzdefinition,
    seoTitel: k.seoTitel || k.begriff,
    seoBeschreibung: k.seoBeschreibung || k.kurzdefinition,
    datum,
    geaendert: k.aktualisiert || datum,
    aussagen: liste(k.steckbriefAussagen).filter(Boolean),
    fakten: liste(k.steckbriefFakten).filter((f) => f.label && f.wert),
    faq: liste(k.faq).filter((f) => f.frage && f.antwort),
    quellen: liste(k.quellen).filter((q) => q.titel && /^https?:\/\//.test(q.url ?? ''))
      .map(({ titel, url, abgerufen }) => ({ titel, url, abgerufen: abgerufen ?? null })),
    verwandt: liste(k.verwandteBegriffe),
    artikel: liste(k.verwandteArtikel),
    projekte: liste(k.verwandteProjekte),
    markdown,
  };
}

const alle = readdirSync(QUELLE).filter((d) => d.endsWith('.md') && d !== 'README.md').map(lesen).filter(Boolean);
if (fehler.length) {
  console.error(`glossar: ${fehler.length} Fehler in content/glossar:`);
  for (const f of fehler) console.error(`  - ${f}`);
  process.exit(1);
}

const begriffe = alle.filter((b) => b.status === 'veroeffentlicht' || VORSCHAU);
const bySlug = new Map(begriffe.map((b) => [b.slug, b]));
const ARTIKEL = new Map(blogArtikel().map((a) => [a.slug, a]));
const PROJEKTE = new Map((await projekte()).map((p) => [p.slug, p]));

rmSync(ZIEL, { recursive: true, force: true });
mkdirSync(ZIEL, { recursive: true });

for (const b of begriffe) {
  const r = rendern(b.markdown, `/glossar/${b.slug}/`, VORLAGEN_IDS);
  const { markdown, ...rest } = b;
  const daten = {
    ...rest,
    vorschau: b.status !== 'veroeffentlicht' || undefined,
    html: r.html,
    inhalt: r.inhalt,
    woerter: r.woerter,
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
const listenfeld = ({ slug, begriff, h1, thema, kurzdefinition, alternativeNamen, datum, geaendert, status }) => ({
  slug, begriff, h1, thema, kurzdefinition, alternativeNamen, datum, geaendert,
  ...(status !== 'veroeffentlicht' ? { vorschau: true } : {}),
});
writeFileSync(`${ZIEL}/begriffe.json`, JSON.stringify(begriffe.map(listenfeld), null, 2) + '\n');

const entwuerfe = alle.length - alle.filter((b) => b.status === 'veroeffentlicht').length;
console.log(`glossar: ${begriffe.length} Begriffe geschrieben, ${entwuerfe} Entwürfe in content/glossar` +
  (VORSCHAU ? ' (VORSCHAU mit Entwürfen, nicht hochladen)' : ''));

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
    b.markdown ? `\n${b.markdown}` : null,
    d.verwandt.length ? `\n## Verwandte Begriffe\n\n${d.verwandt.map((v) => `- [${v.begriff}](${seiteUrl(`/glossar/${v.slug}`)})`).join('\n')}` : null,
    b.faq.length ? `\n## Häufige Fragen\n\n${b.faq.map((f) => `### ${f.frage}\n\n${f.antwort}`).join('\n\n')}` : null,
    b.quellen.length ? `\n## Quellen\n\n${b.quellen.map((q) => `- [${q.titel}](${q.url})`).join('\n')}` : null,
    '',
  ].filter((z) => z !== null).join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}
