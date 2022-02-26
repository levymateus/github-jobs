import { useLocation } from 'react-router-dom';
import type { Job } from '../types';

type JobDetails = Job

function useJobDetails(): JobDetails {
  const { state } = useLocation();
  return { ...(state as Job) };
}

export default useJobDetails;
