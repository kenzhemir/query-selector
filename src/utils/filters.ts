export function any(): true {
  return true;
}

export function none(): false {
  return false;
}

export type FilterPredicate<T> = (element: T) => boolean;

export function combineFilters<T>(
  ...filters: FilterPredicate<T>[]
): FilterPredicate<T> {
  return function aggregatedAndFilter(element: T): boolean {
    return filters.every((filterFn) => filterFn(element));
  };
}
