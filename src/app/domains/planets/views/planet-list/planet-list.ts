import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Pager } from '@common/widgets/pager/pager';
import { PlanetsApi } from '../../data/planets.api';
import { PlanetCard } from '../../ui/planet-card/planet-card';

@Component({
  selector: 'app-planet-list',
  imports: [Pager, PlanetCard],
  templateUrl: './planet-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetList {
  private readonly api = inject(PlanetsApi);

  protected readonly page = signal(1);

  private readonly response = toSignal(
    toObservable(this.page).pipe(switchMap((page) => this.api.list(page))),
  );

  protected readonly loading = computed(() => this.response() === undefined);
  protected readonly planets = computed(() => this.response()?.items ?? []);
  protected readonly total = computed(() => this.response()?.meta.totalItems ?? 0);
  protected readonly pageCount = computed(() => this.response()?.meta.totalPages ?? 0);
}
