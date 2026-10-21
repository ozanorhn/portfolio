import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { BlogService } from './data/blog';
import { GlossarService } from './data/glossar';
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

  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then((m) => m.BlogComponent),
    resolve: { vorab: () => inject(BlogService).liste() },
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog-artikel/blog-artikel').then((m) => m.BlogArtikelComponent),
    // Artikel vor dem Aktivieren laden: der vorgerenderte Inhalt bleibt stehen, bis die Daten da sind.
    resolve: { vorab: (r: ActivatedRouteSnapshot) => inject(BlogService).artikel(r.paramMap.get('slug') ?? '') },
  },

  {
    path: 'glossar',
    loadComponent: () => import('./pages/glossar/glossar').then((m) => m.GlossarComponent),
    resolve: { vorab: () => inject(GlossarService).liste() },
  },
  {
    path: 'glossar/:slug',
    loadComponent: () =>
      import('./pages/glossar-begriff/glossar-begriff').then((m) => m.GlossarBegriffComponent),
    // Daten vor dem Aktivieren laden: der vorgerenderte Inhalt bleibt stehen (kein Layout-Shift).
    resolve: { vorab: (r: ActivatedRouteSnapshot) => inject(GlossarService).begriff(r.paramMap.get('slug') ?? '') },
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
