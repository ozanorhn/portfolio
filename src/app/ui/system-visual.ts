import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export type Motiv =
  'seo-agent' | 'aca' | 'mcp' | 'rechnung' | 'betrieb' | 'rag' | 'monitoring' | 'pocket';

/**
 * Individuelle Systemszene je Projekt: inline-SVG mit ruhiger Bewegung. Jede Szene zeigt
 * nur Bausteine, die in der Fallstudie als HTML-Text beschrieben sind; die Grafik selbst
 * ist ergänzend und trägt eine Kurzbeschreibung für Screenreader.
 * Bewegung: Linienfluss per CSS, Datenpunkte per SMIL; bei reduzierter Bewegung steht alles.
 */
@Component({
  selector: 'app-system-visual',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-motiv]': 'motiv()', '[class.sv--kompakt]': 'kompakt()' },
  template: `
    <svg
      class="sv"
      viewBox="0 0 480 300"
      role="img"
      [attr.aria-label]="alt()"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect class="sv__grund" x="0.5" y="0.5" width="479" height="299" rx="6" />
      @switch (motiv()) {
        @case ('seo-agent') {
          <text class="t tm" x="28" y="34">MCP-TOOLS</text>
          @for (w of ['SUCHDATEN', 'RANKINGS', 'CRAWL']; track w; let i = $index) {
            <rect class="k" x="28" [attr.y]="48 + i * 44" width="104" height="30" rx="4" />
            <text class="t" x="40" [attr.y]="67 + i * 44">{{ w }}</text>
            <path
              class="fl"
              [attr.d]="'M132 ' + (63 + i * 44) + ' C 170 ' + (63 + i * 44) + ', 180 120, 212 120'"
            />
          }
          <circle class="ka puls" cx="240" cy="120" r="30" />
          <text class="t tw" x="240" y="124" text-anchor="middle">AGENT</text>
          <text class="t tm" x="352" y="34">FACHROLLEN</text>
          @for (r of ['STRATEGIE', 'ONPAGE', 'TECHNIK', 'KI-SICHT']; track r; let i = $index) {
            <path
              class="fl"
              [attr.d]="'M270 120 C 300 120, 310 ' + (60 + i * 34) + ', 352 ' + (60 + i * 34)"
            />
            <rect class="k" x="352" [attr.y]="47 + i * 34" width="100" height="26" rx="13" />
            <text class="t" x="402" [attr.y]="64 + i * 34" text-anchor="middle">{{ r }}</text>
          }
          <path class="l" d="M402 177 V 215 H 290" />
          <rect class="k" x="190" y="200" width="100" height="30" rx="4" />
          <text class="t" x="240" y="219" text-anchor="middle">KRITIK</text>
          <path class="fl" d="M190 215 H 150" />
          <rect class="k" x="50" y="200" width="100" height="30" rx="4" />
          <text class="t" x="100" y="219" text-anchor="middle">ERGEBNIS</text>
          <rect class="ka" x="96" y="246" width="8" height="30" />
          <text class="t" x="116" y="266">FREIGABE · MENSCH</text>
          <circle class="bewegt d" r="3.5">
            <animateMotion
              dur="2.6s"
              repeatCount="indefinite"
              path="M132 107 C 170 107, 180 120, 212 120"
            />
          </circle>
          <circle class="bewegt d" r="3.5">
            <animateMotion
              dur="2.6s"
              begin="1.3s"
              repeatCount="indefinite"
              path="M270 120 C 300 120, 310 94, 352 94"
            />
          </circle>
          <circle class="bewegt d" r="3.5">
            <animateMotion dur="3.2s" begin="0.6s" repeatCount="indefinite" path="M290 215 H 150" />
          </circle>
        }
        @case ('aca') {
          <rect class="k" x="24" y="118" width="112" height="64" rx="6" />
          <text class="t tm" x="36" y="138">KAUFFRAGE</text>
          <rect class="b" x="36" y="148" width="86" height="5" rx="2" />
          <rect class="b" x="36" y="160" width="62" height="5" rx="2" />
          @for (m of ['CHATGPT', 'GEMINI', 'PERPLEXITY']; track m; let i = $index) {
            <path
              class="fl"
              [attr.d]="'M136 150 C 170 150, 170 ' + (58 + i * 92) + ', 200 ' + (58 + i * 92)"
            />
            <rect class="k" x="200" [attr.y]="30 + i * 92" width="128" height="62" rx="6" />
            <text class="t tm" x="212" [attr.y]="48 + i * 92">{{ m }}</text>
            <rect class="b" x="212" [attr.y]="58 + i * 92" width="96" height="5" rx="2" />
            <rect class="b" x="212" [attr.y]="69 + i * 92" width="70" height="5" rx="2" />
            <rect
              class="ka mark"
              [attr.x]="250 - i * 20"
              [attr.y]="57 + i * 92 + (i === 1 ? 11 : 0)"
              width="30"
              height="7"
              rx="2"
              [style.animation-delay]="i * 0.8 + 's'"
            />
            <path
              class="fl"
              [attr.d]="'M328 ' + (61 + i * 92) + ' C 352 ' + (61 + i * 92) + ', 350 150, 372 150'"
            />
          }
          <rect class="k" x="372" y="104" width="84" height="92" rx="6" />
          <text class="t tm" x="384" y="122">AUSWERTUNG</text>
          @for (h of [34, 22, 46, 16]; track $index; let i = $index) {
            <rect
              class="ka"
              [attr.x]="386 + i * 16"
              [attr.y]="184 - h"
              width="10"
              [attr.height]="h"
              rx="1"
            />
          }
          <rect
            class="k"
            x="384"
            y="214"
            width="62"
            height="44"
            rx="3"
            transform="rotate(-6 415 236)"
          />
          <rect class="k" x="384" y="214" width="62" height="44" rx="3" />
          <text class="t" x="415" y="240" text-anchor="middle">DECK</text>
          <circle class="bewegt d" r="3.5">
            <animateMotion
              dur="2.4s"
              repeatCount="indefinite"
              path="M136 150 C 170 150, 170 150, 200 150"
            />
          </circle>
          <circle class="bewegt d" r="3.5">
            <animateMotion
              dur="2.4s"
              begin="0.8s"
              repeatCount="indefinite"
              path="M136 150 C 170 150, 170 58, 200 58"
            />
          </circle>
          <circle class="bewegt d" r="3.5">
            <animateMotion
              dur="2.4s"
              begin="1.6s"
              repeatCount="indefinite"
              path="M136 150 C 170 150, 170 242, 200 242"
            />
          </circle>
        }
        @case ('mcp') {
          <circle class="k" cx="50" cy="96" r="24" />
          <text class="t" x="50" y="100" text-anchor="middle">AGENT</text>
          <path class="fl" d="M74 96 H 132" />
          <rect class="k" x="132" y="76" width="70" height="40" rx="6" />
          <path class="l" d="M157 92 v-6 a10 10 0 0 1 20 0 v6" />
          <rect class="ka" x="153" y="92" width="28" height="16" rx="3" />
          <text class="t tm" x="167" y="134" text-anchor="middle">OAUTH</text>
          <path class="fl" d="M202 96 H 252" />
          <rect class="k" x="252" y="64" width="110" height="64" rx="6" />
          <text class="t tm" x="264" y="82">MCP-SERVER</text>
          @for (i of [0, 1, 2]; track i) {
            <rect
              class="b"
              x="264"
              [attr.y]="92 + i * 10"
              [attr.width]="70 - i * 14"
              height="5"
              rx="2"
            />
          }
          <path class="l" d="M307 128 V 148 H 115 V 168" />
          <rect class="k" x="40" y="168" width="150" height="96" rx="6" />
          <text class="t tm" x="52" y="186">VORSCHAU</text>
          <text class="t plus" x="52" y="206">+ projekt/compose</text>
          <text class="t plus" x="52" y="224">+ route /demo</text>
          <text class="t minus" x="52" y="242">− alter dienst</text>
          <path class="fl" d="M190 216 H 236" />
          <g class="schranke"><rect class="ka" x="236" y="186" width="8" height="64" rx="2" /></g>
          <circle class="k" cx="276" cy="216" r="18" />
          <path class="l" d="M268 216 a8 8 0 0 1 16 0 M264 220 a12 12 0 0 1 24 0 M272 216 v6" />
          <text class="t tm" x="276" y="250" text-anchor="middle">PASSKEY</text>
          <path class="fl" d="M294 216 H 330" />
          @for (c of [0, 1, 2]; track c) {
            @for (r of [0, 1]; track r) {
              <rect
                class="k box"
                [attr.x]="330 + c * 42"
                [attr.y]="182 + r * 38"
                width="36"
                height="30"
                rx="3"
                [style.animation-delay]="(c * 2 + r) * 0.35 + 's'"
              />
            }
          }
          <text class="t tm" x="330" y="270">CONTAINER</text>
          <circle class="bewegt d" r="3.5">
            <animateMotion dur="4s" repeatCount="indefinite" path="M74 96 H 252" />
          </circle>
        }
        @case ('rechnung') {
          <rect class="k" x="28" y="40" width="104" height="136" rx="4" />
          <text class="t tm" x="40" y="60">PDF</text>
          @for (i of [0, 1, 2, 3, 4, 5, 6]; track i) {
            <rect
              class="b"
              x="40"
              [attr.y]="72 + i * 14"
              [attr.width]="i % 3 === 2 ? 52 : 78"
              height="5"
              rx="2"
            />
          }
          <rect class="ka scan" x="30" y="70" width="100" height="2" />
          <path class="fl" d="M132 108 H 172" />
          <rect class="k" x="172" y="40" width="150" height="136" rx="4" />
          <text class="t tm" x="184" y="60">JSON-SCHEMA</text>
          @for (f of ['nummer', 'monat', 'positionen', 'netto']; track f; let i = $index) {
            <text class="t" x="184" [attr.y]="84 + i * 22">"{{ f }}":</text>
            <rect
              class="ka feld"
              x="284"
              [attr.y]="76 + i * 22"
              [attr.width]="i === 2 ? 28 : 24"
              height="9"
              rx="2"
              [style.animation-delay]="i * 0.5 + 's'"
            />
          }
          <path class="fl" d="M322 108 H 352" />
          <rect class="k" x="352" y="40" width="104" height="136" rx="4" />
          <text class="t tm" x="364" y="60">REGELN</text>
          @for (r of ['SUMME', 'DUPLIKAT', 'MONAT']; track r; let i = $index) {
            <circle
              class="ka ok"
              cx="372"
              [attr.cy]="84 + i * 28"
              r="7"
              [style.animation-delay]="1 + i * 0.5 + 's'"
            />
            <text class="t" x="386" [attr.y]="88 + i * 28">{{ r }}</text>
          }
          <path class="l" d="M404 176 V 206" />
          <rect class="k" x="236" y="206" width="220" height="62" rx="6" />
          <text class="t tm" x="250" y="226">VORSCHLAG · ZUORDNUNG</text>
          <rect class="b" x="250" y="236" width="110" height="5" rx="2" />
          <rect class="ka" x="372" y="230" width="72" height="24" rx="12" />
          <text class="t tw" x="408" y="246" text-anchor="middle">FREIGEBEN</text>
          <rect class="k" x="28" y="206" width="180" height="62" rx="6" />
          <text class="t tm" x="40" y="226">UNKLAR</text>
          <text class="t" x="40" y="250">→ ZUR PRÜFUNG</text>
        }
        @case ('betrieb') {
          @for (s of dienste; track s; let i = $index) {
            <rect
              class="k"
              [attr.x]="28 + (i % 3) * 112"
              [attr.y]="36 + floor(i / 3) * 84"
              width="100"
              height="68"
              rx="6"
            />
            <circle
              [attr.class]="i === 4 ? 'stoer' : 'ok-dot'"
              [attr.cx]="44 + (i % 3) * 112"
              [attr.cy]="54 + floor(i / 3) * 84"
              r="5"
            />
            <text class="t" [attr.x]="56 + (i % 3) * 112" [attr.y]="58 + floor(i / 3) * 84">
              {{ s }}
            </text>
            <rect
              class="b"
              [attr.x]="40 + (i % 3) * 112"
              [attr.y]="76 + floor(i / 3) * 84"
              [attr.width]="62 - (i % 2) * 18"
              height="5"
              rx="2"
            />
          }
          <path class="fl alarm" d="M178 188 V 236 H 238" />
          <rect class="k" x="370" y="36" width="88" height="152" rx="6" />
          <text class="t tm" x="382" y="56">ZUGANG</text>
          <path class="l" d="M396 92 v-10 a18 18 0 0 1 36 0 v10" />
          <rect class="ka" x="388" y="92" width="52" height="34" rx="4" />
          <text class="t" x="382" y="150">VPN</text>
          <text class="t" x="382" y="170">FESTE IP</text>
          <rect class="k" x="28" y="208" width="210" height="56" rx="6" />
          <text class="t tm" x="40" y="228">FEHLER-WORKFLOW</text>
          <text class="t" x="40" y="248">EIN PFAD FÜR ALLE</text>
          <path class="fl alarm" d="M238 236 H 370" />
          <rect class="k" x="370" y="208" width="88" height="56" rx="6" />
          <text class="t tm" x="382" y="228">ALERT</text>
          <text class="t" x="382" y="248">KANAL</text>
          <circle class="bewegt d alarm-d" r="3.5">
            <animateMotion dur="3s" repeatCount="indefinite" path="M178 188 V 236 H 370" />
          </circle>
        }
        @case ('rag') {
          @for (i of [0, 1, 2]; track i) {
            <rect
              class="k"
              [attr.x]="28 + i * 8"
              [attr.y]="70 + i * 8"
              width="76"
              height="96"
              rx="3"
            />
          }
          <text class="t tm" x="28" y="56">DOKUMENTE</text>
          <path class="fl" d="M120 128 H 156" />
          @for (i of [0, 1, 2, 3, 4]; track i) {
            <rect class="k" x="156" [attr.y]="74 + i * 22" width="56" height="14" rx="2" />
          }
          <text class="t tm" x="156" y="56">CHUNKS</text>
          <path class="fl" d="M212 128 H 248" />
          <rect class="k" x="248" y="40" width="204" height="176" rx="6" />
          <text class="t tm" x="260" y="58">VEKTORRAUM</text>
          @for (p of punkte; track $index) {
            <circle
              [attr.class]="p[2] ? 'ka treffer' : 'b'"
              [attr.cx]="p[0]"
              [attr.cy]="p[1]"
              [attr.r]="p[2] ? 5 : 3.5"
            />
          }
          <circle class="ring" cx="350" cy="122" r="32" />
          <path class="fl" d="M350 216 V 246" />
          <rect class="k" x="284" y="246" width="132" height="32" rx="16" />
          <text class="t" x="350" y="266" text-anchor="middle">MCP-TOOL · LESEND</text>
        }
        @case ('monitoring') {
          <text class="t tm" x="28" y="36">FÜNF DATENQUELLEN · TÄGLICH</text>
          <path class="l" d="M28 250 H 452" />
          @for (k of kurven; track $index; let i = $index) {
            <path [attr.class]="'kurve k' + i" [attr.d]="k" />
          }
          <rect
            class="ka puls"
            x="300"
            y="96"
            width="12"
            height="12"
            transform="rotate(45 306 102)"
          />
          <rect class="k" x="324" y="48" width="128" height="52" rx="6" />
          <text class="t tm" x="336" y="68">ANALYSE-AGENT</text>
          <text class="t" x="336" y="88">MASSNAHME · PRIO</text>
        }
        @case ('pocket') {
          <rect class="k" x="40" y="60" width="96" height="176" rx="18" />
          <circle class="ka" cx="88" cy="206" r="12" />
          @for (i of [0, 1, 2, 3, 4, 5, 6]; track i) {
            <rect
              class="ka welle"
              [attr.x]="56 + i * 9"
              y="110"
              width="5"
              height="60"
              rx="2"
              [style.animation-delay]="i * 0.12 + 's'"
            />
          }
          <path class="fl" d="M136 148 H 214" />
          <text class="t tm" x="150" y="138">AUDIO</text>
          <rect class="k" x="214" y="96" width="112" height="104" rx="6" />
          <text class="t tm" x="226" y="116">SERVER</text>
          <text class="t" x="226" y="140">STT · AGENT</text>
          <text class="t" x="226" y="160">TTS</text>
          @for (w of ['AUFGABEN', 'NOTIZEN', 'KALENDER']; track w; let i = $index) {
            <path
              class="fl"
              [attr.d]="'M326 148 C 350 148, 350 ' + (92 + i * 56) + ', 368 ' + (92 + i * 56)"
            />
            <rect class="k" x="368" [attr.y]="78 + i * 56" width="88" height="28" rx="14" />
            <text class="t" x="412" [attr.y]="96 + i * 56" text-anchor="middle">{{ w }}</text>
          }
          <text class="t tm" x="368" y="64">MCP</text>
          <circle class="bewegt d" r="3.5">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M136 148 H 214" />
          </circle>
        }
      }
    </svg>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      :host {
        display: block;
        --a: var(--akz-petrol);
      }
      :host([data-motiv='seo-agent']) {
        --a: var(--akz-indigo);
      }
      :host([data-motiv='aca']) {
        --a: var(--akz-bernstein);
      }
      :host([data-motiv='mcp']) {
        --a: var(--akz-himmel);
      }
      :host([data-motiv='rechnung']) {
        --a: var(--akz-koralle);
      }
      :host([data-motiv='betrieb']) {
        --a: var(--akz-salbei);
      }
      :host([data-motiv='monitoring']) {
        --a: var(--akz-himmel);
      }
      :host([data-motiv='pocket']) {
        --a: var(--akz-bernstein);
      }
      .sv {
        width: 100%;
        height: auto;
        display: block;
      }
      .sv__grund {
        fill: var(--flaeche);
        stroke: var(--linie);
        stroke-width: 1;
      }
      .k {
        fill: var(--papier);
        stroke: var(--tusche);
        stroke-width: 1;
      }
      .ka {
        fill: var(--a);
      }
      .b {
        fill: var(--linie);
      }
      .l {
        fill: none;
        stroke: var(--tusche-2);
        stroke-width: 1;
      }
      .fl {
        fill: none;
        stroke: var(--a);
        stroke-width: 1.4;
        stroke-dasharray: 3 5;
        animation: sv-fluss 1.6s linear infinite;
      }
      .t {
        font-family: $mono;
        font-size: 10.5px;
        letter-spacing: 0.04em;
        fill: var(--tusche);
      }
      .tm {
        fill: var(--tusche-2);
        font-size: 9.5px;
        letter-spacing: 0.1em;
      }
      .tw {
        fill: var(--flaeche);
        font-weight: 600;
      }
      .plus {
        fill: var(--akz-salbei);
      }
      .minus {
        fill: var(--akz-koralle);
      }
      .d {
        fill: var(--a);
      }
      .puls {
        animation: sv-puls 3s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: center;
      }
      .mark,
      .feld,
      .ok,
      .box,
      .treffer {
        animation: sv-an 4s ease-in-out infinite;
      }
      .scan {
        animation: sv-scan 3.2s ease-in-out infinite;
      }
      .schranke {
        animation: sv-schranke 5s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: 50% 100%;
      }
      .welle {
        animation: sv-welle 1.1s ease-in-out infinite alternate;
        transform-box: fill-box;
        transform-origin: center;
      }
      .ok-dot {
        fill: var(--akz-salbei);
      }
      .stoer {
        fill: var(--akz-salbei);
        animation: sv-stoer 5s steps(1) infinite;
      }
      .alarm {
        stroke: var(--akz-koralle);
      }
      .alarm-d {
        fill: var(--akz-koralle);
      }
      .ring {
        fill: none;
        stroke: var(--a);
        stroke-width: 1;
        stroke-dasharray: 2 4;
        animation: sv-puls 3s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: center;
      }
      .kurve {
        fill: none;
        stroke-width: 1.6;
        stroke-dasharray: 600;
        stroke-dashoffset: 600;
        animation: sv-zeichnen 6s ease-out infinite;
      }
      .k0 {
        stroke: var(--akz-himmel);
      }
      .k1 {
        stroke: var(--akz-petrol);
        animation-delay: 0.3s;
      }
      .k2 {
        stroke: var(--akz-bernstein);
        animation-delay: 0.6s;
      }
      .k3 {
        stroke: var(--akz-indigo);
        animation-delay: 0.9s;
      }
      .k4 {
        stroke: var(--akz-koralle);
        animation-delay: 1.2s;
      }
      @keyframes sv-fluss {
        to {
          stroke-dashoffset: -16;
        }
      }
      @keyframes sv-puls {
        0%,
        100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.06);
          opacity: 0.85;
        }
      }
      @keyframes sv-an {
        0%,
        15% {
          opacity: 0.25;
        }
        35%,
        85% {
          opacity: 1;
        }
        100% {
          opacity: 0.25;
        }
      }
      @keyframes sv-scan {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(96px);
        }
        100% {
          transform: translateY(0);
        }
      }
      @keyframes sv-schranke {
        0%,
        35% {
          transform: rotate(0deg);
        }
        50%,
        80% {
          transform: rotate(-80deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
      @keyframes sv-welle {
        from {
          transform: scaleY(0.25);
        }
        to {
          transform: scaleY(1);
        }
      }
      @keyframes sv-stoer {
        0%,
        60% {
          fill: var(--akz-salbei);
        }
        61%,
        100% {
          fill: var(--akz-koralle);
        }
      }
      @keyframes sv-zeichnen {
        0% {
          stroke-dashoffset: 600;
        }
        45%,
        100% {
          stroke-dashoffset: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .fl,
        .puls,
        .mark,
        .feld,
        .ok,
        .box,
        .scan,
        .schranke,
        .welle,
        .stoer,
        .treffer,
        .ring,
        .kurve {
          animation: none !important;
        }
        .kurve {
          stroke-dashoffset: 0;
        }
        .bewegt {
          display: none;
        }
      }
    `,
  ],
})
export class SystemVisualComponent {
  readonly motiv = input.required<Motiv>();
  readonly alt = input.required<string>();
  readonly kompakt = input(false);

  readonly floor = Math.floor;
  readonly dienste = ['N8N', 'DATENBANK', 'BACKUP', 'PROXY', 'WORKFLOW', 'MONITOR'];
  /** Punkte im Vektorraum; das dritte Feld markiert die Treffer nahe der Anfrage. */
  readonly punkte: [number, number, boolean][] = [
    [272, 84, false],
    [298, 182, false],
    [320, 74, false],
    [338, 118, true],
    [362, 140, true],
    [356, 104, true],
    [390, 186, false],
    [412, 80, false],
    [430, 150, false],
    [284, 132, false],
    [404, 118, false],
    [328, 196, false],
    [374, 70, false],
    [432, 196, false],
  ];
  readonly kurven = [
    'M28 200 C 90 190, 140 150, 200 160 S 300 120, 452 110',
    'M28 220 C 100 214, 160 200, 230 206 S 340 170, 452 176',
    'M28 170 C 80 176, 150 196, 210 184 S 320 140, 452 150',
    'M28 236 C 120 232, 200 226, 270 214 S 380 206, 452 198',
    'M28 186 C 70 160, 130 168, 190 140 S 300 100, 452 90',
  ];
}
