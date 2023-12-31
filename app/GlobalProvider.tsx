'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Toaster must be added at the top */}
      <Toaster />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
