import { Injectable, computed, effect, signal } from '@angular/core';

const STORAGE_KEY = 'favoritos';

/** Set of favorite character ids shared by the whole app and mirrored to localStorage. */
@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private readonly selected = signal<number[]>(restore());

  readonly ids = this.selected.asReadonly();
  readonly count = computed(() => this.selected().length);

  constructor() {
    effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(this.selected())));
  }

  has(id: number) {
    return this.selected().includes(id);
  }

  toggle(id: number) {
    this.selected.update((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  }
}

function restore(): number[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}
