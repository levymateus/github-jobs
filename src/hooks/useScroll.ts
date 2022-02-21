import { useEffect } from 'react';

type Listener = (position: 'bottom') => void

function useScroll(listener: Listener) {
  useEffect(() => {
    function getScroll() {
      if (window.pageYOffset !== undefined) {
        return [window.scrollX, window.scrollY];
      }
      let sx = 0;
      let sy = 0;
      const d = document;
      const r = d.documentElement;
      const b = d.body;
      sx = r.scrollLeft || b.scrollLeft || 0;
      sy = r.scrollTop || b.scrollTop || 0;
      return [sx, sy];
    }

    function handleScroll() {
      const [, scrollY] = getScroll();
      if (
        scrollY - (document.body.scrollHeight - document.body.clientHeight) === 0
        && scrollY > 0
      ) {
        listener('bottom');
      }
    }

    const target = document;
    target?.addEventListener('scroll', handleScroll);

    return () => target?.removeEventListener('scroll', handleScroll);
  });
}

export default useScroll;
