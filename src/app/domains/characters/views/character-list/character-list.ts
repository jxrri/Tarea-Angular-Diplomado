import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FavoritesStore } from '@platform/state/favorites.store';
import { Pager } from '@common/widgets/pager/pager';
import { CharacterCard } from '../../ui/character-card/character-card';
import { CharacterFilters } from '../../ui/character-filters/character-filters';
import { GENDERS, RACES } from '../../types/character.types';
import { CharactersApi } from '../../data/characters.api';

@Component({
  selector: 'app-character-list',
  imports: [CharacterFilters, CharacterCard, Pager],
  templateUrl: './character-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterList {
  private readonly api = inject(CharactersApi);
  protected readonly favorites = inject(FavoritesStore);
  protected readonly races = RACES;
  protected readonly genders = GENDERS;

  protected readonly text = signal('');
  protected readonly race = signal('all');
  protected readonly gender = signal('all');
  protected readonly page = signal(1);

  private readonly query = computed(() => ({
    name: this.text().trim(),
    race: this.race(),
    gender: this.gender(),
    page: this.page(),
  }));

  // Signals feed RxJS for debounce/cancellation, then come back as a signal.
  private readonly response = toSignal(
    toObservable(this.query).pipe(
      debounceTime(300),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((query) => this.api.search(query)),
    ),
  );

  protected readonly loading = computed(() => this.response() === undefined);
  protected readonly characters = computed(() => this.response()?.items ?? []);
  protected readonly total = computed(() => this.response()?.meta.totalItems ?? 0);
  protected readonly pageCount = computed(() => this.response()?.meta.totalPages ?? 0);

  protected onTextChange(text: string) {
    this.text.set(text);
    this.page.set(1);
  }

  protected onRaceChange(race: string) {
    this.race.set(race);
    this.page.set(1);
  }

  protected onGenderChange(gender: string) {
    this.gender.set(gender);
    this.page.set(1);
  }
}
