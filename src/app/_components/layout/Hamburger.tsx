import useGlobalStore from '@/index';
import { FaBars, FaRegCircleUser } from 'react-icons/fa6';
import React from 'react';
import { signIn } from 'next-auth/react';
import userGlobalQuery from '@/common/query';

export default function Hamburger() {
  const auth = userGlobalQuery.useAuth();
  const { setShowMainNav, showMainNav } = useGlobalStore();

  const _onClick = async () => {
    if (auth.data?.isAuthenticated) {
      return setShowMainNav(!showMainNav);
    }

    signIn('google', { callbackUrl: '/' });
  };

  return (
    <button
      className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-md bg-zinc-100 opacity-65 transition-all hover:opacity-100"
      onClick={_onClick}
    >
      {auth.data?.isAuthenticated ? <FaBars /> : <FaRegCircleUser />}
    </button>
  );
}
