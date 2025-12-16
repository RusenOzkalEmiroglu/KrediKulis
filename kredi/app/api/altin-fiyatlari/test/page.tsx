'use client';

import { useState, useEffect } from 'react';

interface GoldPrice {
  name: string;
  buyPrice: string;
  sellPrice: string;
  change: string;
  updateTime: string;
}

export default function AltinApiTest() {
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/altin-fiyatlari');
      if (!response.ok) {
        throw new Error('API yanıtı başarısız');
      }
      const data = await response.json();
      setGoldPrices(data);
      setLastUpdated(new Date().toLocaleString('tr-TR'));
    } catch (error) {
      console.error('Altın fiyatları çekilirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Altın Fiyatları API Test Sayfası</h1>
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Verileri Yenile
          </button>
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          Son güncelleme: {lastUpdated || 'Henüz güncelleme yapılmadı'}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Veriler yükleniyor...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Altın Türü
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alış (₺)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satış (₺)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Değişim
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Güncelleme
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {goldPrices.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {item.buyPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {item.sellPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.change.includes('-') ? 'text-red-600 bg-red-100' : 
                        item.change === '0,00%' || item.change === '0%' ? 'text-gray-600 bg-gray-100' : 
                        'text-green-600 bg-green-100'
                      }`}>
                        {item.change.includes(',') ? item.change : item.change.replace('.', ',')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.updateTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">API Hakkında</h2>
        <p className="text-gray-600 mb-4">
          Bu sayfa, altın fiyatları API'sini test etmek için oluşturulmuştur. API, her istekte rastgele değişimlerle güncel fiyatları döndürür.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-mono text-sm">GET /api/altin-fiyatlari</p>
        </div>
      </div>
    </div>
  );
}
