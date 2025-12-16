'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const faqItems = [
    {
      question: "Asgari ödeme tutarı nedir?",
      answer: "Asgari ödeme tutarı, kredi kartı hesap özetinizde belirtilen dönem borcunuzun ödenmesi gereken minimum tutarıdır. Bu tutar, BDDK tarafından belirlenen oranlara göre hesaplanır ve her ay düzenli olarak ödenmesi gerekir."
    },
    {
      question: "Asgari ödeme tutarı nasıl hesaplanır?",
      answer: "Asgari ödeme tutarı, BDDK'nın belirlediği kurallara göre hesaplanır. Genel olarak dönem borcunuzun belirli bir yüzdesi (genellikle %20-40 arası) olarak belirlenir. Kredi kartı limitinize ve toplam borcunuza göre bu oran değişebilir."
    },
    {
      question: "Sadece asgari tutarı ödemek yeterli midir?",
      answer: "Sadece asgari tutarı ödemek, kartınızın kullanımını sürdürebilmeniz için yeterli olsa da, finansal açıdan önerilmez. Kalan borç için yüksek faiz uygulanır ve borcunuzu kapatmanız uzun zaman alabilir. Mümkünse, tüm borcu veya asgari tutardan daha fazlasını ödemeniz önerilir."
    },
    {
      question: "Asgari ödeme tutarını ödemezsem ne olur?",
      answer: "Asgari ödeme tutarını ödemezseniz, kredi kartınız için gecikme faizi uygulanır, kredi notunuz olumsuz etkilenir ve yasal takip süreci başlatılabilir. Ayrıca, kartınızın kullanımı kısıtlanabilir veya tamamen kapatılabilir."
    },
    {
      question: "BDDK'nın asgari ödeme tutarı ile ilgili son düzenlemeleri nelerdir?",
      answer: "BDDK'nın 26.09.2024 tarihli 10970 sayılı kararına göre, kredi kartı asgari ödeme tutarları yeniden düzenlenmiştir. Bu düzenleme ile kredi kartı limitine ve toplam borca göre farklı asgari ödeme oranları belirlenmiştir. Güncel oranlar için bankanızla iletişime geçebilirsiniz."
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
