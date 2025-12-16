'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown, RefreshCw, Search, Filter, TrendingUp, BarChart3, LineChart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Hisse senedi verilerini tutan interface
interface Hisse {
  kod: string
  isim: string
  son: string
  yuksek: string
  dusuk: string
  fark: string
  yuzde: string
  hacim: string
  zaman: string
  trend: 'up' | 'down' | 'neutral'
}

// Endeks verilerini tutan interface
interface Endeks {
  kod: string
  isim: string
  deger: string
  degisim: string
  trend: 'up' | 'down' | 'neutral'
}

// API yanıtı için interface
interface ApiResponse {
  hisseler: Hisse[]
  endeksler: Endeks[]
  guncellenmeZamani: string
  basarili: boolean
}

export default function HisseSenetleriPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredHisseler, setFilteredHisseler] = useState<Hisse[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: keyof Hisse; direction: 'ascending' | 'descending' } | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)

  // Verileri çeken fonksiyon
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/hisse-senetleri')
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      
      const result: ApiResponse = await response.json()
      
      if (result.basarili) {
        setData(result)
        setFilteredHisseler(result.hisseler)
      } else {
        throw new Error('Veri çekme başarısız')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu')
      console.error('Veri çekme hatası:', err)
    } finally {
      setLoading(false)
    }
  }

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    fetchData()
    
    // Her 5 dakikada bir verileri güncelle (300000 ms = 5 dakika)
    const interval = setInterval(() => {
      fetchData()
    }, 300000)
    
    return () => clearInterval(interval)
  }, [])

  // Arama terimi değiştiğinde filtreleme yap
  useEffect(() => {
    if (data) {
      const filtered = data.hisseler.filter(hisse => 
        hisse.kod.toLowerCase().includes(searchTerm.toLowerCase()) || 
        hisse.isim.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredHisseler(filtered)
    }
  }, [searchTerm, data])

  // Sıralama fonksiyonu
  const requestSort = (key: keyof Hisse) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    
    setSortConfig({ key, direction })
    
    // Sıralama işlemi
    const sortedData = [...filteredHisseler].sort((a, b) => {
      // Sayısal değerler için özel işlem
      if (key === 'son' || key === 'yuksek' || key === 'dusuk' || key === 'fark' || key === 'yuzde') {
        const aValue = parseFloat(a[key].replace(/[^0-9.-]+/g, ''))
        const bValue = parseFloat(b[key].replace(/[^0-9.-]+/g, ''))
        
        if (direction === 'ascending') {
          return aValue - bValue
        } else {
          return bValue - aValue
        }
      }
      
      // Metin değerleri için normal sıralama
      if (direction === 'ascending') {
        return a[key].localeCompare(b[key])
      } else {
        return b[key].localeCompare(a[key])
      }
    })
    
    setFilteredHisseler(sortedData)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Hisse Senetleri</h1>
            <p className="text-gray-600">
              Borsa İstanbul'da işlem gören hisse senetlerini takip edin ve güncel fiyatları görüntüleyin.
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <button 
              onClick={fetchData}
              className="flex items-center bg-[#ff3d00] hover:bg-[#e63600] text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Yenile
            </button>
            {data && (
              <div className="ml-4 text-sm text-gray-500">
                Son güncelleme: {data.guncellenmeZamani}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Endeksler Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Borsa Endeksleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.endeksler.map((endeks, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#ff3d00]">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-bold text-gray-800">{endeks.isim}</h3>
                  <p className="text-xs text-gray-500">{endeks.kod}</p>
                </div>
                <div className={`flex items-center ${endeks.trend === 'up' ? 'text-green-600' : endeks.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {endeks.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : endeks.trend === 'down' ? (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  ) : null}
                  <span>{endeks.degisim}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800">{endeks.deger}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Arama ve Filtreleme */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Hisse ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3d00] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="text-sm text-gray-600">
            Toplam: {filteredHisseler.length} hisse senedi
          </div>
        </div>
      </div>

      {/* Hisse Senetleri Tablosu */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {loading && !data ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff3d00] mx-auto mb-4"></div>
            <p className="text-gray-600">Hisse senedi verileri yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-[#ff3d00] hover:bg-[#e63600] text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Tekrar Dene
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('kod')}
                    >
                      <div className="flex items-center">
                        Sembol
                        {sortConfig?.key === 'kod' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('isim')}
                    >
                      <div className="flex items-center">
                        Şirket
                        {sortConfig?.key === 'isim' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('son')}
                    >
                      <div className="flex items-center justify-end">
                        Son
                        {sortConfig?.key === 'son' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('yuksek')}
                    >
                      <div className="flex items-center justify-end">
                        Yüksek
                        {sortConfig?.key === 'yuksek' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('dusuk')}
                    >
                      <div className="flex items-center justify-end">
                        Düşük
                        {sortConfig?.key === 'dusuk' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('fark')}
                    >
                      <div className="flex items-center justify-end">
                        Fark
                        {sortConfig?.key === 'fark' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('yuzde')}
                    >
                      <div className="flex items-center justify-end">
                        Değişim %
                        {sortConfig?.key === 'yuzde' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('hacim')}
                    >
                      <div className="flex items-center justify-end">
                        Hacim
                        {sortConfig?.key === 'hacim' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zaman
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHisseler
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((hisse, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{hisse.kod}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{hisse.isim}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {hisse.son}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          {hisse.yuksek}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          {hisse.dusuk}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className={`flex items-center justify-end ${hisse.trend === 'up' ? 'text-green-600' : hisse.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                            {hisse.trend === 'up' ? (
                              <ArrowUp className="w-4 h-4 mr-1" />
                            ) : hisse.trend === 'down' ? (
                              <ArrowDown className="w-4 h-4 mr-1" />
                            ) : null}
                            {hisse.fark}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className={`${hisse.trend === 'up' ? 'text-green-600' : hisse.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                            {hisse.yuzde}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {hisse.hacim}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {hisse.zaman}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            
            {/* Sayfalama */}
            {filteredHisseler.length > itemsPerPage && (
              <div className="flex justify-center items-center mt-6 pb-4">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Önceki
                  </button>
                  
                  {Array.from({ length: Math.min(5, Math.ceil(filteredHisseler.length / itemsPerPage)) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 rounded-md ${currentPage === pageNumber ? 'bg-[#ff3d00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  {Math.ceil(filteredHisseler.length / itemsPerPage) > 5 && (
                    <span className="px-4 py-2">...</span>
                  )}
                  
                  {Math.ceil(filteredHisseler.length / itemsPerPage) > 5 && (
                    <button
                      onClick={() => setCurrentPage(Math.ceil(filteredHisseler.length / itemsPerPage))}
                      className={`px-4 py-2 rounded-md ${currentPage === Math.ceil(filteredHisseler.length / itemsPerPage) ? 'bg-[#ff3d00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {Math.ceil(filteredHisseler.length / itemsPerPage)}
                    </button>
                  )}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredHisseler.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredHisseler.length / itemsPerPage)}
                    className={`px-4 py-2 rounded-md ${currentPage === Math.ceil(filteredHisseler.length / itemsPerPage) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Sonraki
                  </button>
                </div>
              </div>
            )}
            
            {/* Sayfa başına öğe sayısı seçimi */}
            <div className="flex justify-end items-center mt-4 pb-2 text-sm text-gray-600">
              <span className="mr-2">Sayfa başına:</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Sayfa başına öğe sayısı değiştiğinde ilk sayfaya dön
                }}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#ff3d00] focus:border-transparent"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* Bilgi Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#ff3d00]">
          <div className="flex justify-center mb-4">
            <TrendingUp className="w-12 h-12 text-[#ff3d00]" />
          </div>
          <h3 className="text-xl font-bold text-center mb-4">Hisse Senedi Yatırımı</h3>
          <p className="text-gray-600">
            Hisse senedi yatırımı, şirketlerin hisselerini satın alarak o şirketin ortağı olmanızı sağlar. 
            Şirketin büyümesi ve kâr etmesi durumunda, hisse değeriniz artar ve temettü geliri elde edebilirsiniz.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#ff3d00]">
          <div className="flex justify-center mb-4">
            <BarChart3 className="w-12 h-12 text-[#ff3d00]" />
          </div>
          <h3 className="text-xl font-bold text-center mb-4">Borsa Nasıl Çalışır?</h3>
          <p className="text-gray-600">
            Borsa, hisse senetlerinin alınıp satıldığı organize bir piyasadır. Yatırımcılar, aracı kurumlar 
            vasıtasıyla borsada işlem yapabilirler. Borsa İstanbul (BIST), Türkiye'deki tek borsadır.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#ff3d00]">
          <div className="flex justify-center mb-4">
            <LineChart className="w-12 h-12 text-[#ff3d00]" />
          </div>
          <h3 className="text-xl font-bold text-center mb-4">Yatırım Stratejileri</h3>
          <p className="text-gray-600">
            Hisse senedi yatırımında uzun vadeli yatırım, değer yatırımı, büyüme yatırımı gibi farklı stratejiler 
            mevcuttur. Kendi risk toleransınıza ve yatırım hedeflerinize uygun bir strateji belirlemeniz önemlidir.
          </p>
        </div>
      </div>

      {/* Uyarı Notu */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Hisse senedi verileri bilgi amaçlıdır. Yatırım kararlarınızı vermeden önce profesyonel danışmanlık alınız. 
              Veriler 5 dakikada bir güncellenmektedir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
