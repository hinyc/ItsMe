import { auth } from '@/auth';
import { createSupabaseClient } from '@/lib/supabase';
import { IUser } from '@/types';

export async function GET() {
  try {
    const session = await auth();
    console.log('Session:', session);

    if (!session?.user?.id) {
      console.log('No session or user ID');
      return new Response('Unauthorized', {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 401
      });
    }

    const supabase = await createSupabaseClient();

    // 사용자 기본 정보 조회
    const { data: userInfo, error: userError } = await supabase
      .from('User')
      .select(
        `
        id,
        sub,
        name,
        nickname,
        email,
        image,
        personalUrl,
        phone,
        comment,
        isPremium,
        createdAt,
        updatedAt
      `
      )
      .eq('sub', session.user.id)
      .maybeSingle();

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

    // 사용자 링크 정보 조회
    const { data: links, error: linksError } = await supabase
      .from('UserLink')
      .select('*')
      .eq('userId', userInfo.id);

    if (linksError) {
      console.error('Links fetch error:', linksError);
      throw linksError;
    }

    // 사용자 사진 정보 조회
    const { data: photos, error: photosError } = await supabase
      .from('UserPhoto')
      .select('*')
      .eq('userId', userInfo.id);

    if (photosError) {
      console.error('Photos fetch error:', photosError);
      throw photosError;
    }

    // 구독 정보 조회
    const { data: subscription, error: subscriptionError } = await supabase
      .from('Subscription')
      .select('*')
      .eq('userId', userInfo.id)
      .maybeSingle();

    if (subscriptionError) {
      console.error('Subscription fetch error:', subscriptionError);
      throw subscriptionError;
    }

    // 인증 정보 조회
    const { data: authInfo, error: authError } = await supabase
      .from('UserAuth')
      .select('*')
      .eq('userId', userInfo.id)
      .maybeSingle();

    if (authError) {
      console.error('Auth info fetch error:', authError);
      throw authError;
    }

    // 모든 정보를 하나의 객체로 병합
    const responseData = {
      ...userInfo,
      links: links || [],
      photos: photos || [],
      subscription: subscription || null,
      auth: authInfo || null
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
