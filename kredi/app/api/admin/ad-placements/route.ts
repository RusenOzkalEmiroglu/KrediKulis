// kredi/app/api/admin/ad-placements/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

// GET all ad placements
export async function GET(request: Request) {
  const supabase = createClient();
  
  // Fetch placements and the currently assigned ad or group
  const { data, error } = await supabase
    .from('ad_placements')
    .select(`
      id,
      placement_key,
      display_name,
      advertisements(id, name),
      ad_groups(id, name)
    `)
    .order('display_name', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
