'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';

const LoadingContext = createContext(undefined);

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}