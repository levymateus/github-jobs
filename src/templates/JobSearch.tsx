import React from 'react';
import {
  Banner,
  LocSearch,
  JobList,
  Pagination,
  LocSearchProps,
  PaginationProps,
  Roller,
  JobCardProps,
} from 'components';
import styled, { css } from 'styled-components';
import { toString } from '../utils/toString';

type BaseJobSearchProps = {
  page: number
  jobs: Array<JobCardProps>
  pageSize: number
  isFetching: boolean
  onSearch: (search: string) => void
}

type JobsSearchProps = BaseJobSearchProps & Pick<LocSearchProps, 'onChange'> & PaginationProps

type SectionProps = {
  name: 'banner' | 'location' | 'jobs' | 'footer'
  loading?: 'true' | 'false'
}

const Main = styled.main`
  @media screen and (max-width: 790px) {
    & > section {
      margin-top: 42px;
    }
    section + section {
      margin-top: 32px;
    }
  }

  @media screen and (min-width: 790px) {
    display: grid;
    grid-template-columns: 34% 1fr;
    margin: auto;
    max-width: 1200px;
    grid-column-gap: 32px;
    grid-row-gap: 16px;
  }

  @media screen and (max-width: 790px) {
    width: 100%;
  }
`;

const Section = styled.section<SectionProps>`
  ${(props) => props.name === 'jobs' && props.loading === 'true' && css`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
  @media screen and (min-width: 790px) {
    ${(props) => props.name === 'banner' && css`
      grid-column: 1 / 3;
      margin-bottom: 32px;
    `}
    ${(props) => props.name === 'footer' && css`
      grid-column: 2 / 3;
      display: flex;
      justify-content: flex-end;
    `}
    ${(props) => props.name === 'jobs' && css`
      grid-column: 2 / 3;
    `}
    ${(props) => props.name === 'location' && css`
      grid-column: 1 / 2;
    `}
  }

  @media screen and (max-width: 790px) {
    width: 100%;
  }
`;

export function JobsSearch({
  onSearch,
  page,
  jobs,
  onChange,
  pageCount,
  onNext,
  onPrev,
  onSelect,
  pageSize,
  isFetching,
}: JobsSearchProps) {
  return (
    <Main>
      <Section name="banner">
        <Banner onSearch={onSearch} />
      </Section>
      <Section name="location">
        <LocSearch onChange={onChange} />
      </Section>
      <Section name="jobs" loading={toString(isFetching)}>
        {!isFetching ? (
          <JobList
            pageSize={pageSize}
            page={page}
            jobs={jobs}
          />
        ) : <Roller />}
      </Section>
      <Section name="footer">
        {!isFetching ? (
          <Pagination
            pageCount={pageCount}
            page={page}
            onNext={onNext}
            onPrev={onPrev}
            onSelect={onSelect}
          />
        ) : null}
      </Section>
    </Main>
  );
}

export default JobsSearch;
