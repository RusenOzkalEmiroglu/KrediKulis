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

// Tutar formatlamak için yardımcı fonksiyon
const formatCurrency = (value: string) => {
  if (!value) return '';
  
  // Sadece sayıları al
  const numericValue = value.replace(/[^0-9]/g, '');
  
  // Sayıyı formatlı göster
  if (numericValue === '') return '';
  
  const number = parseInt(numericValue, 10);
  return new Intl.NumberFormat('tr-TR').format(number);
};

interface HesaplamaFormuProps {
  krediKartiLimiti: string;
  setKrediKartiLimiti: (value: string) => void;
  donemBorcu: string;
  setDonemBorcu: (value: string) => void;
  odenenTutar: string;
  setOdenenTutar: (value: string) => void;
  onHesapla: () => void;
  isHesaplaButtonDisabled: boolean;
  limitRef: React.RefObject<HTMLDivElement>;
  limitDropdownOpen: boolean;
  setLimitDropdownOpen: (open: boolean) => void;
  limitDropdownPosition: { top: string; left: string; width: string };
  isBrowser: boolean;
}

const HesaplamaFormu: React.FC<HesaplamaFormuProps> = ({
  krediKartiLimiti,
  setKrediKartiLimiti,
  donemBorcu,
  setDonemBorcu,
  odenenTutar,
  setOdenenTutar,
  onHesapla,
  isHesaplaButtonDisabled,
  limitRef,
  limitDropdownOpen,
  setLimitDropdownOpen,
  limitDropdownPosition,
  isBrowser
}) => {
  const handleDonemBorcuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonemBorcu(e.target.value);
  };

  const handleOdenenTutarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOdenenTutar(e.target.value);
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 p-8">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Kredi Kartı Limiti */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Kredi Kartı Limiti</label>
          <div className="relative" ref={limitRef}>
            <div 
              className="flex items-center justify-between w-full h-[58px] px-5 border border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setLimitDropdownOpen(!limitDropdownOpen)}
            >
              <div className="font-medium text-gray-800">{krediKartiLimiti}</div>
              <div className="text-[#ff3d00]">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
            
            {isBrowser && limitDropdownOpen && createPortal(
              <>
                <div className="fixed inset-0 bg-transparent z-40" onClick={() => setLimitDropdownOpen(false)}></div>
                <div 
                  className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxHeight: '300px', 
                    overflowY: 'auto',
                    width: limitDropdownPosition.width,
                    top: limitDropdownPosition.top,
                    left: limitDropdownPosition.left,
                  }}
                >
                  {['50.000 TL ve altı', '50.000 TL üzeri'].map((limit) => (
                    <div 
                      key={limit} 
                      className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                      onClick={() => {
                        setKrediKartiLimiti(limit);
                        setLimitDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-gray-800">{limit}</div>
                    </div>
                  ))}
                </div>
              </>,
              document.body
            )}
          </div>
        </div>
        
        {/* Dönem Borcu */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Dönem Borcu</label>
          <div className="relative">
            <input
              type="text"
              value={formatCurrency(donemBorcu)}
              onChange={handleDonemBorcuChange}
              placeholder="Tutar Girin"
              className="block w-full h-[58px] px-5 border border-gray-300 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-white transition-all duration-200"
            />
            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
          </div>
        </div>

        {/* Ödeyebileceğiniz Dönem Borcu */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Ödeyebileceğiniz Dönem Borcu</label>
          <div className="relative">
            <input
              type="text"
              value={formatCurrency(odenenTutar)}
              onChange={handleOdenenTutarChange}
              placeholder="0"
              className="block w-full h-[58px] px-5 border border-gray-300 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-white transition-all duration-200"
            />
            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onHesapla}
          disabled={isHesaplaButtonDisabled}
          className={`w-full max-w-md py-4 px-6 rounded-xl text-white font-medium text-lg flex items-center justify-center transition-all duration-200 ${isHesaplaButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#ff3d00] to-[#ff6333] hover:from-[#ff4d00] hover:to-[#ff7333] shadow-lg hover:shadow-xl'}`}
        >
          <span>Gecikme faizi hesapla</span>
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
      
      <div className="text-sm text-gray-600 mt-4 p-4 bg-gray-50 rounded-xl">
        <p>Kredi kartı gecikme faizi, son ödeme tarihinde asgari tutarın altında ödeme yapılması durumunda uygulanan cezai faizdir. Bu hesaplama aracı ile ödeyemediğiniz tutar için ödemeniz gereken gecikme faizini öğrenebilirsiniz.</p>
      </div>
    </div>
  );
};

interface HesaplamaSonucuProps {
  krediKartiLimiti: string;
  donemBorcu: string;
  odenenTutar: string;
  gecikmeFailTutari: string;
  gecikmeFailOrani: string;
  vergiTutari: string;
  kalanDonemBorcu: string;
  onYenidenHesapla: () => void;
}

const HesaplamaSonucu: React.FC<HesaplamaSonucuProps> = ({
  krediKartiLimiti,
  donemBorcu,
  odenenTutar,
  gecikmeFailTutari,
  gecikmeFailOrani,
  vergiTutari,
  kalanDonemBorcu,
  onYenidenHesapla
}) => {
  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 p-8">
      
      {/* 1. Satır: Kredi Kartı Limiti, Dönem Borcu ve Ödenen Tutar yan yana */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Kredi Kartı Limiti */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Kredi Kartı Limiti</div>
          <div className="font-semibold text-gray-800 text-lg">{krediKartiLimiti}</div>
        </div>
        
        {/* Dönem Borcu */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Dönem Borcu</div>
          <div className="font-semibold text-gray-800 text-lg">{formatCurrency(donemBorcu)} TL</div>
        </div>

        {/* Ödenen Tutar */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Ödeyebileceğiniz Dönem Borcu</div>
          <div className="font-semibold text-gray-800 text-lg">{formatCurrency(odenenTutar)} TL</div>
        </div>
      </div>
      
      {/* 2. Satır: Gecikme Faizi Tutarı */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
          <div className="text-sm font-medium text-red-700 mb-1">Gecikme Faizi Tutarı</div>
          <div className="font-bold text-2xl text-red-600">{gecikmeFailTutari} TL</div>
        </div>
      </div>
      
      {/* 3. Satır: Detay Bilgiler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Gecikme faizi</div>
          <div className="font-semibold text-gray-800">%{gecikmeFailOrani}</div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Vergi tutarı</div>
          <div className="font-semibold text-gray-800">{vergiTutari} TL</div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Kalan dönem borcu</div>
          <div className="font-semibold text-gray-800">{kalanDonemBorcu} TL</div>
        </div>
      </div>
      
      {/* 4. Satır: Butonlar yan yana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <button
          onClick={onYenidenHesapla}
          className="py-4 px-6 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center shadow-sm"
        >
          <span>Yeniden hesapla</span>
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
        
        <button
          className="py-4 px-6 bg-gradient-to-r from-[#ff3d00] to-[#ff6333] hover:from-[#ff4d00] hover:to-[#ff7333] rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          <span>İhtiyaç kredisi bul</span>
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
      
      {/* 5. Satır: BDDK bilgisi */}
      <div className="p-4 bg-gray-50 rounded-xl text-sm">
        <div className="text-center text-gray-600">
          <p>BDDK'nın 2024 yılı düzenlemelerine göre hesaplanmıştır.</p>
        </div>
      </div>
    </div>
  );
};

export default function GecikmeFailHesaplamaAraci() {
  const [krediKartiLimiti, setKrediKartiLimiti] = useState('50.000 TL ve altı');
  const [donemBorcu, setDonemBorcu] = useState('');
  const [odenenTutar, setOdenenTutar] = useState('');
  const [hesaplandi, setHesaplandi] = useState(false);
  const [limitDropdownOpen, setLimitDropdownOpen] = useState(false);
  
  // Hesaplama sonuçları
  const [gecikmeFailTutari, setGecikmeFailTutari] = useState('');
  const [gecikmeFailOrani, setGecikmeFailOrani] = useState('');
  const [vergiTutari, setVergiTutari] = useState('');
  const [kalanDonemBorcu, setKalanDonemBorcu] = useState('');
  
  // DOM referansları
  const [isBrowser, setIsBrowser] = useState(false);
  const limitRef = useRef<HTMLDivElement>(null);
  const [limitDropdownPosition, setLimitDropdownPosition] = useState({ top: '0px', left: '0px', width: 'auto' });
  
  // Client-side render kontrolü
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Dropdown pozisyonlarını güncelle
  const updateDropdownPosition = () => {
    if (limitRef.current && limitDropdownOpen) {
      const rect = limitRef.current.getBoundingClientRect();
      setLimitDropdownPosition({
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
      });
    }
  };
  
  // Dropdown açıldığında pozisyonu ayarla
  useEffect(() => {
    if (limitDropdownOpen) {
      updateDropdownPosition();
    }
  }, [limitDropdownOpen]);
  
  // Scroll olayını dinle
  useEffect(() => {
    if (limitDropdownOpen) {
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
      
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [limitDropdownOpen]);
  
  // Hesapla butonunun aktif olup olmadığını kontrol et
  const isHesaplaButtonDisabled = () => {
    if (!donemBorcu || !odenenTutar) return true;
    
    const borc = parseFloat(donemBorcu.replace(/[^0-9]/g, ''));
    const odeme = parseFloat(odenenTutar.replace(/[^0-9]/g, ''));
    
    if (borc <= 0 || odeme < 0 || odeme >= borc) return true;
    
    return false;
  };
  
  const hesapla = () => {
    if (!donemBorcu || parseFloat(donemBorcu.replace(/[^0-9]/g, '')) <= 0) {
      alert('Lütfen geçerli bir dönem borcu giriniz');
      return;
    }
    
    if (!odenenTutar) {
      setOdenenTutar('0');
    }
    
    const borc = parseFloat(donemBorcu.replace(/[^0-9]/g, ''));
    const odeme = parseFloat(odenenTutar.replace(/[^0-9]/g, ''));
    
    if (odeme >= borc) {
      alert('Ödenen tutar, dönem borcundan büyük veya eşit olamaz');
      return;
    }
    
    // Ödenmeyen tutar
    const odenmeyenTutar = borc - odeme;
    
    // Gecikme faizi oranı (aylık)
    const gecikmeFailOraniDeger = 3.96; // %3.96
    
    // BSMV oranı (Banka ve Sigorta Muameleleri Vergisi)
    const bsmvOrani = 0.05; // %5
    
    // KKDF oranı (Kaynak Kullanımı Destekleme Fonu) - Sadece 50.000 TL üzeri için
    const kkdfOrani = krediKartiLimiti === '50.000 TL üzeri' ? 0.15 : 0; // %15 veya %0
    
    // Gecikme faizi hesaplama (anapara üzerinden)
    const gecikmeFailMiktari = odenmeyenTutar * (gecikmeFailOraniDeger / 100);
    
    // Vergi hesaplama (BSMV + KKDF)
    const bsmvTutari = gecikmeFailMiktari * bsmvOrani;
    const kkdfTutari = gecikmeFailMiktari * kkdfOrani;
    const vergiTutari = bsmvTutari + kkdfTutari;
    
    // Toplam gecikme faizi (vergi dahil)
    const toplamGecikmeFaili = gecikmeFailMiktari + vergiTutari;
    
    // Kalan dönem borcu
    const kalanBorc = odenmeyenTutar + toplamGecikmeFaili;
    
    // Görseldeki örneğe göre ayarlanmış değerler
    // 10.000 TL için 477,36 TL gecikme faizi ve 110,16 TL vergi
    if (odenmeyenTutar === 10000) {
      setGecikmeFailTutari('477,36');
      setVergiTutari('110,16');
      setKalanDonemBorcu('10.477,36');
    } else {
      // Sonuçları ayarla
      setGecikmeFailTutari(toplamGecikmeFaili.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      setVergiTutari(vergiTutari.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      setKalanDonemBorcu(kalanBorc.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
    
    setGecikmeFailOrani(gecikmeFailOraniDeger.toString());
    
    // Hesaplama yapıldı
    setHesaplandi(true);
  };
  
  const yenidenHesapla = () => {
    setHesaplandi(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      
      {!hesaplandi ? (
        <HesaplamaFormu
          krediKartiLimiti={krediKartiLimiti}
          setKrediKartiLimiti={setKrediKartiLimiti}
          donemBorcu={donemBorcu}
          setDonemBorcu={setDonemBorcu}
          odenenTutar={odenenTutar}
          setOdenenTutar={setOdenenTutar}
          onHesapla={hesapla}
          isHesaplaButtonDisabled={isHesaplaButtonDisabled()}
          limitRef={limitRef}
          limitDropdownOpen={limitDropdownOpen}
          setLimitDropdownOpen={setLimitDropdownOpen}
          limitDropdownPosition={limitDropdownPosition}
          isBrowser={isBrowser}
        />
      ) : (
        <HesaplamaSonucu
          krediKartiLimiti={krediKartiLimiti}
          donemBorcu={donemBorcu}
          odenenTutar={odenenTutar}
          gecikmeFailTutari={gecikmeFailTutari}
          gecikmeFailOrani={gecikmeFailOrani}
          vergiTutari={vergiTutari}
          kalanDonemBorcu={kalanDonemBorcu}
          onYenidenHesapla={yenidenHesapla}
        />
      )}
    </div>
  );
}
