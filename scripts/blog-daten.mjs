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
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { Marked } from 'marked';
import { projekte } from './routen.mjs';

const CMS = process.env.STRAPI_URL ?? 'https://cms.ozan-orhan.com';
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

const esc = (t) =>
  String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sichererLink = (u) => /^(https?:|mailto:|\/|#)/i.test(u ?? '');

/**
 * Markdown → HTML; H2 bekommen Anker, aus denen das Inhaltsverzeichnis entsteht.
 * Rohes HTML wird maskiert und Links/Bilder nur mit sicheren Schemata ausgegeben,
 * damit Angular das Ergebnis ungefiltert einsetzen kann (sonst gingen die Anker verloren).
 */
/** IDs aus Layout und Artikelvorlage; Überschriften dürfen sie nicht noch einmal vergeben. */
const VORLAGEN_IDS = [
  'inhalt', 'hauptmenue', 'seiten-schema', 'faq', 'quellen', 'autor',
  't-kurz', 't-fakten', 't-faq', 't-quellen', 't-autor', 't-weiter',
];

function rendern(markdown, slug) {
  const inhalt = [];
  const vergeben = new Set(VORLAGEN_IDS);
  const md = new Marked();
  md.use({
    renderer: {
      html({ text }) {
        return esc(text);
      },
      link({ href, title, tokens }) {
        const inhalt = this.parser.parseInline(tokens);
        if (!sichererLink(href)) return inhalt;
        // <base href="/"> würde #anker auf die Startseite auflösen
        if (href.startsWith('#')) href = `/blog/${slug}${href}`;
        const extern = /^https?:/i.test(href) && !href.startsWith(ORIGIN);
        return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}` +
          `${extern ? ' rel="noopener" target="_blank"' : ''}>${inhalt}</a>`;
      },
      image({ href, title, text }) {
        if (!/^https?:/i.test(href ?? '')) return esc(text);
        return `<img src="${esc(href)}" alt="${esc(text)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy" decoding="async">`;
      },
      heading({ tokens, depth, text }) {
        const html = this.parser.parseInline(tokens);
        if (depth !== 2) return `<h${depth}>${html}</h${depth}>\n`;
        const basis =
          text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss').replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'abschnitt';
        let id = basis;
        for (let n = 2; vergeben.has(id); n++) id = `${basis}-${n}`;
        vergeben.add(id);
        inhalt.push({ id, titel: text.replace(/<[^>]+>/g, '').replace(/[*_`]/g, '') });
        return `<h2 id="${id}">${html}</h2>\n`;
      },
    },
  });
  const html = md.parse(markdown);
  const woerter = markdown.split(/\s+/).filter(Boolean).length;
  return { html, inhalt, woerter, lesezeit: Math.max(1, Math.round(woerter / 200)) };
}

const PROJEKTE = new Map((await projekte()).map((p) => [p.slug, p]));

const artikel = roh
  .filter((a) => SLUG.test(a.slug ?? ''))
  .map((a) => ({
    slug: a.slug,
    titel: a.title,
    kurz: a.excerpt ?? '',
    datum: a.publishedAt,
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
  }));

// Interne Links nur auf veröffentlichte Artikel und vorhandene Projekte
const bySlug = new Map(artikel.map((a) => [a.slug, a]));
for (const a of artikel) {
  a.verwandt = a.verwandt
    .filter((s) => s !== a.slug && bySlug.has(s))
    .map((s) => ({ slug: s, titel: bySlug.get(s).titel, kurz: bySlug.get(s).kurz }));
  a.projekte = a.projekte.map((s) => ({ slug: s, titel: PROJEKTE.get(s).titel, kurz: PROJEKTE.get(s).kicker }));
}

// Neu schreiben, damit zurückgezogene Artikel verschwinden.
rmSync(ZIEL, { recursive: true, force: true });
mkdirSync(ZIEL, { recursive: true });

const listenfeld = ({ slug, titel, kurz, datum, geaendert, autor, tags, seoTitel, seoBeschreibung, bild, bildAlt }) =>
  ({ slug, titel, kurz, datum, geaendert, autor, tags, seoTitel, seoBeschreibung, bild, bildAlt });

for (const artikelRoh of artikel) {
  const r = rendern(artikelRoh.markdown, artikelRoh.slug);
  Object.assign(artikelRoh, { lesezeit: r.lesezeit, woerter: r.woerter });
  const { markdown, ...a } = artikelRoh;
  mkdirSync(`${ZIEL}/${a.slug}`, { recursive: true });
  writeFileSync(`${ZIEL}/${a.slug}/artikel.json`, JSON.stringify({ ...a, html: r.html, inhalt: r.inhalt }));
  writeFileSync(
    `${ZIEL}/${a.slug}/llms.txt`,
    [
      `# ${a.titel}`, '', `> ${a.kurz}`, '',
      `URL: ${ORIGIN}/blog/${a.slug}`,
      `Veröffentlicht: ${a.datum.slice(0, 10)}`,
      `Aktualisiert: ${a.geaendert.slice(0, 10)}`,
      `Autor: ${a.autor}, AI Automation Engineer (${ORIGIN})`,
      a.kernaussagen.length ? `\n## Das Wichtigste in Kürze\n\n${a.kernaussagen.map((k) => `- ${k}`).join('\n')}` : null,
      a.fakten.length ? `\n## Key Facts\n\n${a.fakten.map((f) => `- ${f.label}: ${f.wert}`).join('\n')}` : null,
      '', markdown.trim(),
      a.faq.length ? `\n## Häufige Fragen\n\n${a.faq.map((f) => `### ${f.frage}\n\n${f.antwort}`).join('\n\n')}` : null,
      a.quellen.length ? `\n## Quellen\n\n${a.quellen.map((q) => `- [${q.titel}](${q.url})`).join('\n')}` : null,
      '',
    ].filter((z) => z !== null).join('\n').replace(/\n{3,}/g, '\n\n') + '\n',
  );
}

writeFileSync(
  `${ZIEL}/artikel.json`,
  JSON.stringify(artikel.map((a) => ({ ...listenfeld(a), lesezeit: a.lesezeit })), null, 2) + '\n',
);

console.log(`blog: ${artikel.length} Artikel aus ${CMS} geschrieben`);
