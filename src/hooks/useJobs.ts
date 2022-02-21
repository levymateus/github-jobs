import { useState } from 'react';
import { BannerProps } from 'components/Banner';
import { JobCardProps } from 'components/JobCard';
import { JobListProps } from 'components/JobList';
import { LocSearchProps } from 'components/LocSearch';
import { PaginationProps } from 'components/Pagination';
import usePagination from './usePagination';
import api from '../api/api';
import useQueries from '../api/useQueries';

type LocSearchHandlers = Required<Pick<LocSearchProps, 'onChange'>>
type BannerHandlers = Required<Pick<BannerProps, 'onSearch'>>
type JobCardHandlers = Required<Pick<JobCardProps, 'onClick'>>
type JobListHandlers = Required<Pick<JobListProps, 'onLoadMore'>>
type Job = Omit<JobCardProps, 'onClick'>

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

type Response = { count: number, jobs: Job[] }
type RemotiveJob = {
  id: number,
  url: StringConstructor,
  title: string
  company_name: string
  company_logo: string
  category: string
  job_type: string
  publication_date: string
  candidate_required_location: string
  description: string
}
type Data = {
  'job-count': number
  jobs: RemotiveJob[]
}

function parseJobs(data: Data): Response {
  if (data) {
    return {
      count: data['job-count'],
      jobs: data?.jobs?.map((job) => ({
        company: job.company_name,
        id: String(job.id),
        location: [job.candidate_required_location],
        published: job.publication_date,
        title: job.title,
        fulltime: job.job_type === 'full_time',
        src: job.company_logo,
      })),
    };
  }
  return { count: 0, jobs: [] };
}

function useJobs(): Jobs {
  const store = useQueries({
    queries: [
      [
        'remotive',
        { category: 'software-dev' },
        api<Data, Response>('https://remotive.io/api/remote-jobs', parseJobs),
      ],
    ],
  });
  const pageSize = 10;

  const [page, {
    next, prev, set,
  }] = usePagination({ pageCount: store.remotive?.data?.count || 1 / pageSize });

  const onChange: Jobs['onChange'] = (field) => {
    // console.log(field);
  };

  const onSearch: Jobs['onSearch'] = (search) => {
    // console.log(search);
  };

  const onClick: Jobs['onClick'] = ({ id }) => {
    // console.log(id);
  };

  const onLoadMore: Jobs['onLoadMore'] = () => {
    // const start = (page - 1) * pageSize;
    // const end = start + pageSize;
  };

  const jobs = store?.remotive?.data?.jobs || [];
  const pageCount = store?.remotive?.data?.count;

  return {
    pageCount,
    pageSize,
    onChange,
    onSearch,
    jobs,
    page,
    onClick,
    onLoadMore,
    onNext: next,
    onPrev: prev,
    onSelect: set,
  };
}

export default useJobs;
