import React from 'react';
import {
  Banner,
  LocSearch,
  JobList,
  Pagination,
  LocSearchProps,
  JobCardProps,
  JobListProps,
  PaginationProps,
} from 'components';
import styled, { css } from 'styled-components';

type JobWithNoHandlers = Omit<JobCardProps, 'onClick'>

type BaseJobSearchProps = {
  page: number
  jobs: Array<JobWithNoHandlers>
  pageSize: number
  onSearch: (search: string) => void
  onJobCardClick: JobCardProps['onClick']
  onLoadMore: JobListProps['onLoadMore']
}

type JobsSearchProps = BaseJobSearchProps & Pick<LocSearchProps, 'onChange'> & PaginationProps

type SectionProps = { area: 'banner' | 'location' | 'jobs' | 'footer' }

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

  @media screen and (max-width: 790px) {
    ${(props) => props.area === 'footer' && css`
      display: none;
    `}
  }

  @media screen and (min-width: 790px) {
    ${(props) => props.area === 'footer' && css`
      margin: auto;
      display: flex;
      justify-content: end;
    `}
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
  onJobCardClick,
  onLoadMore,
  pageSize,
}: JobsSearchProps) {
  return (
    <Main>
      <Section area="banner">
        <Banner onSearch={onSearch} />
      </Section>
      <Section area="location">
        <LocSearch onChange={onChange} />
      </Section>
      <Section area="jobs">
        <JobList
          pageSize={pageSize}
          page={page}
          onJobCardClick={onJobCardClick}
          onLoadMore={onLoadMore}
          jobs={jobs}
        />
      </Section>
      <Section area="footer">
        <Pagination
          pageCount={pageCount}
          page={page}
          onNext={onNext}
          onPrev={onPrev}
          onSelect={onSelect}
        />
      </Section>
    </Main>
  );
}

export default JobsSearch;
