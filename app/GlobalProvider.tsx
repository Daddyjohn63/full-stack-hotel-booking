import { Toaster } from 'react-hot-toast';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Toaster must be added at the top */}
      <Toaster />
      {children}
    </>
  );
}
