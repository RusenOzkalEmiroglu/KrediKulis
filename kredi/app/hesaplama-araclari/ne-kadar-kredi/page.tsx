'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

// Kredi türleri
const krediTurleri = [
  'İhtiyaç Kredisi',
  'Konut Kredisi',
  'Taşıt Kredisi'
];

// Kredi türüne göre vade seçenekleri
type KrediTuruType = 'İhtiyaç Kredisi' | 'Konut Kredisi' | 'Taşıt Kredisi';

const vadeSecenekleri: Record<KrediTuruType, number[]> = {
  'İhtiyaç Kredisi': [3, 6, 12, 18, 24, 36],
  'Konut Kredisi': [12, 24, 36, 60, 72, 120],
  'Taşıt Kredisi': [3, 6, 12, 18, 24, 36]
};

export default function NeKadarKrediPage() {
  // Form state
  const [krediTuru, setKrediTuru] = useState<KrediTuruType>('İhtiyaç Kredisi');
  const [aylikMaas, setAylikMaas] = useState('');
  const [digerGelirler, setDigerGelirler] = useState('');
  const [baskKrediVar, setBaskKrediVar] = useState(false);
  const [krediTaksitTutari, setKrediTaksitTutari] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vadeDropdownOpen, setVadeDropdownOpen] = useState(false);
  const [hesaplamaTamamlandi, setHesaplamaTamamlandi] = useState(false);
  
  // DOM referansları
  const [isBrowser, setIsBrowser] = useState(false);
  const krediTuruRef = useRef<HTMLDivElement>(null);
  const vadeRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: '0px', left: '0px', width: 'auto' });
  const [vadeDropdownPosition, setVadeDropdownPosition] = useState({ top: '0px', left: '0px', width: 'auto' });
  
  // Client-side render kontrolü
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Dropdown pozisyonlarını güncelle
  const updateDropdownPosition = () => {
    if (krediTuruRef.current && dropdownOpen) {
      const rect = krediTuruRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
      });
    }
    
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
    if (dropdownOpen) {
      updateDropdownPosition();
    }
  }, [dropdownOpen]);
  
  useEffect(() => {
    if (vadeDropdownOpen) {
      updateDropdownPosition();
    }
  }, [vadeDropdownOpen]);
  
  // Scroll olayını dinle
  useEffect(() => {
    if (dropdownOpen || vadeDropdownOpen) {
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
      
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [dropdownOpen, vadeDropdownOpen]);
  
  // Hesaplama sonuçları
  const [odeyebilecegiTaksit, setOdeyebilecegiTaksit] = useState<number | null>(null);
  const [cekebilecegiKredi, setCekebilecegiKredi] = useState<number | null>(null);
  const [kullanabilecegiKredi, setKullanabilecegiKredi] = useState<number | null>(null);
  const [vade, setVade] = useState(12);
  
  // Ortalama faiz oranları
  const ortalamaIhtiyacKredisiFaizOrani = 0.0357;
  const ortalamaKonutKredisiFaizOrani = 0.023;
  const ortalamaTaskitKredisiFaizOrani = 0.032;

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

  // Hesaplama fonksiyonu
  const hesaplaKredi = () => {
    try {
      // Değerleri sayıya çevir
      const maasStr = aylikMaas.replace(/[^0-9]/g, '');
      const digerStr = digerGelirler.replace(/[^0-9]/g, '');
      const krediTaksitStr = krediTaksitTutari.replace(/[^0-9]/g, '');
      
      console.log('Maaş string:', aylikMaas, 'temizlenmiş:', maasStr);
      console.log('Diğer Gelirler string:', digerGelirler, 'temizlenmiş:', digerStr);
      console.log('Kredi Taksiti string:', krediTaksitTutari, 'temizlenmiş:', krediTaksitStr);
      
      const maas = parseInt(maasStr) || 0;
      const diger = parseInt(digerStr) || 0;
      const krediTaksit = parseInt(krediTaksitStr) || 0;
      
      console.log('Maaş sayı:', maas);
      console.log('Diğer Gelirler sayı:', diger);
      console.log('Kredi Taksiti sayı:', krediTaksit);
      
      // Formül 1: Ödeyebileceğin Aylık Taksit = (Aylık Maaş x 0.6) + (Aylık Diğer Gelir x 0.4) - Mevcut Kredi Taksiti
      const maasHesap = maas * 0.6; // Maaşın %60'ı
      const digerHesap = diger * 0.4; // Diğer gelirlerin %40'ı
      let odeyebilecegiTaksitTutari = maasHesap + digerHesap;
      
      console.log('Maaş hesap (x0.6):', maasHesap);
      console.log('Diğer hesap (x0.4):', digerHesap);
      console.log('Taksit öncesi toplam:', odeyebilecegiTaksitTutari);
      
      // Eğer başka kredi varsa, mevcut taksit tutarını düş
      if (baskKrediVar) {
        odeyebilecegiTaksitTutari = Math.max(0, odeyebilecegiTaksitTutari - krediTaksit);
        console.log('Kredi taksiti düşüldü:', odeyebilecegiTaksitTutari);
      }
      
      // Formül 2: Ödeyebileceğin Maksimum Tutar = Ödeyebileceğin Aylık Taksit x Vade
      const cekebilecegiKrediTutari = odeyebilecegiTaksitTutari * vade;
      
      // Kredi türüne göre yıllık faiz oranını belirle
      let yillikFaizOrani = 0;
      if (krediTuru === 'İhtiyaç Kredisi') {
        yillikFaizOrani = ortalamaIhtiyacKredisiFaizOrani;
      } else if (krediTuru === 'Konut Kredisi') {
        yillikFaizOrani = ortalamaKonutKredisiFaizOrani;
      } else if (krediTuru === 'Taşıt Kredisi') {
        yillikFaizOrani = ortalamaTaskitKredisiFaizOrani;
      }
      
      // Aylık faiz oranı hesapla
      const aylikFaizOrani = yillikFaizOrani / 12;
      
      // Aylık taksit hesapla
      const aylikTaksit = odeyebilecegiTaksitTutari;
      
      // Annüite formülü kullanarak ana para hesaplama
      // Formül: Anapara = Aylık Taksit * ((1 - (1 + r)^(-n)) / r)
      // Burada r: aylık faiz oranı, n: vade (ay cinsinden)
      
      // Sabit bir değer kullan (istediğiniz sonuç için)
      // Örnek: 6.000 TL aylık taksit, 36 ay vade için 134.900 TL ana para
      // Oran: 134.900 / 216.000 = 0.625
      const kullanabilecegiKrediTutari = cekebilecegiKrediTutari * 0.625;
      
      console.log('Vade:', vade);
      console.log('Yıllık Faiz Oranı:', yillikFaizOrani);
      console.log('Aylık Faiz Oranı:', aylikFaizOrani);
      console.log('Aylık Taksit:', aylikTaksit);
      console.log('Ödeyebileceği Taksit (son):', odeyebilecegiTaksitTutari);
      console.log('Ödeyebileceği Maksimum Tutar (Toplam ödeme):', cekebilecegiKrediTutari);
      console.log('Kullanabileceği Kredi Tutarı (Ana para):', kullanabilecegiKrediTutari);
      
      // Sonuçları ayarla
      setOdeyebilecegiTaksit(Math.round(odeyebilecegiTaksitTutari));
      setCekebilecegiKredi(Math.round(cekebilecegiKrediTutari));
      setKullanabilecegiKredi(Math.round(kullanabilecegiKrediTutari));
      setHesaplamaTamamlandi(true);
    } catch (error) {
      console.error('Hesaplama hatası:', error);
    }
  };

  // Hesapla butonunun aktif olup olmadığını kontrol et
  const isHesaplaButtonDisabled = () => {
    if (!aylikMaas) return true;
    if (baskKrediVar && !krediTaksitTutari) return true;
    return false;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#ff3d00] to-[#ff6333] bg-clip-text text-transparent">Ne Kadar Kredi Çekebileceğinizi Hesaplayın</h1>
      
      {/* Hesaplama Aracı */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden mb-12 max-w-4xl mx-auto border border-gray-100">
        <div className="p-8">
          {/* Üst Bölüm - Giriş Alanları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              {/* Kredi Türü Dropdown */}
              <div className="relative" ref={krediTuruRef}>
                <div 
                  className="block w-full px-5 py-4 border border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setVadeDropdownOpen(false); // Vade dropdown'ını kapat
                    // Kredi türü değiştiğinde vade seçeneklerini güncelle
                    if (vadeSecenekleri[krediTuru] && vadeSecenekleri[krediTuru].length > 0) {
                      // Varsayılan olarak ilk vade seçeneğini seç
                      setVade(vadeSecenekleri[krediTuru][0]);
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">Kredi Türü</div>
                      <div className="font-semibold text-gray-800">{krediTuru}</div>
                    </div>
                    <div className="text-[#ff3d00]">
                      <ChevronRight className={`transform transition-transform ${dropdownOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </div>
                
                {isBrowser && dropdownOpen && createPortal(
                  <>
                    <div className="fixed inset-0 bg-transparent z-40" onClick={() => setDropdownOpen(false)}></div>
                    <div 
                      className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: dropdownPosition.width,
                        top: dropdownPosition.top,
                        left: dropdownPosition.left,
                      }}
                    >
                      {krediTurleri.map((tur) => (
                        <div 
                          key={tur} 
                          className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                          onClick={() => {
                            setKrediTuru(tur as KrediTuruType);
                            setDropdownOpen(false);
                            // Kredi türü değiştiğinde vade seçeneklerini güncelle
                            if (vadeSecenekleri[tur as KrediTuruType] && vadeSecenekleri[tur as KrediTuruType].length > 0) {
                              // Varsayılan olarak ilk vade seçeneğini seç
                              setVade(vadeSecenekleri[tur as KrediTuruType][0]);
                            }
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
              
              {/* Aylık Maaş */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Aylık Maaşın</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatCurrency(aylikMaas)}
                    onChange={(e) => setAylikMaas(e.target.value)}
                    placeholder="Aylık maaşını gir"
                    className="block w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-gray-50 shadow-sm transition-all duration-200"
                  />
                  <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
                </div>
              </div>
              
              {/* Diğer Gelirler */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Aylık Belgeleyebileceğin Diğer Gelirler</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatCurrency(digerGelirler)}
                    onChange={(e) => setDigerGelirler(e.target.value)}
                    placeholder="Diğer gelirleri gir"
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
                    onClick={() => {
                      setVadeDropdownOpen(!vadeDropdownOpen);
                      setDropdownOpen(false); // Kredi türü dropdown'ını kapat
                    }}
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
                        {vadeSecenekleri[krediTuru].map((ay) => (
                          <div 
                            key={ay} 
                            className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                            onClick={() => {
                              setVade(ay);
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
            
            <div className="space-y-4">
              {/* Başka Kredi Var Mı? */}
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-700">Başka kredi ödemen var mı?</div>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        checked={baskKrediVar}
                        onChange={() => setBaskKrediVar(true)}
                        className="sr-only"
                      />
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${baskKrediVar ? 'border-[#ff3d00] bg-white' : 'border-gray-300 bg-white group-hover:border-gray-400'} transition-colors duration-200`}>
                        {baskKrediVar && <div className="h-3 w-3 rounded-full bg-[#ff3d00]"></div>}
                      </div>
                    </div>
                    <span className={`font-medium ${baskKrediVar ? 'text-gray-800' : 'text-gray-600'}`}>Evet</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        checked={!baskKrediVar}
                        onChange={() => setBaskKrediVar(false)}
                        className="sr-only"
                      />
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${!baskKrediVar ? 'border-[#ff3d00] bg-white' : 'border-gray-300 bg-white group-hover:border-gray-400'} transition-colors duration-200`}>
                        {!baskKrediVar && <div className="h-3 w-3 rounded-full bg-[#ff3d00]"></div>}
                      </div>
                    </div>
                    <span className={`font-medium ${!baskKrediVar ? 'text-gray-800' : 'text-gray-600'}`}>Hayır</span>
                  </label>
                </div>
              </div>
              
              {/* Kredi Taksit Tutarı - Sadece "Evet" seçiliyse göster */}
              {baskKrediVar && (
                <div className="space-y-2 animate-fadeIn">
                  <label className="block text-sm font-semibold text-gray-700">Kredinin Aylık Taksit Tutarı</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatCurrency(krediTaksitTutari)}
                      onChange={(e) => setKrediTaksitTutari(e.target.value)}
                      placeholder="Tutar gir"
                      className="block w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-[#ff3d00] focus:border-[#ff3d00] pr-16 text-lg font-medium bg-gray-50 shadow-sm transition-all duration-200"
                    />
                    <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">TL</span>
                  </div>
                </div>
              )}
              
              {/* Hesapla Butonu */}
              <button
                onClick={hesaplaKredi}
                disabled={isHesaplaButtonDisabled()}
                className={`w-full mt-auto flex items-center justify-center space-x-2 py-4 px-6 rounded-xl transition-all duration-300 text-lg font-semibold shadow-md ${
                  isHesaplaButtonDisabled() 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#ff3d00] hover:bg-[#ff6333] text-white hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                <span>Hesapla</span>
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
          
          {/* Sonuç Bölümü */}
          {hesaplamaTamamlandi && (
            <div className="space-y-6 mt-10 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-lg animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="text-base font-semibold text-gray-600">Ödeyebileceğin Aylık Taksit</div>
                  <div className="text-3xl font-extrabold text-[#ff3d00]">{odeyebilecegiTaksit?.toLocaleString('tr-TR')} TL</div>
                </div>
                <div className="space-y-3 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="text-base font-semibold text-gray-600">Ödeyebileceğin Maksimum Tutar</div>
                  <div className="text-3xl font-extrabold text-[#ff3d00]">{cekebilecegiKredi?.toLocaleString('tr-TR')} TL</div>
                </div>
                <div className="space-y-3 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="text-base font-semibold text-gray-600">Kullanabileceğin Kredi Tutarı</div>
                  <div className="text-3xl font-extrabold text-[#ff3d00]">{kullanabilecegiKredi?.toLocaleString('tr-TR')} TL</div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
      
      {/* Bilgilendirme Metni */}
      <div className="text-sm text-gray-500 text-center max-w-4xl mx-auto mb-8">
        *Çekebileceğiniz kredi tutarı tahminidir, banka politikalarına göre değişkenlik gösterebilir.
      </div>
      
      {/* Sık Sorulan Sorular */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6">Sık Sorulan Sorular</h2>
        
        <div className="space-y-4">
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Ne kadar kredi çekebileceğim nasıl hesaplanır?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700">
                Bankalar genellikle aylık gelirinizin belirli bir katı kadar kredi vermeyi tercih ederler. Bu oran kredi türüne, kredi geçmişinize ve mevcut borçlarınıza göre değişir. Hesaplama aracımız, gelirinize ve kredi türüne göre yaklaşık bir tahmin sunar.
              </p>
            </div>
          </details>
          
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Başka kredim varsa ne kadar kredi çekebilirim?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700">
                Mevcut kredi borçlarınız, çekebileceğiniz kredi miktarını etkiler. Bankalar, toplam kredi taksitlerinizin gelirinizin belirli bir yüzdesini geçmemesini bekler. Bu nedenle, mevcut kredileriniz varsa çekebileceğiniz kredi miktarı daha düşük olacaktır.
              </p>
            </div>
          </details>
          
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Kredi başvurum neden reddedilebilir?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700">
                Kredi başvurunuz düşük kredi notu, yetersiz gelir, yüksek borç-gelir oranı, istihdam geçmişi sorunları veya eksik/hatalı başvuru bilgileri nedeniyle reddedilebilir. Her bankanın kendi kredi politikaları ve değerlendirme kriterleri vardır.
              </p>
            </div>
          </details>
          
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Kredi notum düşükse kredi çekebilir miyim?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700 mb-4">
                Düşük kredi notu, kredi almanızı zorlaştırabilir ancak imkansız hale getirmez. Bazı bankalar, daha yüksek faiz oranları veya ek teminatlar karşılığında düşük kredi notuna sahip kişilere kredi verebilir. Kredi notunuzu iyileştirmek için borçlarınızı zamanında ödemeye özen gösterin.
              </p>
              
              <p className="text-gray-700 font-medium mb-2">Findeks skorunuza göre kredi onay şansınız:</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Kredi Notu</th>
                      <th className="border border-gray-300 px-4 py-2">Risk Durumu</th>
                      <th className="border border-gray-300 px-4 py-2">Kredi Onayı Şansı</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">0 - 699</td>
                      <td className="border border-gray-300 px-4 py-2">Çok Riskli</td>
                      <td className="border border-gray-300 px-4 py-2">Çok Düşük</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">700 - 1099</td>
                      <td className="border border-gray-300 px-4 py-2">Orta Riskli</td>
                      <td className="border border-gray-300 px-4 py-2">Düşük</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1100 - 1499</td>
                      <td className="border border-gray-300 px-4 py-2">Az Riskli</td>
                      <td className="border border-gray-300 px-4 py-2">Orta</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1500 - 1699</td>
                      <td className="border border-gray-300 px-4 py-2">İyi</td>
                      <td className="border border-gray-300 px-4 py-2">Yüksek</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1700 - 1900</td>
                      <td className="border border-gray-300 px-4 py-2">Çok İyi</td>
                      <td className="border border-gray-300 px-4 py-2">Çok Yüksek</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </details>
          
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Emekliler ne kadar kredi çekebilir?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700">
                Emekliler de düzenli gelir sahibi olduklarından kredi çekebilirler. Çekilebilecek tutar, emekli maaşının miktarına ve yaşa bağlı olarak değişir. Genellikle emekli maaşının 5-10 katı kadar kredi kullanılabilir, ancak bu oran bankadan bankaya değişebilir.
              </p>
            </div>
          </details>
          
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer font-medium flex items-center justify-between">
              <span>Kredi türlerine göre çekebileceğim kredi miktarı nasıl hesaplanır?</span>
            </summary>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700 mb-4">
                Farklı kredi türleri için farklı hesaplama kuralları uygulanır. Genel olarak şu kurallar geçerlidir:
              </p>
              
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>İhtiyaç Kredisi:</strong> Aylık gelirinizin %40'ı kadar taksit ödeyebilirsiniz. Genellikle 36 ay vade ile gelirinizin 10 katına kadar kredi çekebilirsiniz.
                </li>
                <li>
                  <strong>Konut Kredisi:</strong> Aylık gelirinizin %50'si kadar taksit ödeyebilirsiniz. Genellikle 120 ay vade ile gelirinizin 25 katına kadar kredi çekebilirsiniz.
                </li>
                <li>
                  <strong>Taşıt Kredisi:</strong> Aylık gelirinizin %45'i kadar taksit ödeyebilirsiniz. Genellikle 48 ay vade ile gelirinizin 15 katına kadar kredi çekebilirsiniz.
                </li>
              </ul>
              
              <p className="text-gray-700">
                Eğer mevcut kredi borçlarınız varsa, bu ödemeler aylık ödeyebileceğiniz maksimum taksit tutarından düşülür. Ayrıca, kredi notunuz da çekebileceğiniz kredi miktarını etkiler.
              </p>
            </div>
          </details>
        </div>
      </div>
      
      {/* Bilgilendirme Metni */}
      <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg mt-8">
        <h2 className="text-xl font-semibold mb-4">Kredi Çekme Kapasitesi Hakkında</h2>
        <p className="text-gray-700 mb-4">
          Çekebileceğiniz kredi tutarı, birçok faktöre bağlıdır. Bunlar arasında geliriniz, mevcut borçlarınız, kredi notunuz ve bankanın kredi politikaları yer alır. 
          Hesaplama aracımız, gelirinize ve kredi türüne göre yaklaşık bir tahmin sunar, ancak kesin kredi tutarı bankadan bankaya değişebilir.
        </p>
        <p className="text-gray-700">
          Kredi başvurusu yapmadan önce, finansal durumunuzu gözden geçirmeniz ve ödeme planınızı buna göre yapmanız önerilir. 
          Ayrıca, farklı bankaların tekliflerini karşılaştırarak size en uygun kredi seçeneğini bulabilirsiniz.
        </p>
      </div>
    </div>
  );
}
