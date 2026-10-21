---
{
  "status": "veroeffentlicht",
  "begriff": "Semantische Suche",
  "h1": "Semantische Suche: Bedeutung statt Stichwort",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Semantic Search",
    "bedeutungsbasierte Suche",
    "Vektorsuche"
  ],
  "kurzdefinition": "Semantische Suche ist ein Suchverfahren, das Treffer nach der Bedeutung und Absicht einer Anfrage findet statt nach wörtlich übereinstimmenden Stichwörtern, meist mithilfe von Embeddings.",
  "seoTitel": "Semantische Suche: Definition und Funktionsweise",
  "seoBeschreibung": "Was ist semantische Suche? Suche nach Bedeutung statt Stichwort: Funktionsweise mit Embeddings, Vergleich zur Stichwortsuche, Bezug zu Google und RAG.",
  "erstveroeffentlicht": "2026-10-19T09:00:00Z",
  "aktualisiert": "2026-10-19T09:00:00Z",
  "steckbriefAussagen": [
    "Semantische Suche findet Inhalte nach ihrer Bedeutung, auch wenn Anfrage und Text unterschiedliche Wörter verwenden.",
    "Technisch werden Anfrage und Dokumente meist als Embeddings dargestellt und über ihre Vektordistanz verglichen.",
    "Bei exakten Zeichenfolgen wie Artikelnummern oder Aktenzeichen ist die klassische Stichwortsuche oft überlegen; hybride Suche kombiniert beide.",
    "In RAG-Systemen ist semantische Suche der Schritt, der die Textabschnitte für die Antwort eines Sprachmodells auswählt.",
    "Google setzt seit 2019 BERT-Modelle ein, um die Bedeutung von Suchanfragen besser zu verstehen."
  ],
  "steckbriefFakten": [
    {
      "label": "BERT in der Google-Suche",
      "wert": "seit Oktober 2019, anfangs etwa jede zehnte englischsprachige Suche in den USA (Google, 2019)"
    },
    {
      "label": "Ähnlichste Satzpaare unter 10.000 Sätzen",
      "wert": "etwa 65 Stunden mit BERT, etwa 5 Sekunden mit Sentence-BERT (Reimers und Gurevych, 2019)"
    }
  ],
  "verwandteBegriffe": [
    "embeddings",
    "vektordatenbank",
    "hybride-suche",
    "rag",
    "chunking",
    "reranking",
    "suchintention",
    "query-fan-out"
  ],
  "verwandteArtikel": [
    "agentic-rag-mcp-architektur"
  ],
  "verwandteProjekte": [
    "wissensbasis-rag-mcp"
  ],
  "quellen": [
    {
      "titel": "Google Cloud: What is semantic search, and how does it work?",
      "url": "https://cloud.google.com/discover/what-is-semantic-search",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Google (2019): Understanding searches better than ever before",
      "url": "https://blog.google/products/search/search-language-understanding-bert/",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Reimers und Gurevych (2019): Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
      "url": "https://arxiv.org/abs/1908.10084",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Google Search Central: AI features and your website",
      "url": "https://developers.google.com/search/docs/appearance/ai-features",
      "abgerufen": "2026-10-19"
    }
  ],
  "faq": [
    {
      "frage": "Was ist semantische Suche?",
      "antwort": "Semantische Suche ist ein Suchverfahren, das nach der Bedeutung einer Anfrage sucht statt nach exakt gleichen Wörtern. Eine Frage wie „Wie lange vorher muss ich kündigen?“ findet so auch einen Text über die Kündigungsfrist, obwohl das Wort „Frist“ in der Frage nicht vorkommt. Technisch beruht das meist auf Embeddings, also Zahlenvektoren, die Bedeutung abbilden."
    },
    {
      "frage": "Was ist der Unterschied zwischen semantischer Suche und Stichwortsuche?",
      "antwort": "Die Stichwortsuche vergleicht Wörter und findet Dokumente, in denen die Begriffe der Anfrage vorkommen. Die semantische Suche vergleicht Bedeutungen und findet auch Umschreibungen und Synonyme. Dafür ist die Stichwortsuche bei exakten Angaben wie Produktnummern oder Eigennamen oft genauer, weshalb viele Systeme beide Verfahren als hybride Suche kombinieren."
    },
    {
      "frage": "Nutzt Google semantische Suche?",
      "antwort": "Ja. Google setzt seit Oktober 2019 BERT-Modelle ein, um Suchanfragen im Zusammenhang aller Wörter zu verstehen, und nannte das damals einen der größten Fortschritte in der Geschichte der Suche. Die KI-Funktionen wie AI Overviews und der KI-Modus führen laut Google zusätzlich mehrere verwandte Suchen zu Unterthemen aus, um eine Antwort zusammenzustellen."
    },
    {
      "frage": "Wie hängen semantische Suche und RAG zusammen?",
      "antwort": "In einem RAG-System ist die semantische Suche der Abrufschritt. Sie wählt aus einer Wissensbasis die Textabschnitte aus, die inhaltlich zur Frage passen, und gibt sie einem Sprachmodell als Kontext. Findet die Suche die richtige Stelle nicht, kann auch das beste Sprachmodell keine korrekte Antwort daraus ableiten."
    }
  ]
}
---

## Beispiel aus der Praxis

Die [Wissensbasis mit RAG und MCP-Server](/projekte/wissensbasis-rag-mcp/) stellt genau eine Fähigkeit bereit: semantische Suche in internen Dokumenten. Agenten rufen sie über einen MCP-Server als reines Lese-Werkzeug auf und bekommen passende Textstellen zurück.

Die Dokumente sind überwiegend deutsch, Fragen kommen aber auch auf Englisch. Eine Stichwortsuche würde eine englische Frage kaum mit einem deutschen Abschnitt verbinden, weil kein einziges Wort übereinstimmt. Die semantische Suche vergleicht dagegen Bedeutungen. Dafür erzeugt der Ingest-Workflow mehrsprachige [Embeddings](/glossar/embeddings/), und der Retrieval-Workflow wandelt jede Anfrage mit demselben Modell in einen Vektor um.

Die eigentliche Ähnlichkeitssuche liegt als eigene Match-Funktion in PostgreSQL mit Vektor-Erweiterung. So lässt sich die Suchlogik zentral anpassen, ohne dass einer der angebundenen Agenten geändert werden muss.

## Wie funktioniert semantische Suche?

Google Cloud beschreibt semantische Suche als Verfahren, das die Bedeutung und Absicht hinter einer Anfrage erfassen will, statt nur Stichwörter abzugleichen (Google Cloud, What is semantic search). In heutigen Anwendungen läuft das meist in vier Schritten ab.

Erstens werden die Dokumente in Abschnitte zerlegt, weil ein ganzes Handbuch als ein einziger Vektor zu unscharf wäre; dieser Schritt heißt [Chunking](/glossar/chunking/). Zweitens wandelt ein Embedding-Modell jeden Abschnitt in einen Vektor um. Drittens werden die Vektoren in einer [Vektordatenbank](/glossar/vektordatenbank/) gespeichert. Viertens wird jede Anfrage mit demselben Modell eingebettet, und die Datenbank liefert die Abschnitte, deren Vektoren am nächsten liegen.

Dass dieser Ansatz praktikabel wurde, hängt mit Satz-Embeddings zusammen. Reimers und Gurevych zeigten 2019, dass die Suche nach den ähnlichsten Satzpaaren unter 10.000 Sätzen mit einem klassischen BERT-Vergleich rund 65 Stunden dauert, mit vorab berechneten Sentence-BERT-Embeddings etwa 5 Sekunden (Reimers und Gurevych, 2019). Der Grund: Jeder Text wird nur einmal eingebettet, verglichen werden danach nur noch Vektoren.

## Semantische Suche vs. Stichwortsuche: Was ist der Unterschied?

| Kriterium | Stichwortsuche (lexikalisch) | Semantische Suche |
| --- | --- | --- |
| Vergleicht | Wörter und Wortformen | Bedeutungen als Vektoren |
| Synonyme und Umschreibungen | nur mit gepflegten Synonymlisten | werden meist erkannt |
| Sprachübergreifend | nein | mit mehrsprachigem Embedding-Modell möglich |
| Exakte Codes, Nummern, Eigennamen | stark | oft schwach |
| Nachvollziehbarkeit | hoch, Treffer enthält das Suchwort | geringer, Ähnlichkeit ist ein Zahlenwert |
| Aufwand | Volltextindex | Embedding-Modell und Vektorindex |

Google Cloud grenzt außerdem Vektorsuche und semantische Suche voneinander ab: Vektorsuche ist ein Verfahren, das Texte als Vektoren darstellt und Distanzen berechnet; semantische Suche ist der weitere Begriff für alle Techniken, die Bedeutung erfassen wollen (Google Cloud, What is semantic search). In der Praxis werden beide Begriffe trotzdem oft gleichbedeutend verwendet.

Weil beide Verfahren unterschiedliche Stärken haben, kombinieren viele Systeme sie als [hybride Suche](/glossar/hybride-suche/). Ein [Reranking](/glossar/reranking/) sortiert die Kandidaten anschließend genauer.

## Wie nutzt Google semantische Suche?

Google hat im Oktober 2019 angekündigt, BERT-Modelle für das Ranking und für Featured Snippets einzusetzen. BERT betrachtet jedes Wort im Zusammenhang mit den Wörtern davor und danach. Zum Start sollte das laut Google etwa jede zehnte englischsprachige Suche in den USA besser verstehen helfen (Google, 2019).

Googles eigenes Beispiel zeigt den Unterschied zur reinen Stichwortsuche: Bei der Anfrage „2019 brazil traveler to usa need a visa“ ist das kleine Wort „to“ entscheidend, weil es um Reisende aus Brasilien in die USA geht und nicht umgekehrt (Google, 2019). Eine Suche, die nur Stichwörter zählt, übersieht solche Beziehungen.

Die KI-Funktionen der Google-Suche gehen einen Schritt weiter. Laut Google können AI Overviews und der [KI-Modus](/glossar/google-ki-modus/) eine Technik namens [Query Fan-out](/glossar/query-fan-out/) nutzen, also mehrere verwandte Suchen über Unterthemen und Datenquellen hinweg ausführen, um eine Antwort zu entwickeln (Google Search Central, AI features). Für die [Suchintention](/glossar/suchintention/) einer Anfrage zählt damit mehr als die genaue Wortwahl.

Für Website-Betreiber nennt Google keine Sonderregeln. Für die KI-Funktionen gelten dieselben SEO-Grundlagen, zusätzliche technische Anforderungen gibt es nicht (Google Search Central, AI features). Mehr zur Sichtbarkeit in solchen Antworten steht unter [Generative Engine Optimization](/glossar/geo-generative-engine-optimization/).

## Welche Rolle spielt semantische Suche in RAG-Systemen?

In einem [RAG-System](/glossar/rag/) ist die semantische Suche der Abrufschritt. Sie entscheidet, welche Abschnitte ein Sprachmodell als Kontext erhält. Die Qualität der Antwort kann deshalb nie besser sein als die Qualität der Treffer.

Typische Stellschrauben liegen vor und nach der Suche: wie Dokumente zerlegt werden ([Chunking](/glossar/chunking/)), ob jeder Abschnitt vor dem Einbetten um Dokumentkontext ergänzt wird ([Contextual Retrieval](/glossar/contextual-retrieval/)), welches Embedding-Modell zum Einsatz kommt und wie viele Treffer an das Modell gehen. Bei [Agentic RAG](/glossar/agentic-rag/) entscheidet zusätzlich ein Agent, wann und wie oft er die Suche aufruft; die Architektur dahinter beschreibt der Artikel [Agentic RAG mit MCP](/blog/agentic-rag-mcp-architektur/).

## Wo stößt semantische Suche an Grenzen?

Die erste Grenze sind exakte Zeichenfolgen. Eine Frage nach einer bestimmten Rechnungsnummer hat für ein Embedding-Modell wenig Bedeutung, die passende Stichwortsuche findet sie dagegen sofort.

Die zweite Grenze ist die Nachvollziehbarkeit. Ein Treffer der Stichwortsuche enthält das Suchwort, ein semantischer Treffer nur einen hohen Ähnlichkeitswert. Ob er wirklich passt, zeigt sich erst beim Lesen. Feste Testfragen mit bekannten richtigen Abschnitten machen die Qualität messbar.

Die dritte Grenze ist der Wechsel des Modells. Vektoren verschiedener Embedding-Modelle sind nicht vergleichbar. Wer das Modell austauscht, muss den gesamten Bestand neu einbetten, wie im Eintrag zu [Embeddings](/glossar/embeddings/) beschrieben.
