'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, AtSign } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function IletisimPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(true)
      return
    }
    
    setFormError(false)
    console.log('Form submitted with data:', formData)
    // Here you would typically send the data to your backend
    
    // Show success message
    setFormSubmitted(true)
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    // Reset success message after a few seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-4 text-center">İletişim</h1>
      <p className="text-center text-secondary-light mb-12 max-w-3xl mx-auto">
        Size yardımcı olmaktan mutluluk duyarız. Aşağıdaki iletişim formunu kullanarak, 
        telefon ile arayarak veya ofisimizi ziyaret ederek bize ulaşabilirsiniz.
      </p>

      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        <div className="lg:w-1/3">
          <div className="bg-background rounded-card shadow-card p-6 mb-6 h-full">
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">İletişim Bilgilerimiz</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-subheading font-medium text-secondary mb-1">Telefon</h3>
                  <p className="text-secondary-light mb-1">0850 555 5555</p>
                  <p className="text-secondary-light text-sm">Pazartesi - Cuma: 09:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-subheading font-medium text-secondary mb-1">E-posta</h3>
                  <p className="text-secondary-light mb-1">info@finansplatform.com</p>
                  <p className="text-secondary-light text-sm">Her zaman hizmetinizdeyiz</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-subheading font-medium text-secondary mb-1">Adres</h3>
                  <p className="text-secondary-light mb-1">Atatürk Bulvarı No: 123</p>
                  <p className="text-secondary-light mb-1">Çankaya / Ankara</p>
                  <p className="text-secondary-light text-sm">34. Kat</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-subheading font-medium text-secondary mb-1">Çalışma Saatleri</h3>
                  <p className="text-secondary-light mb-1">Pazartesi - Cuma: 09:00 - 18:00</p>
                  <p className="text-secondary-light">Cumartesi - Pazar: Kapalı</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="bg-background rounded-card shadow-card p-6 md:p-8">
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-6">Bize Ulaşın</h2>
            
            {formSubmitted && (
              <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                <div className="mr-2 flex-shrink-0">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Mesajınız bize ulaştı. En kısa sürede size dönüş yapacağız.</p>
              </div>
            )}
            
            {formError && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                <div className="mr-2 flex-shrink-0">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Lütfen tüm zorunlu alanları doldurun.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="name">
                    Adınız Soyadınız <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-medium">
                      <User size={16} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="email">
                    E-posta Adresiniz <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-medium">
                      <AtSign size={16} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="phone">
                    Telefon Numaranız
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-medium">
                      <Phone size={16} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-secondary-light text-sm mb-2" htmlFor="subject">
                    Konu
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                  >
                    <option value="">Konu Seçiniz</option>
                    <option value="kredi">Kredi İşlemleri</option>
                    <option value="kredi-karti">Kredi Kartı İşlemleri</option>
                    <option value="mevduat">Mevduat ve Yatırım</option>
                    <option value="finansal-rapor">Finansal Rapor</option>
                    <option value="sikayet">Şikayet ve Öneri</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-secondary-light text-sm mb-2" htmlFor="message">
                  Mesajınız <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pl-10 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  ></textarea>
                  <div className="absolute left-3 top-3 text-secondary-medium">
                    <MessageSquare size={16} />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="privacy"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  required
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-secondary-light">
                  <span className="text-red-500">*</span> Kişisel verilerimin işlenmesine ilişkin {' '}
                  <a href="/guvenlik/kisisel-verilerin-korunmasi" className="text-primary hover:underline">
                    Aydınlatma Metni
                  </a>
                  'ni okudum ve kabul ediyorum.
                </label>
              </div>
              
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <Send size={16} className="mr-2" />
                Mesajı Gönder
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="rounded-card shadow-card overflow-hidden h-96">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24386.60891668629!2d32.81997727962536!3d39.91757563869927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f190a9cea8f%3A0xd3862ea8248d08a0!2zw4dhbmtheWEsIEFua2FyYQ!5e0!3m2!1str!2str!4v1661850727255!5m2!1str!2str" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Ofis Konumu"
        ></iframe>
      </div>
    </div>
  )
} 