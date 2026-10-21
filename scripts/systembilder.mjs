/**
 * Erzeugt die Systembilder der KI-System-Fallstudien als SVG (Quer- und Hochformat)
 * nach src/app/data/diagrams-systeme.ts. Gleiche Bildsprache wie die bestehenden
 * Systembilder: Plattengrund, Mono-Beschriftung, Bahnen in Petrol. Zusätzlich laufen
 * Datenpunkte über die Bahnen; bei reduzierter Bewegung stehen sie still.
 *
 * Aufruf: node scripts/systembilder.mjs
 */
import { writeFileSync } from 'node:fs';
import { SYSTEMBILDER } from './systembilder-daten.mjs';

const F = {
  platte: '#1C1B19', kreide: '#E8E4DC', kreide2: '#8A857C', linie: '#3A3833', petrol: '#3F8C79',
};
const MONO = `'Spline Sans Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;
const SANS = 'Archivo, ui-sans-serif, system-ui, sans-serif';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const gross = (s) => esc(String(s).toUpperCase());

const text = (x, y, s, { size = 11.5, fill = F.kreide, font = MONO, anchor = 'middle', ls = 0.9 } = {}) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${fill}" letter-spacing="${ls}" text-anchor="${anchor}">${gross(s)}</text>`;
const linie = (x1, y1, x2, y2, farbe = F.petrol, extra = '') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${farbe}" stroke-width="0.75" vector-effect="non-scaling-stroke"${extra}/>`;

/** Station: Kreis, bei Freigabe ein Querbalken wie in den bestehenden Bildern. */
function station(x, y, s, nr, quer) {
  const marke = s.gate
    ? (quer ? linie(x, y - 15, x, y + 15, F.kreide, ' stroke-width="2"') : linie(x - 11, y, x + 11, y, F.kreide, ' stroke-width="2"'))
    : `<circle cx="${x}" cy="${y}" r="7" fill="${F.platte}" stroke="${F.kreide}" stroke-width="1"/>`;
  if (quer) {
    return marke +
      text(x + 16, y - 12, String(nr).padStart(2, '0'), { size: 9, fill: F.kreide2, anchor: 'start', ls: 1.2 }) +
      text(x, y + 34, s.label) + (s.note ? text(x, y + 56, s.note, { size: 9.5, fill: F.kreide2, ls: 0.7 }) : '');
  }
  return marke +
    text(x + 30, y - 18, String(nr).padStart(2, '0'), { size: 12, fill: F.kreide2, anchor: 'start', ls: 1.2 }) +
    text(x + 30, y + 6, s.label, { size: 17, anchor: 'start', ls: 0.8 }) +
    (s.note ? text(x + 30, y + 30, s.note, { size: 13.5, fill: F.kreide2, anchor: 'start', ls: 0.6 }) : '');
}

/** Datenpunkt, der die Bahn entlangläuft; versetzt je Bahn. */
const puls = (pfad, dauer, versatz) =>
  `<circle class="puls" r="3.2" fill="${F.kreide}"><animateMotion path="${pfad}" dur="${dauer}s" begin="${versatz}s" repeatCount="indefinite" calcMode="linear"/></circle>`;

const STIL = `<style>@media (prefers-reduced-motion: reduce){.puls{display:none}}</style>`;

function kopf(b, w, h, id) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="${id}t ${id}d" preserveAspectRatio="xMidYMid meet">` +
    `<title id="${id}t">Systembild ${esc(b.titel)}</title><desc id="${id}d">${esc(b.beschreibung)}</desc>${STIL}` +
    `<rect width="${w}" height="${h}" fill="${F.platte}"/>`;
}

function quer(b) {
  const L = 380, R = 1460, top = 200, abstand = 210;
  const h = top + b.bahnen.length * abstand - 40;
  let nr = 0;
  let svg = kopf(b, 1600, h, `q${b.id}`) +
    text(110, 110, b.titel + ' · ' + b.untertitel, { size: 11, fill: F.kreide2, font: SANS, anchor: 'start', ls: 1.3 }) +
    linie(110, 122, R, 122, F.linie);
  b.bahnen.forEach((bahn, i) => {
    const y = top + i * abstand;
    const n = bahn.stationen.length;
    const xs = bahn.stationen.map((_, k) => (n === 1 ? L : L + (k * (R - L)) / (n - 1)));
    svg += text(300, y - 2, bahn.titel, { anchor: 'end', ls: 1.1 }) +
      text(300, y + 18, bahn.takt, { size: 9.5, fill: F.kreide2, font: SANS, anchor: 'end', ls: 1 }) +
      linie(L, y, xs[n - 1], y);
    bahn.stationen.forEach((s, k) => { svg += station(xs[k], y, s, ++nr, true); });
    svg += puls(`M${L},${y} L${xs[n - 1]},${y}`, 6 + n * 0.8, i * 1.7);
  });
  return svg + '</svg>';
}

/**
 * Hochformat für schmale Geräte: jede Bahn als Schlange in zwei Spalten, damit das Bild
 * kurz bleibt und die Beschriftung groß genug ist.
 */
function hoch(b) {
  const W = 440, spalte = [44, 236], zeile = 92;
  let y = 96, nr = 0;
  let inhalt = '';
  b.bahnen.forEach((bahn, bi) => {
    inhalt += text(28, y, bahn.titel, { size: 15, anchor: 'start', ls: 1.1 }) +
      text(28, y + 22, bahn.takt, { size: 12.5, fill: F.kreide2, font: SANS, anchor: 'start', ls: 0.8 });
    const y0 = y + 66;
    const pkt = bahn.stationen.map((_, k) => {
      const r = Math.floor(k / 2);
      const c = r % 2 === 0 ? k % 2 : 1 - (k % 2);
      return [spalte[c], y0 + r * zeile];
    });
    // Querverbindungen laufen unterhalb der Beschriftung, damit keine Linie durch Text geht
    const pfad = pkt.map(([x, yy], k) => {
      if (k === 0) return `M${x},${yy}`;
      const [px, py] = pkt[k - 1];
      return py === yy ? `L${px},${yy + 44} L${x},${yy + 44} L${x},${yy}` : `L${x},${yy}`;
    }).join(' ');
    inhalt += `<path d="${pfad}" fill="none" stroke="${F.petrol}" stroke-width="0.9" vector-effect="non-scaling-stroke"/>`;
    bahn.stationen.forEach((s2, k) => {
      const [x, yy] = pkt[k];
      nr++;
      inhalt += (s2.gate ? linie(x - 10, yy, x + 10, yy, F.kreide, ' stroke-width="2.4"')
        : `<circle cx="${x}" cy="${yy}" r="7" fill="${F.platte}" stroke="${F.kreide}" stroke-width="1"/>`) +
        text(x + 18, yy - 12, String(nr).padStart(2, '0'), { size: 11, fill: F.kreide2, anchor: 'start', ls: 1 }) +
        text(x + 18, yy + 6, s2.label, { size: 15, anchor: 'start', ls: 0.5 }) +
        (s2.note ? text(x + 18, yy + 26, s2.note, { size: 12, fill: F.kreide2, anchor: 'start', ls: 0.4 }) : '');
    });
    inhalt += puls(pfad.replace(/,/g, ' '), 4 + bahn.stationen.length, bi * 1.3);
    y = pkt[pkt.length - 1][1] + 84;
  });
  return kopf(b, W, y - 20, `h${b.id}`) +
    text(28, 52, b.titel, { size: 12.5, fill: F.kreide2, font: SANS, anchor: 'start', ls: 1 }) +
    linie(28, 66, W - 28, 66, F.linie) + inhalt + '</svg>';
}

const eintraege = SYSTEMBILDER.map((b) => `  '${b.id}': {\n    quer: \`${quer(b)}\`,\n    hoch: \`${hoch(b)}\`,\n  },`);
writeFileSync(
  'src/app/data/diagrams-systeme.ts',
  `// GENERIERT von scripts/systembilder.mjs aus scripts/systembilder-daten.mjs — nicht von Hand bearbeiten.\n` +
    `import type { DiagramPair } from './diagrams';\n\nexport const DIAGRAMS_SYSTEME: Record<string, DiagramPair> = {\n${eintraege.join('\n')}\n};\n`,
);
console.log(`${SYSTEMBILDER.length} Systembilder geschrieben`);
