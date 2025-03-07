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
    if (!session) {
      return new Response(JSON.stringify({ error: 'No session' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }

    const userInfoParams = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      sub: session.user.id,
      ...payload
    };
    console.log('payload', userInfoParams);

    const user = await prisma.user.create({
      data: userInfoParams
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

    return new Response(JSON.stringify({ info: user }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
