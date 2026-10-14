---
{
  "status": "entwurf",
  "begriff": "Agentic RAG",
  "h1": "Agentic RAG: Definition und Unterschied zu RAG",
  "thema": "rag_suche",
  "alternativeNamen": [],
  "kurzdefinition": "Agentic RAG ist eine Weiterentwicklung von RAG, bei der ein KI-Agent selbst entscheidet, welche Datenquellen er in welcher Reihenfolge abfragt.",
  "seoTitel": "Was ist Agentic RAG? Unterschied zu RAG",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
  "verwandteBegriffe": [
    "rag",
    "ki-agent",
    "mcp-model-context-protocol",
    "tool-calling"
  ],
  "verwandteArtikel": [
    "agentic-rag-mcp-architektur"
  ],
  "verwandteProjekte": [
    "wissensbasis-rag-mcp"
  ],
  "quellen": [],
  "faq": [
    {
      "frage": "Was ist Agentic RAG?",
      "antwort": "Agentic RAG ist eine Weiterentwicklung von RAG, bei der ein KI-Agent selbst entscheidet, welche Datenquellen er in welcher Reihenfolge abfragt. Statt einer einzigen Vektorsuche stellt der Agent Zwischenfragen, kombiniert Ergebnisse aus mehreren Systemen und sucht bei Bedarf gezielt nach. Das hilft bei Fragen, die Informationen aus verschiedenen Quellen verbinden."
    },
    {
      "frage": "Was ist der Unterschied zwischen RAG und Agentic RAG?",
      "antwort": "Klassisches RAG folgt einem festen Ablauf: suchen, Treffer an das Modell geben, antworten. Bei Agentic RAG steuert das Modell den Ablauf selbst und nutzt dafür Werkzeuge, etwa über MCP-Server. Das ist flexibler, verbraucht aber mehr Token und ist schwerer vorherzusagen."
    },
    {
      "frage": "Wie funktioniert Agentic RAG?",
      "antwort": "Der Agent bekommt eine Frage und eine Auswahl an Suchwerkzeugen, etwa eine Vektorsuche, eine Datenbankabfrage oder eine Websuche. Er zerlegt die Frage bei Bedarf in Teilfragen, ruft passende Werkzeuge auf, prüft die Treffer und sucht nach, wenn Informationen fehlen. Erst wenn er genug Belege hat, formuliert er die Antwort."
    }
  ]
}
---

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
