'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, Info, Calculator } from 'lucide-react'

export default function DovizKurlari() {
  const [miktar, setMiktar] = useState('')
  const [secilenDoviz, setSecilenDoviz] = useState('USD')

  const dovizKurlari = [
    {
      kod: 'USD',
      ad: 'Amerikan Doları',
      alis: 31.25,
      satis: 31.35,
      degisim: 0.8,
    },
    {
      kod: 'EUR',
      ad: 'Euro',
      alis: 33.75,
      satis: 33.85,
      degisim: -0.3,
    },
    {
      kod: 'GBP',
      ad: 'İngiliz Sterlini',
      alis: 39.50,
      satis: 39.65,
      degisim: 0.5,
    },
    {
      kod: 'CHF',
      ad: 'İsviçre Frangı',
      alis: 34.80,
      satis: 34.95,
      degisim: 0.2,
    },
    {
      kod: 'JPY',
      ad: 'Japon Yeni',
      alis: 0.205,
      satis: 0.208,
      degisim: -0.4,
    },
    {
      kod: 'AUD',
      ad: 'Avustralya Doları',
      alis: 20.15,
      satis: 20.25,
      degisim: 0.6,
    },
  ]

  const hesaplaTL = (miktar: number, kur: number) => {
    return (miktar * kur).toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Döviz Kurları</h1>
        <p className="text-gray-600 mb-6">
          Güncel döviz kurlarını takip edin, alış ve satış fiyatlarını karşılaştırın.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Döviz Hesaplama</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Miktar
            </label>
            <input
              type="number"
              value={miktar}
              onChange={(e) => setMiktar(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Miktar giriniz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Döviz Cinsi
            </label>
            <select
              value={secilenDoviz}
              onChange={(e) => setSecilenDoviz(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {dovizKurlari.map((doviz) => (
                <option key={doviz.kod} value={doviz.kod}>
                  {doviz.ad} ({doviz.kod})
                </option>
              ))}
            </select>
          </div>

          {miktar && (
            <div className="flex items-center">
              <div>
                <div className="text-sm text-gray-500">Karşılığı (TL)</div>
                <div className="text-2xl font-bold text-primary">
                  {hesaplaTL(
                    Number(miktar),
                    dovizKurlari.find((d) => d.kod === secilenDoviz)?.satis || 0
                  )} TL
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dovizKurlari.map((doviz, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-lg">{doviz.kod}</h3>
                <p className="text-sm text-gray-500">{doviz.ad}</p>
              </div>
              <div className={`flex items-center ${doviz.degisim >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {doviz.degisim >= 0 ? (
                  <TrendingUp size={20} className="mr-1" />
                ) : (
                  <TrendingDown size={20} className="mr-1" />
                )}
                <span>%{Math.abs(doviz.degisim)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Alış</span>
                <span className="font-semibold">{doviz.alis.toLocaleString('tr-TR')} TL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Satış</span>
                <span className="font-semibold">{doviz.satis.toLocaleString('tr-TR')} TL</span>
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

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Döviz İşlemleri Hakkında</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Döviz alım-satım işlemlerinizi bankanızın internet şubesi veya mobil uygulaması üzerinden yapabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Döviz kurları piyasa koşullarına göre anlık olarak değişebilir</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Döviz hesabı açarak birikimlerinizi farklı para birimlerinde değerlendirebilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Uluslararası para transferleri için SWIFT sistemini kullanabilirsiniz</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 