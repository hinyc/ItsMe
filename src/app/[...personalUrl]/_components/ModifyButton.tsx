'use client';
import React from 'react';
import useMeStore from '../_store';
import useGlobalStore from '@/index';

export default function ModifyButton() {
  const { setShowMainNav } = useGlobalStore();
  const { edit, setEdit, nickname, email, image, phone, personalUrl, links } = useMeStore();

  const _onClick = () => {
    setShowMainNav(false);
    if (edit) {
      const payload = {
        nickname,
        email,
        image,
        phone,
        personalUrl,
        links
      };

      console.log(payload);

      return setEdit(false);
    }

    setEdit(true);
  };
  return (
    <button
      className="w-[100px] rounded-lg bg-me-main px-5 py-2.5 text-center text-sm font-medium text-white outline-none hover:bg-me-main focus:outline-none focus:ring-4 focus:ring-me-main"
      onClick={_onClick}
    >
      <span className="font-semibold">{edit ? 'Save' : 'Modify'}</span>
    </button>
  );
}
