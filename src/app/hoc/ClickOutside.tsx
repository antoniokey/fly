import { useEffect } from 'react';

import { ClickOutsideProps } from '../interfaces/common.interfaces';

export default function ClickOutside({ children, elementRef, callback }: ClickOutsideProps) {
  const onClickOutside = (event: any): void => {
    if (elementRef.current && !elementRef.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    }
  }, []);

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}
