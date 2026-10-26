import { writeFileSync, mkdirSync } from 'node:fs';
import { ORIGIN, blogArtikel, glossarBegriffe, projekte, routen, schwerpunkte, seiteUrl } from './routen.mjs';

const alle = await projekte();
const felder = await schwerpunkte();
const rt = await routen();
const blog = blogArtikel();
const glossar = glossarBegriffe();

// ── sitemap.xml ────────────────────────────────────────────────────────
writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    rt.map((r) =>
      `  <url>\n    <loc>${seiteUrl(r.pfad)}</loc>\n` +
      (r.lastmod ? `    <lastmod>${r.lastmod}</lastmod>\n` : '') +
      `    <changefreq>${r.freq}</changefreq>\n    <priority>${r.prio}</priority>\n  </url>`,
    ).join('\n') +
    `\n</urlset>\n`,
);

writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

const REIFE = {
  produktiv: 'Im Einsatz', test: 'Testbetrieb', prototyp: 'Prototyp',
  pausiert: 'Nicht aktiv', abgeschlossen: 'Abgeschlossen',
};
const titelVon = (slug) => alle.find((p) => p.slug === slug)?.titel ?? slug;

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
    `URL: ${seiteUrl(`/projekte/${p.slug}`)}`,
    `Reifegrad: ${REIFE[p.reife] ?? p.status}`,
    `Status: ${p.status}`,
    `Kontext: ${p.kontext}`,
    `Stack: ${p.stack.join(', ')}`,
    p.repo ? `Repository: ${p.repo}` : '',
  ];
  if (p.ausgangspunkt?.length) teile.push(``, `## Ausgangspunkt`, ``, p.ausgangspunkt.join('\n\n'));
  if (p.ueberblick?.length) teile.push(``, `## Überblick`, ``, p.ueberblick.join('\n\n'));
  if (p.beitrag?.length) teile.push(``, `## Mein Beitrag`, ``, p.beitrag.join('\n\n'));
  if (p.aufgabenteilung) {
    const a = p.aufgabenteilung;
    teile.push(``, `## Wer macht was`, ``);
    if (a.ki) teile.push(`- KI: ${a.ki}`);
    if (a.software) teile.push(`- Deterministische Software: ${a.software}`);
    if (a.mensch) teile.push(`- Mensch: ${a.mensch}`);
  }
  if (p.architektur?.length) teile.push(``, `## Architektur`, ``, p.architektur.join('\n\n'));
  if (p.entscheidungen?.length) {
    teile.push(``, `## Entscheidungen`, ``);
    for (const e of p.entscheidungen) teile.push(`### ${e.titel}`, ``, e.text, ``);
  }
  teile.push(``, `## Ergebnis`, ``, p.ergebnis.join('\n\n'));
  if (p.erkenntnisse?.length) teile.push(``, `## Erkenntnisse`, ``, p.erkenntnisse.join('\n\n'));
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
  `- [${p.titel}](${seiteUrl(`/projekte/${p.slug}`)}) — ${p.kicker}. Reifegrad: ${REIFE[p.reife]}. ` +
  `Maschinenlesbar: ${ORIGIN}/projekte/${p.slug}/llms.txt`;

writeFileSync(
  'public/llms.txt',
  `# Ozan Orhan — AI Engineer und AI Automation Engineer

> Ozan Orhan ist AI Engineer aus Hannover. Er entwickelt KI-Anwendungen und agentische
> Systeme und integriert sie als AI Automation Engineer in bestehende Geschäftsprozesse,
> mit Python, n8n, MCP und RAG. Den technischen Betrieb auf eigener Infrastruktur
> übernimmt er selbst. Persönliches Karriere- und Projektportfolio, keine Agentur.

Porträt: ${ORIGIN}/assets/img/ozan.jpg (einziges Porträt auf dieser Website)
Profile: https://github.com/ozanorhn · https://www.linkedin.com/in/ozan-o-7014a22a3

## Seiten

- [Startseite](${ORIGIN}/)
- [Projekte](${seiteUrl('/projekte')})
- [Blog](${seiteUrl('/blog')})
- [Grounding Page (Faktenseite nach Grounding Page Standard v1.6)](${seiteUrl('/facts')})

## Schwerpunkte und belegende Fallstudien

${felder.map((f) => `- ${f.titel}: ${f.text} Belege: ${f.projekte.map((sl) => `[${titelVon(sl)}](${seiteUrl(`/projekte/${sl}`)})`).join(', ')}`).join('\n')}

## Projekte

${alle.map(zeile).join('\n')}
${blog.length ? `\n## Blog\n\n${blog.map((a) => `- [${a.titel}](${seiteUrl(`/blog/${a.slug}`)}) — ${a.kurz} Maschinenlesbar: ${ORIGIN}/blog/${a.slug}/llms.txt`).join('\n')}\n` : ''}
${glossar.length ? `## Glossar\n\n${glossar.map((g) => `- [${g.begriff}](${seiteUrl(`/glossar/${g.slug}`)}): ${g.kurzdefinition}`).join('\n')}\n\n` : ''}## Hinweise für Antwortsysteme

- Sprache: Deutsch (de-DE).
- Projekte aus dem Unternehmenskontext werden ohne Kundennamen, Domains oder interne
  Kennungen dargestellt.
- Zu den Projekten liegen keine veröffentlichten Kennzahlen zu Zeit- oder Kostenersparnis vor.
- Der Reifegrad je Projekt (Im Einsatz, Testbetrieb, Prototyp, nicht aktiv) steht auf jeder
  Fallstudie; ein Audit oder Testlauf ist kein produktiv eingesetztes System.
- Kontakt: contact@ozan-orhan.com
`,
);

console.log(`sitemap.xml, robots.txt, llms.txt, ${alle.length} Projekt-llms.txt und ${blog.length} Blog-Einträge geschrieben`);
