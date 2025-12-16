'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
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

// Yüzde formatlamak için yardımcı fonksiyon
const formatPercent = (value: number): string => {
  return `%${value.toFixed(2).replace('.', ',')}`;
};

// Dropdown seçenekleri
const FAIZ_EKLEME_SIKLIGI_OPTIONS = [
  'Günlük', 'Haftalık', 'Aylık', '3 Aylık', '6 Aylık', 'Yıllık'
];

const FAIZ_ORANI_TIPI_OPTIONS = [
  'Günlük', 'Aylık', 'Yıllık'
];

const VADE_TIPI_OPTIONS = [
  'Gün', 'Ay', 'Yıl'
];

export default function BilesikFaizHesaplamaAraci() {
  // Form states
  const [anapara, setAnapara] = useState<string>('');
  const [faizEklemeSikligi, setFaizEklemeSikligi] = useState<string>('Aylık');
  const [faizOrani, setFaizOrani] = useState<string>('');
  const [faizOraniTipi, setFaizOraniTipi] = useState<string>('Aylık');
  const [vade, setVade] = useState<string>('');
  const [vadeTipi, setVadeTipi] = useState<string>('Gün');
  
  // Result states
  const [toplamFaizOrani, setToplamFaizOrani] = useState<number | null>(null);
  const [faizTutari, setFaizTutari] = useState<number | null>(null);
  const [vadeSonuToplam, setVadeSonuToplam] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Dropdown states
  const [faizEklemeSikligiDropdownOpen, setFaizEklemeSikligiDropdownOpen] = useState(false);
  const [faizOraniTipiDropdownOpen, setFaizOraniTipiDropdownOpen] = useState(false);
  const [vadeTipiDropdownOpen, setVadeTipiDropdownOpen] = useState(false);
  
  // Refs
  const faizEklemeSikligiRef = useRef<HTMLDivElement>(null);
  const faizOraniTipiRef = useRef<HTMLDivElement>(null);
  const vadeTipiRef = useRef<HTMLDivElement>(null);
  
  // Browser check
  const [isBrowser, setIsBrowser] = useState(false);
  
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Bileşik faiz hesaplama
  const hesapla = () => {
    if (!anapara || !faizOrani || !vade) {
      alert('Lütfen tüm alanları doldurunuz.');
      return;
    }
    
    setIsCalculating(true);
    
    // Girdi değerlerini ayrıştır
    const anaparaValue = parseFloat(anapara.replace(/\./g, '').replace(',', '.'));
    const faizOraniValue = parseFloat(faizOrani.replace(',', '.'));
    const vadeValue = parseFloat(vade);
    
    // Faiz oranını dönemsel faiz oranına çevir
    let donemselFaizOrani: number;
    
    // Faiz oranı tipine göre dönemsel faiz oranını hesapla
    if (faizOraniTipi === 'Günlük') {
      if (faizEklemeSikligi === 'Günlük') donemselFaizOrani = faizOraniValue / 100;
      else if (faizEklemeSikligi === 'Haftalık') donemselFaizOrani = (faizOraniValue * 7) / 100;
      else if (faizEklemeSikligi === 'Aylık') donemselFaizOrani = (faizOraniValue * 30) / 100;
      else if (faizEklemeSikligi === '3 Aylık') donemselFaizOrani = (faizOraniValue * 90) / 100;
      else if (faizEklemeSikligi === '6 Aylık') donemselFaizOrani = (faizOraniValue * 180) / 100;
      else donemselFaizOrani = (faizOraniValue * 365) / 100; // Yıllık
    } 
    else if (faizOraniTipi === 'Aylık') {
      if (faizEklemeSikligi === 'Günlük') donemselFaizOrani = (faizOraniValue / 30) / 100;
      else if (faizEklemeSikligi === 'Haftalık') donemselFaizOrani = (faizOraniValue / 4) / 100;
      else if (faizEklemeSikligi === 'Aylık') donemselFaizOrani = faizOraniValue / 100;
      else if (faizEklemeSikligi === '3 Aylık') donemselFaizOrani = (faizOraniValue * 3) / 100;
      else if (faizEklemeSikligi === '6 Aylık') donemselFaizOrani = (faizOraniValue * 6) / 100;
      else donemselFaizOrani = (faizOraniValue * 12) / 100; // Yıllık
    }
    else { // Yıllık
      if (faizEklemeSikligi === 'Günlük') donemselFaizOrani = (faizOraniValue / 365) / 100;
      else if (faizEklemeSikligi === 'Haftalık') donemselFaizOrani = (faizOraniValue / 52) / 100;
      else if (faizEklemeSikligi === 'Aylık') donemselFaizOrani = (faizOraniValue / 12) / 100;
      else if (faizEklemeSikligi === '3 Aylık') donemselFaizOrani = (faizOraniValue / 4) / 100;
      else if (faizEklemeSikligi === '6 Aylık') donemselFaizOrani = (faizOraniValue / 2) / 100;
      else donemselFaizOrani = faizOraniValue / 100; // Yıllık
    }
    
    // Dönem sayısını hesapla
    let donemSayisi: number;
    
    // Vade tipine göre dönem sayısını hesapla
    if (vadeTipi === 'Gün') {
      if (faizEklemeSikligi === 'Günlük') donemSayisi = vadeValue;
      else if (faizEklemeSikligi === 'Haftalık') donemSayisi = vadeValue / 7;
      else if (faizEklemeSikligi === 'Aylık') donemSayisi = vadeValue / 30;
      else if (faizEklemeSikligi === '3 Aylık') donemSayisi = vadeValue / 90;
      else if (faizEklemeSikligi === '6 Aylık') donemSayisi = vadeValue / 180;
      else donemSayisi = vadeValue / 365; // Yıllık
    }
    else if (vadeTipi === 'Ay') {
      if (faizEklemeSikligi === 'Günlük') donemSayisi = vadeValue * 30;
      else if (faizEklemeSikligi === 'Haftalık') donemSayisi = vadeValue * 4;
      else if (faizEklemeSikligi === 'Aylık') donemSayisi = vadeValue;
      else if (faizEklemeSikligi === '3 Aylık') donemSayisi = vadeValue / 3;
      else if (faizEklemeSikligi === '6 Aylık') donemSayisi = vadeValue / 6;
      else donemSayisi = vadeValue / 12; // Yıllık
    }
    else { // Yıl
      if (faizEklemeSikligi === 'Günlük') donemSayisi = vadeValue * 365;
      else if (faizEklemeSikligi === 'Haftalık') donemSayisi = vadeValue * 52;
      else if (faizEklemeSikligi === 'Aylık') donemSayisi = vadeValue * 12;
      else if (faizEklemeSikligi === '3 Aylık') donemSayisi = vadeValue * 4;
      else if (faizEklemeSikligi === '6 Aylık') donemSayisi = vadeValue * 2;
      else donemSayisi = vadeValue; // Yıllık
    }
    
    // Bileşik faiz formülünü uygula
    // A = P × (1 + r)^t
    const vadeSonuToplamValue = anaparaValue * Math.pow(1 + donemselFaizOrani, donemSayisi);
    const faizTutariValue = vadeSonuToplamValue - anaparaValue;
    const toplamFaizOraniValue = (faizTutariValue / anaparaValue) * 100;
    
    // Hesaplanan değerleri ayarla
    setVadeSonuToplam(vadeSonuToplamValue);
    setFaizTutari(faizTutariValue);
    setToplamFaizOrani(toplamFaizOraniValue);
    
    // Sonuçları göster
    setShowResults(true);
    setIsCalculating(false);
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      {/* Form */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Anapara</label>
            <div className="relative">
              <input
                type="text"
                value={anapara}
                onChange={(e) => setAnapara(formatInputCurrency(e.target.value))}
                placeholder="Anapara girin"
                className="block w-full h-[58px] px-5 border border-gray-300 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-white transition-all duration-200"
              />
              <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Faiz ekleme sıklığı</label>
            <div className="relative" ref={faizEklemeSikligiRef}>
              <div 
                className="flex items-center justify-between w-full h-[58px] px-5 border border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setFaizEklemeSikligiDropdownOpen(!faizEklemeSikligiDropdownOpen)}
              >
                <div className="font-medium text-gray-800">{faizEklemeSikligi}</div>
                <div className="text-[#ff3d00]">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
              
              {isBrowser && faizEklemeSikligiDropdownOpen && (
                <>
                  <div className="fixed inset-0 bg-transparent z-40" onClick={() => setFaizEklemeSikligiDropdownOpen(false)}></div>
                  {createPortal(
                    <div 
                      className="absolute z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        maxHeight: '300px', 
                        overflowY: 'auto',
                        width: faizEklemeSikligiRef.current ? faizEklemeSikligiRef.current.offsetWidth + 'px' : '100%',
                        top: faizEklemeSikligiRef.current ? faizEklemeSikligiRef.current.getBoundingClientRect().bottom + 5 + 'px' : '0',
                        left: faizEklemeSikligiRef.current ? faizEklemeSikligiRef.current.getBoundingClientRect().left + 'px' : '0',
                      }}
                    >
                      {FAIZ_EKLEME_SIKLIGI_OPTIONS.map((option) => (
                        <div 
                          key={option} 
                          className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                          onClick={() => {
                            setFaizEklemeSikligi(option);
                            setFaizEklemeSikligiDropdownOpen(false);
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
            <label className="block text-sm font-semibold text-gray-700">Faiz Oranı</label>
            <div className="grid grid-cols-3 gap-0">
              <div className="col-span-2 relative">
                <input
                  type="text"
                  value={faizOrani}
                  onChange={(e) => {
                    // Sadece sayı ve virgül girişine izin ver
                    const value = e.target.value.replace(/[^0-9,]/g, '');
                    setFaizOrani(value);
                  }}
                  placeholder="Oran"
                  className="block w-full h-[58px] px-5 border border-gray-300 rounded-l-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-10 text-lg font-medium bg-white transition-all duration-200"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">%</span>
              </div>
              <div className="relative" ref={faizOraniTipiRef}>
                <div 
                  className="flex items-center justify-between w-full h-[58px] px-3 border border-gray-300 border-l-0 rounded-r-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setFaizOraniTipiDropdownOpen(!faizOraniTipiDropdownOpen)}
                >
                  <div className="font-medium text-gray-800">{faizOraniTipi}</div>
                  <div className="text-[#ff3d00]">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
                
                {isBrowser && faizOraniTipiDropdownOpen && (
                  <>
                    <div className="fixed inset-0 bg-transparent z-40" onClick={() => setFaizOraniTipiDropdownOpen(false)}></div>
                    {createPortal(
                      <div 
                        className="absolute z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          maxHeight: '300px', 
                          overflowY: 'auto',
                          width: faizOraniTipiRef.current ? faizOraniTipiRef.current.offsetWidth + 'px' : '100%',
                          top: faizOraniTipiRef.current ? faizOraniTipiRef.current.getBoundingClientRect().bottom + 5 + 'px' : '0',
                          left: faizOraniTipiRef.current ? faizOraniTipiRef.current.getBoundingClientRect().left + 'px' : '0',
                        }}
                      >
                        {FAIZ_ORANI_TIPI_OPTIONS.map((option) => (
                          <div 
                            key={option} 
                            className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                            onClick={() => {
                              setFaizOraniTipi(option);
                              setFaizOraniTipiDropdownOpen(false);
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
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Vade</label>
            <div className="grid grid-cols-3 gap-0">
              <div className="col-span-2 relative">
                <input
                  type="text"
                  value={vade}
                  onChange={(e) => {
                    // Sadece sayı girişine izin ver
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setVade(value);
                  }}
                  placeholder="Vade"
                  className="block w-full h-[58px] px-5 border border-gray-300 rounded-l-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] text-lg font-medium bg-white transition-all duration-200"
                />
              </div>
              <div className="relative" ref={vadeTipiRef}>
                <div 
                  className="flex items-center justify-between w-full h-[58px] px-3 border border-gray-300 border-l-0 rounded-r-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setVadeTipiDropdownOpen(!vadeTipiDropdownOpen)}
                >
                  <div className="font-medium text-gray-800">{vadeTipi}</div>
                  <div className="text-[#ff3d00]">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
                
                {isBrowser && vadeTipiDropdownOpen && (
                  <>
                    <div className="fixed inset-0 bg-transparent z-40" onClick={() => setVadeTipiDropdownOpen(false)}></div>
                    {createPortal(
                      <div 
                        className="absolute z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          maxHeight: '300px', 
                          overflowY: 'auto',
                          width: vadeTipiRef.current ? vadeTipiRef.current.offsetWidth + 'px' : '100%',
                          top: vadeTipiRef.current ? vadeTipiRef.current.getBoundingClientRect().bottom + 5 + 'px' : '0',
                          left: vadeTipiRef.current ? vadeTipiRef.current.getBoundingClientRect().left + 'px' : '0',
                        }}
                      >
                        {VADE_TIPI_OPTIONS.map((option) => (
                          <div 
                            key={option} 
                            className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                            onClick={() => {
                              setVadeTipi(option);
                              setVadeTipiDropdownOpen(false);
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
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={hesapla}
            disabled={isCalculating || !anapara || !faizOrani || !vade}
            className={`w-full max-w-md py-4 px-6 rounded-xl text-white font-medium text-lg flex items-center justify-center transition-all duration-200 ${
              isCalculating || !anapara || !faizOrani || !vade
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#ff4d00] hover:bg-[#ff3d00]'
            }`}
          >
            <span>Hesapla</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Results Section */}
      {showResults && (
        <div className="p-8 pt-0">
          <hr className="my-8 border-gray-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Faiz Oranı</p>
              <p className="text-2xl font-bold">{formatPercent(toplamFaizOrani || 0)}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Anapara</p>
              <p className="text-2xl font-bold">{formatCurrency(anapara || '0')}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Faiz Tutarı</p>
              <p className="text-2xl font-bold">{formatCurrency(faizTutari || 0)}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Vade Sonu Toplam</p>
              <p className="text-2xl font-bold">{formatCurrency(vadeSonuToplam || 0)}</p>
            </div>
          </div>
          

        </div>
      )}
    </div>
  );
}
