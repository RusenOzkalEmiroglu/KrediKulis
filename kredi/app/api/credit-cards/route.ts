// kredi/app/api/credit-cards/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const cardType = searchParams.get('type');

  let query = supabase
    .from('credit_cards')
    .select(`
        *,
        banks ( name, color ),
        credit_card_features_mapping (
            card_features ( id, feature )
        )
    `)
    .eq('is_active', true);

  if (cardType) {
    query = query.eq('card_type', cardType);
  }
  
  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formattedData = data.map(card => ({
    ...card,
    bank_name: card.banks?.name,
    bank_color: card.banks?.color,
    features: card.credit_card_features_mapping.map((mapping: { card_features: { id: string; feature: string } }) => mapping.card_features.feature)
  }));


  return NextResponse.json(formattedData);
}
