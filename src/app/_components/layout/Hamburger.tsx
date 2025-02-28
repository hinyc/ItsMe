import useGlobalStore from '@/index';
import { FaBars, FaRegCircleUser } from 'react-icons/fa6';
import React from 'react';
import { signIn } from 'next-auth/react';
import userGlobalQuery from '@/query';

export default function Hamburger() {
  const user = userGlobalQuery.useUser();

  const _onClick = async () => {
    if (user.data) {
      return useGlobalStore.getState().setShowMainNavToggle();
    }

    signIn('google', { callbackUrl: '/' });
  };

  console.log(user.data);
  return (
    <button
      className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-md bg-zinc-100 opacity-65 transition-all hover:opacity-100"
      onClick={_onClick}
    >
      {user.data ? <FaBars /> : <FaRegCircleUser />}
    </button>
  );
}
