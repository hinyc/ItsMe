import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ILink, IUser, IUserInfo } from '@/types';

export async function GET() {
  try {
    //sub 확인

    const session = await auth();

    const info: IUserInfo = {
      nickname: 'nickname'
    };

    const links: ILink[] = [];

    const user: IUser = { info, links };

    //session에 로그인된 사용자 정보가 없을 때, 비정상
    if (!session?.user.id) {
      return new Response(JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 404
      });
    }

    const userInfo = await prisma.user.findFirst({
      where: {
        sub: session?.user?.id
      }
    });

    //user 정보가 없을 때, 가입안된상태
    if (!userInfo) {
      //nickname 미등록 계정
      return new Response('Unauthorized', {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 401
      });
    }

    //user 정보를 로드하고 특정 정보만 반환
    info.nickname = userInfo.nickname?.toString();
    info.email = userInfo.email?.toString();
    info.image = userInfo.image?.toString();
    info.personalUrl = userInfo.personalUrl?.toString();

    return new Response(JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 400
    });
  }
}

//return interface
//user 정보
//sns 정보
//picture 정보
