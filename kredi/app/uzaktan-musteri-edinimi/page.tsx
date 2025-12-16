'use client'

import { useState } from 'react'
import { UserPlus, Shield, Clock, Smartphone, Info, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function UzaktanMusteriEdinimi() {
  const bankalar = [
    {
      name: 'Garanti BBVA',
      logo: '/images/garanti logo.png',
      gerekliEvraklar: [
        'Nüfus cüzdanı/kimlik kartı',
        'Selfie fotoğrafı',
        'İmza beyanı',
      ],
      surec: '5-10 dakika',
      ozellikler: [
        'Anında hesap açılışı',
        'Ücretsiz EFT/Havale',
        'Mobil bankacılık',
      ],
    },
    {
      name: 'Yapı Kredi',
      logo: '/images/Yapi logo.png',
      gerekliEvraklar: [
        'Nüfus cüzdanı/kimlik kartı',
        'Selfie video',
        'İmza örneği',
      ],
      surec: '5-15 dakika',
      ozellikler: [
        'Hızlı hesap açılışı',
        'İlk yıl ücretsiz kart',
        'World üyeliği',
      ],
    },
    {
      name: 'İş Bankası',
      logo: '/images/is logo.png',
      gerekliEvraklar: [
        'Nüfus cüzdanı/kimlik kartı',
        'Selfie fotoğrafı',
        'Adres belgesi',
      ],
      surec: '10-15 dakika',
      ozellikler: [
        'Maximum kart fırsatı',
        'Dijital bankacılık',
        'Geniş ATM ağı',
      ],
    },
    {
      name: 'Ziraat Bankası',
      logo: '/images/ziraat logo.jpg',
      gerekliEvraklar: [
        'Nüfus cüzdanı/kimlik kartı',
        'Selfie video',
        'İkametgah',
      ],
      surec: '5-10 dakika',
      ozellikler: [
        'Bankkart özelliği',
        'İnternet bankacılığı',
        'Yaygın şube ağı',
      ],
    },
  ]

  const avantajlar = [
    {
      title: 'Hızlı Başvuru',
      description: 'Şubeye gitmeden dakikalar içinde müşteri olun',
      icon: <Clock className="text-primary" size={24} />,
    },
    {
      title: 'Güvenli İşlem',
      description: 'En yüksek güvenlik standartlarıyla güvende olun',
      icon: <Shield className="text-primary" size={24} />,
    },
    {
      title: 'Mobil Deneyim',
      description: 'Tüm bankacılık işlemlerini mobil uygulama üzerinden yapın',
      icon: <Smartphone className="text-primary" size={24} />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Bankaların Müşterisi Olun</h1>
        <p className="text-gray-600 mb-6">
          Şubeye gitmeden, online olarak dakikalar içinde istediğiniz bankanın müşterisi olun.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {avantajlar.map((avantaj, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              {avantaj.icon}
              <h3 className="font-bold ml-3">{avantaj.title}</h3>
            </div>
            <p className="text-gray-600">{avantaj.description}</p>
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
                    Ortalama işlem süresi: {banka.surec}
                  </p>
                </div>
              </div>

              <Link
                href="/musteri-ol-basvuru"
                className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Müşteri Ol
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Gerekli Evraklar</h4>
                <ul className="space-y-2">
                  {banka.gerekliEvraklar.map((evrak, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Info className="mr-2 text-primary" size={16} />
                      {evrak}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Özellikler ve Avantajlar</h4>
                <ul className="space-y-2">
                  {banka.ozellikler.map((ozellik, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Info className="mr-2 text-primary" size={16} />
                      {ozellik}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Uzaktan Müşteri Olma Süreci</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Kimlik doğrulama için gerekli belgeleri hazırlayın</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Bankanın mobil uygulamasını indirin</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Kimlik doğrulama adımlarını tamamlayın</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Sözleşmeleri onaylayın ve hesabınızı kullanmaya başlayın</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 