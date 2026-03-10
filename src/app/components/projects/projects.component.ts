import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent, Project } from '../project-card/project-card.component';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects: Project[] = [
    // ---- KI Case Studies (vertraulich) ----
    {
      id: 'ai-visibility-dashboard',
      title: 'AI Visibility Dashboard',
      description:
        'Echtzeit-Datenanalyse-Plattform für AI-System-Monitoring. Angular-Frontend mit modernem Design, Supabase-Backend für Datenverwaltung, integrierte REST APIs für Echtzeit-Datenströme. Dashboard zeigt KPIs, Performance-Metriken und AI-System-Health in Echtzeit.',
      technologies: ['Angular', 'TypeScript', 'Supabase', 'REST APIs', 'Real-time Data'],
      order: 'right',
      confidential: true,
      category: 'ai',
    },
    {
      id: 'meeting-transcript-summary',
      title: 'Meeting Transkript Zusammenfassung (AI)',
      description:
        'Automatische Transkription und KI-basierte Zusammenfassung von Meetings. LLM-Integration für intelligente Extraktion von Action Items und Key Insights. Slack-Integration für Benachrichtigungen und Google Docs Export. n8n orchestriert den gesamten Workflow.',
      technologies: ['LLM APIs', 'n8n', 'Slack', 'Google Docs', 'Python', 'AI Integration'],
      order: 'left',
      confidential: true,
      category: 'ai',
    },
    {
      id: 'seo-content-tool',
      title: 'SEO Redakteur (AI Content Tool)',
      description:
        'KI-basiertes Content-Generation Tool für SEO-optimierte Texte. Python-Backend mit LLM-Integration, SEO-APIs für Keyword-Recherche und Wettbewerbs-Analyse. Automatische Optimierung für Rankings und User Intent.',
      technologies: ['Python', 'LLM APIs', 'SEO APIs', 'Natural Language Processing', 'AI'],
      order: 'center',
      confidential: true,
      category: 'ai',
    },
    {
      id: 'performance-attestation',
      title: 'Leistungsnachweise Automatisierung',
      description:
        'Enterprise-Automatisierung für Datenverarbeitung und Berichtserstellung. n8n-basierte Workflows mit API-Integrationen zu Unternehmens-Systemen. Regelbasierte Logik für komplexe Validierung und Fehlerbehandlung mit vollständigem Audit-Trail.',
      technologies: ['n8n', 'REST APIs', 'Workflow Automation', 'Data Processing', 'Logging'],
      order: 'right',
      confidential: true,
      category: 'ai',
    },
    {
      id: 'google-review-automation',
      title: 'Google Review Automation',
      description:
        'Automatisiertes Verwaltungssystem für Google Business Reviews mit AI-gestützte Analyse. Integration mit Google Business API, LLM für Smart Replies und Sentiment-Analyse. Skaliert auf hunderte von Locations mit zentralem Monitoring und Reporting.',
      technologies: ['Google Business API', 'LLM APIs', 'Python', 'Automation', 'AI Analysis'],
      order: 'left',
      confidential: true,
      category: 'ai',
    },
    // ---- Open Source Projekte ----
    {
      id: 'dabubble',
      title: 'DaBubble',
      description:
        'Chat- und Kommunikations-Plattform ähnlich Slack. Echtzeit-Messaging, strukturierte Kanäle und Teamkommunikation mit moderner Angular-Architektur und Firebase-Backend.',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Firebase'],
      order: 'right',
      image: 'assets/img/Bildschirmfoto 2025-03-10 um 12.34.57.png',
      liveUrl: 'http://dabubble.ozan-orhan.com/',
      githubUrl: 'https://github.com/ozanorhn/DaBubble',
      category: 'open-source',
    },
    {
      id: 'join',
      title: 'Join',
      description:
        'Kanban-basierter Task Manager mit Drag-and-Drop-Funktionalität, Benutzer-Management und Aufgabenkategorisierung für effizientes Projektmanagement.',
      technologies: ['JavaScript', 'Firebase', 'HTML', 'CSS'],
      order: 'left',
      image: 'assets/img/join.png',
      liveUrl: 'http://join.ozan-orhan.com',
      githubUrl: 'https://github.com/SilverBlure/Join',
      category: 'open-source',
    },
    {
      id: 'el-pollo-loco',
      title: 'El Pollo Loco',
      description:
        'Objektorientiertes Jump-and-Run-Spiel mit Sammel- und Kampfmechaniken. Demonstriert tiefes JavaScript-Verständnis mit Game-Loop, Collision Detection und OOP-Patterns.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'OOP'],
      order: 'center',
      image: 'assets/img/el-pollo-loce.png',
      liveUrl: 'http://el-pollo-loco.ozan-orhan.com/',
      githubUrl: 'https://github.com/ozanorhn/El-Pollo-Loco',
      category: 'open-source',
    },
  ];

  get aiProjects(): Project[] {
    return this.projects.filter(p => p.category === 'ai');
  }

  get openSourceProjects(): Project[] {
    return this.projects.filter(p => p.category === 'open-source');
  }
}
