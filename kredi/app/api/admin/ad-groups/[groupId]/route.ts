// kredi/app/api/admin/ad-groups/[groupId]/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

interface Params {
  groupId: string;
}

// Add an ad to a group
export async function POST(request: Request, { params }: { params: Params }) {
  const supabase = createClient();
  const { advertisement_id } = await request.json();
  const { groupId } = params;

  if (!advertisement_id) {
    return NextResponse.json({ error: 'Advertisement ID is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('ad_group_mappings')
    .insert({
      ad_group_id: groupId,
      advertisement_id: advertisement_id,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function PUT(request: Request, { params }: { params: Params }) {
    const supabase = createClient();
    const { name, description } = await request.json();
    const { groupId } = params;

    if (!name) {
        return NextResponse.json({ error: 'Group name is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('ad_groups')
        .update({ name, description })
        .eq('id', groupId)
        .select()
        .single();
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}


// Remove an ad from a group OR deletes the entire group
export async function DELETE(request: Request, { params }: { params: Params }) {
    const supabase = createClient();
    const { groupId } = params;
    
    // Check if body exists to decide if it's a mapping deletion or group deletion
    const textBody = await request.text();
    let body;
    try {
        body = JSON.parse(textBody);
    } catch (e) {
        body = null;
    }


    if (body && body.advertisement_id) {
        // Delete a specific ad mapping from the group
        const { error } = await supabase
            .from('ad_group_mappings')
            .delete()
            .match({
                ad_group_id: groupId,
                advertisement_id: body.advertisement_id,
            });
        
        if (error) {
            console.error(`Error deleting ad mapping for group ${groupId}`, error)
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: 'Ad mapping deleted' });
    } else {
        // Delete the entire ad group
        // First, delete all mappings associated with the group
        const { error: mappingError } = await supabase
            .from('ad_group_mappings')
            .delete()
            .eq('ad_group_id', groupId);

        if (mappingError) {
            console.error(`Error deleting mappings for group ${groupId}`, mappingError);
            return NextResponse.json({ error: mappingError.message }, { status: 500 });
        }

        // Then, delete the group itself
        const { error: groupError } = await supabase
            .from('ad_groups')
            .delete()
            .eq('id', groupId);

        if (groupError) {
            console.error(`Error deleting group ${groupId}`, groupError);
            return NextResponse.json({ error: groupError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Ad group and its mappings deleted' });
    }
}
