import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { ProjektListeComponent } from '../../ui/projekt-liste';
import { LucideAngularModule, Mail, Github, Linkedin, MapPin, ArrowRight } from 'lucide-angular';
import { SeoService } from '../../core/seo.service';
import { BESCHREIBUNG, SITE, person, seiteUrl } from '../../core/site';
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
  readonly beschreibung = BESCHREIBUNG;

  ngOnInit(): void {
    this.seo.set({
      titel: `${SITE.name} – ${SITE.rolle} | KI-Agenten & Automatisierung`,
      beschreibung:
        'AI Automation Engineer aus Hannover: Ozan Orhan entwickelt KI-Agenten und automatisiert ' +
        'Prozesse mit KI, mit Python, RAG, MCP und n8n. Deutschlandweit remote.',
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
