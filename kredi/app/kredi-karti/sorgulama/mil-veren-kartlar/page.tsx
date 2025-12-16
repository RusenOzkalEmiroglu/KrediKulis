'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plane, CreditCard, Check, ArrowRight } from 'lucide-react'

export default function MilVerenKartlar() {
  const milKartlari = [
    {
      banka: 'Garanti BBVA',
      kartAdi: 'Miles&Smiles',
      yillikUcret: 195,
      milOzellikleri: [
        'Her 1 TL harcamaya 1 Mil',
        'Yurtdışı alışverişlerde 2 Mil',
        'Hoşgeldin 5000 Mil',
      ],
      resim: '/images/garanti logo.png'
    },
    {
      banka: 'Yapı Kredi',
      kartAdi: 'World Elite',
      yillikUcret: 250,
      milOzellikleri: [
        'Her harcamada 2 Mil puan',
        'Havalimanı lounge erişimi',
        'Seyahat sigortası',
      ],
      resim: '/images/Yapi logo.png'
    },
    {
      banka: 'İş Bankası',
      kartAdi: 'Maximum Travel',
      yillikUcret: 180,
      milOzellikleri: [
        'Seyahat harcamalarında 3 kat mil',
        'Ücretsiz havalimanı transferi',
        'Priority Pass üyeliği',
      ],
      resim: '/images/is logo.png'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Mil Veren Kredi Kartları</h1>
        <p className="text-gray-600 mb-6">
          Seyahatlerinizde kullanabileceğiniz mil puanlar kazandıran kredi kartlarını inceleyin.
          Size en uygun mil programını seçin, seyahatlerinizi mil puanlarla planlayın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {milKartlari.map((kart, index) => (
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
              <div className="flex items-center text-blue-600 mb-2">
                <Plane className="mr-2" size={20} />
                <span className="font-semibold">Yıllık Ücret: {kart.yillikUcret} TL</span>
              </div>
              <ul className="space-y-2">
                {kart.milOzellikleri.map((ozellik, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Check className="mr-2 text-blue-500" size={16} />
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
        <h2 className="text-xl font-bold mb-4">Mil Programı Avantajları</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Check className="mr-2 text-blue-500 mt-1" size={16} />
            <p>Yaptığınız harcamalarla ücretsiz uçak bileti kazanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-blue-500 mt-1" size={16} />
            <p>Havalimanı lounge erişimi ve özel transfer hizmetlerinden faydalanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-blue-500 mt-1" size={16} />
            <p>Seyahat ve bagaj sigortası gibi ek avantajlardan yararlanabilirsiniz</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 