'use client';
import React from 'react';
import useMeStore from '../_store';
import useGlobalStore from '@/index';
import { UpdateUserPayload } from '@/app/api/user/PUT';
import { useUpdateUserMutation } from '@/common/mutate';

export default function ModifyButton() {
  const { setShowMainNav } = useGlobalStore();
  const { edit, setEdit, nickname, email, image, phone, personalUrl, links, comment } =
    useMeStore();
  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const validateLinks = () => {
    for (const link of links) {
      console.log('링크 이름과 URL을 모두 입력해주세요.');
      if (!link.linkName || !link.url) {
        return false;
      }
    }
    return true;
  };

  const _onClick = async ({ payload }: { payload: UpdateUserPayload }) => {
    setShowMainNav(false);
    if (edit) {
      console.log('~~33~', !validateLinks());
      if (!validateLinks()) return;
      const res = await updateUser(payload);
      console.log('~~44~', res);
      return setEdit(false);
    }

    setEdit(true);
  };

  const payload: UpdateUserPayload = {
    nickname,
    email,
    image,
    phone,
    personalUrl,
    comment,
    links
  };

  return (
    <button
      className="w-[100px] rounded-lg bg-me-main px-5 py-2.5 text-center text-sm font-medium text-white outline-none hover:bg-me-main focus:outline-none focus:ring-4 focus:ring-me-main"
      onClick={() =>
        _onClick({
          payload
        })
      }
    >
      <span className="font-semibold">{edit ? 'Save' : 'Modify'}</span>
    </button>
  );
}
