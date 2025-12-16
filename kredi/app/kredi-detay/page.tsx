'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, Search, Filter, AlertTriangle, Info } from 'lucide-react'
import { useState } from 'react'

interface LoanType {
  id: string
  name: string
  description: string
  interestRange: string
  termRange: string
  amountRange: string
  features: string[]
  requirements: string[]
  documents: string[]
  imageUrl: string
}

export default function KrediDetayPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const loanTypes: LoanType[] = [
    {
      id: 'ihtiyac',
      name: 'İhtiyaç Kredisi',
      description: 'Tatil, eğitim, evlilik gibi çeşitli kişisel ihtiyaçlarınız için kullanabileceğiniz kredi türüdür.',
      interestRange: '%1.45 - %2.20',
      termRange: '3 - 36 ay',
      amountRange: '1.000₺ - 100.000₺',
      features: [
        'Masrafsız kredi imkanı',
        'Anında onay fırsatı',
        'Esnek ödeme seçenekleri',
        'İnternet bankacılığından başvuru'
      ],
      requirements: [
        '18 yaşını doldurmuş olmak',
        'Düzenli gelir sahibi olmak',
        'Kredi notu yeterli seviyede olmak'
      ],
      documents: [
        'Kimlik belgesi',
        'Gelir belgesi',
        'İkametgah'
      ],
      imageUrl: 'https://picsum.photos/400/200?random=2'
    },
    {
      id: 'konut',
      name: 'Konut Kredisi',
      description: 'Ev satın almak veya yenileme yapmak isteyen kişilere verilen uzun vadeli kredi türüdür.',
      interestRange: '%1.20 - %1.80',
      termRange: '12 - 120 ay',
      amountRange: '50.000₺ - 10.000.000₺',
      features: [
        'Uzun vade imkanı',
        'Düşük faiz oranları',
        '10 yıla varan vadeler',
        'Kredi hayat sigortası'
      ],
      requirements: [
        '18 yaşını doldurmuş olmak',
        'Düzenli gelir sahibi olmak',
        'Kredi notu yeterli seviyede olmak',
        'İpotek teminatı'
      ],
      documents: [
        'Kimlik belgesi',
        'Gelir belgesi',
        'Tapu fotokopisi',
        'Ekspertiz raporu'
      ],
      imageUrl: 'https://picsum.photos/400/200?random=3'
    },
    {
      id: 'tasit',
      name: 'Taşıt Kredisi',
      description: 'Yeni veya ikinci el araç satın almak isteyenlere sunulan orta vadeli kredi türüdür.',
      interestRange: '%1.35 - %2.10',
      termRange: '12 - 60 ay',
      amountRange: '10.000₺ - 500.000₺',
      features: [
        'Cazip faiz oranları',
        'Rehin işlemleri için destek',
        'Kasko ve sigorta avantajları',
        'Hızlı kredi onayı'
      ],
      requirements: [
        '18 yaşını doldurmuş olmak',
        'Düzenli gelir sahibi olmak',
        'Kredi notu yeterli seviyede olmak',
        'Araç rehini'
      ],
      documents: [
        'Kimlik belgesi',
        'Gelir belgesi',
        'Araç ruhsatı',
        'Proforma fatura'
      ],
      imageUrl: 'https://picsum.photos/400/200?random=4'
    },
    {
      id: 'ticari',
      name: 'Ticari Kredi',
      description: 'İşletmelerin finansman ihtiyaçlarını karşılamak için sunulan, işletme türüne göre özelleştirilebilen kredi türüdür.',
      interestRange: '%1.60 - %2.50',
      termRange: '3 - 48 ay',
      amountRange: '10.000₺ - 5.000.000₺',
      features: [
        'İşletmeye özel çözümler',
        'Esnek ödeme planları',
        'Teminat çeşitliliği',
        'Vergi avantajları'
      ],
      requirements: [
        'Aktif ticari faaliyet',
        'Vergi borcu olmaması',
        'Firma kredi notunun yeterli olması',
        'Teminat'
      ],
      documents: [
        'Ticaret sicil gazetesi',
        'Vergi levhası',
        'Son 3 yıl bilanço ve gelir tablosu',
        'Teminat belgeleri'
      ],
      imageUrl: 'https://picsum.photos/400/200?random=5'
    }
  ]

  const filteredLoans = activeFilter === 'all' 
    ? loanTypes 
    : loanTypes.filter(loan => loan.id === activeFilter)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-4 text-center">Kredi Detay</h1>
      <p className="text-center text-secondary-light mb-12 max-w-3xl mx-auto">
        İhtiyacınıza uygun kredi türlerini inceleyin, detaylı bilgiler ve karşılaştırmalar ile 
        en uygun krediyi seçin.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="lg:w-1/4">
          <div className="bg-background rounded-card shadow-card p-6 mb-6">
            <h2 className="text-xl font-heading font-subheading text-secondary mb-4">Kredi Türleri</h2>
            <div className="space-y-2">
              <button 
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-background-secondary text-secondary hover:bg-primary-light hover:text-white'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                Tüm Krediler
              </button>
              {loanTypes.map(loan => (
                <button 
                  key={loan.id}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeFilter === loan.id 
                      ? 'bg-primary text-white' 
                      : 'bg-background-secondary text-secondary hover:bg-primary-light hover:text-white'
                  }`}
                  onClick={() => setActiveFilter(loan.id)}
                >
                  {loan.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-card shadow-card p-6">
            <form onSubmit={handleSearch}>
              <div className="mb-4">
                <label className="block text-secondary-light text-sm mb-2">Arama</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Kredi türlerinde ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 pl-10 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-medium">
                    <Search size={16} />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-secondary-light text-sm mb-2">Filtrele</label>
                <div className="relative">
                  <select
                    className="w-full px-3 py-2 pl-10 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                  >
                    <option value="">Tüm Vade Seçenekleri</option>
                    <option value="short">Kısa Vade (3-12 ay)</option>
                    <option value="medium">Orta Vade (13-36 ay)</option>
                    <option value="long">Uzun Vade (37+ ay)</option>
                  </select>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-medium">
                    <Filter size={16} />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-secondary w-full">
                Filtreleri Uygula
              </button>
            </form>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 gap-6">
            {filteredLoans.map(loan => (
              <div key={loan.id} className="bg-background rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                      <Image 
                        src={loan.imageUrl} 
                        alt={loan.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="flex flex-col h-full">
                      <h2 className="text-2xl font-heading font-subheading text-secondary mb-2">{loan.name}</h2>
                      <p className="text-secondary-light mb-4">{loan.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="bg-background-secondary p-3 rounded-lg">
                          <p className="text-xs text-secondary-medium mb-1">Faiz Aralığı</p>
                          <p className="font-medium text-secondary">{loan.interestRange}</p>
                        </div>
                        <div className="bg-background-secondary p-3 rounded-lg">
                          <p className="text-xs text-secondary-medium mb-1">Vade Aralığı</p>
                          <p className="font-medium text-secondary">{loan.termRange}</p>
                        </div>
                        <div className="bg-background-secondary p-3 rounded-lg">
                          <p className="text-xs text-secondary-medium mb-1">Tutar Aralığı</p>
                          <p className="font-medium text-secondary">{loan.amountRange}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {loan.features.map((feature, index) => (
                          <span key={index} className="inline-flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            <Check size={12} className="mr-1" />
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto flex flex-wrap gap-3">
                        <Link href={`/kredi/${loan.id}`} className="btn-primary">
                          Detaylı Bilgi
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                        <Link href={`/kredi-hesaplama?type=${loan.id}`} className="btn-secondary">
                          Hesaplama Yap
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-background-secondary p-8 rounded-card mb-12">
        <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">Kredi Türleri Karşılaştırma</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background text-secondary">
                <th className="px-4 py-3 text-left rounded-tl-lg">Kredi Türü</th>
                <th className="px-4 py-3 text-left">Faiz Aralığı</th>
                <th className="px-4 py-3 text-left">Vade Aralığı</th>
                <th className="px-4 py-3 text-left">Min. Tutar</th>
                <th className="px-4 py-3 text-left">Max. Tutar</th>
                <th className="px-4 py-3 text-left">Teminat</th>
                <th className="px-4 py-3 text-left rounded-tr-lg">Başvuru</th>
              </tr>
            </thead>
            <tbody>
              {loanTypes.map((loan, index) => (
                <tr 
                  key={loan.id} 
                  className={`${index % 2 === 0 ? 'bg-background' : 'bg-background-secondary'} hover:bg-primary/5 transition-colors`}
                >
                  <td className="px-4 py-3 font-medium text-secondary">{loan.name}</td>
                  <td className="px-4 py-3">{loan.interestRange}</td>
                  <td className="px-4 py-3">{loan.termRange}</td>
                  <td className="px-4 py-3">{loan.amountRange.split(' - ')[0]}</td>
                  <td className="px-4 py-3">{loan.amountRange.split(' - ')[1]}</td>
                  <td className="px-4 py-3">
                    {loan.id === 'ihtiyac' ? 'Gerekmiyor' : 
                     loan.id === 'konut' ? 'İpotek' : 
                     loan.id === 'tasit' ? 'Araç Rehini' : 'Çeşitli'}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/kredi/${loan.id}`} className="text-primary">
                      Başvur
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-background p-8 rounded-card border border-primary/20">
        <div className="flex items-start">
          <div className="mr-4 text-primary">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-subheading text-secondary mb-2">Önemli Bilgilendirme</h3>
            <p className="text-secondary-light mb-4">
              Kredi başvurusu yapmadan önce, kredi koşullarını dikkatlice incelemeniz ve kendi bütçe planlamanızı yapmanız önerilir. 
              Kredi başvuruları, kredi notunuzu etkileyebilir ve bu nedenle sadece ihtiyaç duyduğunuz krediler için başvurmanız tavsiye edilir.
            </p>
            <div className="flex items-center">
              <Info size={16} className="text-primary mr-2" />
              <p className="text-sm text-secondary-medium">
                Hesaplama sonuçları bilgilendirme amaçlıdır ve banka teklifleri değişiklik gösterebilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 