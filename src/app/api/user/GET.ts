import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ILink, IUser, IUserInfo } from '@/types';

export async function GET() {
  try {
    const session = await auth();

    const info: IUserInfo = {
      nickname: 'nickname',
      status: 'NO_USER',
      personalUrl: 'me/'
    };

    const links: ILink[] = [];

    const user: IUser = { info, links, isLogin: false };

    if (!session) {
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

    console.log(session.user.id);
    console.log(userInfo);

    if (!userInfo) {
      //nickname 미등록 계정
      return new Response(
        JSON.stringify({
          status: 'NEED_NICKNAME'
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          status: 200
        }
      );
    }

    info.nickname = userInfo.nickname?.toString();
    info.email = userInfo.email?.toString();
    info.image = userInfo.image?.toString();
    info.status = 'NORMAL';
    info.personalUrl = '/me/' + userInfo.personalUrl?.toString();

    return new Response(JSON.stringify(info), {
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
