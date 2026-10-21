---
{
  "status": "veroeffentlicht",
  "begriff": "Embeddings",
  "h1": "Embeddings: Was sie sind und wofür KI sie braucht",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Vektor-Embeddings",
    "Einbettungen"
  ],
  "kurzdefinition": "Embeddings sind Zahlenvektoren, die die Bedeutung von Wörtern, Sätzen oder ganzen Texten darstellen, sodass inhaltlich ähnliche Inhalte ähnliche Vektoren erhalten.",
  "seoTitel": "Was sind Embeddings? Einfach erklärt",
  "seoBeschreibung": "Was sind Embeddings? Zahlenvektoren, die Bedeutung abbilden. Mit Funktionsweise, Ähnlichkeitsmessung, Einsatz in RAG und Praxisbeispiel.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Embeddings stellen Inhalte als Vektoren dar, bei denen inhaltlich ähnliche Inhalte nah beieinander liegen.",
    "Die Ähnlichkeit zweier Embeddings wird über ihre Distanz bestimmt, am häufigsten über die Kosinus-Ähnlichkeit.",
    "Dokumente und Suchanfragen müssen mit demselben Embedding-Modell eingebettet werden, sonst sind die Vektoren nicht vergleichbar.",
    "Für deutsche Dokumente mit Anfragen in mehreren Sprachen eignet sich ein mehrsprachiges Embedding-Modell.",
    "Embeddings erfassen Bedeutung, aber keine exakten Zeichenfolgen; für Nummern und Eigennamen ergänzt man sie um Stichwortsuche."
  ],
  "steckbriefFakten": [
    {
      "label": "Standarddimensionen text-embedding-3-small / -large",
      "wert": "1.536 / 3.072 (OpenAI, Stand: Oktober 2026)"
    },
    {
      "label": "Von OpenAI empfohlenes Ähnlichkeitsmaß",
      "wert": "Kosinus-Ähnlichkeit (OpenAI Embeddings Guide)"
    }
  ],
  "verwandteBegriffe": [
    "vektordatenbank",
    "cosine-similarity",
    "rag",
    "semantische-suche",
    "chunking"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [
    "wissensbasis-rag-mcp"
  ],
  "quellen": [
    {
      "titel": "Google Machine Learning Crash Course: Embeddings",
      "url": "https://developers.google.com/machine-learning/crash-course/embeddings",
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
    },
    {
      "titel": "pgvector: Open-source vector similarity search for Postgres",
      "url": "https://github.com/pgvector/pgvector",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Ollama Docs: Generate embeddings (/api/embed)",
      "url": "https://docs.ollama.com/api/embed",
      "abgerufen": "2026-10-14"
    }
  ],
  "faq": [
    {
      "frage": "Was sind Embeddings?",
      "antwort": "Embeddings sind Zahlenvektoren, die die Bedeutung von Wörtern, Sätzen oder ganzen Texten darstellen. Ähnliche Inhalte erhalten ähnliche Vektoren, auch wenn sie unterschiedliche Wörter verwenden. So kann eine KI erkennen, dass „Kündigungsfrist“ und „wie lange vorher muss ich kündigen“ inhaltlich zusammengehören."
    },
    {
      "frage": "Wofür werden Embeddings in der KI verwendet?",
      "antwort": "Embeddings sind die Grundlage für semantische Suche, RAG-Systeme, Empfehlungen und das Gruppieren ähnlicher Texte. In einem RAG-System werden alle Dokumentabschnitte als Embeddings gespeichert, damit zu einer Frage die inhaltlich passenden Stellen gefunden werden. Die Ähnlichkeit zweier Embeddings wird meist mit der Kosinus-Ähnlichkeit berechnet."
    },
    {
      "frage": "Was ist der Unterschied zwischen Embeddings und Tokens?",
      "antwort": "Tokens sind die Textbausteine, in die ein Sprachmodell Text zerlegt, etwa Wörter oder Wortteile. Embeddings sind Vektoren, die die Bedeutung eines Tokens oder eines ganzen Textabschnitts abbilden. Für die Suche in RAG-Systemen nutzt man Embeddings ganzer Abschnitte, die von einem eigenen Embedding-Modell erzeugt werden."
    },
    {
      "frage": "Wie werden Embeddings erzeugt?",
      "antwort": "Embeddings werden von einem Embedding-Modell erzeugt, einem neuronalen Netz, das Text in einen Vektor mit fester Länge umwandelt. Man schickt einen Textabschnitt an das Modell, etwa über die API eines Anbieters oder ein lokal betriebenes Modell, und erhält eine Zahlenreihe zurück. Wichtig ist, für Dokumente und Suchanfragen dasselbe Modell zu verwenden, sonst sind die Vektoren nicht vergleichbar."
    }
  ]
}
---

## Beispiel aus der Praxis

In der [Wissensbasis mit RAG und MCP-Server](/projekte/wissensbasis-rag-mcp/) sind die Dokumente überwiegend deutsch, Anfragen kommen aber auch auf Englisch. Deshalb erzeugt der Ingest-Workflow die Embeddings mit einem mehrsprachigen Modell. Eine englische Frage findet so einen deutschen Abschnitt, wenn beide inhaltlich dasselbe meinen.

Dabei gilt eine feste Regel: Dokumente und Anfragen laufen durch dasselbe Embedding-Modell. Der Retrieval-Workflow wandelt jede Frage mit genau diesem Modell in einen Vektor um und vergleicht ihn mit den gespeicherten Vektoren in PostgreSQL. Ein Wechsel des Modells bedeutet deshalb, alle Dokumente neu einzubetten.

Weil Chunking, Embedding-Modell und Suche zentral in der Wissensbasis liegen, wirkt eine Änderung dort für alle angebundenen Agenten gleichzeitig. Kein Agent muss selbst wissen, wie Embeddings erzeugt werden.

## Wie funktionieren Embeddings?

Ein Embedding stellt einen Inhalt als Punkt in einem Raum mit vielen Dimensionen dar. Jeder Inhalt wird durch n Gleitkommazahlen beschrieben, und die Distanz zwischen zwei Punkten steht für ihre relative Ähnlichkeit (Google Machine Learning Crash Course, Embedding Space).

Ähnliche Inhalte landen dabei nah beieinander. Google formuliert es so: „Embeddings place similar items closer together in the embedding space“ (Google Machine Learning Crash Course, Embedding Space). Ein Satz über Kündigungsfristen liegt also näher an einer Frage zum Kündigen als an einem Text über Urlaubsanträge.

Die einzelnen Dimensionen haben selten eine für Menschen verständliche Bedeutung. Google weist darauf hin, dass sie kaum so klar interpretierbar sind wie anschauliche Beispielachsen (Google Machine Learning Crash Course, Embedding Space). Aussagekräftig ist nur die Lage der Vektoren zueinander.

## Warum braucht KI Embeddings statt Wörtern?

Computer rechnen mit Zahlen, nicht mit Wörtern. Die einfachste Übersetzung wäre, jedem Wort eine eigene Position in einem sehr langen Vektor zu geben (One-Hot-Kodierung). Solche Vektoren sind riesig, fast nur mit Nullen gefüllt und bilden keine Bedeutung ab (Google Machine Learning Crash Course, Embeddings).

Embeddings lösen beide Probleme. Sie sind dichte Vektoren mit deutlich weniger Dimensionen und erfassen semantische Beziehungen zwischen Inhalten (Google Machine Learning Crash Course, Embeddings). Damit kann ein System Synonyme, Umschreibungen und verwandte Begriffe als ähnlich erkennen.

## Wie misst man die Ähnlichkeit von Embeddings?

Die Ähnlichkeit zweier Embeddings ergibt sich aus ihrer Distanz. OpenAI beschreibt es so: Kleine Distanzen deuten auf hohe Verwandtschaft hin, große auf geringe (OpenAI, Embeddings Guide).

Am häufigsten wird die Kosinus-Ähnlichkeit verwendet. Sie misst den Winkel zwischen zwei Vektoren und ignoriert ihre Länge. OpenAI empfiehlt sie für seine Embeddings und merkt an, dass die Wahl des Distanzmaßes meist wenig ausmacht (OpenAI, Embeddings Guide).

Für viele Vektoren braucht es eine effiziente Suche. Diese Aufgabe übernimmt eine [Vektordatenbank](/glossar/vektordatenbank/) oder eine Datenbankerweiterung wie pgvector, die Distanzmaße wie Kosinus-Distanz, euklidische Distanz und inneres Produkt bereitstellt (pgvector-Dokumentation).

## Wofür nutzt man Embeddings in Automatisierungen?

Der wichtigste Einsatz in Unternehmen ist [RAG](/glossar/rag/). Dokumente werden in Abschnitte zerlegt, jeder Abschnitt bekommt ein Embedding, und zu einer Frage werden die inhaltlich passenden Abschnitte gesucht. Erst diese Abschnitte gehen als Kontext an ein [LLM](/glossar/llm/).

Daneben eignen sich Embeddings für weitere Aufgaben ohne Sprachmodell:

- Dubletten erkennen, etwa doppelte Tickets oder Anfragen mit anderem Wortlaut
- Texte nach Thema gruppieren, zum Beispiel Kundenfeedback
- Eingehende Anfragen einer Kategorie zuordnen, indem man sie mit Beispielen je Kategorie vergleicht
- Ähnliche Inhalte empfehlen, etwa verwandte Artikel oder Produkte

In [n8n](/glossar/n8n/) gibt es dafür eigene Embedding-Knoten, die an Vector-Store-Knoten angeschlossen werden. Der Artikel zum [Aufbau eines Company Brain](/blog/company-brain-aufbauen-rag-architektur/) zeigt, wie sich daraus eine Wissensschicht für ein ganzes Unternehmen aufbauen lässt.

## Welche Embedding-Modelle gibt es?

Embedding-Modelle gibt es als Cloud-Dienst und zum Selbstbetrieb. Cloud-Anbieter wie OpenAI liefern sie über eine API; die Modelle text-embedding-3-small und text-embedding-3-large erzeugen standardmäßig Vektoren mit 1.536 beziehungsweise 3.072 Dimensionen (OpenAI, Embeddings Guide, Stand: Oktober 2026).

Lokal lassen sich Embeddings zum Beispiel mit Ollama erzeugen. Der Endpunkt /api/embed „creates vector embeddings representing the input text“, die Dokumentation nennt embeddinggemma als Beispielmodell (Ollama-Dokumentation). Das ist eine Option, wenn Texte das eigene Netz nicht verlassen sollen; mehr dazu unter [lokales LLM](/glossar/lokales-llm/).

Bei der Auswahl zählen vor allem diese Fragen:

| Kriterium | Worauf es ankommt |
| --- | --- |
| Sprache | Deutsch und gemischte Sprachen brauchen ein mehrsprachiges Modell |
| Dimensionen | Mehr Dimensionen bedeuten mehr Speicher; manche Anbieter erlauben kürzere Vektoren |
| Betrieb | Cloud-API oder eigene Hardware, je nach Datenschutzanforderung |
| Wechselkosten | Ein neues Modell erfordert, alle Dokumente neu einzubetten |

Die Dimensionen wirken sich auch auf die Datenbank aus. pgvector kann den Typ vector bis 2.000 Dimensionen indexieren (pgvector-Dokumentation); ein Modell mit 3.072 Dimensionen passt also nicht ohne Weiteres in einen solchen Index. OpenAI erlaubt, Embeddings über den Parameter dimensions zu kürzen (OpenAI, Embeddings Guide).

Ranglisten einzelner Modelle veralten schnell. Verlässlicher ist ein Test mit eigenen Dokumenten und echten Fragen aus dem Alltag.

## Wo stoßen Embeddings an Grenzen?

Embeddings erfassen Bedeutung, nicht exakte Zeichenfolgen. Bei Artikelnummern, Aktenzeichen oder Eigennamen findet eine reine Vektorsuche oft nicht den richtigen Abschnitt. Eine [hybride Suche](/glossar/hybride-suche/) ergänzt deshalb die Stichwortsuche.

Ein zweites Problem sind Abschnitte ohne Zusammenhang. Ein Satz wie „Die Frist beträgt drei Monate“ verliert ohne das umgebende Dokument seinen Bezug. [Contextual Retrieval](/glossar/contextual-retrieval/) ergänzt jeden Abschnitt vor dem Einbetten um Kontext, und [Reranking](/glossar/reranking/) sortiert die Treffer anschließend genauer.

Drittens altern Embeddings mit dem Modell. Wer das Embedding-Modell wechselt oder ein Anbieter ein Modell abkündigt, muss den gesamten Bestand neu einbetten, weil Vektoren verschiedener Modelle nicht vergleichbar sind. Es lohnt sich deshalb, Modellname und Version zu jedem gespeicherten Vektor festzuhalten.
