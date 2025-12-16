import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { title, description, image_url, logo_url, link_url } = await req.json();
  if (!image_url || !title || !link_url)
    return NextResponse.json({ error: 'Görsel, başlık ve URL zorunlu' }, { status: 400 });
  const { data, error } = await supabase
    .from('campaigns')
    .insert([{ title, description, image_url, logo_url, link_url }])
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function PUT(req: NextRequest) {
  const { id, title, description, image_url, logo_url, link_url } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID zorunlu' }, { status: 400 });
  const { data, error } = await supabase
    .from('campaigns')
    .update({ title, description, image_url, logo_url, link_url, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID zorunlu' }, { status: 400 });
  const { error } = await supabase.from('campaigns').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
