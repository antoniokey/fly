import { useEffect, useState } from 'react';

import { ScreenSize } from '../interfaces/common.interfaces';

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState(getCurrentSize());

  function getCurrentSize(): ScreenSize {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    window.addEventListener('resize', () => setScreenSize(getCurrentSize()));

    return () => {
      window.removeEventListener('resize', () => null);
    };
  }, []);

  return screenSize;
};
