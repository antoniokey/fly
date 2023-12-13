import React, { ElementRef, MutableRefObject } from 'react';

export interface PageProps {
  children?: React.ReactNode;
  params?: PageParams;
}

export interface PageParams {
  id: string;
  locale: string;
}

export interface ScreenSize {
  width: number;
  height: number;
}

export interface ClickOutsideProps {
  children: React.ReactNode;
  elementRef: MutableRefObject<any>;
  callback: () => void;
}
