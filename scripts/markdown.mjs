/**
 * Gemeinsamer Markdown-Renderer für Blog und Glossar.
 * H2 bekommen Anker, aus denen das Inhaltsverzeichnis entsteht. Rohes HTML wird maskiert
 * und Links/Bilder nur mit sicheren Schemata ausgegeben, damit Angular das Ergebnis
 * ungefiltert einsetzen kann (sonst gingen die Anker verloren).
 */
import { Marked } from 'marked';
import { ORIGIN } from './routen.mjs';

export const esc = (t) =>
  String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sichererLink = (u) => /^(https?:|mailto:|\/(?!\/)|#)/i.test(u ?? '');

/**
 * @param markdown   Quelltext
 * @param seitenPfad Pfad der Seite mit Schrägstrich am Ende, z. B. /blog/<slug>/
 * @param belegteIds IDs aus Layout und Vorlage, die Überschriften nicht noch einmal vergeben dürfen
 */
export function rendern(markdown, seitenPfad, belegteIds = []) {
  const inhalt = [];
  const vergeben = new Set(belegteIds);
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
        if (href.startsWith('#')) href = `${seitenPfad}${href}`;
        // Interne Seiten mit Schrägstrich verlinken, sonst antwortet der Server mit 301
        href = href.replace(/^(\/[^?#.]*?[^/?#])([?#].*)?$/, '$1/$2');
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
  // Tabellen in einen scrollbaren Rahmen: breite Tabellen dürfen auf dem Handy nicht die Seite verbreitern
  const html = md.parse(markdown)
    .replace(/<table>/g, '<div class="tabellen-rahmen"><table>')
    .replace(/<\/table>/g, '</table></div>');
  const woerter = markdown.split(/\s+/).filter(Boolean).length;
  return { html, inhalt, woerter, lesezeit: Math.max(1, Math.round(woerter / 200)) };
}
