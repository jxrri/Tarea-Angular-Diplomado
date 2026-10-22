import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideImageOff, LucideStar, LucideZap } from '@lucide/angular';
import { Character } from '../../types/character.types';

@Component({
  selector: 'app-character-card',
  // Masonry columns need each card to stay in one piece and carry its own bottom margin.
  host: { class: 'mb-4 block break-inside-avoid' },
  imports: [RouterLink, LucideZap, LucideImageOff, LucideStar],
  templateUrl: './character-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCard {
  readonly character = input.required<Character>();
  readonly isFavorite = input(false);

  /** Emits the character id when the favorite button is pressed. */
  readonly favoriteToggled = output<number>();

  protected readonly imageFailed = signal(false);

  protected onToggle() {
    this.favoriteToggled.emit(this.character().id);
  }
}
