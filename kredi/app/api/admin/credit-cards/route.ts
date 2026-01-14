// kredi/app/api/admin/credit-cards/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

// GET all credit cards, optionally filtered by type
export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let query = supabase
    .from('credit_cards')
    .select(`
        *,
        banks ( name )
    `)
    .order('created_at', { ascending: false });

  if (type) {
    query = query.eq('card_type', type);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formattedData = data.map((card: any) => ({
    ...card,
    bank: card.banks
  }));

  return NextResponse.json(formattedData);
}

// POST a new credit card
export async function POST(request: NextRequest) {
    const supabase = createClient();
    const body = await request.json();

    const { features, ...cardData } = body;

    const { data: newCard, error: cardError } = await supabase
        .from('credit_cards')
        .insert(cardData)
        .select()
        .single();

    if (cardError) {
        console.error('Error creating card:', cardError);
        return NextResponse.json({ error: cardError.message }, { status: 500 });
    }

    if (features && features.length > 0) {
        const featureMappings = features.map((feature: any) => ({
            credit_card_id: newCard.id,
            feature_id: feature.id,
            is_primary: feature.is_primary,
        }));

        const { error: featureError } = await supabase
            .from('credit_card_features_mapping')
            .insert(featureMappings);

        if (featureError) {
            console.error('Error mapping features:', featureError);
            // Optionally, you might want to delete the card that was just created
            await supabase.from('credit_cards').delete().eq('id', newCard.id);
            return NextResponse.json({ error: featureError.message }, { status: 500 });
        }
    }

    return NextResponse.json(newCard);
}

// PUT (update) an existing credit card
export async function PUT(request: NextRequest) {
    const supabase = createClient();
    const body = await request.json();
    const { id, features, ...updateData } = body;

    if (!id) {
        return NextResponse.json({ error: 'Card ID is required' }, { status: 400 });
    }

    const { data: updatedCard, error: cardError } = await supabase
        .from('credit_cards')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (cardError) {
        console.error('Error updating card:', cardError);
        return NextResponse.json({ error: cardError.message }, { status: 500 });
    }

    // First, delete existing feature mappings for this card
    const { error: deleteError } = await supabase
        .from('credit_card_features_mapping')
        .delete()
        .eq('credit_card_id', id);

    if (deleteError) {
        console.error('Error deleting old feature mappings:', deleteError);
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // Then, insert new feature mappings if any
    if (features && features.length > 0) {
        const featureMappings = features.map((feature: any) => ({
            credit_card_id: id,
            feature_id: feature.id,
            is_primary: feature.is_primary,
        }));

        const { error: insertError } = await supabase
            .from('credit_card_features_mapping')
            .insert(featureMappings);

        if (insertError) {
            console.error('Error inserting new feature mappings:', insertError);
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }
    }

    return NextResponse.json(updatedCard);
}

// DELETE a credit card
export async function DELETE(request: NextRequest) {
    const supabase = createClient();
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'Card ID is required' }, { status: 400 });
    }

    const { error } = await supabase
        .from('credit_cards')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Credit card deleted successfully' });
}