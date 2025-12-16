import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase URL or Service Role Key is not defined in environment variables.");
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export async function GET() {
  try {
    const { data: depositsData, error: depositsError } = await supabaseAdmin
      .from('deposits')
      .select('*, banks (*)');

    if (depositsError) {
      console.error('Supabase error:', depositsError);
      throw depositsError;
    }

    console.log('Fetched deposits data:', depositsData);
    return NextResponse.json(depositsData);
  } catch (error: any) {
    console.error('Error in deposits API route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}