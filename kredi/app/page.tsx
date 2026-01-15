import { createClient } from '@/lib/supabase-server'

import AnasayfaHesaplamaTabs from './components/AnasayfaHesaplamaTabs'
import AnasayfaGuncelDoviz from './components/anasayfa-guncel-doviz'
import BankPartners from './components/BankPartners'
import EmailSubscription from './components/EmailSubscription'
import HomeCarousel from './components/HomeCarousel'
import SpecialCampaigns from './components/SpecialCampaigns'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createClient();

  const { data: banks } = await supabase.from('banks').select('*');

  const shuffledBanks = banks ? [...banks].sort(() => Math.random() - 0.5) : [];

  return (
    <main>
      <div className="container mx-auto px-4">
        {/* Current Exchange Rates Section */}
        <AnasayfaGuncelDoviz 
          backgroundColorClass="bg-orange-50/70"
          titleColorClass="text-orange-500"
          valueColorClass="text-gray-700"
          showTitle={false}
          displayCount={5} 
          enabledCurrencies={[
            'USD', 'EUR', 'GBP', 'CHF', 'KWD', 
            'SAR', 'JPY', 'AUD', 'CAD', 'SEK', 
            'NOK', 'DKK', 'BGN', 'RON', 'CNY'
          ]}
          autoSlide={true} 
          slideInterval={5000} 
        />
        
        {/* Hero Title Section */}
        <div className="text-center pt-6 pb-4"> 
          <h1 className="text-4xl text-brand-orange mb-1"> 
            Türkiye'nin Kredi Süpermarketi
          </h1>
        </div>

        {/* Hesaplama Aracı Section */}
        <div className="mb-10"> 
          <AnasayfaHesaplamaTabs />
        </div>

        {/* Sana Özel Kampanyalar Section */}
        <SpecialCampaigns />
        
        {/* Bank Partners Section */}
        <BankPartners banks={shuffledBanks} />
        
        {/* Email Subscription Section */}
        <div className="my-10">
          <EmailSubscription />
        </div>
        
        {/* End of Content */}
      </div>
    </main>
  )
}