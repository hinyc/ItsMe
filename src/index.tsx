import { create } from 'zustand';

interface IGlobalState {
  showMainNav: boolean;
  showSignUpModal: boolean;
}

interface IGlobalSetState {
  setShowMainNav: (value: boolean) => void;
  setShowSignUpModal: (value: boolean) => void;
}

const initState: IGlobalState = {
  showMainNav: false,
  showSignUpModal: false
};

const useGlobalStore = create<IGlobalState & IGlobalSetState>((set) => ({
  ...initState,

  setShowMainNav: (value) => set({ showMainNav: value }),
  setShowSignUpModal: (value) => set({ showSignUpModal: value })
}));

export default useGlobalStore;
