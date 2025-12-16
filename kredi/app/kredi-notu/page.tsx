'use client'

import { useState } from 'react'
import { FileText, Shield, Search, AlertCircle, CheckCircle, Info, ArrowRight, Lock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function KrediNotu() {
  const [tcKimlik, setTcKimlik] = useState('')
  const [telefon, setTelefon] = useState('')

  const raporOzellikleri = [
    {
      title: 'Kredi Notu Analizi',
      description: 'Güncel kredi notunuzu ve değişim grafiğini görün',
      icon: <Search className="text-primary" size={24} />,
    },
    {
      title: 'Kredi Uygunluğu',
      description: 'Hangi kredilere uygun olduğunuzu öğrenin',
      icon: <CheckCircle className="text-primary" size={24} />,
    },
    {
      title: 'Güvenli Sorgulama',
      description: 'Verileriniz SSL ile şifrelenerek korunur',
      icon: <Shield className="text-primary" size={24} />,
    },
  ]

  const raporIcerigi = [
    {
      title: 'Kredi Notu ve Skor',
      items: [
        'Findeks Kredi Notu',
        'KKB Risk Raporu',
        'Kredi Notu Değişim Grafiği',
        'Skor Detay Analizi',
      ],
    },
    {
      title: 'Kredi ve Kart Bilgileri',
      items: [
        'Açık Krediler',
        'Kapalı Krediler',
        'Kredi Kartları',
        'Limit ve Borç Bilgileri',
      ],
    },
    {
      title: 'Risk Analizi',
      items: [
        'Gecikme Bilgileri',
        'Ödeme Performansı',
        'Risk Göstergeleri',
        'İyileştirme Önerileri',
      ],
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">KrediKulis Finansal Raporu</h1>
        <p className="text-gray-600 mb-6">
          Kredi notunuzu öğrenin, finansal durumunuzu analiz edin ve size özel kredi tekliflerini görüntüleyin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {raporOzellikleri.map((ozellik, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              {ozellik.icon}
              <h3 className="font-bold ml-3">{ozellik.title}</h3>
            </div>
            <p className="text-gray-600">{ozellik.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Kredi Notunuzu Öğrenin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                T.C. Kimlik Numarası
              </label>
              <input
                type="text"
                value={tcKimlik}
                onChange={(e) => setTcKimlik(e.target.value)}
                className="w-full p-2 border rounded-md"
                maxLength={11}
                placeholder="T.C. Kimlik Numaranız"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cep Telefonu
              </label>
              <input
                type="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="05XX XXX XX XX"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Raporu Görüntüle
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Lock size={14} className="mr-1" />
            <span>Bilgileriniz SSL ile şifrelenerek korunmaktadır</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Rapor İçeriği</h2>
          <div className="space-y-6">
            {raporIcerigi.map((kategori, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3">{kategori.title}</h3>
                <ul className="space-y-2">
                  {kategori.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Info className="mr-2 text-primary" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Neden KrediKulis Finansal Raporu?</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <AlertCircle className="mr-2 text-primary mt-1" size={16} />
            <p>Kredi notunuzu ve değişimini anlık olarak takip edin</p>
          </li>
          <li className="flex items-start">
            <AlertCircle className="mr-2 text-primary mt-1" size={16} />
            <p>Size özel kredi ve kredi kartı tekliflerini görüntüleyin</p>
          </li>
          <li className="flex items-start">
            <AlertCircle className="mr-2 text-primary mt-1" size={16} />
            <p>Finansal durumunuzu iyileştirmek için öneriler alın</p>
          </li>
          <li className="flex items-start">
            <AlertCircle className="mr-2 text-primary mt-1" size={16} />
            <p>Risk raporunuzu detaylı olarak inceleyin</p>
          </li>
        </ul>
      </div>
    </div>
  )
} 