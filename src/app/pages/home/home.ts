import { Component, ChangeDetectionStrategy, OnInit, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { ProjektListeComponent } from '../../ui/projekt-liste';
import { LucideAngularModule, Mail, Github, Linkedin, MapPin, ArrowRight } from 'lucide-angular';
import { SeoService } from '../../core/seo.service';
import { BESCHREIBUNG, SITE, person, seiteUrl } from '../../core/site';
import { KERNARBEITEN, WORKS } from '../../data/works';
import { BlogService } from '../../data/blog';
import { STACK } from '../../data/stack';

const HOME_ARTIKEL = [
  'mcp-server-mit-n8n-erstellen',
  'agentic-rag-mcp-architektur',
  'n8n-agents-vs-ai-agent-node',
  'ki-agenten-sicherheit-tuev-bsi-studie',
  'reverse-engineering-claude-ghidra-mcp',
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, KopfComponent, FussComponent, ProjektListeComponent,
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
  /** Ausgewählte KI-Systeme als Karten; alle übrigen Projekte stehen darunter als Liste. */
  readonly ausgewaehlt = KERNARBEITEN;
  readonly weitere = WORKS.filter((w) => w.gruppe !== 'kern');
  private readonly blog = toSignal(inject(BlogService).liste(), { initialValue: [] });
  /** Fachlich passende Artikel in fester Reihenfolge; fehlende Slugs fallen einfach weg. */
  readonly artikel = computed(() =>
    HOME_ARTIKEL.map((s) => this.blog().find((a) => a.slug === s)).filter((a) => !!a),
  );
  readonly stack = STACK;
  readonly beschreibung = BESCHREIBUNG;

  ngOnInit(): void {
    this.seo.set({
      titel: `${SITE.name} – ${SITE.rolle} in Hannover`,
      beschreibung:
        'Ozan Orhan ist AI Automation Engineer in Hannover. Er entwickelt KI-Agenten, ' +
        'RAG- und MCP-Systeme und n8n-Automatisierungen mit Python. Projekte und Kontakt.',
      pfad: '/',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: seiteUrl('/'),
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
