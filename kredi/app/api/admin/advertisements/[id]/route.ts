// kredi/app/api/admin/advertisements/[id]/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { id } = params;
  const body = await request.json();
  
  const { 
    name, 
    type, 
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

  let updateData: any = { name, type, is_active };

  if (type === 'image') {
    if (!image_url || !target_url) {
      return NextResponse.json({ error: 'Image URL and Target URL are required for image ads' }, { status: 400 });
    }
    updateData = { ...updateData, image_url, target_url, image_width, image_height };
  } else if (type === 'code') {
    updateData = { ...updateData, html_code, target_url, image_width: null, image_height: null }; // Clear dimensions for code ads
  } else {
    return NextResponse.json({ error: 'Invalid ad type' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('advertisements')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating advertisement ${id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const supabase = createClient();
    const { id } = params;

    const { error } = await supabase
        .from('advertisements')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting advertisement ${id}:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: `Advertisement ${id} deleted successfully` });
}