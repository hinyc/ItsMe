import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import useGlobalStore from '@/index';
import useSignUpModalStore from './store';
import NicknameInput from './NicknameInput';
import AddressInput from './AddressInput';

export default function SignUpModal() {
  const { step, reset } = useSignUpModalStore();

  const _onClose = () => {
    signOut();
    useGlobalStore.getState().setShowSignUpModal(false);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-slate-100 bg-opacity-50">
      <div className="relative flex h-fit w-[310px] select-none flex-col rounded-md bg-gray-100 p-4 shadow-xl">
        <div className="overflow-hidden">
          <div
            className={`flex w-[calc(200%+32px)] space-x-8 transition-all ${step === 0 ? '' : 'translate-x-[calc(-50%-16px)]'}`}
          >
            <NicknameInput />
            <AddressInput />
          </div>
          <button
            className="absolute right-[-8px] top-[-8px] flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 shadow-2xl transition-all hover:opacity-80"
            onClick={_onClose}
          >
            <FaXmark className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
