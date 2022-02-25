import api from './api';
import type { Response } from '../types';

const url = 'https://remotive.io/api/remote-jobs';

type RemotiveJob = {
  id: number,
  url: string,
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

function handleResponse(data: Data): Response {
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
  return { count: 1, jobs: [] };
}

const remotive = api<Data, Response>(url, handleResponse);

export default remotive;
