// /kredi/app/api/admin/deposits/[id]/route.ts
import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  id: string;
}

// UPDATE a deposit
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    const body = await request.json();

    // Basic validation
    if (!body.bank_id || !body.term_type || !body.interest_rate_try) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('deposits')
      .update({
        bank_id: body.bank_id,
        term_type: body.term_type,
        interest_rate_try: body.interest_rate_try,
        interest_rate_usd: body.interest_rate_usd,
        interest_rate_eur: body.interest_rate_eur,
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE a deposit
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    const { error } = await supabaseAdmin
      .from('deposits')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
