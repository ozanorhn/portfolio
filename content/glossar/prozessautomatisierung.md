---
{
  "status": "veroeffentlicht",
  "begriff": "Prozessautomatisierung",
  "h1": "Prozessautomatisierung: Definition, Arten und Einstieg",
  "thema": "automatisierung",
  "alternativeNamen": [
    "Prozesse automatisieren",
    "Geschäftsprozessautomatisierung"
  ],
  "kurzdefinition": "Prozessautomatisierung ist das ganze oder teilweise Ausführen wiederkehrender Geschäftsprozesse durch Software, statt sie manuell zu erledigen.",
  "seoTitel": "Was ist Prozessautomatisierung? Arten & Einstieg",
  "seoBeschreibung": "Prozessautomatisierung lässt wiederkehrende Geschäftsprozesse von Software ausführen. Mit Praxisbeispiel, Vergleich zu RPA und typischen Fehlern.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Prozessautomatisierung lässt wiederkehrende Geschäftsprozesse ganz oder teilweise von Software ausführen, von der Datenübertragung bis zur Dokumenterstellung.",
    "Am stabilsten ist die Anbindung über Schnittstellen; RPA bedient Anwendungen über die Bedienoberfläche und dient als Brücke zu Systemen ohne API.",
    "Gute Kandidaten für Prozessautomatisierung kommen regelmäßig vor, folgen klaren Regeln, nutzen digitale Daten und haben ein prüfbares Ergebnis.",
    "Ein automatisierter Prozess braucht Fehlerbehandlung und einen gemessenen Ausgangswert, sonst bleiben Ausfälle und Nutzen unsichtbar."
  ],
  "steckbriefFakten": [
    {
      "label": "Hochrisiko nach EU-KI-Verordnung",
      "wert": "KI zur Analyse und Filterung von Bewerbungen (Anhang III Nr. 4)"
    }
  ],
  "verwandteBegriffe": [
    "ki-automatisierung",
    "rpa",
    "workflow-automatisierung",
    "low-code",
    "n8n"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [
    "leistungsnachweis-automation",
    "recruiting-jobs-sync"
  ],
  "quellen": [
    {
      "titel": "Microsoft Learn: Introduction to desktop flows (Power Automate)",
      "url": "https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "n8n Docs: Key concept glossary",
      "url": "https://docs.n8n.io/key-concept-glossary/",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "n8n Docs: Handle errors gracefully",
      "url": "https://docs.n8n.io/build/flow-logic/handle-errors-gracefully/",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "n8n Docs: Understand executions",
      "url": "https://docs.n8n.io/build/understand-workflows/understand-executions/",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "EU-KI-Verordnung (AI Act), Anhang III: Hochrisiko-KI-Systeme",
      "url": "https://artificialintelligenceact.eu/annex/3/",
      "abgerufen": "2026-10-14"
    }
  ],
  "faq": [
    {
      "frage": "Was ist Prozessautomatisierung?",
      "antwort": "Prozessautomatisierung bedeutet, wiederkehrende Geschäftsprozesse ganz oder teilweise durch Software ausführen zu lassen, statt sie manuell zu erledigen. Das reicht vom automatischen Weiterleiten eines Formulars bis zur durchgängigen Verarbeitung einer Bestellung über mehrere Systeme. Ziel ist, Zeit zu sparen, Fehler zu vermeiden und Abläufe nachvollziehbar zu machen."
    },
    {
      "frage": "Wie fängt man mit Prozessautomatisierung an?",
      "antwort": "Am Anfang steht eine Liste der Abläufe, die häufig vorkommen, viel Zeit kosten und nach festen Regeln funktionieren. Für den ersten Prozess eignet sich ein überschaubarer Fall mit klarem Nutzen, etwa das Übertragen von Daten zwischen zwei Tools. Wichtig ist, den Ablauf vorher sauber aufzuschreiben, denn ein unklarer Prozess wird durch Automatisierung nicht besser."
    },
    {
      "frage": "Welche Arten von Prozessautomatisierung gibt es?",
      "antwort": "Man unterscheidet grob die Integration über Schnittstellen (APIs, Webhooks), RPA mit Software-Robotern an der Benutzeroberfläche und KI-Automatisierung mit Sprachmodellen für unstrukturierte Inhalte. Workflow-Plattformen wie n8n verbinden diese Ansätze in einem Ablauf. Welche Art passt, hängt davon ab, ob die beteiligten Systeme Schnittstellen haben und wie strukturiert die Daten sind."
    },
    {
      "frage": "Was ist intelligente Prozessautomatisierung?",
      "antwort": "Intelligente Prozessautomatisierung verbindet klassische Automatisierung mit KI, damit auch Schritte automatisiert werden können, die bisher menschliches Verständnis brauchten. Ein Sprachmodell liest zum Beispiel eine E-Mail, erkennt das Anliegen und übergibt strukturierte Daten an den weiteren, regelbasierten Ablauf. Der Begriff wird oft gleichbedeutend mit KI-Automatisierung verwendet."
    },
    {
      "frage": "Welche HR-Prozesse lassen sich automatisieren?",
      "antwort": "Gut automatisieren lassen sich wiederkehrende Abläufe wie das Anlegen neuer Mitarbeitender in mehreren Systemen, Erinnerungen im Onboarding, das Sammeln von Unterlagen, Urlaubsanträge und das Vorsortieren von Bewerbungen nach festen Kriterien. Entscheidungen über Personen sollten dabei immer bei Menschen bleiben. Bei personenbezogenen Daten sind Datenschutz und Zugriffsrechte besonders wichtig."
    }
  ]
}
---

## Beispiel aus der Praxis

Ein Geschäftsprozess, den Ozan Orhan automatisiert hat, ist die monatliche Erstellung von Leistungsnachweisen in der [Leistungsnachweis-Automation](/projekte/leistungsnachweis-automation/). Die Arbeitszeiten lagen bereits strukturiert in Toggl vor. Für die Nachweise wurden sie aber jeden Monat von Hand gefiltert, Kunden zugeordnet, aufbereitet und in Dokumente übertragen.

Der automatisierte Prozess behält die Zeiterfassung als einzige Datenquelle. Eine Slack-Nachricht fragt monatlich die Freigabe ab; erst eine Reaktion darauf startet den Lauf und bestimmt den Zeitraum. Danach läuft alles ohne Handarbeit: Zeiteinträge laden, je Kunde aufbereiten, Tabellen und Dokumente aus Vorlagen erzeugen, in der vorgesehenen Drive-Ordnerstruktur ablegen und den Abschluss in Slack melden.

An dem Beispiel sieht man zwei Grundsätze. Erstens entsteht keine zweite, manuell gepflegte Datenquelle. Zweitens bleibt die Entscheidung, wann der Prozess läuft, bei einem Menschen.

## Wie funktioniert Prozessautomatisierung?

Ein automatisierter Prozess besteht aus vier Teilen: einem Auslöser, den beteiligten Daten, den Regeln für die Verarbeitung und einem Ergebnis. Der Auslöser kann ein Zeitplan, ein Ereignis in einem System oder eine menschliche Freigabe sein.

Software verbindet dabei die Systeme, die vorher Menschen per Hand verbunden haben. Am stabilsten ist die Anbindung über Schnittstellen (APIs) oder Webhooks, weil sie strukturierte Daten liefern. Hat ein System keine Schnittstelle, bleiben das Auslesen von HTML oder die Steuerung über die Bedienoberfläche. Der [Recruiting Jobs Sync](/projekte/recruiting-jobs-sync/) liest zum Beispiel eine Karriereseite ohne API aus und hält die Stellen trotzdem täglich synchron.

Zwischen Auslöser und Ergebnis liegen meist mehrere Systeme. Die Daten werden dabei nicht nur kopiert, sondern geprüft, zugeordnet und in das Format gebracht, das das Zielsystem erwartet. Diese Transformation ist oft der aufwendigste Teil der manuellen Arbeit und damit der größte Hebel.

Ein Prozess wird selten in einem Schritt vollständig automatisiert. Oft beginnt man mit dem aufwendigsten Teil und lässt Prüfung oder Freigabe zunächst beim Menschen. Plattformen wie [n8n](/glossar/n8n/) bilden solche Abläufe als Workflows ab, in denen automatische Schritte und menschliche Freigaben nebeneinander stehen.

## Prozessautomatisierung, Workflow-Automatisierung und RPA: Was ist der Unterschied?

Die Begriffe überschneiden sich, beschreiben aber verschiedene Ebenen.

| Begriff | Blickwinkel | Technische Umsetzung | Beispiel |
| --- | --- | --- | --- |
| Prozessautomatisierung | Der Geschäftsprozess von Anfang bis Ende | Kombination aus Schnittstellen, RPA und KI | Monatliche Leistungsnachweise |
| [Workflow-Automatisierung](/glossar/workflow-automatisierung/) | Eine feste Folge von Schritten nach einem Auslöser | Workflow-Plattform wie n8n | Formular landet im CRM, Team wird benachrichtigt |
| RPA | Einzelne Tätigkeiten an der Bedienoberfläche | Software-Roboter bedienen Anwendungen | Daten in ein Altsystem übertragen |
| [KI-Automatisierung](/glossar/ki-automatisierung/) | Schritte, die Textverständnis brauchen | Sprachmodell innerhalb des Ablaufs | Stellenanzeigen aus HTML in Felder zerlegen |

RPA-Werkzeuge wie die Desktop-Flows in Microsoft Power Automate bedienen Anwendungen über Oberflächenelemente, Bilder oder Koordinaten und kommen auch mit Altsystemen wie Terminalemulatoren zurecht (Microsoft Learn). Weil sie an der Oberfläche ansetzen, können Änderungen am Layout einen solchen Ablauf unterbrechen.

Eine Schnittstelle ist deshalb meist die bessere Wahl, wenn es sie gibt. RPA ist eine Brücke für Systeme, die anders nicht erreichbar sind.

## Welche Prozesse eignen sich für Prozessautomatisierung?

Gute Kandidaten haben vier Merkmale: Sie kommen regelmäßig vor, folgen nachvollziehbaren Regeln, nutzen Daten, die bereits digital vorliegen, und haben ein prüfbares Ergebnis. Monatliche Abrechnungen, das Übertragen von Daten zwischen zwei Tools oder das Ablegen von Dokumenten erfüllen diese Merkmale oft.

Schlechte Kandidaten sind seltene Sonderfälle, Abläufe, die jedes Mal anders verlaufen, und Entscheidungen mit großer Tragweite. Hier kostet die Automatisierung mehr, als sie spart, oder ein Fehler wiegt zu schwer.

Ein Sonderfall sind Personalprozesse. KI-Systeme, die Bewerbungen analysieren, filtern oder Kandidaten bewerten, gelten nach Anhang III der EU-KI-Verordnung als Hochrisiko-Systeme. Formale Schritte wie das Anlegen von Konten lassen sich trotzdem gut automatisieren; die Entscheidung über Personen gehört zu Menschen.

## Woran scheitert Prozessautomatisierung?

**Unklarer Ist-Prozess.** Wer einen Ablauf automatisiert, den niemand aufgeschrieben hat, automatisiert auch dessen Ausnahmen und Widersprüche. Vorher gehören Auslöser, Schritte, beteiligte Systeme und das gewünschte Ergebnis auf Papier.

**Doppelte Datenhaltung.** Entsteht durch die Automatisierung eine zweite Tabelle, die von Hand nachgepflegt werden muss, ist der Aufwand nur verschoben. Besser ist es, die vorhandene Quelle direkt zu verarbeiten.

**Fehlende Fehlerbehandlung.** Ein Prozess, der still abbricht, richtet mehr Schaden an als ein manueller. In n8n lässt sich pro Workflow ein Fehler-Workflow festlegen, der bei einem fehlgeschlagenen Lauf eine Meldung verschickt (n8n Docs).

**Keine Messung.** Ohne Ausgangswert lässt sich der Nutzen nicht belegen. Für einen Teil der Leistungsnachweis-Automation gibt es dafür ein Telemetrie-Schema mit Feldern wie Baseline-Zeit, eingesparter Zeit, Kosten und Fehlertyp; es ist noch nicht über alle Pfade ausgerollt.

**Alles auf einmal.** Ein großer Prozess mit vielen Systemen lässt sich schwer testen. Ein kleiner erster Schritt mit klarem Nutzen zeigt schneller, ob der Ansatz trägt.

## Wie bleibt ein automatisierter Prozess nachvollziehbar?

Jeder Lauf sollte sich im Nachhinein prüfen lassen: wann er gestartet wurde, mit welchen Daten und mit welchem Ergebnis. Workflow-Plattformen speichern dazu jeden Lauf als Execution, die sich mit ihren Daten einsehen lässt (n8n Docs).

Hilfreich ist außerdem eine Rückmeldung am Ende des Laufs. In der Leistungsnachweis-Automation meldet der Workflow den Abschluss in Slack, sodass das Team sieht, dass die Dokumente bereitliegen. Menschliche Freigaben vor folgenreichen Schritten dokumentieren zugleich, wer einen Lauf ausgelöst hat; mehr dazu im Eintrag [Human-in-the-Loop](/glossar/human-in-the-loop/).
