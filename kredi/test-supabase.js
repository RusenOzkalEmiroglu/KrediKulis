
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('banks').select('*').limit(5);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      console.log('Successfully connected to Supabase and fetched data:');
      console.log(data);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

testConnection();
