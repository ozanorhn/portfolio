---
{
  "status": "entwurf",
  "begriff": "Vektordatenbank",
  "h1": "Vektordatenbank: Definition, Funktionsweise und Beispiele",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Vector Database",
    "Vektor-Datenbank"
  ],
  "kurzdefinition": "Eine Vektordatenbank ist eine Datenbank, die Inhalte als Vektoren speichert und zu einer Anfrage sehr schnell die inhaltlich ähnlichsten Einträge findet.",
  "seoTitel": "Vektordatenbank: Definition & Beispiele",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
  "verwandteBegriffe": [
    "embeddings",
    "rag",
    "cosine-similarity",
    "semantische-suche",
    "bm25"
  ],
  "verwandteArtikel": [
    "company-brain-aufbauen-rag-architektur"
  ],
  "verwandteProjekte": [
    "wissensbasis-rag-mcp"
  ],
  "quellen": [
    {
      "titel": "pgvector: Open-source vector similarity search for Postgres",
      "url": "https://github.com/pgvector/pgvector",
      "abgerufen": null
    },
    {
      "titel": "Qdrant Dokumentation",
      "url": "https://qdrant.tech/documentation/",
      "abgerufen": null
    }
  ],
  "faq": [
    {
      "frage": "Was ist eine Vektordatenbank?",
      "antwort": "Eine Vektordatenbank speichert Daten als Vektoren, also als lange Zahlenreihen, die die Bedeutung von Texten, Bildern oder anderen Inhalten abbilden. Sie ist darauf ausgelegt, zu einer Anfrage sehr schnell die ähnlichsten Vektoren zu finden. Dadurch eignet sie sich für semantische Suche und RAG-Systeme."
    },
    {
      "frage": "Wie funktioniert eine Vektordatenbank?",
      "antwort": "Inhalte werden zuerst mit einem Embedding-Modell in Vektoren umgewandelt und zusammen mit Metadaten gespeichert. Bei einer Suche wird auch die Anfrage in einen Vektor umgewandelt, und die Datenbank sucht über spezielle Indexverfahren wie HNSW die nächstgelegenen Vektoren. Filter auf Metadaten, etwa nach Abteilung oder Berechtigung, lassen sich dabei kombinieren."
    },
    {
      "frage": "Welche Vektordatenbanken gibt es?",
      "antwort": "Verbreitete Vektordatenbanken sind unter anderem Qdrant, Milvus, Weaviate und Pinecone. Wer bereits PostgreSQL nutzt, kann mit der Erweiterung pgvector Vektoren direkt in der bestehenden Datenbank speichern. Die Wahl hängt von Datenmenge, Betrieb (selbst gehostet oder Cloud) und benötigten Funktionen wie hybrider Suche ab."
    },
    {
      "frage": "Braucht man für RAG immer eine Vektordatenbank?",
      "antwort": "Nein. Für kleine Datenmengen reicht oft eine bestehende Datenbank mit Vektorerweiterung wie pgvector oder sogar eine reine Stichwortsuche. Eine eigene Vektordatenbank lohnt sich vor allem bei vielen Dokumenten, hohen Anforderungen an die Geschwindigkeit oder Funktionen wie hybrider Suche und Filtern nach Berechtigungen."
    }
  ]
}
---

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
