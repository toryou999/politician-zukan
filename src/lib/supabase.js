import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn('Supabase credentials not found. Auth features will be disabled or work in mockup mode.');
    // ダミーのクライアントを作成して、呼び出し側でエラーにならないようにする（必要に応じて）
    supabase = {
        auth: {
            getUser: async () => ({ data: { user: null }, error: null }),
            getSession: async () => ({ data: { session: null }, error: null }),
            signInWithOAuth: async () => console.log('Mock signInWithOAuth'),
            signOut: async () => console.log('Mock signOut'),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        },
        from: () => ({
            select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
            insert: async () => ({ data: null, error: null }),
        })
    };
}

export { supabase };
