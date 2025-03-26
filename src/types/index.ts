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
  email?: string;
  image?: string;
  phone?: string;
  personalUrl?: string;
  comment?: string;
  links: ILink[];
}

//2

export interface ILink {
  name: string;
  url: string;
  effect?: string;
}
