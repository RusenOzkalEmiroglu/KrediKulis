'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Gift, CreditCard, Check, ArrowRight } from 'lucide-react'

export default function PuanVerenKartlar() {
  const puanKartlari = [
    {
      banka: 'Yapı Kredi',
      kartAdi: 'World Gold',
      puanOzellikleri: [
        'Her 100 TL\'ye 5 World Puan',
        'Seçili sektörlerde 2 kata kadar puan',
        'Hoşgeldin 10.000 puan',
      ],
      resim: '/images/Yapi logo.png'
    },
    {
      banka: 'Garanti BBVA',
      kartAdi: 'Bonus Platinum',
      puanOzellikleri: [
        'Her harcamada %1 Bonus',
        'Seçili iş yerlerinde %5\'e varan Bonus',
        'Yıllık 20.000 Bonus fırsatı',
      ],
      resim: '/images/garanti logo.png'
    },
    {
      banka: 'İş Bankası',
      kartAdi: 'Maximum Premium',
      puanOzellikleri: [
        'Her ödemede MaxiPuan',
        'Ek kart ücretsiz',
        'Özel kampanyalarda 2 kat puan',
      ],
      resim: '/images/is logo.png'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Puan Veren Kredi Kartları</h1>
        <p className="text-gray-600 mb-6">
          Alışverişlerinizde puan kazandıran kredi kartlarını inceleyin.
          Size en uygun puan programını seçin, harcamalarınızdan maksimum fayda sağlayın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puanKartlari.map((kart, index) => (
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
              <div className="flex items-center text-orange-600 mb-2">
                <Gift className="mr-2" size={20} />
                <span className="font-semibold">Puan Avantajları</span>
              </div>
              <ul className="space-y-2">
                {kart.puanOzellikleri.map((ozellik, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Check className="mr-2 text-orange-500" size={16} />
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
        <h2 className="text-xl font-bold mb-4">Puan Programı Avantajları</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Check className="mr-2 text-orange-500 mt-1" size={16} />
            <p>Tüm alışverişlerinizde puan kazanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-orange-500 mt-1" size={16} />
            <p>Seçili sektörlerde ekstra puan fırsatlarından yararlanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-orange-500 mt-1" size={16} />
            <p>Biriken puanlarınızı alışverişlerinizde nakit gibi kullanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-orange-500 mt-1" size={16} />
            <p>Özel gün kampanyalarında ek puan avantajları kazanabilirsiniz</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 