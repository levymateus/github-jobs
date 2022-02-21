import { useEffect } from 'react';

function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = '';
    };
  }, [title]);
}

export default useTitle;
