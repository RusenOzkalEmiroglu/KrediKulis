import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

interface CurrencyData {
  '@_CurrencyCode': string;
  CurrencyName: string;
  ForexBuying: string;
  ForexSelling: string;
  [key: string]: any; 
}

interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
  change: number;
}

export async function GET() {
  try {
    const response = await axios.get('https://www.tcmb.gov.tr/kurlar/today.xml');
    const parser = new XMLParser();
    const result = parser.parse(response.data);
    
    if (!result.Tarih_Date || !result.Tarih_Date.Currency) {
      throw new Error('Invalid XML format');
    }

    const currencies = Array.isArray(result.Tarih_Date.Currency) 
      ? result.Tarih_Date.Currency 
      : [result.Tarih_Date.Currency];

    const rates = currencies.map((currency: CurrencyData) => ({
      code: currency['@_CurrencyCode'],
      name: currency.CurrencyName,
      rate: (parseFloat(currency.ForexBuying) + parseFloat(currency.ForexSelling)) / 2,
      change: 0 // TCMB anlık değişim vermiyor
    })).filter((rate: ExchangeRate) => rate.rate > 0);

    if (rates.length === 0) {
      throw new Error('No valid rates found');
    }

    return NextResponse.json({ rates });
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Fallback data
    return NextResponse.json({
      rates: [
        { code: 'USD', name: 'ABD DOLARI', rate: 32.15, change: 0.05 },
        { code: 'EUR', name: 'EURO', rate: 34.85, change: -0.12 },
        { code: 'GBP', name: 'İNGİLİZ STERLİNİ', rate: 40.65, change: 0.08 },
        { code: 'CHF', name: 'İSVİÇRE FRANGI', rate: 35.95, change: 0.03 },
        { code: 'KWD', name: 'KUVEYT DİNARI', rate: 104.45, change: 0.15 },
        { code: 'SAR', name: 'SUUDİ ARABİSTAN RİYALİ', rate: 8.57, change: 0.02 },
        { code: 'JPY', name: 'JAPON YENİ', rate: 0.213, change: -0.01 },
        { code: 'AUD', name: 'AVUSTRALYA DOLARI', rate: 20.95, change: 0.04 },
        { code: 'CAD', name: 'KANADA DOLARI', rate: 23.75, change: 0.06 },
        { code: 'SEK', name: 'İSVEÇ KRONU', rate: 3.08, change: -0.02 },
        { code: 'NOK', name: 'NORVEÇ KRONU', rate: 3.02, change: 0.01 },
        { code: 'DKK', name: 'DANİMARKA KRONU', rate: 4.67, change: -0.03 },
        { code: 'BGN', name: 'BULGAR LEVASI', rate: 17.82, change: 0.04 },
        { code: 'RON', name: 'RUMEN LEYİ', rate: 7.02, change: 0.02 },
        { code: 'IRR', name: 'İRAN RİYALİ', rate: 0.00076, change: 0 },
        { code: 'CNY', name: 'ÇİN YUANI', rate: 4.46, change: -0.01 },
        { code: 'PKR', name: 'PAKİSTAN RUPİSİ', rate: 0.115, change: 0 },
        { code: 'QAR', name: 'KATAR RİYALİ', rate: 8.82, change: 0.03 },
        { code: 'KRW', name: 'GÜNEY KORE WONU', rate: 0.024, change: 0 },
        { code: 'AZN', name: 'AZERBAYCAN MANATI', rate: 18.91, change: 0.05 },
        { code: 'RUB', name: 'RUS RUBLESİ', rate: 0.347, change: -0.01 }
      ]
    });
  }
} 