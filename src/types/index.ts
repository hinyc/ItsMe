export interface IUser {
  nickname: string;
  email?: string;
  image?: string;
  status: 'NEED_NICKNAME' | 'NO_USER' | 'NORMAL';
  personalUrl: string;
}
