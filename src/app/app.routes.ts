import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'personajes', pathMatch: 'full' },
  {
    path: 'personajes',
    loadChildren: () => import('./domains/characters/characters.routes').then((m) => m.CHARACTER_ROUTES),
  },
  {
    path: 'planetas',
    loadChildren: () => import('./domains/planets/planets.routes').then((m) => m.PLANET_ROUTES),
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./domains/favorites/favorites.routes').then((m) => m.FAVORITE_ROUTES),
  },
  {
    path: 'sugerir',
    loadChildren: () => import('./domains/suggestions/suggestions.routes').then((m) => m.SUGGESTION_ROUTES),
  },
  {
    // Catch-all: must stay last.
    path: '**',
    title: 'No encontrada',
    loadComponent: () => import('./platform/layout/not-found/not-found').then((m) => m.NotFound),
  },
];
