import { Routes } from '@angular/router';

export const CHARACTER_ROUTES: Routes = [
  {
    path: '',
    title: 'Personajes',
    loadComponent: () => import('./views/character-list/character-list').then((m) => m.CharacterList),
  },
  {
    path: ':id',
    title: 'Detalle',
    loadComponent: () => import('./views/character-detail/character-detail').then((m) => m.CharacterDetail),
  },
];
