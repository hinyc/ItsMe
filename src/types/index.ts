export interface IUser {
  info: IUserInfo;
  links: ILink[];
  isLogin: boolean;
}

export interface IUserInfo {
  nickname: string;
  email?: string;
  image?: string;
  status: 'NEED_NICKNAME' | 'NO_USER' | 'NORMAL';
  personalUrl: string;
}

export interface ILink {
  name: string;
  url: string;
  effect?: string;
}
