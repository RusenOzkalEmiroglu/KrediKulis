import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uxtlcbcnwmxeyszhlewf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dGxjYmNud214ZXlzemhsZXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzA3NDgsImV4cCI6MjA1OTI0Njc0OH0._EkYRxwdfj-pTwFHj_Nk7e6nifsM75IgEbNLfllZNsQ';

export const supabase = createClient(supabaseUrl, supabaseKey); 