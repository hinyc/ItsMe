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

    try {
      // 중복 체크
      if (payload.nickname && payload.nickname !== userInfo.nickname) {
        const existingNickname = await prisma.user.findUnique({
          where: { nickname: payload.nickname }
        });
        if (existingNickname) {
          return new Response(JSON.stringify({ error: '이미 사용 중인 닉네임입니다.' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400
          });
        }
      }

      if (payload.personalUrl && payload.personalUrl !== userInfo.personalUrl) {
        const existingUrl = await prisma.user.findUnique({
          where: { personalUrl: payload.personalUrl }
        });
        if (existingUrl) {
          return new Response(JSON.stringify({ error: '이미 사용 중인 URL입니다.' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400
          });
        }
      }

      if (payload.email && payload.email !== userInfo.email) {
        const existingEmail = await prisma.user.findUnique({
          where: { email: payload.email }
        });
        if (existingEmail) {
          return new Response(JSON.stringify({ error: '이미 사용 중인 이메일입니다.' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400
          });
        }
      }

      // 트랜잭션으로 사용자 정보와 링크 정보 동시 수정
      const result = await prisma.$transaction(async (tx) => {
        // 사용자 정보 업데이트 - 변경된 필드만
        const updateData = {
          ...(payload.nickname && { nickname: payload.nickname }),
          ...(payload.personalUrl && { personalUrl: payload.personalUrl }),
          ...(payload.image && { image: payload.image }),
          ...(payload.email && { email: payload.email }),
          ...(payload.phone && { phone: payload.phone }),
          ...(payload.comment !== undefined && { comment: payload.comment })
        };

        const updatedUser = await tx.user.update({
          where: { id: userInfo.id },
          data: updateData,
          select: {
            id: true,
            nickname: true,
            personalUrl: true,
            image: true,
            email: true,
            phone: true,
            comment: true,
            links: true
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
                linkName: link.linkName,
                url: link.url,
                icon: link.icon,
                effect: link.effect
              }))
            });
          }
        }

        return updatedUser;
      });

      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200
      });
    } catch (txError) {
      console.log('Transaction error:', txError);
      return new Response(JSON.stringify({ error: '사용자 정보 수정 중 오류가 발생했습니다.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
  } catch (error) {
    console.log('Error updating user:', error);
    return new Response(JSON.stringify({ error: '사용자 정보 수정 중 오류가 발생했습니다.' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
}
