'use client'

import { useState } from 'react'
import { Calculator, Info, ArrowRight, Gift, Wallet, CreditCard } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function EmekliBankaciligi() {
  const bankalar = [
    {
      name: 'Ziraat Bankası',
      logo: '/images/ziraat logo.jpg',
      promosyonTutari: 12000,
      ekAvantajlar: [
        'Ücretsiz ATM kullanımı',
        'İndirimli EFT/Havale',
        'Özel kredi faiz oranları',
      ],
      minEmekliMaasi: 7500,
    },
    {
      name: 'Yapı Kredi',
      logo: '/images/Yapi logo.png',
      promosyonTutari: 11500,
      ekAvantajlar: [
        'Ücretsiz hesap işletim ücreti',
        'İndirimli kredi kartı aidatı',
        'Özel mevduat faiz oranları',
      ],
      minEmekliMaasi: 7500,
    },
    {
      name: 'İş Bankası',
      logo: '/images/is logo.png',
      promosyonTutari: 11000,
      ekAvantajlar: [
        'Özel sigorta indirimleri',
        'Ücretsiz kiralık kasa',
        'İndirimli kredi oranları',
      ],
      minEmekliMaasi: 7500,
    },
    {
      name: 'Garanti BBVA',
      logo: '/images/garanti logo.png',
      promosyonTutari: 11000,
      ekAvantajlar: [
        'Özel sağlık sigortası indirimi',
        'Ücretsiz havale/EFT',
        'İndirimli kredi kartı',
      ],
      minEmekliMaasi: 7500,
    },
  ]

  const emekliHizmetleri = [
    {
      title: 'Emekli Maaş Hizmeti',
      description: 'Emekli maaşınızı düzenli olarak ve güvenle alın',
      icon: <Wallet className="text-primary" size={24} />,
    },
    {
      title: 'Promosyon Ödemeleri',
      description: 'Cazip promosyon ödemelerinden faydalanın',
      icon: <Gift className="text-primary" size={24} />,
    },
    {
      title: 'Özel Bankacılık Hizmetleri',
      description: 'Size özel ayrıcalıklı bankacılık hizmetleri',
      icon: <CreditCard className="text-primary" size={24} />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Emekli Bankacılığı</h1>
        <p className="text-gray-600 mb-6">
          Emeklilere özel bankacılık hizmetlerini karşılaştırın, size en uygun promosyon ve avantajları değerlendirin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {emekliHizmetleri.map((hizmet, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              {hizmet.icon}
              <h3 className="font-bold ml-3">{hizmet.title}</h3>
            </div>
            <p className="text-gray-600">{hizmet.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {bankalar.map((banka, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Image
                  src={banka.logo}
                  alt={banka.name}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="ml-4">
                  <h3 className="font-bold">{banka.name}</h3>
                  <p className="text-sm text-gray-500">
                    Min. {banka.minEmekliMaasi.toLocaleString('tr-TR')} TL emekli maaşı
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-primary">
                    {banka.promosyonTutari.toLocaleString('tr-TR')} TL
                  </div>
                  <div className="text-sm text-gray-500">Promosyon Tutarı</div>
                </div>

                <Link
                  href="/emekli-basvuru"
                  className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Hemen Başvur
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold mb-2">Ek Avantajlar</h4>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {banka.ekAvantajlar.map((avantaj, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Info className="mr-2 text-primary" size={16} />
                    {avantaj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Emekli Bankacılığı Avantajları</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Yüksek promosyon ödemeleri ve özel kampanyalar</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>İndirimli bankacılık işlemleri ve ücretsiz hizmetler</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Özel kredi ve kredi kartı faiz oranları</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Şubelerde öncelikli hizmet ve özel bankacılık danışmanlığı</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 