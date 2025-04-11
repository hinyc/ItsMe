import { create } from 'zustand';

import { IMeState, ISetMeState } from './type';

const initState: IMeState = {
  edit: false,
  nickname: '',
  email: '',
  image: '',
  phone: '',
  personalUrl: '',
  links: [],
  comment: ''
};

const useMeStore = create<IMeState & ISetMeState>((set) => ({
  ...initState,
  setEdit: (edit) => set({ edit }),
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  setImage: (image) => set({ image }),
  setPhone: (phone) => set({ phone }),
  setPersonalUrl: (personalUrl) => set({ personalUrl }),
  setLinks: (links) => set({ links }),
  setComment: (comment) => set({ comment })
}));

export default useMeStore;
