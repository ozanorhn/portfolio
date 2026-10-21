---
{
  "status": "veroeffentlicht",
  "begriff": "Human in the Loop",
  "h1": "Human in the Loop: Menschliche Freigabe in KI-Automatisierungen",
  "thema": "agenten_mcp",
  "alternativeNamen": [
    "HITL",
    "menschliche Freigabe"
  ],
  "kurzdefinition": "Human in the Loop ist ein Vorgehen, bei dem ein Mensch an festgelegten Stellen eines automatisierten Ablaufs prüft, freigibt oder korrigiert.",
  "seoTitel": "Was bedeutet Human in the Loop? Erklärt",
  "seoBeschreibung": "Was ist Human in the Loop? Menschliche Freigabe in KI-Automatisierungen: Funktionsweise in n8n, Formen, Risiken, EU AI Act und Praxisbeispiele.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-21T12:00:00Z",
  "steckbriefAussagen": [
    "Human in the Loop ist ein Wartepunkt im Ablauf: Die Automatisierung hält an und läuft erst nach einer menschlichen Entscheidung weiter.",
    "Eine verlässliche Freigabe wird außerhalb des Modells erzwungen, etwa im Workflow, im Client oder in einem Sub-Workflow, nicht in einer Werkzeugbeschreibung.",
    "OWASP empfiehlt eine menschliche Freigabe für Aktionen mit hoher Wirkung, um zu große Handlungsfreiheit von KI-Systemen zu begrenzen.",
    "Freigaben gehören an Stellen mit echter Außenwirkung, weil zu viele Bestätigungen zu Gewöhnung und oberflächlicher Prüfung führen.",
    "Der EU AI Act verlangt in Artikel 14 menschliche Aufsicht für Hochrisiko-KI-Systeme."
  ],
  "steckbriefFakten": [
    {
      "label": "Freigabekanäle in n8n",
      "wert": "u. a. Chat, Slack, Discord, Telegram, Microsoft Teams, Gmail, Outlook (Stand: Oktober 2026)"
    },
    {
      "label": "Rechtsrahmen",
      "wert": "EU AI Act, Art. 14: menschliche Aufsicht für Hochrisiko-KI-Systeme"
    }
  ],
  "verwandteBegriffe": [
    "ki-agent",
    "prompt-injection",
    "n8n",
    "tool-calling"
  ],
  "verwandteArtikel": [
    "mcp-server-mit-n8n-erstellen"
  ],
  "verwandteProjekte": [
    "leistungsnachweis-automation",
    "ki-rechnungspruefung",
    "agentic-commerce-audit"
  ],
  "quellen": [
    {
      "titel": "n8n Docs: Human-in-the-loop for tools",
      "url": "https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "OWASP Top 10 for LLM Applications: LLM06 Excessive Agency",
      "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Anthropic: Building effective agents",
      "url": "https://www.anthropic.com/engineering/building-effective-agents",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "EU AI Act, Artikel 14: Menschliche Aufsicht (Textfassung bei artificialintelligenceact.eu)",
      "url": "https://artificialintelligenceact.eu/article/14/",
      "abgerufen": "2026-10-14"
    }
  ],
  "faq": [
    {
      "frage": "Was bedeutet Human in the Loop?",
      "antwort": "Human in the Loop bezeichnet ein Vorgehen, bei dem ein Mensch an festgelegten Stellen eines automatisierten Ablaufs prüft, freigibt oder korrigiert. Bei KI-Agenten betrifft das meist Aktionen mit Folgen, etwa das Versenden einer E-Mail, das Veröffentlichen eines Textes oder das Ändern von Daten. Der Agent bereitet vor, der Mensch entscheidet."
    },
    {
      "frage": "Wie setzt man Human in the Loop in n8n um?",
      "antwort": "n8n bietet für Tools am AI-Agent-Node eine eingebaute Freigabe, die vor dem Tool-Aufruf eine Bestätigung verlangt, etwa per Chat, Slack oder E-Mail. Für Abläufe ohne Agent lässt sich eine Freigabe mit einem Warte-Schritt bauen, der erst nach einer Antwort weiterläuft. Für Werkzeuge hinter dem MCP Server Trigger greift die eingebaute Freigabe nicht; dort setzt man sie im Client oder in einem Sub-Workflow."
    },
    {
      "frage": "Wann braucht eine KI-Automatisierung Human in the Loop?",
      "antwort": "Eine menschliche Freigabe ist sinnvoll, wenn ein Fehler schwer rückgängig zu machen ist oder Außenwirkung hat, etwa bei E-Mails an Kunden, Zahlungen, Veröffentlichungen oder Änderungen an Stammdaten. Bei rein lesenden oder leicht korrigierbaren Schritten bremst eine Freigabe eher. Viele Teams starten mit Freigabe und lockern sie, wenn der Ablauf nachweislich zuverlässig läuft."
    }
  ]
}
---

## Beispiel aus der Praxis

Ozan Orhans [Leistungsnachweis-Automation](/projekte/leistungsnachweis-automation/) erzeugt jeden Monat aus Zeiterfassungen in Toggl kundenspezifische Leistungsnachweise. Der n8n-Workflow startet aber nicht von selbst. Eine Slack-Nachricht fragt die Freigabe ab, und erst eine Reaktion darauf löst den Lauf aus. Über die Art der Reaktion wird zugleich der Zeitraum gewählt. Am Ende meldet der Workflow den Abschluss wieder in Slack.

Ein zweites Muster zeigt der [Grounding Page Generator](/projekte/grounding-page-generator/). Ein Research-Agent sammelt Fakten zu einer Entität und markiert Felder, bei denen er unsicher ist. Ein Mensch prüft und korrigiert die Werte auf Feldebene, bevor ein zweiter Modellaufruf daraus die fertige Seite erzeugt. Der zweite Aufruf arbeitet damit nur mit bestätigten Fakten.

Beide Fälle folgen demselben Prinzip: Die Automatisierung bereitet vor, der Mensch entscheidet an der Stelle, an der ein Fehler Folgen hätte.

## Wie funktioniert Human in the Loop technisch?

Technisch ist Human in the Loop ein Wartepunkt im Ablauf. Der Workflow oder [KI-Agent](/glossar/ki-agent/) hält an, schickt eine Anfrage an einen Menschen und läuft erst nach einer Antwort weiter. Je nach Antwort folgt die Aktion, ein anderer Pfad oder ein Abbruch.

In [n8n](/glossar/n8n/) gibt es dafür beim AI-Agent-Node eine eingebaute Freigabe für Tools. Sie lässt sich auf alle angeschlossenen Tools oder nur auf ausgewählte anwenden. Als Kanal stehen unter anderem der n8n-Chat, Slack, Discord, Telegram, Microsoft Teams, Gmail und Outlook zur Verfügung (n8n Docs, Stand: Oktober 2026).

Der Prüfer sieht, welches Tool der Agent nutzen will und mit welchen Parametern. Bei Zustimmung führt n8n das Tool mit genau diesen Eingaben aus. Bei Ablehnung wird die Aktion abgebrochen, und der Agent erfährt davon (n8n Docs, Stand: Oktober 2026). n8n empfiehlt, die Freigaberegeln zusätzlich im System Prompt zu beschreiben, damit der Agent sinnvoll auf eine Ablehnung reagiert.

Wichtig ist der Ort der Freigabe. Steht „frage vorher nach“ nur in einer Werkzeugbeschreibung, ist das eine Bitte an das Modell. Eine verlässliche Freigabe wird außerhalb des Modells erzwungen: im Workflow, im Client oder in einem Sub-Workflow. Wie das bei einem MCP-Server aussieht, zeigt der Artikel [n8n MCP Server erstellen](/blog/mcp-server-mit-n8n-erstellen/).

## Human in the Loop vs. Human on the Loop: Was ist der Unterschied?

Die Begriffe beschreiben, wie eng ein Mensch in einen automatisierten Ablauf eingebunden ist. Die Grenzen sind fließend, die Unterscheidung hilft aber bei der Planung.

| Modell | Rolle des Menschen | Zeitpunkt | Typischer Einsatz |
| --- | --- | --- | --- |
| Human in the Loop | Gibt einzelne Schritte aktiv frei | Vor der Aktion | E-Mails an Kunden, Veröffentlichungen, Zahlungen |
| Human on the Loop | Überwacht den Ablauf und greift bei Bedarf ein | Während oder nach der Aktion | Laufende Auswertungen, interne Berichte |
| Human out of the Loop | Keine Beteiligung im Einzelfall | Nur bei Einrichtung und Wartung | Rein lesende oder leicht korrigierbare Schritte |

Viele Abläufe kombinieren die Modelle. Lesende Werkzeuge laufen ohne Freigabe, schreibende Werkzeuge mit Freigabe, und der gesamte Ablauf wird über Protokolle überwacht.

## Welche Formen der menschlichen Freigabe gibt es?

**Freigabe vor dem Start:** Ein Mensch löst den gesamten Lauf bewusst aus, wie bei der Slack-Reaktion in der Leistungsnachweis-Automation. Das passt zu wiederkehrenden Abläufen mit klarem Zeitpunkt.

**Freigabe vor einem Werkzeugaufruf:** Der Agent darf planen und lesen, aber jede schreibende Aktion wartet auf Zustimmung. OWASP empfiehlt genau das für Aktionen mit hoher Wirkung, um das Risiko zu großer Handlungsfreiheit eines Systems zu begrenzen (OWASP, 2025).

**Prüfung auf Feldebene:** Der Mensch bestätigt oder korrigiert einzelne Werte, bevor sie weiterverarbeitet werden. Das eignet sich, wenn ein Modell Fakten recherchiert, die später veröffentlicht werden.

**Freigabe von Entwürfen:** Die Automatisierung erzeugt einen Entwurf, etwa eine Antwort-E-Mail oder einen Artikel, der erst nach Prüfung versendet oder veröffentlicht wird. Fehler bleiben so intern.

Anthropic beschreibt in seinem Leitfaden zu Agenten, dass Agenten an Kontrollpunkten oder bei Hindernissen für menschliches Feedback pausieren können, und empfiehlt Abbruchbedingungen wie eine maximale Zahl an Durchläufen (Anthropic, 2024).

Wo Freigaben in einer Agenten-Architektur sitzen sollten, behandelt der Artikel [KI-Agenten Sicherheit](/blog/ki-agenten-sicherheit-tuev-bsi-studie/).

## Welche Nachteile und Risiken hat Human in the Loop?

Jede Freigabe kostet Zeit. Wartet ein Ablauf auf eine Antwort, die nicht kommt, bleibt er stehen. Freigaben sollten deshalb an einen Kanal gehen, den die zuständige Person tatsächlich nutzt, und es sollte klar sein, wer vertritt.

Ein zweites Risiko ist Gewöhnung. Wer viele Freigaben am Tag bestätigt, prüft irgendwann nicht mehr genau. Der EU AI Act nennt dieses Problem ausdrücklich: Menschen sollen sich der Neigung bewusst bleiben, sich automatisch oder übermäßig auf die Ausgabe eines Systems zu verlassen, den sogenannten Automatisierungsbias (EU AI Act, Art. 14).

Daraus folgen zwei Regeln für die Praxis. Freigaben gehören nur an Stellen mit echter Außenwirkung, nicht an jeden Schritt. Und die Freigabeanfrage muss alle Informationen enthalten, die für eine Entscheidung nötig sind, etwa Empfänger, Inhalt und betroffene Daten.

## Schreibt der EU AI Act Human in the Loop vor?

Der EU AI Act verlangt in Artikel 14 menschliche Aufsicht für Hochrisiko-KI-Systeme. Sie sollen so gestaltet sein, dass Menschen sie während der Nutzung wirksam beaufsichtigen können. Dazu gehört, Ausgaben richtig zu deuten, sie zu übergehen oder rückgängig zu machen und das System über eine Stopp-Funktion sicher anzuhalten (EU AI Act, Art. 14).

Die meisten Automatisierungen im Büroalltag, etwa Berichte oder Entwürfe, fallen nicht automatisch in diese Kategorie. Ob ein System als Hochrisiko gilt, hängt vom Einsatzzweck ab und sollte im Einzelfall rechtlich geprüft werden. Unabhängig davon ist Human in the Loop eine bewährte technische Maßnahme, um Fehler von [KI-Agenten](/glossar/ki-agent/) und Folgen von [Prompt Injection](/glossar/prompt-injection/) abzufangen. Bei veröffentlichten KI-Texten kann eine nachweisbare menschliche Prüfung außerdem die Kennzeichnung nach [Art. 50 AI Act](/blog/art-50-ai-act-entwickler/) entbehrlich machen.
