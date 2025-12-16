'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Star } from 'lucide-react'

const products = [
  {
    id: 1,
    title: 'Akbank İhtiyaç Kredisi',
    rate: 3.19,
    term: 36,
    amount: 250000,
    rating: 4.5,
    reviews: 128,
    image: 'https://picsum.photos/200/100?random=1'
  },
  {
    id: 2,
    title: 'Yapı Kredi Konut Kredisi',
    rate: 2.89,
    term: 120,
    amount: 1500000,
    rating: 4.2,
    reviews: 95,
    image: 'https://picsum.photos/200/100?random=2'
  },
  {
    id: 3,
    title: 'Garanti BBVA Taşıt Kredisi',
    rate: 3.45,
    term: 48,
    amount: 500000,
    rating: 4.7,
    reviews: 156,
    image: 'https://picsum.photos/200/100?random=3'
  }
]

export default function FeaturedProducts() {
  return (
    <section className="bg-background-secondary py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-heading text-primary md:text-4xl">
          Öne Çıkan Ürünler
        </h2>
        <p className="mt-4 text-center text-lg text-secondary">
          En avantajlı kredi seçeneklerini keşfedin
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-card bg-background shadow-card transition duration-default hover:shadow-card-hover"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-default group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-subheading text-primary">{product.title}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-secondary">{product.rating}</span>
                  <span className="text-sm text-secondary">({product.reviews} değerlendirme)</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Faiz Oranı:</span>
                    <span className="font-medium">%{product.rate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Vade:</span>
                    <span className="font-medium">{product.term} Ay</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Tutar:</span>
                    <span className="font-medium">{product.amount.toLocaleString('tr-TR')} TL</span>
                  </div>
                </div>
                <Link
                  href="/kredi/ihtiyac-kredisi"
                  className="btn-primary mt-6 inline-flex w-full items-center justify-center"
                >
                  Hemen Başvur
                  <ChevronRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 