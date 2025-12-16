"use client";

import { useState } from 'react';
import Image from 'next/image';

interface KrediHesaplamaProps {
  krediTipi?: string;
  minTutar?: number;
  maxTutar?: number;
  resimUrl?: string;
  ustBaslik?: string;
  ustAciklama?: string;
}

export default function AnasayfaKrediHesaplama({
  krediTipi = 'ihtiyac',
  minTutar = 10000,
  maxTutar = 10000000,
  resimUrl = '/images/happy-family-home.jpg',
  ustBaslik = 'Hayalinizdeki Eve Kavuşun',
  ustAciklama = 'Uygun faizli konut kredisi fırsatlarıyla ailenizle mutlu bir yaşam kurun'
}: KrediHesaplamaProps) {
  
  const [activeTab, setActiveTab] = useState<string>(krediTipi);
  const [tutar, setTutar] = useState<string>('100.000');
  const [tutarError, setTutarError] = useState<boolean>(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTutarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sadece sayıları al
    const value = e.target.value.replace(/\D/g, '');
    
    // Boşsa boş olarak bırak
    if (!value) {
      setTutar('');
      setTutarError(false);
      return;
    }
    
    // Sayıyı tam sayıya çevir
    const numValue = parseInt(value, 10);
    
    // Min/max kontrolü
    if (numValue < minTutar || numValue > maxTutar) {
      setTutarError(true);
    } else {
      setTutarError(false);
    }
    
    // Binlik ayraçlı formata çevir
    setTutar(numValue.toLocaleString('tr-TR'));
  };

  return (
    <div className="container mx-auto bg-gradient-to-br from-orange-50/30 to-orange-50/10 rounded-2xl p-4 mb-10 shadow-lg border border-orange-50">
      <h2 className="text-2xl font-semibold text-orange-500 mb-4 text-center md:text-left">Kredi</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        <button 
          className={`py-4 px-3 ${activeTab === 'ihtiyac' ? 'bg-gradient-to-br from-orange-500/90 to-orange-500 text-white shadow-md transform hover:scale-105' : 'bg-white/90 text-gray-600 hover:bg-orange-500/10 hover:text-orange-500'} font-medium transition-all duration-300 rounded-lg focus:outline-none`}
          onClick={() => handleTabChange('ihtiyac')}
        >
          <span className="flex justify-center items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg>
            İhtiyaç
          </span>
        </button>
        <button 
          className={`py-4 px-3 ${activeTab === 'konut' ? 'bg-gradient-to-br from-orange-500/90 to-orange-500 text-white shadow-md transform hover:scale-105' : 'bg-white/90 text-gray-600 hover:bg-orange-500/10 hover:text-orange-500'} font-medium transition-all duration-300 rounded-lg focus:outline-none`}
          onClick={() => handleTabChange('konut')}
        >
          <span className="flex justify-center items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            Konut
          </span>
        </button>
        <button 
          className={`py-4 px-3 ${activeTab === 'tasit' ? 'bg-gradient-to-br from-orange-500/90 to-orange-500 text-white shadow-md transform hover:scale-105' : 'bg-white/90 text-gray-600 hover:bg-orange-500/10 hover:text-orange-500'} font-medium transition-all duration-300 rounded-lg focus:outline-none`}
          onClick={() => handleTabChange('tasit')}
        >
          <span className="flex justify-center items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path><path d="M3 4h3.879a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15a1 1 0 011 1v3H2V5a1 1 0 011-1zm0 3h2v2H3V7z"></path><path d="M2 12v3a1 1 0 001 1h14a1 1 0 001-1v-3H2z"></path></svg>
            Taşıt
          </span>
        </button>
        <button 
          className={`py-4 px-3 ${activeTab === 'kobi' ? 'bg-gradient-to-br from-orange-500/90 to-orange-500 text-white shadow-md transform hover:scale-105' : 'bg-white/90 text-gray-600 hover:bg-orange-500/10 hover:text-orange-500'} font-medium transition-all duration-300 rounded-lg focus:outline-none`}
          onClick={() => handleTabChange('kobi')}
        >
          <span className="flex justify-center items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7H7v6h6V7z"></path><path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd"></path></svg>
            Kobi
          </span>
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Sol Sütun - Görsel */}
        <div className="lg:w-1/2 rounded-xl overflow-hidden relative group" style={{height: '280px'}}>
          <Image 
            src={resimUrl} 
            alt="Kredi Görsel" 
            width={420} 
            height={280} 
            className="object-cover w-full h-full rounded-xl transition-all duration-700 group-hover:scale-110" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/80 via-orange-500/30 to-transparent flex flex-col justify-start p-6 text-white">
            <h3 className="text-xl font-bold drop-shadow-md mt-3">{ustBaslik}</h3>
            <p className="text-white/90 text-sm md:text-base">{ustAciklama}</p>
          </div>
        </div>
        
        {/* Sağ Sütun - Form Alanları */}
        <div className="lg:w-1/2 bg-white p-6 rounded-xl shadow-md" style={{height: '280px', overflowY: 'auto'}}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Kredi Tutarı</label>
            <div className="relative">
              <input 
                type="text" 
                id="creditAmount"
                value={tutar}
                className="w-full p-4 pl-7 border border-orange-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg" 
                placeholder="Örn: 500.000"
                onChange={handleTutarChange}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-orange-500">₺</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₺</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-xs text-gray-500">Min: {minTutar.toLocaleString('tr-TR')}₺</span>
              <span className="text-xs text-gray-500">Max: {maxTutar.toLocaleString('tr-TR')}₺</span>
            </div>
            {tutarError && 
              <p className="text-red-500 text-xs mt-1">
                Girilen tutar {minTutar.toLocaleString('tr-TR')}₺ ile {maxTutar.toLocaleString('tr-TR')}₺ arasında olmalıdır.
              </p>
            }
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Vade</label>
            <div className="relative">
              <select defaultValue="24" className="w-full p-4 border border-orange-200 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg">
                <option value="12">12 ay</option>
                <option value="24">24 ay</option>
                <option value="36">36 ay</option>
                <option value="48">48 ay</option>
                <option value="60">60 ay</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium rounded-lg hover:shadow-lg hover:from-orange-600 hover:to-orange-500 transition-all duration-300 transform hover:-translate-y-1">
            <span className="flex justify-center items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              Kredi Hesapla
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
