---
{
  "status": "entwurf",
  "begriff": "Human in the Loop",
  "h1": "Human in the Loop: Menschliche Freigabe in KI-Automatisierungen",
  "thema": "agenten_mcp",
  "alternativeNamen": [
    "HITL",
    "menschliche Freigabe"
  ],
  "kurzdefinition": "Human in the Loop ist ein Vorgehen, bei dem ein Mensch an festgelegten Stellen eines automatisierten Ablaufs prüft, freigibt oder korrigiert.",
  "seoTitel": "Was bedeutet Human in the Loop? Erklärt",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
  "verwandteBegriffe": [
    "ki-agent",
    "prompt-injection",
    "n8n",
    "tool-calling"
  ],
  "verwandteArtikel": [
    "mcp-server-mit-n8n-erstellen"
  ],
  "verwandteProjekte": [
    "leistungsnachweis-automation"
  ],
  "quellen": [],
  "faq": [
    {
      "frage": "Was bedeutet Human in the Loop?",
      "antwort": "Human in the Loop bezeichnet ein Vorgehen, bei dem ein Mensch an festgelegten Stellen eines automatisierten Ablaufs prüft, freigibt oder korrigiert. Bei KI-Agenten betrifft das meist Aktionen mit Folgen, etwa das Versenden einer E-Mail, das Veröffentlichen eines Textes oder das Ändern von Daten. Der Agent bereitet vor, der Mensch entscheidet."
    },
    {
      "frage": "Wie setzt man Human in the Loop in n8n um?",
      "antwort": "n8n bietet für Tools am AI-Agent-Node eine eingebaute Freigabe, die vor dem Tool-Aufruf eine Bestätigung verlangt, etwa per Chat, Slack oder E-Mail. Für Abläufe ohne Agent lässt sich eine Freigabe mit einem Warte-Schritt bauen, der erst nach einer Antwort weiterläuft. Für Werkzeuge hinter dem MCP Server Trigger greift die eingebaute Freigabe nicht; dort setzt man sie im Client oder in einem Sub-Workflow."
    },
    {
      "frage": "Wann braucht eine KI-Automatisierung Human in the Loop?",
      "antwort": "Eine menschliche Freigabe ist sinnvoll, wenn ein Fehler schwer rückgängig zu machen ist oder Außenwirkung hat, etwa bei E-Mails an Kunden, Zahlungen, Veröffentlichungen oder Änderungen an Stammdaten. Bei rein lesenden oder leicht korrigierbaren Schritten bremst eine Freigabe eher. Viele Teams starten mit Freigabe und lockern sie, wenn der Ablauf nachweislich zuverlässig läuft."
    }
  ]
}
---

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
