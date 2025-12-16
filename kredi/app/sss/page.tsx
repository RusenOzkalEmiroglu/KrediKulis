'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, CreditCard, HelpCircle, DollarSign, Shield, Percent } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export default function SSSPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFAQs, setOpenFAQs] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('all')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const toggleFAQ = (id: string) => {
    setOpenFAQs(prevOpenFAQs => 
      prevOpenFAQs.includes(id)
        ? prevOpenFAQs.filter(faqId => faqId !== id)
        : [...prevOpenFAQs, id]
    )
  }

  const categories = [
    { id: 'all', name: 'Tüm Sorular', icon: <HelpCircle size={20} /> },
    { id: 'kredi', name: 'Krediler', icon: <DollarSign size={20} /> },
    { id: 'kredi-karti', name: 'Kredi Kartları', icon: <CreditCard size={20} /> },
    { id: 'guvenlik', name: 'Güvenlik', icon: <Shield size={20} /> },
    { id: 'yatirim', name: 'Yatırımlar', icon: <Percent size={20} /> }
  ]

  const faqs: FAQ[] = [
    {
      id: 'faq-1',
      question: 'Kredi başvurusu yapmak için hangi belgeler gerekli?',
      answer: 'Kredi başvurusu için genellikle kimlik belgesi, gelir belgesi ve ikametgah belgesi gerekmektedir. Kredi türüne bağlı olarak ek belgeler istenebilir. İhtiyaç kredisi için genellikle bu üç belge yeterli olurken, konut kredisi için tapu ve ekspertiz raporu, taşıt kredisi içinse araç bilgileri ve proforma fatura gibi ek belgelere ihtiyaç duyulabilir.',
      category: 'kredi'
    },
    {
      id: 'faq-2',
      question: 'Kredi notumu nasıl öğrenebilirim?',
      answer: 'Kredi notunuzu e-Devlet üzerinden, Findeks veya KKB (Kredi Kayıt Bürosu) sistemleri aracılığıyla öğrenebilirsiniz. Findeks\'ten yılda bir kez ücretsiz kredi notunuzu sorgulayabilirsiniz. Ayrıca bazı bankalar da internet bankacılığı veya mobil uygulamaları üzerinden kredi notu sorgulama hizmeti sunmaktadır.',
      category: 'kredi'
    },
    {
      id: 'faq-3',
      question: 'Kredi başvurum reddedilirse ne yapmalıyım?',
      answer: 'Kredi başvurunuz reddedilirse, öncelikle ret nedenini öğrenmeye çalışın. Genellikle düşük kredi notu, yetersiz gelir veya mevcut borç yükü gibi faktörler ret nedenlerindendir. Kredi notunuzu yükseltmek için: düzenli ödeme yapmak, kredi kartı limitinizin %30\'undan fazlasını kullanmamak ve gereksiz kredi başvurularından kaçınmak faydalı olacaktır. 3-6 ay sonra yeniden başvurmak daha olumlu sonuç verebilir.',
      category: 'kredi'
    },
    {
      id: 'faq-4',
      question: 'Kredi kartımı kaybettim, ne yapmalıyım?',
      answer: 'Kredi kartınızı kaybettiğinizde veya çaldırdığınızda, hemen kartı veren bankanın 7/24 müşteri hizmetlerini arayarak kartınızı bloke ettirmelisiniz. Bu işlem sonrasında banka size yeni bir kart gönderecektir. Güvenlik açısından, kart bilgilerinizi hiçbir zaman paylaşmamalı ve şüpheli işlemler için bankanızı bilgilendirmelisiniz.',
      category: 'kredi-karti'
    },
    {
      id: 'faq-5',
      question: 'Kredi kartı taksit seçeneklerini nasıl kullanabilirim?',
      answer: 'Kredi kartı taksit seçeneklerini kullanmak için öncelikle alışveriş yaptığınız işyerinin bankanızla taksit anlaşması olması gerekir. Fiziksel mağazalarda ödeme yaparken POS cihazından taksit sayısını seçebilirsiniz. Online alışverişlerde ise ödeme sayfasında taksit seçenekleri sunulur. Bazı bankalar, taksit yapılmayan harcamaları daha sonra taksitlendirme imkanı da sunmaktadır.',
      category: 'kredi-karti'
    },
    {
      id: 'faq-6',
      question: 'Online bankacılık işlemlerinde güvenliğimi nasıl sağlarım?',
      answer: 'Online bankacılık işlemlerinde güvenliğinizi sağlamak için: güçlü ve benzersiz şifreler kullanın, düzenli olarak şifrelerinizi değiştirin, güvenli ağlar üzerinden işlem yapın, cihazınızdaki güvenlik yazılımlarını güncel tutun, SMS doğrulama gibi iki faktörlü kimlik doğrulama yöntemlerini kullanın ve bankadan gelen iletişimlerin gerçekliğini doğrulayın. Şüpheli bir durumla karşılaştığınızda hemen bankanıza bildirin.',
      category: 'guvenlik'
    },
    {
      id: 'faq-7',
      question: 'Birileri hesap bilgilerimi ele geçirirse ne yapmalıyım?',
      answer: 'Hesap bilgilerinizin ele geçirildiğini düşünüyorsanız, hemen bankanızın müşteri hizmetlerini arayarak durumu bildirin ve hesaplarınızı geçici olarak bloke ettirin. Şifrelerinizi değiştirin ve şüpheli işlemleri rapor edin. Bankanız sizinle birlikte gerekli güvenlik önlemlerini alacak ve olası bir dolandırıcılık durumunda yapılacaklar konusunda yönlendirecektir. Ayrıca durumu emniyet birimlerine de bildirebilirsiniz.',
      category: 'guvenlik'
    },
    {
      id: 'faq-8',
      question: 'Yatırım için hangi ürünleri tercih etmeliyim?',
      answer: 'Yatırım için ürün seçimi, risk toleransınıza, yatırım sürenize ve finansal hedeflerinize bağlıdır. Düşük riskli seçenekler: vadeli mevduat, devlet tahvilleri, altın. Orta riskli seçenekler: yatırım fonları, kira sertifikaları, eurobond. Yüksek riskli seçenekler: hisse senetleri, döviz, kripto paralar. Yatırımlarınızı çeşitlendirmek ve profesyonel danışmanlık almak, riski azaltmanıza yardımcı olabilir.',
      category: 'yatirim'
    },
    {
      id: 'faq-9',
      question: 'Döviz hesabı açmak için ne yapmalıyım?',
      answer: 'Döviz hesabı açmak için herhangi bir bankanın şubesine kimlik belgenizle başvurabilir veya internet bankacılığı/mobil uygulama üzerinden kolayca hesap açabilirsiniz. Mevcut müşteriyseniz, bankanızın online kanallarından istediğiniz döviz cinsinde vadesiz hesap açmanız mümkündür. Döviz alım-satım işlemlerinizi bu hesap üzerinden gerçekleştirebilir ve döviz birikimlerinizi değerlendirebilirsiniz.',
      category: 'yatirim'
    },
    {
      id: 'faq-10',
      question: 'Bireysel emeklilik sisteminin avantajları nelerdir?',
      answer: 'Bireysel emeklilik sisteminin (BES) avantajları: Devlet katkısı (%25), vergi avantajları, uzun vadeli birikim imkanı, profesyonel fon yönetimi, miras bırakma kolaylığı ve emeklilik döneminde ek gelir sağlamasıdır. Sistemde kaldığınız süre uzadıkça avantajlar artar. 10 yıl sistemde kalıp 56 yaşını doldurduğunuzda tüm birikiminizi ve devlet katkılarını alabilirsiniz.',
      category: 'yatirim'
    },
    {
      id: 'faq-11',
      question: 'Vadesiz hesap ile vadeli hesap arasındaki fark nedir?',
      answer: 'Vadesiz hesap, paranızı istediğiniz zaman çekebileceğiniz, genellikle faiz getirisi olmayan hesaplardır. Günlük bankacılık işlemleriniz için uygundur. Vadeli hesap ise, belirli bir süre için paranızı bankaya yatırdığınız ve karşılığında faiz aldığınız hesaplardır. Vade dolmadan para çekerseniz, faiz kaybına uğrayabilirsiniz. Birikim yapmak ve paranızın değerini korumak için vadeli hesaplar daha uygundur.',
      category: 'yatirim'
    },
    {
      id: 'faq-12',
      question: 'Kredi kartı borcu için erken ödeme yapabilir miyim?',
      answer: 'Evet, kredi kartı borcunuzu son ödeme tarihinden önce tamamen veya kısmen ödeyebilirsiniz. Erken ödeme yapmanın herhangi bir cezası yoktur ve faiz işlemesini engeller. Minimum ödeme miktarından fazla ödeme yapmak, toplam borcunuzu daha hızlı kapatmanızı sağlar. Taksitli alışverişlerde de erken ödeme yapabilirsiniz, ancak genellikle herhangi bir faiz indirimi uygulanmaz.',
      category: 'kredi-karti'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-4 text-center">Sık Sorulan Sorular</h1>
      <p className="text-center text-secondary-light mb-12 max-w-3xl mx-auto">
        Finansal hizmetler, kredi, yatırım ve güvenlik konularında en çok sorulan sorulara yanıtlar bulun.
        Burada bulamadığınız soruların yanıtı için müşteri hizmetlerimize ulaşabilirsiniz.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="lg:w-1/4">
          <div className="bg-background rounded-card shadow-card p-6 mb-6">
            <h2 className="text-xl font-heading font-subheading text-secondary mb-4">Kategoriler</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`w-full flex items-center text-left px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === category.id 
                      ? 'bg-primary text-white' 
                      : 'bg-background-secondary text-secondary hover:bg-primary-light hover:text-white'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
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
                    placeholder="Soru veya cevap ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 pl-10 border border-gray-200 rounded-input bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-medium">
                    <Search size={16} />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn-secondary w-full">
                Ara
              </button>
            </form>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="bg-background rounded-card shadow-card">
            {filteredFAQs.length > 0 ? (
              <div className="divide-y divide-background-secondary">
                {filteredFAQs.map(faq => (
                  <div key={faq.id} className="p-6">
                    <button
                      className="w-full flex justify-between items-center text-left focus:outline-none"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <h3 className="text-lg font-heading font-subheading text-secondary">{faq.question}</h3>
                      <div className="text-primary">
                        {openFAQs.includes(faq.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>
                    {openFAQs.includes(faq.id) && (
                      <div className="mt-4 pt-4 border-t border-background-secondary text-secondary-light">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-secondary-medium mb-2">Aradığınız soru bulunamadı.</p>
                <p className="text-secondary-light">Lütfen farklı bir arama terimi deneyin veya tüm sorular kategorisine bakın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-background-secondary p-8 rounded-card text-center">
        <h2 className="text-2xl font-heading font-subheading text-secondary mb-4">Sorunuz hala cevaplanmadı mı?</h2>
        <p className="text-secondary-light mb-6 max-w-2xl mx-auto">
          Eğer aradığınız cevabı bulamadıysanız, müşteri hizmetlerimiz size yardımcı olmaktan memnuniyet duyacaktır.
          Dilediğiniz iletişim kanalından bize ulaşabilirsiniz.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/iletisim" className="btn-primary">
            Bize Ulaşın
          </a>
          <a href="tel:08505555555" className="btn-secondary">
            0850 555 5555
          </a>
        </div>
      </div>
    </div>
  )
} 