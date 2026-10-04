import {
  Bot, Library, Plug, Workflow, LayoutTemplate, ShieldCheck, type LucideIconData,
} from 'lucide-angular';

/**
 * Tech-Stack in sechs Gruppen, zweispaltig auf breiten Flächen. Bewusst klein:
 * Es steht nur, was in den dokumentierten Projekten tatsächlich vorkommt.
 */
export interface StackGruppe {
  titel: string;
  icon: LucideIconData;
  eintraege: string[];
}

export const STACK: StackGruppe[] = [
  {
    titel: 'AI-Systeme & Agenten',
    icon: Bot,
    eintraege: [
      'AI Agents', 'Multi-Agent Workflows', 'Tool Calling', 'Structured Outputs',
      'Human-in-the-loop', 'Prompt Engineering',
    ],
  },
  {
    titel: 'RAG & Retrieval',
    icon: Library,
    eintraege: ['RAG', 'Embeddings', 'Vector Search', 'Chunking', 'pgvector'],
  },
  {
    titel: 'LLM & Integration',
    icon: Plug,
    eintraege: ['OpenAI', 'Claude', 'OpenRouter', 'MCP', 'REST APIs', 'Webhooks'],
  },
  {
    titel: 'Automation & Backend',
    icon: Workflow,
    eintraege: ['Python', 'n8n', 'FastAPI', 'PostgreSQL', 'Supabase', 'Docker', 'Traefik'],
  },
  {
    titel: 'Frontend',
    icon: LayoutTemplate,
    eintraege: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'SCSS'],
  },
  {
    titel: 'Production AI',
    icon: ShieldCheck,
    eintraege: ['Error Handling', 'Fallbacks', 'Logging', 'Observability', 'Credential Management'],
  },
];
