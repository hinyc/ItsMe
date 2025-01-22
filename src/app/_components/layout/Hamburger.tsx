import useGlobalStore from '@/common/store/useGlobalState';
import { FaBars } from 'react-icons/fa6';
import React from 'react';

export default function Hamburger() {
  return (
    <div
      className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-md bg-zinc-100 opacity-65 transition-all hover:opacity-100"
      onClick={() => useGlobalStore.getState().setShowMainNavToggle()}
    >
      <FaBars />
    </div>
  );
}
