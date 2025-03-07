import { create } from 'zustand';

type StepType = 0 | 1;

type UseSignUpModalStore = {
  step: StepType;
  setStep: (step: StepType) => void;

  showError: boolean;
  setShowError: (showSignUpModal: boolean) => void;

  error: string;
  setError: (error: string) => void;

  nickname: string;
  setNickname: (nickname: string) => void;

  address: string;
  setAddress: (address: string) => void;

  reset: () => void;
};

const initState = {
  step: 0 as StepType,
  showError: false,
  error: '',
  nickname: '',
  address: new Date().getTime().toString()
};

const useSignUpModalStore = create<UseSignUpModalStore>((set) => ({
  ...initState,
  setStep: (step) => set({ step }),
  setShowError: (showError) => set({ showError }),
  setError: (error) => set({ error }),
  setNickname: (nickname) => set({ nickname }),
  setAddress: (address) => set({ address }),
  reset: () => set(initState)
}));

export default useSignUpModalStore;
