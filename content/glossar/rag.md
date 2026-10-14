---
{
  "status": "veroeffentlicht",
  "begriff": "RAG (Retrieval-Augmented Generation)",
  "h1": "RAG (Retrieval-Augmented Generation): Definition und Funktionsweise",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Retrieval-Augmented Generation",
    "RAG-System"
  ],
  "kurzdefinition": "RAG (Retrieval-Augmented Generation) ist ein Verfahren, bei dem ein Sprachmodell vor dem Antworten passende Informationen aus einer externen Wissensquelle abruft und seine Antwort darauf stützt.",
  "seoTitel": "Was ist RAG? Retrieval-Augmented Generation erklärt",
  "seoBeschreibung": "Was ist RAG? Retrieval-Augmented Generation einfach erklärt: Herkunft, Praxisbeispiel, RAG vs. Long Context, typische Fehler und Messung.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "RAG verbindet ein Sprachmodell mit einer externen Wissensquelle, aus der es vor jeder Antwort passende Textstellen abruft.",
    "Der Begriff stammt aus einem Paper von Lewis et al. aus dem Jahr 2020, das im Modell gespeichertes Wissen mit einem durchsuchbaren Vektorindex kombinierte.",
    "Die häufigste Fehlerquelle in RAG-Systemen ist die Suche: Was sie nicht findet, kann das Sprachmodell nicht verwenden.",
    "Bei Wissensbasen unter 200.000 Tokens empfiehlt Anthropic, den gesamten Inhalt direkt in den Prompt zu geben statt RAG zu nutzen.",
    "Suchqualität und Antwortqualität sollten getrennt gemessen werden, etwa mit Recall@k und festen Testfragen."
  ],
  "steckbriefFakten": [
    {
      "label": "Ursprung",
      "wert": "Lewis et al., arXiv, Mai 2020"
    },
    {
      "label": "Ohne RAG sinnvoll",
      "wert": "Wissensbasis unter 200.000 Tokens, etwa 500 Seiten (Anthropic, 2024)"
    }
  ],
  "verwandteBegriffe": [
    "embeddings",
    "vektordatenbank",
    "chunking",
    "reranking",
    "ki-halluzinationen",
    "fine-tuning"
  ],
  "verwandteArtikel": [
    "company-brain-aufbauen-rag-architektur",
    "agentic-rag-mcp-architektur"
  ],
  "verwandteProjekte": [
    "wissensbasis-rag-mcp"
  ],
  "quellen": [
    {
      "titel": "Lewis et al. (2020): Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      "url": "https://arxiv.org/abs/2005.11401",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Anthropic (2024): Introducing Contextual Retrieval",
      "url": "https://www.anthropic.com/news/contextual-retrieval",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Liu et al. (2023): Lost in the Middle: How Language Models Use Long Contexts",
      "url": "https://arxiv.org/abs/2307.03172",
      "abgerufen": "2026-10-14"
    }
  ],
  "faq": [
    {
      "frage": "Was ist RAG?",
      "antwort": "RAG steht für Retrieval-Augmented Generation und bezeichnet ein Verfahren, bei dem ein Sprachmodell vor dem Antworten passende Informationen aus einer externen Wissensquelle abruft. Diese Textstellen werden dem Modell zusammen mit der Frage übergeben, sodass es seine Antwort auf aktuelle oder interne Daten stützen kann. Der Begriff geht auf eine Veröffentlichung von Lewis et al. aus dem Jahr 2020 zurück."
    },
    {
      "frage": "Wie funktioniert ein RAG-System?",
      "antwort": "Ein RAG-System zerlegt Dokumente zunächst in Abschnitte, wandelt sie in Embeddings um und speichert sie in einer Vektordatenbank. Bei einer Frage sucht es die passendsten Abschnitte, sortiert sie bei Bedarf mit einem Reranker neu und gibt sie dem Sprachmodell als Kontext mit. Das Modell formuliert daraus die Antwort, idealerweise mit Quellenangaben."
    },
    {
      "frage": "Was ist der Unterschied zwischen RAG und Fine-Tuning?",
      "antwort": "RAG gibt dem Modell Wissen zur Laufzeit mit, ohne das Modell selbst zu verändern. Fine-Tuning trainiert das Modell mit eigenen Beispielen nach und verändert damit sein Verhalten, etwa Stil oder Format. Für aktuelles oder häufig wechselndes Firmenwissen ist RAG meist die bessere Wahl, weil sich die Wissensbasis jederzeit aktualisieren lässt."
    },
    {
      "frage": "Verhindert RAG Halluzinationen?",
      "antwort": "RAG verringert Halluzinationen, verhindert sie aber nicht vollständig. Findet die Suche die richtigen Textstellen nicht oder sind die Dokumente veraltet, kann das Modell trotzdem falsche Antworten geben. Quellenangaben in der Antwort und eine gute Suche mit hybrider Suche und Reranking machen Fehler leichter erkennbar und seltener."
    },
    {
      "frage": "Wofür steht RAG?",
      "antwort": "RAG steht für Retrieval-Augmented Generation, auf Deutsch etwa durch Abruf erweiterte Generierung. Gemeint ist, dass ein Sprachmodell seine Antwort nicht nur aus dem Trainingswissen erzeugt, sondern vorher passende Informationen aus einer Wissensquelle abruft."
    },
    {
      "frage": "Wie baut man ein RAG-System?",
      "antwort": "Ein RAG-System braucht vier Bausteine: eine Aufbereitung der Dokumente mit Chunking, ein Embedding-Modell, eine Vektordatenbank oder Suchmaschine und ein Sprachmodell für die Antwort. Für den Einstieg reichen eine bestehende Datenbank mit Vektorerweiterung wie pgvector und eine Automatisierungsplattform wie n8n. Entscheidend für die Qualität sind sauber zerlegte Dokumente, eine hybride Suche und Tests mit echten Fragen."
    }
  ]
}
---

## Beispiel aus der Praxis

Im Projekt [Wissensbasis mit RAG und MCP-Server](/projekte/wissensbasis-rag-mcp/) habe ich interne Dokumente für mehrere KI-Assistenten nutzbar gemacht, ohne die Suche für jeden Assistenten neu zu bauen. Die Umsetzung besteht aus zwei getrennten Workflows in [n8n](/glossar/n8n/).

Der Ingest-Pfad lädt Dokumente aus einem Ordner, zerlegt sie mit einem Text-Splitter in Abschnitte, erzeugt mehrsprachige [Embeddings](/glossar/embeddings/) und speichert Text und Vektoren in PostgreSQL mit Vektor-Erweiterung. Ein mehrsprachiges Embedding-Modell war nötig, weil die Dokumente überwiegend deutsch sind, Fragen aber auch auf Englisch gestellt werden.

Der Retrieval-Pfad stellt die Suche über einen MCP-Server als reines Lese-Werkzeug bereit. Eine Frage wird mit demselben Embedding-Modell umgewandelt und über eine eigene Match-Funktion in der Datenbank gegen den Vektorspeicher gesucht. Die gefundenen Textstellen bekommt der aufrufende Agent als Kontext für seine Antwort.

Der Nutzen der Trennung: Änderungen an Chunking, Embeddings oder Suchlogik wirken zentral für alle angebundenen Clients. Ein neuer Agent braucht keine eigene Dokumentpipeline, sondern ruft nur das Werkzeug auf.

## Was steht im ursprünglichen RAG-Paper?

Der Begriff Retrieval-Augmented Generation stammt aus dem Paper „Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks“ von Patrick Lewis und Kollegen, das im Mai 2020 auf arXiv erschien (Lewis et al., 2020). Die Autoren kombinierten zwei Arten von Gedächtnis: das im Modell gespeicherte Wissen und einen externen Wissensspeicher.

Das im Modell gespeicherte Wissen nennen Lewis et al. parametrisches Gedächtnis, weil es in den Gewichten eines vortrainierten Sequenz-zu-Sequenz-Modells steckt. Der externe Speicher ist ein nicht-parametrisches Gedächtnis, im Paper ein dichter Vektorindex der Wikipedia, auf den ein vortrainierter neuronaler Retriever zugreift (Lewis et al., 2020).

Heutige RAG-Systeme folgen demselben Grundgedanken, sind aber technisch anders gebaut. Statt eines gemeinsam trainierten Retrievers nutzen sie meist ein fertiges Embedding-Modell, eine [Vektordatenbank](/glossar/vektordatenbank/) und ein großes Sprachmodell, das die gefundenen Textstellen im Prompt erhält.

## Wann ist RAG sinnvoll und wann nicht?

RAG lohnt sich, wenn ein Sprachmodell auf Wissen zugreifen soll, das nicht in seinen Trainingsdaten steht: interne Richtlinien, Produktdokumentation, Verträge oder Daten, die sich häufig ändern. Die Wissensbasis lässt sich aktualisieren, ohne das Modell neu zu trainieren.

RAG ist auch dann sinnvoll, wenn Antworten belegbar sein müssen. Weil das System die verwendeten Textstellen kennt, kann es Quellen mit ausgeben, die ein Mensch nachprüft.

Nicht immer ist RAG nötig. Anthropic empfiehlt, bei einer Wissensbasis unter 200.000 Tokens, etwa 500 Seiten, den gesamten Inhalt direkt in den Prompt zu geben und auf RAG zu verzichten (Anthropic, 2024). Für kleine, stabile Dokumentmengen ist das einfacher und vermeidet Suchfehler.

## RAG vs. Long Context: Was ist der Unterschied?

Moderne [LLMs](/glossar/llm/) verarbeiten lange Kontexte. Daraus entsteht die Frage, ob man Dokumente durchsucht oder komplett mitgibt. Die Tabelle fasst die Unterschiede zusammen.

| Kriterium | RAG | Gesamter Inhalt im Prompt (Long Context) |
| --- | --- | --- |
| Datenmenge | praktisch unbegrenzt, nur Treffer gehen in den Prompt | begrenzt durch das Kontextfenster des Modells |
| Kosten pro Anfrage | gering, weil nur wenige Abschnitte übergeben werden | steigen mit der Länge des Kontexts |
| Aktualität | Dokumente lassen sich einzeln ersetzen | Kontext wird bei jeder Anfrage neu aufgebaut |
| Fehlerquelle | relevante Stelle wird nicht gefunden | relevante Stelle wird im langen Kontext übersehen |
| Aufwand | Pipeline, Index und Tests nötig | kaum Infrastruktur |

Auch lange Kontexte haben Grenzen. Liu et al. zeigten, dass Sprachmodelle Informationen am Anfang oder Ende eines langen Kontexts meist besser nutzen als Informationen in der Mitte (Liu et al., 2023). Ein gut gefilterter, kurzer Kontext aus RAG kann deshalb besser abschneiden als ein sehr langer Prompt.

## Welche Fehler gibt es bei RAG-Systemen?

Der häufigste Fehler liegt nicht beim Sprachmodell, sondern bei der Suche. Findet die Suche die richtige Textstelle nicht, kann das Modell sie auch nicht verwenden und antwortet mit allgemeinem Wissen oder erfindet Details.

Ein zweiter Fehler ist Kontextverlust beim Zerlegen der Dokumente. Ein Abschnitt wie „Der Umsatz stieg gegenüber dem Vorjahr“ sagt ohne Dokumenttitel nicht, um welche Firma und welches Jahr es geht. [Contextual Retrieval](/glossar/contextual-retrieval/) ergänzt deshalb jeden Abschnitt um einen kurzen Kontext aus dem Gesamtdokument.

Ein dritter Fehler betrifft exakte Begriffe. Reine Vektorsuche trifft Produktnummern, Fehlercodes oder Abkürzungen oft schlecht. Eine [hybride Suche](/glossar/hybride-suche/) kombiniert deshalb Embeddings mit der Stichwortsuche BM25.

Ein vierter Fehler sind zu viele oder schlecht sortierte Treffer im Prompt. Ein [Reranker](/glossar/reranking/) sortiert die Kandidaten der ersten Suche neu, damit nur die passendsten Abschnitte beim Modell ankommen.

Ein fünfter Fehler betrifft Berechtigungen. Wenn jeder Nutzer jeden Abschnitt finden kann, landen vertrauliche Inhalte im Prompt. Rechte müssen deshalb vor der Suche als Filter greifen. Wie das in einer Unternehmensarchitektur aussieht, beschreibt der Artikel [Company Brain aufbauen](/blog/company-brain-aufbauen-rag-architektur/).

## Wie misst man die Qualität eines RAG-Systems?

Die Qualität eines RAG-Systems hat zwei Ebenen: Findet die Suche die richtigen Textstellen, und macht das Modell daraus eine korrekte Antwort? Beide Ebenen sollten getrennt geprüft werden, sonst bleibt unklar, wo ein Fehler entsteht.

Für die Suche eignet sich eine Kennzahl wie Recall@k. Anthropic misst in seinem Benchmark 1 minus Recall@20, also den Anteil relevanter Abschnitte, die nicht unter den ersten 20 Treffern landen (Anthropic, 2024).

Für die Antwort braucht es feste Testfragen mit geprüften Musterantworten. Wer Chunking, Embedding-Modell oder Suchverfahren ändert, lässt dieselben Fragen erneut laufen und vergleicht die Ergebnisse, bevor die Änderung produktiv geht.

## Was ist der Unterschied zwischen RAG und Agentic RAG?

Klassisches RAG folgt einem festen Ablauf: eine Suche, Treffer in den Prompt, Antwort. [Agentic RAG](/glossar/agentic-rag/) überlässt einem [KI-Agenten](/glossar/ki-agent/) die Entscheidung, welche Quellen er in welcher Reihenfolge abfragt und ob er nachsucht.

Im Projekt Wissensbasis ist die Suche als Werkzeug über das [Model Context Protocol](/glossar/mcp-model-context-protocol/) verfügbar. Der Agent entscheidet selbst, wann er es aufruft. Mehr zu dieser Architektur steht im Artikel [Agentic RAG mit MCP](/blog/agentic-rag-mcp-architektur/).
