'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const bankingProducts = [
  {
    title: 'Banka Müşterisi Ol',
    description: 'Şubeye gitmeden dijital kanallar üzerinden hızlıca banka müşterisi olun ve avantajlardan yararlanın.',
    slug: 'banka-musterisi-ol',
    imageUrl: 'https://picsum.photos/400/200?random=17'
  },
  {
    title: 'Emekli Bankacılığı',
    description: 'Emeklilere özel bankacılık hizmetlerini keşfedin, promosyon ve kampanyalardan yararlanın.',
    slug: 'emekli-bankaciligi',
    imageUrl: 'https://picsum.photos/400/200?random=18'
  },
  {
    title: 'Sigorta',
    description: 'İhtiyacınıza uygun sigorta ürünlerini karşılaştırın, en uygun teklifi alın ve hemen başvurun.',
    slug: 'sigorta',
    imageUrl: 'https://picsum.photos/400/200?random=19'
  }
]

export default function BankacilikUrunleriPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-8 text-center">Bankacılık Ürünleri</h1>
      <p className="text-center text-secondary-light mb-12 max-w-3xl mx-auto">
        Günlük bankacılık işlemlerinizi kolaylaştıracak ve ihtiyaçlarınızı karşılayacak
        bankacılık ürünlerini keşfedin, size en uygun bankayı seçin.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bankingProducts.map((product, index) => (
          <div key={index} className="card group hover:border-primary transition-all">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <Image 
                src={product.imageUrl} 
                alt={product.title}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-slow"
              />
            </div>
            <h2 className="text-xl font-heading font-subheading text-secondary mb-2">{product.title}</h2>
            <p className="text-secondary-light text-sm mb-4">{product.description}</p>
            <Link 
              href={`/bankacilik-urunleri/${product.slug}`}
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