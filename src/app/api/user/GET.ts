import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { IUser } from '@/types';

export async function GET() {
  try {
    //sub 확인

    const session = await auth();

    //session에 로그인된 사용자 정보가 없을 때, 비정상

    const userInfo = await prisma.user.findFirst({
      where: {
        sub: session?.user?.id
      },
      select: {
        nickname: true,
        email: true,
        image: true,
        personalUrl: true,
        phone: true,
        comment: true,
        isPremium: true,
        links: {
          select: {
            linkName: true,
            url: true,
            effect: true
          }
        }
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

    if (session?.user.id) {
      //session이 있으면 info에 추가 정보를 넣어준다
    }

    return new Response(JSON.stringify(userInfo satisfies IUser), {
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
