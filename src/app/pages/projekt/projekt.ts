import { SystemVisualComponent } from '../../ui/system-visual';
import { AblaufAusklappenComponent } from '../../ui/ablauf-ausklappen';
import { Component, ChangeDetectionStrategy, computed, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { AnalyticsService } from '../../core/analytics.service';
import { SITE, seiteUrl } from '../../core/site';
import { REIFE_TITEL, abschnitte, findWork, nachbar, type FlussStation } from '../../data/works';
import { BlogService } from '../../data/blog';
import { GlossarService } from '../../data/glossar';
import { WEITERLESEN } from '../../data/weiterlesen';

@Component({
  selector: 'app-projekt',
  standalone: true,
  imports: [
    RouterLink, KopfComponent, FussComponent, TafelComponent, SystemFlowComponent,
    AgentStateFlowComponent, ToolInvocationComponent, ApprovalExampleComponent,
    CaseStudyNavComponent, LucideAngularModule, SystemVisualComponent, AblaufAusklappenComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projekt.html',
  styleUrl: './projekt.scss',
})
export class ProjektComponent {
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  /** Zuletzt gemeldete Fallstudie: ein Event pro Aufruf, auch wenn der effect erneut läuft. */
  private gemeldet: string | null = null;
  readonly IconExtern = ArrowUpRight;
  readonly reifeTitel = REIFE_TITEL;
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
  /** Veröffentlichte Artikel, die in Strapi dieser Fallstudie zugeordnet sind */
  private readonly blogListe = toSignal(inject(BlogService).liste(), { initialValue: [] });
  private readonly glossar = toSignal(inject(GlossarService).liste(), { initialValue: [] });
  private readonly weiter = computed(() => WEITERLESEN[this.slug()] ?? {});
  /** Strapi-Zuordnung (projektSlugs) plus lokal gepflegte Querverweise aus weiterlesen.ts */
  readonly fachartikel = computed(() => {
    const lokal = this.weiter().artikel ?? [];
    return this.blogListe().filter(
      (a) => a.projektSlugs?.includes(this.slug()) || lokal.includes(a.slug),
    );
  });
  readonly verwandteProjekte = computed(() =>
    (this.weiter().projekte ?? []).map((s) => findWork(s)).filter((w) => !!w),
  );
  readonly begriffe = computed(() =>
    (this.weiter().begriffe ?? [])
      .map((s) => this.glossar().find((b) => b.slug === s))
      .filter((b) => !!b),
  );
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
      const bild = w.plate?.kind === 'bild' ? w.plate.ref : undefined;
      const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': w.repo ? 'SoftwareSourceCode' : 'CreativeWork',
        name: w.titel,
        headline: w.titel,
        description: w.lede,
        abstract: w.lede,
        url: seiteUrl(`/projekte/${w.slug}`),
        inLanguage: 'de-DE',
        keywords: w.stack.join(', '),
        creativeWorkStatus: REIFE_TITEL[w.reife],
        creator: { '@type': 'Person', '@id': `${SITE.origin}/#person`, name: SITE.name, url: SITE.origin },
        isPartOf: { '@type': 'CollectionPage', url: seiteUrl('/projekte') },
      };
      if (w.repo) schema['codeRepository'] = w.repo;
      if (w.sprachen?.length) schema['programmingLanguage'] = w.sprachen;

      this.seo.set({
        titel: `${w.seoTitel ?? w.titel} — ${SITE.name}`,
        beschreibung: w.seoBeschreibung ?? w.lede,
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

      if (this.gemeldet !== w.slug) {
        this.gemeldet = w.slug;
        this.analytics.senden('portfolio_project_view', {
          project_slug: w.slug,
          project_name: w.titel,
          project_category: w.gruppe,
        });
      }
    });
  }
}
