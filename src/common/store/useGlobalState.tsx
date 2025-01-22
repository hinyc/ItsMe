import { create } from 'zustand';

interface IGlobalState {
  showMainNav: boolean;
}

interface IGlobalSetState {
  setShowMainNavToggle: () => void;
}

const initState: IGlobalState = {
  showMainNav: false
};

const useGlobalStore = create<IGlobalState & IGlobalSetState>((set, get) => ({
  ...initState,

  setShowMainNavToggle: () => set({ showMainNav: !get().showMainNav })
}));

export default useGlobalStore;
