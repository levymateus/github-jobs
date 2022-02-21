import React from 'react';
import styled from 'styled-components';
import { JobCardProps, JobCard } from 'components/JobCard';
import useScroll from 'hooks/useScroll';

export type JobListProps = {
  jobs: Array<Omit<JobCardProps, 'onClick'>>
  onJobCardClick: JobCardProps['onClick']
  page: number
  pageSize: number
  onLoadMore?: () => void
}

const List = styled.ul`
  width: 100%;
  list-style: none;

  li + li {
    width: 100%;
    margin-top: 24px;
  }

  li:hover {
    cursor: pointer;
  }
`;

const ListItem = styled.li`
  width: 100%;
`;

export function JobList({
  jobs, page, pageSize, onJobCardClick, onLoadMore,
}: JobListProps) {
  useScroll((pos) => pos === 'bottom' && onLoadMore && onLoadMore());
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return (
    <List>
      {jobs.slice(start, end).map((item) => (
        <ListItem key={item.id}>
          <JobCard
            id={item.id}
            onClick={onJobCardClick}
            company={`${item?.company}[${item.id}]` || ''}
            location={item?.location || ['']}
            published={item?.published || ''}
            title={item?.title || ''}
            fulltime={item.fulltime}
            src={item.src}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default JobList;
