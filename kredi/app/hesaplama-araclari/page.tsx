'use client'

import Link from 'next/link'
import { Calculator, Home, Car, DollarSign, PiggyBank, Briefcase, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface CalculatorTool {
  id: string
  title: string
  description: string
  icon: JSX.Element
  link: string
  popular?: boolean
}

export default function HesaplamaAraclariPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const calculatorTools: CalculatorTool[] = [
    {
      id: 'ihtiyac-kredisi',
      title: 'İhtiyaç Kredisi Hesaplama',
      description: 'İhtiyaç kredinizin aylık ödemesini ve toplam ödeme tutarını hesaplayın.',
      icon: <Calculator className="h-6 w-6 text-primary" />,
      link: '/kredi-hesaplama?type=ihtiyac',
      popular: true
    },
    {
      id: 'konut-kredisi',
      title: 'Konut Kredisi Hesaplama',
      description: 'Ev kredisi tutarı, vade ve faiz oranına göre aylık taksitlerinizi hesaplayın.',
      icon: <Home className="h-6 w-6 text-primary" />,
      link: '/kredi-hesaplama?type=konut',
      popular: true
    },
    {
      id: 'tasit-kredisi',
      title: 'Taşıt Kredisi Hesaplama',
      description: 'Araç kredinizin aylık taksitlerini ve toplam maliyetini hesaplayın.',
      icon: <Car className="h-6 w-6 text-primary" />,
      link: '/kredi-hesaplama?type=tasit',
      popular: true
    },
    {
      id: 'doviz-hesaplama',
      title: 'Döviz Hesaplama',
      description: 'Güncel kurlar ile döviz çeviricisi aracını kullanarak para birimlerini dönüştürün.',
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      link: '/hesaplama-araclari/doviz',
    },
    {
      id: 'mevduat-getiri',
      title: 'Mevduat Getiri Hesaplama',
      description: 'Vadeli mevduat hesabınızın vade sonundaki getirisini hesaplayın.',
      icon: <PiggyBank className="h-6 w-6 text-primary" />,
      link: '/hesaplama-araclari/mevduat-getiri',
      popular: true
    },
    {
      id: 'kredi-karti-taksit',
      title: 'Kredi Kartı Taksit Hesaplama',
      description: 'Kredi kartı taksitli alışveriş maliyetinizi ve aylık ödemelerinizi görün.',
      icon: <Calculator className="h-6 w-6 text-primary" />,
      link: '/hesaplama-araclari/kredi-karti-taksit',
    },
    {
      id: 'birikim-hesaplama',
      title: 'Birikim Hesaplama',
      description: 'Düzenli birikim yaparak ne kadar para biriktireceğinizi hesaplayın.',
      icon: <PiggyBank className="h-6 w-6 text-primary" />,
      link: '/hesaplama-araclari/birikim',
    },
    {
      id: 'emeklilik-hesaplama',
      title: 'Emeklilik Hesaplama',
      description: 'Bireysel emeklilik sistemindeki birikiminizin gelecekteki değerini hesaplayın.',
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      link: '/hesaplama-araclari/emeklilik',
    }
  ]

  const filteredTools = calculatorTools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const popularTools = calculatorTools.filter(tool => tool.popular)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-4 text-center">Hesaplama Araçları</h1>
      <p className="text-center text-secondary-light mb-12 max-w-3xl mx-auto">
        Finansal planlamanızı kolaylaştırmak için özel olarak tasarlanmış hesaplama araçlarımızı kullanın. 
        Kredi ödemeleri, getiri hesaplamaları ve daha fazlası için hızlı ve doğru sonuçlar alın.
      </p>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Hesaplama aracı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 border border-gray-200 rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Popular Tools Section */}
      {searchQuery === '' && (
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">Popüler Hesaplama Araçları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map(tool => (
              <Link 
                key={tool.id} 
                href={tool.link}
                className="bg-background rounded-card shadow-card p-6 hover:shadow-card-hover transition-all hover:bg-background-secondary group"
              >
                <div className="flex items-center justify-center mb-4 h-12 w-12 rounded-full bg-primary/10 mx-auto">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-heading font-subheading text-secondary mb-2 text-center group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-secondary-light text-sm text-center">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Tools Section */}
      <div>
        <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">
          {searchQuery === '' ? 'Tüm Hesaplama Araçları' : 'Arama Sonuçları'}
        </h2>
        
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTools.map(tool => (
              <Link 
                key={tool.id} 
                href={tool.link}
                className="flex items-center p-4 bg-background rounded-card shadow-card hover:shadow-card-hover transition-all hover:bg-background-secondary group"
              >
                <div className="mr-4 h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-subheading text-secondary group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-secondary-light text-sm">
                    {tool.description}
                  </p>
                </div>
                <div className="ml-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-background-secondary rounded-card">
            <p className="text-secondary-medium mb-2">Aradığınız hesaplama aracı bulunamadı.</p>
            <p className="text-secondary-light">Lütfen farklı bir arama terimi deneyin.</p>
          </div>
        )}
      </div>

      {/* Calculator Info Section */}
      <div className="mt-16 bg-background-secondary p-8 rounded-card">
        <h2 className="text-2xl font-heading font-subheading text-secondary mb-4">Hesaplama Araçları Hakkında</h2>
        <p className="text-secondary-light mb-4">
          Hesaplama araçlarımız, finansal kararlarınızı daha bilinçli almanıza yardımcı olmak için tasarlanmıştır. 
          Bu araçlar, kredi ödemelerinizi, yatırım getirilerinizi ve finansal hedeflerinize ulaşmak için gerekli birikimlerinizi planlamanızda size yardımcı olacaktır.
        </p>
        <p className="text-secondary-light mb-4">
          Her hesaplama aracı kullanımı kolay bir arayüz sunarak, karmaşık finansal hesaplamaları basitleştirir ve hızlı sonuçlar almanızı sağlar.
        </p>
        <div className="bg-background p-4 rounded-lg">
          <p className="text-sm text-secondary-medium italic">
            Not: Hesaplama sonuçları yaklaşık değerlerdir ve bilgilendirme amaçlıdır. 
            Gerçek değerler, bankaların güncel şartlarına ve diğer faktörlere göre değişiklik gösterebilir.
          </p>
        </div>
      </div>
    </div>
  )
} 