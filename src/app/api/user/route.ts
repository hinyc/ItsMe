import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { IUser } from '@/types';

export async function GET() {
  try {
    const session = await auth();

    const user: IUser = {
      status: 'NO_USER'
    };

    console.log('session', session?.user);

    const userInfo = await prisma.user.findFirst({
      where: {
        sub: session?.user?.id
      }
    });

    if (session && !userInfo) {
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

    if (!userInfo) {
      return new Response(JSON.stringify({ error: 'NO_USER' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }

    user.nickname = userInfo.nickname?.toString();
    user.email = userInfo.email?.toString();
    user.image = userInfo.picture?.toString();

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
