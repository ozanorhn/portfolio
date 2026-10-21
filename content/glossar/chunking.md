---
{
  "status": "veroeffentlicht",
  "begriff": "Chunking",
  "h1": "Chunking: Texte für RAG sinnvoll in Abschnitte zerlegen",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Text-Splitting",
    "Dokument-Chunking",
    "Textsegmentierung"
  ],
  "kurzdefinition": "Chunking ist das Zerlegen von Dokumenten in kleinere Textabschnitte, sogenannte Chunks, die einzeln eingebettet, durchsucht und einem Sprachmodell als Kontext übergeben werden können.",
  "seoTitel": "Chunking bei RAG: Strategien, Größe, Überlappung",
  "seoBeschreibung": "Was ist Chunking? Dokumente für RAG in Abschnitte zerlegen: feste Größe, rekursiv, semantisch, Überlappung. Mit Vergleichstabelle und Praxisbeispiel.",
  "erstveroeffentlicht": "2026-10-19T09:00:00Z",
  "aktualisiert": "2026-10-19T09:00:00Z",
  "steckbriefAussagen": [
    "Chunking zerlegt Dokumente in Abschnitte, damit eine Suche einzelne passende Stellen statt ganzer Dateien findet.",
    "Gängige Strategien sind feste Größe, rekursives Splitting entlang von Absätzen und Sätzen, Splitting nach Dokumentstruktur und semantisches Chunking.",
    "Eine Überlappung zwischen benachbarten Chunks verhindert, dass ein Gedanke an der Schnittkante verloren geht.",
    "Ein Chunk ist gut, wenn er für einen Menschen ohne den umgebenden Text verständlich ist.",
    "Die beste Chunk-Größe lässt sich nicht pauschal festlegen, sondern nur mit eigenen Dokumenten und Testfragen ermitteln."
  ],
  "steckbriefFakten": [
    {
      "label": "Standard bei OpenAI File Search",
      "wert": "800 Tokens pro Chunk, 400 Tokens Überlappung (OpenAI API Reference, Stand: Oktober 2026)"
    },
    {
      "label": "Standard-Trennzeichen des RecursiveCharacterTextSplitter",
      "wert": "Absatz, Zeilenumbruch, Leerzeichen, Zeichen (Pinecone, Chunking Strategies)"
    }
  ],
  "verwandteBegriffe": [
    "rag",
    "embeddings",
    "contextual-retrieval",
    "semantische-suche",
    "token",
    "vektordatenbank",
    "geo-generative-engine-optimization",
    "ki-suche"
  ],
  "verwandteArtikel": [
    "company-brain-aufbauen-rag-architektur"
  ],
  "verwandteProjekte": [
    "wissensbasis-rag-mcp"
  ],
  "quellen": [
    {
      "titel": "Pinecone: Chunking Strategies for LLM Applications",
      "url": "https://www.pinecone.io/learn/chunking-strategies/",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "LangChain Docs: Text splitter integrations",
      "url": "https://docs.langchain.com/oss/python/integrations/splitters",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "OpenAI API Reference: Vector Stores (Chunking Strategy)",
      "url": "https://developers.openai.com/api/reference/resources/vector_stores",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Anthropic (2024): Introducing Contextual Retrieval",
      "url": "https://www.anthropic.com/news/contextual-retrieval",
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
      "frage": "Was ist Chunking bei RAG?",
      "antwort": "Chunking bezeichnet das Zerlegen von Dokumenten in kleinere Textabschnitte, bevor sie in ein RAG-System eingelesen werden. Jeder Abschnitt bekommt ein eigenes Embedding und kann einzeln gefunden werden. So erhält das Sprachmodell zu einer Frage nur die passenden Stellen statt ganzer Dokumente."
    },
    {
      "frage": "Welche Chunk-Größe ist die richtige?",
      "antwort": "Eine allgemein richtige Chunk-Größe gibt es nicht. Kleine Chunks treffen eine Frage genauer, verlieren aber Zusammenhang; große Chunks behalten Kontext, enthalten aber mehr Unpassendes. Pinecone empfiehlt, mehrere Größen mit eigenen Dokumenten und Testfragen zu vergleichen, etwa von 128 bis 1.024 Tokens."
    },
    {
      "frage": "Was ist Chunk Overlap?",
      "antwort": "Chunk Overlap ist die Überlappung zwischen zwei benachbarten Abschnitten: Das Ende eines Chunks wird am Anfang des nächsten wiederholt. Dadurch geht ein Satz oder Gedanke, der genau an der Schnittkante liegt, nicht verloren. OpenAI nutzt für seine Dateisuche standardmäßig 800 Tokens pro Chunk mit 400 Tokens Überlappung (Stand: Oktober 2026)."
    },
    {
      "frage": "Was ist semantisches Chunking?",
      "antwort": "Semantisches Chunking setzt die Grenzen zwischen Abschnitten dort, wo sich das Thema ändert, statt nach einer festen Länge. Dafür wird der Text in Sätze zerlegt, Satzgruppen werden eingebettet, und ein deutlicher Sprung in der Ähnlichkeit benachbarter Gruppen markiert eine neue Grenze. Das Verfahren ist aufwendiger als feste Größen und lohnt sich vor allem bei Texten ohne klare Gliederung."
    }
  ]
}
---

## Beispiel aus der Praxis

In der [Wissensbasis mit RAG und MCP-Server](/projekte/wissensbasis-rag-mcp/) ist Chunking der zweite Schritt des Ingest-Workflows. Ein Dokument-Loader liest die Dateien aus einem Ordner, ein Text-Splitter zerlegt sie in Abschnitte, danach entstehen mehrsprachige [Embeddings](/glossar/embeddings/), und Text und Vektoren landen in PostgreSQL mit Vektor-Erweiterung.

Agenten sehen von diesem Schritt nichts. Sie rufen über einen MCP-Server nur die Suche auf und bekommen die passenden Abschnitte zurück. Gerade deshalb ist das Chunking eine zentrale Stellschraube: Was beim Zerlegen auseinandergerissen wird, kann später keine Suche mehr zusammenfügen.

Weil Ingest und Retrieval getrennte Workflows sind, lässt sich die Chunking-Strategie ändern und der Bestand neu einlesen, ohne einen angebundenen Agenten anzufassen. Die Änderung wirkt zentral für alle Clients.

## Warum braucht RAG Chunking?

Ein [RAG-System](/glossar/rag/) sucht zu einer Frage passende Textstellen und gibt sie einem Sprachmodell als Kontext. Ganze Dokumente eignen sich dafür schlecht, aus zwei Gründen.

Erstens haben auch Embedding-Modelle eine Obergrenze an [Tokens](/glossar/token/), die sie in einen Vektor übersetzen. Pinecone weist darauf hin, dass überzählige Tokens sonst abgeschnitten werden können und wichtiger Inhalt damit gar nicht im Vektor ankommt (Pinecone, Chunking Strategies). Zweitens wird ein Vektor umso unschärfer, je mehr Themen ein Text enthält. Ein Handbuch mit fünfzig Kapiteln als ein Vektor passt zu jeder Frage ein bisschen und zu keiner richtig.

Die Ähnlichkeit wird bei der [semantischen Suche](/glossar/semantische-suche/) deshalb auf Ebene der Chunks berechnet (Pinecone, Chunking Strategies). Pinecone nennt eine einfache Faustregel: Ein Abschnitt, der für einen Menschen ohne den umgebenden Text Sinn ergibt, ergibt auch für das Sprachmodell Sinn.

## Welche Chunking-Strategien gibt es?

| Strategie | Wie sie trennt | Stärke | Schwäche |
| --- | --- | --- | --- |
| Feste Größe | nach einer festen Zahl von Tokens oder Zeichen | einfach, gleich große Chunks | schneidet mitten im Satz oder Gedanken |
| Rekursiv | erst an Absätzen, dann Zeilen, dann Wörtern, bis die Größe passt | hält natürliche Einheiten zusammen | ignoriert Überschriften und Tabellen |
| Nach Dokumentstruktur | an Überschriften, Listen, Codeblöcken, etwa in Markdown oder HTML | folgt der logischen Gliederung | braucht sauber strukturierte Quellen |
| Semantisch | dort, wo sich das Thema zwischen Satzgruppen ändert | Grenzen folgen dem Inhalt | zusätzliche Embedding-Aufrufe beim Einlesen |

Pinecone bezeichnet Chunking nach fester Größe als häufigsten und einfachsten Ansatz und empfiehlt, dort zu beginnen und erst bei Bedarf zu verfeinern (Pinecone, Chunking Strategies). LangChain empfiehlt für die meisten Fälle den RecursiveCharacterTextSplitter als Ausgangspunkt (LangChain Docs, Text splitters). Er versucht zuerst, ganze Absätze zu erhalten, und weicht nur bei Bedarf auf Sätze und Wörter aus; die Standard-Trennzeichen sind Leerzeile, Zeilenumbruch, Leerzeichen und zuletzt einzelne Zeichen (Pinecone, Chunking Strategies).

Semantisches Chunking geht auf ein Notebook von Greg Kamradt zurück. Der Text wird in Sätze zerlegt, jeweils mit den Nachbarsätzen eingebettet, und wo die Distanz zwischen benachbarten Gruppen springt, entsteht eine neue Grenze (Pinecone, Chunking Strategies).

## Was ist Überlappung beim Chunking?

Überlappung (Chunk Overlap) bedeutet, dass das Ende eines Chunks am Anfang des nächsten noch einmal vorkommt. Ein Gedanke, der an der Schnittkante beginnt, steht dann vollständig in mindestens einem der beiden Abschnitte.

Wie groß die Überlappung ausfällt, ist eine Abwägung. Mehr Überlappung bedeutet mehr gespeicherten Text, mehr Embeddings und doppelte Inhalte in den Treffern. OpenAI nutzt für seine Dateisuche standardmäßig 800 Tokens pro Chunk und 400 Tokens Überlappung; die Überlappung darf höchstens die Hälfte der Chunk-Größe betragen (OpenAI API Reference, Vector Stores, Stand: Oktober 2026). Andere Werkzeuge haben andere Voreinstellungen, deshalb lohnt der Blick in die Dokumentation des jeweiligen Text-Splitters.

## Wie groß sollte ein Chunk sein?

Eine allgemeingültige Größe gibt es nicht. Kleine Chunks treffen eine Frage präziser, verlieren aber den Zusammenhang. Große Chunks behalten mehr Kontext, enthalten aber auch mehr Text, der nicht zur Frage passt, und verbrauchen mehr Platz im [Kontextfenster](/glossar/kontextfenster/) des Sprachmodells.

Pinecone schlägt vor, eine Spanne von Größen zu testen, etwa kleinere Chunks mit 128 oder 256 Tokens und größere mit 512 oder 1.024 Tokens, und die Ergebnisse mit repräsentativen Fragen zu vergleichen (Pinecone, Chunking Strategies). Entscheidend sind dabei die Art der Dokumente und das verwendete Embedding-Modell. Kurze FAQ-Einträge oder Produktdatenblätter müssen oft gar nicht zerlegt werden.

## Was hat Chunking mit Contextual Retrieval zu tun?

Jede Chunking-Strategie hat dasselbe Grundproblem: Ein Abschnitt verliert seinen Bezug zum Gesamtdokument. Ein Satz wie „Die Frist beträgt drei Monate“ sagt ohne Dokumenttitel nicht, um welchen Vertrag es geht.

[Contextual Retrieval](/glossar/contextual-retrieval/) setzt nach dem Chunking an. Ein Sprachmodell schreibt für jeden Chunk einen kurzen Kontext aus dem Gesamtdokument und stellt ihn voran, bevor Embeddings und Stichwortindex entstehen (Anthropic, 2024). Chunking bestimmt also, wo geschnitten wird; Contextual Retrieval repariert, was beim Schneiden an Zusammenhang verloren geht. Wie sich beides in eine Unternehmensarchitektur einfügt, zeigt der Artikel [Company Brain aufbauen](/blog/company-brain-aufbauen-rag-architektur/).

## Was bedeutet Chunking für Inhalte, die in KI-Suchen erscheinen sollen?

Viele [KI-Suchen](/glossar/ki-suche/) und Antwortmaschinen arbeiten intern mit Retrieval. Wie einzelne Anbieter Webseiten zerlegen, legen sie meist nicht offen. Die Faustregel aus dem Chunking lässt sich trotzdem auf das eigene Schreiben übertragen: Absätze, die ohne den Rest der Seite verständlich sind, lassen sich auch als einzelne Abschnitte sinnvoll verwenden.

Praktisch heißt das: eine klare Gliederung mit Überschriften, die die Frage des Absatzes nennen, Begriffe im Absatz ausschreiben statt mit „dies“ auf vorherige Abschnitte zu verweisen, und Zahlen mit Quelle im selben Satz. Google selbst nennt für seine KI-Funktionen keine besonderen Optimierungen, sondern die üblichen SEO-Grundlagen, darunter wichtige Inhalte in Textform bereitzustellen (Google Search Central, AI features). Mehr dazu steht unter [Generative Engine Optimization](/glossar/geo-generative-engine-optimization/) und [KI-Sichtbarkeit](/glossar/ki-sichtbarkeit/).

## Welche Fehler passieren beim Chunking?

Der häufigste Fehler ist eine einzige Strategie für alle Dokumenttypen. Verträge, Tabellen, Code und FAQ-Seiten haben verschiedene Strukturen und brauchen oft verschiedene Splitter.

Ein zweiter Fehler betrifft Tabellen und Listen. Werden sie zeilenweise zerschnitten, landen Spaltenüberschriften und Werte in verschiedenen Chunks, und kein Abschnitt ist für sich verständlich.

Ein dritter Fehler ist, die Chunk-Größe nach Gefühl festzulegen und nie zu prüfen. Feste Testfragen mit bekannten richtigen Abschnitten zeigen, ob eine Änderung die Suche verbessert oder verschlechtert, bevor sie produktiv geht.
