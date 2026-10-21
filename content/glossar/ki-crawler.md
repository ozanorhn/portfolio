---
{
  "status": "veroeffentlicht",
  "begriff": "KI-Crawler",
  "h1": "KI-Crawler: GPTBot, ClaudeBot, PerplexityBot und Steuerung per robots.txt",
  "thema": "ki_sichtbarkeit",
  "alternativeNamen": [
    "AI Crawler",
    "KI-Bots",
    "AI Bots",
    "GPTBot",
    "ClaudeBot",
    "PerplexityBot"
  ],
  "kurzdefinition": "KI-Crawler ist die Sammelbezeichnung für automatisierte Programme von KI-Anbietern, die Webseiten abrufen, um Sprachmodelle zu trainieren, einen eigenen Suchindex für KI-Suchen aufzubauen oder Seiten im Auftrag eines Nutzers zu lesen.",
  "seoTitel": "KI-Crawler: GPTBot, ClaudeBot & Co. erklärt",
  "seoBeschreibung": "Was sind KI-Crawler? Tabelle der User-Agents von OpenAI, Anthropic, Perplexity, Google und Apple, Training vs. Suche und Steuerung per robots.txt.",
  "erstveroeffentlicht": "2026-10-19T09:00:00Z",
  "aktualisiert": "2026-10-19T09:00:00Z",
  "steckbriefAussagen": [
    "KI-Crawler sind automatisierte Programme von KI-Anbietern, die Webseiten für Training, Suche oder Nutzeranfragen abrufen.",
    "OpenAI, Anthropic und Perplexity trennen ihre Crawler nach Zweck: Training, Suchindex und Abruf im Auftrag eines Nutzers.",
    "Wer den Trainings-Crawler sperrt, sperrt nicht automatisch den Such-Crawler; beide werden in der robots.txt getrennt angesprochen.",
    "Google-Extended und Applebot-Extended sind reine Steuerungs-Token ohne eigenen Crawler und beeinflussen die Websuche nicht.",
    "Die robots.txt ist laut RFC 9309 keine Zugriffskontrolle; Abrufe im Auftrag eines Nutzers beachten sie teilweise nicht."
  ],
  "steckbriefFakten": [
    {
      "label": "Standard robots.txt",
      "wert": "RFC 9309, September 2022 (IETF)"
    },
    {
      "label": "Wirkung von robots.txt-Änderungen bei OpenAI-Suche",
      "wert": "etwa 24 Stunden (OpenAI-Doku, Stand Oktober 2026)"
    }
  ],
  "verwandteBegriffe": [
    "ki-sichtbarkeit",
    "llms-txt",
    "ki-suche",
    "geo-generative-engine-optimization",
    "ai-overviews",
    "llm"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [],
  "quellen": [
    {
      "titel": "OpenAI: Overview of OpenAI Crawlers",
      "url": "https://developers.openai.com/api/docs/bots",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Anthropic Help Center: Does Anthropic crawl data from the web, and how can site owners block the crawler?",
      "url": "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Perplexity Docs: Perplexity Crawlers",
      "url": "https://docs.perplexity.ai/guides/bots",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Google Search Central: Google's common crawlers",
      "url": "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "Apple Support: About Applebot",
      "url": "https://support.apple.com/en-us/119829",
      "abgerufen": "2026-10-19"
    },
    {
      "titel": "IETF RFC 9309: Robots Exclusion Protocol",
      "url": "https://www.rfc-editor.org/rfc/rfc9309.html",
      "abgerufen": "2026-10-19"
    }
  ],
  "faq": [
    {
      "frage": "Was ist GPTBot?",
      "antwort": "GPTBot ist der Crawler von OpenAI, der Inhalte abruft, die für das Training der generativen KI-Modelle von OpenAI verwendet werden können. Wer GPTBot in der robots.txt sperrt, signalisiert, dass die Inhalte nicht für das Training genutzt werden sollen. Für die Suche in ChatGPT ist ein anderer Crawler zuständig, OAI-SearchBot."
    },
    {
      "frage": "Wie blockiere ich KI-Crawler in der robots.txt?",
      "antwort": "In der robots.txt im Hauptverzeichnis wird für jeden Crawler ein eigener Block mit seinem Namen als User-agent und der Regel Disallow: / angelegt, etwa für GPTBot oder ClaudeBot. Weil die Anbieter Training und Suche über verschiedene Crawler abwickeln, lässt sich das Training sperren und die Suche erlauben. Abrufe im Auftrag eines Nutzers beachten die robots.txt teilweise nicht."
    },
    {
      "frage": "Sollte man KI-Crawler blockieren?",
      "antwort": "Das hängt vom Ziel ab. Wer verhindern will, dass Inhalte in das Training von Sprachmodellen einfließen, kann die Trainings-Crawler sperren. Wer in KI-Suchen wie ChatGPT, Claude oder Perplexity als Quelle erscheinen will, sollte deren Such-Crawler zulassen, sonst können die Seiten dort nicht gefunden und zitiert werden."
    },
    {
      "frage": "Beeinflusst Google-Extended das Ranking oder die KI-Übersichten?",
      "antwort": "Nein, laut Google beeinflusst Google-Extended weder die Aufnahme in die Google-Suche noch das Ranking. Das Token steuert, ob Inhalte für das Training künftiger Gemini-Modelle und für das Grounding in Gemini-Apps und Vertex AI genutzt werden dürfen. Die KI-Funktionen der Google-Suche werden über die normalen Regeln für Googlebot und Snippet-Steuerungen geregelt."
    }
  ]
}
---

## Beispiel aus der Praxis

Ein Fachverlag möchte, dass seine Artikel in KI-Suchen wie ChatGPT, Claude oder Perplexity als Quelle erscheinen. Gleichzeitig sollen die Texte nicht in das Training künftiger Sprachmodelle einfließen. Die bisherige robots.txt sperrt pauschal alle Bots mit „AI“ oder „GPT“ im Namen.

Bei der Prüfung zeigt sich: Damit sind auch die Such-Crawler ausgesperrt. Die Lösung ist eine robots.txt, die nach Zweck unterscheidet. Trainings-Crawler werden gesperrt, Such-Crawler zugelassen:

```
# Training ausschließen
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

# KI-Suchen zulassen
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

Danach prüft das Team in den Server-Logs, welche Crawler die Website tatsächlich abrufen, und misst über die [KI-Sichtbarkeit](/glossar/ki-sichtbarkeit/), ob die Artikel in KI-Antworten zitiert werden. Ob die Inhalte schon in früheren Trainingsdaten enthalten sind, lässt sich über die robots.txt nicht rückgängig machen.

## Welche KI-Crawler gibt es?

Die großen KI-Anbieter dokumentieren ihre Crawler öffentlich. Die folgende Tabelle enthält nur Angaben aus diesen Dokumentationen (Stand: Oktober 2026).

| User-Agent | Betreiber | Zweck laut Anbieter | Quelle |
| --- | --- | --- | --- |
| GPTBot | OpenAI | ruft Inhalte ab, die für das Training generativer KI-Modelle genutzt werden können | OpenAI-Doku |
| OAI-SearchBot | OpenAI | findet Websites für die Suchfunktionen von ChatGPT | OpenAI-Doku |
| ChatGPT-User | OpenAI | ruft Seiten auf, wenn Nutzer ChatGPT oder Custom GPTs eine Frage stellen; kein automatisches Crawling | OpenAI-Doku |
| ClaudeBot | Anthropic | sammelt öffentliche Webinhalte, die zum Training beitragen können | Anthropic Help Center |
| Claude-SearchBot | Anthropic | durchsucht das Web zur Verbesserung von Suchergebnissen | Anthropic Help Center |
| Claude-User | Anthropic | ruft Websites auf, wenn ein Nutzer Claude eine Frage stellt | Anthropic Help Center |
| PerplexityBot | Perplexity | findet und verlinkt Websites in den Suchergebnissen von Perplexity; laut Anbieter nicht für Training | Perplexity Docs |
| Perplexity-User | Perplexity | ruft Seiten auf, wenn ein Nutzer eine Frage stellt; laut Anbieter nicht für Training | Perplexity Docs |
| Google-Extended | Google | Steuerungs-Token ohne eigenen Crawler: Training künftiger Gemini-Modelle und Grounding in Gemini-Apps und Vertex AI | Google Search Central |
| Applebot-Extended | Apple | Steuerungs-Token ohne eigenen Crawler: Nutzung bereits gecrawlter Daten für das Training generativer Modelle von Apple | Apple Support |

Die Liste ist nicht vollständig. Weitere Anbieter betreiben eigene Crawler, und die Namen ändern sich gelegentlich. Maßgeblich ist jeweils die aktuelle Dokumentation des Anbieters.

## Was ist der Unterschied zwischen Trainings-Crawlern und Such-Crawlern?

KI-Crawler lassen sich nach drei Zwecken unterscheiden. Für die Steuerung ist das wichtiger als der Anbieter.

| Typ | Beispiele | Wofür die Inhalte genutzt werden | Folge einer Sperre |
| --- | --- | --- | --- |
| Training | GPTBot, ClaudeBot, Google-Extended, Applebot-Extended | Training künftiger Sprachmodelle | Inhalte sollen nicht in künftige Trainingsdaten einfließen |
| Suchindex | OAI-SearchBot, Claude-SearchBot, PerplexityBot | Index für [KI-Suchen](/glossar/ki-suche/) | Seiten erscheinen dort nicht oder seltener als Quelle |
| Nutzerabruf | ChatGPT-User, Claude-User, Perplexity-User | Abruf einer Seite während einer konkreten Anfrage | Seite kann nicht live gelesen werden, sofern der Crawler die Sperre beachtet |

OpenAI schreibt, dass eine Sperre von OAI-SearchBot eine Website aus Suchantworten in ChatGPT heraushält, sie aber weiterhin als Navigationslink erscheinen kann (OpenAI, Stand Oktober 2026). Anthropic weist darauf hin, dass eine Sperre von Claude-SearchBot oder Claude-User die Sichtbarkeit in Suchergebnissen von Claude verringern kann (Anthropic, Stand Oktober 2026).

## Wie steuert man KI-Crawler mit der robots.txt?

Die robots.txt liegt im Hauptverzeichnis einer Domain und enthält Regeln je User-Agent. Der Standard ist seit September 2022 als RFC 9309 beschrieben (IETF). Jeder Crawler wird über seinen dokumentierten Namen angesprochen, wie im Beispiel oben.

Einige Besonderheiten aus den Dokumentationen:

- **Wartezeit:** OpenAI gibt an, dass Änderungen an der robots.txt für die Suche etwa 24 Stunden brauchen, bis sie wirken (OpenAI, Stand Oktober 2026).
- **Nutzerabrufe:** Für ChatGPT-User gelten robots.txt-Regeln laut OpenAI möglicherweise nicht, weil die Abrufe von Nutzern ausgelöst werden. Perplexity schreibt, dass Perplexity-User die robots.txt aus demselben Grund in der Regel ignoriert (Stand Oktober 2026).
- **Crawl-delay:** Anthropic unterstützt die nicht standardisierte Regel Crawl-delay, um die Abrufrate zu begrenzen (Anthropic, Stand Oktober 2026). RFC 9309 definiert diese Regel nicht.
- **Subdomains:** Die robots.txt gilt je Host. Anthropic weist darauf hin, dass die Regeln für jede Subdomain einzeln gesetzt werden müssen.
- **IP-Sperren:** Anthropic rät davon ab, seine IP-Adressen zu blockieren, weil die Crawler dann die robots.txt nicht lesen können und der Ausschluss nicht zuverlässig greift.

Die robots.txt ist keine Zugriffskontrolle. RFC 9309 stellt ausdrücklich klar, dass die Regeln keine Form der Zugangsberechtigung sind. Wer Inhalte wirklich schützen muss, braucht Authentifizierung oder serverseitige Sperren.

## Wie verhalten sich Google-Extended und Googlebot zu KI-Funktionen?

Google-Extended ist ein Token in der robots.txt, kein eigener Crawler. Laut Google hat es keinen eigenen User-Agent-String; gecrawlt wird mit den bestehenden Google-Crawlern (Google Search Central, Stand Oktober 2026).

Das Token steuert, ob von Google gecrawlte Inhalte für das Training künftiger Gemini-Modelle und für das Grounding in Gemini-Apps und Vertex AI verwendet werden. Auf die Aufnahme in die Google-Suche und das Ranking hat es laut Google keinen Einfluss.

Die [KI-Übersichten](/glossar/ai-overviews/) und der [KI-Modus](/glossar/google-ki-modus/) gehören zur Google-Suche und werden über Googlebot sowie die Snippet-Steuerungen nosnippet, data-nosnippet, max-snippet und noindex geregelt (Google Search Central, Stand Oktober 2026). Wer dort nicht erscheinen will, muss also diese Mittel nutzen, nicht Google-Extended.

## Welche Fehler gibt es beim Umgang mit KI-Crawlern?

**Alle KI-Crawler werden pauschal gesperrt.** Damit verschwinden Seiten auch aus KI-Suchen, obwohl oft nur das Training ausgeschlossen werden sollte.

**Die llms.txt wird als Steuerdatei verstanden.** Die [llms.txt](/glossar/llms-txt/) ist eine Lesehilfe für Modelle und erlaubt oder verbietet nichts. Zugriffsregeln gehören in die robots.txt.

**Falsche Schreibweisen.** Ein User-Agent, den kein Crawler verwendet, bleibt wirkungslos. Die Namen sollten aus der Dokumentation des Anbieters übernommen werden.

**Server-Logs werden nicht geprüft.** Erst die Logs zeigen, welche Crawler eine Website tatsächlich abrufen und ob sie Sperren beachten.
