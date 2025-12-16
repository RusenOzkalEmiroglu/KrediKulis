"use client";

import { useState } from 'react';

// Define the structure for Kredi tabs
const krediTabs = [
  { id: 'ihtiyac', label: 'İhtiyaç' },
  { id: 'konut', label: 'Konut' },
  { id: 'tasit', label: 'Taşıt' },
  { id: 'kobi', label: 'Kobi' },
];

// Define the structure for Varlık tabs
const varlikTabs = [
  { id: 'mevduat', label: 'Mevduat' },
  { id: 'doviz', label: 'Döviz' },
  { id: 'altin', label: 'Altın' },
];

// Define Vade options for İhtiyaç Kredisi
const ihtiyacVadeOptions = [
  { value: '3', label: '3 ay' },
  { value: '6', label: '6 ay' },
  { value: '12', label: '12 ay' },
  { value: '18', label: '18 ay' },
  { value: '24', label: '24 ay' },
  { value: '36', label: '36 ay' },
  { value: '48', label: '48 ay' },
  { value: '60', label: '60 ay' },
];

// Define Vade options for Konut Kredisi
const konutVadeOptions = [
  { value: '12', label: '12 ay' },
  { value: '24', label: '24 ay' },
  { value: '36', label: '36 ay' },
  { value: '48', label: '48 ay' },
  { value: '60', label: '60 ay' },
  { value: '84', label: '84 ay' },
  { value: '96', label: '96 ay' },
  { value: '120', label: '120 ay' },
  { value: '240', label: '240 ay' },
];

export default function AnasayfaHesaplamaTabs() {
  const [activeKrediTab, setActiveKrediTab] = useState<string>('ihtiyac'); 
  const [activeVarlikTab, setActiveVarlikTab] = useState<string>('mevduat');

  // State for Ihtiyac Kredi calculator
  const [ihtiyacTutar, setIhtiyacTutar] = useState<string>('100.000'); // Default example
  const [ihtiyacVade, setIhtiyacVade] = useState<string>('24'); // Default example
  const [isIhtiyacVadeDropdownOpen, setIsIhtiyacVadeDropdownOpen] = useState<boolean>(false);
  
  // State for Konut Kredi calculator
  const [konutTutar, setKonutTutar] = useState<string>('1.000.000'); // Default for housing loan
  const [konutVade, setKonutVade] = useState<string>('120'); // Default for housing loan
  const [isKonutVadeDropdownOpen, setIsKonutVadeDropdownOpen] = useState<boolean>(false);
  
  // State for Tasit Kredi calculator
  const [tasitTutar, setTasitTutar] = useState<string>('500.000'); // Default for vehicle loan
  const [tasitVade, setTasitVade] = useState<string>('36'); // Default for vehicle loan
  const [isTasitVadeDropdownOpen, setIsTasitVadeDropdownOpen] = useState<boolean>(false);
  const [tasitTipi, setTasitTipi] = useState<string>('yeni'); // 'yeni' or 'ikinci-el'
  
  // State for Kobi Kredi calculator
  const [kobiTutar, setKobiTutar] = useState<string>('250.000'); // Default for business loan
  const [kobiVade, setKobiVade] = useState<string>('24'); // Default for business loan
  const [isKobiVadeDropdownOpen, setIsKobiVadeDropdownOpen] = useState<boolean>(false);
  
  // State for Mevduat calculator
  const [mevduatTutar, setMevduatTutar] = useState<string>('50.000'); // Default for deposit
  const [mevduatVade, setMevduatVade] = useState<string>('32'); // Default for deposit in days
  const [isMevduatVadeDropdownOpen, setIsMevduatVadeDropdownOpen] = useState<boolean>(false);
  
  // State for Döviz calculator
  const [hesaplamaType, setHesaplamaType] = useState<'alis' | 'satis'>('alis');
  const [selectedCurrencyType, setSelectedCurrencyType] = useState<string>('USD');
  const [dovizAmount, setDovizAmount] = useState<string>('1');
  const [calculatedPrice, setCalculatedPrice] = useState<string>('0,00');
  const [isDovizTypeDropdownOpen, setIsDovizTypeDropdownOpen] = useState<boolean>(false);
  
  // State for Altın calculator
  const [altinHesaplamaType, setAltinHesaplamaType] = useState<'alis' | 'satis'>('alis');
  const [selectedGoldType, setSelectedGoldType] = useState<string>('ALTIN (TL/GR)');
  const [goldAmount, setGoldAmount] = useState<string>('1');
  const [calculatedGoldPrice, setCalculatedGoldPrice] = useState<string>('0,00');
  const [isGoldTypeDropdownOpen, setIsGoldTypeDropdownOpen] = useState<boolean>(false);
  
  // Mock döviz kurları
  const dovizKurlari = [
    {
      code: 'USD',
      name: 'Amerikan Doları',
      buyRate: '32.4500',
      sellRate: '32.5500'
    },
    {
      code: 'EUR',
      name: 'Euro',
      buyRate: '35.2500',
      sellRate: '35.3500'
    },
    {
      code: 'GBP',
      name: 'İngiliz Sterlini',
      buyRate: '41.3500',
      sellRate: '41.4500'
    },
    {
      code: 'CHF',
      name: 'İsviçre Frangı',
      buyRate: '36.2500',
      sellRate: '36.3500'
    },
    {
      code: 'JPY',
      name: 'Japon Yeni',
      buyRate: '0.2100',
      sellRate: '0.2150'
    }
  ];
  
  // Mock altın fiyatları
  const goldPrices = [
    {
      name: 'ALTIN (TL/GR)',
      buyPrice: '4.160,45',
      sellPrice: '4.160,92',
      change: '2,06%',
      updateTime: '11:32'
    },
    {
      name: '22 Ayar Bilezik',
      buyPrice: '3.819,05',
      sellPrice: '3.854,06',
      change: '1,41%',
      updateTime: '11:32'
    },
    {
      name: 'Altın (ONS)',
      buyPrice: '3.392,67',
      sellPrice: '3.393,06',
      change: '1,97%',
      updateTime: '11:47'
    },
    {
      name: 'Cumhuriyet Altını',
      buyPrice: '27.308,00',
      sellPrice: '27.500,00',
      change: '2,01%',
      updateTime: '11:32'
    },
    {
      name: 'Yarım Altın',
      buyPrice: '13.696,00',
      sellPrice: '13.802,00',
      change: '2,01%',
      updateTime: '11:32'
    },
    {
      name: 'Çeyrek Altın',
      buyPrice: '6.850,00',
      sellPrice: '6.902,00',
      change: '2,03%',
      updateTime: '11:31'
    }
  ];

  const handleIhtiyacTutarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    if (!value) {
        setIhtiyacTutar('');
        return;
    }
    const numValue = parseInt(value, 10);
    setIhtiyacTutar(numValue.toLocaleString('tr-TR'));
  };
  
  const handleKonutTutarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    if (!value) {
        setKonutTutar('');
        return;
    }
    const numValue = parseInt(value, 10);
    setKonutTutar(numValue.toLocaleString('tr-TR'));
  };
  
  const handleTasitTutarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    if (!value) {
        setTasitTutar('');
        return;
    }
    const numValue = parseInt(value, 10);
    setTasitTutar(numValue.toLocaleString('tr-TR'));
  };
  
  const handleKobiTutarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    if (!value) {
        setKobiTutar('');
        return;
    }
    const numValue = parseInt(value, 10);
    setKobiTutar(numValue.toLocaleString('tr-TR'));
  };
  
  const handleMevduatTutarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    if (!value) {
        setMevduatTutar('');
        return;
    }
    const numValue = parseInt(value, 10);
    setMevduatTutar(numValue.toLocaleString('tr-TR'));
  };
  
  const handleDovizAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d,]/g, ''); // Remove non-digits except comma
    setDovizAmount(value);
    calculateDovizPrice();
  };
  
  const handleGoldAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sadece sayı ve virgül girişine izin ver
    const value = e.target.value.replace(/[^\d,]/g, '');
    setGoldAmount(value);
    calculateGoldPrice();
  };
  
  // Döviz hesaplama fonksiyonu
  const calculateDovizPrice = () => {
    if (!dovizAmount) {
      setCalculatedPrice('0,00');
      return;
    }
    
    // Seçilen döviz türünü bul
    const selectedCurrency = dovizKurlari.find(doviz => doviz.code === selectedCurrencyType);
    if (!selectedCurrency) {
      setCalculatedPrice('0,00');
      return;
    }
    
    // Alış veya satış fiyatını al
    const priceStr = hesaplamaType === 'alis' ? selectedCurrency.buyRate : selectedCurrency.sellRate;
    
    // Fiyatı sayıya çevir (nokta ve virgül işlemleri)
    const price = parseFloat(priceStr.replace(/\./g, '').replace(',', '.'));
    
    // Miktarı sayıya çevir
    const amountNum = parseFloat(dovizAmount.replace(/\./g, '').replace(',', '.') || '0');
    
    // Hesaplama yap
    const result = price * amountNum;
    
    // Sonuç formatı
    setCalculatedPrice(new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result));
  };
  
  // Altın hesaplama fonksiyonu
  const calculateGoldPrice = () => {
    if (!goldAmount) {
      setCalculatedGoldPrice('0,00');
      return;
    }
    
    // Seçilen altın türünü bul
    const selectedGold = goldPrices.find(gold => gold.name === selectedGoldType);
    if (!selectedGold) {
      setCalculatedGoldPrice('0,00');
      return;
    }
    
    // Alış veya satış fiyatını al
    const priceStr = altinHesaplamaType === 'alis' ? selectedGold.buyPrice : selectedGold.sellPrice;
    
    // Fiyatı sayıya çevir (nokta ve virgül işlemleri)
    const price = parseFloat(priceStr.replace(/\./g, '').replace(',', '.'));
    
    // Miktarı sayıya çevir
    const amountNum = parseFloat(goldAmount.replace(/\./g, '').replace(',', '.') || '0');
    
    // Hesaplama yap
    const result = price * amountNum;
    
    // Sonuç formatı
    setCalculatedGoldPrice(new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result));
  };
  
  const handleTasitTipiChange = (tipi: string) => {
    setTasitTipi(tipi);
  };

  return (
    <div className="rounded-2xl p-6 shadow-md border border-gray-200 mb-10"> 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kredi Sütunu */}
        <div className="flex flex-col bg-[#f5efed] p-4 rounded-xl">
          <h2 className="text-2xl font-semibold text-[#ff3d00] mb-4 text-center">Kredi</h2> 
          {/* Kredi Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
            {krediTabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-3 px-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none ${ 
                  activeKrediTab === tab.id
                    ? 'bg-gradient-to-br from-[#ff3d00] to-[#ff3d00]/90 text-white shadow-md'
                    : 'bg-white/80 text-gray-700 hover:bg-[#ff3d00]/10 hover:text-[#ff3d00]'
                }`}
                onClick={() => setActiveKrediTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Kredi Tab Content */}
          <div className="bg-white p-4 rounded-lg shadow-inner min-h-[200px] flex flex-col justify-center">
            {activeKrediTab === 'ihtiyac' && (
              <div className="w-full">
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  {/* Tutar Input */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-4" style={{ height: '100px' }}>
                      <div className="flex justify-between items-center h-full">
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-1">Almak İstediğiniz Kredi Tutarı</div>
                          <div className="relative">
                            <input 
                              type="text"
                              id="ihtiyac-tutar"
                              value={ihtiyacTutar}
                              onChange={handleIhtiyacTutarChange}
                              className="w-full py-1 bg-transparent border-0 focus:ring-0 text-lg font-semibold text-gray-800"
                              placeholder='100.000'
                            />
                          </div>
                        </div>
                        <span className="text-[#ff3d00] text-lg">₺</span>
                      </div>
                    </div>
                  </div>
                  {/* Vade Select */}
                  <div className="flex-1 min-w-0 sm:pl-3">
                    <div className="relative">
                      <div 
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer"
                        onClick={() => setIsIhtiyacVadeDropdownOpen(!isIhtiyacVadeDropdownOpen)}
                        style={{ height: '100px' }}
                      >
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Vade</div>
                            <div className="font-semibold text-gray-800">
                              {ihtiyacVadeOptions.find(option => option.value === ihtiyacVade)?.label || `${ihtiyacVade} ay`}
                            </div>
                          </div>
                          <div className="text-[#ff3d00]">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="lucide lucide-chevron-right"
                            >
                              <path d="m9 18 6-6-6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {isIhtiyacVadeDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                          {ihtiyacVadeOptions.map((option) => (
                            <div 
                              key={option.value}
                              className={`p-3 hover:bg-gray-50 cursor-pointer ${option.value === ihtiyacVade ? 'bg-gray-100' : ''}`}
                              onClick={() => {
                                setIhtiyacVade(option.value);
                                setIsIhtiyacVadeDropdownOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                {option.value === ihtiyacVade && (
                                  <svg className="w-4 h-4 mr-2 text-[#ff3d00]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                                <span className={`${option.value === ihtiyacVade ? 'font-medium' : ''}`}>{option.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                 {/* Hesapla Button */}
                  <button className="mt-4 w-full sm:w-auto flex-shrink-0 py-3 px-6 bg-transparent text-[#ff3d00] border border-[#ff3d00] font-semibold rounded-lg hover:bg-[#ff3d00]/10 transition duration-200 flex items-center justify-center gap-2 text-lg">
                    Kredi Hesapla
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
              </div>
            )}
             {activeKrediTab === 'konut' && (
              <div className="w-full">
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  {/* Tutar Input */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-4" style={{ height: '100px' }}>
                      <div className="flex justify-between items-center h-full">
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-1">Almak İstediğiniz Kredi Tutarı</div>
                          <div className="relative">
                            <input 
                              type="text"
                              id="konut-tutar"
                              value={konutTutar}
                              onChange={handleKonutTutarChange}
                              className="w-full py-1 bg-transparent border-0 focus:ring-0 text-lg font-semibold text-gray-800"
                              placeholder='1.000.000'
                            />
                          </div>
                        </div>
                        <span className="text-[#ff3d00] text-lg">₺</span>
                      </div>
                    </div>
                  </div>
                  {/* Vade Select */}
                  <div className="flex-1 min-w-0 sm:pl-3">
                    <div className="relative">
                      <div 
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer"
                        onClick={() => setIsKonutVadeDropdownOpen(!isKonutVadeDropdownOpen)}
                        style={{ height: '100px' }}
                      >
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Vade</div>
                            <div className="font-semibold text-gray-800">
                              {konutVadeOptions.find(option => option.value === konutVade)?.label || `${konutVade} ay`}
                            </div>
                          </div>
                          <div className="text-[#ff3d00]">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="lucide lucide-chevron-right"
                            >
                              <path d="m9 18 6-6-6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {isKonutVadeDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                          {konutVadeOptions.map((option) => (
                            <div 
                              key={option.value}
                              className={`p-3 hover:bg-gray-50 cursor-pointer ${option.value === konutVade ? 'bg-gray-100' : ''}`}
                              onClick={() => {
                                setKonutVade(option.value);
                                setIsKonutVadeDropdownOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                {option.value === konutVade && (
                                  <svg className="w-4 h-4 mr-2 text-[#ff3d00]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                                <span className={`${option.value === konutVade ? 'font-medium' : ''}`}>{option.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                 {/* Hesapla Button */}
                  <button className="mt-4 w-full sm:w-auto flex-shrink-0 py-3 px-6 bg-transparent text-[#ff3d00] border border-[#ff3d00] font-semibold rounded-lg hover:bg-[#ff3d00]/10 transition duration-200 flex items-center justify-center gap-2 text-lg">
                    Kredi Hesapla
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
              </div>
            )}
            
            {activeKrediTab === 'tasit' && (
              <div className="w-full">
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  {/* Taşıt Kredisi Alanları */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-4" style={{ height: '100px' }}>
                      <div className="flex flex-col justify-between h-full">
                        {/* Taşıt Tipi Seçimi */}
                        <div className="flex items-center space-x-6 mb-2">
                          <div className="flex items-center">
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 cursor-pointer ${tasitTipi === 'yeni' ? 'bg-transparent text-[#ff3d00] border border-[#ff3d00]' : 'bg-gray-200'}`}
                              onClick={() => handleTasitTipiChange('yeni')}
                            >
                              {tasitTipi === 'yeni' && (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span className="text-gray-700">Yeni</span>
                          </div>
                          
                          <div className="flex items-center">
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 cursor-pointer ${tasitTipi === 'ikinci-el' ? 'bg-transparent text-[#ff3d00] border border-[#ff3d00]' : 'bg-gray-200'}`}
                              onClick={() => handleTasitTipiChange('ikinci-el')}
                            >
                              {tasitTipi === 'ikinci-el' && (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span className="text-gray-700">İkinci el</span>
                          </div>
                        </div>
                        
                        {/* Tutar Alanı */}
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-1">Almak İstediğiniz Kredi Tutarı</div>
                          <div className="relative flex justify-between items-center">
                            <input 
                              type="text"
                              id="tasit-tutar"
                              value={tasitTutar}
                              onChange={handleTasitTutarChange}
                              className="w-full py-1 bg-transparent border-0 focus:ring-0 text-lg font-semibold text-gray-800"
                              placeholder='500.000'
                            />
                            <span className="text-[#ff3d00] text-lg">₺</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Vade Select */}
                  <div className="flex-1 min-w-0 sm:pl-3">
                    <div className="relative">
                      <div 
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer"
                        onClick={() => setIsTasitVadeDropdownOpen(!isTasitVadeDropdownOpen)}
                        style={{ height: '100px' }}
                      >
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Vade</div>
                            <div className="font-semibold text-gray-800">
                              {tasitVade} ay
                            </div>
                          </div>
                          <div className="text-[#ff3d00]">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="lucide lucide-chevron-right"
                            >
                              <path d="m9 18 6-6-6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {isTasitVadeDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                          {[12, 24, 36, 48, 60].map((option) => (
                            <div 
                              key={option}
                              className={`p-3 hover:bg-gray-50 cursor-pointer ${tasitVade === option.toString() ? 'bg-gray-100' : ''}`}
                              onClick={() => {
                                setTasitVade(option.toString());
                                setIsTasitVadeDropdownOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                {tasitVade === option.toString() && (
                                  <svg className="w-4 h-4 mr-2 text-[#ff3d00]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                                <span className={`${tasitVade === option.toString() ? 'font-medium' : ''}`}>{option} ay</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Hesapla Button */}
                <button className="mt-4 w-full sm:w-auto flex-shrink-0 py-3 px-6 bg-transparent text-[#ff3d00] font-semibold rounded-lg border border-[#ff3d00] hover:bg-[#ff3d00]/10 transition duration-200 flex items-center justify-center gap-2 text-lg">
                  Kredi Hesapla
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
            
            {activeKrediTab === 'kobi' && (
              <div className="w-full">
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  {/* Tutar Input */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-4" style={{ height: '100px' }}>
                      <div className="flex justify-between items-center h-full">
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-1">Almak İstediğiniz Kredi Tutarı</div>
                          <div className="relative">
                            <input 
                              type="text"
                              id="kobi-tutar"
                              value={kobiTutar}
                              onChange={handleKobiTutarChange}
                              className="w-full py-1 bg-transparent border-0 focus:ring-0 text-lg font-semibold text-gray-800"
                              placeholder='250.000'
                            />
                          </div>
                        </div>
                        <span className="text-[#ff3d00] text-lg">₺</span>
                      </div>
                    </div>
                  </div>
                  {/* Vade Select */}
                  <div className="flex-1 min-w-0 sm:pl-3">
                    <div className="relative">
                      <div 
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer"
                        onClick={() => setIsKobiVadeDropdownOpen(!isKobiVadeDropdownOpen)}
                        style={{ height: '100px' }}
                      >
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Vade</div>
                            <div className="font-semibold text-gray-800">
                              {kobiVade} ay
                            </div>
                          </div>
                          <div className="text-[#ff3d00]">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="lucide lucide-chevron-right"
                            >
                              <path d="m9 18 6-6-6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {isKobiVadeDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                          {[12, 24, 36, 48, 60].map((option) => (
                            <div 
                              key={option}
                              className={`p-3 hover:bg-gray-50 cursor-pointer ${kobiVade === option.toString() ? 'bg-gray-100' : ''}`}
                              onClick={() => {
                                setKobiVade(option.toString());
                                setIsKobiVadeDropdownOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                {kobiVade === option.toString() && (
                                  <svg className="w-4 h-4 mr-2 text-[#ff3d00]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                                <span className={`${kobiVade === option.toString() ? 'font-medium' : ''}`}>{option} ay</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                 {/* Hesapla Button */}
                  <button className="mt-4 w-full sm:w-auto flex-shrink-0 py-3 px-6 bg-transparent text-[#ff3d00] border border-[#ff3d00] font-semibold rounded-lg hover:bg-[#ff3d00]/10 transition duration-200 flex items-center justify-center gap-2 text-lg">
                    Kredi Hesapla
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
              </div>
            )}
            
            {activeKrediTab !== 'ihtiyac' && activeKrediTab !== 'konut' && activeKrediTab !== 'tasit' && activeKrediTab !== 'kobi' && (
                <p className='text-center text-gray-500'>Kredi ({activeKrediTab}) hesaplama alanı buraya gelecek.</p>
            )}
          </div>
        </div>

        {/* Varlık Sütunu */}
        <div className="flex flex-col bg-[#F3FDF3] p-4 rounded-xl">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Varlık</h2> 
          {/* Varlık Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {varlikTabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-3 px-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none ${ 
                  activeVarlikTab === tab.id
                    ? 'bg-gradient-to-br from-green-600 to-green-500 text-white shadow-md' 
                    : 'bg-white/80 text-gray-700 hover:bg-green-100/50 hover:text-green-700' 
                }`}
                onClick={() => setActiveVarlikTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Varlık Tab Content */}
          <div className="bg-white p-4 rounded-lg shadow-inner min-h-[200px] flex flex-col justify-center">
            {activeVarlikTab === 'mevduat' && (
              <div className="w-full">
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  {/* Tutar Input */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-4" style={{ height: '100px' }}>
                      <div className="flex justify-between items-center h-full">
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-1">Yatırmak İstediğiniz Tutar</div>
                          <div className="relative">
                            <input 
                              type="text"
                              id="mevduat-tutar"
                              value={mevduatTutar}
                              onChange={handleMevduatTutarChange}
                              className="w-full py-1 bg-transparent border-0 focus:ring-0 text-lg font-semibold text-gray-800"
                              placeholder='50.000'
                            />
                          </div>
                        </div>
                        <span className="text-green-600 text-lg">₺</span>
                      </div>
                    </div>
                  </div>
                  {/* Vade Select */}
                  <div className="flex-1 min-w-0 sm:pl-3">
                    <div className="relative">
                      <div 
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer"
                        onClick={() => setIsMevduatVadeDropdownOpen(!isMevduatVadeDropdownOpen)}
                        style={{ height: '100px' }}
                      >
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Vade</div>
                            <div className="font-semibold text-gray-800">
                              {mevduatVade} gün
                            </div>
                          </div>
                          <div className="text-green-600">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="lucide lucide-chevron-down"
                            >
                              <path d="m6 9 6 6 6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {isMevduatVadeDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                          {['32', '46', '55', '92', '181'].map((option) => (
                            <div 
                              key={option}
                              className={`p-3 hover:bg-gray-50 cursor-pointer ${mevduatVade === option ? 'bg-gray-100' : ''}`}
                              onClick={() => {
                                setMevduatVade(option);
                                setIsMevduatVadeDropdownOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                {mevduatVade === option && (
                                  <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                                <span className={`${mevduatVade === option ? 'font-medium' : ''}`}>{option} gün</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Hesapla Button */}
                <button className="mt-4 w-full sm:w-auto flex-shrink-0 py-3 px-6 bg-transparent text-green-600 border border-green-600 font-semibold rounded-lg hover:bg-green-100/50 transition duration-200 flex items-center justify-center gap-2 text-lg">
                  Faiz Hesapla
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
            
            {activeVarlikTab === 'doviz' && (
              <div className="w-full">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  {/* Alış/Satış Radio Buttons - Separate Row */}
                  <div className="flex items-center space-x-6 mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        className="form-radio h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500" 
                        checked={hesaplamaType === 'alis'}
                        onChange={() => setHesaplamaType('alis')}
                      />
                      <span className="ml-2 text-lg font-medium text-gray-700">Alış</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        className="form-radio h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500" 
                        checked={hesaplamaType === 'satis'}
                        onChange={() => setHesaplamaType('satis')}
                      />
                      <span className="ml-2 text-lg font-medium text-gray-700">Satış</span>
                    </label>
                  </div>
                  
                  {/* Main Inputs in 2 Columns */}
                  <div className="flex flex-col sm:flex-row gap-3 items-start">
                    {/* Miktar Input */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-50 rounded-lg p-4" style={{ height: '100px' }}>
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Miktar</div>
                            <div className="relative">
                              <input 
                                type="text"
                                value={dovizAmount}
                                onChange={handleDovizAmountChange}
                                className="w-full py-1 bg-transparent border-0 focus:ring-0 text-lg font-semibold text-gray-800"
                                placeholder='1'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Döviz Türü Select */}
                    <div className="relative">
                      <div 
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer"
                        onClick={() => setIsDovizTypeDropdownOpen(!isDovizTypeDropdownOpen)}
                        style={{ height: '100px' }}
                      >
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Döviz Türü</div>
                            <div className="font-semibold text-gray-800">
                              {dovizKurlari.find(doviz => doviz.code === selectedCurrencyType)?.code} - {dovizKurlari.find(doviz => doviz.code === selectedCurrencyType)?.name}
                            </div>
                          </div>
                          <div className="text-green-600">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="lucide lucide-chevron-down"
                            >
                              <path d="m6 9 6 6 6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {isDovizTypeDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                          {dovizKurlari.map((doviz) => (
                            <div 
                              key={doviz.code}
                              className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedCurrencyType === doviz.code ? 'bg-gray-100' : ''}`}
                              onClick={() => {
                                setSelectedCurrencyType(doviz.code);
                                setIsDovizTypeDropdownOpen(false);
                                calculateDovizPrice();
                              }}
                            >
                              <div className="flex items-center">
                                {selectedCurrencyType === doviz.code && (
                                  <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                                <span className={`${selectedCurrencyType === doviz.code ? 'font-medium' : ''}`}>{doviz.code} - {doviz.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Sonuç */}
                    <div className="flex-1 min-w-0 sm:pl-3">
                      <div className="bg-gray-50 rounded-lg p-4" style={{ height: '100px' }}>
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Sonuç</div>
                            <div className="font-semibold text-gray-800">
                              {calculatedPrice} ₺
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hesapla Button */}
                <button 
                  className="mt-4 w-full sm:w-auto flex-shrink-0 py-3 px-6 bg-transparent text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-100/50 transition duration-200 flex items-center justify-center gap-2 text-lg"
                  onClick={calculateDovizPrice}
                >
                  Döviz Hesapla
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
            
            {activeVarlikTab === 'altin' && (
              <div className="w-full">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  {/* Alış/Satış Radio Buttons - Separate Row */}
                  <div className="flex items-center space-x-6 mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        className="form-radio h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500" 
                        checked={altinHesaplamaType === 'alis'}
                        onChange={() => setAltinHesaplamaType('alis')}
                      />
                      <span className="ml-2 text-lg font-medium text-gray-700">Alış</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        className="form-radio h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500" 
                        checked={altinHesaplamaType === 'satis'}
                        onChange={() => setAltinHesaplamaType('satis')}
                      />
                      <span className="ml-2 text-lg font-medium text-gray-700">Satış</span>
                    </label>
                  </div>
                  
                  {/* Main Inputs in 2 Columns */}
                  <div className="flex flex-col sm:flex-row gap-3 items-start">
                    {/* Miktar Input */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-50 rounded-lg p-4" style={{ height: '100px' }}>
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Miktar</div>
                            <div className="relative">
                              <input 
                                type="text"
                                value={goldAmount}
                                onChange={handleGoldAmountChange}
                                className="w-full py-1 bg-transparent border-0 focus:ring-0 text-lg font-semibold text-gray-800"
                                placeholder='1'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Altın Türü Select */}
                    <div className="relative">
                      <div 
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer"
                        onClick={() => setIsGoldTypeDropdownOpen(!isGoldTypeDropdownOpen)}
                        style={{ height: '100px' }}
                      >
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Altın Türü</div>
                            <div className="font-semibold text-gray-800">
                              {selectedGoldType}
                            </div>
                          </div>
                          <div className="text-green-600">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="lucide lucide-chevron-down"
                            >
                              <path d="m6 9 6 6 6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {isGoldTypeDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                          {goldPrices.map((gold, index) => (
                            <div 
                              key={`gold-type-${index}`}
                              className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedGoldType === gold.name ? 'bg-gray-100' : ''}`}
                              onClick={() => {
                                setSelectedGoldType(gold.name);
                                setIsGoldTypeDropdownOpen(false);
                                calculateGoldPrice();
                              }}
                            >
                              <div className="flex items-center">
                                {selectedGoldType === gold.name && (
                                  <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                                <span className={`${selectedGoldType === gold.name ? 'font-medium' : ''}`}>{gold.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Sonuç */}
                    <div className="flex-1 min-w-0 sm:pl-3">
                      <div className="bg-gray-50 rounded-lg p-4" style={{ height: '100px' }}>
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Sonuç</div>
                            <div className="font-semibold text-gray-800">
                              {calculatedGoldPrice} ₺
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hesapla Button */}
                <button 
                  className="mt-4 w-full sm:w-auto flex-shrink-0 py-3 px-6 bg-transparent text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-100/50 transition duration-200 flex items-center justify-center gap-2 text-lg"
                  onClick={calculateGoldPrice}
                >
                  Altın Hesapla
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
            
            {activeVarlikTab !== 'mevduat' && activeVarlikTab !== 'doviz' && activeVarlikTab !== 'altin' && (
              <p className='text-center text-gray-500'>Varlık ({activeVarlikTab}) hesaplama alanı buraya gelecek.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
