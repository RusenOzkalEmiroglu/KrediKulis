'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

// Client-side tarih/saat bileşeni
function ClientTime() {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    setTime(new Date().toLocaleString('tr-TR'));
  }, []);
  
  return <span className="font-semibold">{time}</span>;
}

interface GoldPrice {
  name: string;
  buyPrice: string;
  sellPrice: string;
  change: string;
  updateTime: string;
}

// Fiyat hesaplama fonksiyonu
const calculatePrice = (goldPrices: GoldPrice[], selectedType: string, amount: string, type: 'alis' | 'satis') => {
  if (!goldPrices.length || !amount) return '0,00';
  
  // Seçilen altın türünü bul
  const selectedGold = goldPrices.find(gold => gold.name === selectedType);
  if (!selectedGold) return '0,00';
  
  // Alış veya satış fiyatını al
  const priceStr = type === 'alis' ? selectedGold.buyPrice : selectedGold.sellPrice;
  
  // Fiyatı sayıya çevir (nokta ve virgül işlemleri)
  const price = parseFloat(priceStr.replace(/\./g, '').replace(',', '.'));
  
  // Miktarı sayıya çevir
  const amountNum = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
  
  // Hesaplama yap
  const result = price * amountNum;
  
  // Sonuç formatı
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result);
};

export default function AltinPage() {
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [hesaplamaType, setHesaplamaType] = useState<'alis' | 'satis'>('alis');
  const [selectedGoldType, setSelectedGoldType] = useState<string>('ALTIN (TL/GR)');
  const [goldAmount, setGoldAmount] = useState<string>('1');
  const [calculatedPrice, setCalculatedPrice] = useState<string>('0');


  useEffect(() => {
    const fetchGoldPrices = async () => {
      setLoading(true);
      try {
        console.log('Veri çekme başlatıldı:', new Date().toLocaleTimeString());
        const response = await fetch('/api/altin-fiyatlari', {
          cache: 'no-store',
          next: { revalidate: 0 }
        });
        if (!response.ok) {
          throw new Error('API yanıtı başarısız');
        }
        const data = await response.json();
        console.log('Veri alındı:', new Date().toLocaleTimeString());
        setGoldPrices(data);
      } catch (error) {
        console.error('Altın fiyatları çekilirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGoldPrices();
    
    // Her 30 saniyede bir güncelle
    const intervalId = setInterval(fetchGoldPrices, 120000);
    return () => clearInterval(intervalId);
  }, []);



  // HTML verilerini parse et
  const parseGoldData = (): GoldPrice[] => {
    const htmlData = `<div class="tBody">
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/gram-altin-fiyati/"> ALTIN (TL/GR)</a></h3></li>
                            <li class="cell009">4.160,45</li>
                            <li class="cell009">4.160,92</li>
                            <li class="cell009">2,06%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/22-ayar-bilezik-fiyati/"> 22 Ayar Bilezik</a></h3></li>
                            <li class="cell009">3.819,05</li>
                            <li class="cell009">3.854,06</li>
                            <li class="cell009">1,41%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/altin-ons-fiyati/"> Altın (ONS)</a></h3></li>
                            <li class="cell009">3.392,67</li>
                            <li class="cell009">3.393,06</li>
                            <li class="cell009">1,97%</li>
                            <li class="cell009">11:47</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/altin-kg-dolar-fiyati/"> Altın ($/kg)</a></h3></li>
                            <li class="cell009">108.374,00</li>
                            <li class="cell009">108.386,00</li>
                            <li class="cell009">1,80%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/altin-euro-kg-fiyati/"> Altın (Euro/kg)</a></h3></li>
                            <li class="cell009">125.593,00</li>
                            <li class="cell009">125.607,00</li>
                            <li class="cell009">1,80%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/cumhuriyet-altini-fiyati/"> Cumhuriyet Altını</a></h3></li>
                            <li class="cell009">27.308,00</li>
                            <li class="cell009">27.500,00</li>
                            <li class="cell009">2,01%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/yarim-altin-fiyati/"> Yarım Altın</a></h3></li>
                            <li class="cell009">13.696,00</li>
                            <li class="cell009">13.802,00</li>
                            <li class="cell009">2,01%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/ceyrek-altin-fiyati/"> Çeyrek Altın</a></h3></li>
                            <li class="cell009">6.850,00</li>
                            <li class="cell009">6.902,00</li>
                            <li class="cell009">2,03%</li>
                            <li class="cell009">11:31</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/resat-altini-fiyati/"> Reşat Altını</a></h3></li>
                            <li class="cell009">27.340,47</li>
                            <li class="cell009">27.532,95</li>
                            <li class="cell009">2,14%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/kulplu-resat-altini-fiyati/"> Kulplu Reşat Altını</a></h3></li>
                            <li class="cell009">27.342,69</li>
                            <li class="cell009">27.535,20</li>
                            <li class="cell009">2,14%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/22-ayar-altin-fiyati/"> 22 Ayar Altın TL/Gr</a></h3></li>
                            <li class="cell009">3.820,99</li>
                            <li class="cell009">4.021,94</li>
                            <li class="cell009">2,00%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/18-ayar-altin-fiyati/"> 18 Ayar Altın TL/Gr</a></h3></li>
                            <li class="cell009">3.037,13</li>
                            <li class="cell009">3.037,47</li>
                            <li class="cell009">2,06%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/14-ayar-altin-fiyati/"> 14 Ayar Altın TL/Gr</a></h3></li>
                            <li class="cell009">2.292,72</li>
                            <li class="cell009">3.241,69</li>
                            <li class="cell009">1,70%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/ziynet-2_5-altin-fiyati/"> Kapalicarsi Ziynet 2.5</a></h3></li>
                            <li class="cell009">66.157,38</li>
                            <li class="cell009">67.216,09</li>
                            <li class="cell009">0,00%</li>
                            <li class="cell009">12:49</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/ziynet-5-altin-fiyati/"> Kapalı Çarşı Beşli Altın</a></h3></li>
                            <li class="cell009">133.968,69</li>
                            <li class="cell009">136.584,43</li>
                            <li class="cell009">0,00%</li>
                            <li class="cell009">12:49</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/gremse-altin-fiyati/"> Gremse Altın</a></h3></li>
                            <li class="cell009">66.157,38</li>
                            <li class="cell009">67.671,37</li>
                            <li class="cell009">0,70%</li>
                            <li class="cell009">12:49</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/ata-altin-fiyati/"> Ata Altın</a></h3></li>
                            <li class="cell009">27.289,92</li>
                            <li class="cell009">27.979,11</li>
                            <li class="cell009">0,70%</li>
                            <li class="cell009">12:49</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/tam-altin-fiyati/"> Tam Altın</a></h3></li>
                            <li class="cell009">26.462,95</li>
                            <li class="cell009">26.985,77</li>
                            <li class="cell009">0,70%</li>
                            <li class="cell009">12:49</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/kulce-altin-fiyati/"> Külçe Altın ($)</a></h3></li>
                            <li class="cell009">107.900,00</li>
                            <li class="cell009">107.950,00</li>
                            <li class="cell009">0,70%</li>
                            <li class="cell009">17:01</li>
                        </ul>
                        <ul style="background: rgb(225, 233, 236);">
                            <li class="cell010 tal"><h3><a href="/altin/has-altin-fiyati/"> Has Altın</a></h3></li>
                            <li class="cell009">4.139,70</li>
                            <li class="cell009">4.140,15</li>
                            <li class="cell009">2,06%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                        <ul style="background: rgb(255, 255, 255);">
                            <li class="cell010 tal"><h3><a href="/altin/hamit-altin-fiyati/"> Hamit Altın</a></h3></li>
                            <li class="cell009">27.340,47</li>
                            <li class="cell009">27.532,95</li>
                            <li class="cell009">2,14%</li>
                            <li class="cell009">11:32</li>
                        </ul>
                </div>`;

    // HTML'i manuel olarak parse et
    const goldItems: GoldPrice[] = [];
    const regex = /<ul[^>]*>[\s\S]*?<li[^>]*><h3><a[^>]*>(.*?)<\/a><\/h3><\/li>[\s\S]*?<li[^>]*>(.*?)<\/li>[\s\S]*?<li[^>]*>(.*?)<\/li>[\s\S]*?<li[^>]*>(.*?)<\/li>[\s\S]*?<li[^>]*>(.*?)<\/li>[\s\S]*?<\/ul>/g;
    
    let match;
    while ((match = regex.exec(htmlData)) !== null) {
      goldItems.push({
        name: match[1].trim(),
        buyPrice: match[2].trim(),
        sellPrice: match[3].trim(),
        change: match[4].trim(),
        updateTime: match[5].trim()
      });
    }
    
    return goldItems;
  };

  // Değişim yüzdesine göre renk belirle
  const getChangeColor = (change: string) => {
    if (change.includes('-')) return 'text-red-600';
    if (change === '0,00%' || change === '0%') return 'text-gray-600';
    return 'text-green-600';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Altın Hesaplama Aracı */}
      <div className="bg-gradient-to-r from-[#ff3d00] to-[#ff3d00] rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">ALTIN FİYATI HESAPLAMA</h2>
        <div className="border-t border-gray-300 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  className="form-radio h-5 w-5 text-[#ff3d00] border-gray-300 focus:ring-[#ff3d00]" 
                  checked={hesaplamaType === 'alis'}
                  onChange={() => setHesaplamaType('alis')}
                />
                <span className="ml-2 text-lg font-medium text-gray-800">Alış</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  className="form-radio h-5 w-5 text-[#ff3d00] border-gray-300 focus:ring-[#ff3d00]" 
                  checked={hesaplamaType === 'satis'}
                  onChange={() => setHesaplamaType('satis')}
                />
                <span className="ml-2 text-lg font-medium text-gray-800">Satış</span>
              </label>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-gray-800">Miktar:</span>
              <input 
                type="text" 
                className="block w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3d00] focus:border-[#ff3d00]" 
                placeholder="0,00"
                value={goldAmount}
                onChange={(e) => {
                  // Sadece sayı ve nokta girişine izin ver
                  const value = e.target.value.replace(/[^0-9.,]/g, '');
                  
                  // Binlik ayraçları ekle
                  const numericValue = value.replace(/\./g, '').replace(',', '.');
                  const formattedValue = numericValue ? new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(Number(numericValue)) : '';
                  
                  setGoldAmount(formattedValue);
                }}
              />
            </div>
            
            <div className="relative">
              <select 
                className="block w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#ff3d00] focus:border-[#ff3d00]" 
                value={selectedGoldType}
                onChange={(e) => setSelectedGoldType(e.target.value)}
              >
                {!loading && goldPrices.map((item, index) => (
                  item.name && <option key={`gold-type-${index}`} value={item.name}>{item.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            
            <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-lg">₺</span>
              </div>
              <div className="block w-full pl-10 pr-4 py-3 text-lg text-right font-mono font-semibold text-gray-800">
                {calculatePrice(goldPrices, selectedGoldType, goldAmount, hesaplamaType)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Bölümü */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#ff3d00]">Güncel Altın Fiyatları</h1>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">Son güncelleme:</span>
            <ClientTime />
          </div>
        </div>
      </div>

      {/* Altın Fiyatları Tabloları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* İlk Tablo */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">Altın fiyatları yükleniyor...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-lg font-bold text-[#ff3d00] uppercase tracking-wider">
                      Altın Türü
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-lg font-bold text-[#ff3d00] uppercase tracking-wider">
                      Alış (₺)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-lg font-bold text-[#ff3d00] uppercase tracking-wider">
                      Satış (₺)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-lg font-bold text-[#ff3d00] uppercase tracking-wider">
                      Değişim
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {goldPrices.slice(0, 11).map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">{item.buyPrice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">{item.sellPrice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getChangeColor(item.change)} bg-opacity-10`}>
                          {item.change.includes(',') ? item.change : item.change.replace('.', ',')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* İkinci Tablo */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">Altın fiyatları yükleniyor...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-lg font-bold text-[#ff3d00] uppercase tracking-wider">
                      Altın Türü
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-lg font-bold text-[#ff3d00] uppercase tracking-wider">
                      Alış (₺)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-lg font-bold text-[#ff3d00] uppercase tracking-wider">
                      Satış (₺)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-lg font-bold text-[#ff3d00] uppercase tracking-wider">
                      Değişim
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {goldPrices.slice(11, 21).map((item, index) => (
                    <tr key={`second-table-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">{item.buyPrice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">{item.sellPrice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getChangeColor(item.change)} bg-opacity-10`}>
                          {item.change.includes(',') ? item.change : item.change.replace('.', ',')}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Gümüş</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">{goldPrices[21]?.buyPrice || "40,35"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">{goldPrices[21]?.sellPrice || "40,40"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getChangeColor(goldPrices[21]?.change || "1,19%")} bg-opacity-10`}>
                        {goldPrices[21]?.change || "1,19%"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* SSS Bölümü */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Sıkça Sorulan Sorular</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="p-6">
              <button className="flex justify-between items-center w-full text-left" 
                      onClick={() => {
                        const element = document.getElementById('faq-1');
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}>
                <h3 className="text-lg font-medium text-gray-900">Altın Nedir?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div id="faq-1" className="mt-2 text-gray-600 hidden">
                Altın, değerli bir metaldir ve binlerce yıldır para birimi, takı ve diğer sanatlar için kullanılmaktadır. Kimyasal sembolü Au'dur ve periyodik tabloda 79 numaralı elementtir.
              </div>
            </div>
            
            <div className="p-6">
              <button className="flex justify-between items-center w-full text-left" 
                      onClick={() => {
                        const element = document.getElementById('faq-2');
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}>
                <h3 className="text-lg font-medium text-gray-900">Altın Yatırımı Nasıl Yapılır?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div id="faq-2" className="mt-2 text-gray-600 hidden">
                Altın yatırımı fiziki altın alımı, altın hesabı açma, altın fonlarına yatırım yapma veya altın madenciliği şirketlerine yatırım yapma şeklinde olabilir.
              </div>
            </div>
            
            <div className="p-6">
              <button className="flex justify-between items-center w-full text-left" 
                      onClick={() => {
                        const element = document.getElementById('faq-3');
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}>
                <h3 className="text-lg font-medium text-gray-900">Altın Fiyatlarını Etkileyen Faktörler Nelerdir?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div id="faq-3" className="mt-2 text-gray-600 hidden">
                Altın fiyatları enflasyon, döviz kurları, jeopolitik olaylar, merkez bankalarının politikaları ve küresel ekonomik durum gibi faktörlerden etkilenir.
              </div>
            </div>
            
            <div className="p-6">
              <button className="flex justify-between items-center w-full text-left" 
                      onClick={() => {
                        const element = document.getElementById('faq-4');
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}>
                <h3 className="text-lg font-medium text-gray-900">Altının Saflık Dereceleri Nelerdir?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div id="faq-4" className="mt-2 text-gray-600 hidden">
                Altının saflığı karat ile ölçülür. 24 karat altın %99.9 saflıktadır. 22 karat altın %91.6, 18 karat altın %75, 14 karat altın %58.5 saflıktadır. Türkiye'de genellikle 22 ve 14 karat altın takılar tercih edilir.
              </div>
            </div>
            
            <div className="p-6">
              <button className="flex justify-between items-center w-full text-left" 
                      onClick={() => {
                        const element = document.getElementById('faq-5');
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}>
                <h3 className="text-lg font-medium text-gray-900">Altın Alırken Nelere Dikkat Edilmelidir?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div id="faq-5" className="mt-2 text-gray-600 hidden">
                Altın alırken güvenilir kuyumcuları tercih etmek, altının damgasını kontrol etmek, güncel fiyatları takip etmek ve işçilik ücretlerini karşılaştırmak önemlidir. Ayrıca altının sertifikasını ve fatura bilgilerini saklamak gerekir.
              </div>
            </div>
            
            <div className="p-6">
              <button className="flex justify-between items-center w-full text-left" 
                      onClick={() => {
                        const element = document.getElementById('faq-6');
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}>
                <h3 className="text-lg font-medium text-gray-900">Altın fiyatları ne sıklıkla güncellenir?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div id="faq-6" className="mt-2 text-gray-600 hidden">
                Altın fiyatları piyasa açık olduğu sürece sürekli değişir. Sitemizde gösterilen fiyatlar genellikle 30 saniyelik aralıklarla güncellenir.
              </div>
            </div>
            
            <div className="p-6">
              <button className="flex justify-between items-center w-full text-left" 
                      onClick={() => {
                        const element = document.getElementById('faq-7');
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}>
                <h3 className="text-lg font-medium text-gray-900">Altın hesabı açmak için ne gerekiyor?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div id="faq-7" className="mt-2 text-gray-600 hidden">
                Altın hesabı açmak için kimlik belgelerinizle birlikte bir bankaya başvurmanız yeterlidir. Minimum yatırım tutarı bankadan bankaya değişebilir.
              </div>
            </div>
            
            <div className="p-6">
              <button className="flex justify-between items-center w-full text-left" 
                      onClick={() => {
                        const element = document.getElementById('faq-8');
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}>
                <h3 className="text-lg font-medium text-gray-900">Fiziki altın mı, altın hesabı mı daha avantajlı?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div id="faq-8" className="mt-2 text-gray-600 hidden">
                Bu, yatırım amacınıza ve sürenize bağlıdır. Fiziki altın saklama maliyeti gerektirir ancak fiziksel güvence sağlar. Altın hesapları ise daha likit ve saklama maliyeti olmadan yatırım yapmanızı sağlar.
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
