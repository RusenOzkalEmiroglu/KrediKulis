'use client';

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-lg font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pr-12">
          <p className="text-base text-gray-600" dangerouslySetInnerHTML={{ __html: answer }}></p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const faqItems = [
    {
      question: 'Kredi yapılandırma nedir?',
      answer: 'Kredi yapılandırma, mevcut bir kredinizin ödeme koşullarının değiştirilmesi işlemidir. Bu süreçte, kalan borcunuz için yeni bir faiz oranı, yeni bir vade ve buna bağlı olarak yeni bir aylık taksit tutarı belirlenir. Yapılandırma sayesinde, daha düşük faiz oranları veya daha uzun vadeler ile aylık ödeme yükünüzü azaltabilir ve toplam maliyetlerde tasarruf sağlayabilirsiniz.'
    },
    {
      question: 'Kredi yapılandırma hesaplama aracı nasıl çalışır?',
      answer: 'Kredi yapılandırma hesaplama aracı üç aşamada çalışır:<br/><br/>1. <b>Mevcut Kredi Bilgilerinin Girilmesi:</b> Kredi tutarı, vade, aylık taksit tutarı ve ödenen taksit sayısı girilir.<br/><br/>2. <b>Kalan Borç ve Faiz Oranı Hesaplanması:</b> Sistem, girilen bilgilere dayanarak kalan borç tutarını ve mevcut aylık faiz oranını hesaplar.<br/><br/>3. <b>Yapılandırma Seçenekleri ve Kazanç Hesaplama:</b> Kullanıcı, yeni vade ve faiz oranını seçer. Sistem, yeni aylık taksit tutarını ve toplam kazancı hesaplar.'
    },
    {
      question: 'Kalan borç tutarı nasıl hesaplanır?',
      answer: 'Kalan borç tutarı, "amortizasyon tablosu" yöntemine göre hesaplanır. Formül şöyledir:<br/><br/><b>Kalan Borç = Kredi Tutarı × (1 + Faiz)^Toplam Vade - [Taksit Tutarı × ((1 + Faiz)^Ödenen Taksit - 1) / Faiz]</b><br/><br/>Örneğin, 100.000 TL tutarında, 36 ay vadeli, aylık 7.000 TL taksitli bir kredide 12 taksit ödendikten sonra kalan borç tutarı 86.282,48 TL olarak hesaplanır. Bu hesaplamada, aylık faiz oranı yaklaşık %4,77 olarak belirlenir.'
    },
    {
      question: 'Yeni taksit tutarı nasıl hesaplanır?',
      answer: 'Yeni taksit tutarı, annüite formülü kullanılarak hesaplanır:<br/><br/><b>Aylık Taksit = P × r × (1 + r)^n / [(1 + r)^n - 1]</b><br/><br/>Burada:<br/>P: Kalan borç tutarı<br/>r: Aylık faiz oranı (yüzde değil, ondalık olarak)<br/>n: Yeni vade (ay olarak)<br/><br/>Örneğin, 86.282,48 TL kalan borç, %2,5 aylık faiz oranı ve 24 ay vade için:<br/>Aylık Taksit = 86.282,48 × 0,025 × (1 + 0,025)^24 / [(1 + 0,025)^24 - 1] = 5.232,91 TL olarak hesaplanır.'
    },
    {
      question: 'Toplam kazanç nasıl hesaplanır?',
      answer: 'Toplam kazanç, eski sistemle ödeyeceğiniz toplam tutardan yeni sistemle ödeyeceğiniz toplam tutarın çıkarılmasıyla hesaplanır:<br/><br/><b>Toplam Kazanç = (Eski Aylık Taksit × Kalan Taksit Sayısı) - (Yeni Aylık Taksit × Yeni Vade)</b><br/><br/>Örneğin:<br/>Eski sistemde: 7.000 TL × 24 ay = 168.000 TL<br/>Yeni sistemde: 5.232,91 TL × 24 ay = 125.589,84 TL<br/>Toplam Kazanç = 168.000 - 125.589,84 = 42.410,16 TL'
    },
    {
      question: 'Kredi yapılandırma ne zaman avantajlıdır?',
      answer: 'Kredi yapılandırma özellikle şu durumlarda avantajlıdır:<br/><br/>1. Piyasa faiz oranları, kredinizi aldığınız zamana göre düştüğünde<br/>2. Aylık ödeme yükünüzü azaltmak istediğinizde<br/>3. Finansal durumunuzda değişiklik olduğunda ve ödeme planınızı revize etmek istediğinizde<br/>4. Birden fazla kredinizi tek bir kredide birleştirmek istediğinizde<br/>5. Kredinizin önemli bir kısmını (en az %25-30) ödemiş olduğunuzda'
    },
    {
      question: 'Yapılandırma için bankaya ne zaman başvurmalıyım?',
      answer: 'Yapılandırma için en uygun zamanlar şunlardır:<br/><br/>1. Merkez Bankası faiz indirimine gittiğinde<br/>2. Bankaların kampanya dönemlerinde<br/>3. Finansal zorlanma yaşamadan önce, ödeme güçlüğü çekmeden<br/>4. Kredinizin en az %25-30\'unu ödemiş olduğunuzda (bu durumda yapılandırmanın faydası daha yüksek olabilir)'
    },
    {
      question: 'Kredi yapılandırma için hangi belgeler gereklidir?',
      answer: 'Kredi yapılandırma başvurusu için genellikle şu belgeler istenir:<br/><br/>1. Kimlik belgesi (nüfus cüzdanı, ehliyet veya pasaport)<br/>2. Gelir belgesi (maaş bordrosu, serbest meslek için vergi levhası vb.)<br/>3. Mevcut kredi sözleşmesi<br/>4. İkametgâh belgesi<br/><br/>Bankanızın ek belgeler talep edebileceğini unutmayın.'
    },
    {
      question: 'Yapılandırma sırasında dosya masrafı öder miyim?',
      answer: 'Evet, kredi yapılandırma işlemi sırasında genellikle yeni bir kredi açıldığı için dosya masrafı, ekspertiz ücreti (konut kredisi ise) ve sigorta primleri gibi maliyetler ortaya çıkabilir. Ancak bu maliyetler, yapılandırma ile sağlayacağınız toplam tasarrufun yanında genellikle düşük kalır. Bazı bankalar kampanya dönemlerinde bu masraflardan kısmen veya tamamen feragat edebilir.'
    },
    {
      question: 'Hesaplama aracındaki sonuçlar kesin midir?',
      answer: 'Bu hesaplama aracı, kredi yapılandırma ile elde edebileceğiniz potansiyel tasarrufları göstermek için tasarlanmıştır. Sunulan sonuçlar yaklaşık değerlerdir ve gerçek yapılandırma koşullarınız bankanızın değerlendirmesine, kredi notunuza ve piyasa koşullarına göre değişiklik gösterebilir. Kesin bilgi için bankanızla iletişime geçmenizi öneririz.'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Sık Sorulan Sorular</h2>
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
}
