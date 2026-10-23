import { Routes } from '@angular/router';

export const PLANET_ROUTES: Routes = [
  {
    path: '',
    title: 'Planetas | Directorio DB',
    loadComponent: () => import('./views/planet-list/planet-list').then((m) => m.PlanetList),
  },
];
