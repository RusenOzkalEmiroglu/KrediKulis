'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const investmentTypes = [
  {
    title: 'Mevduat',
    description: 'En yüksek faiz oranına sahip mevduat hesaplarını karşılaştırın ve hemen başvurun.',
    slug: 'mevduat',
    imageUrl: 'https://picsum.photos/400/200?random=11'
  },
  {
    title: 'Altın',
    description: 'Güncel altın fiyatlarını takip edin, altın hesabı ve altına dayalı yatırım ürünlerini keşfedin.',
    slug: 'altin',
    imageUrl: 'https://picsum.photos/400/200?random=12'
  },
  {
    title: 'Döviz',
    description: 'Güncel döviz kurlarını takip edin, döviz hesaplarını karşılaştırın ve yatırım fırsatlarını değerlendirin.',
    slug: 'doviz',
    imageUrl: 'https://picsum.photos/400/200?random=13'
  },
  {
    title: 'Hisse Senedi',
    description: 'Borsa İstanbul\'da işlem gören hisse senetlerini takip edin ve yatırım fırsatlarını keşfedin.',
    slug: 'hisse-senedi',
    imageUrl: 'https://picsum.photos/400/200?random=14'
  },
  {
    title: 'Yatırım Fonları',
    description: 'Farklı risk gruplarına göre yatırım fonlarını karşılaştırın ve birikimlerinizi değerlendirin.',
    slug: 'yatirim-fonlari',
    imageUrl: 'https://picsum.photos/400/200?random=15'
  },
  {
    title: 'Endeksler',
    description: 'Borsa endekslerini takip edin, piyasa trendlerini analiz edin ve yatırım stratejinizi belirleyin.',
    slug: 'endeksler',
    imageUrl: 'https://picsum.photos/400/200?random=16'
  }
]

export default function VarliklarPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-8 text-center">Varlıklar</h1>
      <p className="text-center text-secondary-light mb-12 max-w-3xl mx-auto">
        Birikimlerinizi en iyi şekilde değerlendirmek için çeşitli yatırım araçlarını karşılaştırın, 
        risk tercihinize ve beklentilerinize uygun yatırım ürünlerini keşfedin.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {investmentTypes.map((investmentType, index) => (
          <div key={index} className="card group hover:border-primary transition-all">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <Image 
                src={investmentType.imageUrl} 
                alt={investmentType.title}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-slow"
              />
            </div>
            <h2 className="text-xl font-heading font-subheading text-secondary mb-2">{investmentType.title}</h2>
            <p className="text-secondary-light text-sm mb-4">{investmentType.description}</p>
            <Link 
              href={`/varliklar/${investmentType.slug}`}
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