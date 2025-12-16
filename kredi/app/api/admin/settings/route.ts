// /kredi/app/api/admin/settings/route.ts
import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const settingsToUpdate: { id: number; value: string }[] = await request.json();

    if (!Array.isArray(settingsToUpdate)) {
      return NextResponse.json({ error: 'Request body must be an array of settings.' }, { status: 400 });
    }

    // Supabase doesn't have a bulk update (upsert with different values per row) in a single command via JS client.
    // We must loop and send requests. For atomicity, this should be done in a database function/transaction.
    // For this use case, sequential updates are acceptable.
    
    const updatePromises = settingsToUpdate.map(setting =>
      supabaseAdmin
        .from('settings')
        .update({ value: setting.value })
        .eq('id', setting.id)
    );

    const results = await Promise.all(updatePromises);

    const error = results.find(res => res.error);

    if (error) {
        console.error('Supabase settings update error:', error);
        return NextResponse.json({ error: 'An error occurred while updating settings.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Settings updated successfully.' });

  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
