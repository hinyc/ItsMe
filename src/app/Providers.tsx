'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export default function Providers({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="h-full w-full">{children}</div>;
    </SessionProvider>
  );
}
