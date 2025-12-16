'use client'

import { useState } from 'react'
import { Book, Search, Tag, TrendingUp, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BilgiMerkezi() {
  const [aramaMetni, setAramaMetni] = useState('')

  const kategoriler = [
    {
      title: 'Kredi',
      icon: <TrendingUp className="text-primary" size={24} />,
      makaleler: [
        {
          baslik: 'Kredi Notu Nasıl Yükseltilir?',
          ozet: 'Kredi notunuzu yükseltmek için yapmanız gerekenler ve dikkat edilmesi gereken noktalar.',
          okunmaSuresi: '5 dk',
          etiketler: ['Kredi Notu', 'Finansal Sağlık'],
        },
        {
          baslik: 'İhtiyaç Kredisi Başvurusu Yaparken Dikkat Edilmesi Gerekenler',
          ozet: 'İhtiyaç kredisi başvurusu öncesinde bilmeniz gereken önemli detaylar ve ipuçları.',
          okunmaSuresi: '7 dk',
          etiketler: ['İhtiyaç Kredisi', 'Kredi Başvurusu'],
        },
      ],
    },
    {
      title: 'Kredi Kartları',
      icon: <FileText className="text-primary" size={24} />,
      makaleler: [
        {
          baslik: 'Kredi Kartı Puanları Nasıl Değerlendirilir?',
          ozet: 'Kredi kartı puanlarınızı en verimli şekilde kullanmanın yolları ve püf noktaları.',
          okunmaSuresi: '6 dk',
          etiketler: ['Kredi Kartı', 'Kart Puanları'],
        },
        {
          baslik: 'Aidatsız Kredi Kartı Seçerken Nelere Dikkat Edilmeli?',
          ozet: 'Aidatsız kredi kartı tercih ederken göz önünde bulundurmanız gereken kriterler.',
          okunmaSuresi: '4 dk',
          etiketler: ['Aidatsız Kart', 'Kart Seçimi'],
        },
      ],
    },
    {
      title: 'Yatırım',
      icon: <Book className="text-primary" size={24} />,
      makaleler: [
        {
          baslik: 'Döviz Yatırımı İçin En Uygun Zaman',
          ozet: 'Döviz yatırımı yaparken piyasa koşullarını değerlendirme ve doğru zamanlama yapma.',
          okunmaSuresi: '8 dk',
          etiketler: ['Döviz', 'Yatırım Zamanlaması'],
        },
        {
          baslik: 'Altın Hesabı Açarken Bilmeniz Gerekenler',
          ozet: 'Altın hesabı türleri, avantajları ve dikkat edilmesi gereken noktalar.',
          okunmaSuresi: '5 dk',
          etiketler: ['Altın', 'Yatırım Hesabı'],
        },
      ],
    },
  ]

  const filtrelenmisKategoriler = kategoriler.map(kategori => ({
    ...kategori,
    makaleler: kategori.makaleler.filter(makale =>
      makale.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      makale.ozet.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      makale.etiketler.some(etiket => 
        etiket.toLowerCase().includes(aramaMetni.toLowerCase())
      )
    )
  })).filter(kategori => kategori.makaleler.length > 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Bilgi Merkezi</h1>
        <p className="text-gray-600 mb-6">
          Finansal konularda bilgi edinmek ve doğru kararlar almak için rehber makalelerimizi inceleyin.
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            placeholder="Makalelerde ara..."
            className="w-full p-4 pl-12 border rounded-lg"
          />
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
        </div>
      </div>

      <div className="space-y-12">
        {filtrelenmisKategoriler.map((kategori, index) => (
          <div key={index}>
            <div className="flex items-center mb-6">
              {kategori.icon}
              <h2 className="text-2xl font-bold ml-3">{kategori.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kategori.makaleler.map((makale, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-bold text-lg mb-3">{makale.baslik}</h3>
                  <p className="text-gray-600 mb-4">{makale.ozet}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {makale.etiketler.map((etiket, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                      >
                        <Tag size={14} className="mr-1" />
                        {etiket}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Okuma süresi: {makale.okunmaSuresi}
                    </span>
                    <Link
                      href={`/bilgi-merkezi/makale/${makale.baslik.toLowerCase().replace(/ /g, '-')}`}
                      className="text-primary flex items-center hover:underline"
                    >
                      Devamını Oku
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Neden KrediBilgi?</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Book className="mr-2 text-primary mt-1" size={16} />
            <p>Güncel ve doğru finansal bilgiler</p>
          </li>
          <li className="flex items-start">
            <Book className="mr-2 text-primary mt-1" size={16} />
            <p>Uzman yazarlar tarafından hazırlanan içerikler</p>
          </li>
          <li className="flex items-start">
            <Book className="mr-2 text-primary mt-1" size={16} />
            <p>Anlaşılır ve pratik finansal tavsiyeler</p>
          </li>
          <li className="flex items-start">
            <Book className="mr-2 text-primary mt-1" size={16} />
            <p>Düzenli güncellenen bilgi bankası</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 