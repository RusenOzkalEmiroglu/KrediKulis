// kredi/app/api/placements/[placementKey]/route.ts
import { supabaseAdmin } from '@/lib/supabase-admin'; // Use the public client
import { NextResponse } from 'next/server';

interface Params {
  placementKey: string;
}

interface AdvertisementReturn {
  id: string;
  name: string;
  image_url?: string | null;
  target_url?: string | null;
  type?: string;
  html_code?: string | null;
  is_active: boolean;
}

// Get the ad(s) for a specific placement for public consumption
export async function GET(request: Request, { params }: { params: Params }) {
  const { placementKey } = params;

  if (!placementKey) {
    return NextResponse.json({ error: 'Placement key is required' }, { status: 400 });
  }

  // 1. Find the placement and its assignment
  const { data: placementData, error: placementError } = await supabaseAdmin
    .from('ad_placements')
    .select(`
      advertisement_id,
      ad_group_id,
      ad_groups (
        id,
        ad_group_mappings (
          advertisements ( id, name, image_url, target_url, type, html_code, is_active )
        )
      ),
      advertisements (id, name, image_url, target_url, type, html_code, is_active)
    `)
    .eq('placement_key', placementKey)
    .single();

  if (placementError) {
    console.error(`Placement [${placementKey}] not found:`, placementError);
    return NextResponse.json({ error: 'Placement not found' }, { status: 404 });
  }

  if (!placementData) {
     return NextResponse.json({ error: 'Placement data is empty' }, { status: 404 });
  }

  let adsToReturn: AdvertisementReturn[] = [];

      // 2. Determine which ads to return
      if (placementData.advertisements) {
          // Case 1: A single ad is assigned
          const ad = placementData.advertisements;
          const adObject = Array.isArray(ad) ? ad[0] : ad;
          if (adObject && adObject.is_active) {
              adsToReturn.push(adObject);
          }
      } else if (placementData.ad_groups && placementData.ad_groups.ad_group_mappings) {
          // Case 2: An ad group is assigned
          const activeAdsInGroup = placementData.ad_groups.ad_group_mappings
              .flatMap(mapping => [mapping.advertisements])
              .filter((ad: AdvertisementReturn) => ad && ad.is_active);
          
          // For all placements with ad groups (including carousels), return one random ad
          if (activeAdsInGroup.length > 0) {
              const randomIndex = Math.floor(Math.random() * activeAdsInGroup.length);
              adsToReturn.push(activeAdsInGroup[randomIndex]);
          }
      }
  // 3. Log view events (fire-and-forget)
  if (adsToReturn.length > 0) {
    const reports = adsToReturn.map(ad => ({
      advertisement_id: ad.id,
      event_type: 'view',
    }));
    supabaseAdmin.from('ad_reports').insert(reports).then(({ error }) => {
        if(error) console.error("Error logging ad view:", error.message);
    });
  }

  return NextResponse.json(adsToReturn);
}
