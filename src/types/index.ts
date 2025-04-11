import { User, UserLink, UserPhoto, Subscription } from '@prisma/client/edge';

export interface IAuth {
  nickname?: string;
  email?: string;
  personalUrl?: string;
  isAuthenticated: boolean;
}

//1+2

//1
export type IUser = User & {
  links: UserLink[];
  photos?: UserPhoto[];
  subscription?: Subscription | null;
};

//2
export type ILink = UserLink;
export type IPhoto = UserPhoto;
export type ISubscription = Subscription;
