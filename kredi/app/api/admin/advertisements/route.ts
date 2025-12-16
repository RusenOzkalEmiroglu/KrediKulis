// kredi/app/api/admin/advertisements/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { data: advertisements, error } = await supabase
    .from('advertisements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching advertisements:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(advertisements);
}

export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json();
  const { 
    name, 
    type = 'image', 
    image_url, 
    target_url, 
    html_code, 
    is_active,
    image_width,
    image_height
  } = body;

  if (!name || !type) {
    return NextResponse.json({ error: 'Name and type are required fields' }, { status: 400 });
  }

  let insertData: any = { name, type, is_active };

  if (type === 'image') {
    if (!image_url || !target_url) {
      return NextResponse.json({ error: 'Image URL and Target URL are required for image ads' }, { status: 400 });
    }
    insertData = { ...insertData, image_url, target_url, image_width, image_height };
  } else if (type === 'code') {
    insertData = { ...insertData, html_code, target_url }; // target_url can be optional for code ads but good to have
  } else {
    return NextResponse.json({ error: 'Invalid ad type' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('advertisements')
    .insert([insertData])
    .select()
    .single();

  if (error) {
    console.error('Error creating advertisement:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
