import React from 'react';

export interface PageProps {
  children?: React.ReactNode;
  params?: PageParams;
}

export interface PageParams {
  id: string;
  locale: string;
}
