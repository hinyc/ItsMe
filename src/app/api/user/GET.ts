import { auth } from '@/auth';
import { createSupabaseClient } from '@/lib/supabase';
import { IUser } from '@/types';

export async function GET() {
  try {
    const session = await auth();
    console.log('Session:', session);
    console.log('Session user id type:', typeof session?.user?.id);
    console.log('Session user id value:', session?.user?.id);

    if (!session?.user?.id) {
      console.log('No session or user ID');
      return new Response(JSON.stringify({ error: 'Unauthorized', session }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 401
      });
    }

    const supabase = await createSupabaseClient();

    // 먼저 User 테이블의 모든 데이터를 확인

    // 사용자 기본 정보만 먼저 조회
    const { data: userInfo, error: userError } = await supabase
      .from('User')
      .select('*, links:UserLink(*), photos:UserPhoto(*), subscription:Subscription(*)')
      .eq('sub', session.user.id)
      .maybeSingle();

    console.log('User query result:', { userInfo, error: userError });

    if (userError) {
      console.error('User fetch error:', userError);
      throw userError;
    }

    if (!userInfo) {
      console.log('No user found for sub:', session.user.id);
      return new Response(
        JSON.stringify({
          nickname: '',
          email: '',
          image: '',
          personalUrl: '',
          phone: '',
          comment: '',
          isPremium: false,
          links: []
        } satisfies IUser),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // 관계된 데이터는 별도로 조회
    const { data: links } = await supabase.from('UserLink').select('*').eq('userId', userInfo.id);

    const { data: photos } = await supabase.from('UserPhoto').select('*').eq('userId', userInfo.id);

    const { data: subscription } = await supabase
      .from('Subscription')
      .select('*')
      .eq('userId', userInfo.id)
      .maybeSingle();

    // 모든 데이터를 하나의 객체로 병합
    const responseData = {
      ...userInfo,
      links: links || [],
      photos: photos || [],
      subscription: subscription || null
    };

    return new Response(JSON.stringify(responseData satisfies IUser), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
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
