---
{
  "status": "veroeffentlicht",
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
  "seoBeschreibung": "Was ist ein KI-Agent? Definition, Bausteine, Muster zwischen Workflow und Agent, Werkzeugzugriff über MCP, Risiken und ein Praxisbeispiel.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Ein KI-Agent ist ein Sprachmodell, das in einer Schleife Werkzeuge nutzt und anhand der Ergebnisse den nächsten Schritt wählt.",
    "Anthropic unterscheidet Workflows mit vorab festgelegten Codepfaden von Agenten, die ihre Abläufe und Werkzeugnutzung selbst lenken.",
    "Ein KI-Agent braucht Abbruchbedingungen wie eine maximale Zahl an Durchläufen, damit er nicht endlos weiterläuft.",
    "Ein KI-Agent kann nur, was seine Werkzeuge und deren Zugangsschlüssel erlauben.",
    "Mehr Selbstständigkeit bedeutet höhere Kosten und das Risiko, dass sich Fehler über mehrere Schritte aufschaukeln."
  ],
  "steckbriefFakten": [
    {
      "label": "Max Iterations (n8n Tools Agent)",
      "wert": "Standardwert 10 (Stand: Oktober 2026)"
    },
    {
      "label": "Risiko laut OWASP",
      "wert": "LLM06:2025 Excessive Agency"
    }
  ],
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
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "n8n Docs: Tools AI Agent node",
      "url": "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "OWASP Top 10 for LLM Applications: LLM06 Excessive Agency",
      "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
      "abgerufen": "2026-10-14"
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
    },
    {
      "frage": "Wie funktionieren KI-Agenten?",
      "antwort": "Ein KI-Agent arbeitet in einer Schleife: Das Sprachmodell liest die Aufgabe, entscheidet, ob ein Werkzeug nötig ist, ruft es auf und wertet das Ergebnis aus. Danach entscheidet es erneut, bis die Aufgabe erledigt ist oder eine Grenze erreicht wird, etwa eine maximale Zahl an Schritten. Welche Werkzeuge der Agent nutzen darf und was er damit tun kann, legt der Entwickler fest."
    },
    {
      "frage": "Welche Arten von KI-Agenten gibt es?",
      "antwort": "Verbreitet sind Assistenz-Agenten in Chat-Anwendungen, Agenten in Automatisierungsplattformen wie n8n, Coding-Agenten für Softwareentwicklung und Recherche-Agenten, die Quellen suchen und zusammenfassen. Technisch unterscheiden sie sich vor allem darin, welche Werkzeuge sie nutzen dürfen und wie selbstständig sie handeln. Mehrere spezialisierte Agenten lassen sich zu einem Multi-Agent-System verbinden."
    },
    {
      "frage": "Wofür werden KI-Agenten im Vertrieb eingesetzt?",
      "antwort": "Im Vertrieb übernehmen KI-Agenten vor allem vorbereitende Arbeit: Anfragen einordnen, Informationen zu einem Unternehmen zusammentragen, CRM-Einträge ergänzen oder Entwürfe für Antworten schreiben. Entscheidungen und der Kontakt zum Kunden bleiben in der Regel beim Menschen. Wichtig ist, dass der Agent nur die CRM-Rechte hat, die er für seine Aufgabe braucht."
    }
  ]
}
---

## Beispiel aus der Praxis

Der [Hermes Pocket AI Agent](/projekte/pocket-ai-agent/) ist ein selbst gehosteter Sprachagent von Ozan Orhan. Als Interface dient ein kleines Handgerät auf Basis eines ESP32-S3, das Sprache aufnimmt, einen Status anzeigt und Antworten abspielt. Die eigentliche Agentenlogik läuft auf einem Server.

Eine gesprochene Anfrage wird transkribiert und an den Agenten übergeben. Der Agent entscheidet dann selbst, ob er ein Werkzeug braucht, etwa Todoist für Aufgaben, Notion für Notizen oder den Kalender. Die Werkzeuge erreicht er über [MCP](/glossar/mcp-model-context-protocol/). Die Antwort geht als Sprache zurück an das Gerät.

Das Beispiel zeigt, was einen KI-Agenten von einem festen Ablauf unterscheidet: Welcher Schritt folgt, hängt von der Anfrage ab. „Was steht morgen an?“ führt zum Kalender, „Merk dir, dass ich Milch kaufen muss“ zu Todoist. Ein fester Workflow müsste jeden dieser Pfade vorab kennen.

## Welche Bausteine braucht ein KI-Agent?

Ein KI-Agent besteht aus wenigen Teilen. Jeder davon beeinflusst, wie zuverlässig und wie sicher er arbeitet.

**Sprachmodell:** Das [LLM](/glossar/llm/) liest die Aufgabe, plant den nächsten Schritt und formuliert die Antwort. Die Wahl des Modells bestimmt Qualität, Geschwindigkeit und Kosten.

**Anweisungen:** Der System Prompt beschreibt Aufgabe, Ton und Grenzen. Er steuert das Verhalten, ist aber keine Sicherheitsgrenze.

**Werkzeuge:** Funktionen, die der Agent aufrufen darf, etwa eine Suche, eine Datenbankabfrage oder eine API. Name und Beschreibung eines Werkzeugs entscheiden mit darüber, ob das Modell es richtig einsetzt.

**Gedächtnis:** Ein Sitzungsgedächtnis hält den Verlauf eines Gesprächs. Ein Langzeitgedächtnis speichert Informationen über mehrere Sitzungen hinweg. Im Hermes-Projekt sind beide bewusst getrennt.

**Abbruchbedingungen:** Ein Agent braucht eine Grenze, damit er nicht endlos weiterläuft. Anthropic empfiehlt dafür etwa eine maximale Zahl an Durchläufen (Anthropic, 2024). Der Tools Agent in n8n begrenzt die Durchläufe über die Option „Max Iterations“, deren Standardwert bei 10 liegt (n8n Docs, Stand: Oktober 2026).

Anthropic bezeichnet Agenten deshalb als Sprachmodelle, die in einer Schleife Werkzeuge auf Grundlage von Rückmeldungen aus ihrer Umgebung nutzen (Anthropic, 2024).

## Welche Muster zwischen Workflow und KI-Agent gibt es?

Zwischen einem vollständig festen Ablauf und einem frei handelnden Agenten liegen mehrere Zwischenstufen. Anthropic unterscheidet Workflows, in denen Modelle und Werkzeuge über vorab festgelegte Codepfade gesteuert werden, von Agenten, die ihre Abläufe und Werkzeugnutzung selbst lenken (Anthropic, 2024). Für Workflows beschreibt Anthropic mehrere Muster.

| Muster | Wer bestimmt den Ablauf | Beispiel |
| --- | --- | --- |
| Prompt Chaining | Fest vorgegeben, ein Modellaufruf nach dem anderen | Erst Gliederung, dann Text, dann Prüfung |
| Routing | Ein Modell ordnet die Eingabe einem festen Pfad zu | Anfragen nach Thema an verschiedene Abläufe verteilen |
| Parallelisierung | Fest vorgegeben, Teilaufgaben laufen gleichzeitig | Mehrere Prüfungen eines Textes parallel |
| Orchestrator und Worker | Ein Modell zerlegt die Aufgabe, Worker bearbeiten Teile | Änderungen über mehrere Dateien verteilen |
| Evaluator und Optimizer | Ein Modell erzeugt, ein zweites bewertet in Runden | Übersetzung mit Rückmeldung verbessern |
| KI-Agent | Das Modell wählt Schritte und Werkzeuge selbst | Sprachassistent mit mehreren Werkzeugen |

Viele produktive Automatisierungen liegen bewusst auf den ersten Stufen. Der [Recruiting Jobs Sync](/projekte/recruiting-jobs-sync/) nutzt ein Modell nur für einen klar umrissenen Extraktionsschritt, die Reihenfolge bleibt fest. Wie sich diese Entscheidung in n8n konkret darstellt, beschreibt der Artikel [n8n Agents vs. AI-Agent-Node](/blog/n8n-agents-vs-ai-agent-node/). Allgemein zu festen Abläufen siehe [Workflow-Automatisierung](/glossar/workflow-automatisierung/).

## Wie greift ein KI-Agent über MCP auf Werkzeuge zu?

Das Model Context Protocol ist ein offener Standard, über den KI-Anwendungen Werkzeuge und Daten ansprechen. Ein MCP-Server stellt Werkzeuge bereit, der Agent ruft sie über einen MCP-Client auf. Der Vorteil: Ein Werkzeug wird einmal gebaut und kann von verschiedenen Agenten genutzt werden.

Ein Beispiel ist Ozan Orhans [Wissensbasis mit RAG und MCP](/projekte/wissensbasis-rag-mcp/). Sie stellt internes Wissen über einen MCP-Server als ein einziges, nur lesendes Suchwerkzeug bereit. Jeder MCP-fähige Agent kann es nutzen, ohne eine eigene Dokumentpipeline oder Datenbankanbindung zu brauchen. Wie Agenten auf diese Weise mehrere Quellen schrittweise abfragen, erklären der Eintrag [Agentic RAG](/glossar/agentic-rag/) und der Artikel [Agentic RAG mit MCP](/blog/agentic-rag-mcp-architektur/).

Für die Sicherheit gilt: Der Agent kann nur, was seine Werkzeuge und deren Zugangsschlüssel erlauben. Kleine Werkzeuge mit genau einer Aufgabe sind deshalb besser als ein Werkzeug mit vollem API-Zugriff. Den Aufbau eines solchen Servers zeigt der Artikel [n8n MCP Server erstellen](/blog/mcp-server-mit-n8n-erstellen/).

## Welche Risiken haben KI-Agenten?

Mehr Selbstständigkeit bringt nach Anthropic höhere Kosten und das Risiko, dass sich Fehler über mehrere Schritte aufschaukeln (Anthropic, 2024). Ein falsch gelesenes Zwischenergebnis kann zu einem falschen Werkzeugaufruf führen, dessen Ergebnis den nächsten Schritt weiter in die falsche Richtung lenkt.

OWASP beschreibt das Risiko unter dem Namen Excessive Agency: Ein System kann schädliche Aktionen ausführen, weil es zu viele Funktionen, zu weitreichende Rechte oder zu viel Selbstständigkeit hat (OWASP, 2025). Als Gegenmaßnahmen nennt OWASP minimale Rechte, eine menschliche Freigabe für folgenreiche Aktionen und Berechtigungsprüfungen im Zielsystem statt im Modell.

Ein besonderes Risiko ist [Prompt Injection](/glossar/prompt-injection/). Agenten lesen Inhalte aus E-Mails, Webseiten oder Dokumenten und bedienen gleichzeitig Werkzeuge. Versteckte Anweisungen in diesen Inhalten können den Agenten zu Aktionen verleiten, die niemand beabsichtigt hat.

Die gängigen Schutzschichten sind [Guardrails](/glossar/guardrails/) für Ein- und Ausgaben, eine Freigabe nach dem Prinzip [Human in the Loop](/glossar/human-in-the-loop/) und Tests in einer abgeschotteten Umgebung. Anthropic empfiehlt für Agenten ausdrücklich umfangreiche Tests in Sandbox-Umgebungen zusammen mit passenden Guardrails (Anthropic, 2024).
