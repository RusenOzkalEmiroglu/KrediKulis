"use client";

import { Calendar, Clock, Tag, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SifirFaizFirsatlari() {
  const firsatlar = [
    {
      title: "İhtiyaç Kredisinde 3 Ay Sıfır Faiz",
      description: "10.000 TL'ye kadar ihtiyaç kredilerinde 3 ay vade ile sıfır faiz fırsatı",
      image: "https://picsum.photos/id/1040/300/200",
      endDate: "30 Haziran 2023",
      link: "/kredi/ihtiyac-kredisi"
    },
    {
      title: "Otomobil Kredilerinde Sıfır Faiz",
      description: "Seçili otomobil modellerinde 100.000 TL'ye kadar 6 ay vade ile sıfır faiz kampanyası",
      image: "https://picsum.photos/id/1071/300/200",
      endDate: "15 Temmuz 2023",
      link: "/kredi/tasit-kredisi"
    },
    {
      title: "Elektronik Alışverişlerinde Sıfır Faiz",
      description: "Anlaşmalı mağazalarda elektronik alışverişlerinizde kredi kartına 9 taksit sıfır faiz",
      image: "https://picsum.photos/id/365/300/200",
      endDate: "31 Ağustos 2023",
      link: "/kredi/kredi-karti"
    },
    {
      title: "Evlilik Kredilerinde Sıfır Faiz",
      description: "Yeni evlenecek çiftler için 50.000 TL'ye kadar 12 ay vade ile sıfır faiz avantajı",
      image: "https://picsum.photos/id/46/300/200",
      endDate: "31 Aralık 2023",
      link: "/kredi/ihtiyac-kredisi"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sıfır Faiz Fırsatları</h1>
        <p className="text-gray-600 mt-2">Sınırlı süreli sıfır faiz kampanyalarımızla bütçe dostu çözümler sunuyoruz.</p>
      </div>

      {/* Ana Banner */}
      <div className="relative rounded-xl overflow-hidden mb-10">
        <img 
          src="https://picsum.photos/id/1058/1200/400" 
          alt="Sıfır Faiz Fırsatları" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
          <div className="px-8 py-6 text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-2">Sıfır Faiz Fırsatlarını Kaçırmayın!</h2>
            <p className="mb-4">Sınırlı süreli kampanyalarımızla hayallerinizi ertelemeyin.</p>
            <button className="bg-white text-blue-900 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
              Hemen Başvur
            </button>
          </div>
        </div>
      </div>

      {/* Fırsatlar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {firsatlar.map((firsat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <img 
              src={firsat.image} 
              alt={firsat.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center text-red-600 mb-2">
                <Tag className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Sıfır Faiz</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{firsat.title}</h3>
              <p className="text-gray-600 mb-4">{firsat.description}</p>
              <div className="flex items-center text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Son Tarih: {firsat.endDate}</span>
              </div>
              <Link href={firsat.link} className="text-blue-600 font-medium flex items-center">
                Detayları İncele <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Nasıl Başvururum */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">Nasıl Başvururum?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
              1
            </div>
            <h3 className="font-medium mb-2">Kampanyayı Seçin</h3>
            <p className="text-gray-600">Size uygun sıfır faiz kampanyasını belirleyin</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
              2
            </div>
            <h3 className="font-medium mb-2">Başvuru Yapın</h3>
            <p className="text-gray-600">Online, mobil veya şubelerimizden başvurunuzu gerçekleştirin</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
              3
            </div>
            <h3 className="font-medium mb-2">Onay Alın</h3>
            <p className="text-gray-600">Başvurunuz onaylandıktan sonra avantajlı krediden faydalanın</p>
          </div>
        </div>
      </div>

      {/* Sık Sorulan Sorular */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Sıfır faiz kampanyasından kimler yararlanabilir?</summary>
            <p className="mt-2 text-gray-600">Bankamız müşterisi olan ve kredi değerlendirme kriterlerimize uyan tüm bireysel müşterilerimiz yararlanabilir.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Kampanya süresi dolmadan başvurmazsam ne olur?</summary>
            <p className="mt-2 text-gray-600">Kampanyalar belirtilen süre ile sınırlıdır. Süre sonunda normal kredi koşulları geçerli olacaktır.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Sıfır faiz kampanyası için ek ücret öder miyim?</summary>
            <p className="mt-2 text-gray-600">Hayır, kampanya kapsamında sunulan kredilerde dosya masrafı ve yönetim ücreti alınmamaktadır.</p>
          </details>
        </div>
      </div>
    </div>
  );
} 