'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const faqItems = [
    {
      question: "Kredi kartı gecikme faizi nedir?",
      answer: "Kredi kartı gecikme faizi, son ödeme tarihinde asgari tutarın altında ödeme yapılması durumunda uygulanan cezai faizdir. Gecikme faizi, ödenmemiş olan tutar üzerinden hesaplanır ve genellikle normal kredi kartı faizinden daha yüksektir."
    },
    {
      question: "Gecikme faizi nasıl hesaplanır?",
      answer: "Gecikme faizi, ödenmemiş olan tutar üzerinden aylık olarak hesaplanır. Türkiye'de bankalar tarafından uygulanan gecikme faizi oranları Merkez Bankası tarafından belirlenen üst limitlere tabidir. Hesaplama yaparken, faiz tutarına ek olarak KKDF (Kaynak Kullanımını Destekleme Fonu) ve BSMV (Banka ve Sigorta Muameleleri Vergisi) gibi vergiler de eklenir."
    },
    {
      question: "Gecikme faizi ne kadar süre uygulanır?",
      answer: "Gecikme faizi, ödenmemiş olan tutar tamamen ödenene kadar her ay uygulanmaya devam eder. Kısmi ödeme yapılması durumunda, gecikme faizi kalan borç üzerinden hesaplanmaya devam eder."
    },
    {
      question: "Gecikme faizinden nasıl kaçınabilirim?",
      answer: "Gecikme faizinden kaçınmanın en iyi yolu, her ay en azından asgari ödeme tutarını son ödeme tarihine kadar ödemektir. Mümkünse, tüm borcu kapatmak en iyi seçenektir. Ayrıca, otomatik ödeme talimatı vermek, son ödeme tarihlerini takip etmek için hatırlatıcılar kurmak ve bütçenizi düzenli olarak gözden geçirmek de yardımcı olabilir."
    },
    {
      question: "Gecikme faizi ödemezsem ne olur?",
      answer: "Gecikme faizini ve borcunuzu ödememek ciddi sonuçlara yol açabilir. Kredi notunuz düşer, yasal takip başlatılabilir, kartınız kullanıma kapatılabilir ve diğer kredi ürünlerine erişiminiz kısıtlanabilir. Ayrıca, borç tahsil masrafları da size yansıtılabilir. Ödeme zorluğu yaşıyorsanız, bankanızla iletişime geçerek yapılandırma seçeneklerini görüşmeniz önerilir."
    },
    {
      question: "Kredi kartı gecikme faizi oranları ne kadardır?",
      answer: "Türkiye'de kredi kartı gecikme faizi oranları, Merkez Bankası tarafından belirlenen üst limitlere tabidir. 2024 yılı itibarıyla, aylık gecikme faizi oranı yaklaşık %3,96 civarındadır. Ancak bu oran, ekonomik koşullara ve Merkez Bankası'nın kararlarına göre değişebilir. Güncel oranlar için bankanızla iletişime geçmeniz önerilir."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Sık Sorulan Sorular</h2>
      
      {faqItems.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <button
            className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleFAQ(index)}
          >
            <span className="font-semibold text-gray-800">{item.question}</span>
            <ChevronDown className={`text-[#ff3d00] transition-transform duration-300 ${openFAQ === index ? 'transform rotate-180' : ''}`} />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-96 py-5 px-5' : 'max-h-0'}`}
          >
            <p className="text-gray-600">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
