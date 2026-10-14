---
{
  "status": "entwurf",
  "begriff": "Reranking",
  "h1": "Reranking: Wie ein Reranker Suchtreffer für KI sortiert",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Reranker",
    "Re-Ranking"
  ],
  "kurzdefinition": "Reranking ist ein zweiter Suchschritt, bei dem ein spezielles Modell die Treffer einer ersten Suche neu nach Relevanz sortiert, damit nur die passendsten Textstellen weiterverwendet werden.",
  "seoTitel": "Was ist Reranking? Reranker einfach erklärt",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
  "verwandteBegriffe": [
    "rag",
    "embeddings",
    "bm25",
    "semantische-suche",
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
      "frage": "Was ist Reranking?",
      "antwort": "Reranking ist ein zweiter Suchschritt, bei dem ein spezielles Modell die Treffer einer ersten Suche neu nach Relevanz sortiert. Die erste Suche liefert schnell viele Kandidaten, der Reranker prüft jeden Kandidaten genauer zusammen mit der Frage. In RAG-Systemen gelangen so nur die wirklich passenden Textstellen in den Prompt."
    },
    {
      "frage": "Warum verbessert Reranking RAG-Systeme?",
      "antwort": "Die Vektorsuche vergleicht Frage und Dokument getrennt voneinander und übersieht dadurch feine Unterschiede wie Verneinungen. Ein Reranker, meist ein Cross-Encoder, liest Frage und Textstelle gemeinsam und bewertet die Passung genauer. In einem Benchmark von Anthropic senkte die Kombination aus kontextualisierten Embeddings, kontextualisiertem BM25 und Reranking die Fehlerrate bei der Suche um 67 Prozent (Anthropic, 2024)."
    }
  ]
}
---

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
