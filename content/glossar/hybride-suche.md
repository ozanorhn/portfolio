---
{
  "status": "veroeffentlicht",
  "begriff": "Hybride Suche",
  "h1": "Hybride Suche: Vektorsuche und BM25 kombiniert",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Hybrid Search",
    "hybride Retrieval"
  ],
  "kurzdefinition": "Hybride Suche ist ein Suchverfahren, das die Bedeutungssuche über Embeddings mit der klassischen Stichwortsuche, meist BM25, zu einer gemeinsamen Trefferliste kombiniert.",
  "seoTitel": "Hybride Suche: Vektorsuche & BM25 kombiniert",
  "seoBeschreibung": "Was ist hybride Suche? Vektorsuche und BM25 kombiniert: Funktionsweise, Reciprocal Rank Fusion, Vergleichstabelle, Datenbanken und typische Fehler.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Hybride Suche führt eine Vektorsuche und eine Stichwortsuche parallel aus und verbindet beide Trefferlisten zu einer Rangfolge.",
    "Die Vektorsuche findet Umschreibungen und Synonyme, BM25 findet exakte Kennungen wie Produktnummern und Fehlercodes.",
    "Reciprocal Rank Fusion verbindet Trefferlisten über Rangplätze statt über Rohwerte und braucht deshalb keine Normalisierung.",
    "Rohwerte von Vektorsuche und BM25 direkt zu gewichten ist ohne Normalisierung unzuverlässig, weil sie auf verschiedenen Skalen liegen."
  ],
  "steckbriefFakten": [
    {
      "label": "Fusionsverfahren",
      "wert": "Reciprocal Rank Fusion, Cormack et al., SIGIR 2009"
    },
    {
      "label": "RRF-Konstante k",
      "wert": "60 im Original und als Elasticsearch-Standard (Cormack et al., 2009; Elastic)"
    },
    {
      "label": "Wirkung mit Kontext",
      "wert": "49 % weniger verfehlte Abschnitte mit kontextualisierten Embeddings und BM25 (Anthropic, 2024)"
    }
  ],
  "verwandteBegriffe": [
    "bm25",
    "semantische-suche",
    "reranking",
    "rag",
    "vektordatenbank"
  ],
  "verwandteArtikel": [
    "company-brain-aufbauen-rag-architektur"
  ],
  "verwandteProjekte": [],
  "quellen": [
    {
      "titel": "Anthropic (2024): Introducing Contextual Retrieval",
      "url": "https://www.anthropic.com/news/contextual-retrieval",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Robertson und Zaragoza (2009): The Probabilistic Relevance Framework: BM25 and Beyond",
      "url": "https://staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Cormack, Clarke und Büttcher (2009): Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods",
      "url": "https://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Elastic: Reciprocal rank fusion (Elasticsearch-Dokumentation)",
      "url": "https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Qdrant: Hybrid and Multi-Stage Queries (Dokumentation)",
      "url": "https://qdrant.tech/documentation/concepts/hybrid-queries/",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "pgvector: Open-source vector similarity search for Postgres (README, Hybrid Search)",
      "url": "https://github.com/pgvector/pgvector",
      "abgerufen": "2026-10-14"
    }
  ],
  "faq": [
    {
      "frage": "Was ist hybride Suche?",
      "antwort": "Hybride Suche kombiniert die Bedeutungssuche über Embeddings mit der klassischen Stichwortsuche, meist BM25. Die Ergebnisse beider Verfahren werden zu einer gemeinsamen Trefferliste zusammengeführt, häufig über Reciprocal Rank Fusion. So findet die Suche sowohl inhaltlich passende Texte als auch exakte Begriffe wie Produktnummern."
    },
    {
      "frage": "Wann lohnt sich hybride Suche?",
      "antwort": "Hybride Suche lohnt sich vor allem bei Unternehmensdaten mit vielen Fachbegriffen, Abkürzungen, Codes und Eigennamen, die eine reine Vektorsuche schlecht trifft. Im Benchmark von Anthropic senkte die Kombination aus kontextualisierten Embeddings und kontextualisiertem BM25 die Fehlerrate bei der Suche um 49 Prozent (Anthropic, 2024). Viele Vektordatenbanken bieten hybride Suche inzwischen direkt an."
    }
  ]
}
---

## Beispiel aus der Praxis

Im Projekt [Wissensbasis mit RAG und MCP-Server](/projekte/wissensbasis-rag-mcp/) läuft die Suche als semantische Suche: Fragen und Dokumente werden mit einem mehrsprachigen Embedding-Modell in Vektoren umgewandelt und über eine Match-Funktion in PostgreSQL verglichen. Das passt gut zu Fragen in natürlicher Sprache, auch wenn Frage und Dokument in unterschiedlichen Sprachen formuliert sind.

Das folgende Szenario zeigt, wo eine reine Vektorsuche an Grenzen kommt. Ein Techniker fragt nach einem Fehlercode wie „E-4711“. Für ein Embedding-Modell sieht dieser Code ähnlich aus wie „E-4712“ oder „E-1147“. Die Bedeutungssuche liefert dann womöglich Abschnitte über verwandte Fehler, aber nicht den einen, der genau diesen Code beschreibt.

Eine Stichwortsuche findet den exakten Code sofort, versteht dafür aber keine Umschreibungen. Hybride Suche nutzt beide Wege und führt die Treffer zusammen. Weil die Suche im Projekt zentral hinter einem MCP-Werkzeug liegt, ließe sich eine solche Erweiterung an einer Stelle einbauen, ohne die angebundenen Agenten zu ändern.

## Wie funktioniert hybride Suche?

Hybride Suche führt zu einer Anfrage zwei Suchen parallel aus. Die erste ist eine Vektorsuche über [Embeddings](/glossar/embeddings/), die nach inhaltlicher Ähnlichkeit sucht. Die zweite ist eine Stichwortsuche, meist mit BM25, die nach übereinstimmenden Wörtern sucht.

Beide Suchen liefern je eine sortierte Trefferliste. Ein Fusionsverfahren führt die Listen zu einer gemeinsamen Rangfolge zusammen und entfernt doppelte Treffer. Anthropic beschreibt genau diesen Schritt in seinem Contextual-Retrieval-Ablauf: Ergebnisse aus Embedding-Suche und BM25 werden mit Rank-Fusion-Verfahren kombiniert und dedupliziert (Anthropic, 2024).

In der Datenbank Qdrant heißt der Stichwortteil Sparse-Vektor. Laut Qdrant-Dokumentation liefern dichte Vektoren das semantische Verständnis und Sparse-Vektoren die genaue Wortübereinstimmung (Qdrant, Stand Oktober 2026).

## Vektorsuche vs. BM25 vs. hybride Suche: Was ist der Unterschied?

| Kriterium | Vektorsuche | BM25 | Hybride Suche |
| --- | --- | --- | --- |
| Grundlage | Bedeutung als Vektor | Übereinstimmung von Wörtern | beides |
| Stärke | Synonyme, Umschreibungen, andere Sprachen | Produktnummern, Codes, Namen, Fachbegriffe | deckt beide Fragetypen ab |
| Schwäche | exakte Zeichenfolgen | Synonyme und Umschreibungen | zwei Indizes, mehr Aufwand |
| Index | Vektorindex | invertierter Index | beide |
| Typischer Einsatz | Fragen in natürlicher Sprache | Suche nach Kennungen | Unternehmenswissen mit beidem |

BM25 geht auf das probabilistische Relevanzmodell zurück, das Stephen Robertson und Hugo Zaragoza in einer Übersichtsarbeit zusammengefasst haben (Robertson und Zaragoza, 2009). Die Formel berücksichtigt, wie oft ein Suchwort im Dokument vorkommt, wie selten es in der Sammlung ist und wie lang das Dokument ist.

BM25 hat zwei Stellschrauben: k1 steuert, wie stark wiederholte Vorkommen eines Wortes zählen, und b steuert, wie stark lange Dokumente abgewertet werden. Robertson und Zaragoza nennen Werte zwischen 0,5 und 0,8 für b sowie zwischen 1,2 und 2 für k1 als in vielen Fällen brauchbar (Robertson und Zaragoza, 2009). Die meisten Suchsysteme bringen solche Voreinstellungen bereits mit.

## Was ist Reciprocal Rank Fusion?

Reciprocal Rank Fusion, kurz RRF, ist das verbreitetste Verfahren, um Trefferlisten zu verbinden. Jedes Dokument bekommt pro Liste den Wert 1 geteilt durch die Summe aus einer Konstante k und seinem Rang. Die Werte aller Listen werden addiert, danach wird neu sortiert.

Das Verfahren stammt von Cormack, Clarke und Büttcher, die es 2009 auf der Konferenz SIGIR vorstellten (Cormack et al., 2009). Sie legten k auf 60 fest und zeigten, dass RRF in ihren Versuchen bessere Ergebnisse lieferte als jedes einzelne kombinierte System und als das Standardverfahren Condorcet Fuse (Cormack et al., 2009).

Der Vorteil: RRF nutzt nur Rangplätze, nicht die Rohwerte der Suchen. Die Werte von BM25 und Vektorsuche liegen auf ganz unterschiedlichen Skalen und lassen sich nicht direkt addieren. Elasticsearch verwendet für k standardmäßig 60 und schreibt, dass RRF kein Tuning erfordert (Elastic, Stand Oktober 2026).

## Welche Datenbanken unterstützen hybride Suche?

Viele Such- und Vektordatenbanken bieten hybride Suche direkt an. Elasticsearch kombiniert Trefferlisten über RRF (Elastic, Stand Oktober 2026). Qdrant bietet die Fusionsverfahren RRF und Distribution-Based Score Fusion an, bei dem die Rohwerte vor dem Zusammenführen normalisiert werden (Qdrant, Stand Oktober 2026).

Wer bereits PostgreSQL nutzt, kann die Erweiterung pgvector mit der eingebauten Volltextsuche kombinieren. Die pgvector-Dokumentation nennt dafür Reciprocal Rank Fusion oder einen Cross-Encoder, um die Ergebnisse zusammenzuführen (pgvector, Stand Oktober 2026). So bleibt alles in einer Datenbank, statt eine zusätzliche [Vektordatenbank](/glossar/vektordatenbank/) zu betreiben. Welche Lösung passt, hängt von Datenmenge, Betrieb und vorhandener Infrastruktur ab.

## Welche Fehler passieren bei hybrider Suche?

Ein häufiger Fehler ist das direkte Mischen von Rohwerten, etwa ein fester Anteil Vektorwert plus ein fester Anteil BM25-Wert. Qdrant rät von dieser Gewichtung ohne Normalisierung ab, weil die Werte nicht vergleichbar sind, und empfiehlt RRF als sichere Voreinstellung (Qdrant, Stand Oktober 2026).

Ein zweiter Fehler ist eine zu kleine Kandidatenmenge. Liefert jede Teilsuche nur wenige Treffer, fallen relevante Dokumente schon vor der Fusion heraus. Qdrant weist darauf hin, dass die Limits der Vorabfragen mindestens so groß sein müssen wie das Limit der Hauptabfrage, sonst bleiben Ergebnisse leer (Qdrant, Stand Oktober 2026).

Ein dritter Fehler ist fehlende Messung. Ob hybride Suche hilft, zeigt nur ein Vergleich mit festen Testfragen, die sowohl Umschreibungen als auch exakte Kennungen enthalten.

Hybride Suche ist oft der erste Schritt. Danach sortiert [Reranking](/glossar/reranking/) die fusionierten Treffer genauer, und [Contextual Retrieval](/glossar/contextual-retrieval/) verbessert die Abschnitte selbst. Wie diese Bausteine in einem [RAG-System](/glossar/rag/) zusammenspielen, beschreibt der Artikel [Company Brain aufbauen](/blog/company-brain-aufbauen-rag-architektur/).
