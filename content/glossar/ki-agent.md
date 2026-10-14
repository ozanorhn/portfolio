---
{
  "status": "entwurf",
  "begriff": "KI-Agent",
  "h1": "KI-Agent: Definition, Funktionsweise und Beispiele",
  "thema": "agenten_mcp",
  "alternativeNamen": [
    "KI-Agenten",
    "AI Agent",
    "AI-Agent"
  ],
  "kurzdefinition": "Ein KI-Agent ist ein Programm, das mit Hilfe eines Sprachmodells eine Aufgabe selbstständig in Schritte zerlegt und dafür Werkzeuge wie Suchen, Datenbanken oder APIs nutzt.",
  "seoTitel": "Was ist ein KI-Agent? Definition & Beispiele",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
  "verwandteBegriffe": [
    "tool-calling",
    "mcp-model-context-protocol",
    "multi-agent-system",
    "n8n",
    "prompt-injection",
    "system-prompt"
  ],
  "verwandteArtikel": [
    "n8n-agents-vs-ai-agent-node"
  ],
  "verwandteProjekte": [
    "pocket-ai-agent",
    "leistungsnachweis-automation"
  ],
  "quellen": [
    {
      "titel": "Anthropic: Building effective agents",
      "url": "https://www.anthropic.com/engineering/building-effective-agents",
      "abgerufen": null
    }
  ],
  "faq": [
    {
      "frage": "Was ist ein KI-Agent?",
      "antwort": "Ein KI-Agent ist ein Programm, das mit Hilfe eines Sprachmodells eine Aufgabe selbstständig in Schritte zerlegt und dafür Werkzeuge nutzt, etwa eine Suche, eine Datenbank oder eine API. Er entscheidet anhand der Zwischenergebnisse, welcher Schritt als Nächstes sinnvoll ist. Damit unterscheidet er sich von einem festen Workflow, in dem alle Schritte vorab festgelegt sind."
    },
    {
      "frage": "Was ist der Unterschied zwischen einem KI-Agenten und einem Chatbot?",
      "antwort": "Ein Chatbot beantwortet Fragen im Gespräch, meist ohne selbst etwas in anderen Systemen zu tun. Ein KI-Agent kann zusätzlich Werkzeuge aufrufen, Daten abfragen und Aktionen ausführen, etwa einen Termin anlegen oder einen Entwurf speichern. Viele moderne Chat-Anwendungen verbinden beides, indem sie Agenten-Funktionen in den Chat einbauen."
    },
    {
      "frage": "Wie erstelle ich einen KI-Agenten?",
      "antwort": "Ein KI-Agent braucht ein Sprachmodell, klare Anweisungen, eine Auswahl an Werkzeugen und eine Schleife, in der das Modell Werkzeuge aufruft und die Ergebnisse auswertet. Ohne Programmierung geht das zum Beispiel mit n8n, mit Code über Frameworks oder SDKs der Modellanbieter. Wichtig ist, jedem Werkzeug nur die nötigen Rechte zu geben und schreibende Aktionen erst nach Freigabe auszuführen."
    },
    {
      "frage": "Wann lohnt sich ein KI-Agent und wann ein fester Workflow?",
      "antwort": "Ein fester Workflow ist besser, wenn der Ablauf bekannt ist und sich immer wiederholt, etwa ein monatlicher Bericht. Ein KI-Agent lohnt sich, wenn der nächste Schritt von der Anfrage oder einem Zwischenergebnis abhängt und mehrere Werkzeuge infrage kommen. Agenten sind flexibler, dafür schwerer vorherzusagen und zu testen."
    }
  ]
}
---

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
