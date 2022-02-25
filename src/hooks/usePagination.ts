import { useState, useCallback } from 'react';

type PaginationProps = {
  pageCount: number
  initialState?: number
}

type PaginationFuncs = {
  set: (pageValue: number) => void
  next: () => void
  prev: () => void
  count: number
}

type Pagination = [number, PaginationFuncs]

function usePagination({ pageCount, initialState = 1 }: PaginationProps): Pagination {
  const [page, setPage] = useState<number>(initialState);

  const inc = (value: number) => {
    if (value + 1 <= pageCount) {
      return page + 1;
    }
    return pageCount;
  };

  const dec = (value: number) => {
    if (value > 1) {
      return value - 1;
    }
    return 1;
  };

  const next: PaginationFuncs['next'] = useCallback(() => setPage(inc), [page]);

  const prev: PaginationFuncs['prev'] = useCallback(() => setPage(dec), [page]);

  const set: PaginationFuncs['set'] = useCallback((value) => setPage(value), []);

  return [page, {
    set, next, prev, count: pageCount,
  }];
}

export default usePagination;
