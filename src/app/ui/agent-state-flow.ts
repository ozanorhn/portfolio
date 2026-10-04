import { Component, ChangeDetectionStrategy, OnDestroy, signal } from '@angular/core';

const STATES = ['listening', 'transcribing', 'thinking', 'calling tool', 'speaking'] as const;

/** Die Zustände, die der Agent während einer Anfrage durchläuft. Als Linie, nicht als Karten. */
@Component({
  selector: 'app-agent-state-flow',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="as">
      <p class="as__kopf">Agent-Zustände</p>
      <ol class="as__reihe">
        @for (s of states; track s; let i = $index) {
          <li class="as__st" [class.ist-aktiv]="i === aktiv()">
            <span class="as__punkt" aria-hidden="true"></span>
            <span class="as__label">{{ s }}</span>
          </li>
        }
      </ol>
      @if (animiert()) {
        <p class="as__hinweis" aria-live="polite">
          Aktueller Zustand: <span>{{ states[aktiv()] }}</span>
        </p>
      }
    </div>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .as { background: $platte; padding: clamp(20px, 2.4vw, 32px) clamp(20px, 2.6vw, 36px); }
      .as__kopf {
        font-family: $sans; font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
        text-transform: uppercase; color: $kreide-2; margin-bottom: $s5;
      }
      .as__reihe {
        position: relative; display: flex; flex-wrap: wrap; gap: $s3 clamp(14px, 2vw, 28px);
      }
      .as__st { display: flex; align-items: center; gap: $s2; }
      .as__punkt {
        width: 7px; height: 7px; border-radius: 50%;
        border: $strich-regel solid $kreide-2; background: transparent;
        transition: background-color 200ms linear, border-color 200ms linear;
      }
      .as__label {
        font-family: $mono; font-size: 12px; color: $kreide-2;
        transition: color 200ms linear;
      }
      .as__st.ist-aktiv .as__punkt { background: $petrol-platte; border-color: $petrol-platte; }
      .as__st.ist-aktiv .as__label { color: $petrol-platte; }
      .as__st:not(:last-child)::after {
        content: ''; width: clamp(10px, 1.6vw, 22px); height: $strich-haar;
        background: $linie-platte; margin-left: $s2;
      }
      .as__hinweis {
        margin-top: $s5; font-family: $mono; font-size: 11px; color: $kreide-2;
      }
      .as__hinweis span { color: $kreide; }
    `,
  ],
})
export class AgentStateFlowComponent implements OnDestroy {
  readonly states = STATES;
  readonly aktiv = signal(0);
  /** Die Statuszeile erscheint nur, wenn der Zustand tatsächlich wechselt. */
  readonly animiert = signal(false);
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor() {
    const reduziert =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduziert && typeof setInterval === 'function') {
      this.animiert.set(true);
      this.timer = setInterval(() => this.aktiv.update((i) => (i + 1) % STATES.length), 1800);
    }
  }
  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
