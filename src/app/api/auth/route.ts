import { auth as nextAuth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { IAuth } from '@/types';

export async function GET() {
  try {
    const session = await nextAuth();

    const auth: IAuth = {
      nickname: '',
      email: '',
      personalUrl: ''
    };

    if (!session?.user?.id) {
      return new Response(JSON.stringify('Unauthorized'), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 401
      });
    }

    const userInfo = await prisma.user.findFirst({
      where: {
        sub: session?.user?.id
      }
    });

    auth.nickname = userInfo?.nickname?.toString();
    auth.email = userInfo?.email?.toString();
    auth.personalUrl = userInfo?.personalUrl?.toString();

    return new Response(JSON.stringify(auth), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 404
    });
  }
}

//return interface
//user 정보
//sns 정보
//picture 정보
