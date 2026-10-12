# Recruiter-Tracking: Einrichtung in GTM und GA4

Container `GTM-P455HJW3` · GA4-Mess-ID `G-MKSQ72NYTS` · Stand Oktober 2026

Die Website schreibt Ereignisse in den `dataLayer`. GTM wandelt sie in GA4-Ereignisse um.
Das bestehende **Google-Tag mit `G-MKSQ72NYTS` bleibt unverändert** und ist die einzige
GA4-Basisintegration. Die Ereignis-Tags unten senden nur zusätzliche Ereignisse über dieses Tag.

## 1. Implementierte Ereignisse

Code: `src/app/core/analytics.service.ts` (Service und Klick-Listener),
`src/app/pages/projekt/projekt.ts` (Fallstudien).

| Ereignis | Auslöser | Parameter |
|---|---|---|
| `contact_email_click` | Klick auf einen `mailto:`-Link zu `contact@ozan-orhan.com` | `link_location` |
| `linkedin_profile_click` | Klick auf einen Link zum eigenen LinkedIn-Profil | `link_location` |
| `portfolio_project_view` | Aufruf einer Fallstudie `/projekte/<slug>/` (direkt oder per Navigation) | `project_slug`, `project_name`, `project_category` |

**`link_location`**, der Bereich des Links:

| Wert | Wo |
|---|---|
| `hero` | Einstieg der Startseite |
| `kontakt` | Kontaktbereich der Startseite |
| `footer` | Fußzeile auf allen Seiten |
| `autor` | Autorenbox in Blogartikeln |
| `inhalt` | übrige Fundstellen: Faktenseite, Impressum, Datenschutz |

Die Seite selbst liefert GA4 automatisch über `page_location`.

**`project_category`**:

| Wert | Bedeutung |
|---|---|
| `kern` | Kernarbeiten |
| `weitere` | Unternehmensarbeit |
| `ausbildung` | Developer Akademie |

**Nicht implementiert, weil die Funktion fehlt:**
- `generate_lead`: Es gibt kein Kontaktformular.
- `cv_download`: Es wird kein Lebenslauf angeboten.

Platzhalter wurden bewusst nicht gebaut.

Es werden keine personenbezogenen Daten übertragen: keine E-Mail-Adresse, kein Name, keine
Telefonnummer, keine Inhalte.

## 2. GTM: Variablen

Unter **Variablen → Benutzerdefiniert → Neu → Datenschichtvariable**, jeweils Version 2:

| Variablenname | Name der Datenschichtvariable |
|---|---|
| `DLV - link_location` | `link_location` |
| `DLV - project_slug` | `project_slug` |
| `DLV - project_name` | `project_name` |
| `DLV - project_category` | `project_category` |

## 3. GTM: Trigger

Unter **Trigger → Neu → Benutzerdefiniertes Ereignis**, „Alle benutzerdefinierten Ereignisse“:

| Triggername | Ereignisname (exakt) |
|---|---|
| `CE - contact_email_click` | `contact_email_click` |
| `CE - linkedin_profile_click` | `linkedin_profile_click` |
| `CE - portfolio_project_view` | `portfolio_project_view` |

## 4. GTM: GA4-Ereignis-Tags

Unter **Tags → Neu → Google Analytics: GA4-Ereignis**. Als Mess-ID `G-MKSQ72NYTS` eintragen.
Es wird **kein** neues Google-Tag (Konfigurations-Tag) angelegt.

| Tag | Ereignisname | Ereignisparameter | Trigger |
|---|---|---|---|
| `GA4 - contact_email_click` | `contact_email_click` | `link_location` = `{{DLV - link_location}}` | `CE - contact_email_click` |
| `GA4 - linkedin_profile_click` | `linkedin_profile_click` | `link_location` = `{{DLV - link_location}}` | `CE - linkedin_profile_click` |
| `GA4 - portfolio_project_view` | `portfolio_project_view` | `project_slug`, `project_name`, `project_category` = jeweilige DLV | `CE - portfolio_project_view` |

Für jedes Tag unter **Erweiterte Einstellungen → Einwilligungseinstellungen**
„Zusätzliche Einwilligung erforderlich“ wählen und `analytics_storage` eintragen. Danach eine
Vorschau starten (Abschnitt 7) und erst dann veröffentlichen.

## 5. GA4: Benutzerdefinierte Dimensionen und Key-Events

Unter **Verwaltung → Benutzerdefinierte Definitionen → Dimension erstellen**, Umfang „Ereignis“:
`link_location`, `project_slug`, `project_name`, `project_category`.
Ohne diese Dimensionen erscheinen die Parameter nicht in Berichten.

Empfohlene **Key-Events** (Verwaltung → Ereignisse, nach dem ersten Eingang markieren):

| Ereignis | Key-Event? | Warum |
|---|---|---|
| `contact_email_click` | **ja** | direkte Kontaktabsicht |
| `linkedin_profile_click` | **ja** | typischer Weg von Recruitern zur Kontaktaufnahme |
| `portfolio_project_view` | nein | Interessensignal, keine Konversion; für Explorationen nutzen |

## 6. Einwilligung und doppelte Ereignisse

- Die Website schreibt Ereignisse **nur nach „Alle akzeptieren“** in den `dataLayer`. Vorher
  existiert der `dataLayer` gar nicht.
- Nach Ablehnung oder Widerruf wird nichts gepuffert und nichts nachträglich übertragen. Ein
  Widerruf löscht die Google-Cookies und lädt die Seite neu.
- Die Einwilligungseinstellung `analytics_storage` an den Tags ist eine zweite Sicherung.
- Wer auf einer Fallstudie landet und erst dort zustimmt, für den wird diese Fallstudie
  **nicht** rückwirkend als `portfolio_project_view` gemeldet. Der normale `page_view` des
  Google-Tags erfasst den Aufruf trotzdem.
- **Doppelte Ereignisse vermeiden:**
  - Für diese drei Ereignisse **keine** zusätzlichen GTM-Klick-Trigger („Nur Links“) anlegen.
    Die Website meldet sie bereits.
  - Die erweiterte Messung von GA4 erfasst „Ausgehende Links“ als eigenes Ereignis `click`,
    also auch LinkedIn. Das ist kein Duplikat von `linkedin_profile_click`, sollte aber nicht
    zusätzlich als Key-Event markiert werden.
  - Unter **Erweiterte Messung → Seitenaufrufe** muss „Seitenänderungen basierend auf
    Browserverlaufsereignissen“ aktiv sein, damit Navigationen innerhalb der Website als
    `page_view` zählen. Projektaufrufe werden zusätzlich als `portfolio_project_view` gezählt;
    das ist gewollt, weil es ein eigenes Ereignis ist und kein zweiter `page_view`.

## 7. Testanleitung

1. In GTM **Vorschau** öffnen und `https://ozan-orhan.com` verbinden (Tag Assistant).
2. Im Banner **„Alle ablehnen“** wählen. Danach darf in Tag Assistant **kein** Container
   ankommen.
3. Unten auf der Seite **„Cookie-Einstellungen“ → „Alle akzeptieren“** wählen. Danach lädt der
   Container, und die Einwilligung steht auf `analytics_storage: granted`.
4. Prüfen, dass jeweils genau **ein** Ereignis mit dem passenden Tag erscheint:
   - Startseite: Mail-Symbol oben → `contact_email_click` mit `link_location = hero`.
   - Kontaktbereich: Mail- und LinkedIn-Link → Ereignisse mit `kontakt`.
   - Fußzeile: LinkedIn → `linkedin_profile_click` mit `footer`.
   - Eine Fallstudie öffnen, „Nächstes Projekt“ klicken, dann zurück → je ein
     `portfolio_project_view`.
   - Die Projektliste `/projekte/` darf kein Projektereignis auslösen.
   Es müssen keine echten E-Mails verschickt werden: Das Mailprogramm öffnet sich nur, einfach
   schließen.
5. In GA4 unter **Verwaltung → DebugView** dieselben Ereignisse mit ihren Parametern prüfen.
6. Den Widerruf testen: „Cookie-Einstellungen“ → „Alle ablehnen“. Danach lädt die Seite neu,
   sendet keine Ereignisse mehr, und die `_ga`-Cookies sind gelöscht (DevTools → Application →
   Cookies).

## 8. Hinweis zu einem Testtreffer

Bei der lokalen Prüfung am 12.10.2026 ging versehentlich **ein** `page_view` von Hostname
`127.0.0.1` an `G-MKSQ72NYTS`. Es war ein Seitenaufruf ohne eigene Ereignisse. Optional kannst
du ihn in Berichten mit dem Filter „Hostname ist nicht `127.0.0.1`“ ausblenden oder unter
Datenfilter einen Filter für internen Traffic anlegen.
