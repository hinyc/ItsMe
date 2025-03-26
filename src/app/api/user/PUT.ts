import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ILink } from '@/types';
import { NextRequest } from 'next/server';

export interface UpdateUserPayload {
  nickname?: string;
  personalUrl?: string;
  image?: string;
  phone?: string;
  comment?: string;
  email?: string;
  links?: ILink[];
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return new Response(JSON.stringify({ error: '인증 정보가 없습니다.' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 401
      });
    }

    const payload: UpdateUserPayload = await request.json();

    if (!payload) {
      return new Response(JSON.stringify({ error: '수정할 데이터가 없습니다.' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }

    // 사용자 정보 조회
    const userInfo = await prisma.user.findFirst({
      where: {
        sub: session.user.id
      }
    });

    if (!userInfo) {
      return new Response(JSON.stringify({ error: '사용자를 찾을 수 없습니다.' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 404
      });
    }

    // 트랜잭션으로 사용자 정보와 링크 정보 동시 수정
    const result = await prisma.$transaction(async (tx) => {
      // 사용자 정보 업데이트
      const updatedUser = await tx.user.update({
        where: { id: userInfo.id },
        data: {
          nickname: payload.nickname,
          personalUrl: payload.personalUrl,
          image: payload.image,
          email: payload.email,
          phone: payload.phone,
          comment: payload.comment
        }
      });

      // 기존 링크 삭제
      if (payload.links !== undefined) {
        await tx.userLink.deleteMany({
          where: { userId: userInfo.id }
        });

        // 새로운 링크 추가
        if (payload.links.length > 0) {
          await tx.userLink.createMany({
            data: payload.links.map((link) => ({
              userId: userInfo.id,
              linkName: link.name,
              url: link.url
            }))
          });
        }
      }

      return updatedUser;
    });

    console.log('?', result);
    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ error: '사용자 정보 수정 중 오류가 발생했습니다.' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
}
