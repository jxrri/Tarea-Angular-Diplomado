import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@platform/config/endpoints';
import { Paged } from '@common/types/paged';
import { Planet } from '../types/planet.types';

@Injectable({ providedIn: 'root' })
export class PlanetsApi {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/planets`;
  private readonly pageSize = 12;

  list(page: number): Observable<Paged<Planet>> {
    const params = new HttpParams().set('page', page).set('limit', this.pageSize);
    return this.http.get<Paged<Planet>>(this.endpoint, { params });
  }
}
