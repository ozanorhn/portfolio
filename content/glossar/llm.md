---
{
  "status": "veroeffentlicht",
  "begriff": "LLM (Large Language Model)",
  "h1": "LLM (Large Language Model): Definition und Funktionsweise",
  "thema": "ki_grundlagen",
  "alternativeNamen": [
    "Large Language Model",
    "großes Sprachmodell",
    "Sprachmodell"
  ],
  "kurzdefinition": "Ein LLM (Large Language Model) ist ein großes Sprachmodell, das mit sehr großen Textmengen trainiert wurde und dadurch Sprache verstehen und erzeugen kann.",
  "seoTitel": "Was ist ein LLM? Large Language Model erklärt",
  "seoBeschreibung": "Was ist ein LLM? Large Language Models einfach erklärt: Transformer, Training, Unterschied zu Chatbot und KI-Agent, typische Fehler und Praxisbeispiel.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-14T09:00:00Z",
  "steckbriefAussagen": [
    "Ein LLM ist ein großes Sprachmodell, das Text Stück für Stück erzeugt und dabei jeweils den bisherigen Text berücksichtigt.",
    "Fast alle heutigen LLMs basieren auf der 2017 vorgestellten Transformer-Architektur, die auf Attention-Mechanismen beruht.",
    "Nach dem Vortraining werden LLMs mit menschlichem Feedback darauf abgestimmt, Anweisungen zu befolgen.",
    "Ein LLM ist das Modell; Chatbots und KI-Agenten sind Anwendungen, die darauf aufbauen.",
    "LLMs erzeugen wahrscheinliche statt geprüfte Antworten, deshalb gehören Kontrolle und Schreibzugriffe in deterministischen Code."
  ],
  "steckbriefFakten": [
    {
      "label": "Transformer vorgestellt",
      "wert": "2017, „Attention Is All You Need“ (Vaswani et al.)"
    },
    {
      "label": "Parameter von GPT-3",
      "wert": "175 Milliarden (Brown et al., 2020)"
    }
  ],
  "verwandteBegriffe": [
    "token",
    "kontextfenster",
    "prompt-engineering",
    "ki-halluzinationen",
    "lokales-llm"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [],
  "quellen": [
    {
      "titel": "Vaswani et al. (2017): Attention Is All You Need",
      "url": "https://arxiv.org/abs/1706.03762",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Brown et al. (2020): Language Models are Few-Shot Learners",
      "url": "https://arxiv.org/abs/2005.14165",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Ouyang et al. (2022): Training language models to follow instructions with human feedback",
      "url": "https://arxiv.org/abs/2203.02155",
      "abgerufen": "2026-10-14"
    }
  ],
  "faq": [
    {
      "frage": "Was ist ein LLM?",
      "antwort": "LLM steht für Large Language Model, auf Deutsch großes Sprachmodell. Es ist ein KI-Modell, das mit sehr großen Textmengen trainiert wurde und dadurch Sprache verstehen und erzeugen kann. Bekannte Beispiele sind die Modelle hinter ChatGPT, Claude und Gemini."
    },
    {
      "frage": "Wie funktioniert ein LLM?",
      "antwort": "Ein LLM zerlegt Text in Tokens und sagt Schritt für Schritt vorher, welches Token mit der höchsten Wahrscheinlichkeit als Nächstes folgt. Grundlage ist meist die Transformer-Architektur, die Zusammenhänge zwischen allen Teilen eines Textes gleichzeitig berücksichtigt. Nach dem Grundtraining werden Modelle zusätzlich darauf trainiert, Anweisungen zu befolgen und hilfreiche Antworten zu geben."
    },
    {
      "frage": "Was ist der Unterschied zwischen LLM und KI?",
      "antwort": "KI ist der Oberbegriff für Systeme, die Aufgaben lösen, für die sonst menschliche Intelligenz nötig wäre, etwa Bilderkennung, Übersetzung oder Prognosen. Ein LLM ist eine bestimmte Art von KI, die auf Sprache spezialisiert ist. Viele aktuelle KI-Anwendungen wie Chatbots und KI-Agenten basieren auf LLMs."
    },
    {
      "frage": "Ist ChatGPT ein LLM?",
      "antwort": "ChatGPT ist genau genommen eine Anwendung, die auf LLMs von OpenAI aufbaut. Das Sprachmodell erzeugt die Antworten, die Anwendung ergänzt Funktionen wie Gesprächsverlauf, Websuche oder Dateiupload. Umgangssprachlich wird ChatGPT trotzdem oft als LLM bezeichnet."
    }
  ]
}
---

## Beispiel aus der Praxis

Der [Recruiting Jobs Sync](/projekte/recruiting-jobs-sync/) nutzt ein LLM für eine klar begrenzte Aufgabe: aus der HTML-Seite einer Stellenanzeige die relevanten Angaben herauszulesen. Die Karriereseite hat keine API, die Anzeigen sind unterschiedlich aufgebaut, und feste Regeln für jedes Layout wären aufwendig zu pflegen.

Der Workflow entfernt zuerst Skripte, Styles und Markup, damit nur der Text ins Modell geht. Dann extrahiert das LLM die Felder nach einem festen Schema, ein Enum begrenzt etwa die möglichen Senioritätsstufen. Alles andere, also Abruf, Schlüsselbildung, Upsert und die Erkennung entfernter Anzeigen, läuft deterministisch im Workflow.

Ähnlich arbeitet die [AI Visibility Monitoring Platform](/projekte/ai-visibility-monitoring-platform/): Ein Analyse-Agent ohne Tools und ohne Schreibzugriff bekommt einen vorbereiteten Kontext und gibt schema-gebundenes JSON zurück, das danach in Code normalisiert wird. Das Muster ist in beiden Fällen gleich: Das Sprachmodell übernimmt das Verstehen von Text, die Kontrolle bleibt im Code.

## Was bedeutet „Large“ bei einem Large Language Model?

„Large“ bezieht sich auf zwei Dinge: die Zahl der Parameter und die Menge der Trainingsdaten. Parameter sind die Zahlenwerte im neuronalen Netz, die beim Training angepasst werden und das gelernte Wissen über Sprache speichern.

Ein bekannter Meilenstein ist GPT-3, das seine Entwickler als autoregressives Sprachmodell mit 175 Milliarden Parametern beschreiben, zehnmal mehr als jedes frühere nicht sparse Sprachmodell (Brown et al., 2020). Autoregressiv heißt: Das Modell erzeugt Text Stück für Stück und nutzt dabei jeweils alles, was es bisher erzeugt hat.

Größe allein macht ein Modell aber nicht nützlicher. In einer Studie von Ouyang et al. bevorzugten menschliche Bewerter die Antworten eines nachtrainierten Modells mit 1,3 Milliarden Parametern gegenüber denen von GPT-3 mit 175 Milliarden Parametern (Ouyang et al., 2022). Training und Abstimmung zählen also ebenso wie die Modellgröße.

## Was ist die Transformer-Architektur?

Fast alle heutigen LLMs basieren auf dem Transformer, den ein Team um Ashish Vaswani 2017 im Paper „Attention Is All You Need“ vorgestellt haben (Vaswani et al., 2017). Die Architektur verzichtet vollständig auf rekurrente und konvolutionale Schichten und stützt sich nur auf sogenannte Attention-Mechanismen (Vaswani et al., 2017).

Attention bedeutet vereinfacht: Für jedes Wort im Text gewichtet das Modell, welche anderen Wörter für seine Bedeutung wichtig sind. In „Die Bank war geschlossen, also setzte ich mich auf die Bank im Park“ hilft der Kontext, die beiden Bedeutungen von „Bank“ zu trennen.

Ein praktischer Vorteil war die Parallelisierbarkeit. Die Autoren berichten, dass sich Transformer deutlich besser parallelisieren und schneller trainieren lassen als die damaligen Ansätze (Vaswani et al., 2017). Erst das machte Training auf sehr großen Textmengen wirtschaftlich.

## Wie wird ein LLM trainiert?

Das Training läuft in mehreren Phasen. Im Vortraining lernt das Modell an großen Textmengen, das jeweils nächste Textstück vorherzusagen. Danach beherrscht es Sprache, folgt aber noch nicht zuverlässig Anweisungen.

Im zweiten Schritt wird das Modell auf das Befolgen von Anweisungen abgestimmt. Ouyang et al. beschreiben dafür zwei Stufen: zuerst überwachtes Feintuning mit von Menschen geschriebenen Beispielantworten, dann Reinforcement Learning aus menschlichem Feedback auf Basis von Rangfolgen mehrerer Modellantworten (Ouyang et al., 2022).

Für Anwender ist wichtig: Das Wissen eines LLM stammt aus den Trainingsdaten und hat einen Stichtag. Aktuelle oder interne Informationen kennt das Modell nicht, sie müssen über den Prompt oder über [RAG](/glossar/rag/) mitgegeben werden.

## LLM, Chatbot und KI-Agent: Was ist der Unterschied?

Die Begriffe werden oft gleichgesetzt, beschreiben aber verschiedene Ebenen. Das LLM ist das Modell, Chatbot und Agent sind Anwendungen, die darauf aufbauen.

| Begriff | Was es ist | Was es tut |
| --- | --- | --- |
| LLM | Das trainierte Sprachmodell | Erzeugt zu einem Eingabetext eine Fortsetzung oder Antwort |
| Chatbot | Anwendung mit Gesprächsverlauf | Führt einen Dialog, oft ergänzt um Dateiupload oder Websuche |
| [KI-Agent](/glossar/ki-agent/) | Anwendung mit Zugriff auf Tools | Plant Schritte selbst und ruft Tools wie Suche, Datenbank oder API auf |
| [KI-Automatisierung](/glossar/ki-automatisierung/) | Fester Ablauf mit einzelnen KI-Schritten | Nutzt das LLM für Teilaufgaben wie Extraktion oder Klassifikation |

Über das [Model Context Protocol](/glossar/mcp-model-context-protocol/) bekommen LLM-Anwendungen standardisierten Zugriff auf Tools und Daten. Wann ein fester Workflow und wann ein Agent passt, zeigt der Artikel [n8n Agents vs. AI-Agent-Node](/blog/n8n-agents-vs-ai-agent-node/).

## Wo machen LLMs Fehler?

LLMs erzeugen wahrscheinliche Fortsetzungen, keine geprüften Fakten. Sie können deshalb überzeugend formulierte, aber falsche Aussagen liefern. Ouyang et al. halten auch für ihre verbesserten Modelle fest, dass sie weiterhin einfache Fehler machen (Ouyang et al., 2022).

Ein zweites Risiko betrifft die Eingabe. Ein LLM unterscheidet nicht zuverlässig zwischen Anweisungen und Daten. Enthält ein verarbeitetes Dokument versteckte Anweisungen, kann das Modell ihnen folgen; dieses Angriffsmuster heißt [Prompt Injection](/glossar/prompt-injection/).

Gegenmaßnahmen liegen meist außerhalb des Modells: Antworten auf eigene Quellen stützen, Ausgaben über [Structured Output](/glossar/structured-output/) in ein festes Format zwingen, Regeln als [Guardrails](/glossar/guardrails/) prüfen und folgenreiche Aktionen per [Human-in-the-Loop](/glossar/human-in-the-loop/) freigeben lassen.

## Muss ein LLM in der Cloud laufen?

Nein. Die bekanntesten Modelle werden über die APIs ihrer Anbieter genutzt, es gibt aber auch frei verfügbare Modelle, deren Gewichte man herunterladen und auf eigener Hardware betreiben kann. Ein solches [lokales LLM](/glossar/lokales-llm/) behält die Daten im eigenen Netz, braucht aber passende Hardware und eigenen Betrieb.

Welches Modell passt, hängt von der Aufgabe ab. Für eng abgegrenzte Aufgaben wie die Extraktion aus einer Stellenanzeige oder die Einordnung einer Anfrage in feste Kategorien lohnt sich ein Test mit eigenen Beispielen, ob ein kleineres oder lokal betriebenes Modell die Anforderungen bereits erfüllt.
