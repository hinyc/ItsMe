import { create } from 'zustand';

interface IMeState {
  edit: boolean;
}

interface ISetMeState {
  setEdit: (edit: boolean) => void;
}

const initState: IMeState = {
  edit: false
};

const useMeStore = create<IMeState & ISetMeState>((set) => ({
  ...initState,
  setEdit: (edit) => set({ edit })
}));

export default useMeStore;
