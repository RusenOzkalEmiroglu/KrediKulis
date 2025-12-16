// kredi/seed-initial-ads.js

// This script populates the database with the initial carousel ads.
// To run it, you need to install node-fetch: npm install node-fetch
// Then run from your terminal: node kredi/seed-initial-ads.js

const { createClient } = require('@supabase/supabase-js');

// IMPORTANT: You must create a .env file in the 'kredi' directory
// and add your Supabase URL and SERVICE_ROLE_KEY.
// Example .env file:
// NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
// SUPABASE_SERVICE_ROLE_KEY=your-super-secret-service-role-key

require('dotenv').config({ path: './kredi/.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in a .env file in the /kredi directory.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const carouselImages = [
  { name: 'Carousel Ad 1', image_url: '/images/admin/Carousel/1.webp', target_url: '#' },
  { name: 'Carousel Ad 2', image_url: '/images/admin/Carousel/2.webp', target_url: '#' },
  { name: 'Carousel Ad 3', image_url: '/images/admin/Carousel/3.webp', target_url: '#' },
  { name: 'Carousel Ad 4', image_url: '/images/admin/Carousel/4.webp', target_url: '#' },
  { name: 'Carousel Ad 5', image_url: '/images/admin/Carousel/5.webp', target_url: '#' },
  { name: 'Carousel Ad 6', image_url: '/images/admin/Carousel/6.webp', target_url: '#' },
];

async function seed() {
  console.log('Starting to seed initial ads...');

  // 1. Insert advertisements
  const { data: ads, error: adsError } = await supabase
    .from('advertisements')
    .insert(carouselImages.map(ad => ({ ...ad, type: 'image' })))
    .select();

  if (adsError) {
    console.error('Error inserting ads:', adsError.message);
    return;
  }
  console.log(`Inserted ${ads.length} advertisements.`);

  // 2. Create an ad group
  const groupName = 'Ana Sayfa Karusel Grubu';
  const { data: group, error: groupError } = await supabase
    .from('ad_groups')
    .insert({ name: groupName, description: 'Ana sayfadaki ana karusel için kullanılan reklam grubu.' })
    .select()
    .single();

  if (groupError) {
    // Check if group already exists
    if (groupError.code === '23505') { // unique_violation
        console.warn(`Group "${groupName}" already exists. Skipping group creation.`);
        const { data: existingGroup, error: fetchError } = await supabase.from('ad_groups').select('id').eq('name', groupName).single();
        if (fetchError) {
             console.error('Could not fetch existing group.', fetchError.message);
             return;
        }
        group.id = existingGroup.id;
    } else {
        console.error('Error creating ad group:', groupError.message);
        return;
    }
  } else {
    console.log(`Created ad group: "${group.name}"`);
  }
  
  // 3. Map ads to the group
  const mappings = ads.map(ad => ({
    ad_group_id: group.id,
    advertisement_id: ad.id,
  }));

  const { error: mappingError } = await supabase
    .from('ad_group_mappings')
    .insert(mappings);

  if (mappingError) {
    console.error('Error mapping ads to group:', mappingError.message);
    return;
  }
  console.log(`Mapped ${mappings.length} ads to the group.`);

  // 4. Assign the group to the 'home_carousel' placement
  const { error: placementError } = await supabase
    .from('ad_placements')
    .update({ ad_group_id: group.id, advertisement_id: null })
    .eq('placement_key', 'home_carousel');

  if (placementError) {
    console.error('Error assigning group to placement:', placementError.message);
    return;
  }
  console.log('Assigned group to "home_carousel" placement.');
  
  console.log('\nSeed complete! The home carousel is now populated.');
}

seed();
