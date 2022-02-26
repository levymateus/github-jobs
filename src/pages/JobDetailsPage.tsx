import React from 'react';
import useTitle from 'hooks/useTitle';
import { JobDetails } from 'templates/JobDetails';
import useJobDetails from 'hooks/useJobDetails';

export function JobDetailsPage() {
  const {
    id, title, company, description, location, published, src, fulltime,
  } = useJobDetails();
  useTitle(`Github Jobs | ${title}`);
  return (
    <JobDetails
      id={id}
      title={title}
      company={company}
      description={description}
      location={location}
      fulltime={fulltime}
      published={published}
      src={src}
    />
  );
}

export default JobDetailsPage;
