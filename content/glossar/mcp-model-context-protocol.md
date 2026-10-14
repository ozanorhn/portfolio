---
{
  "status": "entwurf",
  "begriff": "MCP (Model Context Protocol)",
  "h1": "MCP (Model Context Protocol): Definition und Funktionsweise",
  "thema": "agenten_mcp",
  "alternativeNamen": [
    "Model Context Protocol",
    "MCP-Server"
  ],
  "kurzdefinition": "MCP (Model Context Protocol) ist ein offener Standard, über den KI-Anwendungen wie Claude oder ChatGPT externe Werkzeuge und Datenquellen einheitlich ansprechen.",
  "seoTitel": "Was ist MCP (Model Context Protocol)? Erklärt",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
  "verwandteBegriffe": [
    "ki-agent",
    "tool-calling",
    "prompt-injection",
    "n8n",
    "rag"
  ],
  "verwandteArtikel": [
    "mcp-server-mit-n8n-erstellen",
    "agentic-rag-mcp-architektur",
    "reverse-engineering-claude-ghidra-mcp"
  ],
  "verwandteProjekte": [
    "wissensbasis-rag-mcp"
  ],
  "quellen": [
    {
      "titel": "Model Context Protocol: Spezifikation",
      "url": "https://modelcontextprotocol.io",
      "abgerufen": null
    },
    {
      "titel": "Anthropic (2024): Introducing the Model Context Protocol",
      "url": "https://www.anthropic.com/news/model-context-protocol",
      "abgerufen": null
    }
  ],
  "faq": [
    {
      "frage": "Was ist MCP?",
      "antwort": "MCP steht für Model Context Protocol und ist ein offener Standard, über den KI-Anwendungen wie Claude oder ChatGPT externe Werkzeuge und Datenquellen ansprechen. Anthropic hat MCP im November 2024 vorgestellt und im Dezember 2025 an die Agentic AI Foundation der Linux Foundation übergeben. Statt für jede Kombination aus KI-Anwendung und Datenquelle eine eigene Schnittstelle zu bauen, genügt ein MCP-Server pro Datenquelle."
    },
    {
      "frage": "Was ist ein MCP-Server?",
      "antwort": "Ein MCP-Server ist ein Dienst, der einer KI-Anwendung über das Model Context Protocol Werkzeuge, Daten oder Vorlagen bereitstellt. Die KI-Anwendung, der sogenannte Host, verbindet sich über einen MCP-Client mit dem Server und kann dessen Werkzeuge aufrufen. Ein MCP-Server kann zum Beispiel Zugriff auf ein CMS, eine Datenbank oder eine Wissensbasis geben."
    },
    {
      "frage": "Wie unterscheiden sich MCP und eine normale API?",
      "antwort": "Eine API ist eine Schnittstelle eines einzelnen Dienstes mit eigenem Format. MCP ist ein einheitliches Protokoll, das beschreibt, wie KI-Anwendungen Werkzeuge entdecken und aufrufen. Ein MCP-Server nutzt im Hintergrund oft eine bestehende API und macht sie für KI-Anwendungen in einheitlicher Form verfügbar."
    },
    {
      "frage": "Ist MCP sicher?",
      "antwort": "MCP selbst regelt, wie Verbindungen aufgebaut und Werkzeuge aufgerufen werden; für entfernte Server sieht die Spezifikation eine Autorisierung nach OAuth 2.1 vor. Wie sicher ein MCP-Server ist, hängt vor allem davon ab, welche Rechte seine Werkzeuge haben. Minimale Rechte und eine Freigabe vor schreibenden Aktionen sind wichtig, weil Agenten durch Prompt Injection manipuliert werden können."
    }
  ]
}
---

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
