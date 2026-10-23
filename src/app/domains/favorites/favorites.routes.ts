import { Routes } from '@angular/router';

export const FAVORITE_ROUTES: Routes = [
  {
    path: '',
    title: 'Favoritos',
    loadComponent: () => import('./views/saved-characters/saved-characters').then((m) => m.SavedCharacters),
  },
];
