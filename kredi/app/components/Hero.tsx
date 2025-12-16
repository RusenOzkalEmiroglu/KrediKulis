'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Tab = {
  id: string
  title: string
  placeholder: string
  image: string
}

const tabs: Tab[] = [
  {
    id: 'ihtiyac-kredisi',
    title: 'İhtiyaç Kredisi',
    placeholder: 'Ne kadar ihtiyaç krediniz var?',
    image: 'https://picsum.photos/300/150',
  },
  {
    id: 'konut-kredisi',
    title: 'Konut Kredisi',
    placeholder: 'Ne kadarlık konut kredisi arıyorsunuz?',
    image: 'https://picsum.photos/300/150',
  },
  {
    id: 'kredi-karti',
    title: 'Kredi Kartı',
    placeholder: 'Hangi özelliklerde kredi kartı arıyorsunuz?',
    image: 'https://picsum.photos/300/150',
  },
  {
    id: 'tasit-kredisi',
    title: 'Taşıt Kredisi',
    placeholder: 'Ne kadarlık taşıt kredisi arıyorsunuz?',
    image: 'https://picsum.photos/300/150',
  },
  {
    id: 'mevduat',
    title: 'Mevduat',
    placeholder: 'Ne kadarlık mevduat açmak istiyorsunuz?',
    image: 'https://picsum.photos/300/150',
  },
]

export default function Hero() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setSearchQuery('')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log(`Searching for ${searchQuery} in ${activeTab}`)
  }

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <div className="relative bg-transparent py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-3xl font-heading text-primary md:text-5xl">
            Türkiye'nin Finansal Süpermarketi
          </h1>
          <p className="mt-4 text-center text-xl text-secondary">
            Kredi, kredi kartı ve mevduat ürünlerini karşılaştırın, saniyeler içinde başvurun.
          </p>

          <div className="mt-12 rounded-card bg-background shadow-card">
            <div className="flex flex-wrap gap-2 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-3 text-sm font-medium transition duration-default ${
                    activeTab === tab.id
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-secondary-medium hover:text-secondary'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="mt-4 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={activeTabData?.placeholder || 'Ne arıyorsunuz?'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-button bg-primary p-2 text-white"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            <div className="mt-6 grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
              <div className="col-span-2">
                <Image
                  src={activeTabData?.image || 'https://picsum.photos/300/150'}
                  alt={activeTabData?.title || 'Kredi'}
                  width={300}
                  height={150}
                  className="h-auto w-full rounded-card object-cover"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-subheading text-secondary">Özel Fırsatlar</h3>
                  <p className="mt-2 text-sm text-secondary-light">
                    Size özel kredi tekliflerini görmek için hemen başvurun. Tüm bankaların en avantajlı faiz oranlarını karşılaştırın.
                  </p>
                </div>
                <Link
                  href={`/${activeTab}`}
                  className="btn-primary mt-4 inline-block text-center"
                >
                  Hemen Başvur
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 