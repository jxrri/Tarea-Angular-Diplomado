import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideSearch } from '@lucide/angular';

@Component({
  selector: 'app-character-filters',
  imports: [LucideSearch],
  templateUrl: './character-filters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterFilters {
  readonly text = input('');
  readonly race = input('all');
  readonly races = input.required<string[]>();

  readonly gender = input('all');
  readonly genders = input.required<string[]>();

  readonly textChange = output<string>();
  readonly raceChange = output<string>();
  readonly genderChange = output<string>();

  protected onTyping(event: Event) {
    this.textChange.emit((event.target as HTMLInputElement).value);
  }

  protected onRacePicked(event: Event) {
    this.raceChange.emit((event.target as HTMLSelectElement).value);
  }

  protected onGenderPicked(event: Event) {
    this.genderChange.emit((event.target as HTMLSelectElement).value);
  }
}
