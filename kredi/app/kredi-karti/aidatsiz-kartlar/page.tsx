'use client'

import Link from 'next/link'
import { ArrowRight, DollarSign, Percent, Shield, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import Card, { CreditCard } from '@/app/components/kredi-karti/Card'

// Avantajlar ve bilgiler
const advantages = [
  {
    title: 'Yıllık Ücret Yok',
    description: 'Aidatsız kartlar, yıllık kart ücreti ödemeden kullanabileceğiniz kredi kartlarıdır.',
    icon: <DollarSign className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Ömür Boyu Ücretsiz',
    description: 'Harcama şartı olmadan, ömür boyu ücretsiz kullanım imkanı sunar.',
    icon: <Shield className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Puan Avantajları',
    description: 'Birçok aidatsız kart, alışverişlerinizde puan kazanma imkanı da sağlar.',
    icon: <Percent className="w-10 h-10 text-[#ff3d00]" />
  },

]

export default function AidatsizKartlarPage() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/credit-cards?type=fee_free');
                if (!response.ok) throw new Error('Kartlar yüklenemedi.');
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
          <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">Aidatsız Kredi Kartları</h1>
          <p className="text-lg text-gray-600 mb-8">
            Yıllık ücret ödemeden kullanabileceğiniz, avantajlı aidatsız kredi kartlarını inceleyin, 
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">Aidatsız Kart Avantajları</h2>
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">En İyi Aidatsız Kredi Kartları</h2>
        
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
            <h3 className="text-xl font-bold text-gray-800 mb-3">Aidatsız kart ne demektir?</h3>
            <p className="text-gray-600">
              Aidatsız kart, yıllık kart ücreti ödemeden kullanabileceğiniz kredi kartlarıdır. Bu kartlar genellikle harcama şartı olmadan veya belirli bir harcama tutarını aştığınızda yıllık ücret alınmayan kartlardır.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Aidatsız kartların dezavantajları var mıdır?</h3>
            <p className="text-gray-600">
              Aidatsız kartlar genellikle standart kartlara göre daha az puan/mil kazandırabilir veya daha az ek hizmet sunabilir. Ancak günümüzde birçok aidatsız kart, puan kazanma ve kampanya avantajları da sunmaktadır.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Aidatsız kart başvurusu için gerekli şartlar nelerdir?</h3>
            <p className="text-gray-600">
              Aidatsız kart başvurusu için genellikle düzenli gelir sahibi olmanız ve kredi skorunuzun belirli bir seviyenin üzerinde olması gerekmektedir. Her bankanın minimum gelir şartı farklılık gösterebilir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Aidatsız kartlar gerçekten ömür boyu ücretsiz midir?</h3>
            <p className="text-gray-600">
              Birçok banka aidatsız kartlarını ömür boyu ücretsiz olarak sunmaktadır. Ancak bankaların kart sözleşmelerinde değişiklik yapma hakları saklıdır. Bu nedenle başvuru yapmadan önce kart sözleşmesini incelemeniz önerilir.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-6">Sizin İçin En Uygun Aidatsız Kartı Bulun</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Harcama alışkanlıklarınıza ve ihtiyaçlarınıza göre en uygun aidatsız kredi kartını seçin, 
          yıllık ücret ödemeden avantajlı alışverişin keyfini çıkarın.
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
