import api from '@/common/api';
import { signOut } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import userGlobalQuery from '@/query';
import useGlobalStore from '@/index';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types';

export default function SignUpModal() {
  const { refetch } = userGlobalQuery.useUser();

  const [step, setStep] = useState<0 | 1>(0);
  const [nickName, setNickName] = useState('');
  const [address, setAddress] = useState('');

  //todo nickName address 설정 모달 수정중
  const nicknameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const _onSubmit = () => {
    if (nicknameRef.current?.value) {
      //가입요청
      //성공시 user 정보 refetch
      api
        .post('/user', {
          nickname: nicknameRef.current.value
        })
        .then((res) => {
          const { info } = res.data as unknown as IUser;
          refetch();

          console.log('info!!', res);
          useGlobalStore.getState().setShowSignUpModal(false);
          router.push(`${info.personalUrl}`);
        });
    }
  };

  const _onClose = () => {
    signOut();
    useGlobalStore.getState().setShowSignUpModal(false);
  };
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-slate-100 bg-opacity-50">
      <div className="relative flex h-fit w-[250px] select-none flex-col rounded-md bg-gray-100 p-4 shadow-xl">
        <div className="overflow-hidden">
          <div
            className={`flex w-[calc(200%+32px)] space-x-8 transition-all ${step === 0 ? '' : 'translate-x-[calc(-50%-16px)]'}`}
          >
            <div className="flex w-[50%] flex-col items-center">
              <h1 className="font-bold">닉네임을 입력하세요.</h1>
              <h3 className="text-sm text-red-400">*2~8자리</h3>

              <input
                className="mt-4 h-10 w-full rounded-md p-2 text-center focus:outline-none"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                type="text"
              />
              <div className="my-1 h-4 text-sm text-red-700">error</div>
              <button
                className="rounded-md bg-blue-100 px-6 py-2 font-bold transition-all hover:bg-blue-200 hover:text-black"
                onClick={() => {
                  setStep(1);
                }}
              >
                Confirm
              </button>
            </div>
            <div className="flex w-[50%] flex-col items-center">
              <h1 className="font-bold">나만의 주소를 설정하세요.</h1>
              <h3 className="text-sm text-red-400">*최대 16자리</h3>
              <input
                className="mt-4 h-10 w-full rounded-md p-2 text-center focus:outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="its-me.digital/{address}"
              />
              <div className="my-1 h-4 text-sm text-red-700">error</div>
              <button
                className="rounded-md bg-blue-100 px-6 py-2 font-bold transition-all hover:bg-blue-200 hover:text-black"
                onClick={() => {
                  setStep(0);
                }}
              >
                Submit
              </button>
            </div>
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
