'use client'

import Link from 'next/link'
import { ArrowRight, Gift, Percent, Tag, Star, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import Card, { CreditCard } from '@/app/components/kredi-karti/Card'

// Extralı kart avantajları (statik kalabilir)
const advantages = [
  {
    title: 'Ekstra Puan Kazanımı',
    description: 'Extralı kartlar, standart kartlara göre daha yüksek puan kazanma oranları sunar.',
    icon: <Star className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Özel İndirimler',
    description: 'Seçili mağaza ve restoranlarda özel indirim fırsatları elde edersiniz.',
    icon: <Percent className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Ücretsiz Hizmetler',
    description: 'Havalimanı transferi, vale, otopark gibi ücretsiz hizmetlerden yararlanabilirsiniz.',
    icon: <Gift className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Özel Kampanyalar',
    description: 'Sadece extralı kart sahiplerine özel kampanya ve fırsatlara erişim sağlarsınız.',
    icon: <Tag className="w-10 h-10 text-[#ff3d00]" />
  }
]

export default function ExtraliKartlarPage() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                // API'yi yeni 'type' parametresi ile çağırıyoruz
                const response = await fetch('/api/credit-cards?type=extra_card');
                if (!response.ok) throw new Error('Extralı kartlar yüklenemedi.');
                const data = await response.json();
                setCards(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCards();
    }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">Extralı Kredi Kartları</h1>
          <p className="text-lg text-gray-600 mb-8">
            Alışverişlerinizde ekstra puan, indirim ve ayrıcalıklar sunan, avantajlı extralı kredi kartlarını inceleyin, 
            karşılaştırın ve hemen başvurun.
          </p>
          <div className="flex justify-center">
            <Link 
              href="#kartlar" 
              className="bg-[#ff3d00] hover:bg-[#e63600] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center"
            >
              Kartları İncele
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Avantajlar Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">Extralı Kart Avantajları</h2>
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                    {advantage.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-3">{advantage.title}</h3>
                <p className="text-gray-600 text-center">{advantage.description}</p>
                </div>
            ))}
            </div>
        </div>
      </div>

      {/* Kartlar Section */}
      <div id="kartlar" className="mb-16">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">En İyi Extralı Kredi Kartları</h2>
        
        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <Loader className="w-12 h-12 animate-spin text-[#ff3d00]" />
            </div>
        ) : error ? (
            <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
                <p>{error}</p>
            </div>
        ) : (
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((kart) => (
                        <Card key={kart.id} kart={kart} />
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* SSS Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-8">Sıkça Sorulan Sorular</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Extralı kart ne demektir?</h3>
            <p className="text-gray-600">
              Extralı kartlar, standart kredi kartlarına göre daha fazla avantaj, puan kazanma oranı, indirim ve özel hizmet sunan premium kredi kartlarıdır. Bu kartlar genellikle yıllık ücrete sahiptir ancak sundukları avantajlar bu ücreti fazlasıyla karşılar.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Extralı kartların yıllık ücreti nasıl hesaplanır?</h3>
            <p className="text-gray-600">
              Extralı kartların yıllık ücretleri, kartın sunduğu avantajlara, banka politikalarına ve kart tipine göre değişiklik gösterir. Bazı bankalar belirli harcama tutarlarını aştığınızda yıllık ücreti iade edebilir veya bir sonraki yıl için muafiyet sağlayabilir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Extralı kart başvurusu için gerekli şartlar nelerdir?</h3>
            <p className="text-gray-600">
              Extralı kart başvurusu için genellikle daha yüksek gelir seviyesi ve iyi bir kredi skoruna sahip olmanız gerekir. Her bankanın kendi değerlendirme kriterleri vardır, ancak genellikle standart kartlara göre daha yüksek gelir şartı aranır.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Extralı kartların sunduğu özel hizmetler nelerdir?</h3>
            <p className="text-gray-600">
              Extralı kartlar genellikle havalimanı lounge erişimi, ücretsiz vale ve otopark hizmetleri, seyahat sigortası, concierge hizmetleri, özel indirimler, yüksek puan kazanma oranları ve özel kampanyalara erişim gibi ayrıcalıklar sunar.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-gray-800 mb-6">Sizin İçin En Uygun Extralı Kartı Bulun</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Harcama alışkanlıklarınıza ve ihtiyaçlarınıza göre en uygun extralı kredi kartını seçin, 
          özel avantajlardan ve ayrıcalıklardan yararlanın.
        </p>
        <Link 
          href="#kartlar" 
          className="inline-block bg-[#ff3d00] hover:bg-[#e63600] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
        >
          Kartları Karşılaştır
        </Link>
      </div>
    </div>
  )
}
