// kredi/app/api/admin/ad-groups/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

// GET all ad groups
export async function GET(request: Request) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('ad_groups')
    .select(`
      id,
      name,
      description,
      created_at,
      ad_group_mappings (
        advertisements ( id, name, image_url )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // The data structure from Supabase is nested. We need to flatten it for the client.
  const formattedData = data.map((group: any) => ({
    ...group,
    advertisements: group.ad_group_mappings.map((mapping: any) => mapping.advertisements)
  }));

  return NextResponse.json(formattedData);
}

// POST a new ad group
export async function POST(request: Request) {
  const supabase = createClient();
  const { name, description } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'Group name is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('ad_groups')
    .insert([{ name, description }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
