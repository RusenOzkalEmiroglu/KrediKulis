import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Supabase bağlantısı için client oluştur
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js/2.0.0',
      },
    },
  }
);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  const { data, error } = await supabase
    .from('masthead')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Masthead bulunamadı' }, { status: 404 });
  
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { type, title, description, image_url, link_url, html_code, is_active } = await req.json();
  
  // Validasyon
  if (type !== 'image' && type !== 'code') {
    return NextResponse.json({ error: 'Geçersiz tip. "image" veya "code" olmalıdır.' }, { status: 400 });
  }
  
  if (type === 'image' && (!image_url || !link_url)) {
    return NextResponse.json({ error: 'Resim tipi için görsel ve URL zorunludur.' }, { status: 400 });
  }
  
  if (type === 'code' && !html_code) {
    return NextResponse.json({ error: 'Kod tipi için HTML kodu zorunludur.' }, { status: 400 });
  }
  
  // Eğer is_active true ise, diğer tüm aktif mastheadleri devre dışı bırak
  if (is_active) {
    await supabase
      .from('masthead')
      .update({ is_active: false })
      .neq('id', id)
      .eq('is_active', true);
  }
  
  const { data, error } = await supabase
    .from('masthead')
    .update({ 
      type, 
      title, 
      description, 
      image_url, 
      link_url, 
      html_code,
      is_active: is_active || false,
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0) return NextResponse.json({ error: 'Masthead bulunamadı' }, { status: 404 });
  
  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  const { error } = await supabase
    .from('masthead')
    .delete()
    .eq('id', id);
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json({ success: true });
}
