import React from 'react';
import useSignUpModalStore from './store';
import api from '@/common/api';
import userGlobalQuery from '@/common/query';
import useGlobalStore from '@/index';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types';

export default function AddressInput() {
  const { refetch } = userGlobalQuery.useUser();
  const { showError, error, address, nickname, setAddress, setShowError, setError } =
    useSignUpModalStore();
  const router = useRouter();

  const _onChangeAddress = (value: string) => {
    if (value.length > 14) return;
    setShowError(false);
    setAddress(value);
  };

  const regExp = /^[a-zA-Z0-9_\s-]+$/;

  const _onSubmit = () => {
    if (!regExp.test(address)) {
      //todo error 토스트 팝업으로 만들거나 툴팁을 띄우자
      setError('영문, 숫자, _, -만 사용 가능합니다.');
      setShowError(true);
      return;
    }

    if (!address) return;
    if (!nickname) return;

    //가입요청
    //성공시 user 정보 refetch
    api
      .post('/user', {
        nickname: nickname,
        personalUrl: address
      })
      .then((res) => {
        const { personalUrl } = res.data as unknown as IUser;
        refetch();
        useGlobalStore.getState().setShowSignUpModal(false);
        router.push(`${personalUrl}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex w-[50%] flex-col items-center">
      <h1 className="font-bold">주소를 설정하세요.</h1>
      <div className="relative mt-4 flex w-full items-center">
        <span className={`absolute left-1 text-[14px] tracking-tight text-slate-400`}>
          its-me.digital/
        </span>
        <input
          className={`h-8 w-full border-b-2 bg-transparent px-2 pl-[84px] text-left text-[14px] focus:outline-none`}
          value={address}
          onChange={(e) => _onChangeAddress(e.target.value)}
          type="text"
        />
        <span className={`absolute bottom-1 right-1 text-[12px] text-slate-400`}>
          {address.length}/14
        </span>
      </div>
      <div className="my-1 h-4 text-sm text-red-700">{showError && error}</div>
      <button
        className="rounded-md bg-blue-100 px-6 py-2 font-bold transition-all hover:bg-blue-200 hover:text-black"
        onClick={_onSubmit}
      >
        Submit
      </button>
    </div>
  );
}
