'use client'

import Link from 'next/link'
import { ArrowRight, Check, Briefcase, DollarSign, PieChart, Truck, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import Card, { CreditCard } from '@/app/components/kredi-karti/Card'

// Ticari kartlar avantajları
const advantages = [
  {
    title: 'Nakit Akışı Yönetimi',
    description: 'Şirket harcamalarınızı ve ödemelerinizi tek bir kartla yönetin.',
    icon: <DollarSign className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Esnek Limitler',
    description: 'İşletmenizin büyüklüğüne ve ihtiyaçlarına göre esnek limit seçenekleri.',
    icon: <PieChart className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Tedarikçi Ödemeleri',
    description: 'Tedarikçi ödemelerinizi kolayca yapın ve vade avantajlarından yararlanın.',
    icon: <Truck className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Raporlama ve Analiz',
    description: 'Harcamalarınızı detaylı olarak raporlayın ve işletme giderlerinizi analiz edin.',
    icon: <Briefcase className="w-10 h-10 text-[#ff3d00]" />
  }
]

export default function TicariKartlarPage() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/credit-cards?type=commercial_card');
                if (!response.ok) throw new Error('Ticari kartlar yüklenemedi.');
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
          <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">Ticari Kredi Kartları</h1>
          <p className="text-lg text-gray-600 mb-8">
            İşletmenizin nakit akışını yönetmenizi kolaylaştıran, harcamalarınızda size özel avantajlar sunan ticari kredi kartlarını inceleyin.
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">Ticari Kartların Avantajları</h2>
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">Öne Çıkan Ticari Kredi Kartları</h2>
        
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-8">Ticari Kartlar Hakkında Sıkça Sorulan Sorular</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Ticari kredi kartı kimler alabilir?</h3>
            <p className="text-gray-600">
              Ticari kredi kartları, şahıs işletmeleri, KOBİ'ler ve büyük ölçekli şirketler gibi vergi levhası olan tüm işletmeler tarafından alınabilir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Ticari kartların limitleri neye göre belirlenir?</h3>
            <p className="text-gray-600">
              Ticari kart limitleri, şirketinizin cirosu, kredi geçmişi, banka ile olan ilişkisi ve finansal durumu gibi faktörlere göre belirlenir. Genellikle bireysel kartlara göre çok daha yüksek limitler sunulur.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Ticari kartlar ile kişisel harcama yapılabilir mi?</h3>
            <p className="text-gray-600">
              Ticari kartların öncelikli amacı şirket harcamalarını yönetmektir. Kişisel harcamalar için kullanılması genellikle önerilmez ve vergi açısından sorun yaratabilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
