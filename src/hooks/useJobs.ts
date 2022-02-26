import { useRef, useState } from 'react';
import { BannerProps } from 'components/Banner';
import { LocSearchProps } from 'components/LocSearch';
import { PaginationProps } from 'components/Pagination';
import { useQuery } from 'react-query';
import usePagination from './usePagination';
import useMediaQuery from './useMediaQuery';
import remotiveAPI from '../api/remotive';
import { mobile } from '../utils/media-queries';
import type {
  Response,
  Job,
} from '../types';
import useIsMounted from './useIsMounted';

type LocSearchHandlers = Required<Pick<LocSearchProps, 'onChange'>>
type BannerHandlers = Required<Pick<BannerProps, 'onSearch'>>

export type Jobs = {
  pageCount: number
  pageSize: number
  page: number
  isError: boolean
  isFetching: boolean
  jobs: Job[]
} & LocSearchHandlers
  & BannerHandlers
  & PaginationProps

type JobProps = { pageSize: number }

type SearchState = Record<'search' | 'category' | 'company_name', string>
const initialSeachState: SearchState = {
  search: 'london',
  category: '',
  company_name: '',
};

async function filterJobsAsync(jobs: Job[], props: { fulltime: boolean }) {
  return jobs.filter((job) => job.fulltime === Boolean(props.fulltime));
}

function useJobs(props: JobProps): Jobs {
  const isMounted = useIsMounted();
  const [jobs, setJobs] = useState<Job[]>([]);
  const searchRef = useRef<string>('');
  const fixedLocationRef = useRef<string>('london');
  const locationRef = useRef<string>('');
  const [search, setSearch] = useState<SearchState>(initialSeachState);
  const [fulltime, setFulltime] = useState(true);
  const isMobile = useMediaQuery<boolean, boolean>(mobile, true, false);
  const pageSize = isMobile ? jobs.length : props.pageSize;
  const pageCount = Math.ceil(jobs.length / pageSize);
  const [page, {
    next, prev, set: setPage,
  }] = usePagination({ pageCount });

  const { data, isFetching, isError } = useQuery<unknown, Job[], Response>(
    ['remotive', search],
    remotiveAPI,
    {
      enabled: true,
      notifyOnChangeProps: ['data'],
      onSuccess: (res) => {
        setJobs(() => res.jobs.filter((job) => job.fulltime === fulltime));
        setPage(1);
      },
    },
  );

  const onChange: Jobs['onChange'] = (field) => {
    if (field.name === 'city') {
      fixedLocationRef.current = field.value;
    }
    if (field.name === 'city,state,zip,country') {
      locationRef.current = field.value;
    }
    if (field.name === 'fulltime') {
      setFulltime(Boolean(field.checked));
      if (data) {
        filterJobsAsync(data.jobs, { fulltime: Boolean(field.checked) })
          .then((res) => {
            if (isMounted()) {
              setJobs(res);
            }
          });
      }
    } else {
      setSearch((prevState) => ({
        ...prevState,
        search: `${searchRef.current} ${locationRef.current || fixedLocationRef.current}`.trim(),
      }));
    }
  };

  const onSearch: Jobs['onSearch'] = (searchSrt) => {
    const [title, company, expertise, benefits]: (string | undefined)[] = searchSrt.split(',');
    searchRef.current = [(title || '').trim(), (expertise || '').trim(), (benefits || '').trim()].join(' ').trim();
    setSearch((prevState) => ({
      ...prevState,
      search: `${searchRef.current} ${fixedLocationRef.current}`.trim(),
      company_name: (company || '').trim(),
      category: '',
    }));
  };

  return {
    onNext: next,
    onPrev: prev,
    jobs,
    page,
    onSearch,
    pageCount,
    pageSize,
    onChange,
    isFetching,
    isError,
    onSelect: setPage,
  };
}

export default useJobs;
