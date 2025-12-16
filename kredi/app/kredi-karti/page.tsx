'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const cardTypes = [
  {
    title: 'Aidatsız Kartlar',
    description: 'Yıllık ücret ödemeden kullanabileceğiniz kredi kartlarını inceleyin ve başvurun.',
    slug: 'aidatsiz-kartlar',
    imageUrl: 'https://picsum.photos/400/200?random=6'
  },
  {
    title: 'Ticari Kartlar',
    description: 'İşletmeniz için avantajlı ticari kredi kartlarını karşılaştırın ve hemen başvurun.',
    slug: 'ticari-kartlar',
    imageUrl: 'https://picsum.photos/400/200?random=7'
  },
  {
    title: 'Ek Fayda Sağlayan Kartlar',
    description: 'Alışverişlerinizde ekstra puan, indirim ve ayrıcalıklar sunan kredi kartlarını keşfedin.',
    slug: 'ek-fayda-saglayan-kartlar',
    imageUrl: 'https://picsum.photos/400/200?random=8'
  },
  {
    title: 'Mil Veren Kartlar',
    description: 'Seyahatlerinizde avantaj sağlayan, mil puanı biriktiren kredi kartlarını inceleyin.',
    slug: 'mil-veren-kartlar',
    imageUrl: 'https://picsum.photos/400/200?random=9'
  },
  {
    title: 'Öğrenci Kartları',
    description: 'Öğrencilere özel avantajlar sunan, uygun limitli kredi kartlarını keşfedin.',
    slug: 'ogrenci-kartlari',
    imageUrl: 'https://picsum.photos/400/200?random=10'
  }
]

export default function KrediKartiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-8 text-center">Kredi Kartları</h1>
      <p className="text-center text-secondary-light mb-12 max-w-3xl mx-auto">
        İhtiyaçlarınıza ve harcama alışkanlıklarınıza göre en uygun kredi kartını seçin, 
        avantajlı tekliflerden yararlanın ve anında başvurun.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardTypes.map((cardType, index) => (
          <div key={index} className="card group hover:border-primary transition-all">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <Image 
                src={cardType.imageUrl} 
                alt={cardType.title}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-slow"
              />
            </div>
            <h2 className="text-xl font-heading font-subheading text-secondary mb-2">{cardType.title}</h2>
            <p className="text-secondary-light text-sm mb-4">{cardType.description}</p>
            <Link 
              href={`/kredi-karti/${cardType.slug}`}
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              İncele
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
} 