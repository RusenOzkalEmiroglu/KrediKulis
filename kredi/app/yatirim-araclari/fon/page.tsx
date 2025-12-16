'use client'

import { useState } from 'react'
import { Search, TrendingUp, TrendingDown, Clock, Info } from 'lucide-react'

export default function YatirimFonlari() {
  const [aramaMetni, setAramaMetni] = useState('')
  const [secilenKategori, setSecilenKategori] = useState('tumu')

  const fonKategorileri = [
    { id: 'tumu', ad: 'Tümü' },
    { id: 'hisse', ad: 'Hisse Senedi Fonları' },
    { id: 'borclanma', ad: 'Borçlanma Araçları Fonları' },
    { id: 'karma', ad: 'Karma Fonlar' },
    { id: 'katilim', ad: 'Katılım Fonları' },
    { id: 'para', ad: 'Para Piyasası Fonları' },
  ]

  const fonlar = [
    {
      kod: 'TGF',
      ad: 'Garanti Portföy Hisse Senedi Fonu',
      kategori: 'hisse',
      fiyat: 12.85,
      degisim: 1.2,
      yillikGetiri: 45.8,
      fonBuyuklugu: '856M',
    },
    {
      kod: 'TIB',
      ad: 'İş Portföy Birinci Borçlanma Araçları Fonu',
      kategori: 'borclanma',
      fiyat: 0.92,
      degisim: 0.3,
      yillikGetiri: 38.5,
      fonBuyuklugu: '1.2B',
    },
    {
      kod: 'TYK',
      ad: 'Yapı Kredi Portföy Karma Fon',
      kategori: 'karma',
      fiyat: 2.45,
      degisim: -0.5,
      yillikGetiri: 42.3,
      fonBuyuklugu: '450M',
    },
    {
      kod: 'TZK',
      ad: 'Ziraat Portföy Katılım Fonu',
      kategori: 'katilim',
      fiyat: 3.18,
      degisim: 0.8,
      yillikGetiri: 35.6,
      fonBuyuklugu: '325M',
    },
    {
      kod: 'TAP',
      ad: 'Ak Portföy Para Piyasası Fonu',
      kategori: 'para',
      fiyat: 1.05,
      degisim: 0.1,
      yillikGetiri: 32.8,
      fonBuyuklugu: '2.1B',
    },
  ]

  const filtrelenmiFonlar = fonlar.filter(
    (fon) =>
      (secilenKategori === 'tumu' || fon.kategori === secilenKategori) &&
      (fon.kod.toLowerCase().includes(aramaMetni.toLowerCase()) ||
        fon.ad.toLowerCase().includes(aramaMetni.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Yatırım Fonları</h1>
        <p className="text-gray-600 mb-6">
          TEFAS'ta işlem gören yatırım fonlarını inceleyin, performans karşılaştırması yapın.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              placeholder="Fon ara..."
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <select
              value={secilenKategori}
              onChange={(e) => setSecilenKategori(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {fonKategorileri.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.ad}
                </option>
              ))}
            </select>
          </div>
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
                Fon Adı
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fiyat (TL)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Günlük Değişim
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yıllık Getiri
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fon Büyüklüğü
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtrelenmiFonlar.map((fon, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-bold text-primary">{fon.kod}</span>
                </td>
                <td className="px-6 py-4">
                  {fon.ad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {fon.fiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className={`flex items-center justify-end ${fon.degisim >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {fon.degisim >= 0 ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : (
                      <TrendingDown size={16} className="mr-1" />
                    )}
                    %{Math.abs(fon.degisim)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-green-600">
                  %{fon.yillikGetiri}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {fon.fonBuyuklugu}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Yatırım Fonu Avantajları</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Profesyonel portföy yönetimi</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Düşük miktarlarla yatırım imkanı</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Otomatik çeşitlendirme</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Yüksek likidite</p>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Fon Seçerken Dikkat Edilmesi Gerekenler</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Risk ve getiri beklentiniz</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Yatırım vadesi</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Fon yönetim ücreti</p>
            </li>
            <li className="flex items-start">
              <Info className="mr-2 text-primary mt-1" size={16} />
              <p>Geçmiş performans analizi</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <Clock size={14} className="inline mr-1" />
        <span>Fon fiyatları günlük olarak güncellenmektedir</span>
      </div>
    </div>
  )
} 