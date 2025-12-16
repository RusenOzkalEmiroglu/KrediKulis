'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';

interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
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

// Geçici olarak kullanılacak varsayılan değerler
const fallbackRates: ExchangeRate[] = [
  { code: 'USD', name: 'AMERİKAN DOLARI', rate: 10.10 },
  { code: 'EUR', name: 'EURO', rate: 25.37 },
  { code: 'GBP', name: 'İNGİLİZ STERLİNİ', rate: 20.99 },
  { code: 'CHF', name: 'İSVİÇRE FRANGI', rate: 8.25 },
  { code: 'KWD', name: 'KUVEYT DİNARI', rate: 0.45 },
  { code: 'SAR', name: 'SUUDİ RİYALİ', rate: 7.15 },
  { code: 'JPY', name: 'JAPON YENİ', rate: 0.18 },
  { code: 'AUD', name: 'AVUSTRALYA DOLARI', rate: 17.82 },
  { code: 'CAD', name: 'KANADA DOLARI', rate: 19.56 },
  { code: 'SEK', name: 'İSVEÇ KRONU', rate: 2.47 },
  { code: 'NOK', name: 'NORVEÇ KRONU', rate: 2.35 },
  { code: 'DKK', name: 'DANİMARKA KRONU', rate: 3.89 },
  { code: 'BGN', name: 'BULGAR LEVASI', rate: 13.84 },
  { code: 'RON', name: 'RUMEN LEYİ', rate: 5.38 },
  { code: 'IRR', name: 'İRAN RİYALİ', rate: 0.0006 },
  { code: 'CNY', name: 'ÇİN YUANI', rate: 3.72 },
  { code: 'PKR', name: 'PAKİSTAN RUPİSİ', rate: 0.09 },
  { code: 'QAR', name: 'KATAR RİYALİ', rate: 7.38 },
  { code: 'KRW', name: 'GÜNEY KORE WONU', rate: 0.02 },
  { code: 'AZN', name: 'AZERBAYCAN MANATI', rate: 15.87 }
];

export default function ExchangeRateBar() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchRatesFromTCMB = async () => {
    try {
      setLoading(true);
      
      // TCMB'nin günlük döviz kurları XML servisinden veri çek
      const proxyUrl = '/api/tcmb-proxy'; // CORS hatalarını önlemek için bir proxy kullan
      const response = await axios.get(proxyUrl);
      
      // XML verisini parse et
      parseString(response.data, (err: any, result: any) => {
        if (err) {
          throw new Error('XML parsing error');
        }
        
        // XML'den kurları çıkar
        const currencies = result.Tarih_Date.Currency;
        const parsedRates: ExchangeRate[] = currencies.map((currency: any) => {
          const code = currency.$.Kod;
          return {
            code,
            name: currencyNames[code] || currency.Isim[0],
            rate: parseFloat(currency.ForexSelling[0].replace(',', '.'))
          };
        });
        
        // İlk 20 kuru seç
        const topRates = parsedRates.slice(0, 20);
        setRates(topRates);
        setError(null);
      });
    } catch (error) {
      console.error('TCMB döviz kurları çekilirken hata oluştu:', error);
      setError('Döviz kurları yüklenirken bir hata oluştu');
      // Hata durumunda varsayılan değerleri kullan
      setRates(fallbackRates);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatesFromTCMB();
    // 60 saniyede bir güncelle (TCMB değerleri günde bir kez güncelleniyor, ama yine de düzenli kontrol edelim)
    const interval = setInterval(fetchRatesFromTCMB, 60000);
    return () => clearInterval(interval);
  }, []);

  // 5 saniyede bir gösterilen sayfayı değiştir
  useEffect(() => {
    if (rates.length > 0) {
      const timer = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % Math.ceil(rates.length / 5));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [rates.length]);

  if (loading && rates.length === 0) {
    return (
      <div className="w-full bg-orange-50 py-2 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (error && rates.length === 0) {
    return (
      <div className="w-full bg-orange-50 py-2 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    );
  }

  // Mevcut sayfada gösterilecek 5 kuru seç
  const currentRates = rates.slice(currentPage * 5, (currentPage + 1) * 5);

  return (
    <div className="w-full bg-orange-50 py-2 border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-5 gap-4">
          {currentRates.map((rate) => (
            <div 
              key={rate.code}
              className="flex flex-col items-center justify-center animate-slide-down"
            >
              <div className="text-xs font-medium text-orange-500">{rate.name}</div>
              <div className="text-sm font-medium">
                {rate.rate.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 