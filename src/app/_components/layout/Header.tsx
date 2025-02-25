'use client';
import React from 'react';
import Hamburger from './Hamburger';
import HeaderMenu from './HeaderMenu';
import NeedNicknameModal from './NeedNicknameModal';
import useGlobalStore from '@/index';

export default function Header() {
  const { showNeedNicknameModal } = useGlobalStore();
  return (
    <div className="relative w-full">
      <Hamburger />
      <HeaderMenu />
      {showNeedNicknameModal && <NeedNicknameModal />}
    </div>
  );
}
