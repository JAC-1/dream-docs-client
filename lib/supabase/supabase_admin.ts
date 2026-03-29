// PREVIEW MODE: Real Supabase admin client is commented out.
// In production, this creates a service-role Supabase client that bypasses
// Row Level Security — used only in server-side API routes.
//
// import { createClient } from '@supabase/supabase-js';
// import { Database } from '@/database.types';
//
// const supabase_url = process.env.SUPABASE_URL!;
// const service_role_key = process.env.SUPABASE_SERVICE_KEY!;
//
// const supabase = createClient<Database>(supabase_url, service_role_key, {
//   auth: {
//     autoRefreshToken: false,
//     persistSession: false,
//   },
// });
//
// export default supabase;

// Mock client — exported as `any` so call sites compile; operations are mocked at the operations layer.
const supabase = null as any;
export default supabase;
