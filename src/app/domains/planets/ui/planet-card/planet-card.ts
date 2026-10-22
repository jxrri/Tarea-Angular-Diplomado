import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Planet } from '../../types/planet.types';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetCard {
  readonly planet = input.required<Planet>();
  readonly expanded = signal(false);

  protected toggleExpanded() {
    this.expanded.update((open) => !open);
  }
}
