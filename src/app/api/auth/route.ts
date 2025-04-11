import { auth as nextAuth } from '@/auth';
import { createSupabaseClient } from '@/lib/supabase';
import { IAuth } from '@/types';

export async function GET() {
  try {
    const session = await nextAuth();
    console.log('Auth Session:', session);

    const auth: IAuth = {
      nickname: '',
      email: '',
      personalUrl: '',
      isAuthenticated: false
    };

    if (!session?.user?.id) {
      console.log('No session or user ID in auth route');
      return new Response(JSON.stringify(auth), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const supabase = await createSupabaseClient();

    const { data: userInfo, error } = await supabase
      .from('User')
      .select('*')
      .eq('sub', session.user.id)
      .maybeSingle();

    console.log('Auth Supabase query result:', { userInfo, error });

    if (error) {
      console.error('Auth Supabase error:', error);
      throw error;
    }

    if (!userInfo) {
      console.log('No user found for sub in auth route:', session.user.id);
      return new Response(JSON.stringify(auth), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    auth.nickname = userInfo.nickname?.toString() || '';
    auth.email = userInfo.email?.toString() || '';
    auth.personalUrl = userInfo.personalUrl?.toString() || '';
    auth.isAuthenticated = true;

    return new Response(JSON.stringify(auth), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in auth route:', error);
    return new Response(JSON.stringify(error), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 404
    });
  }
}

//return interface
//user 정보
//sns 정보
//picture 정보
