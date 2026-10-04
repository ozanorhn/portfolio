import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface ToolAufruf {
  name: string;
  eingabe: { feld: string; wert: string }[];
  status: 'completed' | 'running' | 'failed';
  ergebnis?: string;
}

/** Ein Tool-Aufruf als Eintrag in einem Systemjournal: Schlüssel über dem Wert, Block für Block. */
@Component({
  selector: 'app-tool-invocation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dl class="ti">
      <div class="ti__block">
        <dt>Tool</dt>
        <dd class="ti__name">{{ aufruf().name }}</dd>
      </div>
      @if (aufruf().eingabe.length) {
        <div class="ti__block">
          <dt>Input</dt>
          <dd>
            <table class="ti__eingabe">
              <tbody>
                @for (e of aufruf().eingabe; track e.feld) {
                  <tr><th scope="row">{{ e.feld }}</th><td>{{ e.wert }}</td></tr>
                }
              </tbody>
            </table>
          </dd>
        </div>
      }
      <div class="ti__block">
        <dt>Status</dt>
        <dd class="ti__status" [class.ist-fertig]="aufruf().status === 'completed'">{{ aufruf().status }}</dd>
      </div>
      @if (aufruf().ergebnis) {
        <div class="ti__block">
          <dt>Result</dt>
          <dd>{{ aufruf().ergebnis }}</dd>
        </div>
      }
    </dl>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .ti {
        display: grid; gap: $s4;
        font-family: $mono; font-size: 12.5px; line-height: 1.6; color: $kreide;
      }
      .ti__block dt {
        font-family: $sans; font-size: 10.5px; font-weight: 500;
        letter-spacing: 0.14em; text-transform: uppercase; color: $kreide-2;
        margin-bottom: 2px;
      }
      .ti__block dd { margin: 0; }
      .ti__name { color: $petrol-platte; }
      .ti__eingabe { border-collapse: collapse; }
      .ti__eingabe th {
        font-weight: 400; text-align: left; color: $kreide-2;
        padding: 0 $s5 0 0; white-space: nowrap;
      }
      .ti__eingabe td { padding: 0; }
      .ti__status.ist-fertig { color: $petrol-platte; }
    `,
  ],
})
export class ToolInvocationComponent {
  readonly aufruf = input.required<ToolAufruf>();
}
