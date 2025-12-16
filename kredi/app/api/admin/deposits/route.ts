// /kredi/app/api/admin/deposits/route.ts
import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.bank_id || !body.term_type || !body.interest_rate_try) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('deposits')
      .insert([
        {
          bank_id: body.bank_id,
          term_type: body.term_type,
          interest_rate_try: body.interest_rate_try,
          interest_rate_usd: body.interest_rate_usd,
          interest_rate_eur: body.interest_rate_eur,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
