import { ILink } from '@/types';

export interface IMeState {
  edit: boolean;
  nickname: string;
  email: string;
  image: string;
  phone: string;
  personalUrl: string;
  links: ILink[];
}

export interface ISetMeState {
  setEdit: (edit: boolean) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  setImage: (image: string) => void;
  setPhone: (phone: string) => void;
  setPersonalUrl: (personalUrl: string) => void;
  setLinks: (links: ILink[]) => void;
}
