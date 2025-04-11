import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createSupabaseClient = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('next-auth.session-token')?.value;

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false
    },
    global: {
      headers: {
        Authorization: sessionToken ? `Bearer ${sessionToken}` : ''
      }
    }
  });
};

export const supabase = createClient(supabaseUrl, supabaseKey);
