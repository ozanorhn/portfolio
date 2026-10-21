---
{
  "status": "veroeffentlicht",
  "begriff": "Token",
  "h1": "Token bei KI: Was Tokens sind und warum sie Kosten und Limits bestimmen",
  "thema": "ki_grundlagen",
  "alternativeNamen": [
    "Tokens",
    "KI-Token",
    "LLM-Token",
    "Tokenisierung"
  ],
  "kurzdefinition": "Ein Token ist die kleinste Texteinheit, die ein Sprachmodell verarbeitet, etwa ein Wort, ein Wortteil, ein Satzzeichen oder ein einzelnes Zeichen. Nach Tokens richten sich Kosten, Kontextfenster und Ausgabelimits.",
  "seoTitel": "Token bei KI: Definition, Kosten und Limits",
  "seoBeschreibung": "Was ist ein Token bei KI? Die Texteinheit, die Sprachmodelle verarbeiten. Mit Faustregeln, Tokenisierung, Kosten, Limits und deutschen Texten.",
  "erstveroeffentlicht": "2026-10-19T09:00:00Z",
  "aktualisiert": "2026-10-21T12:00:00Z",
  "steckbriefAussagen": [
    "Sprachmodelle verarbeiten Text nicht als Wörter, sondern als Tokens: ganze Wörter, Wortteile, Satzzeichen oder einzelne Zeichen.",
    "Für englischen Text gilt als Faustregel etwa 4 Zeichen pro Token oder rund 75 Wörter pro 100 Tokens.",
    "Derselbe Inhalt kann je nach Sprache unterschiedlich viele Tokens ergeben; für andere Sprachen als Englisch gelten die Faustregeln nicht verlässlich.",
    "API-Preise, Kontextfenster und Ausgabelimits werden in Tokens angegeben, deshalb bestimmen Tokens Kosten und Machbarkeit einer Anwendung.",
    "Tokenzahlen sind modellabhängig: Ein neuer Tokenizer kann für denselben Text mehr oder weniger Tokens ergeben."
  ],
  "steckbriefFakten": [
    {
      "label": "Faustregel Englisch (OpenAI)",
      "wert": "1 Token ≈ 4 Zeichen ≈ ¾ Wort (OpenAI Help Center)"
    },
    {
      "label": "Faustregel Gemini",
      "wert": "1 Token ≈ 4 Zeichen, 100 Tokens ≈ 60 bis 80 englische Wörter (Google AI for Developers)"
    },
    {
      "label": "Tokenizer ab Claude Opus 4.7",
      "wert": "etwa 30 % mehr Tokens für denselben Text als bei älteren Claude-Modellen (Anthropic, Stand: Oktober 2026)"
    },
    {
      "label": "Unterschied zwischen Sprachen",
      "wert": "bis zum 15-Fachen für denselben übersetzten Text (Petrov et al., 2023)"
    }
  ],
  "verwandteBegriffe": [
    "llm",
    "kontextfenster",
    "embeddings",
    "chunking",
    "ki-halluzination",
    "lokales-llm"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [],
  "quellen": [
    {
      "titel": "OpenAI Help Center: Understanding and counting tokens",
      "url": "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Google AI for Developers: Understand and count tokens",
      "url": "https://ai.google.dev/gemini-api/docs/tokens",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Claude Docs: Token counting",
      "url": "https://platform.claude.com/docs/en/build-with-claude/token-counting",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Petrov et al. (2023): Language Model Tokenizers Introduce Unfairness Between Languages",
      "url": "https://arxiv.org/abs/2305.15425",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "OpenAI API Docs: Models",
      "url": "https://developers.openai.com/api/docs/models",
      "abgerufen": "2026-10-19"
    }
  ],
  "faq": [
    {
      "frage": "Was ist ein Token bei KI?",
      "antwort": "Ein Token ist die Einheit, in die ein Sprachmodell Text zerlegt, bevor es ihn verarbeitet. Das kann ein ganzes Wort sein, ein Wortteil, ein Satzzeichen oder ein einzelnes Zeichen. Häufige kurze Wörter sind oft ein Token, lange oder seltene Wörter werden in mehrere Tokens zerlegt."
    },
    {
      "frage": "Wie viele Wörter sind 1.000 Tokens?",
      "antwort": "Für englischen Text nennt OpenAI als Faustregel etwa 75 Wörter pro 100 Tokens, 1.000 Tokens entsprechen also rund 750 englischen Wörtern. Google gibt für Gemini 60 bis 80 englische Wörter pro 100 Tokens an. Für deutsche Texte gelten diese Werte nicht verlässlich; genaue Zahlen liefert nur das Zählwerkzeug des jeweiligen Anbieters."
    },
    {
      "frage": "Warum kosten KI-Anfragen nach Tokens?",
      "antwort": "Sprachmodelle verarbeiten jeden Token einzeln, sowohl in der Eingabe als auch in der Ausgabe. Der Rechenaufwand und damit der Preis hängen deshalb von der Zahl der Tokens ab. Anbieter nennen ihre Preise meist pro Million Tokens, getrennt für Eingabe und Ausgabe, wobei Ausgabe-Tokens in der Regel teurer sind."
    },
    {
      "frage": "Brauchen deutsche Texte mehr Tokens als englische?",
      "antwort": "Oft ja, unter anderem weil lange Wörter in mehrere Tokens zerlegt werden und deutsche Komposita entsprechend in mehrere Teile zerfallen. Wie groß der Unterschied ist, hängt vom Modell und vom Text ab. Petrov et al. zeigten 2023, dass derselbe übersetzte Text je nach Sprache bis zu 15-mal mehr Tokens ergeben kann; für einen konkreten Fall hilft nur Nachzählen."
    }
  ]
}
---

## Beispiel aus der Praxis

Ein typisches Szenario: Ein Workflow soll eingehende E-Mails mit einem [LLM](/glossar/llm/) zusammenfassen und einer Kategorie zuordnen. In der Planung wird die Wortzahl einer durchschnittlichen Mail mit der englischen Faustregel in Tokens umgerechnet, daraus entstehen eine Kostenschätzung und eine Annahme, wie viele Mails in einen Aufruf passen.

Im Betrieb liegen die tatsächlichen Werte darüber. Die Mails sind deutsch, enthalten Signaturen, zitierte Vorgängernachrichten und Fachbegriffe, die in viele Teile zerfallen. Dazu kommen der Systemprompt, die Beschreibung der Kategorien und ein JSON-Schema für die Ausgabe, die bei jedem Aufruf mitgeschickt werden.

Die Lösung beginnt mit Messen statt Schätzen: Die Zählfunktion des Anbieters liefert die echte Tokenzahl für repräsentative Beispiel-Mails. Danach lässt sich gezielt kürzen, etwa zitierte Verläufe entfernen, bevor der Text an das Modell geht. Das senkt die Kosten und lässt mehr Platz im [Kontextfenster](/glossar/kontextfenster/).

## Wie funktioniert Tokenisierung?

Tokenisierung ist der Schritt, der Text in Tokens zerlegt. Google beschreibt Tokens als Einheiten, die einzelne Zeichen wie „z“ oder ganze Wörter wie „cat“ sein können; lange Wörter werden in mehrere Tokens zerlegt (Google AI for Developers, Tokens). Die Menge aller Tokens, die ein Modell kennt, heißt Vokabular.

OpenAI ergänzt, dass ein Token auch ein Satzzeichen sein kann und dass Leerzeichen beeinflussen, wie Text aufgeteilt wird (OpenAI Help Center). Jedes Token wird intern durch eine Nummer dargestellt, mit der das Modell rechnet. Häufige Zeichenfolgen bekommen eigene Tokens, seltene werden aus kleineren Teilen zusammengesetzt.

Daraus folgt: Tokens sind keine Silben und keine Wörter im sprachlichen Sinn. Sie sind statistisch gewählte Bausteine, und jeder Anbieter verwendet seinen eigenen Tokenizer.

## Wie viele Zeichen oder Wörter hat ein Token?

Die gängigen Faustregeln gelten für englischen Text:

| Quelle | Zeichen pro Token | Wörter pro 100 Tokens |
| --- | --- | --- |
| OpenAI Help Center | etwa 4 | etwa 75 |
| Google, Gemini-Modelle | etwa 4 | etwa 60 bis 80 (Englisch) |

OpenAI weist ausdrücklich darauf hin, dass es sich um Schätzungen handelt und andere Sprachen ein anderes Verhältnis von Zeichen, Wörtern und Tokens haben können (OpenAI Help Center). Für Kostenplanung und Limits sind deshalb nur gezählte Werte verlässlich. OpenAI, Anthropic und Google bieten dafür eigene Zählfunktionen in ihren APIs an.

Auch zwischen Modellen desselben Anbieters ändern sich die Werte. Anthropic gibt an, dass Claude Opus 4.7 und spätere Modelle einen neueren Tokenizer verwenden, der für denselben Text ungefähr 30 Prozent mehr Tokens ergibt als ältere Modelle, und empfiehlt, Prompts beim Modellwechsel neu zu zählen (Anthropic, Token counting, Stand: Oktober 2026).

## Brauchen deutsche Texte mehr Tokens?

Für deutsche Texte nennen OpenAI und Google keine eigene Faustregel; OpenAI weist nur darauf hin, dass andere Sprachen ein anderes Verhältnis haben können (OpenAI Help Center). Ein Grund liegt im Aufbau der Tokenisierung: Lange Wörter werden in mehrere Tokens zerlegt (Google AI for Developers, Tokens), und das Deutsche bildet mit Komposita wie „Kündigungsfristberechnung“ besonders viele lange Wörter.

Wie stark der Effekt zwischen Sprachen sein kann, haben Petrov et al. untersucht. Derselbe Text, in verschiedene Sprachen übersetzt, ergab teils bis zu 15-mal so viele Tokens, und die Unterschiede blieben auch bei Tokenizern bestehen, die für mehrsprachige Nutzung trainiert wurden (Petrov et al., 2023). Die Autoren nennen drei Folgen: höhere Kosten, längere Verarbeitungszeit und weniger Inhalt, der ins Kontextfenster passt (Petrov et al., 2023).

Einen festen Aufschlag für Deutsch sollte man deshalb nicht pauschal annehmen. Verlässlich ist nur eine Messung mit eigenen Texten und dem eingesetzten Modell.

## Warum bestimmen Tokens Kosten und Limits?

Fast alle API-Preise werden pro Million Tokens angegeben, getrennt nach Eingabe und Ausgabe. Ein Beispiel: OpenAI listet für GPT-6 Astra 10 US-Dollar pro Million Eingabe-Tokens und 50 US-Dollar pro Million Ausgabe-Tokens (OpenAI, Models, Stand: Oktober 2026). Ausgabe-Tokens sind also deutlich teurer, und eine lange Antwort kostet mehr als ein langer Prompt.

Auch die Grenzen eines Modells werden in Tokens gemessen:

| Grenze | Bedeutung |
| --- | --- |
| [Kontextfenster](/glossar/kontextfenster/) | Gesamtmenge an Tokens, die ein Modell in einer Anfrage berücksichtigen kann |
| Ausgabelimit | Höchstzahl an Tokens, die das Modell in einer Antwort erzeugt |
| Rate Limits | Tokens pro Minute, die ein Konto verbrauchen darf |

Bei Modellen mit Denkschritten kommen unsichtbare Tokens hinzu. Anthropic rechnet Thinking-Tokens als Ausgabe-Tokens ab und zählt sie auf das Kontextfenster an (Anthropic, Context windows). OpenAI empfiehlt, für Denkschritte und Antwort ausreichend Platz einzuplanen (OpenAI Help Center).

Nicht nur Text wird in Tokens gemessen. Google gibt für Gemini zum Beispiel an, dass ein kleines Bild bis 384 Pixel Kantenlänge 258 Tokens zählt und Audio 32 Tokens pro Sekunde (Google AI for Developers, Tokens, Stand: Oktober 2026).

## Was ist der Unterschied zwischen Tokens und Embeddings?

Tokens und [Embeddings](/glossar/embeddings/) werden oft verwechselt. Ein Token ist ein Textbaustein mit einer Nummer im Vokabular. Ein Embedding ist ein Vektor aus vielen Zahlen, der die Bedeutung eines Textes abbildet. Embedding-Modelle verarbeiten ihre Eingabe ebenfalls als Tokens und haben deshalb eine Obergrenze, die beim [Chunking](/glossar/chunking/) von Dokumenten eine Rolle spielt.

## Wie lassen sich Tokens sparen?

OpenAI nennt mehrere Wege, wenn eine Eingabe zu groß ist: den Prompt kürzen oder umformulieren, unnötigen oder wiederholten Kontext entfernen, große Eingaben aufteilen und Texte vorab zusammenfassen (OpenAI Help Center).

In Automatisierungen bringt die Vorverarbeitung meist am meisten: HTML in reinen Text umwandeln, zitierte E-Mail-Verläufe abschneiden, nur relevante Dokumentabschnitte per [RAG](/glossar/rag/) übergeben statt ganzer Dateien. Bei einem [lokalen LLM](/glossar/lokales-llm/) fallen keine Gebühren pro Token an, die Grenzen des Kontextfensters und die Rechenzeit gelten aber genauso.

Ein Beispiel aus der Agenten-Praxis: Warum Code Execution mit MCP Tokens spart, zeigt der Artikel [Agentic RAG mit MCP](/blog/agentic-rag-mcp-architektur/).
