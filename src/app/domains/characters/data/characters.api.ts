import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { API_BASE_URL } from '@platform/config/endpoints';
import { Paged, singlePage } from '@common/types/paged';
import { Character, CharacterDetail, CharacterQuery } from '../types/character.types';

@Injectable({ providedIn: 'root' })
export class CharactersApi {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/characters`;
  private readonly pageSize = 12;

  /**
   * Without filters the API paginates (page/limit); with any filter it answers
   * a bare array, which is wrapped into a single page so callers see one shape.
   */
  search(query: CharacterQuery): Observable<Paged<Character>> {
    const filtered = query.name !== '' || query.race !== 'all' || query.gender !== 'all';

    let params = new HttpParams();
    if (filtered) {
      if (query.name) params = params.set('name', query.name);
      if (query.race !== 'all') params = params.set('race', query.race);
      if (query.gender !== 'all') params = params.set('gender', query.gender);
    } else {
      params = params.set('page', query.page).set('limit', this.pageSize);
    }

    return this.http.get<Paged<Character> | Character[]>(this.endpoint, { params }).pipe(
      map((body) => (Array.isArray(body) ? singlePage(body) : body)),
      // A 404 means "no matches"; anything else is a real failure.
      catchError((err: HttpErrorResponse) =>
        err.status === 404 ? of(singlePage<Character>([])) : throwError(() => err),
      ),
    );
  }

  /** One request per id, run in parallel. */
  many(ids: number[]): Observable<Character[]> {
    return ids.length ? forkJoin(ids.map((id) => this.byId(id))) : of([]);
  }

  byId(id: number): Observable<CharacterDetail> {
    return this.http.get<CharacterDetail>(`${this.endpoint}/${id}`);
  }
}
