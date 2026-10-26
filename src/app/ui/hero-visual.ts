import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';

interface Knoten {
  id: string;
  label: string;
  x: number;
  y: number;
  farbe: string;
  /** Kurze Erklärung, erscheint beim Hervorheben unter der Landschaft. */
  text: string;
}

const AGENT: Knoten = {
  id: 'agent',
  label: 'KI-Agent',
  x: 260,
  y: 210,
  farbe: 'var(--akz-petrol)',
  text: 'Der Agent plant die Aufgabe, wählt passende Werkzeuge und verbindet die Bausteine zu einem Ablauf.',
};

/**
 * Hero der Startseite: eine ruhige Systemlandschaft. Ein Agent in der Mitte, darum die
 * Bausteine, mit denen ich arbeite. Jeder Knoten lässt sich per Maus, Touch oder Tastatur
 * hervorheben und zeigt dann eine kurze Erklärung; die Erklärung steht als echter HTML-Text
 * unter der Grafik. Ohne Bewegungswunsch bleibt die Landschaft stehen.
 */
@Component({
  selector: 'app-hero-visual',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(keydown.escape)': 'zuruecksetzen()' },
  template: `
    <figure class="hv-figur" [class.hv-figur--aktiv]="aktiv()">
      <svg
        class="hv"
        viewBox="0 0 520 420"
        role="group"
        aria-label="Systemlandschaft: ein KI-Agent in der Mitte, verbunden mit LLM, MCP, RAG, n8n, APIs und Datenquellen. Knoten auswählen für eine Erklärung."
      >
        <circle class="hv__bahn" cx="260" cy="210" r="150" />
        <circle class="hv__bahn hv__bahn--innen" cx="260" cy="210" r="92" />
        @for (k of knoten; track k.id; let i = $index) {
          <path
            class="hv__linie"
            [class.hv__linie--an]="aktiv() === k.id || aktiv() === 'agent'"
            [attr.d]="'M260 210 L' + k.x + ' ' + k.y"
            [style.stroke]="k.farbe"
            [style.animation-delay]="i * -0.4 + 's'"
          />
        }
        @for (k of knoten; track k.id; let i = $index) {
          <circle class="hv__punkt" r="4" [style.fill]="k.farbe">
            <animateMotion
              [attr.dur]="3 + (i % 3) * 0.6 + 's'"
              [attr.begin]="i * 0.5 + 's'"
              repeatCount="indefinite"
              [attr.path]="
                i % 2 ? 'M260 210 L' + k.x + ' ' + k.y : 'M' + k.x + ' ' + k.y + ' L260 210'
              "
            />
          </circle>
        }
        @for (k of knoten; track k.id; let i = $index) {
          <g
            class="hv__knoten"
            role="button"
            tabindex="0"
            [class.hv__knoten--an]="aktiv() === k.id"
            [class.hv__knoten--leise]="aktiv() && aktiv() !== k.id && aktiv() !== 'agent'"
            [attr.aria-pressed]="aktiv() === k.id"
            [attr.aria-label]="k.label + ': ' + k.text"
            [style.--c]="k.farbe"
            [style.transform-origin]="k.x + 'px ' + k.y + 'px'"
            (mouseenter)="zeige(k.id)"
            (mouseleave)="verlasse()"
            (focus)="zeige(k.id)"
            (click)="umschalten(k.id)"
            (keydown.enter)="umschalten(k.id); $event.preventDefault()"
            (keydown.space)="umschalten(k.id); $event.preventDefault()"
          >
            <circle [attr.cx]="k.x" [attr.cy]="k.y" r="38" class="hv__treffer" />
            <circle
              [attr.cx]="k.x"
              [attr.cy]="k.y"
              r="30"
              class="hv__kreis"
              [style.stroke]="k.farbe"
            />
            <circle [attr.cx]="k.x" [attr.cy]="k.y" r="5" class="hv__kern" [style.fill]="k.farbe" />
            <text [attr.x]="k.x" [attr.y]="k.y + 48" text-anchor="middle" class="hv__label">
              {{ k.label.toUpperCase() }}
            </text>
          </g>
        }
        <g
          class="hv__zentrum"
          role="button"
          tabindex="0"
          [class.hv__zentrum--an]="aktiv() === 'agent'"
          [attr.aria-pressed]="aktiv() === 'agent'"
          [attr.aria-label]="agent.label + ': ' + agent.text"
          (mouseenter)="zeige('agent')"
          (mouseleave)="verlasse()"
          (focus)="zeige('agent')"
          (click)="umschalten('agent')"
          (keydown.enter)="umschalten('agent'); $event.preventDefault()"
          (keydown.space)="umschalten('agent'); $event.preventDefault()"
        >
          <circle class="hv__agent" cx="260" cy="210" r="44" />
          <circle class="hv__agent-ring" cx="260" cy="210" r="56" />
          <text x="260" y="206" text-anchor="middle" class="hv__agent-text">KI-Agent</text>
        </g>
        <!-- Unterzeile außerhalb des Buttons: der zugängliche Name bleibt „KI-Agent: …“ -->
        <text x="260" y="222" text-anchor="middle" class="hv__agent-sub" aria-hidden="true">Orchestrierung</text>
      </svg>
      <figcaption class="hv-info" aria-live="polite">
        @if (auswahl(); as k) {
          <span class="hv-info__name" [style.--c]="k.farbe">{{ k.label }}</span>
          <span class="hv-info__text">{{ k.text }}</span>
        } @else {
          <span class="hv-info__hinweis"
            >Knoten antippen oder überfahren, um seine Rolle zu sehen.</span
          >
        }
      </figcaption>
    </figure>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      :host {
        display: block;
      }
      .hv-figur {
        margin: 0;
      }
      .hv {
        width: 100%;
        height: auto;
        display: block;
        overflow: visible;
        -webkit-tap-highlight-color: transparent;
      }
      .hv__bahn {
        fill: none;
        stroke: var(--linie);
        stroke-width: 1;
        stroke-dasharray: 2 6;
      }
      .hv__bahn--innen {
        stroke-dasharray: 1 4;
        animation: hv-dreh 60s linear infinite;
        transform-origin: 260px 210px;
      }
      .hv__linie {
        stroke-width: 1.2;
        stroke-dasharray: 3 6;
        opacity: 0.8;
        animation: hv-fluss 2s linear infinite;
        transition: opacity 240ms ease;
      }
      .hv-figur--aktiv .hv__linie {
        opacity: 0.25;
      }
      .hv-figur--aktiv .hv__linie--an {
        opacity: 1;
        stroke-width: 2;
      }

      .hv__knoten,
      .hv__zentrum {
        cursor: pointer;
        outline: none;
      }
      .hv__knoten {
        transition:
          transform 280ms cubic-bezier(0.2, 0.7, 0.2, 1),
          opacity 240ms ease;
        animation: hv-atem 6s ease-in-out infinite;
      }
      .hv__treffer {
        fill: transparent;
      }
      .hv__kreis {
        fill: var(--flaeche);
        stroke-width: 1.2;
        transition: fill 240ms ease;
      }
      .hv__kern {
        transform-box: fill-box;
        transform-origin: center;
        transition: transform 240ms ease;
      }
      .hv__label {
        font-family: $mono;
        font-size: 12px;
        letter-spacing: 0.08em;
        fill: var(--tusche);
        transition: fill 240ms ease;
      }
      .hv__knoten--an {
        transform: scale(1.12);
        animation: none;
      }
      .hv__knoten--an .hv__kreis {
        fill: color-mix(in srgb, var(--c) 14%, var(--flaeche));
        stroke-width: 2;
      }
      .hv__knoten--an .hv__kern {
        transform: scale(1.4);
      }
      .hv__knoten--leise {
        opacity: 0.4;
        animation: none;
      }
      .hv__knoten:focus-visible .hv__kreis {
        stroke-width: 2.4;
      }
      .hv__knoten:focus-visible .hv__treffer {
        stroke: var(--tusche);
        stroke-width: 1;
        stroke-dasharray: 2 3;
      }

      .hv__agent {
        fill: var(--tusche);
        transition: fill 240ms ease;
      }
      .hv__agent-ring {
        fill: none;
        stroke: var(--akz-petrol);
        stroke-width: 1.4;
        stroke-dasharray: 4 6;
        animation: hv-dreh 24s linear infinite;
        transform-origin: 260px 210px;
      }
      .hv__zentrum--an .hv__agent {
        fill: var(--akz-petrol);
      }
      .hv__zentrum:focus-visible .hv__agent-ring {
        stroke: var(--tusche);
        stroke-width: 2.4;
      }
      .hv__agent-text {
        text-transform: uppercase;
        font-family: $mono;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.08em;
        fill: var(--papier);
        pointer-events: none;
      }
      .hv__agent-sub {
        text-transform: uppercase;
        font-family: $mono;
        font-size: 8px;
        letter-spacing: 0.12em;
        fill: var(--kreide-2);
        pointer-events: none;
      }
      .hv__zentrum--an + .hv__agent-sub {
        fill: var(--papier);
      }

      /* Erklärung als echter Text; feste Mindesthöhe verhindert Layoutsprünge */
      .hv-info {
        min-height: 4.6em;
        margin-top: $s3;
        padding-left: $s4;
        border-left: 2px solid var(--linie);
        font-size: 15px;
        line-height: 1.5;
        color: $tusche-2;
      }
      .hv-figur--aktiv .hv-info {
        border-left-color: var(--akz-petrol);
      }
      .hv-info__name {
        display: block;
        font-family: $mono;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--c);
        margin-bottom: 2px;
      }
      .hv-info__text {
        color: $tusche;
        animation: hv-ein 260ms ease;
        display: block;
      }
      .hv-info__hinweis {
        font-family: $mono;
        font-size: 12px;
        letter-spacing: 0.04em;
      }

      @keyframes hv-fluss {
        to {
          stroke-dashoffset: -18;
        }
      }
      @keyframes hv-dreh {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes hv-atem {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.78;
        }
      }
      @keyframes hv-ein {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .hv__linie,
        .hv__bahn--innen,
        .hv__knoten,
        .hv__agent-ring,
        .hv-info__text {
          animation: none;
        }
        .hv__knoten,
        .hv__linie,
        .hv__kreis {
          transition: none;
        }
        .hv__punkt {
          display: none;
        }
      }
    `,
  ],
})
export class HeroVisualComponent {
  readonly agent = AGENT;
  readonly knoten: Knoten[] = [
    {
      id: 'llm',
      label: 'LLM',
      x: 260,
      y: 60,
      farbe: 'var(--akz-indigo)',
      text: 'Sprachmodelle wie Claude verstehen Freitext und liefern strukturierte Ausgaben, die gegen ein Schema geprüft werden.',
    },
    {
      id: 'mcp',
      label: 'MCP',
      x: 390,
      y: 135,
      farbe: 'var(--akz-himmel)',
      text: 'Das Model Context Protocol stellt Agenten Werkzeuge bereit: Daten abfragen und Aktionen ausführen, schreibend nur mit Freigabe.',
    },
    {
      id: 'rag',
      label: 'RAG',
      x: 390,
      y: 285,
      farbe: 'var(--akz-petrol)',
      text: 'Retrieval-Augmented Generation: Antworten stützen sich auf passende Abschnitte aus einer Vektor-Wissensbasis.',
    },
    {
      id: 'n8n',
      label: 'n8n',
      x: 260,
      y: 360,
      farbe: 'var(--akz-koralle)',
      text: 'n8n startet Abläufe per Webhook oder Zeitplan, verbindet die Dienste und meldet Fehler an einer zentralen Stelle.',
    },
    {
      id: 'api',
      label: 'APIs',
      x: 130,
      y: 285,
      farbe: 'var(--akz-bernstein)',
      text: 'REST-APIs und Webhooks verbinden die Systeme, etwa Analytics, Projektboards, Postfächer und Chat.',
    },
    {
      id: 'daten',
      label: 'Daten',
      x: 130,
      y: 135,
      farbe: 'var(--akz-salbei)',
      text: 'Datenquellen wie Suchdaten, Webanalyse und Dokumente werden normalisiert, bevor ein Modell sie sieht.',
    },
  ];

  /** Hervorgehobener Knoten; null zeigt den Hinweis. */
  readonly aktiv = signal<string | null>(null);
  /** Per Klick oder Tastatur festgehaltene Auswahl; bleibt beim Verlassen mit der Maus bestehen. */
  private readonly fest = signal<string | null>(null);

  readonly auswahl = computed(() => {
    const id = this.aktiv();
    if (!id) return null;
    return id === 'agent' ? this.agent : (this.knoten.find((k) => k.id === id) ?? null);
  });

  zeige(id: string): void {
    this.aktiv.set(id);
  }

  verlasse(): void {
    this.aktiv.set(this.fest());
  }

  zuruecksetzen(): void {
    this.fest.set(null);
    this.aktiv.set(null);
  }

  umschalten(id: string): void {
    const neu = this.fest() === id ? null : id;
    this.fest.set(neu);
    this.aktiv.set(neu);
  }
}
