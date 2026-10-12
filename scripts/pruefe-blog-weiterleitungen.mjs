/**
 * Prüft die öffentlich erreichbaren Blog-URLs aus der Search Console.
 * Kein Schreibzugriff, keine Abhängigkeiten. Nach dem FTP-Upload ausführen:
 *   node scripts/pruefe-blog-weiterleitungen.mjs
 */
const origin = 'https://ozan-orhan.com';
const slugs = [
  'agentic-rag-mcp-architektur',
  'claude-code-mods',
  'mcp-server-mit-n8n-erstellen',
  'n8n-agents-vs-ai-agent-node',
];

let fehler = 0;
for (const slug of slugs) {
  const ziel = `${origin}/blog/${slug}/`;
  for (const start of [`${origin}/blog/${slug}`, ziel]) {
    const besucht = new Set();
    const schritte = [];
    let url = start;
    let status = null;
    let problem = null;
    for (let n = 0; n < 8; n++) {
      if (besucht.has(url)) { problem = 'Weiterleitungsschleife'; break; }
      besucht.add(url);
      try {
        const res = await fetch(url, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(15000) });
        status = res.status;
        schritte.push(`${status} ${url}`);
        if (status >= 300 && status < 400) {
          const location = res.headers.get('location');
          if (!location) { problem = 'Weiterleitung ohne Location'; break; }
          url = new URL(location, url).href;
          continue;
        }
        if (status !== 200) problem = `HTTP ${status}`;
        break;
      } catch (error) { problem = error.message; break; }
    }
    if (!problem && status >= 300 && status < 400) problem = 'Zu viele Weiterleitungen';
    if (!problem && url !== ziel) problem = `Unerwartetes Ziel: ${url}`;
    console.log(`${problem ? 'FEHLER' : 'OK'} ${start}`);
    for (const schritt of schritte) console.log(`  ${schritt}`);
    if (problem) { console.error(`  ${problem}`); fehler++; }
  }
}
process.exitCode = fehler ? 1 : 0;
