# KI-Verweise auswerten

Wie sich messen lässt, ob KI-Assistenten auf ozan-orhan.com verweisen, und wo die Grenzen liegen.
Die Website verspricht keine Wirkung auf externe KI-Systeme; diese Datei beschreibt nur, was sich
beobachten lässt.

## Vier Dinge, die getrennt bleiben müssen

| Was passiert | Wo es sichtbar wird | Was es **nicht** beweist |
|---|---|---|
| 1. Ein Bot ruft eine Seite ab (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended …) | Server-Logs (Apache-Access-Log, User-Agent) | dass die Seite in einer Antwort vorkommt |
| 2. Eine KI-Antwort nennt Ozan Orhan | nur durch Abfragen der Assistenten selbst (manuell oder per Monitoring-Werkzeug) | dass die Website als Quelle verlinkt ist |
| 3. Die Antwort verlinkt ozan-orhan.com | ebenfalls nur in der Antwort selbst | dass jemand klickt |
| 4. Ein Mensch klickt den Link | GA4, nur mit Analytics-Einwilligung | wie oft der Name ohne Klick genannt wurde |

GA4 sieht ausschließlich Fall 4, und auch den nur unvollständig (siehe Grenzen).

## GA4: KI-Verweise erkennen

Das Tracking läuft über den GTM-Container `GTM-P455HJW3` mit Consent Mode
(`src/app/core/consent.service.ts`). Ohne Einwilligung wird nichts gesendet.

1. **Explorative Datenanalyse** anlegen, Dimensionen *Sitzungsquelle*, *Seitenverweis* und
   *Landingpage + Abfragestring*, Messwerte *Sitzungen*, *Engagierte Sitzungen*, *Schlüsselereignisse*.
2. Filter *Sitzungsquelle* entspricht regulärem Ausdruck:

   ```
   chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|bing\.com/chat|you\.com|phind\.com|kagi\.com
   ```

3. Optional eine **eigene Channel-Gruppe** „KI-Assistenten“ mit derselben Regel, oberhalb von
   „Referral“ einsortiert, damit diese Sitzungen nicht im allgemeinen Verweis-Kanal untergehen.
4. ChatGPT hängt bei Links oft `utm_source=chatgpt.com` an; das landet automatisch in der
   Sitzungsquelle.
5. Relevante Ereignisse für die Bewertung: `contact_email_click`, `linkedin_profile_click`,
   `portfolio_project_view` (`src/app/core/analytics.service.ts`). Der Parameter `link_location`
   zeigt den Bereich (z. B. `hero`, `kontakt`, `footer`).

## Grenzen

- Viele Klicks aus Apps (ChatGPT-Desktop/-Mobil, Copilot) kommen **ohne Referrer** an und landen
  in GA4 als „Direct“. Die Zahl aus GA4 ist eine Untergrenze.
- Besucher ohne Einwilligung fehlen vollständig.
- Google AI Overviews und AI Mode erscheinen als `google / organic` und lassen sich in GA4 nicht
  von normalen Suchklicks trennen.
- Bot-Abrufe (Fall 1) lassen sich nur in den Server-Logs auswerten, nicht in GA4. Ein Abruf durch
  `ChatGPT-User` oder `Claude-User` deutet auf eine konkrete Nutzeranfrage hin, ein Abruf durch
  `GPTBot` oder `ClaudeBot` nur auf Crawling.
- `llms.txt` ist ein Angebot an Antwortsysteme; ob ein System sie liest, ist nicht belegt.

## Falsches Profilbild in KI-Antworten

Was auf der eigenen Website kontrolliert werden kann, ist umgesetzt: ein einziges Porträt
(`/assets/img/ozan.jpg`), als `Person.image` mit `@id …/#portraet`, gleicher Alt-Text und gleiche
Bildunterschrift, das OG-Bild zeigt dasselbe Foto. Die alte Datei `/assets/img/ozan.png` liegt noch
auf dem Server und zeigt dieselbe Person. Welches Foto ein externes System anzeigt, entscheidet
dieses System; zu prüfen bleiben die eigenen Profile (LinkedIn, GitHub, arcnode) auf dasselbe Bild.
