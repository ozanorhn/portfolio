import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConsentComponent } from './ui/consent';
import { AnalyticsService } from './core/analytics.service';
import { WebMcpService } from './core/webmcp.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ConsentComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    // Mail- und LinkedIn-Klicks; gesendet wird nur mit Analytics-Einwilligung.
    inject(AnalyticsService).linkKlicksBeobachten();
    // Lesende Werkzeuge für Browser-Agenten, nur wenn der Browser WebMCP anbietet.
    inject(WebMcpService).starten();
  }
}
