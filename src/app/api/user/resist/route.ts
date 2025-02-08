import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export interface IUserPayload {
  name: string;
  nickname: string;
  email: string;
  image: string;
  sub: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    const payload = await request.json();

    if (!payload) {
      return new Response(JSON.stringify({ error: 'No payload' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }

    //이미 등록된 유저인지 체크

    const userInfo = {
      name: session?.user.name,
      email: session?.user.email,
      image: session?.user.image,
      sub: session?.user.id,
      ...payload
    };
    console.log('payload', userInfo);

    const user = await prisma.user.create({
      data: userInfo
    });

    console.log('user', user);

    if (!user) {
      //등록실패
      return new Response(JSON.stringify({ error: 'registration failed' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 401
      });
    }

    if (user.sub !== session?.user.id) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }

    return new Response(JSON.stringify('ok'), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
