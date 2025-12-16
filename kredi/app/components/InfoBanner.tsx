'use client'

import Link from 'next/link'
import { Shield, Clock, ThumbsUp } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Güvenli İşlem',
    description: 'SSL sertifikalı güvenli başvuru sistemi'
  },
  {
    icon: Clock,
    title: 'Hızlı Sonuç',
    description: 'Anında kredi başvuru sonucu'
  },
  {
    icon: ThumbsUp,
    title: 'En İyi Teklifler',
    description: 'Tüm bankaların en avantajlı teklifleri'
  }
]

export default function InfoBanner() {
  return (
    <section className="bg-primary py-12 text-white md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-heading md:text-4xl">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              En uygun kredi seçeneklerini sizin için bir araya getirdik. Hemen başvurun, anında
              sonuç alın.
            </p>
            <Link
              href="/kredi/basvuru"
              className="btn-secondary mt-8 inline-block"
            >
              Hemen Başvur
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="rounded-card bg-white bg-opacity-10 p-6 backdrop-blur-sm"
                >
                  <Icon className="h-8 w-8" />
                  <h3 className="mt-4 text-lg font-subheading">{feature.title}</h3>
                  <p className="mt-2 text-sm opacity-90">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 