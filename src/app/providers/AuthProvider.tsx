'use client';

import { SessionProvider } from 'next-auth/react';

import { PageProps } from '../interfaces/common.interfaces';

export default function AuthProvider({ children }: PageProps) {
  return (
    <SessionProvider>{children}</SessionProvider>
  );
}
