// kredi/app/api/ads/[adId]/click/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface Params {
  adId: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const supabase = createClient();
  const { adId } = params;
  const headersList = headers();

  if (!adId) {
    return NextResponse.json({ error: 'Ad ID is required' }, { status: 400 });
  }

  const { error } = await supabase.from('ad_reports').insert({
    advertisement_id: adId,
    event_type: 'click',
    ip_address: headersList.get('x-forwarded-for'), // Get IP from request headers
    user_agent: headersList.get('user-agent'),     // Get User Agent
  });

  if (error) {
    console.error('Error logging ad click:', error);
    return NextResponse.json({ error: 'Could not log click' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
