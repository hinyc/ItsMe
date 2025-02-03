import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export interface IUserPayload {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as IUserPayload;

    if (!payload) {
      return new Response(JSON.stringify({ error: 'No payload' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }

    //이미 등록된 유저인지 체크
    // const user = await prisma.user.findFirst({
    //   where: {
    //     sid: payload.sid
    //   }
    // });

    console.log('payload', payload);

    const user = await prisma.user.create({
      data: {
        ...payload
      }
    });

    return new Response(JSON.stringify(user), {
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
