export interface IAuth {
  nickname?: string;
  email?: string;
  personalUrl?: string;
}

export interface IUser {
  info: IUserInfo;
  links: ILink[];
  isLogin: boolean;
}

export interface IUserInfo {
  nickname: string;
  email?: string;
  image?: string;
  personalUrl?: string;
}

export interface ILink {
  name: string;
  url: string;
  effect?: string;
}
