import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideStar, LucideZap } from '@lucide/angular';
import { FavoritesStore } from '@platform/state/favorites.store';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, RouterLinkActive, LucideZap, LucideStar],
  templateUrl: './top-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBar {
  protected readonly heading = signal('Directorio de Personajes');
  protected readonly favorites = inject(FavoritesStore);
}
