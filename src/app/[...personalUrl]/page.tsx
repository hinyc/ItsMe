import Profile from '@/app/me/_components/Profile';
import Links from '@/app/me/_components/Links';
import React from 'react';
import ModifyButton from '../me/_components/ModifyButton';

export default function ItsMe() {
  return (
    <div className="h-full overflow-y-auto pb-8">
      <Profile />
      <Links />
      <div className="fixed bottom-4 right-[50%] translate-x-[50%]">
        <ModifyButton />
      </div>
    </div>
  );
}
