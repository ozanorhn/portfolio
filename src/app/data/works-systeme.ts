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
      'Von der Bestellung bis zum Analyse-Deck: n8n steuert Status, Daten und Freigaben, ein ' +
      'Worker misst, wie KI-Assistenten auf echte Kauffragen antworten.',
    status: 'Live im Testbetrieb seit Oktober 2026',
    reife: 'test',
    aufgabenteilung: {
      ki:
        'Claude entwirft Kauffragen für das Briefing; der Worker stellt sie ChatGPT, Gemini und Perplexity und wertet Nennungen und Quellen aus.',
      software:
        'n8n führt Status, Doppelstart-Schutz, Hänger-Wache und Fehlermeldungen am Auftrag.',
      mensch:
        'Startet den Lauf nach abgestimmtem Briefing und prüft das Deck vor der Auslieferung.',
    },
    herkunft: 'beruflich',
    gruppe: 'kern',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'Webhooks',
      'monday API',
      'Claude Sonnet',
      'DataForSEO LLM-Abfragen',
      'ChatGPT · Gemini · Perplexity',
      'JavaScript',
      'Supabase',
      'Docker',
      'n8n (Orchestrierung)',
    ],
    plate: {
      kind: 'systembild',
      ref: 'agentic-commerce-audit',
      alt: 'Systembild Agentic Commerce Audit: Bahnen für Bestellung, Audit-Lauf nach Freigabe und Überwachung.',
    },
    fluss: [
      { label: 'Bestellung', note: 'Webhook' },
      { label: 'Kauffragen', note: 'Claude' },
      { label: 'Freigabe', note: 'Mensch' },
      { label: 'Worker', note: 'drei Modelle' },
      { label: 'Review', note: 'Mensch' },
    ],
    visual: 'aca',
    layout: 'buehne',
    highlights: [
      { label: 'Meine Rolle', wert: 'Prozesskette in n8n, Worker-Anbindung' },
      { label: 'Kern', wert: 'Statusmaschine mit zwei Freigaben' },
      { label: 'Robustheit', wert: 'Doppelstart-Schutz, Hänger-Wache' },
    ],
    karte: {
      problem:
        'Ein Audit zur Sichtbarkeit von Shops in KI-Assistenten bestand aus vielen Handgriffen.',
      beitrag:
        'Ich habe die automatisierte Strecke gebaut: Webhooks, Statusmaschine, Worker-Anbindung ' +
        'und Fehlermeldungen am Auftrag.',
    },
    ausgangspunkt: [
      'Das Audit prüft, ob ChatGPT, Gemini und Perplexity einen Shop bei echten Kauffragen nennen ' +
        'und ob der Shop für KI-Crawler lesbar ist. Ohne Automatisierung wären Bestellung, ' +
        'Abfragen an mehrere Modelle und Bericht Handarbeit gewesen.',
    ],
    ueberblick: [],
    beitrag: [
      'Ich habe die n8n-Workflows für Vormerkung, Bestellung, Briefing, Audit-Start, ' +
        'Worker-Rückmeldung und Hänger-Erkennung gebaut, dazu den vorgelagerten Quick-Check. ' +
        'Die Zahlungsanbindung stammt von einem Kollegen, das Produktkonzept aus dem Team.',
    ],
    architektur: [
      'Bestellungen kommen per Webhook, landen in Tabelle und Projektboard, und Claude entwirft ' +
        'Kauffragen als JSON für das Briefing. Ein Mensch startet den Lauf per Statuswechsel; n8n ' +
        'prüft auf Doppelstart und beauftragt den Worker. Der fragt drei KI-Assistenten ab, wertet ' +
        'Nennungen und Quellen aus und erzeugt ein Deck, das vor der Auslieferung geprüft wird.',
    ],
    entscheidungen: [
      {
        titel: 'Der Mensch startet den teuren Schritt',
        text:
          'Modellkosten entstehen erst nach abgestimmtem Briefing und Freigabe. Das Deck geht ' +
          'erst nach einem Review raus.',
      },
      {
        titel: 'Doppelstart-Schutz',
        text:
          'Board-Webhooks können mehrfach feuern. Eine Lauf-Tabelle verhindert einen zweiten ' +
          'Start für denselben Auftrag innerhalb von drei Stunden.',
      },
      {
        titel: 'Hänger-Wache',
        text:
          'Alle 15 Minuten prüft n8n Läufe über 90 Minuten beim Worker nach, trägt verlorene ' +
          'Rückmeldungen nach und warnt bei echten Hängern genau einmal.',
      },
      {
        titel: 'Fehler am Auftrag',
        text:
          'Fehlschläge erscheinen als Update direkt am Auftrag, mit Job, Schritt und Ursache. ' +
          'Fällt ein Nebendienst aus, läuft die Bestellung trotzdem weiter.',
      },
    ],
    ergebnis: [
      'Die Strecke läuft seit Oktober 2026 im Testbetrieb mit echten Durchläufen. Zwischen ' +
        'Bestellung und Deck stehen zwei menschliche Entscheidungen: Freigabe und Review.',
    ],
    erkenntnisse: [
      'Öffentliche Webhooks brauchen dieselbe Sorgfalt wie eine API; vor dem regulären Betrieb ' +
        'stehen noch Härtungen an einzelnen Eingängen an. Eine schlanke Lauf-Tabelle brachte mehr ' +
        'Betriebssicherheit als zusätzliche Retries.',
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
      'Ein selbst gehosteter Agent für wiederkehrende SEO-Aufgaben: Daten über MCP, Auswertung ' +
      'nach festen Skills, Ergebnisse im Team-Chat.',
    status: 'Im Einsatz, Skills werden laufend nachgeschärft',
    reife: 'produktiv',
    aufgabenteilung: {
      ki:
        'Wählt den passenden Skill, holt Daten über MCP-Tools und formuliert Auswertung und Empfehlung im Team-Chat.',
      software:
        'n8n beschafft Daten und vergleicht Trends deterministisch; Skills liegen als versionierte Dateien vor.',
      mensch:
        'Das SEO-Team gibt fachliche Vorgaben und korrigiert Skills; Änderungen an Websites oder im CMS brauchen eine Freigabe.',
    },
    herkunft: 'beruflich',
    gruppe: 'kern',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'Hermes Agent Framework',
      'Claude Sonnet',
      'MCP',
      'Slack',
      'Python',
      'n8n',
      'Google Search Console',
      'SEO-Daten-APIs',
    ],
    plate: {
      kind: 'systembild',
      ref: 'seo-agent-multi-agent-system',
      alt: 'Systembild SEO-Agent: Bahnen für Anfrage mit Freigabe, Zielüberprüfung über n8n und Multi-Agent-Testlauf.',
    },
    fluss: [
      { label: 'Anfrage', note: 'Chat' },
      { label: 'Skill', note: 'Agent' },
      { label: 'MCP-Tools', note: 'Daten' },
      { label: 'Ergebnis', note: 'Chat' },
      { label: 'Freigabe', note: 'Mensch' },
    ],
    visual: 'seo-agent',
    layout: 'seite',
    highlights: [
      { label: 'Meine Rolle', wert: 'Setup, Skills, MCP-Anbindung, n8n-Gegenstelle' },
      { label: 'Kern', wert: 'Versionierte Skills statt Prompt-Sammlung' },
      { label: 'Sicherheit', wert: 'Schreiben nur mit Freigabe' },
    ],
    karte: {
      problem: 'Wiederkehrende SEO-Aufgaben folgen festen Mustern, banden aber viel Zeit.',
      beitrag:
        'Ich habe den Agenten aufgesetzt, Datenquellen über MCP angebunden, Skills geschrieben ' +
        'und eine Multi-Agent-Variante getestet.',
    },
    ausgangspunkt: [
      'Keyword-Recherche, OnPage-Checks oder Zielüberprüfungen folgen festen Abläufen. Ein Agent ' +
        'sollte sie im Team-Chat übernehmen, ohne dass etwas ungeprüft live geht.',
    ],
    ueberblick: [],
    beitrag: [
      'Ich habe das Grundgerüst auf dem quelloffenen Hermes-Framework aufgesetzt, die ' +
        'Modellanbindung eingerichtet, Skills und Python-Skripte geschrieben, Datenquellen über MCP ' +
        'angebunden und die n8n-Gegenstelle für die Zielüberprüfung gebaut. Fachliche Vorgaben ' +
        'kamen aus dem SEO-Team.',
    ],
    architektur: [
      'Jeder Skill beschreibt eine Aufgabe mit Eingaben, Schritten und Ausgabevorlage. Der Agent ' +
        'wählt den passenden Skill und holt Daten über MCP-Tools. Für die Zielüberprüfung ruft er ' +
        'n8n auf, das je URL zwei Zeiträume vergleicht und eine Zusammenfassung zurückgibt. Im ' +
        'Multi-Agent-Test verteilte ein Orchestrator die Analyse auf Fachrollen, ein Kritiker prüfte.',
    ],
    entscheidungen: [
      {
        titel: 'Skills als versionierte Dateien',
        text:
          'Eine Aufgabe ist eine lesbare Markdown-Datei. Das Team kann Vorgaben nachvollziehen ' +
          'und korrigieren; aus Korrekturen leitet der Agent angepasste Skills ab.',
      },
      {
        titel: 'Rechnen in n8n, Sprechen im Agenten',
        text:
          'Datenbeschaffung und Trendvergleich laufen deterministisch in n8n, der Agent übernimmt ' +
          'Auslösung und Kommunikation. So bleibt die Logik testbar und modellunabhängig.',
      },
      {
        titel: 'Signale abstimmen',
        text:
          'Klick- und Rankingtrends werden per Mehrheit zu besser, schlechter, gemischt oder ' +
          'stabil zusammengefasst. Gemeldet werden nur klare Trends.',
      },
      {
        titel: 'Schreiben nur mit Freigabe',
        text:
          'Der Agent liest und empfiehlt. Änderungen an Websites oder im CMS brauchen eine ' +
          'menschliche Freigabe.',
      },
    ],
    ergebnis: [
      'Der Agent übernimmt im Team wiederkehrende SEO-Aufgaben nach festen Skills. Der ' +
        'Multi-Agent-Testlauf lieferte Ergebnisse für die interne Priorisierung.',
    ],
    erkenntnisse: [
      'Gute Skills mit Beispielen und Vorlagen bringen mehr als ein stärkeres Modell. Eine ' +
        'Kritiker-Rolle fängt Fehler ab, kostet aber Laufzeit; für Routine reicht ein Agent.',
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
      'Eine eigene Plattform, über die KI-Agenten Projekte auf meinem Server verwalten: erst ' +
      'Vorschau, dann Freigabe per Passkey, dann Anwendung.',
    status: 'Eigenes Infrastrukturprojekt, in Betrieb, Ausbau läuft',
    reife: 'produktiv',
    aufgabenteilung: {
      ki:
        'Agenten wie ChatGPT oder Claude bereiten Änderungen über MCP-Tools vor.',
      software:
        'OAuth-Anmeldung, Vorschau, neun Teststufen, Container-Deployment und Backups mit Wiederherstellung.',
      mensch:
        'Ich gebe jede verändernde Aktion einzeln per Passkey frei.',
    },
    herkunft: 'eigen',
    gruppe: 'kern',
    kontext: 'Eigenes Engineering-Projekt',
    stack: [
      'Python',
      'MCP (Streamable HTTP)',
      'OAuth',
      'Docker Compose',
      'Caddy',
      'Cloudflare',
      'Passkeys',
      'Debian',
    ],
    sprachen: ['Python'],
    plate: {
      kind: 'systembild',
      ref: 'mcp-plattform-self-hosted',
      alt: 'Systembild MCP-Plattform: Bahnen für Zugriff mit OAuth, Änderung mit Passkey-Freigabe und Betrieb mit Sicherung.',
    },
    fluss: [
      { label: 'Agent', note: 'MCP-Client' },
      { label: 'OAuth', note: 'Anmeldung' },
      { label: 'Vorschau', note: 'Prüfung' },
      { label: 'Passkey', note: 'Freigabe' },
      { label: 'Anwendung', note: 'Docker' },
    ],
    visual: 'mcp',
    layout: 'seite',
    highlights: [
      { label: 'Meine Rolle', wert: 'Eigenes Projekt, komplett' },
      { label: 'Kern', wert: 'Vorschau → Passkey → Anwendung' },
      { label: 'Betrieb', wert: 'Gestufte Tests, verschlüsselte Backups' },
    ],
    karte: {
      problem:
        'KI-Agenten sollen auf einem Server Projekte ausrollen, ohne unkontrollierten Zugriff.',
      beitrag:
        'Ich habe die Plattform gebaut und betreibe sie: MCP mit OAuth, Passkey-Freigaben, ' +
        'Container-Deployments und Backups.',
    },
    ausgangspunkt: [
      'Ich wollte Agenten wie ChatGPT oder Claude kleine Projekte auf meinem Server anlegen und ' +
        'ausrollen lassen. Ein Shell-Zugang für ein Sprachmodell kam nicht infrage.',
    ],
    ueberblick: [],
    beitrag: ['Eigenes Projekt: Architektur, Implementierung, Betrieb und Dokumentation.'],
    architektur: [
      'Der MCP-Server läuft über Streamable HTTP hinter Cloudflare und Caddy und meldet Clients ' +
        'per OAuth an. Dienste liegen als getrennte Docker-Compose-Stacks an einem Proxy-Netzwerk. ' +
        'Freigaben sind schreibgeschützt eingebunden, der Zustand ist beschreibbar.',
    ],
    entscheidungen: [
      {
        titel: 'Vorschau, Freigabe, Anwendung',
        text:
          'Ein Agent kann Änderungen vorbereiten, aber nicht allein anwenden. Die letzte ' +
          'Entscheidung trifft ein Passkey auf meinem Gerät.',
      },
      {
        titel: 'Freigaben einmalig und befristet',
        text: 'Eine Freigabe ist an den Fingerabdruck der Anfrage gebunden, gilt einmal und verfällt.',
      },
      {
        titel: 'Neun Teststufen vor jedem Rollout',
        text:
          'Von Syntaxprüfung und isoliertem Image über Rollback-Punkt und Healthchecks für HTTP, ' +
          'OAuth und Mounts bis zu einem Acceptance-Projekt.',
      },
      {
        titel: 'Backups mit Wiederherstellung',
        text:
          'Sicherung lokal und verschlüsselt extern; die Wiederherstellung rollt nur die ' +
          'betroffene Komponente zurück.',
      },
    ],
    ergebnis: [
      'Die Plattform stellt Agenten getestete MCP-Tools bereit. Nicht authentifizierte Aufrufe ' +
        'werden abgewiesen, verändernde Aktionen brauchen meine Freigabe.',
    ],
    erkenntnisse: [
      'Bei Agenten mit Schreibrechten liegt der Aufwand in Freigabe, Nachvollziehbarkeit und ' +
        'Wiederherstellung. Offen sind schreibgeschützte Secrets-Mounts und auswertbare Audit-Events.',
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
      'Rechnungen kommen als PDF per Mail. Ein LLM liest sie gegen ein festes Schema aus, Code ' +
      'prüft, und die Fachabteilung bekommt einen Zuordnungsvorschlag.',
    status: 'Im Testbetrieb, Live-Gang geplant',
    reife: 'test',
    aufgabenteilung: {
      ki:
        'Ein LLM liest Rechnungsnummer, Monat und Positionen gegen ein JSON-Schema aus.',
      software:
        'Prüft Summen, Duplikate und Plausibilität und ordnet Positionen zu; der Schreibpfad ist dreifach gesperrt.',
      mensch:
        'Die Fachabteilung prüft markierte Fälle und entscheidet über die Zuordnung.',
    },
    herkunft: 'beruflich',
    gruppe: 'weitere',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'Gmail API',
      'PDF-Textextraktion',
      'LLM Information Extractor',
      'JSON-Schema',
      'monday GraphQL',
      'JavaScript',
      'OpenRouter',
      'n8n (Orchestrierung)',
    ],
    plate: {
      kind: 'systembild',
      ref: 'ki-rechnungspruefung',
      alt: 'Systembild KI-Rechnungsprüfung: Eingang, Extraktion, Prüfung, Zuordnung und Freigabe; Ausnahmebahn für unklare Fälle.',
    },
    fluss: [
      { label: 'PDF', note: 'Mail' },
      { label: 'LLM', note: 'Schema' },
      { label: 'Prüfung', note: 'Code' },
      { label: 'Vorschlag', note: 'Zuordnung' },
      { label: 'Freigabe', note: 'Mensch' },
    ],
    visual: 'rechnung',
    layout: 'buehne',
    highlights: [
      { label: 'Meine Rolle', wert: 'Workflow komplett' },
      { label: 'Kern', wert: 'Modell extrahiert, Code entscheidet' },
      { label: 'Sicherheit', wert: 'Schreibpfad dreifach gesperrt' },
    ],
    ausgangspunkt: [
      'Rechnungen externer Mitarbeitender mussten von Hand gelesen und Positionen in ' +
        'Kostenvoranschlägen zugeordnet werden.',
    ],
    ueberblick: [],
    beitrag: [
      'Ich habe den Workflow entwickelt: Postfach-Anbindung, Schema-Extraktion, Validierung, ' +
        'Zuordnungslogik und die Sperren für den Schreibpfad.',
    ],
    architektur: [
      'Ein Gmail-Trigger holt Mails mit PDF. Ein LLM-Extraktor liest Nummer, Monat und Positionen ' +
        'gegen ein JSON-Schema aus. Code prüft Summen, Duplikate und Plausibilität und ordnet die ' +
        'Positionen über die Projektboard-API zu. Unklare Fälle werden zur Prüfung markiert.',
    ],
    entscheidungen: [
      {
        titel: 'Modell extrahiert, Code entscheidet',
        text: 'Ob eine Rechnung plausibel ist, prüfen Regeln, etwa Positionssumme gegen Rechnungsbetrag.',
      },
      {
        titel: 'Vorschlag statt Buchung',
        text:
          'Der Workflow schreibt nichts selbst. Der Schreibpfad ist per Schalter, deaktivierte ' +
          'Schritte und Testboard-Beschränkung gesperrt.',
      },
      {
        titel: 'Idempotenz über Labels',
        text:
          'Verarbeitete Mails bekommen ein Label; zusätzlich wird geprüft, ob dieselbe Rechnung ' +
          'schon erfasst ist.',
      },
    ],
    ergebnis: [
      'In Testläufen werden Rechnungen ausgelesen, geprüft und zugeordnet, ohne Daten zu ' +
        'schreiben. Der Live-Gang mit Freigabe ist geplant.',
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
      'Die Infrastruktur unter den Automatisierungen: eigene Datenbank, zentrale ' +
      'Fehlermeldungen, VPN mit fester IP und ein Passwortmanager für das Team.',
    status: 'Im Betrieb',
    reife: 'produktiv',
    aufgabenteilung: {
      software:
        'Zentraler Error-Workflow, selbst gehostete Datenbank in Docker und nächtliche Sicherung der Workflow-Definitionen.',
      mensch:
        'Das Team sieht Fehler zentral im Chat und verwaltet Zugänge im Passwortmanager.',
    },
    herkunft: 'beruflich',
    gruppe: 'weitere',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'Docker',
      'Supabase (selbst gehostet)',
      'PostgreSQL',
      'n8n',
      'Slack',
      'WireGuard',
      'Vaultwarden',
      'Linux',
    ],
    plate: {
      kind: 'systembild',
      ref: 'automation-betrieb-self-hosting',
      alt: 'Systembild Automation-Betrieb: Bahnen für Fehlermeldung, Datenhaltung und Zugang.',
    },
    fluss: [
      { label: 'Workflow', note: 'n8n' },
      { label: 'Fehler', note: 'zentral' },
      { label: 'Chat', note: 'Meldung' },
    ],
    visual: 'betrieb',
    layout: 'seite',
    highlights: [
      { label: 'Meine Rolle', wert: 'Einrichtung und Richtlinie' },
      { label: 'Kern', wert: 'Ein Fehlerpfad für alle Workflows' },
      { label: 'Daten', wert: 'Eigene Infrastruktur in Deutschland' },
    ],
    ausgangspunkt: [
      'Mit der Zahl der Automatisierungen wuchs der Bedarf an verlässlichem Betrieb: Fehler ' +
        'früh sehen, Daten auf eigener Infrastruktur halten, Zugänge nicht in Tabellen verwalten.',
    ],
    ueberblick: [],
    beitrag: [
      'Ich habe die selbst gehostete Datenbank in Docker eingerichtet, Workflows an einen ' +
        'zentralen Error-Workflow angebunden, eine Richtlinie für Benennung und Fehlerbehandlung ' +
        'geschrieben, das VPN mit fester IP aufgesetzt und den Passwortmanager eingeführt.',
    ],
    architektur: [
      'Die Datenbank für Wissensbasis, Transkripte und Auswertungen läuft als selbst gehostete ' +
        'Supabase-Instanz in Docker. Workflows melden Fehler über einen gemeinsamen Error-Workflow ' +
        'in einen Chat-Kanal; eine nächtliche Sicherung legt die Definitionen extern ab.',
    ],
    entscheidungen: [
      {
        titel: 'Ein Fehlerpfad für alle',
        text: 'Statt Fehlerbehandlung je Workflow gibt es einen zentralen Pfad, an den neue Workflows andocken.',
      },
      {
        titel: 'Eigene Datenbank statt Cloud',
        text: 'Personenbezogene Inhalte wie Transkripte bleiben auf eigener Infrastruktur in Deutschland.',
      },
      {
        titel: 'Feste IP über VPN',
        text: 'Systeme mit IP-Freigabe erreicht das Team über ein WireGuard-VPN mit gemeinsamer Adresse.',
      },
    ],
    ergebnis: [
      'Fehler der angebundenen Workflows erscheinen zentral im Chat, Zugänge liegen im ' +
        'Passwortmanager, und die Datenbank läuft auf eigener Infrastruktur.',
    ],
    erkenntnisse: [
      'Zentrale Fehlermeldungen helfen nur, wenn jeder Workflow angebunden ist, und Zugangsdaten ' +
        'gehören ausschließlich in den Credential Store.',
    ],
  },
];
