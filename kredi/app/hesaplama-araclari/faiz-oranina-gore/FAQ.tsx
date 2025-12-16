'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const faqItems = [
    {
      question: "Kredi faiz oranı nedir?",
      answer: "Kredi faiz oranı, bankaların kredi verirken uyguladığı, anaparanın belirli bir yüzdesi olarak hesaplanan ücrettir. Bu oran, kredinin maliyetini belirleyen en önemli faktörlerden biridir ve genellikle yıllık olarak ifade edilir. Türkiye'de kredi faiz oranları, Merkez Bankası'nın politika faizi, enflasyon oranı ve bankaların kendi risk değerlendirmeleri gibi faktörlere bağlı olarak değişiklik gösterir."
    },
    {
      question: "Kredi taksit tutarı nasıl hesaplanır?",
      answer: "Kredi taksit tutarı, kredi tutarı, faiz oranı ve vade süresi kullanılarak hesaplanır. Hesaplama için kullanılan formül: Aylık Taksit = Kredi Tutarı × [Aylık Faiz Oranı × (1 + Aylık Faiz Oranı)^Vade] ÷ [(1 + Aylık Faiz Oranı)^Vade - 1] şeklindedir. Burada aylık faiz oranı, yıllık faiz oranının 12'ye bölünmesiyle bulunur. Hesaplama karmaşık görünse de, kredi hesaplama araçları bu işlemi kolayca yapmanızı sağlar."
    },
    {
      question: "Toplam geri ödeme tutarı neyi ifade eder?",
      answer: "Toplam geri ödeme tutarı, kredi vadesi boyunca ödeyeceğiniz tüm taksitlerin toplamını ifade eder. Bu tutar, aldığınız kredi miktarı (anapara) ve faiz ödemelerinin toplamından oluşur. Örneğin, aylık 1.000 TL taksitle 36 ay vadeli bir kredi için toplam geri ödeme tutarı 36.000 TL olacaktır. Bu tutarın ne kadarının anapara, ne kadarının faiz olduğunu görmek için kredi ödeme planınızı incelemeniz gerekir."
    },
    {
      question: "Farklı kredi türlerinde faiz oranları nasıl değişir?",
      answer: "Kredi türlerine göre faiz oranları genellikle şu şekilde değişir: İhtiyaç kredilerinde faiz oranları genellikle daha yüksektir çünkü teminatsız kredilerdir ve risk daha fazladır. Konut kredilerinde faiz oranları daha düşüktür çünkü kredi, satın alınan gayrimenkul ile teminat altına alınır. Taşıt kredilerinde ise faiz oranları genellikle ihtiyaç kredisi ile konut kredisi arasında bir seviyededir, çünkü araç teminat olarak gösterilir ancak değer kaybı daha hızlıdır."
    },
    {
      question: "Kredi vadesi seçerken nelere dikkat etmeliyim?",
      answer: "Kredi vadesi seçerken şu faktörleri göz önünde bulundurmalısınız: Aylık bütçeniz (daha uzun vade, daha düşük taksit demektir), toplam ödeyeceğiniz faiz miktarı (daha uzun vade, daha fazla toplam faiz demektir), gelecekteki finansal planlarınız ve kredi türü. Örneğin, ihtiyaç kredilerinde genellikle kısa-orta vadeli seçenekler (3-36 ay), konut kredilerinde ise daha uzun vadeli seçenekler (120 aya kadar) tercih edilir."
    },
    {
      question: "Daha düşük faiz oranı için neler yapabilirim?",
      answer: "Daha düşük faiz oranı elde etmek için şunları yapabilirsiniz: Kredi notunuzu yükseltmek (düzenli ödemeler yaparak ve borç-gelir oranınızı düşük tutarak), farklı bankaların tekliflerini karşılaştırmak, maaş müşterisi olmak, kredi için teminat göstermek, kampanya dönemlerini takip etmek ve bankanızla pazarlık yapmak. Ayrıca, mevcut bir krediniz varsa, faiz oranları düştüğünde kredi yapılandırma veya refinansman seçeneklerini değerlendirebilirsiniz."
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
