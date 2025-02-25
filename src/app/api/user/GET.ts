import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { IUser } from '@/types';

export async function GET() {
  try {
    const session = await auth();

    const user: IUser = {
      nickname: 'nickname',
      status: 'NO_USER',
      personalUrl: 'me/'
    };

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

    user.nickname = userInfo.nickname?.toString();
    user.email = userInfo.email?.toString();
    user.image = userInfo.image?.toString();
    user.status = 'NORMAL';
    user.personalUrl = '/me/' + userInfo.personalUrl?.toString();

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
