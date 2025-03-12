'use client';
import React from 'react';
import useMeStore from '../../me/_store';
import useGlobalStore from '@/index';

export default function ModifyButton() {
  const { setShowMainNav } = useGlobalStore();
  const { edit, setEdit } = useMeStore();
  return (
    <button
      className="w-[100px] rounded-lg bg-me-main px-5 py-2.5 text-center text-sm font-medium text-white outline-none hover:bg-me-main focus:outline-none focus:ring-4 focus:ring-me-main"
      onClick={() => {
        setEdit(!edit);
        setShowMainNav(false);
      }}
    >
      <span className="font-semibold">{edit ? 'Save' : 'Modify'}</span>
    </button>
  );
}
