import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// IMPORTANT: These should be in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase URL or Service Role Key is not defined in environment variables.");
}

// Create a new Supabase client with the service_role key
// This client bypasses RLS and should ONLY be used on the server.
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// GET all loans
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('consumer_loans')
      .select(`
        *,
        bank:banks(id, name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new loan
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.bank_id || !body.maks_tutar) {
        return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }


    // --- Start of corrected calculation logic ---

    // 1. Fetch bank-specific tax rates
    const { data: bankData, error: bankError } = await supabaseAdmin
      .from('banks')
      .select('bsmv_rate, kkdf_rate')
      .eq('id', body.bank_id)
      .single();

    if (bankError) {
      throw new Error(`Could not fetch tax rates for bank_id: ${body.bank_id}`);
    }

    const bsmv_rate = bankData?.bsmv_rate || 0.15; // fallback to 15%
    const kkdf_rate = bankData?.kkdf_rate || 0.15; // fallback to 15%
    
    // 2. Perform calculations
    const amount = Number(body.maks_tutar) || 0;
    const interestRate = Number(body.interest_rate) / 100;
    const term = Number(body.maks_vade) || 0;

    const monthly_rate = interestRate;
    const monthly_payment = term > 0 && monthly_rate > 0
      ? amount * (monthly_rate * Math.pow(1 + monthly_rate, term)) / (Math.pow(1 + monthly_rate, term) - 1)
      : (term > 0 ? amount / term : 0);
    
    const total_payment_principal_interest = monthly_payment * term;
    const total_interest = total_payment_principal_interest - amount;
    
    const bsmv = total_interest * bsmv_rate;
    const kkdf = total_interest * kkdf_rate;

    const loanData = {
      ...body,
      bsmv,
      kkdf,
    };
    // --- End of corrected calculation logic ---

    const { error } = await supabaseAdmin
      .from('consumer_loans')
      .insert([loanData]);

    if (error) throw error;

    return NextResponse.json({ message: 'Loan created successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (update) a loan
export async function PUT(request: Request) {
    try {
      const body = await request.json();
      const { id, ...updateData } = body;
  
      if (!id) {
        return NextResponse.json({ error: 'Loan ID is required for update.' }, { status: 400 });
      }
  
      // Remove the 'bank' object as it's a join and not a column in consumer_loans table
      delete (updateData as any).bank; 

      // --- Start of corrected calculation logic ---
      
      // 1. Fetch bank-specific tax rates
      const bankId = updateData.bank_id || body.bank_id;
      const { data: bankData, error: bankError } = await supabaseAdmin
        .from('banks')
        .select('bsmv_rate, kkdf_rate')
        .eq('id', bankId)
        .single();

      if (bankError) {
        throw new Error(`Could not fetch tax rates for bank_id: ${bankId}`);
      }

      const bsmv_rate = bankData?.bsmv_rate || 0.15; // fallback to 15%
      const kkdf_rate = bankData?.kkdf_rate || 0.15; // fallback to 15%

      // 2. Perform calculations
      const amount = Number(updateData.maks_tutar) || 0;
      const interestRate = Number(updateData.interest_rate) / 100;
      const term = Number(updateData.maks_vade) || 0;

      const monthly_rate = interestRate;
      const monthly_payment = term > 0 && monthly_rate > 0
        ? amount * (monthly_rate * Math.pow(1 + monthly_rate, term)) / (Math.pow(1 + monthly_rate, term) - 1)
        : (term > 0 ? amount / term : 0);
      
      const total_payment_principal_interest = monthly_payment * term;
      const total_interest = total_payment_principal_interest - amount;
      
      const bsmv = total_interest * bsmv_rate;
      const kkdf = total_interest * kkdf_rate;

      const loanData = {
        ...updateData,
        bsmv,
        kkdf,
      };
      // --- End of corrected calculation logic ---

      const { error } = await supabaseAdmin
        .from('consumer_loans')
        .update(loanData)
        .eq('id', id);
  
      if (error) throw error;
  
      return NextResponse.json({ message: 'Loan updated successfully' });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

// DELETE a loan
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Loan ID is required for deletion.' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('consumer_loans')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ message: 'Loan deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
