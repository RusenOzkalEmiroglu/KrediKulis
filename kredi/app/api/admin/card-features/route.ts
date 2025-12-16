// kredi/app/api/admin/card-features/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { data, error } = await supabase.from('card_features').select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { feature } = await request.json();

  if (!feature) {
    return NextResponse.json({ error: 'Feature text is required' }, { status: 400 });
  }

  // Check if feature already exists
  const { data: existingFeature, error: selectError } = await supabase
    .from('card_features')
    .select('id')
    .eq('feature', feature)
    .single();

  if (existingFeature) {
    return NextResponse.json(existingFeature);
  }

  const { data, error } = await supabase
    .from('card_features')
    .insert([{ feature }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
