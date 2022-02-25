import React from 'react';
import useTitle from 'hooks/useTitle';
import useJobs from 'hooks/useJobs';
import JobsSearchTemplate from 'templates/JobSearch';

export function JobsSearchPage() {
  const {
    onChange,
    onSearch,
    jobs,
    pageSize,
    pageCount,
    page,
    onNext,
    onPrev,
    onSelect,
    isFetching,
  } = useJobs({ pageSize: 10 });

  useTitle(`Github Jobs ${page} of ${pageCount} (${jobs.length})`);

  return (
    <JobsSearchTemplate
      jobs={jobs}
      page={page}
      isFetching={isFetching}
      pageSize={pageSize}
      onSearch={onSearch}
      onChange={onChange}
      onNext={onNext}
      onPrev={onPrev}
      onSelect={onSelect}
      pageCount={pageCount}
    />
  );
}

export default JobsSearchPage;
