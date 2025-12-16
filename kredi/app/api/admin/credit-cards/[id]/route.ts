// kredi/app/api/admin/credit-cards/[id]/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { id } = params;
  const body = await request.json();
  const { name, bank_id, image_url, min_income, interest_rate, apply_url, card_type, is_active, features } = body;

    if (!name || !bank_id) {
        return NextResponse.json({ error: 'Name and bank_id are required fields' }, { status: 400 });
    }

  const { data, error } = await supabase
    .from('credit_cards')
    .update({ name, bank_id, image_url, min_income, interest_rate, apply_url, card_type, is_active })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Delete existing mappings
  const { error: deleteError } = await supabase
    .from('credit_card_features_mapping')
    .delete()
    .eq('credit_card_id', id);

    if (deleteError) {
        console.error('Error deleting feature mappings:', deleteError);
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

  // Insert new mappings
  if (features && features.length > 0) {
    const mappings = features.map((feature: { id: string; is_primary: boolean }) => ({
      credit_card_id: id,
      feature_id: feature.id,
      is_primary: feature.is_primary,
    }));

    const { error: mappingError } = await supabase
      .from('credit_card_features_mapping')
      .insert(mappings);

    if (mappingError) {
      console.error('Error creating feature mappings:', mappingError);
    }
  }


  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const supabase = createClient();
    const { id } = params;

    const { error } = await supabase
        .from('credit_cards')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: `Credit card ${id} deleted successfully` });
}
