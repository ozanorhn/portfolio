---
{
  "status": "veroeffentlicht",
  "begriff": "KI-Halluzination",
  "h1": "KI-Halluzination: Ursachen, Arten und Gegenmaßnahmen",
  "thema": "ki_grundlagen",
  "alternativeNamen": [
    "AI Hallucination",
    "LLM-Halluzination",
    "Konfabulation"
  ],
  "kurzdefinition": "Eine KI-Halluzination ist eine plausibel formulierte, aber falsche oder nicht belegbare Aussage eines Sprachmodells, die es mit derselben Sicherheit ausgibt wie eine korrekte Antwort.",
  "seoTitel": "KI-Halluzination: Ursachen und Gegenmaßnahmen",
  "seoBeschreibung": "Was ist eine KI-Halluzination? Plausible, aber falsche Aussagen von Sprachmodellen. Mit Ursachen, Arten und Gegenmaßnahmen wie Grounding und RAG.",
  "erstveroeffentlicht": "2026-10-19T09:00:00Z",
  "aktualisiert": "2026-10-19T09:00:00Z",
  "steckbriefAussagen": [
    "KI-Halluzinationen sind plausibel klingende, aber falsche oder nicht belegbare Aussagen eines Sprachmodells.",
    "Die Forschung unterscheidet Fehler gegenüber Weltwissen (Faktizität) von Abweichungen gegenüber Anweisung oder mitgeliefertem Kontext (Treue).",
    "OpenAI führt Halluzinationen unter anderem darauf zurück, dass Training und Bewertung Raten stärker belohnen als das Eingestehen von Unsicherheit.",
    "Grounding und RAG stützen Antworten auf geprüfte Quellen, beseitigen Halluzinationen aber nicht vollständig.",
    "Structured Output sichert die Form einer Antwort, nicht ihre Richtigkeit; folgenreiche Ergebnisse brauchen Prüfung oder menschliche Freigabe."
  ],
  "steckbriefFakten": [
    {
      "label": "Hauptarten",
      "wert": "Faktizitäts- und Treue-Halluzination (Huang et al., Survey on Hallucination in LLMs)"
    },
    {
      "label": "Ursache laut OpenAI",
      "wert": "Training und Bewertung belohnen Raten statt Unsicherheit (OpenAI, Why language models hallucinate, 2025)"
    }
  ],
  "verwandteBegriffe": [
    "llm",
    "rag",
    "structured-output",
    "human-in-the-loop",
    "guardrails",
    "kontextfenster",
    "token",
    "ki-agent"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [
    "ki-rechnungspruefung"
  ],
  "quellen": [
    {
      "titel": "OpenAI (2025): Why language models hallucinate",
      "url": "https://openai.com/index/why-language-models-hallucinate/",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Huang et al.: A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions",
      "url": "https://arxiv.org/abs/2311.05232",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Claude Docs: Reduce hallucinations",
      "url": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Google Cloud: Grounding overview",
      "url": "https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Liu et al. (2024): Lost in the Middle: How Language Models Use Long Contexts, TACL 12",
      "url": "https://aclanthology.org/2024.tacl-1.9/",
      "abgerufen": "2026-10-19"
    }
  ],
  "faq": [
    {
      "frage": "Was ist eine KI-Halluzination?",
      "antwort": "Eine KI-Halluzination ist eine Aussage eines Sprachmodells, die überzeugend klingt, aber falsch ist oder sich nicht belegen lässt. Typische Beispiele sind erfundene Quellen, falsche Daten oder Zahlen und Zitate, die so nie gefallen sind. Das Modell gibt solche Aussagen mit derselben Sicherheit aus wie korrekte Antworten, deshalb fallen sie ohne Prüfung oft nicht auf."
    },
    {
      "frage": "Warum halluzinieren KI-Modelle?",
      "antwort": "Sprachmodelle lernen, wahrscheinliche Fortsetzungen von Text zu erzeugen, nicht, Fakten zu prüfen. Seltene Einzelfakten lassen sich aus Mustern in den Trainingsdaten kaum ableiten. OpenAI argumentiert zusätzlich, dass übliche Trainings- und Bewertungsverfahren Raten belohnen, weil eine geratene Antwort manchmal stimmt, ein „Ich weiß es nicht“ aber nie Punkte bringt."
    },
    {
      "frage": "Wie kann man KI-Halluzinationen vermeiden?",
      "antwort": "Ganz vermeiden lassen sie sich nicht, aber deutlich reduzieren. Wirksam sind Grounding auf geprüfte Quellen, etwa per RAG, die ausdrückliche Erlaubnis an das Modell, Unsicherheit zuzugeben, Zitate und Quellenangaben zu jeder Aussage sowie feste Ausgabeformate mit anschließender Prüfung. Bei folgenreichen Entscheidungen sollte ein Mensch das Ergebnis freigeben."
    },
    {
      "frage": "Verhindert RAG Halluzinationen?",
      "antwort": "RAG verringert Halluzinationen, weil das Modell passende Textstellen als Grundlage erhält, verhindert sie aber nicht vollständig. Findet die Suche die falsche Stelle oder gar keine, antwortet das Modell womöglich trotzdem. Auch mit korrektem Kontext kann es Inhalte falsch wiedergeben; die Forschung nennt das eine Treue-Halluzination."
    }
  ]
}
---

## Beispiel aus der Praxis

Ein typisches Szenario: Ein Sprachmodell soll aus Rechnungen Rechnungsnummer, Datum, Betrag und Lieferant auslesen. Die Ausgabe ist über [Structured Output](/glossar/structured-output/) an ein Schema gebunden, jedes Feld ist Pflicht. Bei einer schlecht gescannten Rechnung ist das Datum nicht lesbar.

Das Schema verlangt trotzdem ein Datum, und das Modell liefert eines: ein gültiges, plausibles Datum, das aber nicht auf dem Beleg steht. Formal ist die Antwort korrekt, inhaltlich ist sie eine Halluzination. Ohne weitere Prüfung würde sie unbemerkt in die Buchhaltung übernommen.

Die Lösung besteht aus mehreren Schichten. Das Schema erlaubt ausdrücklich einen leeren Wert für „nicht erkennbar“, und der Prompt erlaubt dem Modell, Unsicherheit anzugeben. Regeln im Workflow gleichen Beträge und Daten mit bekannten Werten ab, etwa mit einer Bestellung. Fälle mit Abweichungen oder fehlenden Feldern gehen per [Human-in-the-Loop](/glossar/human-in-the-loop/) an einen Menschen, statt automatisch weiterzulaufen. Wie eine solche Prüfung als Workflow aussehen kann, zeigt die Fallstudie [KI-Rechnungsprüfung](/projekte/ki-rechnungspruefung/).

## Warum halluzinieren Sprachmodelle?

OpenAI definiert Halluzinationen als plausible, aber falsche Aussagen, die Sprachmodelle erzeugen (OpenAI, 2025). Die Ursachen liegen in der Art, wie diese Modelle lernen und bewertet werden.

Ein [LLM](/glossar/llm/) lernt im Vortraining, das nächste Wort in großen Textmengen vorherzusagen. Dabei sieht es nur Beispiele flüssiger Sprache, keine Kennzeichnung, welche Aussagen wahr oder falsch sind. Regelmäßige Muster wie Rechtschreibung lernt es mit wachsender Größe zuverlässig, seltene Einzelfakten wie ein bestimmter Geburtstag lassen sich aus Mustern dagegen nicht ableiten (OpenAI, 2025).

Hinzu kommt die Bewertung. OpenAI argumentiert, dass übliche Benchmarks nur die Trefferquote messen. Ein Modell, das bei Unsicherheit rät, erzielt dort mehr Punkte als eines, das „Ich weiß es nicht“ sagt, ähnlich wie bei einem Multiple-Choice-Test ohne Abzug für falsche Antworten (OpenAI, 2025). Die Folge sind Modelle, die eher selbstbewusst raten als Unsicherheit zuzugeben.

Huang et al. ordnen die Ursachen in drei Bereiche: Daten, etwa fehlerhafte oder veraltete Trainingsdaten und seltenes Spezialwissen; Training, etwa Feinabstimmung, die Modelle zu gefälligen Antworten verleitet; und Inferenz, also die Art, wie Text beim Erzeugen ausgewählt wird (Huang et al., Survey on Hallucination). Auch die Wissensgrenze spielt eine Rolle: Nach dem Training wird das interne Wissen eines Modells nicht mehr aktualisiert.

## Welche Arten von KI-Halluzinationen gibt es?

Huang et al. unterscheiden zwei Hauptarten (Huang et al., Survey on Hallucination):

| Art | Worauf sie sich bezieht | Untertypen | Beispiel |
| --- | --- | --- | --- |
| Faktizitäts-Halluzination | Widerspruch zu überprüfbaren Fakten der Welt | falsche Fakten, erfundene oder nicht belegbare Fakten | ein falscher Erfinder des Telefons, eine Quelle, die es nicht gibt |
| Treue-Halluzination | Abweichung von Anweisung, mitgeliefertem Kontext oder eigener Logik | Abweichung von der Anweisung, vom Kontext, logische Widersprüche | Zusammenfassung behauptet etwas, das im Dokument nicht steht |

Für Automatisierungen ist die zweite Art besonders relevant. Selbst wenn ein System dem Modell das richtige Dokument mitgibt, kann die Antwort davon abweichen. Ein langer Kontext verstärkt das Risiko: Liu et al. zeigten, dass Modelle Informationen in der Mitte langer Kontexte schlechter nutzen als am Anfang oder Ende (Liu et al., 2024). Mehr dazu im Eintrag [Kontextfenster](/glossar/kontextfenster/).

## Wie lassen sich KI-Halluzinationen reduzieren?

Keine einzelne Maßnahme beseitigt Halluzinationen. Anthropic betont, dass die empfohlenen Techniken Halluzinationen deutlich verringern, aber nicht ausschließen, und kritische Informationen weiterhin geprüft werden müssen (Anthropic, Reduce hallucinations). Wirksam ist eine Kombination mehrerer Schichten:

| Maßnahme | Was sie bewirkt | Was sie nicht leistet |
| --- | --- | --- |
| Grounding | verankert Antworten in überprüfbaren Quellen | korrigiert keine falschen Quellen |
| [RAG](/glossar/rag/) | liefert passende Textstellen als Grundlage | hilft nicht, wenn die Suche die falsche Stelle findet |
| Unsicherheit erlauben | Modell darf „weiß ich nicht“ antworten | erkennt nicht jeden Fehler |
| Zitate und Quellenangaben | Aussagen werden nachprüfbar | prüft nicht automatisch |
| [Structured Output](/glossar/structured-output/) | erzwingt Form und erlaubte Werte | sichert nicht den Inhalt |
| [Guardrails](/glossar/guardrails/) | prüfen Regeln nach der Antwort | nur so gut wie die Regeln |
| [Human-in-the-Loop](/glossar/human-in-the-loop/) | Mensch gibt folgenreiche Ergebnisse frei | kostet Zeit pro Fall |

Google beschreibt Grounding als Fähigkeit, die Ausgabe eines Modells mit überprüfbaren Informationsquellen zu verbinden. Das binde die Antworten an diese Daten, verringere die Wahrscheinlichkeit erfundener Inhalte und mache Antworten über Quellenlinks nachvollziehbar (Google Cloud, Grounding overview). RAG ist eine Form davon: Das Modell erhält zu jeder Frage Abschnitte aus einer geprüften Wissensbasis.

Anthropic nennt konkrete Prompt-Techniken: dem Modell ausdrücklich erlauben, Unsicherheit zuzugeben; bei langen Dokumenten über 20.000 Tokens zuerst wörtliche Zitate herausziehen lassen und erst dann die Aufgabe bearbeiten; zu jeder Aussage ein belegendes Zitat verlangen und Aussagen ohne Beleg zurückziehen lassen; das Modell anweisen, nur die bereitgestellten Dokumente zu verwenden (Anthropic, Reduce hallucinations). Als fortgeschrittene Technik empfiehlt Anthropic, denselben Prompt mehrfach auszuführen und die Antworten zu vergleichen, weil Abweichungen auf Halluzinationen hindeuten können (Anthropic, Reduce hallucinations).

## Wie erkennt man KI-Halluzinationen?

Halluzinationen lassen sich am Tonfall nicht erkennen, weil das Modell falsche und richtige Aussagen gleich sicher formuliert. Zuverlässiger sind Prüfungen gegen Quellen: Steht die behauptete Zahl im mitgelieferten Dokument? Existiert die genannte Quelle? Passt der ausgelesene Betrag zur Summe der Positionen?

In Automatisierungen lassen sich viele dieser Prüfungen als Regeln abbilden, etwa Plausibilitätschecks, Abgleich mit Stammdaten oder Pflicht zu einer Quellenangabe. Was sich nicht automatisch prüfen lässt und Folgen hat, gehört in eine menschliche Freigabe. Ein [KI-Agent](/glossar/ki-agent/), der selbstständig Aktionen auslöst, braucht diese Schichten besonders, weil eine Halluzination dort nicht nur eine falsche Antwort, sondern eine falsche Handlung auslösen kann.
