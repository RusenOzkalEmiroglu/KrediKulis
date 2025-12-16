// lib/supabase-admin.ts
import { createClient } from '@supabase/supabase-js';

// This client is for server-side administrative tasks only.
// It uses the service_role_key and is NOT tied to a user's session.
// It should not be exposed to the client-side.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL or service key is missing from environment variables.');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    // Disable auto-refreshing of tokens for a service-role client
    autoRefreshToken: false,
    persistSession: false
  }
});
