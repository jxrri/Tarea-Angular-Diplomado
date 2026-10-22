import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Planeta } from '../../../personajes/models/personaje.model';

@Component({
  selector: 'app-planeta-card',
  templateUrl: './planeta-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetaCard {
  readonly planeta = input.required<Planeta>();
  readonly expandido = signal(false);
  protected toggle() { this.expandido.update((v) => !v); }
}