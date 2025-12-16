'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

// Kredi türleri ve tip tanımlaması
type KrediTuruType = 'İhtiyaç Kredisi' | 'Konut Kredisi' | 'Taşıt Kredisi';

const krediTurleri: KrediTuruType[] = [
  'İhtiyaç Kredisi',
  'Konut Kredisi',
  'Taşıt Kredisi'
];

// Vade seçenekleri
const vadeSecenekleri: Record<KrediTuruType, number[]> = {
  'İhtiyaç Kredisi': [3, 6, 12, 18, 24, 36],
  'Konut Kredisi': [12, 24, 36, 60, 120, 240],
  'Taşıt Kredisi': [12, 24, 36, 48, 60]
};

// Araç durumu seçenekleri
const aracDurumuSecenekleri = ['Yeni', 'İkinci el'];

export default function TaksiteGoreHesaplaPage() {
  // State tanımlamaları
  const [activeTab, setActiveTab] = useState<KrediTuruType>('İhtiyaç Kredisi');
  const [aylikTaksit, setAylikTaksit] = useState('');
  const [vade, setVade] = useState(24);
  const [aracDurumu, setAracDurumu] = useState('Yeni');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vadeDropdownOpen, setVadeDropdownOpen] = useState(false);
  const [aracDurumuDropdownOpen, setAracDurumuDropdownOpen] = useState(false);
  const [hesaplamaTamamlandi, setHesaplamaTamamlandi] = useState(false);
  
  // DOM referansları
  const [isBrowser, setIsBrowser] = useState(false);
  const vadeRef = useRef<HTMLDivElement>(null);
  const aracDurumuRef = useRef<HTMLDivElement>(null);
  const [vadeDropdownPosition, setVadeDropdownPosition] = useState({ top: '0px', left: '0px', width: 'auto' });
  const [aracDurumuDropdownPosition, setAracDurumuDropdownPosition] = useState({ top: '0px', left: '0px', width: 'auto' });
  
  // Hesaplama sonuçları
  const [krediTutari, setKrediTutari] = useState<number | null>(null);
  const [aylikFaizOrani, setAylikFaizOrani] = useState<number | null>(null);
  const [toplamOdeme, setToplamOdeme] = useState<number | null>(null);
  const [toplamFaiz, setToplamFaiz] = useState<number | null>(null);

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
    
    if (aracDurumuRef.current && aracDurumuDropdownOpen) {
      const rect = aracDurumuRef.current.getBoundingClientRect();
      setAracDurumuDropdownPosition({
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
  
  useEffect(() => {
    if (aracDurumuDropdownOpen) {
      updateDropdownPosition();
    }
  }, [aracDurumuDropdownOpen]);
  
  // Scroll olayını dinle
  useEffect(() => {
    if (vadeDropdownOpen || aracDurumuDropdownOpen) {
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
      
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [vadeDropdownOpen, aracDurumuDropdownOpen]);

  // Input değerlerini formatla
  const formatCurrency = (value: string) => {
    if (!value) return '';
    
    // Sadece sayıları al
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Sayıyı formatlı göster
    if (numericValue === '') return '';
    
    const number = parseInt(numericValue, 10);
    return new Intl.NumberFormat('tr-TR').format(number);
  };

  // Kredi türüne göre aylık faiz oranını belirle
  // Önemli: Burada faiz oranını yüzde olarak değil, ondalık sayı olarak döndürüyoruz
  // %4.39 = 0.0439 olarak hesaplanıyor
  const getAylikFaizOrani = (krediTuru: string) => {
    switch (krediTuru) {
      case 'İhtiyaç Kredisi':
        return 0.0439; // %4.39 aylık
      case 'Konut Kredisi':
        return 0.0259; // %2.59 aylık
      case 'Taşıt Kredisi':
        return aracDurumu === 'Yeni' ? 0.0370 : 0.0387; // Yeni araç: %3.70, İkinci el: %3.87 aylık
      default:
        return 0.0439; // Varsayılan %4.39 aylık
    }
  };

  // Hesaplama fonksiyonu
  const hesaplaKredi = () => {
    try {
      // Değerleri sayıya çevir - string içindeki nokta ve virgülleri temizle
      const taksitStr = aylikTaksit.replace(/[^0-9]/g, '');
      const taksitTutari = parseInt(taksitStr) || 0;
      
      // Aylık faiz oranını hesapla
      const aylikFaiz = getAylikFaizOrani(activeTab);
      
      // Kredi tutarı hesaplama
      // Yeni formül: P = A × [(1+r)^n - 1] / [r(1+r)^n]
      // Burada:
      // P = Kredi tutarı (anapara)
      // A = Aylık taksit tutarı
      // r = Aylık faiz oranı (ondalık olarak)
      // n = Toplam taksit sayısı (vade)
      
      // Önce pay hesaplanır: [(1+r)^n - 1]
      const pay = Math.pow(1 + aylikFaiz, vade) - 1;
      
      // Sonra payda hesaplanır: [r(1+r)^n]
      const payda = aylikFaiz * Math.pow(1 + aylikFaiz, vade);
      
      // Kredi tutarı hesaplanır: A × (pay / payda)
      const krediTutariHesap = taksitTutari * (pay / payda);
      
      // Toplam ödeme = Taksit * Vade
      const toplamOdemeHesap = taksitTutari * vade;
      
      // Toplam faiz = Toplam ödeme - Kredi tutarı
      const toplamFaizHesap = toplamOdemeHesap - krediTutariHesap;
      
      // Sonuçları ayarla - tam değerleri kullan
      setKrediTutari(Math.round(krediTutariHesap * 100) / 100); // Kuruş hassasiyetinde yuvarla
      setAylikFaizOrani(aylikFaiz * 100);
      setToplamOdeme(Math.round(toplamOdemeHesap * 100) / 100); // Kuruş hassasiyetinde yuvarla
      setToplamFaiz(toplamFaizHesap);
      setHesaplamaTamamlandi(true);
    } catch (error) {
      console.error('Hesaplama hatası:', error);
    }
  };

  // Hesapla butonunun aktif olup olmadığını kontrol et
  const isHesaplaButtonDisabled = () => {
    return !aylikTaksit;
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-[#ff3d00] to-[#ff6333] bg-clip-text text-transparent">Taksite Göre Hesapla</h1>
      
      {/* Hesaplama Aracı */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden mb-12 max-w-4xl mx-auto border border-gray-100">
        <div className="p-8">
          {/* Kredi Türü Sekmeleri */}
          <div className="flex flex-wrap mb-8 gap-2">
            {krediTurleri.map((tur) => (
              <button
                key={tur}
                onClick={() => {
                  setActiveTab(tur);
                  setVade(vadeSecenekleri[tur][0]);
                  setHesaplamaTamamlandi(false);
                }}
                className={`flex items-center space-x-2 px-5 py-3 rounded-lg transition-colors duration-200 ${activeTab === tur ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-full ${activeTab === tur ? 'bg-[#ff3d00] text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {tur === 'İhtiyaç Kredisi' && <span className="text-xs">İ</span>}
                  {tur === 'Konut Kredisi' && <span className="text-xs">K</span>}
                  {tur === 'Taşıt Kredisi' && <span className="text-xs">T</span>}
                </div>
                <span className="font-medium">{tur}</span>
              </button>
            ))}
          </div>
          
          {/* Form Alanları - Tek Satırda */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Araç Durumu - Sadece Taşıt Kredisi için */}
            {activeTab === 'Taşıt Kredisi' && (
              <div className="relative w-48" ref={aracDurumuRef}>
                <div className="text-sm font-medium text-gray-700 mb-1">Araç Durumu</div>
                <div 
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                  onClick={() => {
                    setAracDurumuDropdownOpen(!aracDurumuDropdownOpen);
                    setVadeDropdownOpen(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-800">{aracDurumu}</div>
                    <div className="text-[#ff3d00]">
                      <ChevronRight className={`transform transition-transform ${aracDurumuDropdownOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </div>
                
                {isBrowser && aracDurumuDropdownOpen && createPortal(
                  <>
                    <div className="fixed inset-0 bg-transparent z-40" onClick={() => setAracDurumuDropdownOpen(false)}></div>
                    <div 
                      className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: aracDurumuDropdownPosition.width,
                        top: aracDurumuDropdownPosition.top,
                        left: aracDurumuDropdownPosition.left,
                      }}
                    >
                      {aracDurumuSecenekleri.map((durum) => (
                        <div 
                          key={durum} 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                          onClick={() => {
                            setAracDurumu(durum);
                            setAracDurumuDropdownOpen(false);
                            setHesaplamaTamamlandi(false);
                          }}
                        >
                          <div className="font-medium text-gray-800">{durum}</div>
                        </div>
                      ))}
                    </div>
                  </>,
                  document.body
                )}
              </div>
            )}
            
            {/* Aylık Taksit Miktarı */}
            <div className="flex-grow min-w-[200px]">
              <div className="text-sm font-medium text-gray-700 mb-1">Aylık Taksit Miktarı</div>
              <div className="relative">
                <input
                  type="text"
                  value={formatCurrency(aylikTaksit)}
                  onChange={(e) => {
                    setAylikTaksit(e.target.value);
                    setHesaplamaTamamlandi(false);
                  }}
                  placeholder="Taksit miktarını gir"
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-12 font-medium bg-gray-50 shadow-sm transition-all duration-200"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
              </div>
            </div>
            
            {/* Vade Seçimi */}
            <div className="w-48">
              <div className="text-sm font-medium text-gray-700 mb-1">Vade</div>
              <div className="relative" ref={vadeRef}>
                <div 
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                  onClick={() => {
                    setVadeDropdownOpen(!vadeDropdownOpen);
                    setAracDurumuDropdownOpen(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-800">{vade} ay</div>
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
                      {vadeSecenekleri[activeTab].map((ay: number) => (
                        <div 
                          key={ay} 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                          onClick={() => {
                            setVade(ay);
                            setVadeDropdownOpen(false);
                            setHesaplamaTamamlandi(false);
                          }}
                        >
                          <div className="font-medium text-gray-800">{ay} ay</div>
                        </div>
                      ))}
                    </div>
                  </>,
                  document.body
                )}
              </div>
            </div>
            
            {/* Bilgi ikonu */}
            <div className="flex items-center justify-center w-8 h-8 mt-6">
              <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 cursor-help">
                <span className="text-xs font-medium">i</span>
              </div>
            </div>
            
            {/* Hesapla Butonu */}
            <div className="mt-6">
              <button
                onClick={hesaplaKredi}
                disabled={isHesaplaButtonDisabled()}
                className={`flex items-center justify-center space-x-2 py-3 px-6 rounded-xl transition-all duration-300 text-base font-semibold shadow-md ${isHesaplaButtonDisabled() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#ff3d00] hover:bg-[#ff6333] text-white hover:shadow-lg transform hover:-translate-y-0.5'}`}
              >
                <span>Kredi hesapla</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Sonuç Bölümü */}
          {hesaplamaTamamlandi && (
            <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm animate-fadeIn">
              <h2 className="text-xl font-bold mb-6">{formatCurrency(aylikTaksit)} TL aylık taksit ile {vade} ay vadeli {activeTab.toLowerCase()} hesaplaması</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">Kredi Tutarı</div>
                  <div className="text-xl font-bold">
                    {krediTutari ? 
                      new Intl.NumberFormat('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true
                      }).format(krediTutari) : '0,00'} TL
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">Faiz Oranı</div>
                  <div className="text-xl font-bold">%{aylikFaizOrani?.toFixed(2)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">Toplam Geri Ödeme</div>
                  <div className="text-xl font-bold">
                    {toplamOdeme ? 
                      new Intl.NumberFormat('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true
                      }).format(toplamOdeme) : '0,00'} TL
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mt-4">Hesaplamaya diğer masraflar dahil edilmemiştir.</div>
              
              <div className="mt-6">
                <a href="#" className="inline-flex items-center text-[#ff3d00] font-medium hover:text-[#ff6333] transition-colors">
                  Kredi tekliflerini gör <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      

      
      {/* Sık Sorulan Sorular */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6">Sık Sorulan Sorular</h2>
        
        <div className="space-y-4">
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Taksite göre kredi hesaplama nasıl yapılır?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700">
                Taksite göre kredi hesaplama, aylık ödeyebileceğiniz taksit tutarına göre ne kadar kredi çekebileceğinizi hesaplar. Hesaplama için PMT formülünün tersi kullanılır. Bu hesaplamada aylık taksit tutarı, vade ve faiz oranı dikkate alınır.
              </p>
            </div>
          </details>
          
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Kredi hesaplamada kullanılan faiz oranları güncel mi?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700">
                Hesaplama aracımızda kullanılan faiz oranları, piyasadaki ortalama oranları yansıtmaktadır. Ancak, bankaların sunduğu faiz oranları günlük olarak değişebilir. Kesin kredi tutarı ve faiz oranı için bankanızla iletişime geçmenizi öneririz.
              </p>
            </div>
          </details>
          
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Aylık ne kadar taksit ödeyebilirim?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700">
                Finansal uzmanlar, aylık gelirinizin en fazla %30-40'ını kredi ödemelerine ayırmanızı önerir. Örneğin, aylık 10.000 TL geliriniz varsa, tüm kredi ödemeleriniz için 3.000-4.000 TL civarında bir bütçe ayırmanız sağlıklı olacaktır.
              </p>
            </div>
          </details>
          
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Vade uzadıkça neden daha az kredi çekebiliyorum?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700">
                Vade uzadıkça, aynı taksit tutarı için çekebileceğiniz kredi miktarı azalır. Bunun nedeni, uzun vadede ödediğiniz toplam faizin artmasıdır. Daha uzun vade, daha fazla faiz ödemesi anlamına gelir, bu da kredi tutarının daha düşük olmasına neden olur.
              </p>
            </div>
          </details>
          
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Kredi başvurusu için gerekli belgeler nelerdir?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700 mb-4">
                Kredi başvurusu için genellikle aşağıdaki belgeler istenir:
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>Kimlik belgesi (nüfus cüzdanı, ehliyet veya pasaport)</li>
                <li>Gelir belgesi (maaş bordrosu, serbest meslek için vergi levhası)</li>
                <li>İkametgah belgesi veya son 3 aya ait fatura (elektrik, su, doğalgaz)</li>
                <li>Konut kredisi için tapu ve ekspertiz raporu</li>
                <li>Taşıt kredisi için araç ruhsatı ve proforma fatura</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
      
      {/* Bilgilendirme Metni */}
      <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg mt-8">
        <h2 className="text-xl font-semibold mb-4">Taksite Göre Kredi Hesaplama Hakkında</h2>
        <p className="text-gray-700 mb-4">
          Taksite göre kredi hesaplama aracımız, aylık ödeyebileceğiniz taksit tutarına göre ne kadar kredi çekebileceğinizi hesaplar. 
          Bu hesaplama, kredi türüne göre değişen faiz oranları ve seçtiğiniz vade dikkate alınarak yapılır.
        </p>
        <p className="text-gray-700">
          Hesaplama sonuçları tahmini değerlerdir ve bankaların kredi politikalarına göre değişiklik gösterebilir. 
          Kesin kredi tutarı ve koşulları için bankanızla iletişime geçmenizi öneririz.
        </p>
      </div>
    </div>
  );
}
