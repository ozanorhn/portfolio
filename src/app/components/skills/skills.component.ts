import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import {
  LucideAngularModule,
  LucideIconData,
  Brain,
  Bot,
  Link,
  PenLine,
  Zap,
  BarChart2,
  Settings2,
  Plug,
  Monitor,
  Wrench,
} from 'lucide-angular';

interface Skill {
  title: string;
  icon: LucideIconData;
  technologies: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective, LucideAngularModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills: Skill[] = [
    {
      title: 'AI Development',
      icon: Brain,
      technologies: ['LLM APIs', 'OpenAI', 'Anthropic Claude', 'Model Selection', 'Fine-tuning', 'Embeddings'],
    },
    {
      title: 'AI Agents',
      icon: Bot,
      technologies: ['Agent Architecture', 'Tool Calling', 'Function Calling', 'Guardrails', 'Memory Systems', 'ReAct Pattern'],
    },
    {
      title: 'LLM Integration',
      icon: Link,
      technologies: ['API Integration', 'Streaming', 'Context Management', 'Token Optimization', 'Response Parsing', 'Error Handling'],
    },
    {
      title: 'Prompt Engineering',
      icon: PenLine,
      technologies: ['Chain-of-Thought', 'Few-Shot', 'System Prompts', 'Output Structuring', 'Prompt Testing', 'Iterative Refinement'],
    },
    {
      title: 'AI Workflow Automation',
      icon: Zap,
      technologies: ['n8n', 'Trigger/Actions', 'Datenpipelines', 'Klassifikation', 'Routing', 'Error Recovery'],
    },
    {
      title: 'AI Data Analysis',
      icon: BarChart2,
      technologies: ['Datenextraktion', 'Transformation', 'Aggregation', 'Anomalieerkennung', 'Reporting', 'Python/Pandas'],
    },
    {
      title: 'AI Automation Systems',
      icon: Settings2,
      technologies: ['End-to-End Automation', 'Regelbasierte Logik', 'Hybride Systeme', 'Monitoring', '24/7 Betrieb', 'Logging'],
    },
    {
      title: 'AI APIs Integration',
      icon: Plug,
      technologies: ['REST APIs', 'Webhook Design', 'OAuth', 'Rate Limiting', 'Multi-System Connect', 'API Versioning'],
    },
    {
      title: 'AI Dashboards',
      icon: Monitor,
      technologies: ['Angular', 'KPI-Tracking', 'Echtzeit-Updates', 'Charts', 'Filterfunktionen', 'Export'],
    },
    {
      title: 'AI Tools Development',
      icon: Wrench,
      technologies: ['Custom Tools', 'Python', 'TypeScript', 'CLI Tools', 'Interne Tooling', 'Rapid Prototyping'],
    },
  ];
}
