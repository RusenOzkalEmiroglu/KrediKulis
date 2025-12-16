'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';

interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
  color?: string;  // Renk kodu (admin panelinden ayarlanabilir)
}

interface AnasayfaGuncelDovizProps {
  backgroundColorClass?: string;  // Arka plan rengi CSS sınıfı
  borderColorClass?: string;      // Kenarlık rengi CSS sınıfı
  titleColorClass?: string;       // Başlık rengi CSS sınıfı 
  valueColorClass?: string;       // Değer rengi CSS sınıfı
  updateInterval?: number;        // Güncelleme aralığı (milisaniye cinsinden)
  displayCount?: number;          // Gösterilecek döviz sayısı
  autoSlide?: boolean;            // Otomatik kaydırma
  slideInterval?: number;         // Kaydırma aralığı (milisaniye cinsinden)
  showTitle?: boolean;            // Başlık gösterimi
  title?: string;                 // Başlık metni
  enabledCurrencies?: string[];   // Gösterilecek para birimleri listesi
}

// Döviz isimlerini Türkçe olarak tanımla
const currencyNames: { [key: string]: string } = {
  'USD': 'AMERİKAN DOLARI',
  'EUR': 'EURO',
  'GBP': 'İNGİLİZ STERLİNİ',
  'CHF': 'İSVİÇRE FRANGI',
  'KWD': 'KUVEYT DİNARI',
  'SAR': 'SUUDİ RİYALİ',
  'JPY': 'JAPON YENİ',
  'AUD': 'AVUSTRALYA DOLARI',
  'CAD': 'KANADA DOLARI',
  'SEK': 'İSVEÇ KRONU',
  'NOK': 'NORVEÇ KRONU',
  'DKK': 'DANİMARKA KRONU',
  'BGN': 'BULGAR LEVASI',
  'RON': 'RUMEN LEYİ',
  'IRR': 'İRAN RİYALİ',
  'CNY': 'ÇİN YUANI',
  'PKR': 'PAKİSTAN RUPİSİ',
  'QAR': 'KATAR RİYALİ',
  'KRW': 'GÜNEY KORE WONU',
  'AZN': 'AZERBAYCAN MANATI'
};

// Geçici olarak kullanılacak varsayılan değerler (gerçek değerler API'dan çekilecek)
const fallbackRates: ExchangeRate[] = [
  { code: 'USD', name: 'AMERİKAN DOLARI', rate: 32.05, color: '#e63946' },
  { code: 'EUR', name: 'EURO', rate: 34.33, color: '#457b9d' },
  { code: 'GBP', name: 'İNGİLİZ STERLİNİ', rate: 40.20, color: '#1d3557' },
  { code: 'CHF', name: 'İSVİÇRE FRANGI', rate: 34.72, color: '#a8dadc' },
  { code: 'KWD', name: 'KUVEYT DİNARI', rate: 103.84, color: '#e63946' },
  { code: 'SAR', name: 'SUUDİ RİYALİ', rate: 8.55, color: '#e76f51' },
  { code: 'JPY', name: 'JAPON YENİ', rate: 0.21, color: '#e9c46a' },
  { code: 'AUD', name: 'AVUSTRALYA DOLARI', rate: 20.98, color: '#2a9d8f' },
  { code: 'CAD', name: 'KANADA DOLARI', rate: 23.33, color: '#264653' },
  { code: 'SEK', name: 'İSVEÇ KRONU', rate: 2.99, color: '#f4a261' },
  { code: 'NOK', name: 'NORVEÇ KRONU', rate: 2.94, color: '#219ebc' },
  { code: 'DKK', name: 'DANİMARKA KRONU', rate: 4.61, color: '#023047' },
  { code: 'BGN', name: 'BULGAR LEVASI', rate: 17.58, color: '#8ecae6' },
  { code: 'RON', name: 'RUMEN LEYİ', rate: 6.96, color: '#fb8500' },
  { code: 'IRR', name: 'İRAN RİYALİ', rate: 0.00076, color: '#ccd5ae' },
  { code: 'CNY', name: 'ÇİN YUANI', rate: 4.43, color: '#ffb703' },
  { code: 'PKR', name: 'PAKİSTAN RUPİSİ', rate: 0.115, color: '#606c38' },
  { code: 'QAR', name: 'KATAR RİYALİ', rate: 8.79, color: '#bc6c25' },
  { code: 'KRW', name: 'GÜNEY KORE WONU', rate: 0.0234, color: '#dda15e' },
  { code: 'AZN', name: 'AZERBAYCAN MANATI', rate: 18.86, color: '#606c38' }
];

export default function AnasayfaGuncelDoviz({
  backgroundColorClass = 'bg-orange-50',
  borderColorClass = 'border-gray-200',
  titleColorClass = 'text-orange-500',
  valueColorClass = 'text-gray-700',
  updateInterval = 60000,
  displayCount = 5,
  autoSlide = true,
  slideInterval = 5000,
  showTitle = false,
  title = 'Güncel Döviz Kurları',
  enabledCurrencies = [
    'USD', 'EUR', 'GBP', 'CHF', 'KWD',
    'SAR', 'JPY', 'AUD', 'CAD', 'SEK',
    'NOK', 'DKK', 'BGN', 'RON', 'CNY'
  ]
}: AnasayfaGuncelDovizProps) {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRatesFromTCMB = async () => {
    try {
      const response = await axios.get('/api/tcmb-proxy');
      parseString(response.data, (err: any, result: any) => {
        if (err) {
          console.error('XML parsing error:', err);
          return;
        }

        const currencies = result.Tarih_Date.Currency;
        const parsedRates: ExchangeRate[] = currencies
          .filter((currency: any) => enabledCurrencies.includes(currency.$.Kod))
          .map((currency: any) => ({
            code: currency.$.Kod,
            name: currencyNames[currency.$.Kod] || currency.Isim[0],
            rate: parseFloat(currency.ForexSelling[0].replace(',', '.'))
          }));

        const orderedRates = enabledCurrencies
          .map(code => parsedRates.find(rate => rate.code === code))
          .filter((rate): rate is ExchangeRate => rate !== undefined);

        setRates(orderedRates);
        setLoading(false);
      });
    } catch (error) {
      console.error('Error fetching TCMB rates:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatesFromTCMB();
    const interval = setInterval(fetchRatesFromTCMB, updateInterval);
    return () => clearInterval(interval);
  }, [updateInterval]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!autoSlide || rates.length <= displayCount) return;

    intervalRef.current = setInterval(() => {
      setCurrentPage(prevPage => {
        const totalPages = Math.ceil(rates.length / displayCount);
        return (prevPage + 1) % totalPages;
      });
    }, slideInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoSlide, rates.length, displayCount, slideInterval]);

  const displayedRates = rates.slice(
    currentPage * displayCount,
    (currentPage + 1) * displayCount
  );

  if (loading && rates.length === 0) {
    return (
      <div className={`w-full ${backgroundColorClass} py-2 border-t border-b ${borderColorClass}`}>
        <div className="container mx-auto px-4 text-center text-gray-500">
          Döviz kurları yükleniyor...
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${backgroundColorClass} py-2 border-t border-b ${borderColorClass}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <h2 className={`text-lg font-semibold mb-2 ${titleColorClass}`}>{title}</h2>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {displayedRates.map((rate: ExchangeRate) => (
            <div
              key={rate.code}
              className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-1 mr-2">
                <div className="font-semibold text-sm text-gray-800">{rate.code}</div>
                <div className="text-xs text-gray-500 truncate">{rate.name}</div>
              </div>
              <div className={`text-right ${valueColorClass}`}>
                <div className="font-mono font-medium text-sm">
                  {rate.rate.toFixed(4)} ₺
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
