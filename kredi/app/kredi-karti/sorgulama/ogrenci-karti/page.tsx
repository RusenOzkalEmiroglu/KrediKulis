'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap, CreditCard, Check, ArrowRight } from 'lucide-react'

export default function OgrenciKartlari() {
  const ogrenciKartlari = [
    {
      banka: 'Yapı Kredi',
      kartAdi: 'Play Card',
      yillikUcret: 0,
      ozellikler: [
        'Ücretsiz kart',
        'Sinema indirimi',
        'Yemek indirimleri',
      ],
      resim: '/images/Yapi logo.png'
    },
    {
      banka: 'Garanti BBVA',
      kartAdi: 'Uni Card',
      yillikUcret: 0,
      ozellikler: [
        'Kart ücreti yok',
        'Kitap alışverişlerinde indirim',
        'Online alışveriş avantajları',
      ],
      resim: '/images/garanti logo.png'
    },
    {
      banka: 'İş Bankası',
      kartAdi: 'Maximum Student',
      yillikUcret: 0,
      ozellikler: [
        'Ücretsiz öğrenci kartı',
        'Kırtasiye indirimleri',
        'Ulaşım avantajları',
      ],
      resim: '/images/is logo.png'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Öğrenci Kredi Kartları</h1>
        <p className="text-gray-600 mb-6">
          Öğrencilere özel avantajlar sunan kredi kartlarını inceleyin.
          Eğitim hayatınızı kolaylaştıracak fırsatlardan yararlanın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ogrenciKartlari.map((kart, index) => (
          <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Image
                src={kart.resim}
                alt={kart.banka}
                width={60}
                height={60}
                className="rounded"
              />
              <div className="ml-4">
                <h3 className="font-bold">{kart.banka}</h3>
                <p className="text-primary">{kart.kartAdi}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-purple-600 mb-2">
                <GraduationCap className="mr-2" size={20} />
                <span className="font-semibold">Yıllık Ücret: {kart.yillikUcret} TL</span>
              </div>
              <ul className="space-y-2">
                {kart.ozellikler.map((ozellik, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Check className="mr-2 text-purple-500" size={16} />
                    {ozellik}
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              href="/kredi-karti-basvuru"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Hemen Başvur
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Öğrenci Kredi Kartı Avantajları</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Check className="mr-2 text-purple-500 mt-1" size={16} />
            <p>Kart aidatı ödemeden kredi kartı kullanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-purple-500 mt-1" size={16} />
            <p>Eğitim ve kırtasiye harcamalarında özel indirimler kazanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-purple-500 mt-1" size={16} />
            <p>Sinema, yemek ve ulaşım gibi öğrenci ihtiyaçlarında avantajlar elde edebilirsiniz</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 