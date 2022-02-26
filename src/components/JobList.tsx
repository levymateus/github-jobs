import React from 'react';
import styled from 'styled-components';
import { JobCardProps, JobCard } from 'components/JobCard';
import { Link } from 'react-router-dom';
import { Span } from 'components/Typo';

export type JobListProps = {
  jobs: Array<JobCardProps>
  page: number
  pageSize: number
}

const List = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;

  li + li {
    width: 100%;
    margin-top: 24px;
  }

  li:hover {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListItem = styled.li`
  width: 100%;
`;

export function JobList({
  jobs, page, pageSize,
}: JobListProps) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = jobs.slice(start, end) || [];

  return (
    <List>
      {list.map((item) => (
        <ListItem key={item?.id}>
          <Link to={{ pathname: `job/${item.id}` }} state={item}>
            <JobCard
              id={item?.id}
              company={item?.company || ''}
              location={item?.location || ['']}
              published={item?.published || ''}
              title={item?.title || ''}
              fulltime={item?.fulltime}
              src={item?.src}
              description=""
            />
          </Link>
        </ListItem>
      ))}
      {list.length <= 0 && (
      <Empty>
        <h1>No results</h1>
      </Empty>
      )}
    </List>
  );
}

export default JobList;
