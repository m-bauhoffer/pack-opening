import { createClient } from "@supabase/supabase-js";

const supabaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublisheableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHEABLE_KEY!;


export const supabase = createClient(
    supabaseUrl,
    supabasePublisheableKey
);