import { ChangeDetectionStrategy, Component, inject, input, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { LucideArrowLeft, LucideGlobe, LucideStar, LucideZap } from '@lucide/angular';
import { switchMap } from 'rxjs';
import { FavoritesStore } from '@platform/state/favorites.store';
import { CharactersApi } from '../../data/characters.api';

@Component({
  selector: 'app-character-detail',
  imports: [RouterLink, LucideArrowLeft, LucideGlobe, LucideStar, LucideZap],
  templateUrl: './character-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetail {
  private readonly api = inject(CharactersApi);
  protected readonly favorites = inject(FavoritesStore);

  /** Bound from the :id route parameter (withComponentInputBinding). */
  readonly id = input.required({ transform: numberAttribute });

  protected readonly character = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.api.byId(id))),
  );
}
