'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

// Animasyonlar için CSS
const fadeIn = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
`;

// Style elementini oluştur
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = fadeIn;
  document.head.appendChild(style);
}

// Tutar formatlamak için yardımcı fonksiyon - giriş alanları için
const formatInputCurrency = (value: string): string => {
  if (!value) return '';
  
  // Sadece sayıları ve virgülü koru
  const cleanValue = value.replace(/[^0-9,]/g, '');
  
  // Binlik ayraç ekle
  if (cleanValue.includes(',')) {
    // Virgül varsa, virgülün solundaki kısma binlik ayraç ekle
    const parts = cleanValue.split(',');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return integerPart + ',' + parts[1];
  } else {
    // Virgül yoksa, tüm sayıya binlik ayraç ekle
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
};

// Tutar formatlamak için yardımcı fonksiyon - görüntüleme için
const formatCurrency = (value: number | string): string => {
  if (!value) return '';
  
  // Eğer string ise ve virgül içeriyorsa, sayıya çevir
  let numValue: number;
  if (typeof value === 'string') {
    // Türkçe formatında virgül ondalık ayracıdır, nokta ise binlik ayracı
    // Önce noktaları kaldır, sonra virgülü noktaya çevir
    const cleanValue = value.replace(/\./g, '').replace(',', '.');
    numValue = parseFloat(cleanValue);
  } else {
    numValue = value;
  }
  
  // Türkçe formatında göster (virgül ondalık ayracı, nokta binlik ayracı)
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numValue);
};

const VADE_OPTIONS = [
  '12 ay', '24 ay', '36 ay', '48 ay', '60 ay'
];

export default function KrediYapilandirmaHesaplamaAraci() {
  // Form states
  const [krediTutari, setKrediTutari] = useState<string>('');
  const [vade, setVade] = useState<string>('');
  const [aylikTaksit, setAylikTaksit] = useState<string>('');
  const [odenenTaksit, setOdenenTaksit] = useState<string>('');
  
  // Calculation states
  const [kalanBorc, setKalanBorc] = useState<number | null>(null);
  const [aylikFaizOrani, setAylikFaizOrani] = useState<number | null>(null);
  const [yeniVade, setYeniVade] = useState<string>('');
  const [yeniFaizOrani, setYeniFaizOrani] = useState<string>('');
  
  // Result states
  const [yeniAylikTaksit, setYeniAylikTaksit] = useState<number | null>(null);
  const [toplamKazanc, setToplamKazanc] = useState<number | null>(null);
  
  // UI states
  const [showYapilandirma, setShowYapilandirma] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Dropdown states
  const [vadeDropdownOpen, setVadeDropdownOpen] = useState(false);
  const [yeniVadeDropdownOpen, setYeniVadeDropdownOpen] = useState(false);
  const [vadeDropdownPosition, setVadeDropdownPosition] = useState({ top: '0', left: '0', width: '0' });
  const [yeniVadeDropdownPosition, setYeniVadeDropdownPosition] = useState({ top: '0', left: '0', width: '0' });
  
  // Refs
  const vadeRef = useRef<HTMLDivElement>(null);
  const yeniVadeRef = useRef<HTMLDivElement>(null);
  
  // Browser check
  const [isBrowser, setIsBrowser] = useState(false);
  
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    setYeniVade('');
  }, []);

  // Handle initial calculation
  const hesapla = () => {
    if (!krediTutari || !vade || !aylikTaksit || !odenenTaksit) {
      alert('Lütfen tüm alanları doldurunuz.');
      return;
    }
    setIsCalculating(true);
    
    // Parse input values
    const krediTutariValue = parseFloat(krediTutari.replace(/\./g, '').replace(',', '.'));
    const aylikTaksitValue = parseFloat(aylikTaksit.replace(/\./g, '').replace(',', '.'));
    const vadeSayisi = parseInt(vade.split(' ')[0]);
    const odenenTaksitSayisi = parseInt(odenenTaksit);
    
    // Aylık faiz oranını hesapla - PMT formülünü ters çevirerek
    // PMT formülü: A = P * [r(1+r)^n] / [(1+r)^n - 1]
    // Burada r değerini bulmak için iteratif yöntem kullanıyoruz
    
    let aylikFaizOraniValue = 0.01; // Başlangıç tahmini
    const tolerance = 0.0000001;
    let iteration = 0;
    const maxIterations = 1000;
    
    // Newton-Raphson yöntemi ile aylık faiz oranını bulma
    while (iteration < maxIterations) {
      const theoreticalPayment = krediTutariValue * 
        (aylikFaizOraniValue * Math.pow(1 + aylikFaizOraniValue, vadeSayisi)) / 
        (Math.pow(1 + aylikFaizOraniValue, vadeSayisi) - 1);
      
      if (Math.abs(theoreticalPayment - aylikTaksitValue) < tolerance) {
        break;
      }
      
      // Türev fonksiyonu
      const derivative = (rate: number): number => {
        const factor1 = Math.pow(1 + rate, vadeSayisi);
        const factor2 = factor1 - 1;
        const numerator = krediTutariValue * (factor1 * vadeSayisi * rate + factor1 - rate * vadeSayisi * factor1);
        const denominator = factor2 * factor2;
        return numerator / denominator;
      };
      
      // Newton-Raphson adımı
      const nextRate = aylikFaizOraniValue - 
        (theoreticalPayment - aylikTaksitValue) / derivative(aylikFaizOraniValue);
      
      // Eğer tahmin geçerli değilse veya yakınsama yavaşsa
      if (isNaN(nextRate) || nextRate <= 0 || nextRate > 1) {
        aylikFaizOraniValue = aylikFaizOraniValue * 0.9; // Tahmini azalt
      } else {
        aylikFaizOraniValue = nextRate;
      }
      
      iteration++;
    }
    
    // Faiz oranını yüzde cinsine çevir
    aylikFaizOraniValue = aylikFaizOraniValue * 100;
    
    // Kalan borç tutarını hesapla - Amortizasyon formülü kullanarak
    // Kalan Borç = P(1+r)^t - A * [(1+r)^t - 1] / r
    const r = aylikFaizOraniValue / 100; // Ondalık değere çevir
    const kalanBorcValue = krediTutariValue * Math.pow(1 + r, odenenTaksitSayisi) - 
      aylikTaksitValue * (Math.pow(1 + r, odenenTaksitSayisi) - 1) / r;
    
    // Hesaplanan değerleri ayarla
    setKalanBorc(kalanBorcValue);
    setAylikFaizOrani(aylikFaizOraniValue);
    
    // Yapılandırma değerlerini sıfırla
    setYeniVade(vade); // Mevcut vadeyi varsayılan olarak ayarla
    setYeniFaizOrani('');
    
    // Yapılandırma bölümünü göster
    setShowYapilandirma(true);
    setShowResults(false);
    setIsCalculating(false);
  };

  // Yapılandırma hesaplama
  const yapilandirmaHesapla = () => {
    if (!kalanBorc || !yeniVade || !yeniFaizOrani) {
      alert('Lütfen tüm yapılandırma alanlarını doldurunuz.');
      return;
    }
    setIsCalculating(true);
    
    // Girdi değerlerini ayrıştır
    const kalanBorcValue = kalanBorc ? kalanBorc : 0; // kalanBorc zaten number olduğu için parseFloat gerekmiyor
    const yeniFaizOraniValue = parseFloat(yeniFaizOrani.replace(',', '.')) / 100; // Yüzdeyi ondalık sayıya çevir
    const yeniVadeSayisi = parseInt(yeniVade.split(' ')[0]);
    const vadeSayisi = parseInt(vade.split(' ')[0]);
    const odenenTaksitSayisi = parseInt(odenenTaksit);
    const kalanVadeSayisi = vadeSayisi - odenenTaksitSayisi;
    const aylikTaksitValue = parseFloat(aylikTaksit.replace(/\./g, '').replace(',', '.'));
    
    // 1. Yeni Aylık Taksit Hesaplama - PMT formülü kullanarak
    // A = P * [r(1+r)^n] / [(1+r)^n - 1]
    const yeniAylikTaksitValue = kalanBorcValue * 
      (yeniFaizOraniValue * Math.pow(1 + yeniFaizOraniValue, yeniVadeSayisi)) / 
      (Math.pow(1 + yeniFaizOraniValue, yeniVadeSayisi) - 1);
    
    // 2. Toplam Kazanç Hesaplama
    // Eski koşullarda kalan toplam ödeme
    const eskiToplamOdeme = aylikTaksitValue * kalanVadeSayisi;
    
    // Yeni koşullarda toplam ödeme
    const yeniToplamOdeme = yeniAylikTaksitValue * yeniVadeSayisi;
    
    // Toplam kazanç = Eski toplam ödeme - Yeni toplam ödeme
    const toplamKazancValue = eskiToplamOdeme - yeniToplamOdeme;
    
    // Hesaplanan değerleri ayarla
    setYeniAylikTaksit(yeniAylikTaksitValue);
    setToplamKazanc(toplamKazancValue);
    
    // Sonuç bölümünü göster
    setShowResults(true);
    setIsCalculating(false);
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      {/* Initial Form */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Kredi Tutarı</label>
            <div className="relative">
              <input
                type="text"
                value={krediTutari}
                onChange={(e) => setKrediTutari(formatInputCurrency(e.target.value))}
                placeholder="Kredi tutarı girin"
                className="block w-full h-[58px] px-5 border border-gray-300 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-white transition-all duration-200"
              />
              <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Vade seçin</label>
            <div className="relative" ref={vadeRef}>
              <div 
                className="flex items-center justify-between w-full h-[58px] px-5 border border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setVadeDropdownOpen(!vadeDropdownOpen)}
              >
                <div className="font-medium text-gray-800">{vade || 'Vade seçin'}</div>
                <div className="text-[#ff3d00]">
                  <ChevronRight className="w-5 h-5 transform rotate-90" />
                </div>
              </div>
              
              {isBrowser && vadeDropdownOpen && (
                <>
                  <div className="fixed inset-0 bg-transparent z-40" onClick={() => setVadeDropdownOpen(false)}></div>
                  {createPortal(
                    <div 
                      className="absolute z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        maxHeight: '300px', 
                        overflowY: 'auto',
                        width: vadeRef.current ? vadeRef.current.offsetWidth + 'px' : '100%',
                        top: vadeRef.current ? vadeRef.current.getBoundingClientRect().bottom + 5 + 'px' : '0',
                        left: vadeRef.current ? vadeRef.current.getBoundingClientRect().left + 'px' : '0',
                      }}
                    >
                      {VADE_OPTIONS.map((option) => (
                        <div 
                          key={option} 
                          className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                          onClick={() => {
                            setVade(option);
                            setVadeDropdownOpen(false);
                          }}
                        >
                          <div className="font-medium text-gray-800">{option}</div>
                        </div>
                      ))}
                    </div>,
                    document.body
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Aylık Taksit Tutarı</label>
            <div className="relative">
              <input
                type="text"
                value={aylikTaksit}
                onChange={(e) => setAylikTaksit(formatInputCurrency(e.target.value))}
                placeholder="Aylık taksit tutarı girin"
                className="block w-full h-[58px] px-5 border border-gray-300 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-white transition-all duration-200"
              />
              <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Ödenen Taksit Sayısı</label>
            <div className="relative">
              <input
                type="text"
                value={odenenTaksit}
                onChange={(e) => setOdenenTaksit(e.target.value)}
                placeholder="Ödenen taksit sayısını girin"
                className="block w-full h-[58px] px-5 border border-gray-300 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] text-lg font-medium bg-white transition-all duration-200"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={hesapla}
            disabled={isCalculating || !krediTutari || !vade || !aylikTaksit || !odenenTaksit}
            className="w-full max-w-md py-4 px-6 rounded-xl text-white font-medium text-lg flex items-center justify-center transition-all duration-200 bg-[#ff4d00] hover:bg-[#ff3d00]"
          >
            <span>Hesapla</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Yapılandırma Section */}
      {showYapilandirma && (
        <>
          <div className="p-8 pt-0">
            <hr className="my-8 border-gray-200" />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Yapılandırma Hesaplama</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-600 mb-1">Kalan Borç Tutarı:</p>
                <p className="text-xl font-bold">{kalanBorc ? formatCurrency(kalanBorc) : '-'} TL</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Aylık Faiz Oranı:</p>
                <p className="text-xl font-bold">%{aylikFaizOrani ? aylikFaizOrani.toFixed(2) : '-'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Kredi Vadesi</label>
                <div className="relative" ref={yeniVadeRef}>
                  <div 
                    className="flex items-center justify-between w-full h-[58px] px-5 border border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setYeniVadeDropdownOpen(!yeniVadeDropdownOpen)}
                  >
                    <div className="font-medium text-gray-800">{yeniVade || 'Kredi Vadesi'}</div>
                    <div className="text-[#ff3d00]">
                      <ChevronRight className="w-5 h-5 transform rotate-90" />
                    </div>
                  </div>
                  
                  {isBrowser && yeniVadeDropdownOpen && (
                    <>
                      <div className="fixed inset-0 bg-transparent z-40" onClick={() => setYeniVadeDropdownOpen(false)}></div>
                      {createPortal(
                        <div 
                          className="absolute z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            maxHeight: '300px', 
                            overflowY: 'auto',
                            width: yeniVadeRef.current ? yeniVadeRef.current.offsetWidth + 'px' : '100%',
                            top: yeniVadeRef.current ? yeniVadeRef.current.getBoundingClientRect().bottom + 5 + 'px' : '0',
                            left: yeniVadeRef.current ? yeniVadeRef.current.getBoundingClientRect().left + 'px' : '0',
                          }}
                        >
                          {VADE_OPTIONS.map((option) => (
                            <div 
                              key={option} 
                              className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                              onClick={() => {
                                setYeniVade(option);
                                setYeniVadeDropdownOpen(false);
                              }}
                            >
                              <div className="font-medium text-gray-800">{option}</div>
                            </div>
                          ))}
                        </div>,
                        document.body
                      )}
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Yeni Faiz Oranı</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">%</span>
                  <input
                    type="text"
                    className="block w-full h-[58px] pl-12 px-5 border border-gray-300 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] text-lg font-medium bg-white transition-all duration-200"
                    placeholder="Faiz oranı girin"
                    value={yeniFaizOrani}
                    onChange={(e) => setYeniFaizOrani(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={yapilandirmaHesapla}
                  disabled={isCalculating || !yeniVade || !yeniFaizOrani}
                  className="w-full h-[58px] rounded-xl text-white font-medium text-lg flex items-center justify-center transition-all duration-200 bg-[#ff4d00] hover:bg-[#ff3d00]"
                >
                  <span>Yapılandırma hesapla</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Results Section */}
            {showResults && (
              <>
                <hr className="my-8 border-gray-200" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2">Aylık Taksit Tutarı</p>
                    <p className="text-2xl font-bold">{yeniAylikTaksit ? formatCurrency(yeniAylikTaksit) : '-'} TL</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2">Toplam Kazancınız</p>
                    <p className="text-2xl font-bold">{toplamKazanc ? formatCurrency(toplamKazanc) : '-'} TL</p>
                  </div>
                  
                  <div className="flex items-center">
                    <a
                      href="/kredi/ihtiyac-kredisi"
                      className="w-full py-4 px-6 rounded-xl text-white font-medium text-lg flex items-center justify-center bg-[#ff4d00] hover:bg-[#ff3d00] transition-all duration-200"
                    >
                      <span>İhtiyaç kredilerini listele</span>
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
