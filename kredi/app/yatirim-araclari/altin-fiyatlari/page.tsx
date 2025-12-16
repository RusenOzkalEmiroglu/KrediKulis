'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, Info, ArrowRight } from 'lucide-react'

export default function AltinFiyatlari() {
  const altinTurleri = [
    {
      tur: 'Gram Altın',
      alis: 2450.25,
      satis: 2452.50,
      degisim: 1.2,
      birim: 'TL',
    },
    {
      tur: 'Çeyrek Altın',
      alis: 4050.00,
      satis: 4100.75,
      degisim: -0.5,
      birim: 'TL',
    },
    {
      tur: 'Yarım Altın',
      alis: 8100.50,
      satis: 8200.25,
      degisim: 0.8,
      birim: 'TL',
    },
    {
      tur: 'Tam Altın',
      alis: 16200.75,
      satis: 16400.50,
      degisim: 1.1,
      birim: 'TL',
    },
    {
      tur: 'Cumhuriyet Altını',
      alis: 16500.00,
      satis: 16700.25,
      degisim: 0.9,
      birim: 'TL',
    },
    {
      tur: 'ONS',
      alis: 2350.75,
      satis: 2352.50,
      degisim: -0.3,
      birim: 'USD',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Altın Fiyatları</h1>
        <p className="text-gray-600 mb-6">
          Güncel altın fiyatlarını takip edin, altın türlerinin alış ve satış fiyatlarını karşılaştırın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {altinTurleri.map((altin, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{altin.tur}</h3>
              <div className={`flex items-center ${altin.degisim >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {altin.degisim >= 0 ? (
                  <TrendingUp size={20} className="mr-1" />
                ) : (
                  <TrendingDown size={20} className="mr-1" />
                )}
                <span>%{Math.abs(altin.degisim)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Alış</span>
                <span className="font-semibold">
                  {altin.alis.toLocaleString('tr-TR')} {altin.birim}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Satış</span>
                <span className="font-semibold">
                  {altin.satis.toLocaleString('tr-TR')} {altin.birim}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock size={14} className="mr-1" />
                <span>Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Altın Yatırımı Avantajları</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Uzun vadeli güvenli yatırım aracı</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Enflasyona karşı koruma sağlar</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Küresel ekonomik krizlere karşı dayanıklıdır</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>İstenildiğinde nakde çevrilebilir</p>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Altın Alım-Satım İşlemleri</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Fiziki altın alım-satımı kuyumculardan yapılabilir</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Dijital altın işlemleri bankalar üzerinden gerçekleştirilebilir</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Altın hesabı açarak birikimlerinizi değerlendirebilirsiniz</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 