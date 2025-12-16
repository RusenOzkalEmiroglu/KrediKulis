'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CreditCard, Check, ArrowRight } from 'lucide-react'

export default function AidatsizKartlar() {
  const aidatsizKartlar = [
    {
      banka: 'Yapı Kredi',
      kartAdi: 'World Eko',
      yillikUcret: 0,
      avantajlar: [
        'Yıllık kart ücreti yok',
        'World Puan kazanma',
        'Taksit imkanları',
      ],
      resim: '/images/Yapi logo.png'
    },
    {
      banka: 'Garanti BBVA',
      kartAdi: 'Bonus Flexi',
      yillikUcret: 0,
      avantajlar: [
        'Ücretsiz',
        'Bonus kazanma',
        '3 taksit fırsatı',
      ],
      resim: '/images/garanti logo.png'
    },
    {
      banka: 'İş Bankası',
      kartAdi: 'Maximum Free',
      yillikUcret: 0,
      avantajlar: [
        'Ücretsiz kart',
        'Maximum Puan',
        'Taksit avantajları',
      ],
      resim: '/images/is logo.png'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Aidatsız Kredi Kartları</h1>
        <p className="text-gray-600 mb-6">
          Yıllık kart ücreti ödemeden kullanabileceğiniz en avantajlı kredi kartlarını sizin için listeledik.
          Kartları karşılaştırın, başvurunuzu hemen yapın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aidatsizKartlar.map((kart, index) => (
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
              <div className="flex items-center text-green-600 mb-2">
                <CreditCard className="mr-2" size={20} />
                <span className="font-semibold">Yıllık Ücret: {kart.yillikUcret} TL</span>
              </div>
              <ul className="space-y-2">
                {kart.avantajlar.map((avantaj, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Check className="mr-2 text-green-500" size={16} />
                    {avantaj}
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
        <h2 className="text-xl font-bold mb-4">Aidatsız Kredi Kartı Avantajları</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Check className="mr-2 text-green-500 mt-1" size={16} />
            <p>Yıllık kart ücreti ödemeden kredi kartı kullanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-green-500 mt-1" size={16} />
            <p>Taksit ve puan kazanma gibi temel kredi kartı özelliklerinden faydalanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-green-500 mt-1" size={16} />
            <p>Bütçenizi yormadan kredi kartı kullanmanın avantajlarından yararlanabilirsiniz</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 