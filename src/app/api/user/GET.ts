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
          id: 0,
          sub: '',
          name: '',
          nickname: '',
          email: '',
          image: '',
          personalUrl: '',
          phone: '',
          comment: '',
          isPremium: false,
          links: [],
          photos: [],
          // subscription: {
          //   userId: 0,
          //   planType: 'free',
          //   startDate: new Date(),
          //   endDate: null,
          //   status: 'active'
          // },
          createdAt: new Date(),
          updatedAt: new Date()
        } satisfies IUser),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return new Response(JSON.stringify(userInfo satisfies IUser), {
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
