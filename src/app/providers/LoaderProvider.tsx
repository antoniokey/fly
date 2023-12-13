'use client';

import React, { createContext, useState } from 'react';

import { PageProps } from '../interfaces/common.interfaces';

export interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (flag: boolean) => void;
};

export const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  setIsLoading: () => null,
});

export default function LoaderProvider({ children }: PageProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}
