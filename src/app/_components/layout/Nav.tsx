'use client';
import React from 'react';
import Hamburger from './Hamburger';
import NavMenu from './NavMenu';
import NeedNicknameModal from './NeedNicknameModal';
import useGlobalStore from '@/index';

export default function Nav() {
  const { showNeedNicknameModal } = useGlobalStore();
  return (
    <div className="relative w-full">
      <Hamburger />
      <NavMenu />
      {showNeedNicknameModal && <NeedNicknameModal />}
    </div>
  );
}
