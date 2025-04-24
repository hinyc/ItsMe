import { LinkIcon } from '@prisma/client/edge';

export interface IUser {
  id: number;
  sub: string;
  name?: string;
  nickname: string;
  email: string;
  image?: string;
  phone?: string;
  comment?: string;
  personalUrl?: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  links: ILink[];
  photos?: IPhoto[];
  subscription?: ISubscription;
  auth?: IUserAuth;
}

export interface ILink {
  id: number;
  userId: number;
  linkName: string;
  url: string;
  icon: LinkIcon;
  effect?: string;
}

export interface IPhoto {
  id: number;
  userId: number;
  photoUrl: string;
  uploadedAt: Date;
}

export interface ISubscription {
  userId: number;
  planType: string;
  startDate: Date;
  endDate?: Date;
  status: string;
}

export interface IUserAuth {
  userId: number;
  passwordHash: string;
  provider: string;
  lastLogin?: Date;
}

export interface IAuth {
  nickname: string;
  email: string;
  personalUrl: string;
  isAuthenticated: boolean;
}
