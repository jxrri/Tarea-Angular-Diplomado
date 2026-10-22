import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Paginador } from '@shared/ui/paginador/paginador';
import { PlanetasService } from '../../services/planetas.service';
import { PlanetaCard } from '../../components/planeta-card/planeta-card';

@Component({
  selector: 'app-lista-planetas',
  imports: [Paginador, PlanetaCard],
  templateUrl: './lista-planetas.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaPlanetas {
  private readonly servicio = inject(PlanetasService);
  
  protected readonly pagina = signal(1);
  
  private readonly respuesta = toSignal(
    toObservable(this.pagina).pipe(
      switchMap((p) => this.servicio.buscar(p)),
    ),
  );

  protected readonly cargando = computed(() => this.respuesta() === undefined);
  protected readonly planetas = computed(() => this.respuesta()?.items ?? []);
  protected readonly total = computed(() => this.respuesta()?.meta.totalItems ?? 0);
  protected readonly totalPaginas = computed(() => this.respuesta()?.meta.totalPages ?? 0);
}
