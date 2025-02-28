'use client';
import React from 'react';
import Hamburger from './Hamburger';
import HeaderMenu from './HeaderMenu';
import SignUpModal from './SignUpModal';
import useGlobalStore from '@/index';

export default function Header() {
  const { showSignUpModal } = useGlobalStore();
  return (
    <div className="relative w-full">
      <Hamburger />
      <HeaderMenu />
      {showSignUpModal && <SignUpModal />}
    </div>
  );
}
