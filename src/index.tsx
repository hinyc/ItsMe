import { create } from 'zustand';

interface IGlobalState {
  showMainNav: boolean;
  showSignUpModal: boolean;
}

interface IGlobalSetState {
  setShowMainNavToggle: () => void;
  setShowSignUpModal: (value: boolean) => void;
}

const initState: IGlobalState = {
  showMainNav: false,
  showSignUpModal: false
};

const useGlobalStore = create<IGlobalState & IGlobalSetState>((set, get) => ({
  ...initState,

  setShowMainNavToggle: () => set({ showMainNav: !get().showMainNav }),
  setShowSignUpModal: (value) => set({ showSignUpModal: value })
}));

export default useGlobalStore;
