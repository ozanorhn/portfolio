import { Component, ChangeDetectionStrategy, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { TafelComponent } from '../../ui/tafel';
import { SystemFlowComponent } from '../../ui/system-flow';
import { AgentStateFlowComponent } from '../../ui/agent-state-flow';
import { ToolInvocationComponent, type ToolAufruf } from '../../ui/tool-invocation';
import { ApprovalExampleComponent } from '../../ui/approval-example';
import { CaseStudyNavComponent } from '../../ui/case-study-nav';
import { LucideAngularModule, ArrowUpRight } from 'lucide-angular';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site';
import { abschnitte, findWork, nachbar, type FlussStation } from '../../data/works';

@Component({
  selector: 'app-projekt',
  standalone: true,
  imports: [
    RouterLink, KopfComponent, FussComponent, TafelComponent, SystemFlowComponent,
    AgentStateFlowComponent, ToolInvocationComponent, ApprovalExampleComponent,
    CaseStudyNavComponent, LucideAngularModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projekt.html',
  styleUrl: './projekt.scss',
})
export class ProjektComponent {
  private readonly seo = inject(SeoService);
  readonly IconExtern = ArrowUpRight;
  readonly slug = input<string>('');

  /** Abstrahiertes Beispiel eines Toolaufrufs über MCP. */
  readonly beispielAufruf: ToolAufruf = {
    name: 'todoist.create_task',
    eingabe: [
      { feld: 'title', wert: 'VPS konfigurieren' },
      { feld: 'due_string', wert: 'morgen' },
    ],
    status: 'completed',
    ergebnis: 'Aufgabe erstellt',
  };
  /** Abstrahiertes Freigabe-Gate der Leistungsnachweis Automation. */
  readonly freigabeFluss: FlussStation[] = [
    { label: 'Monatliche Freigabe', note: 'Anfrage' },
    { label: 'Slack-Nachricht', note: 'Human-in-the-loop' },
    { label: 'Reaction Trigger', note: 'Emoji' },
    { label: 'Switch', note: 'Reaktion → Pfad' },
    { label: 'Zeitraum', note: 'Monat' },
    { label: 'Workflow-Ausführung', note: 'Toggl → Dokumente' },
  ];
  readonly work = computed(() => findWork(this.slug()));
  readonly naechste = computed(() => nachbar(this.slug()));
  readonly nav = computed(() => {
    const w = this.work();
    return w ? abschnitte(w) : [];
  });

  constructor() {
    effect(() => {
      const w = this.work();
      if (!w) {
        this.seo.set({
          titel: `Projekt nicht gefunden — ${SITE.name}`,
          beschreibung: 'Dieser Eintrag existiert nicht.',
          pfad: `/projekte/${this.slug()}`,
          noindex: true,
        });
        return;
      }
      const bild = w.plate?.kind === 'bild' ? w.plate.ref : 'assets/img/og-bild.png';
      const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': w.repo ? 'SoftwareSourceCode' : 'CreativeWork',
        name: w.titel,
        headline: w.titel,
        description: w.lede,
        abstract: w.lede,
        url: `${SITE.origin}/projekte/${w.slug}`,
        inLanguage: 'de-DE',
        keywords: w.stack.join(', '),
        creator: { '@type': 'Person', name: SITE.name, url: SITE.origin },
        isPartOf: { '@type': 'CollectionPage', url: `${SITE.origin}/projekte` },
      };
      if (w.repo) schema['codeRepository'] = w.repo;
      if (w.sprachen?.length) schema['programmingLanguage'] = w.sprachen;

      this.seo.set({
        titel: `${w.titel} — ${SITE.name}`,
        beschreibung: w.lede,
        pfad: `/projekte/${w.slug}`,
        bild,
        typ: 'article',
        breadcrumb: [
          { name: 'Start', pfad: '/' },
          { name: 'Projekte', pfad: '/projekte' },
          { name: w.titel, pfad: `/projekte/${w.slug}` },
        ],
        jsonLd: schema,
      });
    });
  }
}
