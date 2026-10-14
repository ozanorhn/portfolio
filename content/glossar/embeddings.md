---
{
  "status": "entwurf",
  "begriff": "Embeddings",
  "h1": "Embeddings: Was sie sind und wofür KI sie braucht",
  "thema": "rag_suche",
  "alternativeNamen": [
    "Vektor-Embeddings",
    "Einbettungen"
  ],
  "kurzdefinition": "Embeddings sind Zahlenvektoren, die die Bedeutung von Wörtern, Sätzen oder ganzen Texten darstellen, sodass inhaltlich ähnliche Inhalte ähnliche Vektoren erhalten.",
  "seoTitel": "Was sind Embeddings? Einfach erklärt",
  "seoBeschreibung": "",
  "erstveroeffentlicht": null,
  "aktualisiert": null,
  "steckbriefAussagen": [],
  "steckbriefFakten": [],
  "verwandteBegriffe": [
    "vektordatenbank",
    "cosine-similarity",
    "rag",
    "semantische-suche",
    "chunking"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [],
  "quellen": [
    {
      "titel": "Google Machine Learning Crash Course: Embeddings",
      "url": "https://developers.google.com/machine-learning/crash-course/embeddings",
      "abgerufen": null
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

<!--
Text folgt. Aufbau: zuerst „## Beispiel aus der Praxis“ (konkreter Fall, keine erfundenen
Kunden oder Ergebnisse), danach der Hauptteil mit H2 als echten Suchfragen.
-->
