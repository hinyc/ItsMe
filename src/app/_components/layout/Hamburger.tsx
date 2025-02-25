import useGlobalStore from '@/index';
import { FaBars, FaRegCircleUser } from 'react-icons/fa6';
import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import userGlobalQuery from '@/query';

export default function Hamburger() {
  const { data: user, refetch } = userGlobalQuery.useUser();

  const _onClick = async () => {
    refetch();
    if (user?.status === 'NORMAL') {
      return useGlobalStore.getState().setShowMainNavToggle();
    }

    signIn('google', { callbackUrl: '/' });
  };

  useEffect(() => {
    if (user?.status === 'NEED_NICKNAME') {
      useGlobalStore.getState().setShowNeedNicknameModal(true);
    }
    if (user?.status === 'NORMAL') {
      useGlobalStore.getState().setShowNeedNicknameModal(false);
    }
  }, [user]);

  return (
    <button
      className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-md bg-zinc-100 opacity-65 transition-all hover:opacity-100"
      onClick={_onClick}
    >
      {user?.status === 'NORMAL' ? <FaBars /> : <FaRegCircleUser />}
    </button>
  );
}
