// kredi/app/api/consumer-loans/route.ts
import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('consumer_loans')
      .select(`*, application_url, bank:banks (id, name, logo, color, bsmv_rate, kkdf_rate)`);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching consumer loans:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
