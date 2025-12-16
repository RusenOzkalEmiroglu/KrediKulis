'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Search, Clock, Info } from 'lucide-react'

export default function HisseSenetleri() {
  const [aramaMetni, setAramaMetni] = useState('')

  const hisseler = [
    {
      kod: 'GARAN',
      ad: 'Garanti Bankası',
      fiyat: 42.50,
      degisim: 2.3,
      hacim: '1.2M',
      piyasaDegeri: '178.5B',
    },
    {
      kod: 'THYAO',
      ad: 'Türk Hava Yolları',
      fiyat: 245.80,
      degisim: -1.2,
      hacim: '2.1M',
      piyasaDegeri: '338.8B',
    },
    {
      kod: 'ASELS',
      ad: 'Aselsan',
      fiyat: 84.25,
      degisim: 0.8,
      hacim: '856K',
      piyasaDegeri: '95.2B',
    },
    {
      kod: 'EREGL',
      ad: 'Ereğli Demir Çelik',
      fiyat: 52.15,
      degisim: 1.5,
      hacim: '1.5M',
      piyasaDegeri: '182.5B',
    },
    {
      kod: 'AKBNK',
      ad: 'Akbank',
      fiyat: 38.90,
      degisim: -0.5,
      hacim: '980K',
      piyasaDegeri: '155.6B',
    },
    {
      kod: 'KCHOL',
      ad: 'Koç Holding',
      fiyat: 168.75,
      degisim: 0.9,
      hacim: '750K',
      piyasaDegeri: '428.3B',
    },
  ]

  const filtrelenmisHisseler = hisseler.filter(
    (hisse) =>
      hisse.kod.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      hisse.ad.toLowerCase().includes(aramaMetni.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Hisse Senetleri</h1>
        <p className="text-gray-600 mb-6">
          BIST 100 hisse senetlerinin güncel fiyatlarını takip edin, detaylı analizlere ulaşın.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            placeholder="Hisse senedi ara..."
            className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kod
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Şirket Adı
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fiyat (TL)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Değişim (%)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hacim
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Piyasa Değeri
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtrelenmisHisseler.map((hisse, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-bold text-primary">{hisse.kod}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {hisse.ad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {hisse.fiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className={`flex items-center justify-end ${hisse.degisim >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {hisse.degisim >= 0 ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : (
                      <TrendingDown size={16} className="mr-1" />
                    )}
                    {Math.abs(hisse.degisim)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {hisse.hacim}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {hisse.piyasaDegeri}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Hisse Senedi Yatırımı</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Uzun vadeli yatırım potansiyeli</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Temettü geliri imkanı</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Şirket ortaklığı hakkı</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Likit yatırım aracı</p>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Dikkat Edilmesi Gerekenler</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Risk ve getiri dengesi</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Portföy çeşitlendirmesi</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Piyasa ve şirket analizi</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Yatırım stratejisi belirleme</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <Clock size={14} className="inline mr-1" />
        <span>Veriler 15 dakika gecikmeli olarak güncellenmektedir</span>
      </div>
    </div>
  )
} 