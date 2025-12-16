import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase URL or Service Role Key is not defined in environment variables.");
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// GET all commercial loans
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('commercial_loans')
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

// POST a new commercial loan
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.bank_id || !body.maks_tutar || !body.loan_name) {
        return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const amount = Number(body.maks_tutar);
    const interestRate = Number(body.interest_rate) / 100;
    const term = Number(body.maks_vade);

    const allocation_fee = amount * 0.005;
    const monthly_rate = interestRate;
    const monthly_payment = amount * (monthly_rate * Math.pow(1 + monthly_rate, term)) / (Math.pow(1 + monthly_rate, term) - 1);
    const total_payment = monthly_payment * term;
    const total_interest = total_payment - amount;
    const bsmv = total_interest * 0.15;
    const kkdf = total_interest * 0.15;
    const annual_cost_rate = (Math.pow(1 + monthly_rate, 12) - 1) * 100;

    const loanData = {
      ...body,
      allocation_fee,
      monthly_payment: monthly_payment,
      total_payment: total_payment,
      bsmv,
      kkdf,
      real_interest_rate: interestRate * 100,
      annual_cost_rate,
    };

    const { error } = await supabaseAdmin
      .from('commercial_loans')
      .insert([loanData]);

    if (error) throw error;

    return NextResponse.json({ message: 'Commercial loan created successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (update) a commercial loan
export async function PUT(request: Request) {
    try {
      const body = await request.json();
      const { id, ...updateData } = body;
  
      if (!id) {
        return NextResponse.json({ error: 'Loan ID is required for update.' }, { status: 400 });
      }
  
      delete (updateData as any).bank;
      delete (updateData as any).banks;

      const amount = Number(body.maks_tutar);
      const interestRate = Number(body.interest_rate) / 100;
      const term = Number(body.maks_vade);
  
      const allocation_fee = amount * 0.005;
      const monthly_rate = interestRate;
      const monthly_payment = amount * (monthly_rate * Math.pow(1 + monthly_rate, term)) / (Math.pow(1 + monthly_rate, term) - 1);
      const total_payment = monthly_payment * term;
      const total_interest = total_payment - amount;
      const bsmv = total_interest * 0.15;
      const kkdf = total_interest * 0.15;
      const annual_cost_rate = (Math.pow(1 + monthly_rate, 12) - 1) * 100;
  
      const loanData = {
        ...updateData,
        allocation_fee,
        monthly_payment: monthly_payment,
        total_payment: total_payment,
        bsmv,
        kkdf,
        real_interest_rate: interestRate * 100,
        annual_cost_rate,
      };

      const { error } = await supabaseAdmin
        .from('commercial_loans')
        .update(loanData)
        .eq('id', id);
  
      if (error) throw error;
  
      return NextResponse.json({ message: 'Commercial loan updated successfully' });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

// DELETE a commercial loan
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Loan ID is required for deletion.' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('commercial_loans')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ message: 'Commercial loan deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
