import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { FavoritesStore } from '@platform/state/favorites.store';
import { CharacterCard } from '@domains/characters/ui/character-card/character-card';
import { CharactersApi } from '@domains/characters/data/characters.api';

@Component({
  selector: 'app-saved-characters',
  imports: [CharacterCard, RouterLink],
  templateUrl: './saved-characters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCharacters {
  private readonly api = inject(CharactersApi);
  protected readonly favorites = inject(FavoritesStore);

  protected readonly characters = toSignal(
    toObservable(this.favorites.ids).pipe(switchMap((ids) => this.api.many(ids))),
    { initialValue: [] },
  );
}
