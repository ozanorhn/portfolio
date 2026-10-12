import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { ProjektListeComponent } from '../../ui/projekt-liste';
import { LucideAngularModule, Mail, Github, Linkedin, MapPin, ArrowRight } from 'lucide-angular';
import { SeoService } from '../../core/seo.service';
import { SITE, seiteUrl } from '../../core/site';
import { KERNARBEITEN } from '../../data/works';
import { STACK } from '../../data/stack';

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
  readonly kernarbeiten = KERNARBEITEN;
  readonly stack = STACK;

  ngOnInit(): void {
    this.seo.set({
      titel: `${SITE.name} – ${SITE.rolle} | LLM, RAG & Automation`,
      beschreibung:
        'AI Engineer aus Hannover, spezialisiert auf AI Automation: Ozan Orhan entwickelt ' +
        'AI-Agenten und LLM-Anwendungen mit Python, RAG, MCP und n8n. Deutschlandweit remote.',
      pfad: '/',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: seiteUrl('/'),
          inLanguage: 'de-DE',
          mainEntity: {
            '@type': 'Person',
            // Dieselbe ID, auf die BlogPosting als author/publisher verweist
            '@id': `${SITE.origin}/#person`,
            name: SITE.name,
            url: SITE.origin,
            jobTitle: SITE.rolle,
            email: `mailto:${SITE.mail}`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Hannover',
              addressCountry: 'DE',
            },
            sameAs: [SITE.github, SITE.linkedin],
            knowsAbout: [
              'AI Engineering', 'AI Automation', 'AI Agents', 'LLM Integration',
              'Model Context Protocol', 'RAG',
              'Workflow Automation', 'n8n', 'Python', 'TypeScript', 'REST APIs',
              'Docker', 'PostgreSQL', 'ESP32', 'Embedded Systems', 'Observability',
            ],
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE.origin}/#website`,
          name: `${SITE.name} — ${SITE.rolle}`,
          url: seiteUrl('/'),
          inLanguage: 'de-DE',
          publisher: { '@id': `${SITE.origin}/#person` },
        },
      ],
    });
  }
}
