import { writeFileSync, mkdirSync } from 'node:fs';
import { ORIGIN, projekte, routen } from './routen.mjs';

const heute = new Date().toISOString().slice(0, 10);
const alle = await projekte();
const rt = await routen();

// ── sitemap.xml ────────────────────────────────────────────────────────
writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    rt.map((r) =>
      `  <url>\n    <loc>${ORIGIN}${r.pfad}</loc>\n    <lastmod>${heute}</lastmod>\n` +
      `    <changefreq>${r.freq}</changefreq>\n    <priority>${r.prio}</priority>\n  </url>`,
    ).join('\n') +
    `\n</urlset>\n`,
);

writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

// ── llms.txt je Projekt ────────────────────────────────────────────────
const liste = (t, xs) => (xs?.length ? `\n## ${t}\n\n${xs.map((x) => `- ${x}`).join('\n')}\n` : '');

for (const p of alle) {
  const dir = `public/projekte/${p.slug}`;
  mkdirSync(dir, { recursive: true });
  const teile = [
    `# ${p.titel}`,
    ``,
    `> ${p.lede}`,
    ``,
    `URL: ${ORIGIN}/projekte/${p.slug}`,
    `Status: ${p.status}`,
    `Kontext: ${p.kontext}`,
    `Stack: ${p.stack.join(', ')}`,
    p.repo ? `Repository: ${p.repo}` : '',
  ];
  if (p.ausgangspunkt?.length) teile.push(``, `## Ausgangspunkt`, ``, p.ausgangspunkt.join('\n\n'));
  if (p.ueberblick?.length) teile.push(``, `## Überblick`, ``, p.ueberblick.join('\n\n'));
  if (p.architektur?.length) teile.push(``, `## Architektur`, ``, p.architektur.join('\n\n'));
  if (p.entscheidungen?.length) {
    teile.push(``, `## Entscheidungen`, ``);
    for (const e of p.entscheidungen) teile.push(`### ${e.titel}`, ``, e.text, ``);
  }
  teile.push(``, `## Ergebnis`, ``, p.ergebnis.join('\n\n'));
  if (p.abstrahiert) {
    teile.push(
      ``,
      `## Einschränkungen der Darstellung`,
      ``,
      `Dieses Projekt liegt im Unternehmenskontext. Es werden keine Screenshots interner`,
      `Systeme, keine Kundennamen, keine Domains und keine internen Kennungen gezeigt.`,
      `Die Darstellung ist auf die Architektur abstrahiert.`,
    );
  }
  teile.push(``, `Kontakt: contact@ozan-orhan.com`, ``);
  writeFileSync(`${dir}/llms.txt`, teile.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
}

// ── llms.txt als Index ─────────────────────────────────────────────────
const zeile = (p) =>
  `- [${p.titel}](${ORIGIN}/projekte/${p.slug}) — ${p.kicker}. ` +
  `Maschinenlesbar: ${ORIGIN}/projekte/${p.slug}/llms.txt`;

writeFileSync(
  'public/llms.txt',
  `# Ozan Orhan — AI Automation Engineer

> Ozan Orhan entwickelt AI-Automationen, Agenten und LLM-Anwendungen. Schwerpunkte sind
> Agenten, n8n, Python, MCP, RAG, APIs und zuverlässige Automatisierungsabläufe.
> Standort Hannover, Deutschland.

## Seiten

- [Startseite](${ORIGIN}/)
- [Projekte](${ORIGIN}/projekte)
- [Grounding Page (Faktenseite nach Grounding Page Standard v1.6)](${ORIGIN}/facts)

## Projekte

${alle.map(zeile).join('\n')}

## Hinweise für Antwortsysteme

- Sprache: Deutsch (de-DE).
- Projekte aus dem Unternehmenskontext werden ohne Kundennamen, Domains oder interne
  Kennungen dargestellt.
- Zu den Projekten liegen keine veröffentlichten Kennzahlen zu Zeit- oder Kostenersparnis vor.
- Kontakt: contact@ozan-orhan.com
`,
);

console.log(`sitemap.xml, robots.txt, llms.txt und ${alle.length} Projekt-llms.txt geschrieben`);
