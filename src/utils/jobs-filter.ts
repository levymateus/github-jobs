import Filter from './filter';
import type { Job, SeachTerms, Field } from '../types';

type SearchState = Record<SeachTerms, Omit<Field, 'name'>>

const jobsFilter = (results: Job[], search: SearchState) => {
  const searchSrt = Object.entries(search).map(([_, { value }]) => value).join(',');
  const searchKeys = Object.keys(search).join(',');
  return new Filter<Job>(results, { separator: ',' })
    .from(searchSrt, searchKeys)
    .where(({ name, value }, item) => {
      switch (name) {
        case 'title':
          return item.title.toLowerCase().includes(String(value));
        case 'company':
          return item.company.toLowerCase().includes(String(value));
        case 'expertise':
          return item.title.toLowerCase().includes(String(value));
        case 'benefits':
        case 'city':
        case 'state':
        case 'country':
        case 'zip':
          return item.location.some((loc) => loc.toLowerCase().includes(String(value)));
        case 'fulltime':
          return Boolean(item.fulltime) === Boolean(search.fulltime.checked);
        default:
          return true;
      }
    });
};

export default jobsFilter;
