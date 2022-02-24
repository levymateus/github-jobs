import React from 'react';
import styled from 'styled-components';
import { JobCardProps, JobCard } from 'components/JobCard';
import { Link } from 'react-router-dom';

export type JobListProps = {
  jobs: Array<Omit<JobCardProps, 'onClick'>>
  page: number
  pageSize: number
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

  a {
    text-decoration: none;
  }
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
          <Link to={{ pathname: `job/${item.id}` }}>
            <JobCard
              id={item?.id}
              company={item?.company || ''}
              location={item?.location || ['']}
              published={item?.published || ''}
              title={item?.title || ''}
              fulltime={item?.fulltime}
              src={item?.src}
            />
          </Link>
        </ListItem>
      ))}
      {list.length <= 0 && <p>Nothing</p>}
    </List>
  );
}

export default JobList;
