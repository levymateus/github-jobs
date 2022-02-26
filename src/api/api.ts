import { QueryFunction } from 'react-query';
import qs from 'qs';

type ApiResponseCallback<Data, Response> = (data: Data) => Response

/**
 * Creates a API handler.
 * @param baseUrl - The API url.
 * @param callback - An callback function that handler the API responses.
 * @returns A formated data from the api calls.
 */
const api = <Data, Response>(
  baseUrl: string,
  callback: ApiResponseCallback<Data, Response>,
): QueryFunction => async ({ queryKey }) => {
    const [_, options] = queryKey;
    const params = qs.stringify(options, { encodeValuesOnly: true });
    let url = baseUrl;
    if (params) {
      url += `?${params}`;
    }
    const response = await window.fetch(url);
    if (response.status === 200) {
      const data = await response.json() as unknown;
      return callback(data as Data);
    }
    throw new Error(response.statusText);
  };

export default api;
