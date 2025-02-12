import Profile from '@/app/me/[...personalUrl]/_components/Profile';
import Links from '@/app/me/[...personalUrl]/_components/Links';
import React from 'react';

export default function ItsMe() {
  return (
    <div>
      <Profile />
      <Links />
    </div>
  );
}
