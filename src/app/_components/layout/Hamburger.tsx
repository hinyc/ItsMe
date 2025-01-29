import useGlobalStore from '@/common/store/useGlobalState';
import { FaBars, FaRegCircleUser } from 'react-icons/fa6';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function Hamburger() {
  const { data: session } = useSession();
  console.log('sessiotn', session);

  const _onClick = () => {
    if (session?.user) {
      return useGlobalStore.getState().setShowMainNavToggle();
    }
    signIn();
  };

  return (
    <button
      className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-md bg-zinc-100 opacity-65 transition-all hover:opacity-100"
      onClick={_onClick}
    >
      {session?.user ? <FaBars /> : <FaRegCircleUser />}
    </button>
  );
}
