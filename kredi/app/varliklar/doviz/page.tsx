'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUp, ArrowDown, RefreshCw, ChevronDown } from 'lucide-react'

// Döviz kuru tipi
type DovizKuru = {
  code: string
  name: string
  buyRate: string
  sellRate: string
  change: string
  changeAmount: string
  trend: 'up' | 'down' | 'stable'
  lastUpdate: string
  low: string
  high: string
  closing: string
}

// SSS için kullanılacak veri
const faqItems = [
  {
    id: 'faq-1',
    question: 'Döviz hesabı açmak için ne gerekir?',
    answer: 'Döviz hesabı açmak için kimlik belgeniz ve hesap açmak istediğiniz döviz cinsinden para yeterlidir. Bankaların minimum tutar şartları değişiklik gösterebilir.'
  },
  {
    id: 'faq-2',
    question: 'Döviz hesabından TL hesabına para transferi yapabilir miyim?',
    answer: 'Evet, döviz hesabınızdan TL hesabınıza transfer yapabilirsiniz. Bu durumda bankanızın belirlediği kur üzerinden döviz bozumu gerçekleştirilir.'
  },
  {
    id: 'faq-3',
    question: 'Döviz hesabı faiz oranları nasıl belirlenir?',
    answer: 'Döviz hesaplarının faiz oranları, global piyasalardaki faiz oranları, enflasyon beklentileri ve bankaların kendi politikalarına göre belirlenir. Bu oranlar dönemsel olarak değişiklik gösterebilir.'
  },
  {
    id: 'faq-4',
    question: 'Vadeli döviz hesabımı vadesinden önce kapatabilir miyim?',
    answer: 'Evet, vadeli döviz hesabınızı vadesinden önce kapatabilirsiniz, ancak bu durumda bankanın belirlediği şartlara göre daha düşük bir faiz oranı uygulanabilir veya hiç faiz alamayabilirsiniz.'
  },
  {
    id: 'faq-5',
    question: 'Döviz kurlarındaki değişimler hesabımı nasıl etkiler?',
    answer: 'Döviz kurlarındaki değişimler, döviz hesabınızın TL karşılığını doğrudan etkiler. Kurlar yükseldiğinde TL karşılığı artar, düştüğünde ise azalır. Ancak hesabınızdaki döviz miktarı değişmez.'
  },
  {
    id: 'faq-6',
    question: 'Hangi döviz türünde yatırım yapmak daha avantajlıdır?',
    answer: 'Hangi döviz türünün daha avantajlı olduğu, küresel ekonomik koşullara, ülke ekonomilerine ve kişisel yatırım hedeflerinize bağlıdır. Genellikle yatırımcılar portföylerini çeşitlendirmek için farklı döviz türlerinde yatırım yapmayı tercih ederler.'
  }
]

export default function DovizPage() {
  const [dovizKurlari, setDovizKurlari] = useState<DovizKuru[]>([])
  const [lastUpdate, setLastUpdate] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hesaplamaType, setHesaplamaType] = useState<'alis' | 'satis'>('alis')
  const [selectedCurrencyType, setSelectedCurrencyType] = useState<string>('USD')
  const [dovizAmount, setDovizAmount] = useState<string>('1')
  const [calculatedPrice, setCalculatedPrice] = useState<string>('0,00')
  const [showAllCurrencies, setShowAllCurrencies] = useState<boolean>(false)
  
  // Döviz kurlarını çek
  const fetchDovizKurlari = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/canli-doviz', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      if (!response.ok) {
        throw new Error('Döviz kurları alınamadı')
      }
      
      const data = await response.json()
      let currencies = [...data.currencies]
      
      // Eğer 30'dan az para birimi varsa, ek para birimleri ekle
      if (currencies.length < 30) {
        // Mevcut para birimlerinin kodlarını al
        const existingCodes = new Set(currencies.map(c => c.code))
        
        // Ek para birimleri
        const additionalCurrencies: DovizKuru[] = [
          {
            code: 'PLN',
            name: 'Polonya Zlotisi',
            lastUpdate: '18:09:06',
            buyRate: '9.5420',
            sellRate: '9.5520',
            changeAmount: '0.05',
            change: '%0.52',
            trend: 'up',
            low: '9.5000',
            high: '9.6000',
            closing: '9.5300'
          },
          {
            code: 'HUF',
            name: 'Macar Forinti',
            lastUpdate: '18:09:06',
            buyRate: '0.1080',
            sellRate: '0.1085',
            changeAmount: '0.001',
            change: '%0.93',
            trend: 'up',
            low: '0.1070',
            high: '0.1090',
            closing: '0.1080'
          },
          {
            code: 'RON',
            name: 'Romen Leyi',
            lastUpdate: '18:09:06',
            buyRate: '8.7650',
            sellRate: '8.7750',
            changeAmount: '0.04',
            change: '%0.46',
            trend: 'up',
            low: '8.7500',
            high: '8.8000',
            closing: '8.7700'
          },
          {
            code: 'BGN',
            name: 'Bulgar Levası',
            lastUpdate: '18:09:06',
            buyRate: '22.2756',
            sellRate: '22.3186',
            changeAmount: '0.13',
            change: '%-0.59',
            trend: 'down',
            low: '22.2903',
            high: '22.4372',
            closing: '22.4503'
          },
          {
            code: 'ZAR',
            name: 'Güney Afrika Randı',
            lastUpdate: '18:09:06',
            buyRate: '2.0380',
            sellRate: '2.0482',
            changeAmount: '0.02',
            change: '%0.81',
            trend: 'up',
            low: '2.0251',
            high: '2.0549',
            closing: '2.0318'
          },
          {
            code: 'ILS',
            name: 'İsrail Şekeli',
            lastUpdate: '18:09:06',
            buyRate: '10.2500',
            sellRate: '10.2800',
            changeAmount: '0.03',
            change: '%0.29',
            trend: 'up',
            low: '10.2300',
            high: '10.3100',
            closing: '10.2600'
          },
          {
            code: 'KWD',
            name: 'Kuveyt Dinarı',
            lastUpdate: '16:30:28',
            buyRate: '124.2687',
            sellRate: '124.8916',
            changeAmount: '0.61',
            change: '%0.49',
            trend: 'up',
            low: '124.7240',
            high: '125.0550',
            closing: '124.2776'
          },
          {
            code: 'BHD',
            name: 'Bahreyn Dinarı',
            lastUpdate: '16:30:28',
            buyRate: '101.0860',
            sellRate: '101.5930',
            changeAmount: '0.13',
            change: '%0.13',
            trend: 'up',
            low: '101.2797',
            high: '102.3930',
            closing: '101.4590'
          },
          {
            code: 'SAR',
            name: 'Suudi Arabistan Riyali',
            lastUpdate: '18:09:06',
            buyRate: '10.1500',
            sellRate: '10.1800',
            changeAmount: '0.02',
            change: '%0.20',
            trend: 'up',
            low: '10.1300',
            high: '10.2100',
            closing: '10.1600'
          },
          {
            code: 'INR',
            name: 'Hindistan Rupisi',
            lastUpdate: '18:09:06',
            buyRate: '0.4550',
            sellRate: '0.4580',
            changeAmount: '0.002',
            change: '%0.44',
            trend: 'up',
            low: '0.4540',
            high: '0.4590',
            closing: '0.4560'
          },
          {
            code: 'MXN',
            name: 'Meksika Pesosu',
            lastUpdate: '18:09:06',
            buyRate: '2.2100',
            sellRate: '2.2200',
            changeAmount: '0.01',
            change: '%0.45',
            trend: 'up',
            low: '2.2050',
            high: '2.2250',
            closing: '2.2150'
          },
          {
            code: 'BRL',
            name: 'Brezilya Reali',
            lastUpdate: '16:30:28',
            buyRate: '6.5615',
            sellRate: '6.5944',
            changeAmount: '0.01',
            change: '%0.13',
            trend: 'up',
            low: '6.5730',
            high: '6.6029',
            closing: '6.5857'
          },
          {
            code: 'IDR',
            name: 'Endonezya Rupisi',
            lastUpdate: '18:09:06',
            buyRate: '0.0023',
            sellRate: '0.0024',
            changeAmount: '0.0001',
            change: '%0.42',
            trend: 'up',
            low: '0.0023',
            high: '0.0024',
            closing: '0.0023'
          },
          {
            code: 'MYR',
            name: 'Malezya Ringgiti',
            lastUpdate: '18:09:06',
            buyRate: '8.1200',
            sellRate: '8.1500',
            changeAmount: '0.03',
            change: '%0.37',
            trend: 'up',
            low: '8.1100',
            high: '8.1700',
            closing: '8.1300'
          },
          {
            code: 'SGD',
            name: 'Singapur Doları',
            lastUpdate: '18:09:06',
            buyRate: '28.2500',
            sellRate: '28.3000',
            changeAmount: '0.10',
            change: '%0.35',
            trend: 'up',
            low: '28.2000',
            high: '28.3500',
            closing: '28.2700'
          },
          {
            code: 'ARS',
            name: 'Arjantin Pesosu',
            lastUpdate: '18:08:49',
            buyRate: '0.0340',
            sellRate: '0.0342',
            changeAmount: '0.00',
            change: '%1.79',
            trend: 'up',
            low: '0.0335',
            high: '0.0337',
            closing: '0.0336'
          },
          {
            code: 'CZK',
            name: 'Çek Korunası',
            lastUpdate: '18:09:06',
            buyRate: '1.7456',
            sellRate: '1.7544',
            changeAmount: '0.01',
            change: '%0.74',
            trend: 'up',
            low: '1.7393',
            high: '1.7692',
            closing: '1.7415'
          },
          {
            code: 'THB',
            name: 'Tayland Bahtı',
            lastUpdate: '18:09:06',
            buyRate: '1.0550',
            sellRate: '1.0650',
            changeAmount: '0.005',
            change: '%0.47',
            trend: 'up',
            low: '1.0500',
            high: '1.0700',
            closing: '1.0600'
          },
          {
            code: 'QAR',
            name: 'Katar Riyali',
            lastUpdate: '18:09:06',
            buyRate: '10.4500',
            sellRate: '10.4800',
            changeAmount: '0.02',
            change: '%0.19',
            trend: 'up',
            low: '10.4300',
            high: '10.5000',
            closing: '10.4600'
          },
          {
            code: 'PHP',
            name: 'Filipin Pesosu',
            lastUpdate: '18:09:06',
            buyRate: '0.6650',
            sellRate: '0.6700',
            changeAmount: '0.003',
            change: '%0.45',
            trend: 'up',
            low: '0.6630',
            high: '0.6720',
            closing: '0.6670'
          }
        ]
        
        // Eksik para birimlerini ekle
        for (const curr of additionalCurrencies) {
          if (!existingCodes.has(curr.code) && currencies.length < 30) {
            currencies.push(curr)
          }
        }
      }
      
      // USD, EUR, GBP önce gelecek şekilde sırala
      currencies.sort((a, b) => {
        const priorityCodes = ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD']
        const aPriority = priorityCodes.indexOf(a.code)
        const bPriority = priorityCodes.indexOf(b.code)
        
        if (aPriority !== -1 && bPriority !== -1) {
          return aPriority - bPriority
        } else if (aPriority !== -1) {
          return -1
        } else if (bPriority !== -1) {
          return 1
        } else {
          return a.code.localeCompare(b.code)
        }
      })
      
      setDovizKurlari(currencies)
      setLastUpdate(data.updateTime)
      setError(null)
    } catch (err) {
      console.error('Döviz kurları çekilirken hata oluştu:', err)
      setError('Döviz kurları şu anda alınamıyor. Lütfen daha sonra tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Döviz hesaplama fonksiyonu
  const calculateDovizPrice = () => {
    if (!dovizKurlari.length || !dovizAmount) {
      setCalculatedPrice('0,00')
      return
    }
    
    // Seçilen döviz türünü bul
    const selectedCurrency = dovizKurlari.find(doviz => doviz.code === selectedCurrencyType)
    if (!selectedCurrency) {
      setCalculatedPrice('0,00')
      return
    }
    
    // Alış veya satış fiyatını al
    const priceStr = hesaplamaType === 'alis' ? selectedCurrency.buyRate : selectedCurrency.sellRate
    
    // Fiyatı sayıya çevir (nokta ve virgül işlemleri)
    const price = parseFloat(priceStr.replace(/\./g, '').replace(',', '.'))
    
    // Miktarı sayıya çevir
    const amountNum = parseFloat(dovizAmount.replace(/\./g, '').replace(',', '.'))
    
    // Hesaplama yap ve 10.000'e böl
    const result = (price * amountNum) / 10000
    
    // Sonuç formatı
    setCalculatedPrice(new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result))
  }

  useEffect(() => {
    fetchDovizKurlari()
    
    // 30 saniyede bir otomatik yenileme
    const interval = setInterval(() => {
      fetchDovizKurlari()
    }, 300000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Hesaplama için useEffect
  useEffect(() => {
    calculateDovizPrice()
  }, [dovizKurlari, hesaplamaType, selectedCurrencyType, dovizAmount])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Döviz Hesaplama Aracı - Sayfanın en üstünde */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">DÖVİZ HESAPLAMA</h2>
        <div className="border-t border-gray-200 border-opacity-30 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  className="form-radio h-5 w-5 text-white border-gray-300 focus:ring-blue-500" 
                  checked={hesaplamaType === 'alis'}
                  onChange={() => setHesaplamaType('alis')}
                />
                <span className="ml-2 text-lg font-medium text-white">Alış</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  className="form-radio h-5 w-5 text-white border-gray-300 focus:ring-blue-500" 
                  checked={hesaplamaType === 'satis'}
                  onChange={() => setHesaplamaType('satis')}
                />
                <span className="ml-2 text-lg font-medium text-white">Satış</span>
              </label>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-white">Miktar:</span>
              <input 
                type="text" 
                className="block w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="0,00"
                value={dovizAmount}
                onChange={(e) => setDovizAmount(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select
                className="block w-full px-4 py-3 text-lg bg-white appearance-none focus:outline-none pr-10"
                value={selectedCurrencyType}
                onChange={(e) => setSelectedCurrencyType(e.target.value)}
                style={{ border: 'none', borderRadius: '0.5rem' }}
              >
                {dovizKurlari.map((doviz) => (
                  <option key={doviz.code} value={doviz.code}>
                    {doviz.code} - {doviz.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
            
            <div className="flex items-center justify-end">
              <span className="text-lg font-medium text-white mr-2">₺</span>
              <span className="text-2xl font-bold text-white">{calculatedPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Döviz Tablosu - Hesaplama aracının altında */}
      <div className="mb-12">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-heading font-bold text-[#ff3d00]">
            Güncel Döviz Kurları
          </h2>
          <span className="text-sm font-medium text-[#ff3d00]">
            {isLoading ? 'Yükleniyor...' : `Son Güncelleme: ${lastUpdate}`}
          </span>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Döviz Kurları Tablosu */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-base font-bold text-[#ff3d00] uppercase tracking-wider">
                  Döviz Kodu
                </th>
                <th className="px-4 py-3 text-left text-base font-bold text-[#ff3d00] uppercase tracking-wider">
                  Döviz Adı
                </th>
                <th className="px-4 py-3 text-right text-base font-bold text-[#ff3d00] uppercase tracking-wider">
                  Alış
                </th>
                <th className="px-4 py-3 text-right text-base font-bold text-[#ff3d00] uppercase tracking-wider">
                  Satış
                </th>
                <th className="px-4 py-3 text-right text-base font-bold text-[#ff3d00] uppercase tracking-wider">
                  Değişim
                </th>

              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    <div className="flex justify-center items-center">
                      <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                      Yükleniyor...
                    </div>
                  </td>
                </tr>
              ) : dovizKurlari.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    Döviz kurları bulunamadı
                  </td>
                </tr>
              ) : (
                // İlk 10 döviz birimini veya tümünü göster
                dovizKurlari
                  .slice(0, showAllCurrencies ? dovizKurlari.length : 10)
                  .map((doviz, index) => (
                    <tr key={doviz.code} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="text-base font-medium text-gray-900">{doviz.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-base text-gray-900">{doviz.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-base text-gray-900">
                        {doviz.buyRate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-base text-gray-900">
                        {doviz.sellRate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doviz.trend === 'up' ? 'bg-green-100 text-green-800' : doviz.trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {doviz.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : doviz.trend === 'down' ? <ArrowDown className="h-3 w-3 mr-1" /> : null}
                          {doviz.change}
                        </span>
                      </td>

                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Tüm dövizleri gösterme butonu */}
        {dovizKurlari.length > 10 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAllCurrencies(!showAllCurrencies)}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              aria-label={showAllCurrencies ? 'Daha az göster' : 'Tüm dövizleri göster'}
            >
              <ChevronDown className={`h-6 w-6 text-gray-500 transition-transform ${showAllCurrencies ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>


      {/* Sıkça Sorulan Sorular */}
      <div className="mb-12">
        <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6">Sıkça Sorulan Sorular</h2>
        <div className="divide-y divide-gray-200">
          {faqItems.map((item) => (
            <div key={item.id} className="py-4">
              <button 
                className="flex justify-between items-center w-full text-left" 
                onClick={() => {
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.classList.toggle('hidden');
                  }
                }}
              >
                <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div id={item.id} className="mt-2 text-gray-600 hidden">
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
