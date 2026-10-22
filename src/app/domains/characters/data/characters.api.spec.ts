import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CharactersApi } from './characters.api';

describe('CharactersApi', () => {
  let api: CharactersApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(CharactersApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('without filters it sends page and limit', () => {
    api.search({ page: 2, name: '', race: 'all', gender: 'all' }).subscribe();
    const req = http.expectOne((r) => r.url.endsWith('/characters'));
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('limit')).toBe('12');
    expect(req.request.params.has('name')).toBe(false);
    expect(req.request.params.has('gender')).toBe(false);
    req.flush({ items: [], meta: { totalItems: 0, itemCount: 0, itemsPerPage: 12, totalPages: 0, currentPage: 2 } });
  });

  it('with filters it sends name, race and gender and wraps the array into a page', () => {
    let total = -1;
    api.search({ page: 1, name: 'goku', race: 'Saiyan', gender: 'Male' }).subscribe((r) => (total = r.meta.totalItems));
    const req = http.expectOne((r) => r.url.endsWith('/characters'));
    expect(req.request.params.get('name')).toBe('goku');
    expect(req.request.params.get('race')).toBe('Saiyan');
    expect(req.request.params.get('gender')).toBe('Male');
    expect(req.request.params.has('page')).toBe(false);
    req.flush([{ id: 1, name: 'Goku' }]);
    expect(total).toBe(1);
  });

  it('turns a 404 into zero results', () => {
    let total = -1;
    api.search({ page: 1, name: 'zzz', race: 'all', gender: 'all' }).subscribe((r) => (total = r.meta.totalItems));
    http.expectOne(() => true).flush({ message: 'Not found' }, { status: 404, statusText: 'Not Found' });
    expect(total).toBe(0);
  });

  it('many() issues one request per id', () => {
    let names: string[] = [];
    api.many([1, 2]).subscribe((list) => (names = list.map((c) => c.name)));
    http.expectOne((r) => r.url.endsWith('/characters/1')).flush({ id: 1, name: 'Goku' });
    http.expectOne((r) => r.url.endsWith('/characters/2')).flush({ id: 2, name: 'Vegeta' });
    expect(names).toEqual(['Goku', 'Vegeta']);
  });
});
