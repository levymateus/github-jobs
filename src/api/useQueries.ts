import { QueryFunction, useQuery } from 'react-query';

type Options = Parameters<typeof useQuery>['2']
type Query<Params> = [string, Params | null, QueryFunction, Options]
type Queries = {
  queries: Query<unknown>[]
}

/**
 * Make mutiples queries.
 * @param Queries - Configured `queries`.
 * @returns An object with key and querie results meta and data.
 */
function useQueries<Store>({ queries }: Queries): Store {
  const store: { [key: string]: any } = {};
  queries.forEach((query) => {
    const [key, params, fn, options] = query;
    store[key] = useQuery([key, params], fn, options);
  });
  return store as Store;
}

export default useQueries;
