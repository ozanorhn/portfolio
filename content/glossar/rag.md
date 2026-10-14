---
{
  "status": "entwurf",
  "begriff": "RAG (Retrieval-Augmented Generation)",
  "h1": "RAG (Retrieval-Augmented Generation): Definition und Funktionsweise",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Retrieval-Augmented Generation",
    "RAG-System"
  ],
  "kurzdefinition": "RAG (Retrieval-Augmented Generation) ist ein Verfahren, bei dem ein Sprachmodell vor dem Antworten passende Informationen aus einer externen Wissensquelle abruft und seine Antwort darauf stützt.",
  "seoTitel": "Was ist RAG? Retrieval-Augmented Generation erklärt",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
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
      "abgerufen": null
    },
    {
      "titel": "Anthropic (2024): Introducing Contextual Retrieval",
      "url": "https://www.anthropic.com/news/contextual-retrieval",
      "abgerufen": null
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

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
