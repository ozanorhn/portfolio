---
{
  "status": "entwurf",
  "begriff": "Hybride Suche",
  "h1": "Hybride Suche: Vektorsuche und BM25 kombiniert",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Hybrid Search",
    "hybride Retrieval"
  ],
  "kurzdefinition": "Hybride Suche ist ein Suchverfahren, das die Bedeutungssuche über Embeddings mit der klassischen Stichwortsuche, meist BM25, zu einer gemeinsamen Trefferliste kombiniert.",
  "seoTitel": "Hybride Suche: Vektorsuche & BM25 kombiniert",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
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
      "abgerufen": null
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

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
