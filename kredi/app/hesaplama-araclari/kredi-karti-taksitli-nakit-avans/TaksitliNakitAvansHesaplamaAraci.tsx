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
  nakitAvansTutari: string;
  setNakitAvansTutari: (value: string) => void;
  vade: string;
  setVade: (value: string) => void;
  onHesapla: () => void;
  isHesaplaButtonDisabled: boolean;
  vadeRef: React.RefObject<HTMLDivElement>;
  vadeDropdownOpen: boolean;
  setVadeDropdownOpen: (open: boolean) => void;
  vadeDropdownPosition: { top: string; left: string; width: string };
  isBrowser: boolean;
}

const HesaplamaFormu: React.FC<HesaplamaFormuProps> = ({
  nakitAvansTutari,
  setNakitAvansTutari,
  vade,
  setVade,
  onHesapla,
  isHesaplaButtonDisabled,
  vadeRef,
  vadeDropdownOpen,
  setVadeDropdownOpen,
  vadeDropdownPosition,
  isBrowser
}) => {
  const handleTutarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNakitAvansTutari(e.target.value);
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 p-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          {/* Nakit Avans Tutarı */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Nakit Avans Tutarı</label>
            <div className="relative">
              <input
                type="text"
                value={formatCurrency(nakitAvansTutari)}
                onChange={handleTutarChange}
                placeholder="Nakit avans tutarını gir"
                className="block w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-gray-50 shadow-sm transition-all duration-200"
              />
              <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
            </div>
          </div>
          
          {/* Vade Seçimi */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Vade</label>
            <div className="relative" ref={vadeRef}>
              <div 
                className="block w-full px-5 py-4 border border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                onClick={() => setVadeDropdownOpen(!vadeDropdownOpen)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Vade</div>
                    <div className="font-semibold text-gray-800">{vade} Ay</div>
                  </div>
                  <div className="text-[#ff3d00]">
                    <ChevronRight className={`transform transition-transform ${vadeDropdownOpen ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </div>
              
              {isBrowser && vadeDropdownOpen && createPortal(
                <>
                  <div className="fixed inset-0 bg-transparent z-40" onClick={() => setVadeDropdownOpen(false)}></div>
                  <div 
                    className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      maxHeight: '300px', 
                      overflowY: 'auto',
                      width: vadeDropdownPosition.width,
                      top: vadeDropdownPosition.top,
                      left: vadeDropdownPosition.left,
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 9, 12].map((ay) => (
                      <div 
                        key={ay} 
                        className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                        onClick={() => {
                          setVade(ay.toString());
                          setVadeDropdownOpen(false);
                        }}
                      >
                        <div className="font-medium text-gray-800">{ay} Ay</div>
                      </div>
                    ))}
                  </div>
                </>,
                document.body
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={onHesapla}
            disabled={isHesaplaButtonDisabled}
            className={`w-full py-4 px-6 rounded-xl text-white font-medium text-lg flex items-center justify-center transition-all duration-200 ${isHesaplaButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#ff3d00] to-[#ff6333] hover:from-[#ff4d00] hover:to-[#ff7333] shadow-lg hover:shadow-xl'}`}
          >
            <span>Nakit avans hesapla</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mt-4 p-4 bg-gray-50 rounded-xl">
        <p>Taksitli nakit avans, kredi kartınızdan çektiğiniz nakit tutarı taksitli olarak ödemenize olanak sağlar. Hesaplama sonucunda aylık taksit tutarınızı ve toplam geri ödeme tutarınızı görebilirsiniz.</p>
      </div>
    </div>
  );
};

interface HesaplamaSonucuProps {
  nakitAvansTutari: string;
  vade: string;
  aylikTaksit: string;
  toplamGeriOdeme: string;
  faizOrani: number;
  kkdf: number;
  bsmv: number;
  onYenidenHesapla: () => void;
}

const HesaplamaSonucu: React.FC<HesaplamaSonucuProps> = ({
  nakitAvansTutari,
  vade,
  aylikTaksit,
  toplamGeriOdeme,
  faizOrani,
  kkdf,
  bsmv,
  onYenidenHesapla
}) => {
  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 p-8">
      
      {/* 1. Satır: Nakit avans tutarı ve Vade yan yana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Nakit Avans Tutarı */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Nakit Avans Tutarı</div>
          <div className="font-semibold text-gray-800 text-lg">{formatCurrency(nakitAvansTutari)} TL</div>
        </div>
        
        {/* Vade */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-medium text-gray-500 mb-1">Vade</div>
          <div className="font-semibold text-gray-800 text-lg">{vade} ay</div>
        </div>
      </div>
      
      {/* 2. Satır: Aylık Taksit ve Toplam Geri Ödeme yan yana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Aylık Taksit */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="text-sm font-medium text-green-700 mb-1">Aylık Taksit Tutarı</div>
          <div className="font-bold text-2xl text-green-600">{aylikTaksit} TL</div>
        </div>
        
        {/* Toplam Geri Ödeme */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-1">Toplam Geri Ödeme</div>
          <div className="font-bold text-2xl text-gray-800">{toplamGeriOdeme} TL</div>
        </div>
      </div>
      
      {/* 3. Satır: Butonlar yan yana */}
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
          <span>Kredi kartlarını listele</span>
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
      
      {/* 4. Satır: Faiz bilgileri en altta */}
      <div className="p-4 bg-gray-50 rounded-xl text-sm">
        <div className="flex flex-wrap gap-6 justify-center items-center">
          <span className="font-medium text-gray-700">Faiz Oranı: <span className="text-[#ff3d00]">%5.00</span></span>
          <span className="font-medium text-gray-700">KKDF: <span className="text-[#ff3d00]">%15</span></span>
          <span className="font-medium text-gray-700">BSMV: <span className="text-[#ff3d00]">%15</span></span>
        </div>
      </div>
    </div>
  );
};

export default function TaksitliNakitAvansHesaplamaAraci() {
  const [nakitAvansTutari, setNakitAvansTutari] = useState('');
  const [vade, setVade] = useState('4');
  const [hesaplandi, setHesaplandi] = useState(false);
  const [vadeDropdownOpen, setVadeDropdownOpen] = useState(false);
  
  // Hesaplama sonuçları
  const [aylikTaksit, setAylikTaksit] = useState('');
  const [toplamGeriOdeme, setToplamGeriOdeme] = useState('');
  
  // DOM referansları
  const [isBrowser, setIsBrowser] = useState(false);
  const vadeRef = useRef<HTMLDivElement>(null);
  const [vadeDropdownPosition, setVadeDropdownPosition] = useState({ top: '0px', left: '0px', width: 'auto' });
  
  // Client-side render kontrolü
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Dropdown pozisyonlarını güncelle
  const updateDropdownPosition = () => {
    if (vadeRef.current && vadeDropdownOpen) {
      const rect = vadeRef.current.getBoundingClientRect();
      setVadeDropdownPosition({
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
      });
    }
  };
  
  // Dropdown açıldığında pozisyonu ayarla
  useEffect(() => {
    if (vadeDropdownOpen) {
      updateDropdownPosition();
    }
  }, [vadeDropdownOpen]);
  
  // Scroll olayını dinle
  useEffect(() => {
    if (vadeDropdownOpen) {
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
      
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [vadeDropdownOpen]);
  
  // Sabit değerler (gerçek değerler değişebilir)
  const faizOrani = 5.00;
  const kkdf = 15;
  const bsmv = 15;
  
  // Hesapla butonunun aktif olup olmadığını kontrol et
  const isHesaplaButtonDisabled = () => {
    if (!nakitAvansTutari) return true;
    return false;
  };
  
  const hesapla = () => {
    if (!nakitAvansTutari || parseFloat(nakitAvansTutari.replace(/[^0-9]/g, '')) <= 0) {
      alert('Lütfen geçerli bir nakit avans tutarı giriniz');
      return;
    }
    
    const tutar = parseFloat(nakitAvansTutari.replace(/[^0-9]/g, ''));
    const vadeSayisi = parseInt(vade);
    
    // Aylık faiz oranı hesaplama (yıllık faiz / 12)
    const aylikFaizOrani = faizOrani / 100;
    
    // Vergi ve fonlarla birlikte toplam aylık maliyet
    const toplamAylikMaliyet = aylikFaizOrani * (1 + (kkdf / 100) + (bsmv / 100));
    
    // Taksit tutarı hesaplama formülü
    const taksitTutari = tutar * (toplamAylikMaliyet * Math.pow(1 + toplamAylikMaliyet, vadeSayisi)) / 
                         (Math.pow(1 + toplamAylikMaliyet, vadeSayisi) - 1);
    
    // Toplam geri ödeme
    const toplamOdeme = taksitTutari * vadeSayisi;
    
    // Sonuçları ayarla
    setAylikTaksit(taksitTutari.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    setToplamGeriOdeme(toplamOdeme.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    
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
          nakitAvansTutari={nakitAvansTutari}
          setNakitAvansTutari={setNakitAvansTutari}
          vade={vade}
          setVade={setVade}
          onHesapla={hesapla}
          isHesaplaButtonDisabled={isHesaplaButtonDisabled()}
          vadeRef={vadeRef}
          vadeDropdownOpen={vadeDropdownOpen}
          setVadeDropdownOpen={setVadeDropdownOpen}
          vadeDropdownPosition={vadeDropdownPosition}
          isBrowser={isBrowser}
        />
      ) : (
        <HesaplamaSonucu
          nakitAvansTutari={nakitAvansTutari}
          vade={vade}
          aylikTaksit={aylikTaksit}
          toplamGeriOdeme={toplamGeriOdeme}
          faizOrani={faizOrani}
          kkdf={kkdf}
          bsmv={bsmv}
          onYenidenHesapla={yenidenHesapla}
        />
      )}
    </div>
  );
}
