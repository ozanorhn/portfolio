/**
 * Meldet URLs per IndexNow an Bing, Yandex, Seznam, Naver u. a. (https://www.indexnow.org).
 * Google nimmt nicht teil; dort bleibt die Sitemap in der Search Console.
 *
 *   npm run indexnow                      alle URLs der LIVE-Sitemap melden
 *   npm run indexnow -- --seit=2026-10-19 nur URLs mit lastmod ab diesem Datum
 *   npm run indexnow -- --trocken         nur anzeigen, nichts senden
 *
 * Quelle ist bewusst die Live-Sitemap: gemeldet wird nur, was tatsächlich online ist.
 * Vor dem Senden prüft das Skript, dass die Schlüsseldatei live erreichbar ist.
 */
import { readdirSync, readFileSync } from 'node:fs';

const HOST = 'ozan-orhan.com';
const ORIGIN = `https://${HOST}`;
const ENDPUNKT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10_000; // Grenze laut IndexNow-Protokoll

const argumente = process.argv.slice(2);
const trocken = argumente.includes('--trocken');
const seit = argumente.find((a) => a.startsWith('--seit='))?.slice(7);
if (seit && !/^\d{4}-\d{2}-\d{2}$/.test(seit)) abbruch(`--seit erwartet JJJJ-MM-TT, nicht „${seit}“`);

const schluesselDatei = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!schluesselDatei) abbruch('Keine Schlüsseldatei public/<32 Hex-Zeichen>.txt gefunden.');
const schluessel = readFileSync(`public/${schluesselDatei}`, 'utf8').trim();
if (`${schluessel}.txt` !== schluesselDatei) abbruch('Inhalt der Schlüsseldatei passt nicht zum Dateinamen.');
const keyLocation = `${ORIGIN}/${schluesselDatei}`;

const sitemap = await abrufen(`${ORIGIN}/sitemap.xml`, 'Live-Sitemap').catch((e) => abbruch(e.message));
const eintraege = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
  loc: (block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '').trim(),
  lastmod: (block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '').trim(),
}));
if (!eintraege.length) abbruch('Die Live-Sitemap enthält keine URLs.');

const urls = eintraege
  .filter((e) => e.loc.startsWith(`${ORIGIN}/`))
  .filter((e) => !seit || e.lastmod.slice(0, 10) >= seit)
  .map((e) => e.loc);
if (!urls.length) abbruch(seit ? `Keine URL mit lastmod ab ${seit}.` : 'Keine URL auf dieser Domain.');
if (urls.length > MAX_URLS) abbruch(`${urls.length} URLs, IndexNow erlaubt höchstens ${MAX_URLS} je Aufruf.`);

console.log(`${urls.length} URL(s) aus der Live-Sitemap${seit ? ` (lastmod ab ${seit})` : ''}:`);
urls.forEach((u) => console.log(`  ${u}`));

const live = (await abrufen(keyLocation, 'Schlüsseldatei').catch(() => '')).trim();
console.log(`\nSchlüsseldatei live (${keyLocation}): ${live === schluessel ? 'ok' : 'FEHLT – erst hochladen'}`);

if (trocken) {
  console.log('Trockenlauf: nichts gesendet.');
  process.exit(0);
}
if (live !== schluessel) abbruch('Schlüsseldatei ist live nicht korrekt erreichbar. Erst bauen und hochladen.');

const antwort = await fetch(ENDPUNKT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: schluessel, keyLocation, urlList: urls }),
}).catch((e) => abbruch(`IndexNow nicht erreichbar: ${e.message}`));

const BEDEUTUNG = {
  200: 'angenommen',
  202: 'angenommen, Schlüsselprüfung steht noch aus',
  400: 'ungültige Anfrage',
  403: 'Schlüssel ungültig oder Schlüsseldatei nicht gefunden',
  422: 'URLs gehören nicht zum Host oder passen nicht zum Schlüssel',
  429: 'zu viele Anfragen, später erneut versuchen',
};
const text = BEDEUTUNG[antwort.status] ?? (await antwort.text()).slice(0, 200);
console.log(`\nIndexNow: HTTP ${antwort.status} – ${text}`);
process.exit(antwort.status === 200 || antwort.status === 202 ? 0 : 1);

async function abrufen(url, was) {
  const r = await fetch(url, { headers: { 'User-Agent': 'ozan-orhan.com indexnow-skript' } });
  if (!r.ok) throw new Error(`${was} nicht abrufbar (${url}): HTTP ${r.status}`);
  return r.text();
}

function abbruch(meldung) {
  console.error(`Abbruch: ${meldung}`);
  process.exit(1);
}
