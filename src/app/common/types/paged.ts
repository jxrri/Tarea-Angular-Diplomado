/** Paginated envelope returned by the API; generic over the item type. */
export interface Paged<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

/** Wraps a plain array in the paginated shape, as a single page. */
export function singlePage<T>(items: T[]): Paged<T> {
  return {
    items,
    meta: {
      totalItems: items.length,
      itemCount: items.length,
      itemsPerPage: items.length,
      totalPages: items.length ? 1 : 0,
      currentPage: 1,
    },
  };
}
