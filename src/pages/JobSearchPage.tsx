import React from 'react';
import useTitle from 'hooks/useTitle';
import useJobs from 'hooks/useJobs';
import JobsSearchTemplate from 'templates/JobSearch';

export function JobsSearchPage() {
  const {
    onChange,
    onSearch,
    jobs,
    onClick,
    onLoadMore,
    pageSize,
    pageCount,
    page,
    onNext,
    onPrev,
    onSelect,
  } = useJobs({ pageSize: 10 });

  useTitle(`Github Jobs ${page} of ${pageCount}`);

  return (
    <JobsSearchTemplate
      jobs={jobs}
      page={page}
      pageSize={pageSize}
      onSearch={onSearch}
      onChange={onChange}
      onNext={onNext}
      onPrev={onPrev}
      onSelect={onSelect}
      pageCount={pageCount}
      onJobCardClick={onClick}
      onLoadMore={onLoadMore}
    />
  );
}

export default JobsSearchPage;
