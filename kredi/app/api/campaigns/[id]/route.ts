import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Kampanya bulunamadı' }, { status: 404 });
  
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { title, description, image_url, logo_url, link_url } = await req.json();
  
  if (!image_url || !title || !link_url)
    return NextResponse.json({ error: 'Görsel, başlık ve URL zorunlu' }, { status: 400 });
    
  const { data, error } = await supabase
    .from('campaigns')
    .update({ title, description, image_url, logo_url, link_url, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0) return NextResponse.json({ error: 'Kampanya bulunamadı' }, { status: 404 });
  
  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id);
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json({ success: true });
}
