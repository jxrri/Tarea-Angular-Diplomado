import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { FavoritesStore } from './favorites.store';

describe('FavoritesStore', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', { getItem: vi.fn(), setItem: vi.fn(), clear: vi.fn() });
    localStorage.clear();
  });

  it('adds and removes a favorite', () => {
    const store = TestBed.inject(FavoritesStore);
    store.toggle(1);
    expect(store.has(1)).toBe(true);
    expect(store.count()).toBe(1);
    store.toggle(1);
    expect(store.has(1)).toBe(false);
  });
});
