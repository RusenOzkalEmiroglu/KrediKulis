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

export async function GET() {
  const { data, error } = await supabase
    .from('masthead')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
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
      .eq('is_active', true);
  }
  
  const { data, error } = await supabase
    .from('masthead')
    .insert([{ 
      type, 
      title, 
      description, 
      image_url, 
      link_url, 
      html_code,
      is_active: is_active || false
    }])
    .select();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function PUT(req: NextRequest) {
  const { id, type, title, description, image_url, link_url, html_code, is_active } = await req.json();
  
  if (!id) return NextResponse.json({ error: 'ID zorunlu' }, { status: 400 });
  
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
  return NextResponse.json(data[0]);
}

export async function DELETE(req: NextRequest) {
  try {
    // İlk olarak query parametresinden ID'yi almaya çalış
    const url = new URL(req.url);
    let id = url.searchParams.get('id');
    
    // Eğer query parametresinde ID yoksa, body'den almayı dene
    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch (e) {
        console.error('Body parse hatası:', e);
        // Body parse hatası olursa devam et, id null olacak
      }
    }
    
    console.log('Silinecek masthead ID:', id);
    
    if (!id) {
      return NextResponse.json({ error: 'ID zorunlu. Query parametresi veya body içinde belirtilmelidir.' }, { status: 400 });
    }
    
    const { error } = await supabase.from('masthead').delete().eq('id', id);
    
    if (error) {
      console.error('Silme hatası:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'Masthead başarıyla silindi', id });
  } catch (error: any) {
    console.error('DELETE işlemi sırasında beklenmeyen hata:', error);
    return NextResponse.json({ error: 'Beklenmeyen bir hata oluştu: ' + error.message }, { status: 500 });
  }
}
