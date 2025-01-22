import React from 'react';

export default function Providers({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full w-full">{children}</div>;
}
