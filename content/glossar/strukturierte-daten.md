---
{
  "status": "veroeffentlicht",
  "begriff": "Strukturierte Daten",
  "h1": "Strukturierte Daten: Schema Markup und JSON-LD erklärt mit Beispiel",
  "thema": "seo_grundlagen",
  "alternativeNamen": [
    "Structured Data",
    "Schema Markup",
    "Schema.org-Markup",
    "JSON-LD",
    "Auszeichnungen"
  ],
  "kurzdefinition": "Strukturierte Daten ist die Bezeichnung für ein standardisiertes, maschinenlesbares Format, mit dem Informationen über eine Webseite und ihren Inhalt ausgezeichnet werden, meist mit dem Vokabular von schema.org und im Format JSON-LD.",
  "seoTitel": "Strukturierte Daten: Schema Markup & JSON-LD",
  "seoBeschreibung": "Was sind strukturierte Daten? Schema.org, JSON-LD mit Codebeispiel, Formate im Vergleich, Rich Results, Testwerkzeuge und Rolle für KI-Suchen.",
  "erstveroeffentlicht": "2026-10-19T09:00:00Z",
  "aktualisiert": "2026-10-19T09:00:00Z",
  "steckbriefAussagen": [
    "Strukturierte Daten beschreiben den Inhalt einer Seite in einem standardisierten, maschinenlesbaren Format.",
    "Das gängige Vokabular ist schema.org, das 2011 von Google, Bing und Yahoo gestartet wurde; Yandex kam später hinzu.",
    "Google unterstützt JSON-LD, Microdata und RDFa und empfiehlt JSON-LD, sofern die Website es zulässt.",
    "Gültige strukturierte Daten machen eine Seite für Rich Results berechtigt, garantieren deren Anzeige aber nicht.",
    "Für die KI-Funktionen der Google-Suche ist laut Google kein spezielles schema.org-Markup nötig."
  ],
  "steckbriefFakten": [
    {
      "label": "schema.org gestartet",
      "wert": "2. Juni 2011 von Google, Bing und Yahoo (Google Search Central Blog)"
    },
    {
      "label": "Von Google unterstützte Formate",
      "wert": "JSON-LD (empfohlen), Microdata, RDFa (Google Search Central)"
    },
    {
      "label": "Verbreitung",
      "wert": "über 45 Millionen Domains (schema.org, Stand 2024)"
    }
  ],
  "verwandteBegriffe": [
    "knowledge-graph",
    "geo-generative-engine-optimization",
    "e-e-a-t",
    "ai-overviews",
    "answer-engine-optimization",
    "structured-output",
    "llms-txt"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [
    "grounding-page-generator"
  ],
  "quellen": [
    {
      "titel": "Google Search Central: Introduction to structured data markup in Google Search",
      "url": "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Google Search Central: General structured data guidelines",
      "url": "https://developers.google.com/search/docs/appearance/structured-data/sd-policies",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "schema.org",
      "url": "https://schema.org/",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Google Search Central Blog (02.06.2011): Introducing schema.org: Search engines come together for a richer web",
      "url": "https://developers.google.com/search/blog/2011/06/introducing-schemaorg-search-engines",
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
      "frage": "Was sind strukturierte Daten?",
      "antwort": "Strukturierte Daten sind standardisierte, maschinenlesbare Angaben über eine Webseite und ihren Inhalt, etwa ob es sich um einen Artikel, ein Produkt, eine Veranstaltung oder eine Person handelt. Sie helfen Suchmaschinen, den Inhalt eindeutig einzuordnen. Meist werden sie mit dem Vokabular von schema.org im Format JSON-LD in den Quelltext eingebunden."
    },
    {
      "frage": "Was ist Schema Markup?",
      "antwort": "Schema Markup bezeichnet strukturierte Daten, die das Vokabular von schema.org verwenden. Schema.org legt fest, welche Typen es gibt, etwa Organization, Article oder Product, und welche Eigenschaften sie haben. Das Markup selbst kann in JSON-LD, Microdata oder RDFa geschrieben werden."
    },
    {
      "frage": "Sind strukturierte Daten ein Rankingfaktor?",
      "antwort": "Google beschreibt strukturierte Daten nicht als Rankingfaktor. Sie helfen Google, eine Seite zu verstehen, und können sie für Rich Results wie Sternebewertungen oder Veranstaltungsdaten berechtigt machen. Eine Garantie für die Anzeige gibt es nicht; ein Verstoß gegen die Richtlinien kann die Berechtigung für Rich Results kosten."
    },
    {
      "frage": "Braucht man strukturierte Daten für KI-Suchen?",
      "antwort": "Für die KI-Übersichten und den KI-Modus der Google-Suche ist laut Google kein spezielles schema.org-Markup nötig. Google empfiehlt strukturierte Daten trotzdem als Teil der normalen SEO-Arbeit, weil sie für Rich Results berechtigen. Wichtig ist, dass die Angaben mit dem sichtbaren Text übereinstimmen."
    },
    {
      "frage": "Wie teste ich strukturierte Daten?",
      "antwort": "Google stellt dafür den Test für Rich-Suchergebnisse bereit, der Markup prüft und teils eine Vorschau zeigt. Nach der Veröffentlichung zeigen die Berichte zu Rich Results in der Search Console, ob Google die Daten erkennt, und das URL-Prüftool bestätigt, ob die Auszeichnung auf einer bestimmten Seite gefunden wurde."
    }
  ]
}
---

## Beispiel aus der Praxis

Ein Softwareentwickler betreibt eine persönliche Website mit Lebenslauf, Projekten und einem Blog. Suchmaschinen erkennen zwar den Text, können aber nicht sicher sagen, ob „Hannover“ der Wohnort, ein Projektname oder ein Kunde ist, und welche Profile in sozialen Netzwerken zur selben Person gehören.

Mit strukturierten Daten wird das eindeutig. Im Kopf der Startseite steht ein JSON-LD-Block, der die Person als Entität beschreibt: Name, Berufsbezeichnung, Ort, Website und verknüpfte Profile. Auf den Blogseiten beschreibt ein weiterer Block jeden Artikel mit Titel, Autor und Datum. Alle Angaben stehen auch sichtbar auf den jeweiligen Seiten.

Ein vereinfachtes Beispiel für die Person:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Max Beispiel",
  "jobTitle": "Softwareentwickler",
  "url": "https://www.example.com/",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hannover",
    "addressCountry": "DE"
  },
  "sameAs": [
    "https://github.com/maxbeispiel",
    "https://www.linkedin.com/in/maxbeispiel"
  ]
}
</script>
```

Nach der Veröffentlichung prüft der Entwickler mit dem URL-Prüftool der Search Console, ob Google das Markup findet. Ob die Angaben in Suchergebnissen oder KI-Antworten genutzt werden, entscheidet die Suchmaschine.

## Wie funktionieren strukturierte Daten?

Strukturierte Daten beschreiben, was auf einer Seite steht, in einer Form, die Programme ohne Interpretation lesen können. Ein Mensch erkennt an Layout und Kontext, dass eine Zahl ein Preis und ein Datum ein Veranstaltungstermin ist. Für eine Maschine ist das ohne Auszeichnung mehrdeutig.

Dafür braucht es zwei Dinge: ein **Vokabular**, das festlegt, welche Typen und Eigenschaften es gibt, und ein **Format**, in dem die Angaben im Quelltext stehen. Das verbreitetste Vokabular ist schema.org. Es definiert Typen wie Person, Organization, Article, Product oder Event mit jeweils eigenen Eigenschaften.

Schema.org wurde am 2. Juni 2011 als gemeinsame Initiative von Google, Bing und Yahoo vorgestellt (Google Search Central Blog, 2011). Yandex schloss sich später an. Heute wird das Vokabular von einer Community-Gruppe gepflegt; laut schema.org nutzen es über 45 Millionen Domains (schema.org, Stand 2024).

## Welche Formate für strukturierte Daten gibt es?

Google unterstützt drei Formate und empfiehlt JSON-LD, sofern die Website es zulässt. Bei gültiger und korrekter Umsetzung funktionieren laut Google alle drei gleich gut (Google Search Central, Stand Oktober 2026).

| Format | Wo es steht | Vorteil | Nachteil |
| --- | --- | --- | --- |
| JSON-LD | eigener `<script>`-Block, getrennt vom sichtbaren HTML | leicht zu erzeugen und zu pflegen, auch per Build oder Template | Inhalt kann vom sichtbaren Text abweichen, wenn er nicht aus denselben Daten entsteht |
| Microdata | Attribute direkt an HTML-Elementen | Auszeichnung sitzt am sichtbaren Inhalt | HTML wird unübersichtlich, schwer zu pflegen |
| RDFa | Attribute direkt an HTML-Elementen | auch außerhalb von Suchmaschinen verbreitet | ähnlicher Pflegeaufwand wie Microdata |

## Was bringen strukturierte Daten in der Google-Suche?

Strukturierte Daten können eine Seite für Rich Results berechtigen, also erweiterte Darstellungen wie Bewertungssterne, Rezeptdetails oder Veranstaltungstermine. Eine Garantie für die Anzeige gibt es nicht. Laut Google entscheidet der Algorithmus je Nutzer, welches Ergebnisformat am besten passt, und alle Pflichtfelder sowie Richtlinien müssen erfüllt sein (Google Search Central, Stand Oktober 2026).

Die Richtlinien sind klar: Ausgezeichnet werden darf nur, was Nutzer auf der Seite auch sehen, und das Markup darf nicht irreführend sein, etwa durch erfundene Bewertungen. Verstöße können zu einer manuellen Maßnahme führen, die laut Google die Berechtigung für Rich Results entzieht, das Ranking in der Websuche aber nicht betrifft (Google Search Central, Stand 10. Juli 2026).

Zum Testen nennt Google drei Werkzeuge: den Test für Rich-Suchergebnisse vor der Veröffentlichung, die Rich-Results-Berichte in der Search Console für die laufende Überwachung und das URL-Prüftool für einzelne Seiten.

## Welche Rolle spielen strukturierte Daten für KI-Suchen?

Für die [KI-Übersichten](/glossar/ai-overviews/) und den [KI-Modus](/glossar/google-ki-modus/) der Google-Suche ist laut Google kein spezielles schema.org-Markup nötig. Google rät aber, darauf zu achten, dass strukturierte Daten zum sichtbaren Text passen (Google Search Central, Stand Oktober 2026). Im Leitfaden zu generativen KI-Funktionen empfiehlt Google strukturierte Daten weiterhin als Teil der normalen SEO-Arbeit (Google Search Central, Stand 10. Juli 2026).

Unabhängig davon helfen strukturierte Daten, eine Marke oder Person eindeutig als Entität zu beschreiben. Eigenschaften wie `sameAs` verknüpfen eine Website mit Profilen auf anderen Plattformen. Das passt zu Ansätzen aus [GEO (Generative Engine Optimization)](/glossar/geo-generative-engine-optimization/), bei denen es um einheitliche, überprüfbare Fakten über eine Marke geht, und zum Gedanken des [Knowledge Graph](/glossar/knowledge-graph/).

Strukturierte Daten auf Webseiten sind nicht zu verwechseln mit [Structured Output](/glossar/structured-output/), bei dem ein Sprachmodell seine Antwort in einem festen JSON-Schema liefert. Beide nutzen JSON, verfolgen aber unterschiedliche Zwecke.

## Welche Fehler gibt es bei strukturierten Daten?

**Markup und sichtbarer Inhalt weichen ab.** Steht im JSON-LD ein anderer Preis, Autor oder Name als auf der Seite, verstößt das gegen die Richtlinien. Am sichersten ist JSON-LD, das beim Build aus denselben Daten entsteht wie die Seite.

**Pflichtfelder fehlen.** Ohne die geforderten Eigenschaften ist eine Seite nicht für das jeweilige Rich Result berechtigt.

**Unpassende Typen.** Wer jede Seite als Product oder FAQPage auszeichnet, obwohl der Inhalt das nicht hergibt, riskiert eine manuelle Maßnahme.

**Strukturierte Daten werden als Ranking-Trick verstanden.** Sie helfen beim Verständnis und bei der Darstellung, ersetzen aber keine guten Inhalte.

**Markup steht auf der falschen Seite.** Google empfiehlt, strukturierte Daten auf der Seite einzubinden, die sie beschreiben, und bei Duplikaten auf allen Varianten, nicht nur auf der kanonischen Seite.
