---
{
  "status": "veroeffentlicht",
  "begriff": "llms.txt",
  "h1": "llms.txt: Was die Datei ist und wie man sie erstellt",
  "thema": "ki_sichtbarkeit",
  "alternativeNamen": [],
  "kurzdefinition": "Die llms.txt ist eine Textdatei im Markdown-Format im Hauptverzeichnis einer Website, die Sprachmodellen eine kompakte Übersicht über die wichtigsten Inhalte gibt.",
  "seoTitel": "Was ist llms.txt? Datei erklärt",
  "seoBeschreibung": "Was ist eine llms.txt? Aufbau laut Vorschlag, echtes Beispiel, Unterschied zu robots.txt und Sitemap, Googles Haltung und typische Fehler.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Die llms.txt ist eine Markdown-Datei im Hauptverzeichnis einer Website, die Sprachmodellen eine kompakte Übersicht über die wichtigsten Inhalte gibt.",
    "Vorgeschlagen wurde das Format im September 2024 von Jeremy Howard auf llmstxt.org.",
    "Pflicht ist laut Vorschlag nur eine H1-Überschrift mit dem Namen der Website, üblich sind zusätzlich eine Zusammenfassung und H2-Abschnitte mit Linklisten.",
    "Die Google-Suche verwendet die llms.txt nicht, sie hilft und schadet der Sichtbarkeit dort also nicht.",
    "Die llms.txt ist eine Lesehilfe für Modelle und Agenten, sie ersetzt weder robots.txt noch sitemap.xml."
  ],
  "steckbriefFakten": [
    {
      "label": "Vorgeschlagen von",
      "wert": "Jeremy Howard (llmstxt.org)"
    },
    {
      "label": "Erstveröffentlichung des Vorschlags",
      "wert": "3. September 2024 (llmstxt.org)"
    },
    {
      "label": "Einziger Pflichtbestandteil",
      "wert": "H1-Überschrift mit dem Namen (llmstxt.org)"
    },
    {
      "label": "Nutzung durch die Google-Suche",
      "wert": "keine (Google Search Central, Stand 10.07.2026)"
    }
  ],
  "verwandteBegriffe": [
    "geo-generative-engine-optimization",
    "ki-sichtbarkeit",
    "token",
    "kontextfenster"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [
    "grounding-page-generator"
  ],
  "quellen": [
    {
      "titel": "llmstxt.org: The /llms.txt file",
      "url": "https://llmstxt.org/",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Google Search Central: Optimizing your website for generative AI features on Google Search",
      "url": "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Search Engine Journal (20.05.2026): Google's llms.txt Guidance Depends On Which Product You Ask",
      "url": "https://www.searchenginejournal.com/googles-llms-txt-guidance-depends-on-which-product-you-ask/575431/",
      "abgerufen": "2026-10-14"
    }
  ],
  "faq": [
    {
      "frage": "Was ist eine llms.txt?",
      "antwort": "Die llms.txt ist eine Textdatei im Markdown-Format, die im Hauptverzeichnis einer Website liegt und Sprachmodellen eine kompakte Übersicht über die wichtigsten Inhalte gibt. Sie enthält eine kurze Beschreibung der Website und Links zu zentralen Seiten mit je einem erklärenden Satz. Vorgeschlagen wurde das Format im September 2024 von Jeremy Howard."
    },
    {
      "frage": "Wie erstelle ich eine llms.txt?",
      "antwort": "Eine llms.txt beginnt mit einer Überschrift mit dem Namen der Website, gefolgt von einer kurzen Zusammenfassung. Darunter folgen Abschnitte mit Links zu den wichtigsten Seiten, jeweils mit einem Satz, worum es auf der Seite geht. Die Datei wird als /llms.txt im Hauptverzeichnis abgelegt; bei Websites mit CMS lässt sie sich beim Build automatisch erzeugen."
    },
    {
      "frage": "Bringt eine llms.txt etwas für SEO oder GEO?",
      "antwort": "Für das Google-Ranking bringt die llms.txt nach heutigem Stand nichts; Google hat erklärt, die Datei nicht zu verwenden. Ob KI-Suchen und Agenten sie nutzen, ist uneinheitlich und kaum belegt. Sie ist schnell erstellt und schadet nicht, wichtiger für die Sichtbarkeit in KI-Suchen bleiben gut strukturierte, belegte Inhalte."
    }
  ]
}
---

## Beispiel aus der Praxis

Diese Website hat selbst eine llms.txt, abrufbar unter [ozan-orhan.com/llms.txt](https://ozan-orhan.com/llms.txt). Sie beginnt mit einer H1-Überschrift aus Name und Berufsbezeichnung. Darunter steht als Zitatblock eine Zusammenfassung in vier Zeilen: wer hier schreibt, woran er arbeitet, welche Schwerpunkte er hat und wo er sitzt.

Danach folgen vier Abschnitte mit H2-Überschriften: Seiten, Projekte, Blog und Hinweise für Antwortsysteme. Jeder Projekteintrag besteht aus einem Markdown-Link, einer kurzen Einordnung der Technik und einem Verweis auf eine eigene maschinenlesbare Fassung der Projektseite, etwa für den [Grounding Page Generator](/projekte/grounding-page-generator/).

Der letzte Abschnitt richtet sich direkt an Sprachmodelle. Er nennt die Sprache der Website, stellt klar, dass Projekte aus dem Unternehmenskontext ohne Kundennamen dargestellt werden, und hält fest, dass zu den Projekten keine veröffentlichten Kennzahlen zu Zeit- oder Kostenersparnis vorliegen. Ein Modell, das die Datei liest, soll so keine Ergebnisse erfinden.

Gepflegt wird die Datei nicht von Hand. Ein Skript erzeugt sie bei jedem Build aus denselben Daten, aus denen auch die Projekt- und Blogseiten entstehen. Auch jede Glossarseite erhält dabei eine eigene Markdown-Fassung. Neue Inhalte landen dadurch automatisch in der Übersicht, und Seite und Datei können nicht auseinanderlaufen.

## Welche Bestandteile hat eine llms.txt laut Vorschlag?

Der Vorschlag auf llmstxt.org legt eine feste Reihenfolge fest (llmstxt.org, Stand 2026). Pflicht ist nur eine H1-Überschrift mit dem Namen des Projekts oder der Website. Alle weiteren Teile sind optional, sollen aber in dieser Reihenfolge stehen:

1. eine H1-Überschrift mit dem Namen
2. ein Zitatblock mit einer kurzen Zusammenfassung
3. beliebig viele Absätze oder Listen mit Details, aber ohne Überschriften
4. H2-Abschnitte mit Linklisten, jeder Eintrag als `[Name](URL)`, wahlweise mit Doppelpunkt und Erläuterung

Ein H2-Abschnitt mit dem Namen „Optional“ hat eine besondere Bedeutung. Er enthält Links zu zweitrangigen Inhalten, die ein Programm überspringen kann, wenn es nur wenig Kontext verarbeiten soll (llmstxt.org).

Ergänzend empfiehlt der Vorschlag, wichtige Seiten zusätzlich als reines Markdown unter derselben Adresse mit angehängtem `.md` bereitzustellen. Aus `seite.html` wird dann `seite.html.md`, für Adressen ohne Dateinamen gilt `index.html.md` (llmstxt.org).

## Wofür ist die llms.txt gedacht?

Die llms.txt soll Sprachmodellen helfen, eine Website im Moment einer Anfrage zu verstehen. Laut llmstxt.org war die Erwartung, dass die Datei vor allem bei der Inferenz nützt und weniger beim Training von Modellen. Typischer Fall ist ein Programmierwerkzeug oder Agent, der für eine Aufgabe schnell die Dokumentation einer Bibliothek erfassen muss.

Der Grund ist praktisch. HTML-Seiten enthalten Navigation, Skripte, Werbung und Layout, die für ein [Sprachmodell](/glossar/llm/) keinen Inhalt tragen, aber Platz im Kontext belegen. Eine Markdown-Übersicht mit kurzen Beschreibungen erlaubt es, gezielt nur die relevanten Seiten nachzuladen.

Die Datei ist damit eine Lesehilfe, keine Steuerungsdatei. Sie erlaubt oder verbietet nichts und garantiert nicht, dass ein Modell die verlinkten Inhalte liest oder zitiert.

## Was ist der Unterschied zwischen llms.txt, robots.txt und sitemap.xml?

Alle drei Dateien liegen im Hauptverzeichnis einer Website, erfüllen aber unterschiedliche Aufgaben.

| Datei | Zweck | Format | Zielgruppe |
| --- | --- | --- | --- |
| robots.txt | regelt, welche Bereiche Crawler abrufen dürfen | eigene Textsyntax | Crawler von Suchmaschinen und KI-Anbietern |
| sitemap.xml | listet alle indexierbaren Adressen auf | XML | Suchmaschinen |
| llms.txt | fasst die wichtigsten Inhalte zusammen und verlinkt sie | Markdown | Sprachmodelle und Agenten |

Die llms.txt ersetzt keine der beiden anderen Dateien. Wer KI-Crawler ausschließen oder zulassen will, regelt das weiterhin in der robots.txt. Wer alle Seiten auffindbar machen will, braucht weiterhin eine Sitemap. Die llms.txt ist bewusst eine Auswahl, keine vollständige Liste.

## Nutzt Google die llms.txt?

Nein, die Google-Suche wertet die Datei nicht aus. In seinem Leitfaden zur Optimierung für generative KI-Funktionen schreibt Google, man müsse keine neuen maschinenlesbaren Dateien, KI-Textdateien, Auszeichnungen oder Markdown-Fassungen erstellen, um in der Google-Suche zu erscheinen, weil die Google-Suche sie selbst nicht verwendet (Google Search Central, Stand 10. Juli 2026).

Derselbe Leitfaden stellt klar, dass eine llms.txt für andere Dienste trotzdem angelegt werden kann. Sie hilft und schadet der Sichtbarkeit in der Google-Suche dann nicht, weil die Suche sie ignoriert. Für die KI-Übersichten und den KI-Modus gelten laut Google die normalen Anforderungen der Suche (Google Search Central, Stand 10. Juli 2026).

Für [GEO (Generative Engine Optimization)](/glossar/geo-generative-engine-optimization/) bei Google ist die llms.txt damit kein Hebel. Wichtiger sind indexierbare Seiten mit eigenständigem, gut belegtem Inhalt.

## Welche Fehler gibt es bei der llms.txt?

**Die Datei wird einmal angelegt und dann vergessen.** Verweist sie auf gelöschte oder umbenannte Seiten, führt sie Modelle in die Irre. Am zuverlässigsten ist eine Datei, die beim Build aus denselben Daten entsteht wie die Seiten selbst.

**Die Datei listet alles.** Eine llms.txt mit sehr vielen Links ohne Beschreibung ist eine zweite Sitemap und verfehlt den Zweck. Sinnvoll sind die wichtigsten Seiten mit je einem erklärenden Satz.

**Die Beschreibungen sind Werbetexte.** Ein Modell braucht Fakten: was eine Seite enthält, für wen sie gedacht ist, welche Einschränkungen gelten. Superlative ohne Beleg helfen dabei nicht.

**Die Struktur weicht vom Vorschlag ab.** Fehlt die H1-Überschrift oder stehen Links nicht als Markdown-Links in H2-Abschnitten, können Programme, die das Format auslesen, die Datei schlechter verarbeiten.

**Von der Datei wird zu viel erwartet.** Die llms.txt verbessert weder Rankings noch garantiert sie Zitate in KI-Antworten. Gut strukturierte Seiten mit überprüfbaren Fakten bleiben wichtiger.
