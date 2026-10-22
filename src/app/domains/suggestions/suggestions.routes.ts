import { Routes } from '@angular/router';

export const SUGGESTION_ROUTES: Routes = [
  {
    path: '',
    title: 'Sugerir personaje',
    loadComponent: () => import('./views/suggest-character/suggest-character').then((m) => m.SuggestCharacter),
  },
];
