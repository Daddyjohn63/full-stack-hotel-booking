'use client';

import { store } from '@/redux/store';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Toaster must be added at the top */}
      <Toaster />
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </>
  );
}
