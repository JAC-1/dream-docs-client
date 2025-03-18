import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

const supabase_url = process.env.SUPABASE_URL!;
const supabase_annon_key = process.env.SUPABASE_ANNON_KEY!;

const supabase = createClient<Database>(supabase_url, supabase_annon_key);
export default supabase;
