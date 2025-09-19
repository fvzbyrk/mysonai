import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ixmzmgjfwolihwmjnpyk.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

  // Development mode için placeholder değerler kullan
  if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder_key') {
    console.warn('Supabase environment variables not configured. Using placeholder values.');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
