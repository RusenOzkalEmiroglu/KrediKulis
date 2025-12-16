import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
  console.log('API route /api/test-supabase hit. Testing Supabase connection...');
  const tableName = 'gemini_connection_test';
  const testData = { test_column: `Connection test at ${new Date().toISOString()}` };

  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert(testData)
      .select();

    if (error) {
      console.error('Supabase API route test failed:', error);
      // Check if the error is because the table doesn't exist
      if (error.code === '42P01') { // '42P01' is undefined_table for PostgreSQL
         return NextResponse.json({
          message: 'Connection successful, but the test table does not exist.',
          error_details: `The table '${tableName}' was not found. Please create it in your Supabase dashboard with a text column named 'test_column'.`,
          error,
        }, { status: 500 });
      }
      return NextResponse.json({ message: 'Supabase connection test failed.', error }, { status: 500 });
    }

    console.log('Supabase API route test successful! Data inserted:', data);
    return NextResponse.json({ message: 'Supabase connection test successful!', data });

  } catch (e) {
    console.error('An unexpected error occurred in the API route:', e);
    return NextResponse.json({ message: 'An unexpected error occurred.', error: e }, { status: 500 });
  }
}
