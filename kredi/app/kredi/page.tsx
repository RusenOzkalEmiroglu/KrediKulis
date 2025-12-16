"use client";

import { ArrowRight, CreditCard, Landmark, Home, Car, Briefcase } from "lucide-react";
import Link from "next/link";

export default function Kredi() {
  const krediTurleri = [
    {
      title: "İhtiyaç Kredisi",
      description: "Kişisel harcamalarınız için uygun faiz oranlarıyla ihtiyaç kredisi",
      icon: CreditCard,
      link: "/kredi/ihtiyac-kredisi",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Konut Kredisi",
      description: "Hayalinizdeki eve uygun koşullarla sahip olun",
      icon: Home,
      link: "/kredi/konut-kredisi",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Taşıt Kredisi",
      description: "Araç alımlarınızda avantajlı taşıt kredisi seçenekleri",
      icon: Car,
      link: "/kredi/tasit-kredisi",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Ticari Kredi",
      description: "İşletmeniz için uygun ticari finansman çözümleri",
      icon: Briefcase,
      link: "/kredi/ticari-kredi",
      color: "bg-yellow-50 text-yellow-600"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Kredi Çözümleri</h1>
        <p className="text-gray-600 mt-2">İhtiyaçlarınıza uygun avantajlı kredi seçeneklerimizi keşfedin.</p>
      </div>

      {/* Kredi Türleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {krediTurleri.map((kredi, index) => {
          const IconComponent = kredi.icon;
          return (
            <Link key={index} href={kredi.link}>
              <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${kredi.color} mr-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{kredi.title}</h2>
                    <p className="text-gray-600 mt-1">{kredi.description}</p>
                    <div className="mt-4 flex items-center text-blue-600 font-medium">
                      Detayları İncele <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Sıfır Faiz Fırsatları Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Sıfır Faiz Fırsatları</h2>
            <p className="mt-2">Sınırlı süreyle sunulan sıfır faiz kampanyalarını kaçırmayın!</p>
          </div>
          <Link href="/kredi/sifir-faiz-firsatlari">
            <button className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
              Fırsatları Gör
            </button>
          </Link>
        </div>
      </div>

      {/* Hesaplama Aracı */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Kredi Hesaplama Aracı</h2>
        <p className="text-gray-600 mb-6">Kredi tutarı, vade ve faiz oranı bilgilerinizle aylık ödeme planınızı hemen hesaplayın.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı (₺)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="50.000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vade (Ay)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="36" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Faiz Oranı (%)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="1.65" />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Link href="/kredi/kredi-hesaplama">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Hesapla
            </button>
          </Link>
        </div>
      </div>

      {/* Sık Sorulan Sorular */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Kredi başvurusu için hangi belgeler gereklidir?</summary>
            <p className="mt-2 text-gray-600">Kimlik belgesi, gelir belgesi ve ikametgah belgesi genellikle istenen temel belgelerdir. Kredi türüne göre ek belgeler talep edilebilir.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Kredi başvurusu ne kadar sürede sonuçlanır?</summary>
            <p className="mt-2 text-gray-600">Kredi başvuruları genellikle 24-48 saat içinde değerlendirilir. İhtiyaç kredilerinde bu süre daha kısa olabilir.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Kredi geri ödemesini erken kapatabilir miyim?</summary>
            <p className="mt-2 text-gray-600">Evet, kredi borcunuzu dilediğiniz zaman erken ödeyebilirsiniz. Erken ödeme durumunda kalan anapara üzerinden belirli oranda indirim yapılır.</p>
          </details>
        </div>
        <div className="mt-4 text-center">
          <Link href="/kredi/sik-sorulan-sorular" className="text-blue-600 font-medium">
            Tüm Soruları Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
} 