import { useState } from 'react';
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

type LocSearchHandlers = Required<Pick<LocSearchProps, 'onChange'>>
type BannerHandlers = Required<Pick<BannerProps, 'onSearch'>>

export type Jobs = {
  pageCount: number
  pageSize: number
  page: number
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

function useJobs(props: JobProps): Jobs {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState<SearchState>(initialSeachState);
  const [fulltime, setFulltime] = useState(true);
  const isMobile = useMediaQuery<boolean, boolean>(mobile, true, false);
  const pageSize = isMobile ? jobs.length : props.pageSize;
  const pageCount = Math.ceil(jobs.length / pageSize);
  const [page, {
    next, prev, set: setPage,
  }] = usePagination({ pageCount });

  const { data, isFetching } = useQuery<unknown, Job[], Response>(
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
    if (field.name === 'fulltime') {
      setFulltime(Boolean(field.checked));
      if (data) {
        setJobs(data.jobs.filter((job) => job.fulltime === Boolean(field.checked)));
      }
    } else {
      setSearch((prevState) => ({
        ...prevState,
        search: field.value,
      }));
    }
  };

  const onSearch: Jobs['onSearch'] = (searchSrt) => {
    const [title, company, expertise, benefits]: (string | undefined)[] = searchSrt.split(',');
    setSearch((prevState) => ({
      ...prevState,
      search: `${title || ''} ${expertise || ''} ${benefits || ''}`,
      company_name: company || '',
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
    onSelect: setPage,
  };
}

export default useJobs;
