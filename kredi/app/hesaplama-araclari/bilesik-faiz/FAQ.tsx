'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <div className="text-[#ff3d00]">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 text-base leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
      
      <div className="space-y-1">
        <FAQItem
          question="Bileşik faiz nedir?"
          answer={
            <p>
              Bileşik faiz, sadece ana para üzerinden değil, daha önce kazanılan faizler üzerinden de faiz kazanılmasını sağlayan bir faiz hesaplama yöntemidir. Bu yöntemde, her dönem sonunda elde edilen faiz anaparaya eklenir ve bir sonraki dönemde bu toplam tutar üzerinden faiz hesaplanır. Bu nedenle bileşik faiz, uzun vadeli yatırımlarda basit faize göre çok daha fazla getiri sağlar.
            </p>
          }
        />
        
        <FAQItem
          question="Bileşik faiz ile basit faiz arasındaki fark nedir?"
          answer={
            <div>
              <p className="mb-2">
                <strong>Basit Faiz:</strong> Sadece ana para üzerinden hesaplanır. Faiz tutarı her dönem aynı kalır.
              </p>
              <p className="mb-2">
                <strong>Bileşik Faiz:</strong> Ana para ve daha önce biriken faizler üzerinden hesaplanır. Faiz tutarı her dönem artar.
              </p>
              <p>
                Örneğin, 10.000 TL'lik bir yatırımı yıllık %10 faizle 3 yıl değerlendirdiğinizde:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Basit faizle: 10.000 + (10.000 × 0,10 × 3) = 13.000 TL</li>
                <li>Bileşik faizle: 10.000 × (1 + 0,10)³ = 13.310 TL</li>
              </ul>
            </div>
          }
        />
        
        <FAQItem
          question="Faiz ekleme sıklığı neden önemlidir?"
          answer={
            <div>
              <p className="mb-2">
                Faiz ekleme sıklığı, bileşik faizin ne kadar sıklıkla anaparaya eklendiğini belirtir ve bu, vade sonundaki toplam tutarı önemli ölçüde etkiler. Aynı faiz oranı için, faiz ekleme sıklığı arttıkça (yıllık yerine 6 aylık, 3 aylık, aylık, günlük), vade sonundaki tutar da artar.
              </p>
              <p>
                Örneğin, yıllık %12 faiz oranıyla 10.000 TL'lik bir yatırımın 1 yıl sonundaki değeri:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Yıllık faiz ekleme: 10.000 × (1 + 0,12)¹ = 11.200 TL</li>
                <li>Aylık faiz ekleme: 10.000 × (1 + 0,12/12)¹² = 11.268 TL</li>
                <li>Günlük faiz ekleme: 10.000 × (1 + 0,12/365)³⁶⁵ = 11.275 TL</li>
              </ul>
            </div>
          }
        />
        
        <FAQItem
          question="Efektif faiz oranı nedir?"
          answer={
            <p>
              Efektif faiz oranı, farklı faiz ekleme sıklıklarına sahip yatırımları karşılaştırmak için kullanılan yıllık eşdeğer faiz oranıdır. Örneğin, aylık %1 faiz oranı, yıllık bazda (1 + 0,01)¹² - 1 = %12,68 efektif faiz oranına eşittir. Bu, yatırımcıların farklı faiz ekleme sıklıklarına sahip yatırım araçlarını daha doğru bir şekilde karşılaştırmasına olanak tanır.
            </p>
          }
        />
        
        <FAQItem
          question="Bileşik faiz hesaplama aracını hangi durumlarda kullanabilirim?"
          answer={
            <div>
              <p className="mb-2">
                Bileşik faiz hesaplama aracı aşağıdaki durumlarda kullanılabilir:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mevduat hesaplarının vade sonundaki değerini hesaplamak</li>
                <li>Yatırım araçlarının potansiyel getirisini tahmin etmek</li>
                <li>Emeklilik fonları ve uzun vadeli yatırımların büyümesini planlamak</li>
                <li>Kredi veya borçların zaman içindeki maliyetini hesaplamak</li>
                <li>Enflasyonun satın alma gücü üzerindeki uzun vadeli etkisini değerlendirmek</li>
                <li>Finansal hedeflerinize ulaşmak için gereken yatırım miktarını belirlemek</li>
              </ul>
            </div>
          }
        />
      </div>
    </div>
  );
}
