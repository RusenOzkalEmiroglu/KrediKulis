'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Clock, Tag, Search } from 'lucide-react'
import { useState } from 'react'

const newsCategories = [
  { title: 'Tümü', slug: 'tumu', count: 128 },
  { title: 'Ekonomi', slug: 'ekonomi', count: 45 },
  { title: 'Bankacılık', slug: 'bankacilik', count: 32 },
  { title: 'Kredi', slug: 'kredi', count: 24 },
  { title: 'Yatırım', slug: 'yatirim', count: 18 },
  { title: 'Kripto Para', slug: 'kripto-para', count: 9 }
]

const featuredNews = {
  title: 'Merkez Bankası Faiz Kararını Açıkladı',
  description: 'Türkiye Cumhuriyet Merkez Bankası, 2023 yılının ilk çeyreğindeki para politikası kararını açıkladı. Faiz oranları ve piyasalara etkisi...',
  imageUrl: 'https://picsum.photos/800/400?random=27',
  date: '24 Mart 2023',
  readTime: '5 dakika',
  category: 'Ekonomi',
  slug: 'merkez-bankasi-faiz-kararini-acikladi'
}

const newsList = [
  {
    title: 'Konut Kredisi Faizlerinde Son Durum',
    description: 'Bankaların konut kredisi faiz oranlarındaki değişiklikler ve bunun konut piyasasına etkileri...',
    imageUrl: 'https://picsum.photos/400/200?random=28',
    date: '22 Mart 2023',
    readTime: '4 dakika',
    category: 'Kredi',
    slug: 'konut-kredisi-faizlerinde-son-durum'
  },
  {
    title: 'Dijital Bankacılık Kullanımı Artıyor',
    description: 'Pandemi sonrası dijital bankacılık kullanımındaki artış ve bankaların dijital dönüşüm stratejileri...',
    imageUrl: 'https://picsum.photos/400/200?random=29',
    date: '20 Mart 2023',
    readTime: '3 dakika',
    category: 'Bankacılık',
    slug: 'dijital-bankacilik-kullanimi-artiyor'
  },
  {
    title: 'Altın Yatırımında Dikkat Edilmesi Gerekenler',
    description: 'Altın fiyatlarındaki dalgalanmalar ve yatırımcıların bilmesi gereken kritik noktalar...',
    imageUrl: 'https://picsum.photos/400/200?random=30',
    date: '18 Mart 2023',
    readTime: '6 dakika',
    category: 'Yatırım',
    slug: 'altin-yatiriminda-dikkat-edilmesi-gerekenler'
  },
  {
    title: 'Kredi Kartı Borçlarını Yapılandırma Fırsatı',
    description: 'Bankaların sunduğu kredi kartı borç yapılandırma seçenekleri ve avantajları...',
    imageUrl: 'https://picsum.photos/400/200?random=31',
    date: '16 Mart 2023',
    readTime: '4 dakika',
    category: 'Kredi',
    slug: 'kredi-karti-borclarini-yapilandirma-firsati'
  },
  {
    title: 'Kripto Para Piyasasında Son Gelişmeler',
    description: 'Bitcoin ve diğer kripto para birimlerindeki son dalgalanmalar ve uzman yorumları...',
    imageUrl: 'https://picsum.photos/400/200?random=32',
    date: '14 Mart 2023',
    readTime: '5 dakika',
    category: 'Kripto Para',
    slug: 'kripto-para-piyasasinda-son-gelismeler'
  },
  {
    title: 'İhtiyaç Kredisi Faizleri Düşüyor',
    description: 'Bankaların ihtiyaç kredisi faiz oranlarındaki indirimler ve kredi başvuru koşulları...',
    imageUrl: 'https://picsum.photos/400/200?random=33',
    date: '12 Mart 2023',
    readTime: '3 dakika',
    category: 'Kredi',
    slug: 'ihtiyac-kredisi-faizleri-dusuyor'
  }
]

export default function HaberlerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('tumu')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Implement search functionality
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-8 text-center">Finans Haberleri</h1>
      <p className="text-center text-secondary-light mb-8 max-w-3xl mx-auto">
        Ekonomi, bankacılık ve finans dünyasındaki son gelişmelerden haberdar olun.
        Güncel haberler ve uzman analizleriyle finansal gelişmeleri takip edin.
      </p>
      
      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Haber arayın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full py-3 pl-4 pr-12"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
          >
            <Search size={20} />
          </button>
        </form>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {newsCategories.map((category) => (
          <button
            key={category.slug}
            onClick={() => setActiveCategory(category.slug)}
            className={`px-4 py-2 rounded-button text-sm transition-colors ${
              activeCategory === category.slug
                ? 'bg-primary text-white'
                : 'bg-background-secondary text-secondary hover:bg-primary-light hover:text-white'
            }`}
          >
            {category.title} ({category.count})
          </button>
        ))}
      </div>
      
      {/* Featured News */}
      <div className="rounded-card overflow-hidden shadow-card mb-12">
        <div className="relative h-80 md:h-96">
          <Image
            src={featuredNews.imageUrl}
            alt={featuredNews.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-flex items-center text-sm">
                <Calendar size={16} className="mr-1" />
                {featuredNews.date}
              </span>
              <span className="inline-flex items-center text-sm">
                <Clock size={16} className="mr-1" />
                {featuredNews.readTime}
              </span>
              <span className="inline-flex items-center text-sm">
                <Tag size={16} className="mr-1" />
                {featuredNews.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-subheading mb-2">{featuredNews.title}</h2>
            <p className="text-white/90 mb-4">{featuredNews.description}</p>
            <Link
              href={`/haberler/${featuredNews.slug}`}
              className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-button hover:bg-primary-dark transition-colors"
            >
              Haberi Oku
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* News List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.map((news, index) => (
          <div key={index} className="card group hover:border-primary transition-all">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <Image 
                src={news.imageUrl} 
                alt={news.title}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-slow"
              />
            </div>
            <div className="flex items-center gap-4 mb-3 text-secondary-medium text-xs">
              <span className="inline-flex items-center">
                <Calendar size={14} className="mr-1" />
                {news.date}
              </span>
              <span className="inline-flex items-center">
                <Clock size={14} className="mr-1" />
                {news.readTime}
              </span>
            </div>
            <span className="inline-block mb-2 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
              {news.category}
            </span>
            <h3 className="text-lg font-heading font-subheading text-secondary mb-2">{news.title}</h3>
            <p className="text-secondary-light text-sm mb-4">{news.description}</p>
            <Link 
              href={`/haberler/${news.slug}`}
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              Devamını Oku
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="btn-secondary">Daha Fazla Haber Yükle</button>
      </div>
    </div>
  )
} 