'use client'

import Link from 'next/link'
import { ArrowRight, Check, GraduationCap, Coffee, BookOpen, Bus, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import Card, { CreditCard } from '@/app/components/kredi-karti/Card'

// Öğrenci kartları avantajları
const advantages = [

  {
    title: 'Eğitim İndirimleri',
    description: 'Kitap, kırtasiye ve online kurs ödemelerinde özel indirimler sunar.',
    icon: <BookOpen className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Kafe İndirimleri',
    description: 'Öğrencilerin sıklıkla ziyaret ettiği kafelerde indirim ve kampanyalar sağlar.',
    icon: <Coffee className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Ulaşım Avantajları',
    description: 'Toplu taşıma ve ulaşım harcamalarında indirim ve puan kazanma imkanı sunar.',
    icon: <Bus className="w-10 h-10 text-[#ff3d00]" />
  }
]

export default function OgrenciKartlariPage() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/credit-cards?type=student_card');
                if (!response.ok) throw new Error('Öğrenci kartları yüklenemedi.');
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
          <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">Öğrenci Kredi Kartları</h1>
          <p className="text-lg text-gray-600 mb-8">
            Öğrencilere özel avantajlar sunan, düşük limitli ve aidatsız kredi kartlarını inceleyin, 
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">Öğrenci Kartı Avantajları</h2>
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">En İyi Öğrenci Kredi Kartları</h2>
        
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

      {/* Başvuru Koşulları Section */}
      <div className="bg-white rounded-xl p-8 shadow-md mb-12">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-8">Öğrenci Kartı Başvuru Koşulları</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-start">
              <GraduationCap className="h-6 w-6 text-[#ff3d00] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Öğrenci Belgesi</h3>
                <p className="text-gray-600">Aktif öğrenci olduğunuzu gösteren güncel bir öğrenci belgesi sunmanız gerekir.</p>
              </div>
            </div>
            <div className="flex items-start">
              <GraduationCap className="h-6 w-6 text-[#ff3d00] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Yaş Sınırı</h3>
                <p className="text-gray-600">Genellikle 18 yaşını doldurmuş olmanız gerekmektedir. Bazı bankalar 18 yaş altı öğrencilere veli onayı ile kart verebilir.</p>
              </div>
            </div>
            <div className="flex items-start">
              <GraduationCap className="h-6 w-6 text-[#ff3d00] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Gelir Beyanı</h3>
                <p className="text-gray-600">Düzenli bir geliriniz olmasa da burs, aile desteği veya part-time iş gelirini beyan edebilirsiniz.</p>
              </div>
            </div>
            <div className="flex items-start">
              <GraduationCap className="h-6 w-6 text-[#ff3d00] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Kimlik ve İletişim Bilgileri</h3>
                <p className="text-gray-600">Geçerli bir kimlik belgesi ve güncel iletişim bilgilerinizi sunmanız gerekir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SSS Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-8">Sıkça Sorulan Sorular</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Öğrenci kartı için yaş sınırı var mı?</h3>
            <p className="text-gray-600">
              Genellikle öğrenci kredi kartları için 18 yaş ve üzeri olmanız gerekmektedir. Bazı bankalar 18 yaş altı öğrencilere veli onayı ile kart verebilmektedir. Her bankanın kendi politikası olduğundan başvuru öncesi kontrol etmeniz önerilir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Öğrenci kartlarının limitleri ne kadardır?</h3>
            <p className="text-gray-600">
              Öğrenci kredi kartları genellikle 1.000 TL ile 2.000 TL arasında limitlerle sunulur. Bu limitler, öğrencilerin bütçe yönetimini kolaylaştırmak ve aşırı borçlanmayı önlemek için düşük tutulur. Düzenli ödemelerinizle zamanla limit artışı talep edebilirsiniz.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Öğrenci kartları aidatsız mıdır?</h3>
            <p className="text-gray-600">
              Evet, çoğu banka öğrenci kredi kartlarını yıllık ücret almadan sunmaktadır. Öğrenci olduğunuz sürece kart genellikle aidatsız olarak kullanılabilir. Mezun olduktan sonra kartınız standart bir karta dönüştürülebilir ve ücret politikası değişebilir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Mezun olduğumda öğrenci kartım ne olacak?</h3>
            <p className="text-gray-600">
              Mezun olduğunuzda, bankanız öğrenci statünüzün sona erdiğini tespit edebilir ve kartınızı standart bir karta dönüştürebilir. Bu durumda yeni kart şartları ve ücretleri geçerli olacaktır. Bazı bankalar mezuniyet sonrası belirli bir süre daha öğrenci kartı avantajlarını sunabilir.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-gray-800 mb-6">Öğrenci Hayatınızı Kolaylaştıracak Kartı Seçin</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Eğitim hayatınızda size en çok avantaj sağlayacak öğrenci kredi kartını seçin, 
          kampüs yaşamınızı daha ekonomik ve keyifli hale getirin.
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
