---
{
  "status": "veroeffentlicht",
  "begriff": "Kontextfenster",
  "h1": "Kontextfenster (Context Window): Wie viel ein Sprachmodell auf einmal verarbeitet",
  "thema": "ki_grundlagen",
  "alternativeNamen": [
    "Context Window",
    "Kontextlänge",
    "Context Length",
    "Token-Limit"
  ],
  "kurzdefinition": "Das Kontextfenster ist die maximale Menge an Tokens, die ein Sprachmodell in einer Anfrage berücksichtigen kann, einschließlich Systemprompt, Gesprächsverlauf, Dokumenten, Tool-Ergebnissen und der erzeugten Antwort.",
  "seoTitel": "Kontextfenster (Context Window) einfach erklärt",
  "seoBeschreibung": "Was ist ein Kontextfenster? Die Token-Grenze eines Sprachmodells pro Anfrage. Mit aktuellen Größen, Lost in the Middle, Kosten und Bezug zu RAG.",
  "erstveroeffentlicht": "2026-10-19T09:00:00Z",
  "aktualisiert": "2026-10-21T12:00:00Z",
  "steckbriefAussagen": [
    "Das Kontextfenster begrenzt, wie viele Tokens ein Sprachmodell in einer einzelnen Anfrage berücksichtigt, Eingabe und Ausgabe zusammen.",
    "Alles in einer Anfrage zählt mit: Systemprompt, Verlauf, Dokumente, Tool-Definitionen, Tool-Ergebnisse und die Antwort einschließlich Denkschritten.",
    "Ein großes Kontextfenster heißt nicht, dass ein Modell alle Informationen darin gleich gut nutzt; Informationen in der Mitte langer Kontexte werden oft schlechter verwendet.",
    "Mehr Kontext bedeutet bei API-Modellen mehr Eingabe-Tokens und damit höhere Kosten pro Anfrage.",
    "RAG füllt das Kontextfenster gezielt mit den passenden Abschnitten, statt ganze Dokumentbestände mitzuschicken."
  ],
  "steckbriefFakten": [
    {
      "label": "Aktuelle Claude-Modelle",
      "wert": "1 Mio. Tokens, ältere Modelle 200.000 Tokens (Anthropic, Stand: Oktober 2026)"
    },
    {
      "label": "Gemini-Modelle",
      "wert": "1.048.576 Tokens (Google AI for Developers, Stand: Oktober 2026)"
    },
    {
      "label": "OpenAI-Flaggschiffmodelle",
      "wert": "1,05 Mio. Tokens (OpenAI, Models, Stand: Oktober 2026)"
    },
    {
      "label": "Lost in the Middle",
      "wert": "Leistung oft am höchsten, wenn relevante Information am Anfang oder Ende steht (Liu et al., 2024)"
    }
  ],
  "verwandteBegriffe": [
    "token",
    "llm",
    "rag",
    "chunking",
    "ki-halluzination",
    "ki-agent",
    "mcp-model-context-protocol"
  ],
  "verwandteArtikel": [
    "company-brain-aufbauen-rag-architektur"
  ],
  "verwandteProjekte": [],
  "quellen": [
    {
      "titel": "Claude Docs: Context windows",
      "url": "https://platform.claude.com/docs/en/build-with-claude/context-windows",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Liu et al. (2024): Lost in the Middle: How Language Models Use Long Contexts, TACL 12",
      "url": "https://aclanthology.org/2024.tacl-1.9/",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Google AI for Developers: Understand and count tokens",
      "url": "https://ai.google.dev/gemini-api/docs/tokens",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "OpenAI API Docs: Models",
      "url": "https://developers.openai.com/api/docs/models",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Claude Docs: Prompting best practices (Long context prompting)",
      "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices",
      "abgerufen": "2026-10-19"
    }
  ],
  "faq": [
    {
      "frage": "Was ist ein Kontextfenster?",
      "antwort": "Das Kontextfenster ist die Höchstmenge an Tokens, die ein Sprachmodell in einer Anfrage verarbeiten kann. Dazu gehören Systemprompt, bisheriger Gesprächsverlauf, eingefügte Dokumente, Tool-Ergebnisse und die Antwort des Modells. Was nicht ins Kontextfenster passt, kann das Modell in dieser Anfrage nicht berücksichtigen."
    },
    {
      "frage": "Wie groß ist das Kontextfenster aktueller KI-Modelle?",
      "antwort": "Stand Oktober 2026 nennen die großen Anbieter für ihre aktuellen Modelle rund eine Million Tokens: Anthropic 1 Million Tokens für aktuelle Claude-Modelle, Google 1.048.576 Tokens für Gemini, OpenAI 1,05 Millionen Tokens für seine Flaggschiffmodelle. Ältere oder kleinere Modelle haben teils deutlich kleinere Fenster, Anthropic nennt etwa 200.000 Tokens für ältere Claude-Modelle. Die Werte ändern sich mit jeder Modellgeneration."
    },
    {
      "frage": "Was passiert, wenn das Kontextfenster voll ist?",
      "antwort": "Das hängt von Anbieter und Anwendung ab. Manche APIs lehnen eine zu große Anfrage ab, andere brechen die Antwort ab, sobald das Limit erreicht ist; Anthropic gibt bei neueren Claude-Modellen dann einen eigenen Stop-Grund zurück. Chat-Anwendungen kürzen oder fassen ältere Gesprächsteile oft zusammen, wodurch frühe Informationen verloren gehen können."
    },
    {
      "frage": "Was bedeutet Lost in the Middle?",
      "antwort": "Lost in the Middle beschreibt die Beobachtung, dass Sprachmodelle Informationen in der Mitte eines langen Kontexts schlechter nutzen als Informationen am Anfang oder Ende. Liu et al. zeigten das 2023 an Frage-Antwort-Aufgaben über mehrere Dokumente, auch bei Modellen, die ausdrücklich für lange Kontexte gebaut waren. Die Arbeit erschien 2024 in der Fachzeitschrift TACL."
    }
  ]
}
---

## Beispiel aus der Praxis

Ein typisches Szenario: Ein [KI-Agent](/glossar/ki-agent/) bearbeitet eine längere Aufgabe und ruft dafür mehrere Werkzeuge auf, etwa eine Suche, eine Datenbank und eine API. Jeder Aufruf liefert Ergebnisse zurück, die im Verlauf stehen bleiben. Nach einigen Schritten besteht der größte Teil des Kontexts nicht mehr aus der eigentlichen Aufgabe, sondern aus alten Tool-Ergebnissen.

Das Kontextfenster ist noch nicht voll, trotzdem werden die Antworten unpräziser. Eine Vorgabe aus dem Anfang des Gesprächs wird übersehen, eine Zahl aus einem frühen Suchergebnis falsch übernommen. Gleichzeitig steigen die Kosten, weil bei jedem neuen Schritt der gesamte Verlauf erneut als Eingabe abgerechnet wird.

Die Gegenmaßnahmen setzen beim Inhalt an, nicht bei der Größe: Tool-Ergebnisse auf die relevanten Felder kürzen, erledigte Zwischenschritte zusammenfassen und Dokumente per [RAG](/glossar/rag/) abschnittsweise holen statt komplett einzufügen. Die Werkzeuge selbst lassen sich über das [Model Context Protocol](/glossar/mcp-model-context-protocol/) so beschreiben, dass sie nur das Nötige zurückgeben.

## Was zählt alles zum Kontextfenster?

Anthropic beschreibt es eindeutig: Alles in einer Anfrage zählt zum Kontextfenster, also Systemprompt, alle Nachrichten einschließlich Tool-Ergebnissen, Bildern und Dokumenten sowie die Tool-Definitionen. Auch die Ausgabe des Modells zählt mit, einschließlich der Denkschritte (Anthropic, Context windows).

Bei Gesprächen wächst der Inhalt mit jeder Runde. Jede Nachricht und jede Antwort bleibt im Verlauf und wird bei der nächsten Anfrage erneut mitgeschickt (Anthropic, Context windows). Ein Chat, der sich über viele Runden zieht, verbraucht deshalb mit jeder Runde mehr [Tokens](/glossar/token/).

Prompt Caching ändert daran nichts Grundsätzliches. Laut Anthropic verändert Caching nur, was man für wiederverwendete Tokens bezahlt, nicht ob sie zum Kontextfenster zählen (Anthropic, Context windows).

## Wie groß sind Kontextfenster aktueller Modelle?

Die Größen ändern sich mit jeder Modellgeneration. Die folgende Übersicht gibt die Angaben der Anbieter wieder, Stand: Oktober 2026.

| Anbieter | Modelle | Kontextfenster | Quelle |
| --- | --- | --- | --- |
| Anthropic | aktuelle Claude-Modelle, etwa Opus 5.5 und Sonnet 5.5 | 1 Mio. Tokens | Claude Docs, Context windows |
| Anthropic | ältere Modelle, etwa Claude Sonnet 4.5 | 200.000 Tokens | Claude Docs, Context windows |
| Google | Gemini 4, 3 und 2.5 | 1.048.576 Tokens | Google AI for Developers, Tokens |
| OpenAI | GPT-6 Astra, GPT-6.1 Sol, GPT-6 Luna | 1,05 Mio. Tokens | OpenAI, Models |

Neben dem Kontextfenster gibt es ein eigenes Ausgabelimit. Anthropic nennt für die Modelle mit 1 Million Tokens bis zu 128.000 Ausgabe-Tokens pro Anfrage, OpenAI für die genannten Modelle ebenfalls 128.000 (Anthropic, Context windows; OpenAI, Models, Stand: Oktober 2026). Bei Gemini 4 teilen sich Eingabe, Denkschritte und Ausgabe ein gemeinsames Fenster, bei Gemini 3 und 2.5 gibt es getrennte Budgets für Eingabe und Ausgabe (Google AI for Developers, Stand: Oktober 2026).

## Warum nutzen Modelle lange Kontexte nicht vollständig?

Ein großes Kontextfenster heißt nur, dass ein Modell viel Text annimmt. Wie gut es diesen Text nutzt, ist eine andere Frage.

Liu et al. haben das an zwei Aufgaben untersucht: Fragen über mehrere Dokumente und das Wiederfinden eines Werts in einer langen Liste von Schlüssel-Wert-Paaren. Die Leistung war oft am höchsten, wenn die relevante Information am Anfang oder am Ende des Kontexts stand, und sank deutlich, wenn sie in der Mitte lag, auch bei Modellen, die ausdrücklich für lange Kontexte gebaut waren (Liu et al., 2024). Der Effekt ist unter dem Namen „Lost in the Middle“ bekannt.

Anthropic beschreibt ein verwandtes Phänomen als „Context Rot“: Mit wachsender Tokenzahl nehmen Genauigkeit und Erinnerungsleistung ab. Deshalb sei die Auswahl dessen, was im Kontext steht, ebenso wichtig wie der verfügbare Platz (Anthropic, Context windows).

Die Anordnung im Prompt hilft. Anthropic empfiehlt, lange Dokumente oben im Prompt zu platzieren und die Frage ans Ende zu stellen; in Tests habe das die Antwortqualität um bis zu 30 Prozent verbessert, besonders bei komplexen Eingaben aus mehreren Dokumenten (Anthropic, Prompting best practices).

## Was kostet ein großes Kontextfenster?

Bei API-Modellen werden Eingabe-Tokens bei jeder Anfrage abgerechnet. Wer ein umfangreiches Handbuch mitschickt, bezahlt es bei jeder Frage erneut. Je voller das Kontextfenster, desto teurer die Anfrage und meist auch desto länger die Antwortzeit.

Zusätzlich gibt es teils Preisstufen für lange Kontexte. Anthropic rechnet lange Kontexte bei den meisten aktuellen Modellen zum Standardpreis ab, bei Claude Haiku 5.5 kosten Prompts über 100.000 Tokens dagegen mehr (Anthropic, Context windows, Stand: Oktober 2026). Die Preisseite des jeweiligen Anbieters ist hier die einzige verlässliche Quelle.

Wie Code Execution mit MCP verhindert, dass Werkzeugergebnisse das Kontextfenster füllen, beschreibt der Artikel [Agentic RAG mit MCP](/blog/agentic-rag-mcp-architektur/).

## Kontextfenster oder RAG: Was ist besser?

Beides schließt sich nicht aus. [RAG](/glossar/rag/) entscheidet, was ins Kontextfenster kommt; das Kontextfenster bestimmt, wie viel davon hineinpasst. Für kleine, stabile Wissensbestände kann es einfacher sein, alles mitzuschicken. Für große oder sich ändernde Bestände ist eine gezielte Auswahl per [semantischer Suche](/glossar/semantische-suche/) meist günstiger und wegen „Lost in the Middle“ oft auch genauer.

Eine ausführliche Gegenüberstellung von RAG und langem Kontext steht im Eintrag zu [RAG](/glossar/rag/). Wie groß die einzelnen Abschnitte sein sollten, die per RAG ins Fenster gelangen, beschreibt der Eintrag zu [Chunking](/glossar/chunking/). Wie ein Unternehmen Wissen insgesamt für Modelle aufbereitet, zeigt der Artikel [Company Brain aufbauen](/blog/company-brain-aufbauen-rag-architektur/).

## Wie hängen Kontextfenster und Halluzinationen zusammen?

Ein Modell kann nur Informationen verwenden, die im Kontextfenster stehen oder in seinen Trainingsdaten stecken. Fehlt die relevante Stelle im Kontext oder geht sie in einem überlangen Prompt unter, steigt das Risiko, dass das Modell eine plausible, aber falsche Antwort erzeugt. Mehr dazu steht im Eintrag [KI-Halluzination](/glossar/ki-halluzination/).
