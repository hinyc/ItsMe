import { create } from 'zustand';
import { IGlobalSetState, IGlobalState } from './type';

const initState: IGlobalState = {
  showMainNav: false,
  showSignUpModal: false
};

const useGlobalStore = create<IGlobalState & IGlobalSetState>((set) => ({
  ...initState,
  setShowMainNav: (show: boolean) => set({ showMainNav: show }),
  setShowSignUpModal: (show: boolean) => set({ showSignUpModal: show })
}));

export default useGlobalStore;
