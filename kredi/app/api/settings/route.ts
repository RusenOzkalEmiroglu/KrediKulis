// /kredi/app/api/settings/route.ts
import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Fetch all settings
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('key, value');

    if (error) {
      console.error('Supabase settings select error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the array into a key-value object for easier use on the client
    const settingsObject = data.reduce((acc, setting) => {
        if(setting.key) {
            acc[setting.key] = setting.value;
        }
        return acc;
    }, {} as { [key: string]: string | null });

    return NextResponse.json(settingsObject);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
