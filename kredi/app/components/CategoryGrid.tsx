'use client'

import { CreditCard, Home, Car, Wallet, PiggyBank } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    title: 'İhtiyaç Kredisi',
    icon: Wallet,
    description: 'En uygun faiz oranlarıyla ihtiyaç kredisi',
    href: '/ihtiyac-kredisi'
  },
  {
    title: 'Konut Kredisi',
    icon: Home,
    description: 'Hayalinizdeki eve en uygun konut kredisi',
    href: '/konut-kredisi'
  },
  {
    title: 'Kredi Kartı',
    icon: CreditCard,
    description: 'Size en uygun kredi kartını seçin',
    href: '/kredi-karti'
  },
  {
    title: 'Taşıt Kredisi',
    icon: Car,
    description: 'Araç alımlarınız için taşıt kredisi',
    href: '/tasit-kredisi'
  },
  {
    title: 'Mevduat',
    icon: PiggyBank,
    description: 'En yüksek faizli mevduat hesapları',
    href: '/mevduat'
  }
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link
            key={category.title}
            href={category.href}
            className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <p className="text-secondary text-sm">{category.description}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
} 