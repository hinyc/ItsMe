export interface IAuth {
  nickname?: string;
  email?: string;
  personalUrl?: string;
  isAuthenticated: boolean;
}

//1+2
export interface IUser {
  info: IUserInfo;
  links: ILink[];
}

//1
export interface IUserInfo {
  nickname: string;
  email?: string;
  image?: string;
  personalUrl?: string;
}

//2
export interface ILink {
  name: string;
  url: string;
  effect?: string;
}
