---
{
  "status": "entwurf",
  "begriff": "Prompt Injection",
  "h1": "Prompt Injection: Definition, Beispiele und Schutz",
  "thema": "sicherheit",
  "alternativeNamen": [],
  "kurzdefinition": "Prompt Injection ist ein Angriff auf KI-Anwendungen, bei dem ein Angreifer Anweisungen in die Eingabe eines Sprachmodells schmuggelt, damit es seine eigentlichen Vorgaben ignoriert.",
  "seoTitel": "Prompt Injection: Definition, Beispiele & Schutz",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
  "verwandteBegriffe": [
    "system-prompt",
    "ki-agent",
    "mcp-model-context-protocol",
    "tool-calling",
    "rag"
  ],
  "verwandteArtikel": [
    "mcp-server-mit-n8n-erstellen",
    "agentic-rag-mcp-architektur"
  ],
  "verwandteProjekte": [],
  "quellen": [
    {
      "titel": "OWASP Top 10 for LLM Applications: LLM01 Prompt Injection",
      "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
      "abgerufen": null
    }
  ],
  "faq": [
    {
      "frage": "Was ist Prompt Injection?",
      "antwort": "Prompt Injection ist ein Angriff auf KI-Anwendungen, bei dem ein Angreifer Anweisungen in die Eingabe eines Sprachmodells schmuggelt, damit es seine eigentlichen Vorgaben ignoriert. Das Modell kann dann vertrauliche Informationen preisgeben oder Aktionen ausführen, die niemand beabsichtigt hat. OWASP führt Prompt Injection als größtes Risiko in seinen Top 10 für LLM-Anwendungen."
    },
    {
      "frage": "Was ist der Unterschied zwischen direkter und indirekter Prompt Injection?",
      "antwort": "Bei der direkten Prompt Injection gibt ein Nutzer die manipulierende Anweisung selbst in den Chat ein. Bei der indirekten Prompt Injection steckt die Anweisung in Inhalten, die das Modell verarbeitet, etwa in einer Webseite, einer E-Mail oder einem Dokument. Die indirekte Form ist für KI-Agenten besonders gefährlich, weil sie Inhalte aus vielen Quellen lesen und gleichzeitig Werkzeuge bedienen."
    },
    {
      "frage": "Wie kann man sich vor Prompt Injection schützen?",
      "antwort": "Vollständig verhindern lässt sich Prompt Injection nach heutigem Stand nicht, das Risiko lässt sich aber stark begrenzen. Wichtig sind minimale Rechte für jedes Werkzeug, eine menschliche Freigabe vor folgenreichen Aktionen, die Trennung von Anweisungen und Fremdinhalten sowie die Kontrolle der Ausgaben. Anweisungen im System Prompt allein sind keine Sicherheitsgrenze."
    },
    {
      "frage": "Kann Prompt Injection auch bei MCP-Servern passieren?",
      "antwort": "Ja. Liest ein Agent über einen MCP-Server Inhalte aus E-Mails, Tickets oder Webseiten, können darin versteckte Anweisungen stehen, die ihn zu weiteren Werkzeugaufrufen verleiten. Deshalb sollte jedes MCP-Werkzeug nur die Rechte haben, die es für seine Aufgabe braucht, und schreibende Aktionen sollten eine Bestätigung verlangen."
    }
  ]
}
---

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
