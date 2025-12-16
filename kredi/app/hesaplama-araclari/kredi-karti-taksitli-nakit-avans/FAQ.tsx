'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const faqItems = [
    {
      question: "Taksitli nakit avans nedir?",
      answer: "Taksitli nakit avans, kredi kartı sahiplerinin nakit ihtiyaçlarını karşılamak için kullanabilecekleri bir hizmettir. Normal nakit avanstan farklı olarak, çekilen tutar taksitler halinde geri ödenir."
    },
    {
      question: "Taksitli nakit avans faiz oranları nedir?",
      answer: "Taksitli nakit avans faiz oranları bankadan bankaya değişiklik gösterebilir. Genellikle aylık %2-5 arasında değişen oranlarda faiz uygulanır. Ayrıca KKDF ve BSMV gibi yasal vergiler de ödemeye dahil edilir."
    },
    {
      question: "Taksitli nakit avans için kredi kartı limitim yeterli mi?",
      answer: "Taksitli nakit avans, kredi kartınızın nakit çekim limiti dahilinde kullanılabilir. Her kredi kartının toplam limiti içerisinde bir nakit çekim limiti bulunur. Bu limit genellikle toplam limitin %10-50'si arasında değişir."
    },
    {
      question: "Taksitli nakit avans başvurusu nasıl yapılır?",
      answer: "Taksitli nakit avans başvurusu genellikle bankanızın mobil uygulaması, internet bankacılığı, ATM'ler, şubeler veya müşteri hizmetleri aracılığıyla yapılabilir. Başvuru sonrası onay alındığında, talep edilen tutar hesabınıza aktarılır."
    },
    {
      question: "Taksitli nakit avans erken kapatılabilir mi?",
      answer: "Evet, taksitli nakit avans borcu erken kapatılabilir. Erken kapatma durumunda, kalan anapara üzerinden hesaplanacak faiz ve vergiler alınmaz, sadece kalan anapara tutarı tahsil edilir. Bu sayede faiz yükünden kurtulabilirsiniz."
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
