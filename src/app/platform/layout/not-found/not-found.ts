import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="py-16 text-center">
      <h2 class="text-3xl font-bold">Esta página se fue a otra dimensión</h2>
      <p class="mt-2 text-stone-500">Revisa la dirección o vuelve al inicio.</p>
      <a routerLink="/personajes" class="mt-6 inline-block rounded-lg bg-capsula-700 px-4 py-2 text-white">Ir al directorio</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
