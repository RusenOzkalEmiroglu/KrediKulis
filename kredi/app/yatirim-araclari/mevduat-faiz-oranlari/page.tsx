'use client'

import { useState } from 'react'
import { Calculator, Search, ChevronDown, Info, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MevduatFaizOranlari() {
  const [selectedVade, setSelectedVade] = useState('32')
  const [tutar, setTutar] = useState('')

  const bankalar = [
    {
      name: 'Yapı Kredi',
      logo: '/images/Yapi logo.png',
      faizOrani: 37.5,
      minTutar: 10000,
      maxTutar: 1000000,
    },
    {
      name: 'Garanti BBVA',
      logo: '/images/garanti logo.png',
      faizOrani: 37.25,
      minTutar: 5000,
      maxTutar: 2000000,
    },
    {
      name: 'İş Bankası',
      logo: '/images/is logo.png',
      faizOrani: 37.0,
      minTutar: 1000,
      maxTutar: 1500000,
    },
  ]

  const vadeler = [
    { label: '32 Gün', value: '32' },
    { label: '45 Gün', value: '45' },
    { label: '91 Gün', value: '91' },
    { label: '180 Gün', value: '180' },
    { label: '365 Gün', value: '365' },
  ]

  const handleTutarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    if (!value) {
        setTutar('');
        return;
    }
    const numValue = parseInt(value, 10);
    setTutar(numValue.toLocaleString('tr-TR'));
  };

  const hesaplaGetiri = (anapara: number, faizOrani: number, vadeGun: number) => {
    const yillikGetiri = anapara * (faizOrani / 100)
    const gunlukGetiri = yillikGetiri / 365
    const toplamGetiri = gunlukGetiri * vadeGun
    return Math.round(toplamGetiri)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Mevduat Faiz Oranları</h1>
        <p className="text-gray-600 mb-6">
          Bankaların güncel mevduat faiz oranlarını karşılaştırın, size en uygun vadeli mevduat hesabını seçin.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yatırmak İstediğiniz Tutar
            </label>
            <div className="relative">
              <input
                type="text"
                value={tutar}
                onChange={handleTutarChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Tutar giriniz"
              />
              <span className="absolute right-3 top-3 text-gray-500">TL</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vade Süresi
            </label>
            <select
              value={selectedVade}
              onChange={(e) => setSelectedVade(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {vadeler.map((vade) => (
                <option key={vade.value} value={vade.value}>
                  {vade.label}
                </option>
              ))}
            </select>
          </div>
        </div>
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
                    {banka.minTutar.toLocaleString('tr-TR')} TL - {banka.maxTutar.toLocaleString('tr-TR')} TL arası
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-primary">%{banka.faizOrani}</div>
                  <div className="text-sm text-gray-500">Yıllık Faiz Oranı</div>
                </div>

                {tutar && (
                  <div className="text-center md:text-right border-l pl-4">
                    <div className="text-2xl font-bold text-green-600">
                      {hesaplaGetiri(Number(tutar.replace(/\./g, '')), banka.faizOrani, Number(selectedVade)).toLocaleString('tr-TR')} TL
                    </div>
                    <div className="text-sm text-gray-500">Vade Sonu Getirisi</div>
                  </div>
                )}

                <Link
                  href="/mevduat-basvuru"
                  className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Hemen Başvur
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Vadeli Mevduat Avantajları</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Paranızı güvenli bir şekilde değerlendirebilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Vade sonunda garantili getiri elde edersiniz</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Farklı vade seçenekleriyle yatırımınızı planlayabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Devlet güvencesi ile paranız her zaman güvende</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 