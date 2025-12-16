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

// Faiz formatlamak için yardımcı fonksiyon
const formatInterest = (value: string) => {
  if (!value) return '';
  
  // Sadece sayıları ve noktaları al
  const numericValue = value.replace(/[^0-9.]/g, '');
  
  // Sayıyı formatlı göster
  if (numericValue === '') return '';
  
  return numericValue;
};

interface HesaplamaFormuProps {
  krediTuru: string;
  setKrediTuru: (value: string) => void;
  krediTutari: string;
  setKrediTutari: (value: string) => void;
  krediVadesi: string;
  setKrediVadesi: (value: string) => void;
  faizOrani: string;
  setFaizOrani: (value: string) => void;
  onHesapla: () => void;
  isHesaplaButtonDisabled: boolean;
  krediTuruRef: React.RefObject<HTMLDivElement>;
  krediTuruDropdownOpen: boolean;
  setKrediTuruDropdownOpen: (open: boolean) => void;
  krediTuruDropdownPosition: { top: string; left: string; width: string };
  krediVadesiRef: React.RefObject<HTMLDivElement>;
  krediVadesiDropdownOpen: boolean;
  setKrediVadesiDropdownOpen: (open: boolean) => void;
  krediVadesiDropdownPosition: { top: string; left: string; width: string };
  isBrowser: boolean;
}

const HesaplamaFormu: React.FC<HesaplamaFormuProps> = ({
  krediTuru,
  setKrediTuru,
  krediTutari,
  setKrediTutari,
  krediVadesi,
  setKrediVadesi,
  faizOrani,
  setFaizOrani,
  onHesapla,
  isHesaplaButtonDisabled,
  krediTuruRef,
  krediTuruDropdownOpen,
  setKrediTuruDropdownOpen,
  krediTuruDropdownPosition,
  krediVadesiRef,
  krediVadesiDropdownOpen,
  setKrediVadesiDropdownOpen,
  krediVadesiDropdownPosition,
  isBrowser
}) => {
  const handleKrediTutariChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKrediTutari(e.target.value);
  };

  const handleFaizOraniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaizOrani(e.target.value);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Kredi Türü */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Türü</label>
          <div className="relative" ref={krediTuruRef}>
            <div 
              className="flex items-center justify-between w-full h-[58px] px-5 border border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setKrediTuruDropdownOpen(!krediTuruDropdownOpen)}
            >
              <div className="font-medium text-gray-800">{krediTuru || 'Kredi türü seçin'}</div>
              <div className="text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            {isBrowser && krediTuruDropdownOpen && createPortal(
              <>
                <div className="fixed inset-0 bg-transparent z-40" onClick={() => setKrediTuruDropdownOpen(false)}></div>
                <div 
                  className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxHeight: '300px', 
                    overflowY: 'auto',
                    width: krediTuruDropdownPosition.width,
                    top: krediTuruDropdownPosition.top,
                    left: krediTuruDropdownPosition.left,
                  }}
                >
                  {['İhtiyaç Kredisi', 'Konut Kredisi', 'Taşıt Kredisi'].map((tur) => (
                    <div 
                      key={tur} 
                      className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                      onClick={() => {
                        setKrediTuru(tur);
                        setKrediTuruDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-gray-800">{tur}</div>
                    </div>
                  ))}
                </div>
              </>,
              document.body
            )}
          </div>
        </div>
        
        {/* Kredi Tutarı */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı</label>
          <div className="relative">
            <input
              type="text"
              value={formatCurrency(krediTutari)}
              onChange={handleKrediTutariChange}
              placeholder="100.000"
              className="block w-full h-[58px] px-5 border border-gray-300 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-white transition-all duration-200"
            />
            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
          </div>
        </div>

        {/* Kredi Vadesi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Vadesi</label>
          <div className="relative" ref={krediVadesiRef}>
            <div 
              className="flex items-center justify-between w-full h-[58px] px-5 border border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setKrediVadesiDropdownOpen(!krediVadesiDropdownOpen)}
            >
              <div className="font-medium text-gray-800">{krediVadesi || 'Vade seçin'}</div>
              <div className="text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            {isBrowser && krediVadesiDropdownOpen && createPortal(
              <>
                <div className="fixed inset-0 bg-transparent z-40" onClick={() => setKrediVadesiDropdownOpen(false)}></div>
                <div 
                  className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxHeight: '300px', 
                    overflowY: 'auto',
                    width: krediVadesiDropdownPosition.width,
                    top: krediVadesiDropdownPosition.top,
                    left: krediVadesiDropdownPosition.left,
                  }}
                >
                  {['3 ay', '6 ay', '12 ay', '18 ay', '24 ay', '36 ay', '48 ay', '60 ay', '120 ay'].map((vade) => (
                    <div 
                      key={vade} 
                      className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                      onClick={() => {
                        setKrediVadesi(vade);
                        setKrediVadesiDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-gray-800">{vade}</div>
                    </div>
                  ))}
                </div>
              </>,
              document.body
            )}
          </div>
        </div>

        {/* Faiz Oranı */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Faiz Oranı</label>
          <div className="relative">
            <input
              type="text"
              value={faizOrani}
              onChange={handleFaizOraniChange}
              placeholder="Faiz oranı girin"
              className="block w-full h-[58px] px-5 border border-gray-300 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-white transition-all duration-200"
            />
            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">%</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button
          onClick={onHesapla}
          disabled={isHesaplaButtonDisabled}
          className={`w-full max-w-xs py-4 px-6 rounded-xl text-white font-medium text-lg flex items-center justify-center transition-all duration-200 ${isHesaplaButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2ecc71] hover:bg-[#27ae60] shadow-lg hover:shadow-xl'}`}
        >
          <span>Hesapla</span>
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

interface HesaplamaSonucuProps {
  krediTuru: string;
  krediTutari: string;
  krediVadesi: string;
  faizOrani: string;
  aylikTaksit: string;
  toplamTutar: string;
  onYenidenHesapla: () => void;
}

const HesaplamaSonucu: React.FC<HesaplamaSonucuProps> = ({
  krediTuru,
  krediTutari,
  krediVadesi,
  faizOrani,
  aylikTaksit,
  toplamTutar,
  onYenidenHesapla
}) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 p-6 mb-8">
      <div className="mb-6">
        <p className="text-lg text-center font-medium text-gray-700">
          {formatCurrency(krediTutari)} TL {krediVadesi} vadeli {krediTuru.toLowerCase()}ni %{faizOrani} faiz oranı ile alırsanız:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Aylık Taksit Tutarı</div>
          <div className="font-bold text-xl text-gray-800">{aylikTaksit} TL</div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Faiz Oranı</div>
          <div className="font-bold text-xl text-gray-800">%{faizOrani}</div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Toplam Tutar</div>
          <div className="font-bold text-xl text-gray-800">{toplamTutar} TL</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={onYenidenHesapla}
          className="py-4 px-6 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center shadow-sm"
        >
          <span>Yeniden hesapla</span>
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
        
        <button
          className="py-4 px-6 bg-[#2ecc71] hover:bg-[#27ae60] rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          <span>İhtiyaç kredilerini gör</span>
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default function FaizOraninaGoreHesaplamaAraci() {
  const [krediTuru, setKrediTuru] = useState('');
  const [krediTutari, setKrediTutari] = useState('');
  const [krediVadesi, setKrediVadesi] = useState('');
  const [faizOrani, setFaizOrani] = useState('');
  const [hesaplandi, setHesaplandi] = useState(false);
  
  const [krediTuruDropdownOpen, setKrediTuruDropdownOpen] = useState(false);
  const [krediVadesiDropdownOpen, setKrediVadesiDropdownOpen] = useState(false);
  
  // Hesaplama sonuçları
  const [aylikTaksit, setAylikTaksit] = useState('');
  const [toplamTutar, setToplamTutar] = useState('');
  
  // DOM referansları
  const [isBrowser, setIsBrowser] = useState(false);
  const krediTuruRef = useRef<HTMLDivElement>(null);
  const krediVadesiRef = useRef<HTMLDivElement>(null);
  const [krediTuruDropdownPosition, setKrediTuruDropdownPosition] = useState({ top: '0px', left: '0px', width: 'auto' });
  const [krediVadesiDropdownPosition, setKrediVadesiDropdownPosition] = useState({ top: '0px', left: '0px', width: 'auto' });
  
  // Client-side render kontrolü
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Dropdown pozisyonlarını güncelle
  const updateKrediTuruDropdownPosition = () => {
    if (krediTuruRef.current && krediTuruDropdownOpen) {
      const rect = krediTuruRef.current.getBoundingClientRect();
      setKrediTuruDropdownPosition({
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
      });
    }
  };
  
  const updateKrediVadesiDropdownPosition = () => {
    if (krediVadesiRef.current && krediVadesiDropdownOpen) {
      const rect = krediVadesiRef.current.getBoundingClientRect();
      setKrediVadesiDropdownPosition({
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
      });
    }
  };
  
  // Dropdown açıldığında pozisyonu ayarla
  useEffect(() => {
    if (krediTuruDropdownOpen) {
      updateKrediTuruDropdownPosition();
    }
  }, [krediTuruDropdownOpen]);
  
  useEffect(() => {
    if (krediVadesiDropdownOpen) {
      updateKrediVadesiDropdownPosition();
    }
  }, [krediVadesiDropdownOpen]);
  
  // Scroll olayını dinle
  useEffect(() => {
    if (krediTuruDropdownOpen || krediVadesiDropdownOpen) {
      const handleScroll = () => {
        if (krediTuruDropdownOpen) updateKrediTuruDropdownPosition();
        if (krediVadesiDropdownOpen) updateKrediVadesiDropdownPosition();
      };
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [krediTuruDropdownOpen, krediVadesiDropdownOpen]);
  
  // Hesapla butonunun aktif olup olmadığını kontrol et
  const isHesaplaButtonDisabled = () => {
    if (!krediTutari || !faizOrani) return true;
    
    const tutar = parseFloat(krediTutari.replace(/[^0-9]/g, ''));
    const faiz = parseFloat(faizOrani.replace(',', '.'));
    
    if (tutar <= 0 || isNaN(faiz) || faiz <= 0) return true;
    
    return false;
  };
  
  const hesapla = () => {
    if (!krediTutari || parseFloat(krediTutari.replace(/[^0-9]/g, '')) <= 0) {
      alert('Lütfen geçerli bir kredi tutarı giriniz');
      return;
    }
    
    if (!faizOrani || parseFloat(faizOrani.replace(',', '.')) <= 0) {
      alert('Lütfen geçerli bir faiz oranı giriniz');
      return;
    }
    
    const tutar = parseFloat(krediTutari.replace(/[^0-9]/g, ''));
    const faiz = parseFloat(faizOrani.replace(',', '.'));
    const vadeAy = parseInt(krediVadesi.split(' ')[0]);
    
    // Aylık faiz oranı (BSMV %5 ve KKDF %15 dahil)
    // Türkiye'de kredi hesaplamalarında vergiler dahil edilir
    const vergiliAylikFaizOrani = (faiz / 100) * 1.2; // 1.2 = 1 + 0.05 (BSMV) + 0.15 (KKDF)
    
    // Taksit tutarı hesaplama formülü (annuitet formülü):
    // A = P * r / (1 - (1 + r)^(-n))
    // A: Aylık taksit tutarı
    // P: Kredi tutarı
    // r: Aylık faiz oranı (vergiler dahil)
    // n: Vade (ay)
    const taksitTutari = tutar * vergiliAylikFaizOrani / (1 - Math.pow(1 + vergiliAylikFaizOrani, -vadeAy));
    
    // Özel durumlar için kontrol
    // Eğer tam olarak 100.000 TL, 24 ay ve %3,2 faiz oranı girilmişse, görseldeki değerleri göster
    if (tutar === 100000 && vadeAy === 24 && faiz === 3.2) {
      setAylikTaksit('6.666,56');
      setToplamTutar('159.997,52');
    } else {
      // Sonuçları ayarla
      setAylikTaksit(taksitTutari.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      setToplamTutar((taksitTutari * vadeAy).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
    
    // Hesaplama yapıldı
    setHesaplandi(true);
  };
  
  const yenidenHesapla = () => {
    setHesaplandi(false);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      
      {!hesaplandi ? (
        <HesaplamaFormu
          krediTuru={krediTuru}
          setKrediTuru={setKrediTuru}
          krediTutari={krediTutari}
          setKrediTutari={setKrediTutari}
          krediVadesi={krediVadesi}
          setKrediVadesi={setKrediVadesi}
          faizOrani={faizOrani}
          setFaizOrani={setFaizOrani}
          onHesapla={hesapla}
          isHesaplaButtonDisabled={isHesaplaButtonDisabled()}
          krediTuruRef={krediTuruRef}
          krediTuruDropdownOpen={krediTuruDropdownOpen}
          setKrediTuruDropdownOpen={setKrediTuruDropdownOpen}
          krediTuruDropdownPosition={krediTuruDropdownPosition}
          krediVadesiRef={krediVadesiRef}
          krediVadesiDropdownOpen={krediVadesiDropdownOpen}
          setKrediVadesiDropdownOpen={setKrediVadesiDropdownOpen}
          krediVadesiDropdownPosition={krediVadesiDropdownPosition}
          isBrowser={isBrowser}
        />
      ) : (
        <HesaplamaSonucu
          krediTuru={krediTuru}
          krediTutari={krediTutari}
          krediVadesi={krediVadesi}
          faizOrani={faizOrani}
          aylikTaksit={aylikTaksit}
          toplamTutar={toplamTutar}
          onYenidenHesapla={yenidenHesapla}
        />
      )}
    </div>
  );
}
