---
{
  "status": "entwurf",
  "begriff": "Contextual Retrieval",
  "h1": "Contextual Retrieval: Chunks mit Kontext für bessere RAG-Suche",
  "thema": "rag_suche",
  "alternativeNamen": [
    "kontextualisierte Suche",
    "kontextualisiertes Chunking"
  ],
  "kurzdefinition": "Contextual Retrieval ist ein von Anthropic 2024 beschriebenes Verfahren, bei dem jeder Textabschnitt vor der Indexierung um einen kurzen, vom Sprachmodell erzeugten Kontext ergänzt wird.",
  "seoTitel": "Contextual Retrieval: Definition & Wirkung",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
  "verwandteBegriffe": [
    "chunking",
    "rag",
    "embeddings",
    "bm25",
    "reranking"
  ],
  "verwandteArtikel": [
    "company-brain-aufbauen-rag-architektur"
  ],
  "verwandteProjekte": [],
  "quellen": [
    {
      "titel": "Anthropic (2024): Introducing Contextual Retrieval",
      "url": "https://www.anthropic.com/news/contextual-retrieval",
      "abgerufen": null
    }
  ],
  "faq": [
    {
      "frage": "Was ist Contextual Retrieval?",
      "antwort": "Contextual Retrieval ist ein von Anthropic 2024 beschriebenes Verfahren, bei dem jeder Textabschnitt vor der Indexierung um einen kurzen Kontext ergänzt wird. Ein Sprachmodell erklärt in 50 bis 100 Tokens, aus welchem Dokument und Zusammenhang der Abschnitt stammt. Dadurch findet die Suche auch Abschnitte, die für sich allein zu wenig Kontext enthalten."
    },
    {
      "frage": "Wie stark verbessert Contextual Retrieval die Suche?",
      "antwort": "Im Benchmark von Anthropic sank der Anteil relevanter Abschnitte, die nicht unter den Top 20 landeten, mit kontextualisierten Embeddings um 35 Prozent. Zusammen mit kontextualisiertem BM25 waren es 49 Prozent, mit zusätzlichem Reranking 67 Prozent, von 5,7 auf 1,9 Prozent (Anthropic, 2024). Der Preis sind zusätzliche Modellaufrufe beim Einlesen der Dokumente."
    }
  ]
}
---

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
