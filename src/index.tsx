import { create } from 'zustand';

interface IGlobalState {
  showMainNav: boolean;
  showNeedNicknameModal: boolean;
}

interface IGlobalSetState {
  setShowMainNavToggle: () => void;
  setShowNeedNicknameModal: (value: boolean) => void;
}

const initState: IGlobalState = {
  showMainNav: false,
  showNeedNicknameModal: false
};

const useGlobalStore = create<IGlobalState & IGlobalSetState>((set, get) => ({
  ...initState,

  setShowMainNavToggle: () => set({ showMainNav: !get().showMainNav }),
  setShowNeedNicknameModal: (value) => set({ showNeedNicknameModal: value })
}));

export default useGlobalStore;
