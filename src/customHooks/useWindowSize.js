import { useLayoutEffect, useState } from 'react';

/**
 * This is a custom hook that listens for window screen size updates
 *
 * @returns {number[]} size
 */
export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
