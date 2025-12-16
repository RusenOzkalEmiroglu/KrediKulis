'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: 'Merkez Bankası Faiz Kararını Açıkladı',
    excerpt: 'TCMB\'nin son faiz kararı ve piyasalara etkisi hakkında detaylı analiz.',
    image: 'https://picsum.photos/400/200?random=1',
    date: '15 Mart 2024',
    category: 'Ekonomi'
  },
  {
    id: 2,
    title: 'Konut Kredilerinde Yeni Dönem',
    excerpt: 'Konut kredilerinde yeni düzenlemeler ve avantajlı faiz oranları.',
    image: 'https://picsum.photos/400/200?random=2',
    date: '14 Mart 2024',
    category: 'Kredi'
  },
  {
    id: 3,
    title: 'Kredi Kartı Kullanımında Dikkat Edilmesi Gerekenler',
    excerpt: 'Kredi kartı kullanırken dikkat edilmesi gereken önemli noktalar.',
    image: 'https://picsum.photos/400/200?random=3',
    date: '13 Mart 2024',
    category: 'Finans'
  }
]

export default function NewsBlog() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Güncel Haberler</h2>
        <Link href="/blog" className="text-primary hover:text-primary/80 flex items-center">
          Tümünü Gör
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-secondary">{post.date}</span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-secondary text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 