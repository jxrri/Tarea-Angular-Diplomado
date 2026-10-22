import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '@core/config/api';
import { Pagina } from '@shared/models/pagina.model';
import { Planeta } from '../../personajes/models/personaje.model';

@Injectable({ providedIn: 'root' })
export class PlanetasService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_URL}/planets`;
  private readonly porPagina = 12;

  buscar(pagina: number): Observable<Pagina<Planeta>> {
    const params = new HttpParams().set('page', pagina).set('limit', this.porPagina);
    return this.http.get<Pagina<Planeta>>(this.url, { params });
  }
}
