---
{
  "status": "veroeffentlicht",
  "begriff": "Agentic RAG",
  "h1": "Agentic RAG: Definition und Unterschied zu RAG",
  "thema": "rag_suche",
  "alternativeNamen": [],
  "kurzdefinition": "Agentic RAG ist eine Weiterentwicklung von RAG, bei der ein KI-Agent selbst entscheidet, welche Datenquellen er in welcher Reihenfolge abfragt.",
  "seoTitel": "Was ist Agentic RAG? Unterschied zu RAG",
  "seoBeschreibung": "Was ist Agentic RAG? Definition, Praxisbeispiel mit MCP, Entwurfsmuster, Risiken und wann sich Agentic RAG gegenüber klassischem RAG lohnt.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Bei Agentic RAG entscheidet ein KI-Agent selbst, ob, wo und wie oft er sucht, statt einem festen Ablauf zu folgen.",
    "Agentic RAG nutzt vier Entwurfsmuster: Reflexion, Planung, Werkzeugnutzung und die Zusammenarbeit mehrerer Agenten.",
    "Klassisches RAG ist ein Workflow mit festem Codepfad, Agentic RAG ein Agent, der seinen Ablauf selbst steuert.",
    "Mehr Autonomie kostet Antwortzeit und Token und erhöht das Risiko, dass sich Fehler über mehrere Schritte aufsummieren."
  ],
  "steckbriefFakten": [
    {
      "label": "Entwurfsmuster",
      "wert": "Reflexion, Planung, Werkzeugnutzung, Multi-Agent (Singh et al., 2025)"
    }
  ],
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
  "quellen": [
    {
      "titel": "Singh et al. (2025): Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG",
      "url": "https://arxiv.org/abs/2501.09136",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Anthropic (2024): Building effective agents",
      "url": "https://www.anthropic.com/engineering/building-effective-agents",
      "abgerufen": "2026-10-14"
    }
  ],
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

## Beispiel aus der Praxis

Im Projekt [Wissensbasis mit RAG und MCP-Server](/projekte/wissensbasis-rag-mcp/) ist die Suche in internen Dokumenten nicht fest in einen Chatbot eingebaut. Sie steht als eigenes Werkzeug über einen MCP-Server bereit, das beliebige Agenten aufrufen können.

Damit liegt die Entscheidung beim [KI-Agenten](/glossar/ki-agent/): Er bekommt eine Frage, liest die Beschreibung des Werkzeugs und entscheidet, ob und mit welcher Suchanfrage er die Wissensbasis abfragt. Genau dieser Schritt unterscheidet Agentic RAG vom festen Ablauf klassischer RAG-Systeme.

Eine Erkenntnis aus dem Projekt: Name, Beschreibung, Eingabeschema und Rückgabeformat des Werkzeugs sind Teil der Schnittstelle. Die Beschreibung sagt dem Agenten, wann und wofür er die Wissensbasis nutzen soll. Ist sie unklar, ruft der Agent das Werkzeug zu selten oder mit unpassenden Anfragen auf.

Das Werkzeug ist bewusst nur lesend. Der Agent kann suchen, aber keine Dokumente oder Vektoren verändern.

## Welche Muster nutzt Agentic RAG?

Eine Übersichtsarbeit von Singh und Kollegen beschreibt Agentic RAG als RAG-Pipeline, in die autonome Agenten eingebettet sind (Singh et al., 2025). Die Agenten nutzen vier Entwurfsmuster: Reflexion, Planung, Werkzeugnutzung und die Zusammenarbeit mehrerer Agenten.

Reflexion heißt, dass der Agent seine Zwischenergebnisse prüft. Reichen die gefundenen Textstellen nicht aus, formuliert er die Suche neu oder fragt eine andere Quelle ab.

Planung heißt, dass der Agent eine komplexe Frage in Teilfragen zerlegt. Die Frage „Welche Kunden mit auslaufendem Vertrag hatten im letzten Quartal Supportfälle?“ braucht zum Beispiel eine Abfrage im Vertragssystem und eine im Ticketsystem.

Werkzeugnutzung heißt, dass der Agent verschiedene Suchwege aufrufen kann: eine Vektorsuche, eine SQL-Abfrage, eine Websuche oder eine Programmierschnittstelle. Bei der Zusammenarbeit mehrerer Agenten übernehmen spezialisierte Agenten einzelne Quellen oder Prüfschritte.

## Wann lohnt sich Agentic RAG und wann reicht klassisches RAG?

Anthropic unterscheidet zwischen Workflows, bei denen Sprachmodell und Werkzeuge über vorher festgelegte Codepfade verbunden sind, und Agenten, die ihren Ablauf und ihre Werkzeugnutzung selbst steuern (Anthropic, 2024). Klassisches RAG ist ein Workflow, Agentic RAG ein Agent.

| Situation | Klassisches RAG | Agentic RAG |
| --- | --- | --- |
| Frage lässt sich mit einer Suche in einer Quelle beantworten | geeignet | unnötig aufwendig |
| Antwort braucht Daten aus mehreren Systemen | stößt an Grenzen | geeignet |
| Suchbegriff ist vorab unklar und muss verfeinert werden | stößt an Grenzen | geeignet |
| Antwortzeit und Kosten müssen planbar sein | geeignet | schwerer vorherzusagen |
| Ablauf muss vollständig nachvollziehbar sein | einfacher | braucht Protokollierung jedes Werkzeugaufrufs |

Als Faustregel gilt: mit dem einfachsten Ablauf beginnen, der die Aufgabe löst. Agentic RAG lohnt sich erst, wenn der feste Ablauf nachweislich an seine Grenzen stößt.

## Welche Risiken hat Agentic RAG?

Mehr Autonomie bedeutet mehr Aufrufe. Anthropic weist darauf hin, dass agentische Systeme oft Latenz und Kosten gegen bessere Ergebnisse tauschen und dass sich Fehler über mehrere Schritte aufsummieren können (Anthropic, 2024).

Ein weiteres Risiko sind Inhalte, die der Agent während der Suche liest. Enthalten Dokumente oder Webseiten versteckte Anweisungen, kann der Agent sie als Befehl missverstehen. Dieses Risiko heißt [Prompt Injection](/glossar/prompt-injection/) und betrifft jedes System, das fremde Texte an ein Sprachmodell gibt.

Ein drittes Risiko ist fehlende Nachvollziehbarkeit. Wenn der Agent mehrere Quellen in wechselnder Reihenfolge abfragt, lässt sich eine falsche Antwort nur aufklären, wenn jeder Werkzeugaufruf mit Parametern und Ergebnis protokolliert wird.

Schutz bieten eng begrenzte Werkzeuge mit Leserechten, Rechteprüfung vor jeder Abfrage, feste Obergrenzen für die Zahl der Schritte und [Guardrails](/glossar/guardrails/), die Eingaben und Ausgaben prüfen.

## Welche Rolle spielt MCP bei Agentic RAG?

Das [Model Context Protocol](/glossar/mcp-model-context-protocol/) ist ein offener Standard, über den Agenten Werkzeuge und Datenquellen einheitlich ansprechen. Für Agentic RAG heißt das: Jede Quelle wird einmal als MCP-Server bereitgestellt und ist dann für alle MCP-fähigen Agenten nutzbar.

Wie eine solche Architektur mit Vektordatenbank, SQL und Rechteprüfung aufgebaut ist, beschreibt der Artikel [Agentic RAG mit MCP](/blog/agentic-rag-mcp-architektur/) ausführlich. Wie sich bestehende Workflows als Werkzeuge bereitstellen lassen, zeigt die Anleitung [MCP-Server mit n8n erstellen](/blog/mcp-server-mit-n8n-erstellen/). Die Grundlagen der Suche selbst erklärt der Eintrag [RAG](/glossar/rag/).
