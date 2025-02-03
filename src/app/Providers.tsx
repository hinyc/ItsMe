'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const queryClient = new QueryClient();

export default function Providers({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <SessionProvider> */}
        <div className="h-full w-full">{children}</div>;{/* </SessionProvider> */}
      </QueryClientProvider>
    </>
  );
}
