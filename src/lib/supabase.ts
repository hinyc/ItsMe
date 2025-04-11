import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const config = {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
};

export async function createSupabaseClient() {
  return createClient(supabaseUrl!, supabaseKey!, config);
}

export const supabase = createClient(supabaseUrl!, supabaseKey!, config);
