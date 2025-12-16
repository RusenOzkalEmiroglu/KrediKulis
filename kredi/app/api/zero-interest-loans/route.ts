// kredi/app/api/zero-interest-loans/route.ts
import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Fetch all banks
    const { data: banksData, error: banksError } = await supabaseAdmin
      .from('banks')
      .select('*');

    if (banksError) throw banksError;

    // 2. Fetch all zero-interest loans
    const { data: loansData, error: loansError } = await supabaseAdmin
      .from('zero_interest_loans')
      .select('*');

    if (loansError) throw loansError;

    // 3. Combine loans with bank data using a sanitized, bidirectional "includes" match
    if (loansData && banksData) {
      const sanitizeString = (str: string) => str ? str.toLowerCase().replace(/[^a-z0-9]/gi, '') : '';

      const combinedData = loansData.map(loan => {
        const sanitizedLoanBankName = sanitizeString(loan.bank_name);
        if (!sanitizedLoanBankName) {
          return { ...loan, bank: undefined };
        }
        
        // Find the full bank object using a sanitized, bidirectional includes check
        const bankObject = banksData.find(bank => {
          const sanitizedBankName = sanitizeString(bank.name);
          return sanitizedBankName.includes(sanitizedLoanBankName) || sanitizedLoanBankName.includes(sanitizedBankName);
        });

        return {
          ...loan,
          bank: bankObject // This will be undefined if no match is found, which is handled by the frontend
        };
      });

      return NextResponse.json(combinedData);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching zero interest loans:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
