import React from 'react';
import useSignUpModalStore from './store';

export default function NicknameInput() {
  const { showError, error, nickname, setNickname, setShowError, setError, setStep } =
    useSignUpModalStore();

  const _onChangeNickname = (value: string) => {
    if (value.length > 8) return;
    setShowError(false);
    setNickname(value);
  };

  const _onNext = ({ nickname }: { nickname: string }) => {
    //영문, 숫자, 한글, 중국어, 일본어, 이모지
    const regExp =
      /^[a-zA-Z0-9가-힣一-鿿぀-ゟ゠-ヿ\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u;

    if (!regExp.test(nickname)) {
      setError('특수문자는 사용할 수 없습니다.'); //공백도 사용불가
      setShowError(true);
      return;
    }
    setStep(1);
    setShowError(false);
  };

  return (
    <div className="flex w-[50%] flex-col items-center">
      <h1 className="font-bold">닉네임을 입력하세요.</h1>
      <div className="relative mt-4 flex w-full items-center">
        <input
          className="text-md h-8 w-full border-b-2 bg-transparent px-2 text-center focus:outline-none"
          value={nickname}
          onChange={(e) => _onChangeNickname(e.target.value)}
          type="text"
        />
        <span className={`absolute bottom-1 right-1 text-[12px] text-slate-400`}>
          {nickname.length}/8
        </span>
      </div>
      <div className="my-1 h-5 text-sm text-red-700">{showError && error}</div>
      <button
        disabled={nickname.length < 1}
        className="cursor-pointer rounded-md bg-blue-200 px-6 py-2 font-bold transition-all disabled:cursor-default disabled:opacity-45"
        onClick={() => {
          _onNext({ nickname });
        }}
      >
        Next
      </button>
    </div>
  );
}
