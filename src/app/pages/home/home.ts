import { Component, ChangeDetectionStrategy, OnInit, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { HeroVisualComponent } from '../../ui/hero-visual';
import { SystemVisualComponent } from '../../ui/system-visual';
import { LucideAngularModule, Mail, Github, Linkedin, MapPin, ArrowRight } from 'lucide-angular';
import { SeoService } from '../../core/seo.service';
import { PORTRAET_ALT, SITE, person, seiteUrl } from '../../core/site';
import { REIFE_TITEL, WORKS, type Work } from '../../data/works';
import { GRUNDSAETZE, SCHWERPUNKTE } from '../../data/schwerpunkte';
import { BlogService } from '../../data/blog';
import { STACK } from '../../data/stack';

/**
 * Vier Projekte mit dem klarsten eigenen Beitrag: Agent mit MCP, eigene MCP-Plattform,
 * RAG-Wissensbasis, Sprachagent auf eigener Hardware. Alle übrigen belegen die Schwerpunkte.
 */
const HOME_SYSTEME = [
  'seo-agent-multi-agent-system',
  'mcp-plattform-self-hosted',
  'wissensbasis-rag-mcp',
  'pocket-ai-agent',
];

/** Inhaltlicher Stand der Startseite; nur bei echten Textänderungen anpassen. */
const STAND = '2026-10-26';

const HOME_ARTIKEL = [
  'mcp-server-mit-n8n-erstellen',
  'agentic-rag-mcp-architektur',
  'ki-agenten-sicherheit-tuev-bsi-studie',
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, KopfComponent, FussComponent, HeroVisualComponent,
    SystemVisualComponent,
    LucideAngularModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly site = SITE;
  readonly IconMail = Mail;
  readonly IconGithub = Github;
  readonly IconLinkedin = Linkedin;
  readonly IconOrt = MapPin;
  readonly IconPfeil = ArrowRight;
  readonly ausgewaehlt = this.belege(HOME_SYSTEME);
  readonly anzahl = WORKS.length;
  readonly schwerpunkte = SCHWERPUNKTE;
  readonly grundsaetze = GRUNDSAETZE;
  readonly reifeTitel = REIFE_TITEL;
  readonly portraetAlt = PORTRAET_ALT;
  private readonly blog = toSignal(inject(BlogService).liste(), { initialValue: [] });
  /** Fachlich passende Artikel in fester Reihenfolge; fehlende Slugs fallen einfach weg. */
  readonly artikel = computed(() =>
    HOME_ARTIKEL.map((s) => this.blog().find((a) => a.slug === s)).filter((a) => !!a),
  );
  readonly stack = STACK;

  /** Slugs in Projekte auflösen; ein fehlender Slug fällt weg statt die Seite zu brechen. */
  belege(slugs: string[]): Work[] {
    return slugs.map((s) => WORKS.find((w) => w.slug === s)).filter((w): w is Work => !!w);
  }

  /** Kurze Herkunft für die Karte: eigenes Projekt oder anonymisierter Unternehmenskontext. */
  herkunft(w: Work): string {
    return w.herkunft === 'eigen' ? 'Eigenes Projekt' : 'Beruflich · anonymisiert';
  }

  ngOnInit(): void {
    this.seo.set({
      titel: `${SITE.name} – ${SITE.rolle} & ${SITE.rolleAutomation}, Hannover`,
      beschreibung:
        'Ozan Orhan entwickelt KI-Anwendungen und agentische Systeme: Agenten mit MCP, ' +
        'RAG-Wissenssysteme und Prozessautomatisierung mit Python und n8n. Fallstudien.',
      typ: 'profile',
      pfad: '/',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          '@id': `${SITE.origin}/#profil`,
          url: seiteUrl('/'),
          name: `${SITE.name} – ${SITE.rolle}`,
          dateModified: STAND,
          inLanguage: 'de-DE',
          mainEntity: person(),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE.origin}/#website`,
          name: SITE.name,
          url: seiteUrl('/'),
          inLanguage: 'de-DE',
          publisher: { '@id': `${SITE.origin}/#person` },
        },
      ],
    });
  }
}
