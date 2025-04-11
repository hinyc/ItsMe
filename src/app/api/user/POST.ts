import { auth } from '@/auth';
import { createSupabaseClient } from '@/lib/supabase';
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
    console.log('Session:', session);
    console.log('Session user:', session?.user);

    const payload = await request.json();
    console.log('Payload:', payload);

    if (!payload) {
      return new Response(JSON.stringify({ error: 'No payload' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }

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

    console.log('User info params:', userInfoParams);

    const supabase = await createSupabaseClient();
    console.log('Supabase client created');

    // 중복 체크
    const { data: existingUser, error: checkError } = await supabase
      .from('User')
      .select('id')
      .eq('sub', session.user.id)
      .maybeSingle();

    console.log('Existing user check:', { existingUser, checkError });

    if (checkError) {
      console.error('Check error:', checkError);
      throw checkError;
    }

    if (existingUser) {
      return new Response(JSON.stringify({ error: '이미 등록된 사용자입니다.' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }

    // 사용자 생성
    const { data: user, error: insertError } = await supabase
      .from('User')
      .insert([userInfoParams])
      .select('*')
      .single();

    console.log('User creation result:', { user, error: insertError });

    if (insertError) {
      console.error('User creation error:', insertError);
      throw insertError;
    }

    if (!user) {
      return new Response(JSON.stringify({ error: '사용자 등록에 실패했습니다.' }), {
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
    console.error('Error in POST handler:', error);
    return new Response(
      JSON.stringify({
        error: '서버 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
