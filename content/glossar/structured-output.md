---
{
  "status": "veroeffentlicht",
  "begriff": "Structured Output",
  "h1": "Structured Output: Strukturierte Antworten von Sprachmodellen",
  "thema": "ki_grundlagen",
  "alternativeNamen": [
    "strukturierte Ausgabe",
    "JSON-Mode"
  ],
  "kurzdefinition": "Structured Output ist die Fähigkeit eines Sprachmodells, seine Antwort in einem fest vorgegebenen Format zu liefern, meist als JSON nach einem bestimmten Schema.",
  "seoTitel": "Was ist Structured Output? Einfach erklärt",
  "seoBeschreibung": "Was ist Structured Output? Sprachmodelle antworten als JSON nach festem Schema. Mit Funktionsweise, Vergleich zum JSON-Mode, n8n und Grenzen.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Structured Output zwingt ein Sprachmodell, seine Antwort als JSON nach einem vorgegebenen Schema zu liefern.",
    "Der JSON-Mode garantiert nur gültiges JSON, Structured Output zusätzlich die Einhaltung des Schemas.",
    "Technisch wird das Schema in eine Grammatik übersetzt, die die Ausgabe des Modells beim Erzeugen einschränkt.",
    "Ein Schema garantiert die Form der Daten, nicht ihre inhaltliche Richtigkeit.",
    "Ablehnungen und am Token-Limit abgebrochene Antworten können vom Schema abweichen und müssen vor dem Parsen geprüft werden."
  ],
  "steckbriefFakten": [
    {
      "label": "Verfahren",
      "wert": "Constrained Decoding (Anthropic, Structured Outputs)"
    }
  ],
  "verwandteBegriffe": [
    "tool-calling",
    "prompt-engineering",
    "ki-agent",
    "n8n"
  ],
  "verwandteArtikel": [
    "n8n-agents-vs-ai-agent-node",
    "agentic-rag-mcp-architektur"
  ],
  "verwandteProjekte": [
    "ki-rechnungspruefung",
    "recruiting-jobs-sync"
  ],
  "quellen": [
    {
      "titel": "OpenAI API Docs: Structured model outputs",
      "url": "https://developers.openai.com/api/docs/guides/structured-outputs",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Claude Docs: Structured outputs",
      "url": "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Ollama Docs: Structured Outputs",
      "url": "https://docs.ollama.com/capabilities/structured-outputs",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "n8n Docs: Structured Output Parser node",
      "url": "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/",
      "abgerufen": "2026-10-14"
    }
  ],
  "faq": [
    {
      "frage": "Was ist Structured Output?",
      "antwort": "Structured Output bezeichnet die Fähigkeit eines Sprachmodells, seine Antwort in einem fest vorgegebenen Format zu liefern, meist als JSON nach einem bestimmten Schema. Statt freiem Text erhält die Anwendung so Daten, die sie direkt weiterverarbeiten kann. Viele Modellanbieter und Werkzeuge wie n8n bieten dafür eigene Optionen an."
    },
    {
      "frage": "Warum ist Structured Output für Automatisierungen wichtig?",
      "antwort": "Automatisierungen brauchen verlässliche Daten, etwa ein Feld „Kategorie“ mit festen Werten oder ein Datum im richtigen Format. Mit Structured Output lässt sich das erzwingen und prüfen, bevor die Daten in ein CRM oder eine Datenbank geschrieben werden. Pflichtfelder sollten trotzdem zusätzlich im Workflow geprüft werden."
    }
  ]
}
---

## Beispiel aus der Praxis

Im [Recruiting Jobs Sync](/projekte/recruiting-jobs-sync/) liest ein [LLM](/glossar/llm/) Stellenanzeigen aus bereinigtem HTML aus. Die Extraktion ist an ein Schema gebunden, und ein Enum begrenzt die möglichen Werte für die Seniorität. So landen nicht „Senior“, „Sr.“ und „erfahren“ als drei verschiedene Werte in der Datenbank, und die Stellen bleiben über mehrere Läufe konsistent gruppierbar.

Der [Grounding Page Generator](/projekte/grounding-page-generator/) geht einen Schritt weiter. Der Generierungsschritt erzeugt Titel, Meta-Description, JSON-LD und HTML-Body gegen ein striktes Schema, das die Pflichtbausteine eines Standards abbildet und zusätzliche, nicht definierte Felder verhindert. Die inhaltliche Prüfung der Fakten übernimmt davor ein Mensch.

In beiden Fällen sorgt das Schema für die Form der Daten, nicht für ihre Richtigkeit. Diese Trennung ist der Kern von Structured Output.

## Wie funktioniert Structured Output?

Die Anwendung übergibt dem Modell zusammen mit dem Prompt ein JSON-Schema. Es legt fest, welche Felder es gibt, welchen Typ sie haben, welche Pflicht sind und welche Werte ein Feld annehmen darf.

Bei echtem Structured Output prüft nicht erst die Anwendung das Ergebnis, sondern das Modell kann gar nicht anders antworten. Anthropic beschreibt, dass das Schema in eine Grammatik übersetzt wird, die die Ausgabe von Claude einschränkt; das Verfahren heißt Constrained Decoding (Anthropic, Structured Outputs). OpenAI formuliert das Ziel so, dass das Modell immer Antworten erzeugt, die dem übergebenen JSON-Schema entsprechen (OpenAI, Structured Outputs).

Auch lokale Modelle unterstützen das. Ollama nimmt über das Feld format ein JSON-Schema entgegen und erzwingt damit die Struktur der Antwort (Ollama-Dokumentation, Structured Outputs); mehr dazu unter [lokales LLM](/glossar/lokales-llm/).

## Structured Output vs. JSON-Mode: Was ist der Unterschied?

| Merkmal | JSON-Mode | Structured Output |
| --- | --- | --- |
| Garantie | Gültiges JSON | Gültiges JSON nach dem vorgegebenen Schema |
| Feldnamen und Typen | Nicht garantiert | Durch das Schema festgelegt |
| Pflichtfelder | Nicht garantiert | Durch das Schema festgelegt |
| Prüfung in der Anwendung | Vollständig nötig | Für Inhalte und Sonderfälle weiter nötig |

OpenAI hält fest, dass der JSON-Mode nur gültiges JSON sicherstellt, Structured Outputs dagegen zusätzlich die Einhaltung des Schemas, und empfiehlt Structured Outputs, wo immer möglich (OpenAI, Structured Outputs).

## Structured Output oder Tool Calling: Was passt wann?

Beide nutzen Schemas, beantworten aber unterschiedliche Fragen. Anthropic unterscheidet JSON-Ausgaben, die das Format der Antwort steuern, von Strict Tool Use, das die Parameter von Tool-Aufrufen validiert (Anthropic, Structured Outputs).

OpenAI gibt eine ähnliche Faustregel: Function Calling, wenn das Modell Tools oder Funktionen der Anwendung aufrufen soll; ein festes Antwortformat, wenn die Antwort selbst eine bestimmte Struktur haben soll (OpenAI, Structured Outputs). Ein [KI-Agent](/glossar/ki-agent/) braucht meist beides.

## Wie nutzt man Structured Output in n8n?

In [n8n](/glossar/n8n/) gibt es dafür den Knoten Structured Output Parser. Er gibt Felder auf Basis eines JSON-Schemas zurück, das man entweder aus einem Beispiel-JSON erzeugen lässt oder selbst definiert (n8n-Dokumentation). Beim Erzeugen aus einem Beispiel behandelt n8n alle Felder als Pflichtfelder; Verweise per $ref werden nicht unterstützt (n8n-Dokumentation).

Wie sich Agenten in n8n aufbauen lassen und wann ein fester Workflow besser passt, beschreibt der Artikel [n8n Agents vs. AI-Agent-Node](/blog/n8n-agents-vs-ai-agent-node/).

## Wo hat Structured Output Grenzen?

Das Schema garantiert die Form, nicht den Inhalt. Ein Feld „Datum“ kann ein gültiges, aber falsches Datum enthalten. Werte, die Folgen haben, sollten deshalb im Workflow geprüft oder per [Human-in-the-Loop](/glossar/human-in-the-loop/) freigegeben werden.

Es gibt außerdem Sonderfälle. Anthropic nennt Ablehnungen aus Sicherheitsgründen und Antworten, die am Token-Limit abbrechen, als Fälle, in denen die Ausgabe nicht dem Schema entspricht; bei Enums können Werte in der Groß- und Kleinschreibung abweichen (Anthropic, Structured Outputs). OpenAI empfiehlt ebenfalls, vor dem Parsen auf Ablehnungen und unvollständige Antworten zu prüfen (OpenAI, Structured Outputs).

Nicht jede JSON-Schema-Funktion wird unterstützt. Anthropic schließt unter anderem rekursive Schemas sowie Zahlen- und Längenbeschränkungen wie minimum oder maxLength aus (Anthropic, Structured Outputs, Stand: Oktober 2026). Solche Regeln gehören dann in eine Prüfung nach der Antwort, zum Beispiel als [Guardrails](/glossar/guardrails/).
