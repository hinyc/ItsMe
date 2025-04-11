import { auth } from '@/auth';
import { createSupabaseClient } from '@/lib/supabase';
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

    if (!session?.user?.id) {
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

    const supabase = await createSupabaseClient();

    // 사용자 정보 조회
    const { data: userInfo, error: userError } = await supabase
      .from('User')
      .select('*')
      .eq('sub', session.user.id)
      .maybeSingle();

    if (userError) {
      console.error('User fetch error:', userError);
      throw userError;
    }

    if (!userInfo) {
      return new Response(JSON.stringify({ error: '사용자를 찾을 수 없습니다.' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 404
      });
    }

    // 중복 체크
    if (payload.nickname && payload.nickname !== userInfo.nickname) {
      const { data: existingNickname } = await supabase
        .from('User')
        .select('nickname')
        .eq('nickname', payload.nickname)
        .maybeSingle();

      if (existingNickname) {
        return new Response(JSON.stringify({ error: '이미 사용 중인 닉네임입니다.' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }
    }

    if (payload.personalUrl && payload.personalUrl !== userInfo.personalUrl) {
      const { data: existingUrl } = await supabase
        .from('User')
        .select('personalUrl')
        .eq('personalUrl', payload.personalUrl)
        .maybeSingle();

      if (existingUrl) {
        return new Response(JSON.stringify({ error: '이미 사용 중인 URL입니다.' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }
    }

    if (payload.email && payload.email !== userInfo.email) {
      const { data: existingEmail } = await supabase
        .from('User')
        .select('email')
        .eq('email', payload.email)
        .maybeSingle();

      if (existingEmail) {
        return new Response(JSON.stringify({ error: '이미 사용 중인 이메일입니다.' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }
    }

    // 사용자 정보 업데이트
    const updateData = {
      ...(payload.nickname && { nickname: payload.nickname }),
      ...(payload.personalUrl && { personalUrl: payload.personalUrl }),
      ...(payload.image && { image: payload.image }),
      ...(payload.email && { email: payload.email }),
      ...(payload.phone && { phone: payload.phone }),
      ...(payload.comment !== undefined && { comment: payload.comment })
    };

    const { data: updatedUser, error: updateError } = await supabase
      .from('User')
      .update(updateData)
      .eq('sub', session.user.id)
      .select(
        `
        id,
        sub,
        nickname,
        email,
        image,
        personalUrl,
        phone,
        comment,
        isPremium,
        links:UserLink (
          id,
          linkName,
          icon,
          url,
          effect
        )
      `
      )
      .maybeSingle();

    if (updateError) {
      console.error('User update error:', updateError);
      throw updateError;
    }

    // 링크 업데이트
    if (payload.links !== undefined) {
      // 기존 링크 삭제
      const { error: deleteError } = await supabase
        .from('UserLink')
        .delete()
        .eq('userId', userInfo.id);

      if (deleteError) {
        console.error('Link delete error:', deleteError);
        throw deleteError;
      }

      // 새로운 링크 추가
      if (payload.links.length > 0) {
        const { error: insertError } = await supabase.from('UserLink').insert(
          payload.links.map((link) => ({
            userId: userInfo.id,
            linkName: link.linkName,
            url: link.url,
            icon: link.icon,
            effect: link.effect
          }))
        );

        if (insertError) {
          console.error('Link insert error:', insertError);
          throw insertError;
        }
      }
    }

    // 최종 업데이트된 사용자 정보 조회
    const { data: finalUser, error: finalError } = await supabase
      .from('User')
      .select(
        `
        id,
        sub,
        nickname,
        email,
        image,
        personalUrl,
        phone,
        comment,
        isPremium,
        links:UserLink (
          id,
          linkName,
          icon,
          url,
          effect
        )
      `
      )
      .eq('sub', session.user.id)
      .maybeSingle();

    if (finalError) {
      console.error('Final fetch error:', finalError);
      throw finalError;
    }

    return new Response(JSON.stringify(finalUser), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    console.error('Error in PUT handler:', error);
    return new Response(JSON.stringify({ error: '사용자 정보 수정 중 오류가 발생했습니다.' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
}
