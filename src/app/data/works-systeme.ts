// Fallstudien zu KI-Systemen aus dem Unternehmenskontext und eigener Infrastruktur.
// Grundlage: Workflow-Definitionen, Ausführungsprotokolle und Projektdokumentation.
// Keine Kundennamen, Domains, Endpunkte oder internen Kennungen; keine Kennzahlen ohne Beleg.
import type { Work } from './works';

export const SYSTEME: Work[] = [
  {
    slug: 'agentic-commerce-audit',
    seoTitel: 'Agentic Commerce Audit mit n8n und LLM-Abfragen',
    seoBeschreibung:
      'Fallstudie: Eine n8n-Prozesskette steuert Bestellung, Briefing und einen Audit-Worker, der Kauffragen an ChatGPT, Gemini und Perplexity stellt.',
    nr: '',
    titel: 'Agentic Commerce Audit',
    kicker: 'Workflow-Orchestrierung · LLM-Abfragen · Audit-Worker',
    lede:
      'Eine Prozesskette von der Bestellung bis zum fertigen Analyse-Deck: n8n steuert Status, ' +
      'Daten und Freigaben, ein eigener Worker misst, wie KI-Assistenten auf Kauffragen antworten.',
    status: 'Live im Testbetrieb seit Oktober 2026',
    gruppe: 'kern',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'n8n', 'Webhooks', 'monday API', 'Claude Sonnet', 'DataForSEO LLM-Abfragen',
      'ChatGPT · Gemini · Perplexity', 'JavaScript', 'n8n Data Tables', 'Docker',
    ],
    fluss: [
      { label: 'Bestellung', note: 'Webhook' },
      { label: 'Kauffragen-Entwurf', note: 'Claude' },
      { label: 'Briefing', note: 'Formular' },
      { label: 'Freigabe', note: 'Statuswechsel' },
      { label: 'Audit-Worker', note: 'eigener Server' },
      { label: 'Review', note: 'Mensch' },
    ],
    karte: {
      problem:
        'Ein Audit, das prüft, ob KI-Assistenten einen Onlineshop finden und empfehlen, bestand ' +
        'aus vielen Handgriffen zwischen Bestellung, Datenerhebung und Bericht.',
      beitrag:
        'Ich habe die automatisierte Strecke gebaut: Webhooks, Statusmaschine, Worker-Anbindung, ' +
        'Doppelstart-Schutz, Hänger-Erkennung und Fehlermeldungen am Auftrag.',
    },
    ausgangspunkt: [
      'Das Audit beantwortet eine neue Frage: Wie antworten ChatGPT, Gemini und Perplexity, wenn ' +
        'jemand eine echte Kauffrage stellt, und wird der untersuchte Shop dabei genannt? Dazu ' +
        'kommt eine technische Prüfung, ob der Shop für KI-Crawler und Agenten lesbar ist.',
      'Ohne Automatisierung hätte jedes Audit Bestellung, Datenerfassung, Abfragen an mehrere ' +
        'Modelle, Auswertung und Berichtserstellung von Hand verbunden.',
    ],
    ueberblick: [
      'Die Strecke besteht aus mehreren n8n-Workflows, die über Webhooks verkettet sind, und einem ' +
        'Audit-Worker, der als Container auf einem separaten Server läuft. Ein Projektboard dient ' +
        'als Statusmaschine: Jeder Auftrag durchläuft feste Zustände von Neu über Briefing und ' +
        'In Arbeit bis Review.',
    ],
    beitrag: [
      'Ich habe die automatisierte Prozesskette entwickelt: die n8n-Workflows für Vormerkung, ' +
        'Bestellung, Briefing, Audit-Start, Worker-Rückmeldung und Hänger-Erkennung sowie den ' +
        'vorgelagerten Quick-Check als Proxy zu einem eigenen Prüfdienst.',
      'Die Zahlungsanbindung hat ein Kollege übernommen. Prüfkriterien und Produktkonzept sind ' +
        'im Team entstanden.',
    ],
    architektur: [
      'Eine Bestellung kommt per Webhook an, wird normalisiert und parallel in eine Tabelle, als ' +
        'Element im Projektboard und als Bestätigung an den Kunden geschrieben. Anschließend ' +
        'erzeugt Claude aus Shop und Kategorie einen Entwurf mit Kauffragen, Faktenfragen und ' +
        'Wettbewerbern als JSON. Der Entwurf wird im Briefing mit dem Kunden abgestimmt; das ' +
        'Briefing-Formular schreibt die Antworten an denselben Auftrag.',
      'Der Audit-Lauf startet, wenn ein Mensch den Status auf „In Arbeit“ setzt. Ein ' +
        'Board-Webhook ruft n8n auf; n8n prüft Board, Spalte und Status, verhindert einen ' +
        'Doppelstart und beauftragt den Worker über eine authentifizierte Schnittstelle. Der ' +
        'Worker stellt die Kauffragen an ChatGPT, Gemini und Perplexity, wertet Nennungen, Rang ' +
        'und zitierte Quellen aus, prüft den Shop und erzeugt ein Analyse-Deck.',
      'Nach Abschluss meldet sich der Worker per authentifiziertem Webhook zurück. n8n schließt ' +
        'den Lauf in einer eigenen Lauf-Tabelle ab und schreibt Fehler mit Schritt und Ursache ' +
        'als Update an den Auftrag.',
    ],
    entscheidungen: [
      {
        titel: 'Der Mensch startet den teuren Schritt',
        text:
          'Der Audit-Worker läuft nicht automatisch nach der Bestellung, sondern erst nach einem ' +
          'Statuswechsel durch einen Menschen. Briefing und Kauffragen sind dann abgestimmt, und ' +
          'Modellkosten entstehen nur für bestätigte Aufträge. Das fertige Deck geht erst nach ' +
          'einem Review an den Kunden.',
      },
      {
        titel: 'Doppelstart-Schutz über eine Lauf-Tabelle',
        text:
          'Board-Webhooks können mehrfach feuern. Bevor der Worker beauftragt wird, prüft n8n, ob ' +
          'für denselben Auftrag bereits ein laufender Audit jünger als drei Stunden existiert. ' +
          'Erst danach wird der Lauf mit Job-ID gespeichert.',
      },
      {
        titel: 'Hänger-Wache gegen verlorene Rückmeldungen',
        text:
          'Ein Zeitplan-Workflow prüft alle 15 Minuten Läufe, die länger als 90 Minuten laufen, ' +
          'und fragt den Worker nach dem Job-Status. Ist der Job fertig, aber die Rückmeldung ' +
          'verloren gegangen, wird das Ende nachgetragen. Echte Hänger erzeugen genau eine ' +
          'Warnung am Auftrag; ein Flag verhindert Wiederholungen.',
      },
      {
        titel: 'Fehler landen dort, wo gearbeitet wird',
        text:
          'Fehlschläge beim Start oder im Worker erzeugen ein Update direkt am Auftrag, mit ' +
          'Job-ID, Schritt und Fehlermeldung. Niemand muss dafür in die Workflow-Protokolle schauen.',
      },
      {
        titel: 'Ausfälle von Nebendiensten brechen die Bestellung nicht ab',
        text:
          'Antwortet der Prüfdienst nicht oder liefert das Modell unlesbares JSON, läuft die ' +
          'Bestellung trotzdem durch. Der interne Hinweis meldet dann, dass ein Teilergebnis fehlt.',
      },
    ],
    ergebnis: [
      'Seit Oktober 2026 läuft die Strecke im Testbetrieb mit echten Durchläufen. Audit-Start, ' +
        'Worker-Rückmeldung und Hänger-Wache laufen in den protokollierten Ausführungen ohne ' +
        'Fehler, der vorgelagerte Quick-Check wird regelmäßig genutzt.',
      'Zwischen Bestellung und fertigem Analyse-Deck stehen nur noch zwei menschliche ' +
        'Entscheidungen: die Freigabe des Laufs und das Review des Ergebnisses.',
    ],
    erkenntnisse: [
      'Öffentliche Webhooks brauchen dieselbe Sorgfalt wie eine API. Vor dem regulären Betrieb ' +
        'stehen noch Härtungen an einzelnen Eingängen der Strecke an.',
      'Eine schlanke Lauf-Tabelle mit Status, Startzeit und Warn-Flag hat mehr Betriebssicherheit ' +
        'gebracht als zusätzliche Retries.',
    ],
  },

  {
    slug: 'seo-agent-multi-agent-system',
    seoTitel: 'SEO-Agent mit Multi-Agent-System, MCP und Slack',
    seoBeschreibung:
      'Fallstudie: Ein selbst gehosteter SEO-Agent auf dem Hermes-Framework mit Skills, Datenzugriff über MCP, Slack-Anbindung und einem Multi-Agent-Testlauf.',
    nr: '',
    titel: 'SEO-Agent mit Multi-Agent-System',
    kicker: 'Agent-Framework · MCP · Multi-Agent · Slack',
    lede:
      'Ein selbst gehosteter Agent, der wiederkehrende SEO-Aufgaben übernimmt: Daten über MCP ' +
      'abrufen, nach festen Skills auswerten und Ergebnisse in Slack liefern.',
    status: 'Im Einsatz, Skills werden laufend nachgeschärft',
    gruppe: 'kern',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'Hermes Agent Framework', 'Claude Sonnet', 'MCP', 'Slack', 'Python', 'n8n',
      'Google Search Console', 'SEO-Daten-APIs',
    ],
    fluss: [
      { label: 'Anfrage', note: 'Slack oder Zeitplan' },
      { label: 'Agent', note: 'Skill wählen' },
      { label: 'Daten', note: 'MCP-Tools' },
      { label: 'Auswertung', note: 'Skill-Logik' },
      { label: 'Ergebnis', note: 'Slack / Dokument' },
      { label: 'Freigabe', note: 'vor jeder Änderung' },
    ],
    karte: {
      problem:
        'Wiederkehrende SEO-Aufgaben wie Keyword-Recherche, OnPage-Checks und Zielüberprüfungen ' +
        'banden viel Zeit, obwohl sie festen Mustern folgen.',
      beitrag:
        'Ich habe den Agenten auf dem Server aufgesetzt, Datenquellen über MCP angebunden, Skills ' +
        'geschrieben und eine Multi-Agent-Variante mit Kritiker-Rolle getestet.',
    },
    ausgangspunkt: [
      'Viele SEO-Aufgaben folgen festen Abläufen: Daten aus Suchkonsole und SEO-Tools holen, nach ' +
        'Vorgaben auswerten, eine Empfehlung formulieren. Diese Arbeit sollte ein Agent ' +
        'übernehmen, der im gewohnten Chat erreichbar ist und dessen Ergebnisse geprüft werden, ' +
        'bevor etwas live geht.',
    ],
    ueberblick: [
      'Der Agent läuft auf dem quelloffenen Hermes-Framework auf einem eigenen Server. Aufgaben ' +
        'sind als versionierte Skills in Markdown beschrieben, Datenquellen sind über MCP ' +
        'angebunden, und das Team spricht den Agenten über Slack an.',
    ],
    beitrag: [
      'Ich habe das Grundgerüst aufgesetzt, die Modellanbindung eingerichtet, die Skills und ' +
        'begleitende Python-Skripte geschrieben und die Datenquellen über MCP angebunden. Für die ' +
        'Zielüberprüfung habe ich die n8n-Gegenstelle gebaut.',
      'Für eine Multi-Agent-Variante habe ich ein Rollenmodell entworfen und in einem Testlauf ' +
        'erprobt. Fachliche Vorgaben für einzelne Aufgaben kamen aus dem SEO-Team.',
    ],
    architektur: [
      'Jeder Skill beschreibt eine Aufgabe mit Eingaben, Arbeitsschritten und Ausgabevorlage, ' +
        'etwa Keyword-Recherche, OnPage-Prüfung, Nachoptimierung oder Content-Briefing. Der ' +
        'Agent wählt anhand der Anfrage den passenden Skill, ruft die nötigen Daten über ' +
        'MCP-Tools ab und liefert das Ergebnis als Nachricht oder Dokument.',
      'Für die Zielüberprüfung arbeitet der Agent mit n8n zusammen: Er ruft im Zwei-Wochen-Takt ' +
        'einen Webhook auf. n8n liest die beobachteten URLs, vergleicht für jede URL ' +
        'Suchkonsolen- und Rankingdaten zweier Zeiträume, bewertet den Trend und antwortet ' +
        'synchron mit einer Zusammenfassung, die der Agent in Slack postet.',
      'In der Multi-Agent-Variante verteilt ein Orchestrator eine Analyse auf spezialisierte ' +
        'Rollen für Strategie, OnPage, Technik und KI-Sichtbarkeit. Eine Kritiker-Rolle prüft ' +
        'die Ergebnisse, bevor sie zusammengeführt werden.',
    ],
    entscheidungen: [
      {
        titel: 'Skills als versionierte Markdown-Dateien',
        text:
          'Eine Aufgabe ist eine lesbare Datei, keine verstreute Prompt-Logik. Das Team kann ' +
          'Vorgaben nachvollziehen und korrigieren, und Änderungen sind versioniert. Aus ' +
          'Korrekturen im Chat leitet der Agent angepasste Skills ab.',
      },
      {
        titel: 'Auswertung in n8n, Kommunikation im Agenten',
        text:
          'Bei der Zielüberprüfung übernimmt n8n die deterministische Datenbeschaffung und den ' +
          'Trendvergleich, der Agent Auslösung und Kommunikation. Die Rechenlogik bleibt dadurch ' +
          'testbar und unabhängig vom Modell.',
      },
      {
        titel: 'Signale abstimmen statt einer Schwelle folgen',
        text:
          'Die Trendbewertung sammelt Richtungssignale aus Klicks und Rankings und entscheidet ' +
          'per Mehrheit: besser, schlechter, gemischt oder stabil. Gemeldet werden nur klare Trends.',
      },
      {
        titel: 'Lesen ja, schreiben nur mit Freigabe',
        text:
          'Der Agent liest Daten und erstellt Empfehlungen. Änderungen an Websites oder im CMS ' +
          'macht er nicht selbstständig; jede schreibende Aktion braucht eine menschliche Freigabe.',
      },
    ],
    ergebnis: [
      'Der Agent ist im Team im Einsatz und übernimmt wiederkehrende SEO-Aufgaben nach ' +
        'festgelegten Skills. Der Multi-Agent-Testlauf lieferte Ergebnisse, die für die interne ' +
        'Priorisierung freigegeben wurden; ins CMS geht nichts ohne menschliche Freigabe.',
    ],
    erkenntnisse: [
      'Die Qualität hängt weniger am Modell als an klar geschriebenen Skills mit Beispielen und ' +
        'Ausgabevorlagen.',
      'Eine Kritiker-Rolle fängt Fehler ab, kostet aber Laufzeit. Für Routineaufgaben reicht ' +
        'meist ein einzelner Agent mit gutem Skill.',
    ],
  },

  {
    slug: 'mcp-plattform-self-hosted',
    seoTitel: 'MCP-Plattform mit OAuth und Passkey-Freigabe',
    seoBeschreibung:
      'Fallstudie: Ein MCP-Server über Streamable HTTP mit OAuth, Docker, Caddy und Cloudflare. Änderungen laufen über Vorschau, Freigabe per Passkey und Anwendung.',
    nr: '',
    titel: 'MCP-Plattform, selbst gehostet',
    kicker: 'MCP · OAuth · Docker · Human-in-the-loop',
    lede:
      'Eine eigene Plattform, über die KI-Agenten Projekte auf meinem Server verwalten können: ' +
      'jede Änderung erst als Vorschau, dann Freigabe per Passkey, dann Anwendung.',
    status: 'Eigenes Infrastrukturprojekt, in Betrieb, Ausbau läuft',
    gruppe: 'kern',
    kontext: 'Eigenes Engineering-Projekt',
    stack: [
      'Python', 'MCP (Streamable HTTP)', 'OAuth', 'Docker Compose', 'Caddy', 'Cloudflare',
      'Passkeys', 'Debian',
    ],
    sprachen: ['Python'],
    fluss: [
      { label: 'Agent', note: 'MCP-Client' },
      { label: 'OAuth', note: 'Anmeldung' },
      { label: 'MCP-Server', note: 'Tools' },
      { label: 'Vorschau', note: 'Prüfung' },
      { label: 'Freigabe', note: 'Passkey' },
      { label: 'Anwendung', note: 'Docker' },
    ],
    karte: {
      problem:
        'KI-Agenten sollen Projekte auf einem Server anlegen und ausrollen können, ohne ' +
        'unkontrollierten Zugriff auf das System zu bekommen.',
      beitrag:
        'Ich habe die Plattform entworfen, gebaut und betreibe sie: MCP-Server mit OAuth, ' +
        'Freigabe per Passkey, Container-Deployments, Backups und gestufte Tests.',
    },
    ausgangspunkt: [
      'Ich wollte Agenten wie ChatGPT oder Claude nutzen, um kleine Projekte auf meinem eigenen ' +
        'Server anzulegen, zu ändern und auszurollen. Ein direkter Shell-Zugang für ein ' +
        'Sprachmodell kam dafür nicht infrage.',
    ],
    ueberblick: [
      'Die Plattform stellt einen MCP-Server bereit, der über Streamable HTTP erreichbar ist und ' +
        'Clients per OAuth anmeldet. Die Tools decken Projektverwaltung, Deployments und ' +
        'Statusabfragen ab. Jede verändernde Aktion durchläuft Vorschau, Freigabe und Anwendung.',
    ],
    beitrag: [
      'Eigenes Projekt: Architektur, Implementierung, Betrieb und Dokumentation stammen von mir.',
    ],
    architektur: [
      'Der Server läuft unter Debian mit Docker Compose. Dienste sind in getrennte Stacks ' +
        'aufgeteilt, etwa Reverse Proxy, MCP, n8n, Statusseite, Backups und Projekte, und hängen ' +
        'an einem gemeinsamen Proxy-Netzwerk. Anfragen laufen über Cloudflare und Caddy zum ' +
        'jeweiligen Dienst.',
      'Der MCP-Server trennt Daten nach Zweck: Freigaben sind schreibgeschützt eingebunden, der ' +
        'Zustand ist beschreibbar. Eine Freigabe ist an eine Anfrage gebunden, gilt nur einmal ' +
        'und läuft ab. Bestätigt wird sie per Face ID beziehungsweise Passkey, mit SSH als ' +
        'Rückfallweg.',
    ],
    entscheidungen: [
      {
        titel: 'Vorschau, Freigabe, Anwendung',
        text:
          'Ein Agent kann Änderungen vorbereiten, aber nicht allein anwenden. Er erhält eine ' +
          'Vorschau zurück, ich bestätige per Passkey, erst dann wird ausgeführt. Das ' +
          'Sprachmodell bleibt nützlich, ohne die letzte Entscheidung zu treffen.',
      },
      {
        titel: 'Freigaben einmalig und mit Ablaufzeit',
        text:
          'Eine Freigabe ist an den Fingerabdruck der Anfrage gebunden, kann nur einmal verwendet ' +
          'werden und verfällt. Eine abgefangene oder alte Freigabe lässt sich nicht erneut nutzen.',
      },
      {
        titel: 'Gestufte Teststrategie vor jedem Rollout',
        text:
          'Änderungen an der Plattform durchlaufen neun Stufen: Syntaxprüfung, isoliertes Image, ' +
          'Prüfung der Tool-Liste, Compose- und Sicherheitsvalidierung, Rollback-Punkt, ' +
          'kontrollierter Rollout, Healthchecks für HTTP, OAuth und Mounts, ein Acceptance-Projekt ' +
          'und erst dann der breite Einsatz.',
      },
      {
        titel: 'Backups mit dokumentierter Wiederherstellung',
        text:
          'Ein eigener Backup-Stack sichert lokal und verschlüsselt extern. Der Recovery-Ablauf ' +
          'rollt nur die betroffene Komponente zurück und endet mit Healthchecks.',
      },
    ],
    ergebnis: [
      'Die Plattform läuft auf meinem Server und stellt Agenten eine Reihe getesteter MCP-Tools ' +
        'bereit. Nicht authentifizierte Aufrufe werden abgewiesen, verändernde Aktionen ' +
        'brauchen meine Freigabe.',
    ],
    erkenntnisse: [
      'Bei Agenten mit Schreibrechten liegt der Aufwand weniger im Tool selbst als in Freigabe, ' +
        'Nachvollziehbarkeit und Wiederherstellung.',
      'Offen sind unter anderem schreibgeschützte Secrets-Mounts, strukturierte Fehlercodes und ' +
        'auswertbare Audit-Events.',
    ],
  },

  {
    slug: 'ki-rechnungspruefung',
    seoTitel: 'KI-Rechnungsverarbeitung mit n8n und Freigabe',
    seoBeschreibung:
      'Fallstudie: n8n liest Rechnungs-PDFs, extrahiert Positionen per LLM gegen ein JSON-Schema, prüft Summen und Duplikate und schlägt Zuordnungen vor.',
    nr: '',
    titel: 'KI-Rechnungsprüfung',
    kicker: 'Dokumenten-KI · Schema-Extraktion · Human-in-the-loop',
    lede:
      'Rechnungen kommen als PDF per Mail. Ein LLM liest sie gegen ein festes Schema aus, ' +
      'Code prüft das Ergebnis, und die Buchhaltung erhält einen Zuordnungsvorschlag.',
    status: 'Im Testbetrieb, Live-Gang geplant',
    gruppe: 'weitere',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'n8n', 'Gmail API', 'PDF-Textextraktion', 'LLM Information Extractor', 'JSON-Schema',
      'monday GraphQL', 'JavaScript', 'OpenRouter',
    ],
    fluss: [
      { label: 'Mail mit PDF', note: 'Postfach' },
      { label: 'Text', note: 'PDF-Extraktion' },
      { label: 'LLM', note: 'Schema' },
      { label: 'Prüfung', note: 'Code' },
      { label: 'Zuordnung', note: 'Vorschlag' },
      { label: 'Freigabe', note: 'Buchhaltung' },
    ],
    ausgangspunkt: [
      'Rechnungen externer Mitarbeitender mussten von Hand gelesen und den richtigen Positionen ' +
        'in Kostenvoranschlägen zugeordnet werden: Leistung, Stunden, Betrag, Kunde und Monat.',
    ],
    ueberblick: [],
    beitrag: [
      'Ich habe den Workflow entwickelt, von der Postfach-Anbindung über die Schema-Extraktion ' +
        'und Validierung bis zur Zuordnungslogik und den Schutzmechanismen für den Schreibpfad.',
    ],
    architektur: [
      'Ein Gmail-Trigger holt passende Mails mit PDF-Anhang. Der Text jedes PDFs wird extrahiert ' +
        'und von einem LLM-Extraktor gegen ein festes JSON-Schema ausgelesen: Rechnungsnummer, ' +
        'Datum, Leistungsmonat, Positionen mit Leistung, Stunden und Netto.',
      'Code prüft das Ergebnis: Ist es überhaupt eine Rechnung, enthält das PDF Text, stimmt die ' +
        'Summe der Positionen mit dem Rechnungsbetrag überein, ist der Monat erkannt. Danach ' +
        'werden Positionen über die Projektboard-API den passenden Einträgen zugeordnet. Die ' +
        'Buchhaltung bekommt eine Zusammenfassung; unklare Fälle werden zur Prüfung markiert.',
    ],
    entscheidungen: [
      {
        titel: 'Das Modell extrahiert, Code entscheidet',
        text:
          'Das LLM liefert nur strukturierte Felder. Ob eine Rechnung plausibel ist, prüfen ' +
          'deterministische Regeln, etwa der Abgleich von Positionssumme und Rechnungsbetrag.',
      },
      {
        titel: 'Vorschlag statt automatischer Buchung',
        text:
          'Der Workflow schreibt nichts selbst in die Kostenvoranschläge. Er schlägt eine ' +
          'Zuordnung vor, die ein Mensch bestätigt. Der Schreibpfad ist mehrfach gesperrt: per ' +
          'Schalter, durch deaktivierte Schritte und durch eine Beschränkung auf Testboards.',
      },
      {
        titel: 'Idempotenz über Labels und Duplikatprüfung',
        text:
          'Verarbeitete Mails bekommen ein Status-Label und werden nicht erneut gelesen. Zusätzlich ' +
          'wird geprüft, ob dieselbe Rechnung desselben Absenders bereits erfasst ist.',
      },
      {
        titel: 'Eigener Fehlerpfad',
        text:
          'Bricht ein Lauf ab, geht eine Fehlermeldung direkt an die Fachabteilung statt nur in ' +
          'ein Protokoll.',
      },
    ],
    ergebnis: [
      'In den Testläufen werden Rechnungen ausgelesen, geprüft und zugeordnet, ohne dass Daten ' +
        'geschrieben werden. Der Live-Gang mit Freigabe durch die Buchhaltung ist geplant.',
    ],
  },

  {
    slug: 'automation-betrieb-self-hosting',
    seoTitel: 'Self-Hosting und Betrieb für n8n-Automatisierungen',
    seoBeschreibung:
      'Fallstudie: Selbst gehostete Datenbank in Docker, zentrale Fehlermeldungen für n8n-Workflows, VPN mit fester IP und Passwortmanager für KI-Automatisierungen.',
    nr: '',
    titel: 'Automation-Betrieb und Self-Hosting',
    kicker: 'Self-Hosting · Error Handling · Docker',
    lede:
      'Die Infrastruktur unter den Automatisierungen: selbst gehostete Datenbank, zentrale ' +
      'Fehlermeldungen für Workflows, VPN mit fester IP und ein Passwortmanager für das Team.',
    status: 'Im Betrieb',
    gruppe: 'weitere',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'Docker', 'Supabase (selbst gehostet)', 'PostgreSQL', 'n8n', 'Slack', 'WireGuard',
      'Vaultwarden', 'Linux',
    ],
    fluss: [
      { label: 'Workflow', note: 'beliebig' },
      { label: 'Fehler', note: 'Ausnahme' },
      { label: 'Error-Workflow', note: 'zentral' },
      { label: 'Slack', note: 'Alert-Kanal' },
    ],
    ausgangspunkt: [
      'Mit der Zahl der Automatisierungen wuchs der Bedarf an verlässlichem Betrieb: Fehler ' +
        'sollten nicht erst auffallen, wenn ein Ergebnis fehlt, Daten sollten aus ' +
        'Datenschutzgründen auf eigener Infrastruktur liegen, und Zugänge sollten nicht in ' +
        'Tabellen verwaltet werden.',
    ],
    ueberblick: [],
    beitrag: [
      'Ich habe die selbst gehostete Datenbank in Docker eingerichtet, Workflows an einen ' +
        'zentralen Error-Workflow angebunden, eine Richtlinie für Benennung, Ablage und ' +
        'Fehlerbehandlung geschrieben, das VPN mit fester IP aufgesetzt und den Passwortmanager ' +
        'eingeführt.',
    ],
    architektur: [
      'Die Datenbank für Wissensbasis, Transkripte und Auswertungen läuft als selbst gehostete ' +
        'Supabase-Instanz in Docker auf einem Server in Deutschland. Die Workflows greifen über ' +
        'Credentials darauf zu.',
      'Workflows verweisen auf einen gemeinsamen Error-Workflow, der Fehler in einen Slack-Kanal ' +
        'meldet. Eine nächtliche Sicherung legt die Workflow-Definitionen extern ab.',
    ],
    entscheidungen: [
      {
        titel: 'Ein Error-Workflow für alle',
        text:
          'Statt Fehlerbehandlung in jedem Workflow neu zu bauen, gibt es einen zentralen ' +
          'Fehlerpfad. Neue Workflows hängen sich nach der Richtlinie daran an.',
      },
      {
        titel: 'Eigene Datenbank statt Cloud',
        text:
          'Personenbezogene Inhalte wie Besprechungstranskripte bleiben auf eigener ' +
          'Infrastruktur in Deutschland.',
      },
      {
        titel: 'Feste IP über VPN',
        text:
          'Für Systeme mit IP-Freigabe läuft der Zugriff über ein WireGuard-VPN mit einer ' +
          'gemeinsamen festen Adresse statt über wechselnde Einzelanschlüsse.',
      },
    ],
    ergebnis: [
      'Fehler der angebundenen Workflows erscheinen zentral in Slack, Zugänge liegen im ' +
        'Passwortmanager statt in einer Tabelle, und die Datenbank läuft auf eigener Infrastruktur.',
    ],
    erkenntnisse: [
      'Zentrale Fehlermeldungen helfen nur, wenn sie jeden Workflow erfassen. Neue Workflows ' +
        'müssen deshalb konsequent an den Fehlerpfad angebunden werden, und Zugangsdaten ' +
        'gehören ausschließlich in den Credential Store.',
    ],
  },
];
