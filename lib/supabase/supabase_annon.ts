// PREVIEW MODE: Real Supabase client is commented out.
// In production, this creates an anonymous (public) Supabase client used for
// reading file_cache records (task statuses) on behalf of the signed-in user.
//
// import { createClient } from '@supabase/supabase-js';
// import { Database } from '@/database.types';
//
// const supabase_url = process.env.SUPABASE_URL!;
// const supabase_annon_key = process.env.SUPABASE_ANNON_KEY!;
//
// const supabase = createClient<Database>(supabase_url, supabase_annon_key);
// export default supabase;

// Mock client — exported as `any` so call sites compile; operations are mocked at the operations layer.
const supabase = null as any;
export default supabase;
