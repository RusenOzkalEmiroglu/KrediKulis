// kredi/app/api/admin/ad-reports/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  
  let query = supabase
    .from('ad_reports')
    .select(`
      advertisement_id,
      event_type,
      created_at,
      advertisements (name)
    `);

    if (startDate) {
        query = query.gte('created_at', startDate);
    }
    if (endDate) {
        query = query.lte('created_at', endDate);
    }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Process data to get counts
  const counts = data.reduce((acc: any, report: any) => {
    if (!report.advertisements) return acc; // Skip if ad was deleted

    const adId = report.advertisement_id;
    const adName = report.advertisements[0]?.name;
    const eventType = report.event_type;

    if (!acc[adId]) {
      acc[adId] = { name: adName, views: 0, clicks: 0 };
    }

    if (eventType === 'view') {
      acc[adId].views++;
    } else if (eventType === 'click') {
      acc[adId].clicks++;
    }

    return acc;
  }, {} as Record<string, { name: string; views: number; clicks: number }>);

  // Convert object to array
  const result = Object.values(counts).sort((a: any, b: any) => b.views - a.views);

  return NextResponse.json(result);
}
