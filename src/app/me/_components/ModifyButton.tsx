'use client';
import React from 'react';
import useMeStore from '../_store';

export default function ModifyButton() {
  const { edit, setEdit } = useMeStore();
  return (
    <button
      className="bg-me-main hover:bg-me-main focus:ring-me-main w-[100px] rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white outline-none focus:outline-none focus:ring-4"
      onClick={() => setEdit(!edit)}
    >
      <span className="font-semibold">{edit ? 'Save' : 'Modify'}</span>
    </button>
  );
}
