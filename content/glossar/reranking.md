---
{
  "status": "veroeffentlicht",
  "begriff": "Reranking",
  "h1": "Reranking: Wie ein Reranker Suchtreffer für KI sortiert",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Reranker",
    "Re-Ranking"
  ],
  "kurzdefinition": "Reranking ist ein zweiter Suchschritt, bei dem ein spezielles Modell die Treffer einer ersten Suche neu nach Relevanz sortiert, damit nur die passendsten Textstellen weiterverwendet werden.",
  "seoTitel": "Was ist Reranking? Reranker einfach erklärt",
  "seoBeschreibung": "Was ist Reranking? Wie ein Reranker Suchtreffer für RAG neu sortiert: Beispiel, Bi-Encoder vs. Cross-Encoder, Benchmark-Werte und typische Fehler.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Reranking ist die zweite Stufe einer Suche: Ein genaueres Modell sortiert die Kandidaten der ersten Suche neu nach Relevanz.",
    "Ein Cross-Encoder liest Frage und Textstelle gemeinsam und bewertet die Passung genauer als ein Embedding-Modell, ist dafür aber langsamer.",
    "Ein Reranker kann nur sortieren, was die erste Suchstufe liefert; fehlt der richtige Abschnitt unter den Kandidaten, hilft er nicht.",
    "Im Anthropic-Benchmark wählte der Reranker aus 150 Kandidaten die besten 20 aus und senkte die Fehlerrate zusätzlich auf 1,9 Prozent."
  ],
  "steckbriefFakten": [
    {
      "label": "Kandidaten im Anthropic-Test",
      "wert": "150 Abschnitte, auf 20 reduziert (Anthropic, 2024)"
    },
    {
      "label": "Fehlerrate mit Reranking",
      "wert": "1,9 % statt 5,7 % verfehlte Abschnitte (Anthropic, 2024)"
    },
    {
      "label": "BERT-Reranking auf MS MARCO",
      "wert": "27 % relative Verbesserung bei MRR@10 (Nogueira und Cho, 2019)"
    }
  ],
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
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Nogueira und Cho (2019): Passage Re-ranking with BERT",
      "url": "https://arxiv.org/abs/1901.04085",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Sentence Transformers: Cross-Encoder Applications (Bi-Encoder vs. Cross-Encoder)",
      "url": "https://sbert.net/examples/cross_encoder/applications/README.html",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Cohere: Rerank Overview (Dokumentation)",
      "url": "https://docs.cohere.com/docs/rerank-overview",
      "abgerufen": "2026-10-14"
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
    },
    {
      "frage": "Welche Reranker gibt es?",
      "antwort": "Es gibt Reranker als Cloud-Dienst, etwa Cohere Rerank, und frei verfügbare Cross-Encoder-Modelle, die sich selbst betreiben lassen. Einige Vektordatenbanken und Suchmaschinen binden Reranker direkt ein. Welcher passt, hängt von Sprache, Datenmenge, Kosten und Datenschutzanforderungen ab und sollte mit echten Fragen getestet werden."
    }
  ]
}
---

## Beispiel aus der Praxis

Das folgende Szenario zeigt, wofür ein Reranker gebraucht wird. Ein Unternehmen betreibt eine interne Wissensbasis mit Richtlinien. Ein Mitarbeiter fragt: „Welche Reisekosten werden nicht erstattet?“

Die Vektorsuche liefert zehn Abschnitte, die alle von Reisekosten handeln. Ganz oben steht der Abschnitt „Erstattet werden Bahnfahrten in der zweiten Klasse und Hotelkosten bis zur festgelegten Grenze“. Er passt thematisch, beantwortet aber die Frage nicht. Der Abschnitt, der die ausgeschlossenen Kosten aufzählt, steht erst auf Platz sieben.

Ein Reranker liest die Frage zusammen mit jedem der zehn Abschnitte und bewertet, wie gut der Abschnitt die Frage beantwortet. Der Abschnitt mit den Ausschlüssen rückt nach oben, und das Sprachmodell bekommt die passende Textstelle an erster Stelle.

Wo der Reranker sitzt, hängt von der Architektur ab. In der [Wissensbasis mit RAG und MCP-Server](/projekte/wissensbasis-rag-mcp/) liegt die gesamte Suchlogik zentral hinter einem MCP-Werkzeug. An so einer Stelle ließe sich ein Reranking-Schritt ergänzen, ohne die angebundenen Agenten zu ändern.

## Wie funktioniert Reranking in einer RAG-Pipeline?

Reranking ist der zweite Schritt einer zweistufigen Suche. Die erste Stufe, etwa eine Vektorsuche oder eine [hybride Suche](/glossar/hybride-suche/), holt schnell eine größere Menge an Kandidaten. Die zweite Stufe bewertet nur diese Kandidaten mit einem genaueren, aber langsameren Modell.

Anthropic holte in seinem Contextual-Retrieval-Benchmark zunächst die besten 150 Abschnitte und ließ den Reranker daraus die besten 20 für das Sprachmodell auswählen (Anthropic, 2024). Für die Tests nutzte Anthropic den Reranker von Cohere (Anthropic, 2024).

Ein Reranker bekommt die Frage und eine Liste von Dokumenten und gibt für jedes Dokument einen Relevanzwert zurück. Cohere beschreibt seinen Dienst so, dass er die Dokumente von am meisten bis am wenigsten relevant zur Anfrage ordnet (Cohere, Stand Oktober 2026). Danach werden nur die obersten Treffer in den Prompt übernommen.

Auch das Format der Dokumente spielt eine Rolle. Für strukturierte Daten wie Tabellenzeilen oder Datensätze empfiehlt Cohere, jeden Eintrag als YAML-Text zu übergeben (Cohere, Stand Oktober 2026). So sieht der Reranker Feldnamen und Werte zusammen und kann sie der Frage besser zuordnen.

## Bi-Encoder vs. Cross-Encoder: Was ist der Unterschied?

Embedding-Modelle für die Vektorsuche sind Bi-Encoder. Sie wandeln Frage und Dokument getrennt in Vektoren um, die dann verglichen werden. Viele Reranker sind Cross-Encoder. Sie geben Frage und Dokument gemeinsam in ein Transformer-Modell und berechnen direkt einen Relevanzwert.

| Kriterium | Bi-Encoder (Embedding-Modell) | Cross-Encoder (Reranker) |
| --- | --- | --- |
| Eingabe | Frage und Dokument getrennt | Frage und Dokument gemeinsam |
| Ergebnis | Vektor pro Text | Relevanzwert pro Paar |
| Vorberechnung | Dokumentvektoren lassen sich vorab speichern | jedes Paar muss bei der Frage neu berechnet werden |
| Genauigkeit | gut | höher |
| Geschwindigkeit bei großen Mengen | schnell | langsam |
| Typische Rolle | erste Suchstufe | zweite Suchstufe |

Die Dokumentation der Bibliothek Sentence Transformers nennt ein Beispiel für den Geschwindigkeitsunterschied: 10.000 Sätze mit einem Cross-Encoder zu clustern würde rund 50 Millionen Paarvergleiche und etwa 65 Stunden erfordern, mit einem Bi-Encoder etwa 5 Sekunden (Sentence Transformers, Stand Oktober 2026). Deshalb empfiehlt sie, mit einem Bi-Encoder zum Beispiel die besten 100 Treffer zu holen und nur diese mit einem Cross-Encoder neu zu sortieren.

## Seit wann gibt es Reranking mit Sprachmodellen?

Eine grundlegende Arbeit zum Reranking mit Transformer-Modellen ist das Paper „Passage Re-ranking with BERT“ von Rodrigo Nogueira und Kyunghyun Cho aus dem Jahr 2019 (Nogueira und Cho, 2019).

Die Autoren nutzten BERT, um Textpassagen zu einer Suchanfrage neu zu bewerten. Auf dem Datensatz MS MARCO übertrafen sie den bisherigen Bestwert relativ um 27 Prozent in der Kennzahl MRR@10 (Nogueira und Cho, 2019). Heutige Reranker bauen auf diesem Prinzip auf.

## Wie viel bringt Reranking zusätzlich?

Im Benchmark von Anthropic lag der Anteil relevanter Abschnitte, die nicht unter den ersten 20 Treffern landeten, ohne Verbesserungen bei 5,7 Prozent (Anthropic, 2024). Kontextualisierte Embeddings und kontextualisiertes BM25 senkten ihn auf 2,9 Prozent, mit zusätzlichem Reranking sank er auf 1,9 Prozent (Anthropic, 2024).

Diese Werte stammen aus Anthropics Testdaten und eigenen Einstellungen. Wie viel ein Reranker in einer anderen Wissensbasis bringt, zeigt nur ein Test mit eigenen Fragen.

## Welche Fehler gibt es beim Reranking?

Ein häufiger Fehler ist eine zu kleine Kandidatenmenge. Der Reranker kann nur sortieren, was die erste Stufe liefert. Fehlt der richtige Abschnitt unter den Kandidaten, hilft auch das beste Modell nicht.

Ein zweiter Fehler ist eine zu große Kandidatenmenge. Jeder Kandidat ist ein eigener Modellaufruf oder ein Teil davon, also steigen Antwortzeit und Kosten mit der Menge. Die richtige Größe hängt vom Zeitbudget ab und sollte gemessen werden.

Ein dritter Fehler betrifft die Sprache. Cohere gibt an, dass seine Rerank-Modelle für mehr als 100 Sprachen trainiert wurden, die Leistung je nach Sprache aber unterschiedlich sein kann (Cohere, Stand Oktober 2026). Für deutsche Dokumente sollte ein Reranker deshalb mit deutschen Testfragen geprüft werden.

Ein vierter Fehler betrifft den Datenschutz. Ein Reranker als Cloud-Dienst bekommt Frage und Textstellen im Klartext. Für vertrauliche Daten kommen selbst betriebene Modelle oder ein [lokales LLM](/glossar/lokales-llm/) in Frage.

Reranking ergänzt die anderen Bausteine eines [RAG-Systems](/glossar/rag/), ersetzt sie aber nicht. Wie Reranking mit [Contextual Retrieval](/glossar/contextual-retrieval/) und hybrider Suche zusammenspielt, beschreibt der Artikel [Company Brain aufbauen](/blog/company-brain-aufbauen-rag-architektur/).
