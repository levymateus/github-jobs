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
  area: 'banner' | 'location' | 'jobs' | 'footer'
  loading?: 'true' | 'false'
}

const Main = styled.main`
  @media screen and (max-width: 790px) {
    display: flex;
    flex-direction: column;

    section + section {
      margin-top: 32px;
    }
  }

  @media screen and (min-width: 790px) {
    display: grid;
    grid-template-areas:
        "banner banner"
        "location jobs"
        "footer footer";
    grid-template-rows: auto;
    max-width: 1200px;
    margin: auto;
    gap: 32px;
    box-sizing: content-box;
  }
`;

const Section = styled.section<SectionProps>`
  width: 100%;
  height: 100%;
  grid-area: ${(props) => props.area};

  ${({ loading }) => loading && loading === 'true' && css`
    display: flex;
    justify-content: center;
  `}

  ${(props) => props.area === 'jobs' && css`
    max-width: 100%;
    min-width: 100%;
    align-items: center;
  `}

  ${(props) => props.area === 'location' && css`
    @media screen and (max-width: 790px) {
      max-width: 100%;
      min-width: 100%;
    }

    @media screen and (min-width: 790px) {
      max-width: 512px;
      min-width: 375px;
    }
  `}

  ${(props) => props.area === 'footer' && css`
    @media screen and (max-width: 790px) {
      display: none;
    }

    @media screen and (min-width: 790px) {
      margin: auto;
      display: flex;
      justify-content: end;
    }
  `}
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
      <Section area="banner">
        <Banner onSearch={onSearch} />
      </Section>
      <Section area="location">
        <LocSearch onChange={onChange} />
      </Section>
      <Section area="jobs" loading={toString(isFetching)}>
        {!isFetching ? (
          <JobList
            pageSize={pageSize}
            page={page}
            jobs={jobs}
          />
        ) : <Roller />}
      </Section>
      <Section area="footer">
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
