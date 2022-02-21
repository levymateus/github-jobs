import { QueryFunction, useQuery } from 'react-query';

type Query<Params> = [string, Params | null, QueryFunction]
type Queries = {
  queries: Query<unknown>[]
}

/**
 * Make mutiples queries.
 * @param Queries - Configured `queries`.
 * @returns An object with key and querie results meta and data.
 */
function useQueries({ queries }: Queries) {
  const store: { [key: string]: any } = {};
  queries.forEach((query) => {
    const [key, params, fn] = query;
    store[key] = useQuery([key, params], fn, { enabled: true, notifyOnChangeProps: ['data'] });
  });
  return store;
}

export default useQueries;
