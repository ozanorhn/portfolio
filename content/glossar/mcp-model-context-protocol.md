---
{
  "status": "veroeffentlicht",
  "begriff": "MCP (Model Context Protocol)",
  "h1": "MCP (Model Context Protocol): Definition und Funktionsweise",
  "thema": "agenten_mcp",
  "alternativeNamen": [
    "Model Context Protocol",
    "MCP-Server"
  ],
  "kurzdefinition": "MCP (Model Context Protocol) ist ein offener Standard, über den KI-Anwendungen wie Claude oder ChatGPT externe Werkzeuge und Datenquellen einheitlich ansprechen.",
  "seoTitel": "Was ist MCP (Model Context Protocol)? Erklärt",
  "seoBeschreibung": "MCP (Model Context Protocol) ist der offene Standard, über den KI-Anwendungen Tools und Daten anbinden. Mit Praxisbeispiel, Vergleich und Fehlern.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-21T12:00:00Z",
  "steckbriefAussagen": [
    "MCP (Model Context Protocol) ist ein offener Standard, über den KI-Anwendungen Werkzeuge und Daten über MCP-Server einheitlich ansprechen, statt für jede Kombination eine eigene Integration zu brauchen.",
    "MCP unterscheidet Host, Client und Server und überträgt Nachrichten als JSON-RPC 2.0 über stdio oder Streamable HTTP.",
    "Ein MCP-Server bietet Tools, Resources und Prompts an; Tools sind Funktionen, die das Sprachmodell aufrufen kann.",
    "Anthropic hat MCP im November 2024 vorgestellt und im Dezember 2025 an die Agentic AI Foundation unter dem Dach der Linux Foundation übergeben.",
    "Sicher wird ein MCP-Server durch eng geschnittene Werkzeuge mit minimalen Rechten und eine Freigabe vor folgenreichen Aktionen, nicht durch Regeln im Prompt."
  ],
  "steckbriefFakten": [
    {
      "label": "Vorgestellt",
      "wert": "25. November 2024 von Anthropic"
    },
    {
      "label": "Träger",
      "wert": "Agentic AI Foundation (Linux Foundation), seit 9. Dezember 2025"
    },
    {
      "label": "Aktuelle Spezifikation",
      "wert": "Version 2026-07-28 (Stand: Oktober 2026)"
    },
    {
      "label": "Standard-Transporte",
      "wert": "stdio und Streamable HTTP"
    }
  ],
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
    "wissensbasis-rag-mcp",
    "mcp-plattform-self-hosted",
    "seo-agent-multi-agent-system"
  ],
  "quellen": [
    {
      "titel": "Model Context Protocol: Spezifikation (Version 2026-07-28)",
      "url": "https://modelcontextprotocol.io/specification/latest",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Model Context Protocol: Spezifikation, Transports",
      "url": "https://modelcontextprotocol.io/specification/latest/basic/transports",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Model Context Protocol: Spezifikation, Authorization",
      "url": "https://modelcontextprotocol.io/specification/latest/basic/authorization",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Anthropic (2024): Introducing the Model Context Protocol",
      "url": "https://www.anthropic.com/news/model-context-protocol",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Anthropic (2025): Donating the Model Context Protocol and establishing the Agentic AI Foundation",
      "url": "https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "n8n Docs: MCP Server Trigger",
      "url": "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger/",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "OWASP Top 10 for LLM Applications 2025: LLM01 Prompt Injection",
      "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
      "abgerufen": "2026-10-14"
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
      "antwort": "MCP selbst regelt, wie Verbindungen aufgebaut und Werkzeuge aufgerufen werden; für entfernte Server über HTTP empfiehlt die Spezifikation eine Autorisierung auf Basis von OAuth 2.1. Wie sicher ein MCP-Server ist, hängt vor allem davon ab, welche Rechte seine Werkzeuge haben. Minimale Rechte und eine Freigabe vor schreibenden Aktionen sind wichtig, weil Agenten durch Prompt Injection manipuliert werden können."
    },
    {
      "frage": "Was bedeutet MCP im Zusammenhang mit KI?",
      "antwort": "Im KI-Umfeld steht MCP für Model Context Protocol, einen offenen Standard für die Verbindung von KI-Anwendungen mit Werkzeugen und Daten. Über MCP kann etwa ein Chat-Assistent auf ein CMS, eine Datenbank oder einen Kalender zugreifen, ohne dass für jede Anwendung eine eigene Integration gebaut werden muss."
    },
    {
      "frage": "Hat MCP etwas mit dem Medikament MCP zu tun?",
      "antwort": "Nein. Das Medikament MCP (Metoclopramid) gegen Übelkeit hat mit dem Model Context Protocol nichts zu tun, die Abkürzung ist zufällig gleich. Diese Seite behandelt ausschließlich das KI-Protokoll. Fragen zum Medikament beantworten Arzt oder Apotheke."
    },
    {
      "frage": "Wie baut man einen MCP-Server?",
      "antwort": "Ein MCP-Server lässt sich mit den offiziellen SDKs, etwa für TypeScript oder Python, programmieren: Man definiert Werkzeuge mit Name, Beschreibung und Eingabeschema und verbindet sie mit der eigentlichen Logik. Ohne Programmierung geht es mit n8n über den MCP Server Trigger, der einen Workflow zum MCP-Server macht und die daran angeschlossenen Werkzeuge bereitstellt. In beiden Fällen sollte jedes Werkzeug nur die Rechte bekommen, die es braucht."
    }
  ]
}
---

## Beispiel aus der Praxis

Gemeint ist hier das Model Context Protocol aus der KI-Entwicklung, nicht das Medikament MCP (Metoclopramid). Ein konkreter Einsatz ist die [Wissensbasis mit RAG und MCP-Server](/projekte/wissensbasis-rag-mcp/), die Ozan Orhan in n8n umgesetzt hat. Interne Dokumente werden dort in einem eigenen Workflow in Abschnitte zerlegt, als [Embeddings](/glossar/embeddings/) in PostgreSQL mit Vektor-Erweiterung gespeichert und über einen zweiten Workflow abgefragt.

Der zweite Workflow ist ein MCP-Server mit genau einem Werkzeug: semantische Suche in der Wissensbasis, nur lesend. Jeder MCP-fähige Agent kann dieses Werkzeug nutzen, ohne Datenbankzugang oder eigene Retrieval-Logik zu bekommen. Ändert sich das Chunking oder das Embedding-Modell, wirkt das zentral für alle angebundenen Clients.

Ein zweites Beispiel ist der [Hermes Pocket AI Agent](/projekte/pocket-ai-agent/), ein selbst gehosteter Sprachagent mit Handgerät. Der Agent auf dem Server ruft Todoist, Notion, Google Workspace und Spotify über MCP auf. Das Gerät selbst kennt keine dieser Integrationen. Neue Werkzeuge kommen auf dem Server hinzu, ohne dass die Firmware geändert werden muss.

Weitere Praxisbeispiele für MCP mit Claude beschreiben die Artikel [Ghidra MCP mit Claude](/blog/reverse-engineering-claude-ghidra-mcp/) und [Claude Code Mods](/blog/claude-code-mods/).

## Wie funktioniert das Model Context Protocol?

MCP beschreibt drei Rollen. Der Host ist die KI-Anwendung, etwa ein Chat-Assistent oder eine Entwicklungsumgebung. Der Client ist die Verbindungskomponente innerhalb des Hosts. Der Server stellt Kontext und Fähigkeiten bereit (MCP-Spezifikation, Version 2026-07-28).

Die Nachrichten zwischen Client und Server sind im Format JSON-RPC 2.0 kodiert. Als Vorbild nennt die Spezifikation das Language Server Protocol: So wie dieses Programmiersprachen einheitlich in Editoren einbindet, bindet MCP Werkzeuge und Daten einheitlich in KI-Anwendungen ein.

Für den Transport definiert die Spezifikation zwei Standardwege. Bei stdio startet der Client den Server als lokalen Unterprozess und tauscht Nachrichten über Standardein- und Standardausgabe aus. Bei Streamable HTTP schickt der Client jede Nachricht als HTTP-POST an einen MCP-Endpunkt, und der Server antwortet mit JSON oder einem SSE-Stream.

Eine typische Anfrage läuft so ab: Der Client fragt beim Server ab, welche Werkzeuge es gibt. Das Sprachmodell sieht Namen, Beschreibungen und Eingabeschemas und entscheidet, ob es ein Werkzeug braucht. Der Host ruft das Werkzeug über den Client auf und gibt das Ergebnis an das Modell zurück.

## Welche Bausteine stellt ein MCP-Server bereit?

Ein MCP-Server kann laut Spezifikation drei Arten von Fähigkeiten anbieten:

| Baustein | Was er liefert | Wer ihn nutzt | Beispiel |
| --- | --- | --- | --- |
| Tools | Funktionen, die das Modell ausführen kann | Das Modell entscheidet über den Aufruf | Suche in einer Wissensbasis, Entwurf im CMS anlegen |
| Resources | Kontext und Daten | Nutzer oder Modell | Dateiinhalte, Datensätze |
| Prompts | Vorlagen für Nachrichten und Abläufe | Nutzer wählen sie aus | Vorlage zum Prüfen eines Artikels |

In der Praxis sind Tools der wichtigste Baustein. Ihre Beschreibung ist die Schnittstelle zum Modell: Sie legt fest, wann das Modell ein Werkzeug nutzt und welche Eingaben es übergibt. In der Wissensbasis oben werden Name, Beschreibung, Eingabeschema und Rückgabeformat deshalb wie eine API-Schnittstelle behandelt.

In [n8n](/glossar/n8n/) übernimmt der Node MCP Server Trigger die Rolle des Servers. Er unterstützt SSE und Streamable HTTP, aber kein stdio (n8n Docs). Wie man damit einen eigenen Server baut und absichert, zeigt die Anleitung [n8n MCP Server erstellen und sicher an Claude anbinden](/blog/mcp-server-mit-n8n-erstellen/).

## MCP vs. Tool Calling: Was ist der Unterschied?

Tool Calling, auch Function Calling genannt, und MCP werden oft verwechselt, lösen aber verschiedene Aufgaben. Tool Calling ist die Fähigkeit eines [Sprachmodells](/glossar/llm/), statt Text einen strukturierten Werkzeugaufruf auszugeben. MCP regelt, wie eine Anwendung Werkzeuge verschiedener Anbieter findet, aufruft und einbindet.

| Merkmal | Tool Calling | MCP |
| --- | --- | --- |
| Ebene | Fähigkeit des Modells | Protokoll zwischen Anwendung und Server |
| Ort der Werkzeugdefinition | Im Code der jeweiligen Anwendung | Auf dem MCP-Server |
| Wiederverwendung | Pro Anwendung neu umgesetzt | Ein Server für alle MCP-fähigen Clients |
| Festgelegt durch | Den jeweiligen Modellanbieter | Eine offene Spezifikation |

Beides ergänzt sich. Ein [KI-Agent](/glossar/ki-agent/) nutzt Tool Calling, um zu entscheiden, welches Werkzeug er braucht, und MCP, um es zu erreichen. Wie Agenten über MCP mehrere Wissensquellen kombinieren, beschreibt der Beitrag [Agentic RAG mit MCP](/blog/agentic-rag-mcp-architektur/).

## Wer entwickelt MCP und wem gehört der Standard?

Anthropic hat MCP am 25. November 2024 als offenen Standard vorgestellt, zusammen mit Spezifikation, SDKs und fertigen Servern unter anderem für Google Drive, Slack, GitHub und Postgres (Anthropic, 2024). Ziel war, einzelne Integrationen pro Datenquelle durch ein gemeinsames Protokoll zu ersetzen.

Am 9. Dezember 2025 hat Anthropic MCP an die Agentic AI Foundation übergeben, einen Directed Fund unter dem Dach der Linux Foundation, den Anthropic, Block und OpenAI gemeinsam gegründet haben (Anthropic, 2025). Das Governance-Modell von MCP bleibt laut Anthropic dabei unverändert.

Zum Zeitpunkt der Übergabe nannte Anthropic mehr als 10.000 aktive öffentliche MCP-Server und Unterstützung in ChatGPT, Cursor, Gemini, Microsoft Copilot und Visual Studio Code (Anthropic, 2025). Die Spezifikation erscheint in datierten Versionen; Stand Oktober 2026 ist die [Fassung 2026-07-28](/blog/mcp-2026-07-28-zustandslose-spezifikation/) aktuell.

## Welche Fehler passieren beim Einsatz von MCP?

**Zu breite Werkzeuge.** Ein Werkzeug, das beliebige API-Aufrufe erlaubt, gibt dem Modell alle Rechte des dahinterliegenden Zugangsschlüssels. Besser ist ein Werkzeug pro Aufgabe, etwa „Entwurf anlegen“ statt „CMS bearbeiten“, und gar kein Werkzeug zum Löschen, wenn es nicht gebraucht wird.

**Regeln nur im Prompt.** Eine Werkzeugbeschreibung wie „nur nach Bestätigung aufrufen“ ist eine Bitte, keine Grenze. Die Spezifikation verlangt, dass Hosts vor jedem Werkzeugaufruf die ausdrückliche Zustimmung der Nutzer einholen, und stuft Werkzeugbeschreibungen nicht vertrauenswürdiger Server als unzuverlässig ein (MCP-Spezifikation, Version 2026-07-28).

**Prompt Injection unterschätzt.** Liest ein Agent über MCP Webseiten, Dokumente oder E-Mails, können darin versteckte Anweisungen stehen. OWASP führt [Prompt Injection](/glossar/prompt-injection/) an erster Stelle der Top 10 für LLM-Anwendungen 2025 und empfiehlt minimale Rechte sowie [Human-in-the-Loop](/glossar/human-in-the-loop/) für privilegierte Aktionen (OWASP, 2025).

**Entfernte Server ohne Zugangsschutz.** Ein öffentlich erreichbarer MCP-Endpunkt ohne Authentifizierung ist eine offene Tür zu allem, was seine Werkzeuge können. Für HTTP-basierte Server beschreibt die Spezifikation eine optionale Autorisierung auf Basis von OAuth 2.1; der MCP Server Trigger in n8n bietet Bearer- und Header-Authentifizierung an (n8n Docs).

**Zugangsdaten an der falschen Stelle.** Der Schlüssel für das Zielsystem gehört auf den Server, nicht in den Chat und nicht ins Projekt-Repository. Für lokale Server, die über stdio laufen, sieht die Spezifikation vor, Zugangsdaten aus der Umgebung zu lesen.
