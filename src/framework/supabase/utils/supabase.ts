import { createClient } from '@supabase/supabase-js';

// prettier-ignore
const SUPABASE_API_URL = process.env.NEXT_PUBLIC_SUPABASE_API_ENDPOINT as string;
const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;
const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);

export default supabase;
