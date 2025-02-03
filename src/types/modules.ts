import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      // 추가하고 싶은 다른 속성들
      name?: string;
      email?: string;
      image?: string;
    };
  }

  // interface User {
  //   id: string;
  //   // 사용자 모델에 추가하고 싶은 다른 속성들
  //   memberId?: string;
  //   sid?: string;
  // }

  // interface JWT {
  //   id: string;
  //   // 사용자 모델에 추가하고 싶은 다른 속성들
  //   memberId?: string;
  //   sid?: string;
  // }
}
