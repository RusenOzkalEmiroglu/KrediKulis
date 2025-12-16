import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Ensure environment variables are loaded and available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase URL or Service Role Key is not defined in environment variables.");
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// GET all banks
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('banks')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new bank
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { error } = await supabaseAdmin.from('banks').insert([body]);
    if (error) throw error;
    return NextResponse.json({ message: 'Bank created successfully' }, { status: 201 });
  } catch (error: any) {
    // Check for the specific varchar length error
    if (error.code === '22001') {
      return NextResponse.json({ 
        error: `Veritabanı hatası: Girdiğiniz değerlerden biri çok uzun. Lütfen alanları kontrol edin. (Detay: ${error.message})` 
      }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (update) an existing bank
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ error: 'Bank ID is required for update.' }, { status: 400 });
    }
    const { error } = await supabaseAdmin.from('banks').update(updateData).eq('id', id);
    if (error) throw error;
    return NextResponse.json({ message: 'Bank updated successfully' });
  } catch (error: any) {
    // Check for the specific varchar length error
    if (error.code === '22001') {
      return NextResponse.json({ 
        error: `Veritabanı hatası: Girdiğiniz değerlerden biri çok uzun. Lütfen alanları kontrol edin. (Detay: ${error.message})` 
      }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a bank
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Bank ID is required for deletion.' }, { status: 400 });
    }
    const { error } = await supabaseAdmin.from('banks').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ message: 'Bank deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
