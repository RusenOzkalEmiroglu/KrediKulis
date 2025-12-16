import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// IMPORTANT: These should be in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase URL or Service Role Key is not defined in environment variables.");
}

// Create a new Supabase client with the service_role key
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// GET all zero-interest loans
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('zero_interest_loans')
      .select(`*`)
      .order('id', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new zero-interest loan
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.bank_name || !body.offer_description) {
        return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Since there's no 'bank' object, we don't need to delete it.
    const { error } = await supabaseAdmin
      .from('zero_interest_loans')
      .insert([body]);

    if (error) throw error;

    return NextResponse.json({ message: 'Loan created successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (update) a zero-interest loan
export async function PUT(request: Request) {
    try {
      const body = await request.json();
      const { id, ...updateData } = body;
  
      if (!id) {
        return NextResponse.json({ error: 'Loan ID is required for update.' }, { status: 400 });
      }
  
      const { error } = await supabaseAdmin
        .from('zero_interest_loans')
        .update(updateData)
        .eq('id', id);
  
      if (error) throw error;
  
      return NextResponse.json({ message: 'Loan updated successfully' });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

// DELETE a zero-interest loan
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Loan ID is required for deletion.' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('zero_interest_loans')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ message: 'Loan deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
