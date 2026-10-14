---
{
  "status": "veroeffentlicht",
  "begriff": "Vektordatenbank",
  "h1": "Vektordatenbank: Definition, Funktionsweise und Beispiele",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Vector Database",
    "Vektor-Datenbank"
  ],
  "kurzdefinition": "Eine Vektordatenbank ist eine Datenbank, die Inhalte als Vektoren speichert und zu einer Anfrage sehr schnell die inhaltlich ähnlichsten Einträge findet.",
  "seoTitel": "Vektordatenbank: Definition & Beispiele",
  "seoBeschreibung": "Was ist eine Vektordatenbank? Definition, Funktionsweise mit HNSW, Filter, Vergleich zu relationalen Datenbanken und ein Praxisbeispiel mit pgvector.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Eine Vektordatenbank findet Einträge über inhaltliche Ähnlichkeit, indem sie die Vektoren von Anfrage und gespeicherten Inhalten vergleicht.",
    "Vektorindizes wie HNSW beschleunigen die Suche, liefern aber nur ungefähre statt exakter nächster Nachbarn.",
    "Mit pgvector lässt sich Vektorsuche direkt in PostgreSQL betreiben, ohne eine zusätzliche Datenbank einzuführen.",
    "Berechtigungsfilter gehören in die Datenbankabfrage, damit geschützte Inhalte gar nicht erst im Kontext eines Sprachmodells landen.",
    "Eine Vektordatenbank ist ein Baustein der Suche; hybride Suche und Reranking verbessern die Trefferqualität zusätzlich."
  ],
  "steckbriefFakten": [
    {
      "label": "Standardsuche in pgvector",
      "wert": "Exakte Nächste-Nachbarn-Suche ohne Index (pgvector-Dokumentation)"
    },
    {
      "label": "Indextypen in pgvector",
      "wert": "HNSW und IVFFlat (pgvector-Dokumentation)"
    },
    {
      "label": "Max. indexierbare Dimensionen (Typ vector)",
      "wert": "2.000 (pgvector-Dokumentation)"
    }
  ],
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
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Qdrant Documentation: Indexing",
      "url": "https://qdrant.tech/documentation/concepts/indexing/",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Malkov, Yashunin (2016): Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs",
      "url": "https://arxiv.org/abs/1603.09320",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Google Machine Learning Crash Course: Embedding space and static embeddings",
      "url": "https://developers.google.com/machine-learning/crash-course/embeddings/embedding-space",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "OpenAI API Docs: Vector embeddings",
      "url": "https://developers.openai.com/api/docs/guides/embeddings",
      "abgerufen": "2026-10-14"
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

## Beispiel aus der Praxis

In der [Wissensbasis mit RAG und MCP-Server](/projekte/wissensbasis-rag-mcp/) liegen interne Dokumente nicht in einer eigenen Vektordatenbank, sondern in PostgreSQL mit einer Vektor-Erweiterung. Ein Ingest-Workflow in [n8n](/glossar/n8n/) lädt die Dokumente, zerlegt sie in Abschnitte, erzeugt mit einem mehrsprachigen Modell [Embeddings](/glossar/embeddings/) und speichert Text und Vektor gemeinsam in einer Tabelle.

Ein zweiter, getrennter Workflow beantwortet Anfragen. Er wandelt die Frage mit demselben Embedding-Modell in einen Vektor um und ruft eine eigene Match-Funktion in PostgreSQL auf, die die ähnlichsten Abschnitte zurückgibt. Agenten erreichen diese Suche nur über einen [MCP-Server](/glossar/mcp-model-context-protocol/) mit einem einzigen, rein lesenden Tool.

Die Entscheidung für PostgreSQL statt einer separaten Vektordatenbank folgt einer einfachen Überlegung: Eine Datenbank weniger heißt ein System weniger für Betrieb, Backup und Zugangsdaten. Die Match-Funktion lässt sich zentral anpassen, ohne dass sich an den angebundenen Agenten etwas ändert.

## Wie funktioniert eine Vektordatenbank?

Eine Vektordatenbank speichert zu jedem Eintrag einen Vektor, also eine Liste von Zahlen, dazu meist den Originaltext und Metadaten wie Quelle, Datum oder Abteilung. Die Vektoren stammen aus einem Embedding-Modell und bilden die Bedeutung des Inhalts ab: Inhaltlich ähnliche Einträge liegen im Vektorraum nah beieinander (Google Machine Learning Crash Course, Embedding Space).

Bei einer Suche wird die Anfrage mit demselben Modell in einen Vektor umgewandelt. Die Datenbank berechnet dann, welche gespeicherten Vektoren diesem Anfragevektor am nächsten liegen, und gibt die besten Treffer zurück. Diese Aufgabe heißt Nächste-Nachbarn-Suche.

Die Nähe wird über ein Distanzmaß bestimmt. pgvector unterstützt unter anderem euklidische Distanz, inneres Produkt und Kosinus-Distanz, für Binärvektoren zusätzlich Hamming- und Jaccard-Distanz (pgvector-Dokumentation). Welches Maß passt, hängt vom Embedding-Modell ab; OpenAI empfiehlt für seine Embeddings die Kosinus-Ähnlichkeit (OpenAI, Embeddings Guide).

## Was ist ein Vektorindex wie HNSW?

Ohne Index vergleicht die Datenbank die Anfrage mit jedem gespeicherten Vektor. Das liefert exakte Ergebnisse, wird bei vielen Einträgen aber langsam. pgvector führt standardmäßig genau diese exakte Suche aus und erreicht damit vollständigen Recall (pgvector-Dokumentation).

Ein Vektorindex beschleunigt die Suche, indem er nur noch einen Teil der Vektoren prüft. Das Ergebnis ist dann eine ungefähre Suche (Approximate Nearest Neighbor): sehr schnell, aber ohne Garantie, dass wirklich alle besten Treffer gefunden werden.

Das verbreitetste Verfahren ist HNSW (Hierarchical Navigable Small World). Es baut mehrere Ebenen von Nachbarschaftsgraphen auf und sucht von einer groben oberen Ebene schrittweise nach unten; die Autoren beschreiben dafür eine logarithmische Skalierung der Suchkomplexität (Malkov und Yashunin, 2016). pgvector bietet HNSW und IVFFlat als Indextypen an, Qdrant nutzt HNSW als Index für dichte Vektoren (pgvector-Dokumentation; Qdrant-Dokumentation).

## Wie kombiniert man Vektorsuche mit Filtern?

In der Praxis reicht die reine Ähnlichkeit selten. Ein Mitarbeiter soll nur Dokumente seiner Abteilung finden, eine Suche soll sich auf aktuelle Versionen beschränken. Dafür speichert man Metadaten neben dem Vektor und filtert danach.

Filter und Vektorindex beeinflussen sich gegenseitig. Qdrant weist darauf hin, dass ein Vektorindex allein für gefilterte Suchen nicht genügt und der HNSW-Graph bei sehr strengen Filtern an Qualität verliert; Qdrant ergänzt den Graphen deshalb um zusätzliche Kanten auf Basis indexierter Payload-Felder (Qdrant-Dokumentation, Indexing).

Bei Berechtigungen gilt: Der Filter gehört in die Datenbankabfrage, nicht in den Prompt. Was die Suche gar nicht erst zurückgibt, kann auch nicht im Kontext eines Sprachmodells landen. Wie das in einer RAG-Architektur aussieht, beschreibt der Artikel zum [Aufbau eines Company Brain](/blog/company-brain-aufbauen-rag-architektur/).

## Vektordatenbank vs. relationale Datenbank: Was ist der Unterschied?

Eine relationale Datenbank findet Datensätze über exakte Bedingungen: gleiche Kundennummer, Datum in einem Zeitraum, Text enthält ein Wort. Eine Vektordatenbank findet Datensätze über inhaltliche Ähnlichkeit, auch wenn kein Wort übereinstimmt.

| Merkmal | Relationale Datenbank | Vektordatenbank |
| --- | --- | --- |
| Suchprinzip | Exakte Bedingungen, Vergleiche, Joins | Ähnlichkeit zwischen Vektoren |
| Typische Anfrage | „Alle Rechnungen von Kunde 4711“ | „Abschnitte, die zu dieser Frage passen“ |
| Ergebnis | Treffer erfüllen die Bedingung oder nicht | Rangliste nach Ähnlichkeit |
| Index | B-Baum, Hash, Volltextindex | HNSW, IVF und ähnliche Verfahren |
| Stärke | Konsistenz, Transaktionen, Berichte | Semantische Suche, [RAG](/glossar/rag/), Empfehlungen |

Die Grenze verschwimmt, weil relationale Datenbanken Vektorfunktionen nachrüsten. pgvector beschreibt seinen Ansatz mit dem Satz „Store your vectors with the rest of your data“, also Vektoren direkt neben den übrigen Daten in PostgreSQL (pgvector-Dokumentation).

## pgvector oder eigenständige Vektordatenbank: Was passt wann?

Grob lassen sich drei Varianten unterscheiden. Die Auswahl der Produkte ändert sich schnell; die folgende Einteilung gibt den Stand Oktober 2026 wieder.

| Variante | Beispiele | Passt, wenn … |
| --- | --- | --- |
| Erweiterung einer bestehenden Datenbank | PostgreSQL mit pgvector | bereits PostgreSQL im Einsatz ist und die Datenmenge überschaubar bleibt |
| Eigenständige Vektordatenbank, selbst gehostet oder als Cloud | Qdrant, Milvus, Weaviate | viele Vektoren, komplexe Filter oder eigene Skalierung gebraucht werden |
| Verwalteter Cloud-Dienst | Pinecone und Angebote großer Cloud-Anbieter | kein eigener Betrieb gewünscht ist |

Für die Wahl zählen weniger Benchmarks als praktische Fragen: Wo dürfen die Daten liegen? Wer betreibt das System? Werden Filter nach Berechtigungen gebraucht? Soll neben der Vektorsuche auch eine Stichwortsuche laufen?

## Reicht eine Vektordatenbank für gute Suchergebnisse?

Nicht immer. Vektorsuche erkennt Bedeutung, tut sich aber mit exakten Zeichenfolgen schwer, etwa Artikelnummern, Aktenzeichen oder internen Abkürzungen. Eine [hybride Suche](/glossar/hybride-suche/) kombiniert deshalb Vektorsuche mit klassischer Stichwortsuche.

Weitere Bausteine verbessern die Trefferqualität. [Reranking](/glossar/reranking/) sortiert die gefundenen Abschnitte mit einem zweiten Modell neu. [Contextual Retrieval](/glossar/contextual-retrieval/) ergänzt jeden Abschnitt vor dem Speichern um Kontext aus dem Gesamtdokument, damit isolierte Textstellen besser gefunden werden.

Die Vektordatenbank ist damit eine Komponente der Suche, nicht die ganze Suche. Wie gut ein System antwortet, hängt ebenso von der Zerlegung der Dokumente, dem Embedding-Modell und der Auswertung der Treffer ab. Wenn ein [KI-Agent](/glossar/ki-agent/) selbst entscheidet, wann und wie er sucht, spricht man von [Agentic RAG](/glossar/agentic-rag/); die Architektur dazu erklärt der Artikel zu [Agentic RAG mit MCP](/blog/agentic-rag-mcp-architektur/).
