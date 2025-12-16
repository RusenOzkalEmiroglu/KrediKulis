'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, Info, ChevronDown } from 'lucide-react'

interface EndeksDetay {
  aciklama: string;
  ozellikler: string[];
}

export default function Endeksler() {
  const [secilenEndeks, setSecilenEndeks] = useState('BIST 100')

  const endeksler = [
    {
      ad: 'BIST 100',
      deger: 9245.82,
      degisim: 1.8,
      hacim: '85.2B',
      yillikDegisim: 42.5,
    },
    {
      ad: 'BIST 30',
      deger: 10125.45,
      degisim: 2.1,
      hacim: '45.8B',
      yillikDegisim: 38.2,
    },
    {
      ad: 'BIST Banka',
      deger: 4582.30,
      degisim: -0.5,
      hacim: '12.5B',
      yillikDegisim: 35.8,
    },
    {
      ad: 'BIST Sınai',
      deger: 7845.65,
      degisim: 1.2,
      hacim: '18.3B',
      yillikDegisim: 45.2,
    },
    {
      ad: 'BIST Mali',
      deger: 5632.90,
      degisim: 0.8,
      hacim: '25.6B',
      yillikDegisim: 40.1,
    },
  ]

  const endeksDetaylari: Record<string, EndeksDetay> = {
    'BIST 100': {
      aciklama: 'Borsa İstanbul\'da işlem gören en yüksek piyasa değerine sahip 100 şirketin performansını ölçer.',
      ozellikler: [
        'Türkiye\'nin gösterge endeksi',
        'Geniş piyasa temsili',
        'Yüksek likidite',
        'Uluslararası yatırımcı takibi',
      ],
    },
    'BIST 30': {
      aciklama: 'Borsa İstanbul\'da işlem gören en yüksek piyasa değerine sahip 30 şirketin performansını ölçer.',
      ozellikler: [
        'Büyük şirketlerin performansı',
        'Vadeli işlem kontratları',
        'Yüksek işlem hacmi',
        'Kurumsal yatırımcı odağı',
      ],
    },
    'BIST Banka': {
      aciklama: 'Borsa İstanbul\'da işlem gören bankaların hisse senedi performansını ölçer.',
      ozellikler: [
        'Finansal sektör göstergesi',
        'Ekonomik büyüme hassasiyeti',
        'Faiz oranı duyarlılığı',
        'Sektörel analiz imkanı',
      ],
    },
    'BIST Sınai': {
      aciklama: 'Borsa İstanbul\'da işlem gören sanayi şirketlerinin performansını ölçer.',
      ozellikler: [
        'Üretim sektörü performansı',
        'İhracat potansiyeli',
        'Ekonomik aktivite göstergesi',
        'Sektörel çeşitlilik',
      ],
    },
    'BIST Mali': {
      aciklama: 'Borsa İstanbul\'da işlem gören mali sektör şirketlerinin performansını ölçer.',
      ozellikler: [
        'Finansal sektör geneli',
        'Holding şirketleri',
        'Sigorta şirketleri',
        'Finansal hizmetler',
      ],
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Borsa Endeksleri</h1>
        <p className="text-gray-600 mb-6">
          Borsa İstanbul endekslerinin anlık değerlerini takip edin, detaylı analizlere ulaşın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {endeksler.map((endeks, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
              secilenEndeks === endeks.ad ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSecilenEndeks(endeks.ad)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{endeks.ad}</h3>
              <div className={`flex items-center ${endeks.degisim >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {endeks.degisim >= 0 ? (
                  <TrendingUp size={20} className="mr-1" />
                ) : (
                  <TrendingDown size={20} className="mr-1" />
                )}
                <span>%{Math.abs(endeks.degisim)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Değer</span>
                <span className="font-semibold">{endeks.deger.toLocaleString('tr-TR')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">İşlem Hacmi</span>
                <span className="font-semibold">{endeks.hacim} TL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Yıllık Değişim</span>
                <span className="font-semibold text-green-600">%{endeks.yillikDegisim}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {secilenEndeks && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{secilenEndeks} Detayları</h2>
          <p className="text-gray-600 mb-6">
            {endeksDetaylari[secilenEndeks].aciklama}
          </p>

          <h3 className="font-semibold mb-3">Endeks Özellikleri</h3>
          <ul className="space-y-2">
            {endeksDetaylari[secilenEndeks].ozellikler.map((ozellik, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <Info className="mr-2 text-primary" size={16} />
                {ozellik}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Endeks Yatırımı Hakkında</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Endeks fonları ile kolayca yatırım yapabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Vadeli işlem kontratları ile endeks üzerinden işlem yapabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Borsa yatırım fonları (ETF) ile endeksleri takip edebilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Info className="mr-2 text-primary mt-1" size={16} />
            <p>Endeksler piyasa genelinin performansını ölçmek için kullanılır</p>
          </li>
        </ul>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <Clock size={14} className="inline mr-1" />
        <span>Veriler 15 dakika gecikmeli olarak güncellenmektedir</span>
      </div>
    </div>
  )
} 