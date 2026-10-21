---
{
  "status": "veroeffentlicht",
  "begriff": "WebMCP",
  "h1": "WebMCP: Definition, APIs und Unterschied zu MCP",
  "thema": "agenten_mcp",
  "alternativeNamen": [
    "Web Model Context Protocol",
    "document.modelContext"
  ],
  "kurzdefinition": "WebMCP ist ein vorgeschlagener Webstandard, mit dem Websites Browser-Agenten Werkzeuge direkt im Browser bereitstellen, entweder per JavaScript oder über Attribute an HTML-Formularen.",
  "seoTitel": "Was ist WebMCP? APIs, Beispiel und Unterschied zu MCP",
  "seoBeschreibung": "WebMCP ist ein vorgeschlagener Webstandard, mit dem Websites Browser-Agenten Werkzeuge anbieten. Imperative und deklarative API, Codebeispiel, Stand 2026.",
  "erstveroeffentlicht": "2026-10-19T09:00:00Z",
  "aktualisiert": "2026-10-19T09:00:00Z",
  "steckbriefAussagen": [
    "WebMCP ist ein vorgeschlagener Webstandard, mit dem Websites KI-Agenten im Browser strukturierte Werkzeuge anbieten, statt sie Seiten erraten und Knöpfe anklicken zu lassen.",
    "Die imperative API registriert Werkzeuge per JavaScript mit document.modelContext.registerTool(), die deklarative API macht HTML-Formulare über Attribute wie toolname und tooldescription zu Werkzeugen.",
    "Die Spezifikation ist ein Entwurf der Web Machine Learning Community Group des W3C und ausdrücklich kein W3C-Standard; Chrome bietet ab Version 149 einen Origin Trial an.",
    "MCP verbindet KI-Anwendungen mit Servern im Backend, WebMCP läuft in der geöffneten Webseite und nutzt deren Origin, Rechte und Sitzung.",
    "WebMCP ist für die Zusammenarbeit von Mensch und Agent in einem sichtbaren Browser-Tab gedacht, nicht für Abläufe ohne Bildschirm."
  ],
  "steckbriefFakten": [
    {
      "label": "Status",
      "wert": "Draft Community Group Report, Stand 16. Oktober 2026 (W3C Web Machine Learning CG)"
    },
    {
      "label": "Herausgeber der Spezifikation",
      "wert": "Brandon Walderman (Microsoft), Khushal Sagar und Dominic Farolino (Google)"
    },
    {
      "label": "Browser-Unterstützung",
      "wert": "Origin Trial ab Chrome 149, lokal per Flag (Chrome for Developers, Stand: Oktober 2026)"
    },
    {
      "label": "Einstiegspunkt der API",
      "wert": "document.modelContext"
    }
  ],
  "verwandteBegriffe": [
    "mcp-model-context-protocol",
    "ki-agent",
    "agentic-commerce",
    "prompt-injection",
    "human-in-the-loop",
    "structured-output",
    "llms-txt"
  ],
  "verwandteArtikel": [
    "mcp-server-mit-n8n-erstellen"
  ],
  "verwandteProjekte": [
    "mcp-plattform-self-hosted"
  ],
  "quellen": [
    {
      "titel": "Chrome for Developers: WebMCP",
      "url": "https://developer.chrome.com/docs/ai/webmcp",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Chrome for Developers: WebMCP, Imperative API",
      "url": "https://developer.chrome.com/docs/ai/webmcp/imperative-api",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Chrome for Developers: WebMCP, Declarative API",
      "url": "https://developer.chrome.com/docs/ai/webmcp/declarative-api",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "W3C Web Machine Learning Community Group: WebMCP, Draft Community Group Report",
      "url": "https://webmachinelearning.github.io/webmcp/",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "GitHub: webmachinelearning/webmcp (Explainer und Diskussion)",
      "url": "https://github.com/webmachinelearning/webmcp",
      "abgerufen": "2026-10-19"
    }
  ],
  "faq": [
    {
      "frage": "Was ist WebMCP?",
      "antwort": "WebMCP ist ein vorgeschlagener Webstandard, mit dem eine Website KI-Agenten im Browser Werkzeuge mit Namen, Beschreibung und Eingabeschema anbietet. Der Agent ruft dann zum Beispiel eine Suchfunktion direkt auf, statt die Seite zu lesen und Formulare per simuliertem Klick auszufüllen. Die Spezifikation entsteht in der Web Machine Learning Community Group des W3C, Chrome testet sie in einem Origin Trial."
    },
    {
      "frage": "Was ist der Unterschied zwischen WebMCP und MCP?",
      "antwort": "MCP ist ein Protokoll, über das KI-Anwendungen wie Claude oder ChatGPT Werkzeuge auf Servern ansprechen. WebMCP läuft dagegen in der geöffneten Webseite: Die Werkzeuge sind JavaScript-Funktionen oder annotierte Formulare und gelten nur für den Origin der Seite. WebMCP übernimmt Begriffe von MCP, soll Backend-Protokolle laut den Autoren aber ergänzen und nicht ersetzen."
    },
    {
      "frage": "Welche Browser unterstützen WebMCP?",
      "antwort": "Stand Oktober 2026 bietet Chrome WebMCP ab Version 149 als Origin Trial an. Lokal lässt es sich über das Flag chrome://flags/#enable-webmcp-testing aktivieren. Die Spezifikation ist ein Entwurf und kann sich noch ändern, deshalb sollte eine Website WebMCP nur als optionale Erweiterung einsetzen."
    },
    {
      "frage": "Wie registriere ich ein Werkzeug mit WebMCP?",
      "antwort": "Bei der imperativen API ruft eine Seite document.modelContext.registerTool() auf und übergibt Name, Beschreibung, ein JSON-Schema für die Eingaben und eine asynchrone execute-Funktion. Über ein AbortSignal in den Optionen lässt sich das Werkzeug später wieder abmelden. Bei der deklarativen API genügen die Attribute toolname und tooldescription an einem HTML-Formular."
    }
  ]
}
---

## Beispiel aus der Praxis

Ein Entwicklerportfolio mit Glossar und Fallstudien ist ein typischer Kandidat. Ein Browser-Agent, der im Auftrag einer Recruiterin prüfen soll, ob jemand Erfahrung mit RAG hat, müsste ohne WebMCP die Navigation lesen, eine Suche finden und Ergebnislisten auswerten. Mit WebMCP kann die Seite stattdessen ein Werkzeug wie `projekte_suchen` anbieten, das eine Liste passender Fallstudien mit Titel und Adresse zurückgibt.

Das Werkzeug ruft dieselbe Suchlogik auf, die auch das Suchfeld der Seite nutzt. Es liest nur und ändert nichts, was die Seite über den Hinweis `readOnlyHint` kennzeichnet. Ohne WebMCP im Browser passiert nichts, die Seite funktioniert wie bisher. So lässt sich der Standard als progressive Erweiterung testen, ohne sich auf einen Entwurf zu verlassen.

Ein solches Szenario ist bewusst klein gehalten: ein Werkzeug, nur lesend, ohne Zugriff auf Formulare mit persönlichen Daten.

## Wie funktioniert WebMCP?

Eine Website meldet beim Browser Werkzeuge an. Jedes Werkzeug hat einen Namen, eine Beschreibung in natürlicher Sprache und ein Eingabeschema. Ein Agent, der die Seite besucht, sieht diese Werkzeuge und kann sie aufrufen. Laut Chrome-Dokumentation soll die Website damit selbst erklären, wofür ein Element da ist, statt dass der Agent es aus dem Seitenaufbau erraten muss (Chrome for Developers, Stand: Oktober 2026).

Beide APIs unterliegen der Permissions Policy `tools`. Standardwert ist `self`, also erlaubt für das eigene Origin und das oberste Dokument; Iframes von fremden Origins brauchen `allow="tools"`. Für folgenreiche Aktionen wie Käufe kann ein Bestätigungsdialog für den Nutzer verlangt werden (Chrome for Developers).

## Wie sieht die imperative API aus?

Die imperative API registriert ein Werkzeug über `document.modelContext.registerTool()`. Pflichtfelder sind `name`, `description`, `inputSchema` als JSON-Schema und eine asynchrone Funktion `execute`. Optional sind `annotations`, darunter `readOnlyHint`, das standardmäßig `false` ist (Chrome for Developers, Imperative API).

```js
// Nur ausführen, wenn der Browser WebMCP anbietet.
if ('modelContext' in document) {
  const controller = new AbortController();

  await document.modelContext.registerTool(
    {
      name: 'projekte_suchen',
      description: 'Sucht Fallstudien auf dieser Website nach einem Stichwort und gibt Titel und URL zurück.',
      inputSchema: {
        type: 'object',
        properties: {
          stichwort: { type: 'string', description: 'Suchbegriff, z. B. "RAG" oder "n8n"' },
        },
        required: ['stichwort'],
      },
      annotations: { readOnlyHint: true },
      execute: async ({ stichwort }) => {
        const treffer = sucheProjekte(stichwort); // vorhandene Suchlogik der Seite
        return JSON.stringify(treffer.map((p) => ({ titel: p.titel, url: p.url })));
      },
    },
    { signal: controller.signal },
  );

  // Später abmelden: controller.abort();
}
```

Über das `signal` in den Optionen meldet `abort()` das Werkzeug wieder ab. Laufende Ausführungen werden dadurch laut Dokumentation nicht abgebrochen (Chrome for Developers, Stand: Oktober 2026).

## Wie funktioniert die deklarative API?

Die deklarative API macht ein bestehendes HTML-Formular zum Werkzeug. Am `<form>` stehen `toolname` und `tooldescription`; fehlt eines davon, wird das Werkzeug abgemeldet. Felder erhalten mit `toolparamdescription` eine Beschreibung für das Schema, ohne das Attribut nutzt Chrome den Text des zugehörigen `<label>`. Mit `toolautosubmit` sendet der Browser das Formular ab, sobald der Agent das Werkzeug aufruft; ohne dieses Attribut bleibt das ausgefüllte Formular sichtbar und der Mensch klickt selbst auf Absenden (Chrome for Developers, Declarative API).

Im Submit-Ereignis zeigt `agentInvoked`, ob ein Agent das Formular ausgelöst hat, und `respondWith()` gibt nach `preventDefault()` ein Ergebnis an das Modell zurück.

## Was ist der Unterschied zwischen WebMCP und MCP?

| Merkmal | MCP | WebMCP |
| --- | --- | --- |
| Ort der Werkzeuge | MCP-Server, lokal oder entfernt | In der geöffneten Webseite |
| Definition | Server-Code mit SDK | JavaScript im Frontend oder HTML-Attribute |
| Sicherheitsmodell | Transport, Autorisierung, Rechte des Servers | Origin, Permissions Policy, Sitzung des Nutzers im Tab |
| Typischer Einsatz | Agent greift auf Systeme und Daten zu | Agent und Mensch arbeiten gemeinsam auf einer Website |
| Status (Oktober 2026) | Datierte Spezifikation, breite Client-Unterstützung | Entwurf, Origin Trial in Chrome |

Die Autoren beschreiben WebMCP als Ergänzung: Es übernimmt Begriffe aus dem [Model Context Protocol](/glossar/mcp-model-context-protocol/), läuft aber im Browser und nutzt Konzepte des Webs wie Origins und Berechtigungen. MCP direkt zu übernehmen, haben sie verworfen, weil dort Konzepte wie DOM-Anbindung und der Lebenszyklus eines Tabs fehlen (webmachinelearning/webmcp).

## Wie testet man WebMCP?

Für eigene Versuche reicht ein lokales Chrome mit aktiviertem Flag `chrome://flags/#enable-webmcp-testing` und einem Neustart des Browsers. Wer WebMCP auf einer öffentlichen Website mit echten Besuchern ausprobieren will, meldet sich laut Chrome-Dokumentation für den Origin Trial an, der ab Chrome 149 verfügbar ist (Chrome for Developers, Stand: Oktober 2026).

In beiden Fällen gilt: Der Code sollte prüfen, ob `document.modelContext` existiert, und sonst nichts tun. So bleibt die Seite in allen anderen Browsern unverändert, und eine spätere Änderung der Spezifikation trifft nur die optionale Erweiterung.

Für die Werkzeuge selbst gelten dieselben Regeln wie bei einem MCP-Server. Namen und Beschreibungen sind die Schnittstelle zum Modell und sollten genau sagen, was ein Werkzeug tut und was es zurückgibt. Ein Werkzeug pro Aufgabe ist leichter zu kontrollieren als ein allgemeines Werkzeug mit vielen Optionen. Rückgaben sollten knapp und strukturiert sein, damit der Agent sie zuverlässig weiterverarbeiten kann.

## Welche Grenzen und Risiken hat WebMCP?

**Entwurfsstatus.** Die Spezifikation ist ein Draft Community Group Report und steht laut eigenem Text nicht auf dem Standardisierungspfad des W3C (Stand 16. Oktober 2026). Namen und Verhalten können sich ändern.

**Kein Betrieb ohne Tab.** Laut Chrome ist WebMCP für den Einsatz im sichtbaren Browser mit einem Menschen gedacht. Ein Agent muss eine Seite besuchen, um ihre Werkzeuge zu sehen.

**Erweiterungen und fremde Inhalte.** Chrome weist darauf hin, dass Browser-Erweiterungen Werkzeuge über Content Scripts abfragen und ausführen können. Gibt ein Werkzeug Inhalte von Nutzern zurück, etwa Kommentare, droht [Prompt Injection](/glossar/prompt-injection/); dafür gibt es den Hinweis `untrustedContentHint`.

**Schreibende Werkzeuge.** Werkzeuge, die bestellen, senden oder löschen, sollten eine Bestätigung durch den Menschen verlangen, wie es auch bei [Agentic Commerce](/glossar/agentic-commerce/) üblich ist.
