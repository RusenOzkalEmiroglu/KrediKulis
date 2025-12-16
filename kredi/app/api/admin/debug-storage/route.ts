// app/api/admin/debug-storage/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

// Force dynamic execution to avoid caching
export const dynamic = 'force-dynamic';

export async function GET() {
    console.log('Debug API called: Listing storage buckets...');
    const supabase = createClient();

    try {
        const { data, error } = await supabase.storage.listBuckets();

        if (error) {
            console.error('Error listing buckets:', error);
            return NextResponse.json({ error: 'Failed to list buckets', details: error.message }, { status: 500 });
        }

        console.log('Buckets found:', data);
        return NextResponse.json(data);
    } catch (e: any) {
        console.error('Catastrophic error in debug API:', e);
        return NextResponse.json({ error: 'An unexpected error occurred.', details: e.message }, { status: 500 });
    }
}
