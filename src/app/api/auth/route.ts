import { auth as nextAuth } from '@/auth';
import { createSupabaseClient } from '@/lib/supabase';
import { IAuth } from '@/types';

export async function GET() {
  try {
    const session = await nextAuth();
    console.log('Auth Session:', session);
    console.log('Auth Session user id:', session?.user?.id);
    console.log('Auth Session user id type:', typeof session?.user?.id);

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
    console.log('Supabase client created');

    // 1. 연결 테스트 쿼리
    const { data: testData, error: testError } = await supabase
      .from('User')
      .select('count')
      .limit(1);

    console.log('Connection test result:', { testData, testError });

    // 2. 테이블 스키마 확인
    const { data: tableInfo, error: tableError } = await supabase.from('User').select('*').limit(0);

    console.log('Table schema:', tableInfo);
    console.log('Table error:', tableError);

    // 3. 실제 데이터 조회
    const { data: allUsers, error: allUsersError } = await supabase
      .from('User')
      .select('*')
      .limit(5);

    console.log('All users sample:', allUsers);
    console.log('All users error:', allUsersError);

    // 4. 특정 사용자 조회
    const { data: userInfo, error } = await supabase
      .from('User')
      .select('*')
      .eq('sub', session.user.id)
      .maybeSingle();

    console.log('Auth Supabase query result:', { userInfo, error });
    console.log('Query SQL:', `SELECT * FROM "User" WHERE sub = '${session.user.id}'`);
    console.log('Supabase client config:', {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    });

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
    return new Response(JSON.stringify({ error: '인증 정보를 가져오는 중 오류가 발생했습니다.' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
}

//return interface
//user 정보
//sns 정보
//picture 정보
