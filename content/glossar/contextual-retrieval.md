---
{
  "status": "veroeffentlicht",
  "begriff": "Contextual Retrieval",
  "h1": "Contextual Retrieval: Chunks mit Kontext für bessere RAG-Suche",
  "thema": "rag_suche",
  "alternativeNamen": [
    "kontextualisierte Suche",
    "kontextualisiertes Chunking"
  ],
  "kurzdefinition": "Contextual Retrieval ist ein von Anthropic 2024 beschriebenes Verfahren, bei dem jeder Textabschnitt vor der Indexierung um einen kurzen, vom Sprachmodell erzeugten Kontext ergänzt wird.",
  "seoTitel": "Contextual Retrieval: Definition & Wirkung",
  "seoBeschreibung": "Was ist Contextual Retrieval? Das Anthropic-Verfahren für Chunks mit Kontext: Funktionsweise, Beispiel, Kosten, Benchmark-Werte und Grenzen.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Contextual Retrieval stellt jedem Textabschnitt vor der Indexierung einen kurzen, vom Sprachmodell erzeugten Kontext aus dem Gesamtdokument voran.",
    "Der Kontext verbessert sowohl die Embeddings als auch den Stichwortindex für BM25, die Suche selbst bleibt unverändert.",
    "Im Anthropic-Benchmark sank der Anteil verfehlter relevanter Abschnitte mit kontextualisierten Embeddings und BM25 um 49 Prozent, mit zusätzlichem Reranking um 67 Prozent.",
    "Die Kosten fallen einmalig beim Einlesen an und lassen sich mit Prompt Caching deutlich senken."
  ],
  "steckbriefFakten": [
    {
      "label": "Kontext pro Abschnitt",
      "wert": "meist 50 bis 100 Tokens (Anthropic, 2024)"
    },
    {
      "label": "Nur kontextualisierte Embeddings",
      "wert": "35 % weniger verfehlte Abschnitte, 5,7 % auf 3,7 % (Anthropic, 2024)"
    },
    {
      "label": "Plus kontextualisiertes BM25 und Reranking",
      "wert": "67 % weniger verfehlte Abschnitte, 5,7 % auf 1,9 % (Anthropic, 2024)"
    },
    {
      "label": "Einmalige Kosten",
      "wert": "1,02 US-Dollar pro Million Dokument-Tokens mit Prompt Caching (Anthropic, 2024)"
    }
  ],
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
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Robertson und Zaragoza (2009): The Probabilistic Relevance Framework: BM25 and Beyond",
      "url": "https://staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf",
      "abgerufen": "2026-10-14"
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

## Beispiel aus der Praxis

Das folgende Szenario zeigt das Problem, das Contextual Retrieval löst. Eine Firma lädt ihre Rahmenverträge in ein [RAG-System](/glossar/rag/). Beim Zerlegen entsteht ein Abschnitt mit dem Satz: „Gemäß Absatz 3 gilt eine Kündigungsfrist von drei Monaten zum Quartalsende.“

Ein Mitarbeiter fragt: „Welche Kündigungsfrist gilt im Wartungsvertrag mit dem Lieferanten X?“ Der Abschnitt enthält weder das Wort Wartungsvertrag noch den Namen des Lieferanten. Die Suche findet ihn deshalb womöglich nicht, obwohl er die richtige Antwort enthält.

Mit Contextual Retrieval sieht derselbe Abschnitt vor der Indexierung so aus: „Dieser Abschnitt stammt aus dem Wartungsvertrag mit Lieferant X und regelt die Kündigung. Gemäß Absatz 3 gilt eine Kündigungsfrist von drei Monaten zum Quartalsende.“ Jetzt passen sowohl die Bedeutungssuche als auch die Stichwortsuche zur Frage.

## Wie funktioniert Contextual Retrieval Schritt für Schritt?

Anthropic beschreibt das Verfahren in einem Beitrag vom 19. September 2024 (Anthropic, 2024). Der Ablauf hat vier Schritte.

Erstens werden Dokumente wie bei jedem RAG-System in Abschnitte zerlegt. Zweitens bekommt ein Sprachmodell für jeden Abschnitt das ganze Dokument und den Abschnitt und schreibt einen kurzen Kontext, laut Anthropic meist 50 bis 100 Tokens (Anthropic, 2024).

Drittens wird dieser Kontext dem Abschnitt vorangestellt. Viertens entstehen aus dem ergänzten Text sowohl die [Embeddings](/glossar/embeddings/) als auch der Stichwortindex für BM25. Anthropic nennt die beiden Teile Contextual Embeddings und Contextual BM25. BM25 ist ein klassisches Rankingverfahren der Stichwortsuche, das auf das probabilistische Relevanzmodell zurückgeht (Robertson und Zaragoza, 2009).

Die Suche selbst ändert sich nicht. Sie arbeitet nur mit besseren Abschnitten. Deshalb lässt sich Contextual Retrieval mit [hybrider Suche](/glossar/hybride-suche/) und [Reranking](/glossar/reranking/) kombinieren.

## Welche Einstellungen empfiehlt Anthropic?

Anthropic hat neben dem Kontext auch weitere Stellschrauben getestet. Von den geprüften Embedding-Modellen schnitten die Modelle von Voyage und Gemini am besten ab (Anthropic, 2024). Diese Aussage bezieht sich auf den Stand der Tests im September 2024 und kann sich mit neuen Modellen ändern.

Außerdem war es in den Tests wirksamer, dem Sprachmodell die besten 20 Abschnitte zu übergeben statt nur die besten 10 oder 5 (Anthropic, 2024). Laut Anthropic können Prompts für die Kontexterzeugung, die auf die eigene Domäne zugeschnitten sind, noch bessere Ergebnisse bringen, etwa mit einem Glossar wichtiger Fachbegriffe (Anthropic, 2024).

## Contextual Retrieval vs. klassisches Chunking: Was ist der Unterschied?

| Kriterium | Klassisches Chunking | Contextual Retrieval |
| --- | --- | --- |
| Inhalt des Abschnitts | nur der Originaltext | Originaltext plus kurzer Dokumentkontext |
| Aufwand beim Einlesen | gering | ein zusätzlicher Modellaufruf pro Abschnitt |
| Aufwand bei der Suche | unverändert | unverändert |
| Typische Schwäche | Abschnitte ohne Bezug zum Dokument werden übersehen | höhere Kosten und längere Einlesezeit |
| Wirkung auf BM25 | nur Wörter des Abschnitts | zusätzlich Wörter aus dem Kontext, etwa Dokumenttitel |

## Was kostet Contextual Retrieval?

Die Kosten entstehen einmalig beim Einlesen, nicht bei jeder Frage. Anthropic beziffert sie mit Prompt Caching auf 1,02 US-Dollar pro Million Dokument-Tokens (Anthropic, 2024).

Die Rechnung beruht auf Annahmen von Anthropic: Abschnitte mit 800 Tokens, Dokumente mit 8.000 Tokens, 50 Tokens Anweisung und 100 Tokens Kontext pro Abschnitt (Anthropic, 2024). Andere Dokumentlängen, Modelle oder Preise führen zu anderen Kosten. Prompt Caching spart, weil das ganze Dokument nur einmal geladen und für alle seine Abschnitte wiederverwendet wird.

Bei jeder Änderung eines Dokuments müssen seine Abschnitte neu kontextualisiert werden. Für Quellen, die sich täglich ändern, gehört das in die Planung der Einlese-Pipeline.

## Wann lohnt sich Contextual Retrieval nicht?

Bei kleinen Wissensbasen ist RAG oft gar nicht nötig. Anthropic empfiehlt, eine Wissensbasis unter 200.000 Tokens, etwa 500 Seiten, direkt in den Prompt zu geben (Anthropic, 2024).

Wenig bringt das Verfahren auch, wenn jeder Abschnitt schon für sich verständlich ist, etwa bei kurzen FAQ-Einträgen oder Produktdatenblättern mit Namen in jeder Zeile. Ob sich der Aufwand lohnt, zeigt ein Vergleich mit festen Testfragen vor und nach der Umstellung.

## Wie passt Contextual Retrieval in ein Company Brain?

Wie Contextual Retrieval, hybride Suche, Reranking und Rechteprüfung zusammen eine Wissensarchitektur für Unternehmen bilden, beschreibt der Artikel [Company Brain aufbauen](/blog/company-brain-aufbauen-rag-architektur/) mit Codebeispiel und Fahrplan.
