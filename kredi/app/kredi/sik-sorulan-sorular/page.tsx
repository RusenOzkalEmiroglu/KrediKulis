"use client";

import { useState } from "react";
import { Search, CreditCard, Home, Car, Briefcase, Info, Plus, Minus, Calculator } from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  soru: string;
  cevap: string;
}

interface QuestionsByCategory {
  [key: string]: Question[];
}

export default function SikSorulanSorular() {
  const [activeTab, setActiveTab] = useState("genel");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };

  // Tüm SSS'ler
  const sorular: QuestionsByCategory = {
    genel: [
      {
        id: "genel-1",
        soru: "Kredi başvurusu nasıl yapabilirim?",
        cevap: "Kredi başvurularınızı internet bankacılığı, mobil bankacılık, 0850 222 XX XX numaralı çağrı merkezimiz veya en yakın şubemiz aracılığıyla yapabilirsiniz. Ayrıca web sitemiz üzerinden ön başvuru formunu doldurarak da başvuru sürecinizi başlatabilirsiniz."
      },
      {
        id: "genel-2",
        soru: "Kredi başvurum ne kadar sürede sonuçlanır?",
        cevap: "Kredi başvuruları genellikle 24-48 saat içerisinde sonuçlandırılır. İhtiyaç kredisi başvuruları için süreç daha hızlı olup, konut ve taşıt kredileri için ekspertiz işlemleri nedeniyle süreç biraz daha uzun sürebilir."
      },
      {
        id: "genel-3",
        soru: "Kredi çekerken hangi masraflar alınır?",
        cevap: "Kredinize bağlı olarak tahsis ücreti, ekspertiz masrafı, ipotek tesis ücreti, hayat sigortası, KKDF, BSMV gibi masraflar olabilir. Her kredi türüne göre masraflar değişiklik gösterebilir. Başvuru öncesinde güncel masraf bilgilerini çağrı merkezimizden veya şubelerimizden öğrenebilirsiniz."
      },
      {
        id: "genel-4",
        soru: "Kredi onayında hangi kriterler değerlendiriliyor?",
        cevap: "Kredi değerlendirmesinde kredi skorunuz, gelir durumunuz, ödeme geçmişiniz, mevcut borçlarınız ve teminat durumu gibi faktörler dikkate alınır. Ayrıca çalıştığınız sektör, mesleğiniz ve iş sürekliliğiniz de değerlendirme kriterleri arasındadır."
      },
      {
        id: "genel-5",
        soru: "Kredimi erken kapatabilir miyim?",
        cevap: "Evet, tüm kredilerinizi vadesinden önce kapatabilirsiniz. Erken kapama durumunda, kalan anapara tutarı üzerinden hesaplanan faiz tutarında belli oranda indirim yapılır. Erken kapama ile ilgili detaylı bilgiyi şubelerimizden alabilirsiniz."
      },
      {
        id: "genel-6",
        soru: "Kredi ödemelerimi geciktirirsem ne olur?",
        cevap: "Kredi ödemelerinizi geciktirmeniz durumunda, geciken tutar üzerinden gecikme faizi işletilir. Ayrıca, ödenmemiş taksitlerinizin birikmesi durumunda krediniz muaccel hale gelebilir ve tüm borcunuzun ödenmesi talep edilebilir. Gecikme aynı zamanda kredi puanınızı da olumsuz etkiler."
      }
    ],
    ihtiyac: [
      {
        id: "ihtiyac-1",
        soru: "İhtiyaç kredisi için gereken belgeler nelerdir?",
        cevap: "İhtiyaç kredisi başvurusu için kimlik belgeniz ve gelir belgeniz (maaş bordrosu, emekli maaş belgesi veya serbest meslek için vergi levhası) yeterlidir. Bazı durumlarda ikametgah belgesi de istenebilir."
      },
      {
        id: "ihtiyac-2",
        soru: "İhtiyaç kredisinde maksimum vade nedir?",
        cevap: "İhtiyaç kredilerinde maksimum vade genellikle 36 aydır. Ancak özel kampanyalarda veya yüksek tutarlı kredilerde 48 aya kadar vade seçeneği sunulabilmektedir."
      },
      {
        id: "ihtiyac-3",
        soru: "Kredi notum düşükse ihtiyaç kredisi çekebilir miyim?",
        cevap: "Kredi notunuzun düşük olması her zaman başvurunuzun reddedileceği anlamına gelmez. Geliriniz yeterli ise veya kefil ya da ek teminat gösterebilirseniz, kredi başvurunuz olumlu sonuçlanabilir. Ancak bu durumda faiz oranınız daha yüksek olabilir."
      },
      {
        id: "ihtiyac-4",
        soru: "İhtiyaç kredisinde maksimum tutar nedir?",
        cevap: "İhtiyaç kredilerinde maksimum tutar gelirinize, kredi skorunuza ve bankanın kredi politikalarına göre değişiklik gösterir. Genel olarak maaşınızın 10-12 katına kadar ihtiyaç kredisi kullanabilirsiniz."
      }
    ],
    konut: [
      {
        id: "konut-1",
        soru: "Konut kredisi için gerekli belgeler nelerdir?",
        cevap: "Konut kredisi için kimlik belgesi, gelir belgesi, satın alınacak konutun tapu örneği, taşınmaz değerleme (ekspertiz) raporu ve satış sözleşmesi gerekmektedir. Satıcıdan da kimlik fotokopisi talep edilir."
      },
      {
        id: "konut-2",
        soru: "Konut kredisinde ekspertiz değerinin önemi nedir?",
        cevap: "Ekspertiz raporu, krediye konu olan gayrimenkulün güncel piyasa değerini belirleyen resmi bir rapordur. Bankalar genellikle ekspertiz değerinin maksimum %80'i oranında kredi kullandırırlar. Bu nedenle ekspertiz değerinin yüksek çıkması sizin daha fazla kredi kullanabilmenizi sağlar."
      },
      {
        id: "konut-3",
        soru: "Konut kredisi işlemlerinde hangi masraflar ödenir?",
        cevap: "Konut kredisi sürecinde ekspertiz ücreti, ipotek tesis ücreti, konut sigortası, DASK, hayat sigortası, kredi tahsis ücreti, KKDF ve BSMV gibi masraflar ödenir. Bu masrafların toplamı genellikle kredi tutarının %1-2'si arasında değişmektedir."
      },
      {
        id: "konut-4",
        soru: "Konut kredisinde maksimum vade ne kadardır?",
        cevap: "Konut kredilerinde maksimum vade genellikle 120 aydır (10 yıl). Ancak kampanyalı dönemlerde veya özel durumlarda 180 aya (15 yıl) kadar vade seçenekleri de sunulabilmektedir."
      },
      {
        id: "konut-5",
        soru: "İkinci el konut için de kredi kullanabilir miyim?",
        cevap: "Evet, ikinci el konutlar için de kredi kullanabilirsiniz. Ancak konutun yaşı ve durumu ekspertiz değerini etkileyebilir. Genellikle 15-20 yaşından büyük konutlar için kredi koşulları farklılaşabilir veya daha düşük oranda kredi kullandırılabilir."
      }
    ],
    tasit: [
      {
        id: "tasit-1",
        soru: "Taşıt kredisi için hangi belgeler gereklidir?",
        cevap: "Taşıt kredisi için kimlik belgesi, gelir belgesi, aracın proforma faturası veya satış sözleşmesi gerekmektedir. İkinci el araç alımında aracın ekspertiz raporu da istenebilir."
      },
      {
        id: "tasit-2",
        soru: "Taşıt kredisinde maksimum vade ne kadardır?",
        cevap: "Taşıt kredilerinde maksimum vade sıfır km araçlar için genellikle 60 ay, ikinci el araçlar için ise aracın yaşına bağlı olarak 36-48 aydır."
      },
      {
        id: "tasit-3",
        soru: "Taşıt kredisinde araç üzerine rehin konulur mu?",
        cevap: "Evet, taşıt kredilerinde araç üzerine banka lehine rehin konulur. Kredi tamamen ödenene kadar rehin kaldırılmaz ve araç satılamaz. Rehin, aracın trafik tescil belgesine (ruhsatına) işlenir."
      },
      {
        id: "tasit-4",
        soru: "İkinci el araç için taşıt kredisi alabilir miyim?",
        cevap: "Evet, ikinci el araçlar için de taşıt kredisi kullanabilirsiniz. Ancak aracın yaşı, markası, modeli ve kondisyonu kredibiliteyi etkiler. Genellikle 8-10 yaşından büyük araçlar için kredi kullanımı zorlaşabilir veya daha düşük kredi limiti sunulabilir."
      }
    ],
    ticari: [
      {
        id: "ticari-1",
        soru: "Ticari kredi başvurusu için hangi belgeler gereklidir?",
        cevap: "Ticari kredi başvurusu için şirket belgeleriniz (vergi levhası, ticaret sicil gazetesi, imza sirküleri), son 3 yıla ait finansal tablolarınız, ortaklık yapınız ve firmanızın genel durumunu anlatan bir tanıtım dosyası talep edilmektedir."
      },
      {
        id: "ticari-2",
        soru: "Yeni kurulan bir işletme ticari kredi alabilir mi?",
        cevap: "Yeni kurulan işletmelerin ticari kredi alması daha zordur ancak imkansız değildir. Güçlü bir iş planı, yeterli öz sermaye, fizibilite raporu ve güvenilir teminatlar sunmanız durumunda kredi kullanabilirsiniz. Ayrıca KOSGEB gibi kurumların yeni girişimci desteklerinden de faydalanabilirsiniz."
      },
      {
        id: "ticari-3",
        soru: "İşletme sermayesi kredisi nedir? Ne için kullanılır?",
        cevap: "İşletme sermayesi kredisi, şirketinizin günlük operasyonlarını finanse etmek, hammadde almak, personel maaşlarını ödemek, stok finansmanı sağlamak gibi kısa vadeli ihtiyaçlarınız için kullanılan bir kredi türüdür. Genellikle 3-36 ay vadeli olarak kullandırılır."
      },
      {
        id: "ticari-4",
        soru: "Ticari kredi maliyeti neleri içerir?",
        cevap: "Ticari kredi maliyeti faiz oranı, komisyon, tahsis ücreti, ekspertiz masrafı (gayrimenkul teminatlı ise), sigorta primleri, BSMV ve diğer yasal yükümlülükleri içerir. Toplam maliyeti görüşmek için şubelerimizi ziyaret edebilirsiniz."
      }
    ],
    kobi: [
      {
        id: "kobi-1",
        soru: "KOBİ kredileri için hangi destekler mevcuttur?",
        cevap: "KOBİ'ler için KOSGEB destekli krediler, Kredi Garanti Fonu (KGF) kefaleti ile krediler, Eximbank destekli ihracat kredileri, Kalkınma Ajansları destekleri ve Teknoloji Geliştirme Bölgeleri destekleri gibi çeşitli finansman imkanları bulunmaktadır."
      },
      {
        id: "kobi-2",
        soru: "KOBİ tanımına giren işletmeler hangileridir?",
        cevap: "Türkiye'de KOBİ tanımı, çalışan sayısı 250'den az olan ve yıllık net satış hasılatı veya mali bilançosu 125 milyon TL'yi aşmayan işletmeleri kapsamaktadır. Bu işletmeler kendi içinde mikro, küçük ve orta büyüklükteki işletmeler olarak sınıflandırılır."
      },
      {
        id: "kobi-3",
        soru: "KOSGEB destekli kredilerden nasıl yararlanabilirim?",
        cevap: "KOSGEB destekli kredilerden yararlanmak için öncelikle KOSGEB veri tabanına kaydolmanız ve işletmenizin KOBİ beyannamesi düzenlemiş olması gerekmektedir. Ardından, KOSGEB'in ilan ettiği destek programlarına başvurarak faydalanabilirsiniz."
      },
      {
        id: "kobi-4",
        soru: "KOBİ kredilerinde teminat şartları nelerdir?",
        cevap: "KOBİ kredilerinde teminat şartları kredi tutarına, vadesine ve işletmenin risk durumuna göre değişir. Gayrimenkul ipoteği, araç rehni, makine rehni, ticari alacak temliği, çek/senet, kefalet veya KGF kefaleti gibi teminatlar istenebilir."
      }
    ]
  };

  // Arama fonksiyonu
  const filteredQuestions = () => {
    if (!searchQuery.trim()) {
      return { genel: sorular.genel, ihtiyac: sorular.ihtiyac, konut: sorular.konut, tasit: sorular.tasit, ticari: sorular.ticari, kobi: sorular.kobi };
    }

    const searchTermLower = searchQuery.toLowerCase();
    const filtered: Record<string, Question[]> = {};
    
    Object.keys(sorular).forEach(category => {
      filtered[category] = sorular[category].filter(item => 
        item.soru.toLowerCase().includes(searchTermLower) || 
        item.cevap.toLowerCase().includes(searchTermLower)
      );
    });
    
    return filtered;
  };

  const filteredResults = filteredQuestions();
  const hasResults = Object.values(filteredResults).some(category => category.length > 0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sık Sorulan Sorular</h1>
        <p className="text-gray-600 mt-2">Kredi ürünlerimiz hakkında sık sorulan soruların yanıtlarını bulun.</p>
      </div>
      
      {/* Arama Kutusu */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Sorunuzu arayın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {searchQuery && !hasResults && (
        <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 p-4 rounded-md mb-8 flex items-start">
          <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Aramanızla eşleşen sonuç bulunamadı.</p>
            <p className="mt-1">Lütfen farklı anahtar kelimelerle tekrar deneyin veya aşağıdaki kategorilere göz atın.</p>
          </div>
        </div>
      )}
      
      {/* Kategoriler */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex overflow-x-auto scrollbar-hide border-b">
          <button
            className={`px-6 py-3 text-center whitespace-nowrap focus:outline-none ${
              activeTab === "genel" ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("genel")}
          >
            Genel Sorular
          </button>
          <button
            className={`px-6 py-3 text-center whitespace-nowrap focus:outline-none flex items-center ${
              activeTab === "ihtiyac" ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("ihtiyac")}
          >
            <CreditCard className="h-4 w-4 mr-1.5" /> İhtiyaç Kredisi
          </button>
          <button
            className={`px-6 py-3 text-center whitespace-nowrap focus:outline-none flex items-center ${
              activeTab === "konut" ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("konut")}
          >
            <Home className="h-4 w-4 mr-1.5" /> Konut Kredisi
          </button>
          <button
            className={`px-6 py-3 text-center whitespace-nowrap focus:outline-none flex items-center ${
              activeTab === "tasit" ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("tasit")}
          >
            <Car className="h-4 w-4 mr-1.5" /> Taşıt Kredisi
          </button>
          <button
            className={`px-6 py-3 text-center whitespace-nowrap focus:outline-none flex items-center ${
              activeTab === "ticari" ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("ticari")}
          >
            <Briefcase className="h-4 w-4 mr-1.5" /> Ticari Kredi
          </button>
          <button
            className={`px-6 py-3 text-center whitespace-nowrap focus:outline-none flex items-center ${
              activeTab === "kobi" ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("kobi")}
          >
            <Briefcase className="h-4 w-4 mr-1.5" /> KOBİ Kredisi
          </button>
        </div>
        
        {/* Soru-Cevaplar */}
        <div className="p-6">
          {filteredResults[activeTab]?.length > 0 ? (
            <div className="space-y-4">
              {filteredResults[activeTab].map((item) => (
                <div 
                  key={item.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                    onClick={() => toggleQuestion(item.id)}
                  >
                    <span className="font-medium text-gray-900">{item.soru}</span>
                    {expandedQuestion === item.id ? (
                      <Minus className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedQuestion === item.id && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{item.cevap}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Bu kategoride soru bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* İletişim Bölümü */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
        <h2 className="text-xl font-medium text-blue-800 mb-3">Sorunuza yanıt bulamadınız mı?</h2>
        <p className="text-blue-700 mb-4">
          Müşteri temsilcilerimiz tüm sorularınızı yanıtlamak için hazır. Bize aşağıdaki kanallardan ulaşabilirsiniz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium mb-2">Telefon</h3>
            <p className="text-gray-600">0850 222 XX XX</p>
            <p className="text-sm text-gray-500 mt-1">Hafta içi: 09:00-18:00</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium mb-2">E-posta</h3>
            <p className="text-gray-600">info@bankaadi.com</p>
            <p className="text-sm text-gray-500 mt-1">24 saat içinde yanıt</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium mb-2">Görüntülü Görüşme</h3>
            <button className="text-blue-600 font-medium">Randevu Al</button>
            <p className="text-sm text-gray-500 mt-1">Online görüşme</p>
          </div>
        </div>
      </div>
      
      {/* Kredi Ürünleri */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Kredi Ürünlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/pages/ihtiyac-kredisi" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center">
            <CreditCard className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium">İhtiyaç Kredisi</h3>
              <p className="text-sm text-gray-600">Kişisel finansman çözümleri</p>
            </div>
          </Link>
          
          <Link href="/pages/konut-kredisi" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center">
            <Home className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium">Konut Kredisi</h3>
              <p className="text-sm text-gray-600">Ev sahibi olma fırsatı</p>
            </div>
          </Link>
          
          <Link href="/pages/tasit-kredisi" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center">
            <Car className="h-5 w-5 text-purple-600 mr-3" />
            <div>
              <h3 className="font-medium">Taşıt Kredisi</h3>
              <p className="text-sm text-gray-600">Araç alımı finansmanı</p>
            </div>
          </Link>
          
          <Link href="/pages/ticari-kredi" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center">
            <Briefcase className="h-5 w-5 text-gray-600 mr-3" />
            <div>
              <h3 className="font-medium">Ticari Kredi</h3>
              <p className="text-sm text-gray-600">İşletme finansman çözümleri</p>
            </div>
          </Link>
          
          <Link href="/pages/kobi-kredisi" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center">
            <Briefcase className="h-5 w-5 text-yellow-600 mr-3" />
            <div>
              <h3 className="font-medium">KOBİ Kredisi</h3>
              <p className="text-sm text-gray-600">KOBİ'lere özel çözümler</p>
            </div>
          </Link>
          
          <Link href="/pages/kredi-hesaplama" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center">
            <Calculator className="h-5 w-5 text-orange-600 mr-3" />
            <div>
              <h3 className="font-medium">Kredi Hesaplama</h3>
              <p className="text-sm text-gray-600">Ödeme planınızı hesaplayın</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 