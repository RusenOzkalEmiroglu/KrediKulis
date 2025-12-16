'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, X, CreditCard, Shield, Clock, Star, Info } from 'lucide-react'
import Link from 'next/link'

// Card type interface
interface CardType {
  id: number
  name: string
  description: string
  annual_fee: number
  interest_rate: number
  bonus_rate: number
  benefits: string[]
  image: string
  color: string
  recommended?: boolean
}

export default function KrediKartiBasvuruPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    identity: '',
    phone: '',
    email: '',
    income: '',
    employment: 'employee',
    address: '',
    city: '',
    consent: false
  })

  // Sample card data
  const cardTypes: CardType[] = [
    {
      id: 1,
      name: "Classic Card",
      description: "Temel ihtiyaçlarınız için ideal kart",
      annual_fee: 140,
      interest_rate: 2.89,
      bonus_rate: 0.5,
      benefits: ["Temel alışveriş sigortası", "Online alışveriş koruması", "3 taksit imkanı"],
      image: "/images/classic-card.png",
      color: "bg-gradient-to-r from-gray-400 to-gray-600"
    },
    {
      id: 2,
      name: "Gold Card",
      description: "Avantajlı alışverişler için",
      annual_fee: 300,
      interest_rate: 2.69,
      bonus_rate: 1.0,
      benefits: ["Seyahat sigortası", "Restoran indirimleri", "6 taksit imkanı", "Araç kiralama indirimleri"],
      image: "/images/gold-card.png",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      recommended: true
    },
    {
      id: 3,
      name: "Platinum Card",
      description: "Premium ayrıcalıklar için lüks kart",
      annual_fee: 600,
      interest_rate: 2.49,
      bonus_rate: 1.5,
      benefits: ["Kapsamlı seyahat sigortası", "Lounge erişimi", "Concierge hizmeti", "12 taksit imkanı", "Özel indirimler"],
      image: "/images/platinum-card.png",
      color: "bg-gradient-to-r from-gray-700 to-gray-900"
    }
  ]

  const handleCardSelect = (id: number) => {
    setSelectedCard(id)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleContinue = () => {
    if (formStep === 1 && selectedCard !== null) {
      setFormStep(2)
    } else if (formStep === 2) {
      setFormStep(3)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to a server
    alert('Başvurunuz alınmıştır. En kısa sürede sizinle iletişime geçilecektir.')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-4 text-center">Kredi Kartı Başvurusu</h1>
      <p className="text-center text-secondary-light mb-12 max-w-3xl mx-auto">
        İhtiyaçlarınıza uygun kredi kartını seçin, hemen başvurun!
      </p>
      
      <div className="max-w-5xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-background-secondary -z-10"></div>
          
          <div className={`flex flex-col items-center z-10 ${formStep >= 1 ? 'text-primary' : 'text-secondary-light'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-primary text-white' : 'bg-background-secondary text-secondary-light'} mb-2`}>
              <CreditCard size={20} />
            </div>
            <span className="text-sm">Kart Seçimi</span>
          </div>
          
          <div className={`flex flex-col items-center z-10 ${formStep >= 2 ? 'text-primary' : 'text-secondary-light'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-primary text-white' : 'bg-background-secondary text-secondary-light'} mb-2`}>
              <Shield size={20} />
            </div>
            <span className="text-sm">Kişisel Bilgiler</span>
          </div>
          
          <div className={`flex flex-col items-center z-10 ${formStep >= 3 ? 'text-primary' : 'text-secondary-light'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formStep >= 3 ? 'bg-primary text-white' : 'bg-background-secondary text-secondary-light'} mb-2`}>
              <Clock size={20} />
            </div>
            <span className="text-sm">Başvuru Onayı</span>
          </div>
        </div>
        
        {/* Step 1: Card Selection */}
        {formStep === 1 && (
          <div>
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">Kredi Kartı Seçimi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {cardTypes.map((card) => (
                <div 
                  key={card.id}
                  className={`rounded-card bg-background p-6 border-2 transition-all cursor-pointer relative ${
                    selectedCard === card.id ? 'border-primary shadow-card-hover' : 'border-transparent shadow-card'
                  }`}
                  onClick={() => handleCardSelect(card.id)}
                >
                  {card.recommended && (
                    <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-medium py-1 px-2 rounded-full flex items-center">
                      <Star size={14} className="mr-1" />
                      Önerilen
                    </div>
                  )}
                  
                  <div className={`relative h-48 ${card.color} rounded-lg mb-4 flex items-center justify-center`}>
                    <div className="absolute inset-0 opacity-15 bg-gradient-to-br from-white via-transparent to-black"></div>
                    <Image 
                      src={card.image}
                      alt={card.name}
                      width={250}
                      height={150}
                      className="w-5/6 object-contain"
                    />
                  </div>
                  
                  <h3 className="text-lg font-heading font-subheading text-secondary mb-2">{card.name}</h3>
                  <p className="text-secondary-light text-sm mb-3">{card.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-secondary-medium">Yıllık Ücret</p>
                      <p className="font-medium text-secondary">{formatCurrency(card.annual_fee)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary-medium">Faiz Oranı</p>
                      <p className="font-medium text-secondary">%{card.interest_rate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary-medium">Puan Oranı</p>
                      <p className="font-medium text-secondary">%{card.bonus_rate}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium text-secondary mb-2">Avantajlar</h4>
                  <ul className="text-xs text-secondary-light space-y-1 mb-4">
                    {card.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={14} className="text-primary shrink-0 mr-1 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {selectedCard === card.id && (
                    <div className="absolute top-3 left-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button 
                className={`btn-primary ${!selectedCard ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={!selectedCard}
                onClick={handleContinue}
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Personal Information Form */}
        {formStep === 2 && (
          <div>
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">Kişisel Bilgileriniz</h2>
            
            <div className="bg-background rounded-card shadow-card p-6 mb-8">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="name">Ad Soyad</label>
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="identity">TC Kimlik No</label>
                  <input 
                    id="identity"
                    name="identity"
                    type="text" 
                    value={formData.identity}
                    onChange={handleInputChange}
                    minLength={11}
                    maxLength={11}
                    className="w-full px-3 py-2 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="phone">Telefon Numarası</label>
                  <input 
                    id="phone"
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="email">E-posta</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="income">Aylık Geliriniz</label>
                  <input 
                    id="income"
                    name="income"
                    type="number" 
                    value={formData.income}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="employment">Çalışma Durumu</label>
                  <select 
                    id="employment"
                    name="employment"
                    value={formData.employment}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="employee">Çalışan</option>
                    <option value="self-employed">Serbest Meslek</option>
                    <option value="business-owner">İş Yeri Sahibi</option>
                    <option value="retired">Emekli</option>
                    <option value="student">Öğrenci</option>
                    <option value="unemployed">Çalışmıyor</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="address">Adres</label>
                  <textarea 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="city">Şehir</label>
                  <input 
                    id="city"
                    name="city"
                    type="text" 
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-start mb-4">
                    <input 
                      type="checkbox" 
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="mr-2 mt-1"
                      required
                    />
                    <span className="text-secondary-light text-sm">
                      Kişisel verilerimin işlenmesine ilişkin <Link href="/kvkk" className="text-primary">Aydınlatma Metni</Link>'ni 
                      okudum ve anladım. Başvurum için bu verilerin işlenmesine onay veriyorum.
                    </span>
                  </label>
                </div>
              </form>
              
              <div className="text-center mt-4">
                <button 
                  className="btn-secondary mr-4"
                  onClick={() => setFormStep(1)}
                >
                  Geri Dön
                </button>
                <button 
                  className={`btn-primary ${!formData.name || !formData.identity || !formData.phone || !formData.email || !formData.income || !formData.address || !formData.city || !formData.consent ? 'opacity-50 cursor-not-allowed' : ''}`} 
                  disabled={!formData.name || !formData.identity || !formData.phone || !formData.email || !formData.income || !formData.address || !formData.city || !formData.consent}
                  onClick={handleContinue}
                >
                  Devam Et
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Application Summary */}
        {formStep === 3 && (
          <div>
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">Başvuru Özeti</h2>
            
            <div className="bg-background rounded-card shadow-card p-6 mb-8">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-lg font-heading font-subheading text-secondary mb-4">Seçilen Kart</h3>
                
                {selectedCard && (
                  <div className="flex items-start md:items-center flex-col md:flex-row">
                    <div className={`relative h-24 w-48 ${cardTypes[selectedCard-1].color} rounded-lg mb-4 md:mb-0 md:mr-6 flex items-center justify-center shrink-0`}>
                      <div className="absolute inset-0 opacity-15 bg-gradient-to-br from-white via-transparent to-black"></div>
                      <Image 
                        src={cardTypes[selectedCard-1].image}
                        alt={cardTypes[selectedCard-1].name}
                        width={150}
                        height={90}
                        className="w-4/5 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-subheading text-secondary mb-1">{cardTypes[selectedCard-1].name}</h3>
                      <p className="text-secondary-light text-sm mb-2">{cardTypes[selectedCard-1].description}</p>
                      <div className="flex flex-wrap gap-4">
                        <div>
                          <p className="text-xs text-secondary-medium">Yıllık Ücret</p>
                          <p className="font-medium text-secondary">{formatCurrency(cardTypes[selectedCard-1].annual_fee)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-medium">Faiz Oranı</p>
                          <p className="font-medium text-secondary">%{cardTypes[selectedCard-1].interest_rate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-medium">Puan Oranı</p>
                          <p className="font-medium text-secondary">%{cardTypes[selectedCard-1].bonus_rate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-lg font-heading font-subheading text-secondary mb-4">Kişisel Bilgiler</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-secondary-medium">Ad Soyad</p>
                    <p className="text-secondary">{formData.name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-medium">TC Kimlik No</p>
                    <p className="text-secondary">{formData.identity || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-medium">Telefon</p>
                    <p className="text-secondary">{formData.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-medium">E-posta</p>
                    <p className="text-secondary">{formData.email || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-medium">Aylık Gelir</p>
                    <p className="text-secondary">{formData.income ? formatCurrency(Number(formData.income)) : '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-medium">Çalışma Durumu</p>
                    <p className="text-secondary">
                      {formData.employment === 'employee' ? 'Çalışan' : 
                       formData.employment === 'self-employed' ? 'Serbest Meslek' :
                       formData.employment === 'business-owner' ? 'İş Yeri Sahibi' :
                       formData.employment === 'retired' ? 'Emekli' :
                       formData.employment === 'student' ? 'Öğrenci' : 'Çalışmıyor'}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-secondary-medium">Adres</p>
                    <p className="text-secondary">{formData.address || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-medium">Şehir</p>
                    <p className="text-secondary">{formData.city || '-'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-heading font-subheading text-secondary mb-4">Önemli Bilgiler</h3>
                
                <ul className="text-sm text-secondary-light space-y-2">
                  <li className="flex items-start">
                    <Info size={16} className="text-primary shrink-0 mr-2 mt-1" />
                    <span>Başvurunuz gönderildikten sonra, 48 saat içinde işleme alınacaktır.</span>
                  </li>
                  <li className="flex items-start">
                    <Info size={16} className="text-primary shrink-0 mr-2 mt-1" />
                    <span>Kredi kartı değerlendirme sürecinde ek belgeler talep edilebilir.</span>
                  </li>
                  <li className="flex items-start">
                    <Info size={16} className="text-primary shrink-0 mr-2 mt-1" />
                    <span>Başvuru sonucunuz SMS ve e-posta yoluyla tarafınıza bildirilecektir.</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <button 
                  className="btn-secondary mr-4"
                  onClick={() => setFormStep(2)}
                >
                  Geri Dön
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSubmit}
                >
                  Başvuruyu Tamamla
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Why Choose Us */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-subheading text-secondary mb-8 text-center">Neden Kredi Kartımızı Seçmelisiniz?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-card shadow-card p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Shield size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-heading font-subheading text-secondary mb-2">Güvenli Alışveriş</h3>
              <p className="text-secondary-light text-sm">
                Gelişmiş güvenlik teknolojileri ile donatılmış kartlarımız, alışverişlerinizde maksimum güvenlik sağlar.
              </p>
            </div>
            
            <div className="bg-background rounded-card shadow-card p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Star size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-heading font-subheading text-secondary mb-2">Avantajlı Kampanyalar</h3>
              <p className="text-secondary-light text-sm">
                Size özel hazırlanmış kampanyalar ve indirimlerle alışverişlerinizden maksimum fayda sağlayın.
              </p>
            </div>
            
            <div className="bg-background rounded-card shadow-card p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Clock size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-heading font-subheading text-secondary mb-2">Hızlı Başvuru Süreci</h3>
              <p className="text-secondary-light text-sm">
                Basit ve hızlı başvuru süreci ile ihtiyacınız olan kredi kartına anında başvurun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 