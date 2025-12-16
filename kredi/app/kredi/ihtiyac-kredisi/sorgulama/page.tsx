'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

const formatAmount = (value: string) => {
  const number = parseFloat(value.replace(/[^0-9]/g, ''));
  if (isNaN(number)) return '';
  return new Intl.NumberFormat('tr-TR').format(number);
};

const formatCurrency = (value: string, showSymbol: boolean = true) => {
  const number = parseFloat(value.replace(/[^0-9.,]/g, ''));
  if (isNaN(number)) return '';
  const formatted = new Intl.NumberFormat('tr-TR').format(number);
  return showSymbol ? `${formatted} ₺` : `${formatted} ₺`;
};

export default function ConsumerLoanSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [amount, setAmount] = useState<string>(searchParams.get('amount') || '20000');
  const [selectedTerm, setSelectedTerm] = useState<string>(searchParams.get('term') || '30');
  
  const termOptions = [3, 6, 12, 24, 36];
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(currentDate);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value.replace(/[^0-9]/g, '');
    setAmount(newAmount);
    router.push(`/kredi/ihtiyac-kredisi/sorgulama?amount=${newAmount}&term=${selectedTerm}`);
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTerm = e.target.value;
    setSelectedTerm(newTerm);
    router.push(`/kredi/ihtiyac-kredisi/sorgulama?amount=${amount}&term=${newTerm}`);
  };

  const fetchLoans = async () => {
    try {
      // Placeholder for future API integration
      console.log('Fetching loans...');
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm mb-1">Kredi Tutarı</label>
            <div className="relative">
              <input
                type="text"
                value={formatAmount(amount)}
                onChange={handleAmountChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">TL</span>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Kredi Vadesi</label>
            <select
              value={selectedTerm}
              onChange={handleTermChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {termOptions.map((months) => (
                <option key={months} value={months}>{months} Ay</option>
              ))}
            </select>
          </div>
          <div className="flex-none">
            <button
              onClick={() => router.push(`/kredi/ihtiyac-kredisi/sorgulama?amount=${amount}&term=${selectedTerm}`)}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              Yeniden Hesapla
            </button>
          </div>
        </div>
      </div>

      {/* Title and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{formatAmount(amount)} ₺ {selectedTerm} Ay Vadeli İhtiyaç Kredileri</h1>
          <p className="text-gray-500 text-sm">{formattedDate}</p>
        </div>
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filtrele
        </button>
      </div>

      {/* Bank Cards */}
      <div className="space-y-6">
        {/* Enpara */}
        <div className="bg-white rounded-lg shadow-md border-2 border-purple-300 hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col sm:flex-row relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500"></div>
            <div className="p-4 bg-purple-50 sm:w-48 flex flex-col justify-center">
              <div className="relative mt-6">
                <div className="absolute -top-6 left-0 z-10">
                  <div className="text-purple-500 text-[10px] font-bold flex items-center gap-1">
                    <svg className="w-3 h-3 text-purple-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                    SPONSOR
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-[100px] h-[50px] bg-purple-200 flex items-center justify-center text-purple-800 font-bold text-base p-1 relative">
                    <div className="transform scale-75">EN</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm text-center">
                    Faizsiz Fırsat
                  </div>
                  <div className="text-purple-700 text-xs font-medium">
                    Yeni Müşterilere Özel
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-gray-100 flex-grow p-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500">Faiz Oranı</div>
                  <div className="text-lg font-semibold">%0 <span className="text-sm font-normal text-gray-500">(Faizsiz)</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Tutar</div>
                  <div className="text-lg font-semibold">50.000 ₺</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm text-gray-600 flex items-start gap-1">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>6 ay varan vade ile, 50.000 TL'ye kadar faizsiz ve masrafsız ihtiyaç kredisi!</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="w-40 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium">
                    Hemen Başvur
                  </button>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Koşullar</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QNB */}
        <div className="bg-white rounded-lg shadow-md border-2 border-blue-300 hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col sm:flex-row relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
            <div className="p-4 bg-blue-50 sm:w-48 flex flex-col justify-center">
              <div className="relative mt-6">
                <div className="absolute -top-6 left-0 z-10">
                  <div className="text-blue-500 text-[10px] font-bold flex items-center gap-1">
                    <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                    SPONSOR
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-[100px] h-[50px] bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-base p-1 relative">
                    <div className="transform scale-75">QNB</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm text-center">
                    Faizsiz Fırsat
                  </div>
                  <div className="text-blue-700 text-xs font-medium">
                    Yeni Müşterilere Özel
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-gray-100 flex-grow p-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500">Faiz Oranı</div>
                  <div className="text-lg font-semibold">%0 <span className="text-sm font-normal text-gray-500">(Faizsiz)</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Toplam</div>
                  <div className="text-lg font-semibold">55.000 ₺</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between">
                <div className="space-y-2">
                  <div className="text-sm font-light text-gray-600 flex items-start gap-1">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>3 ay vadeli, 30.000 TL ihtiyaç kredisi!</span>
                  </div>
                  <div className="text-sm font-light text-gray-600 flex items-start gap-1">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>3 ay vadeli, 25.000 TL taksitli nakit avans!</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 mt-3 sm:mt-0">
                  <button className="w-40 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium">
                    Hemen Başvur
                  </button>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Koşullar</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Akbank */}
        <div className="bg-white rounded-lg shadow-md border-2 border-red-300 hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col sm:flex-row relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-500"></div>
            <div className="p-4 bg-red-50 sm:w-48 flex flex-col justify-center">
              <div className="relative mt-6">
                <div className="absolute -top-6 left-0 z-10">
                  <div className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                    <svg className="w-3 h-3 text-red-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                    SPONSOR
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-[100px] h-[50px] bg-red-200 flex items-center justify-center text-red-800 font-bold text-base p-1 relative">
                    <div className="transform scale-75">AK</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-red-400 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm text-center">
                    Faizsiz Fırsat
                  </div>
                  <div className="text-red-700 text-xs font-medium">
                    Yeni Müşterilere Özel
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-gray-100 flex-grow p-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500">Faiz Oranı</div>
                  <div className="text-lg font-semibold">%0 <span className="text-sm font-normal text-gray-500">(Faizsiz)</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Toplam</div>
                  <div className="text-lg font-semibold">50.000 ₺</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm text-gray-600 flex items-start gap-1">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>3 ay vadeli 50.000 TL'ye varan Kredi!</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="w-40 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium">
                    Müşteri Ol
                  </button>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Koşullar</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Garanti */}
        <div className="bg-white rounded-lg shadow-md border-2 border-teal-300 hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col sm:flex-row relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500"></div>
            <div className="p-4 bg-teal-50 sm:w-48 flex flex-col justify-center">
              <div className="relative mt-6">
                <div className="absolute -top-6 left-0 z-10">
                  <div className="text-teal-500 text-[10px] font-bold flex items-center gap-1">
                    <svg className="w-3 h-3 text-teal-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                    SPONSOR
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-[100px] h-[50px] relative flex items-center justify-center p-1 bg-white overflow-hidden">
                    <Image src="/images/garanti logo.png" alt="Garanti" width={80} height={35} className="object-contain max-w-full max-h-full" />
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm text-center">
                    Faizsiz Fırsat
                  </div>
                  <div className="text-teal-700 text-xs font-medium">
                    Yeni Müşterilere Özel
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-gray-100 flex-grow p-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500">Faiz Oranı</div>
                  <div className="text-lg font-semibold">%0 <span className="text-sm font-normal text-gray-500">(Faizsiz)</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Toplam</div>
                  <div className="text-lg font-semibold">75.000 ₺</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between">
                <div className="space-y-2">
                  <div className="text-sm font-light text-gray-600 flex items-start gap-1">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>3 ay vadeli, 50.000 TL'ye varan kredi!</span>
                  </div>
                  <div className="text-sm font-light text-gray-600 flex items-start gap-1">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>3 ay vadeli, 25.000 TL'ye varan taksitli nakit avans!</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 mt-3 sm:mt-0">
                  <button className="w-40 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors font-medium">
                    Müşteri Ol
                  </button>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Koşullar</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* İş Bankası */}
        <div className="bg-white rounded-lg shadow-md border-2 border-indigo-300 hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col sm:flex-row relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500"></div>
            <div className="p-4 bg-indigo-50 sm:w-48 flex flex-col justify-center">
              <div className="relative mt-6">
                <div className="absolute -top-6 left-0 z-10">
                  <div className="text-indigo-500 text-[10px] font-bold flex items-center gap-1">
                    <svg className="w-3 h-3 text-indigo-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                    SPONSOR
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-[100px] h-[50px] relative flex items-center justify-center p-1 bg-white overflow-hidden">
                    <Image src="/images/is logo.png" alt="İş Bankası" width={80} height={35} className="object-contain max-w-full max-h-full" />
                  </div>
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm text-center">
                    Faizsiz Fırsat
                  </div>
                  <div className="text-indigo-700 text-xs font-medium">
                    Yeni Müşterilere Özel
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-gray-100 flex-grow p-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500">Faiz Oranı</div>
                  <div className="text-lg font-semibold">%0 <span className="text-sm font-normal text-gray-500">(Faizsiz)</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Tutar</div>
                  <div className="text-lg font-semibold">55.000 ₺</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between">
                <div className="space-y-2">
                  <div className="text-sm font-light text-gray-600 flex items-start gap-1">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!</span>
                  </div>
                  <div className="text-sm font-light text-gray-600 flex items-start gap-1">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>1 ay vadeli 30.000 TL'ye varan EK Hesap!</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 mt-3 sm:mt-0">
                  <button className="w-40 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors font-medium">
                    Müşteri Ol
                  </button>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Koşullar</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-gray-500 mt-6 mb-2">
          Kampanyaya dair ayrıntılı bilgi ve değerlendirme detayına "koşullar" butonundan ulaşabilirsiniz
        </div>
      </div>
    </div>
  );
}