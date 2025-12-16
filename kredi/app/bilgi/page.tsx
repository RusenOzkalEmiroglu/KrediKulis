'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'

const articleCategories = [
  {
    title: 'Kredi Rehberi',
    description: 'Kredi alma, hesaplama ve yönetme süreçleri ile ilgili bilgi ve ipuçları',
    imageUrl: 'https://picsum.photos/400/200?random=20',
    slug: 'kredi-rehberi'
  },
  {
    title: 'Kredi Kartı Rehberi',
    description: 'Kredi kartı kullanımı, avantajları ve dikkat edilmesi gerekenler hakkında bilgiler',
    imageUrl: 'https://picsum.photos/400/200?random=21',
    slug: 'kredi-karti-rehberi'
  },
  {
    title: 'Yatırım Rehberi',
    description: 'Yatırım yapma ve birikimlerinizi değerlendirme hakkında faydalı bilgiler',
    imageUrl: 'https://picsum.photos/400/200?random=22',
    slug: 'yatirim-rehberi'
  },
  {
    title: 'Finansal Okur-Yazarlık',
    description: 'Finansal terminoloji ve temel finansal kavramlar hakkında bilgiler',
    imageUrl: 'https://picsum.photos/400/200?random=23',
    slug: 'finansal-okur-yazarlik'
  }
]

const featuredArticles = [
  {
    title: 'Kredi Notunu Yükseltmenin 5 Etkili Yolu',
    description: 'Kredi notunuzu kısa sürede yükseltmek için uzmanlardan öneriler',
    imageUrl: 'https://picsum.photos/400/200?random=24',
    slug: 'kredi-notunu-yukseltmenin-yollari'
  },
  {
    title: 'Kredi Kartı Puanları Nasıl Kullanılır?',
    description: 'Kredi kartı puanlarınızı en verimli şekilde değerlendirmenin yöntemleri',
    imageUrl: 'https://picsum.photos/400/200?random=25',
    slug: 'kredi-karti-puanlari-nasil-kullanilir'
  },
  {
    title: 'Ev Kredisi Almadan Önce Bilmeniz Gerekenler',
    description: 'Konut kredisi başvurusunda dikkat edilmesi gereken önemli noktalar',
    imageUrl: 'https://picsum.photos/400/200?random=26',
    slug: 'ev-kredisi-almadan-once-bilmeniz-gerekenler'
  }
]

export default function BilgiPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Implement search functionality
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-8 text-center">Bilgi Merkezi</h1>
      <p className="text-center text-secondary-light mb-8 max-w-3xl mx-auto">
        Finans dünyasında kendinizi geliştirin, doğru finansal kararlar alın. 
        Uzman içeriklerimizden yararlanarak finansal okuryazarlığınızı artırın.
      </p>
      
      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Finansal konularda bilgi arayın..."
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
      
      <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">Popüler Kategoriler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {articleCategories.map((category, index) => (
          <div key={index} className="card group hover:border-primary transition-all">
            <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
              <Image 
                src={category.imageUrl} 
                alt={category.title}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-slow"
              />
            </div>
            <h3 className="text-lg font-heading font-subheading text-secondary mb-2">{category.title}</h3>
            <p className="text-secondary-light text-sm mb-4">{category.description}</p>
            <Link 
              href={`/bilgi/${category.slug}`}
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              Tüm Makaleler
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        ))}
      </div>
      
      <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">Öne Çıkan Makaleler</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredArticles.map((article, index) => (
          <div key={index} className="card group hover:border-primary transition-all">
            <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
              <Image 
                src={article.imageUrl} 
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-slow"
              />
            </div>
            <h3 className="text-lg font-heading font-subheading text-secondary mb-2">{article.title}</h3>
            <p className="text-secondary-light text-sm mb-4">{article.description}</p>
            <Link 
              href={`/bilgi/makaleler/${article.slug}`}
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              Okumaya Devam Et
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
} 