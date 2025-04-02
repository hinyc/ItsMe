import { LinkIcon } from '@prisma/client';
export interface IAuth {
  nickname?: string;
  email?: string;
  personalUrl?: string;
  isAuthenticated: boolean;
}

//1+2

//1
export interface IUser {
  nickname: string;
  email: string;
  image: string | null;
  phone: string | null;
  personalUrl: string | null;
  comment: string | null;
  isPremium: boolean;
  links: ILink[];
}

//2
export interface ILink {
  icon: LinkIcon;
  linkName: string;
  url: string;
  effect: string | null;
}
