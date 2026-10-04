import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'projekte',
    loadComponent: () => import('./pages/projekte/projekte').then((m) => m.ProjekteComponent),
  },
  {
    path: 'projekte/:slug',
    loadComponent: () => import('./pages/projekt/projekt').then((m) => m.ProjektComponent),
  },

  // Alte Adressen bleiben erreichbar
  { path: 'arbeiten', redirectTo: 'projekte', pathMatch: 'full' },
  { path: 'arbeiten/:slug', redirectTo: 'projekte/:slug' },

  {
    path: 'impressum',
    loadComponent: () =>
      import('./components/pages/impressum/impressum.component').then((m) => m.ImpressumComponent),
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./components/pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: 'facts',
    loadComponent: () =>
      import('./components/pages/facts/facts.component').then((m) => m.FactsComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/nichtgefunden/nichtgefunden').then((m) => m.NichtGefundenComponent),
  },
];
