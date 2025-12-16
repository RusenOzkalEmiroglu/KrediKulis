// kredi/app/api/admin/ad-placements/[placementId]/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

interface Params {
  placementId: string;
}

// Update an ad placement
export async function PUT(request: Request, { params }: { params: Params }) {
  const supabase = createClient();
  const { advertisement_id, ad_group_id } = await request.json();
  const { placementId } = params;

  // Ensure only one of advertisement_id or ad_group_id is provided
  if (advertisement_id && ad_group_id) {
    return NextResponse.json({ error: 'Cannot assign both an ad and a group.' }, { status: 400 });
  }

  const updateData = {
    advertisement_id: advertisement_id || null,
    ad_group_id: ad_group_id || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('ad_placements')
    .update(updateData)
    .eq('id', placementId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
