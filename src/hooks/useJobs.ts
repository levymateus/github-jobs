import { useEffect, useState } from 'react';
import { BannerProps } from 'components/Banner';
import { JobCardProps } from 'components/JobCard';
import { JobListProps } from 'components/JobList';
import { LocSearchProps } from 'components/LocSearch';
import { PaginationProps } from 'components/Pagination';
import usePagination from './usePagination';
import useQueries from '../api/useQueries';
import Filter from '../utils/filter';
import useIsMounted from './useIsMounted';
import remotiveAPI from '../api/remotive';
import type {
  Response,
  Job,
  SeachTerms,
  Field,
} from '../types';
import jobsFiler from '../utils/jobs-filter';

type LocSearchHandlers = Required<Pick<LocSearchProps, 'onChange'>>
type BannerHandlers = Required<Pick<BannerProps, 'onSearch'>>
type JobCardHandlers = Required<Pick<JobCardProps, 'onClick'>>
type JobListHandlers = Required<Pick<JobListProps, 'onLoadMore'>>

export type Jobs = {
  pageCount: number
  pageSize: number
  page: number
  jobs: Job[]
} & LocSearchHandlers
  & BannerHandlers
  & JobCardHandlers
  & JobListHandlers
  & PaginationProps

type Store = {
  'remotive': {
    data: Response | undefined
  } | undefined
}

type SearchState = Record<SeachTerms, Omit<Field, 'name'>>

const initialSeachState: SearchState = {
  title: { value: '' },
  company: { value: '' },
  expertise: { value: '' },
  benefits: { value: '' },
  city: { value: 'europe' },
  state: { value: '' },
  zip: { value: '' },
  country: { value: '' },
  fulltime: { value: '', checked: true },
};

function useJobs({ pageSize }: { pageSize: number }): Jobs {
  const isMounted = useIsMounted();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState<SearchState>(initialSeachState);

  async function exec(filter: Filter<Job>) {
    const res = await filter.exec();
    if (!(res instanceof Error) && res && isMounted()) {
      return res;
    }
    throw new Error('Error on execute filter');
  }

  const store = useQueries<Store>({
    queries: [
      [
        'remotive',
        { category: 'software-dev' }, remotiveAPI,
        {
          enabled: true,
          notifyOnChangeProps: ['data'],
          onSuccess: (data) => {
            const filter = jobsFiler((data as Response).jobs, search);
            exec(filter).then((res) => setJobs(res));
          },
        },
      ],
    ],
  });
  const results = store?.remotive?.data?.jobs || [];

  const [page, {
    next, prev, set: setPage, count: pageCount,
  }] = usePagination({ pageCount: Math.floor(jobs.length / pageSize) });

  const onChange: Jobs['onChange'] = (field) => {
    setSearch((prevState) => ({
      ...prevState,
      [field.name]: { value: field.value, checked: field.checked },
    }));
  };

  const onSearch: Jobs['onSearch'] = (searchSrt) => {
    const [title, company, expertise, benefits] = searchSrt.split(',');
    setSearch((prevState) => ({
      ...prevState,
      title: { value: title },
      company: { value: company },
      expertise: { value: expertise },
      benefits: { value: benefits },
    }));
  };

  const onClick: Jobs['onClick'] = ({ id }) => {
    // console.log(id);
  };

  const onLoadMore: Jobs['onLoadMore'] = () => {
    // const start = (page - 1) * pageSize;
    // const end = start + pageSize;
  };

  useEffect(() => {
    if (results) {
      const filter = jobsFiler(results, search);
      exec(filter).then((res) => {
        setJobs(res);
        setPage(1);
      });
    }
  }, [search]);

  return {
    onNext: next,
    onPrev: prev,
    jobs,
    page,
    onSearch,
    pageCount,
    pageSize,
    onLoadMore,
    onClick,
    onChange,
    onSelect: setPage,
  };
}

export default useJobs;
