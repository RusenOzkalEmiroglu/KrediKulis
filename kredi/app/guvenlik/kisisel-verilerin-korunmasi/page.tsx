'use client'

import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Eye, Database, FileText, BadgeCheck, UserCheck } from 'lucide-react'

export default function KisiselVerilerinKorunmasiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/guvenlik" className="inline-flex items-center text-primary mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Güvenlik Sayfasına Dön
      </Link>

      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-4">Kişisel Verilerin Korunması</h1>
        <p className="text-secondary-light text-lg">
          6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, kişisel verilerinizin nasıl toplandığı, işlendiği ve korunduğu hakkında bilgilendirme.
        </p>
      </div>

      <div className="bg-background rounded-card shadow-card p-8 mb-10">
        <div className="flex items-start mb-6">
          <div className="mr-4 text-primary flex-shrink-0 mt-1">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-4">Veri Sorumlusu</h2>
            <p className="text-secondary-light mb-4">
              Finans Platformu, kişisel verilerin korunması konusunda büyük özen göstermektedir. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında "Veri Sorumlusu" olarak hareket eden şirketimiz, aşağıdaki bilgileri siz değerli kullanıcılarımızla paylaşmaktadır.
            </p>
            <div className="bg-background-secondary p-4 rounded-lg">
              <p className="text-secondary text-sm font-medium mb-1">Veri Sorumlusu:</p>
              <p className="text-secondary-light text-sm">Finans Platformu A.Ş.</p>
              <p className="text-secondary text-sm font-medium mb-1 mt-2">Adres:</p>
              <p className="text-secondary-light text-sm">Atatürk Bulvarı No: 123, Çankaya / Ankara</p>
              <p className="text-secondary text-sm font-medium mb-1 mt-2">İletişim:</p>
              <p className="text-secondary-light text-sm">kvkk@finansplatform.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-card shadow-card p-8 mb-10">
        <div className="flex items-start mb-6">
          <div className="mr-4 text-primary flex-shrink-0 mt-1">
            <Eye size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-4">Toplanan Kişisel Veriler</h2>
            <p className="text-secondary-light mb-4">
              Finans Platformu olarak, aşağıdaki kişisel verileri belirtilen amaçlarla toplamakta ve işlemekteyiz:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-heading font-subheading text-secondary mb-2">Kimlik Bilgileri</h3>
                <p className="text-secondary-light">
                  Ad, soyad, T.C. kimlik numarası, doğum tarihi gibi kimliğinizi belirleyen bilgiler.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading font-subheading text-secondary mb-2">İletişim Bilgileri</h3>
                <p className="text-secondary-light">
                  E-posta adresi, telefon numarası, adres bilgileri gibi sizinle iletişim kurulmasını sağlayan bilgiler.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading font-subheading text-secondary mb-2">Finansal Bilgiler</h3>
                <p className="text-secondary-light">
                  Kredi skorunuz, kredi kartı bilgileriniz, banka hesap bilgileriniz, gelir bilgileriniz gibi finansal durumunuzu gösteren bilgiler.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading font-subheading text-secondary mb-2">Kullanım Verileri</h3>
                <p className="text-secondary-light">
                  Platformumuzu nasıl kullandığınıza dair bilgiler, arama geçmişi, tıklama verileri, ziyaret ettiğiniz sayfalar, platformda geçirdiğiniz süre gibi veriler.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading font-subheading text-secondary mb-2">Cihaz Bilgileri</h3>
                <p className="text-secondary-light">
                  IP adresi, tarayıcı türü, işletim sistemi, cihaz türü gibi platformumuza erişim sağladığınız cihazlara ilişkin bilgiler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-card shadow-card p-8 mb-10">
        <div className="flex items-start mb-6">
          <div className="mr-4 text-primary flex-shrink-0 mt-1">
            <Database size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-4">Kişisel Verilerin İşlenme Amaçları</h2>
            <p className="text-secondary-light mb-4">
              Kişisel verileriniz aşağıdaki amaçlar doğrultusunda işlenmektedir:
            </p>
            <ul className="list-disc list-inside text-secondary-light space-y-2">
              <li>Size uygun finansal ürün ve hizmetleri sunabilmek</li>
              <li>Kredi, kredi kartı, mevduat gibi finansal ürünler için başvurularınızı değerlendirebilmek</li>
              <li>Size özel teklifler ve kampanyalar hakkında bilgilendirme yapabilmek</li>
              <li>Platformumuzun güvenliğini sağlamak ve yetkisiz erişimleri önlemek</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek ve düzenleyici otoritelerin taleplerine cevap verebilmek</li>
              <li>Platformumuzun kullanımını analiz ederek, kullanıcı deneyimini iyileştirebilmek</li>
              <li>Hizmet kalitemizi artırmak ve müşteri memnuniyetini sağlamak</li>
              <li>Şikayet ve önerilerinizi değerlendirebilmek</li>
              <li>Dolandırıcılık ve sahtekarlık gibi yasadışı faaliyetleri tespit etmek ve önlemek</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-card shadow-card p-8 mb-10">
        <div className="flex items-start mb-6">
          <div className="mr-4 text-primary flex-shrink-0 mt-1">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-4">Kişisel Verilerin Aktarılması</h2>
            <p className="text-secondary-light mb-4">
              Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi için gerekli olduğu ölçüde ve ilgili mevzuat kapsamında aşağıdaki alıcı gruplarına aktarılabilmektedir:
            </p>
            <ul className="list-disc list-inside text-secondary-light space-y-2">
              <li>Bankalar ve finansal kuruluşlar</li>
              <li>Düzenleyici ve denetleyici kurumlar</li>
              <li>Hukuken yetkili kamu kurum ve kuruluşları</li>
              <li>Hukuken yetkili özel hukuk tüzel kişileri</li>
              <li>İş ortaklarımız ve hizmet sağlayıcılarımız</li>
            </ul>
            <p className="text-secondary-light mt-4">
              Kişisel verileriniz, yukarıda belirtilen amaçlar ve mevzuat dışında üçüncü kişilere aktarılmamaktadır. Kişisel verilerinizin yurt dışına aktarılması söz konusu olduğunda, KVKK'nın 9. maddesi kapsamında belirlenen şartlara uygun olarak aktarım gerçekleştirilmektedir.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-card shadow-card p-8 mb-10">
        <div className="flex items-start mb-6">
          <div className="mr-4 text-primary flex-shrink-0 mt-1">
            <BadgeCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-4">Kişisel Verilerin Korunması İçin Alınan Önlemler</h2>
            <p className="text-secondary-light mb-4">
              Finans Platformu, kişisel verilerinizin gizliliğini ve güvenliğini korumak için aşağıdaki teknik ve idari önlemleri almaktadır:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background-secondary p-4 rounded-lg">
                <h3 className="text-lg font-heading font-subheading text-secondary mb-2">Teknik Önlemler</h3>
                <ul className="list-disc list-inside text-secondary-light space-y-1">
                  <li>Güncel ve güçlü şifreleme teknolojileri kullanımı</li>
                  <li>Güvenlik duvarları ve saldırı tespit/önleme sistemleri</li>
                  <li>Düzenli güvenlik testleri ve zafiyet taramaları</li>
                  <li>Erişim kontrolleri ve yetkilendirme sistemleri</li>
                  <li>Veri tabanı güvenliği ve yedekleme sistemleri</li>
                  <li>Kayıt tutma ve izleme sistemleri</li>
                </ul>
              </div>
              <div className="bg-background-secondary p-4 rounded-lg">
                <h3 className="text-lg font-heading font-subheading text-secondary mb-2">İdari Önlemler</h3>
                <ul className="list-disc list-inside text-secondary-light space-y-1">
                  <li>Veri güvenliği politikaları ve prosedürleri</li>
                  <li>Çalışanlar için düzenli eğitimler</li>
                  <li>Gizlilik taahhütnameleri</li>
                  <li>İç denetimler ve risk değerlendirmeleri</li>
                  <li>Veri sızıntısı önleme ve müdahale planları</li>
                  <li>Veri işleme envanteri ve veri koruma etki değerlendirmeleri</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-card shadow-card p-8 mb-10">
        <div className="flex items-start">
          <div className="mr-4 text-primary flex-shrink-0 mt-1">
            <UserCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-subheading text-secondary mb-4">Haklarınız</h2>
            <p className="text-secondary-light mb-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 11. maddesi uyarınca, kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside text-secondary-light space-y-2 mb-6">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
              <li>Kişisel verilerinizin düzeltilmesi, silinmesi veya yok edilmesi halinde bu işlemlerin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>
            <p className="text-secondary-light mb-6">
              Yukarıda belirtilen haklarınızı kullanmak için, kimliğinizi tespit edici gerekli bilgiler ve kullanmak istediğiniz hakkınıza yönelik açıklamalarınızla birlikte yazılı talebinizi "Atatürk Bulvarı No: 123, Çankaya / Ankara" adresine ıslak imzalı olarak veya kvkk@finansplatform.com adresine güvenli elektronik imzalı olarak gönderebilirsiniz.
            </p>
            <p className="text-secondary-light">
              Başvurunuz ücretsiz olarak sonuçlandırılacak olup, ayrıca bir maliyet gerektirmesi durumunda ilgili mevzuat kapsamında belirlenen tutarlarda ücret talep edilebilecektir.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-card p-8 text-center">
        <h2 className="text-2xl font-heading font-subheading text-secondary mb-4">İrtibat</h2>
        <p className="text-secondary-light mb-6">
          Kişisel verilerinizle ilgili her türlü soru, görüş ve önerileriniz için aşağıdaki iletişim bilgilerini kullanabilirsiniz:
        </p>
        <div className="inline-flex flex-col items-center">
          <p className="text-secondary font-medium mb-1">Finans Platformu A.Ş. - Veri Koruma Birimi</p>
          <p className="text-secondary-light mb-1">Atatürk Bulvarı No: 123, Çankaya / Ankara</p>
          <p className="text-secondary-light mb-1">kvkk@finansplatform.com</p>
          <p className="text-secondary-light">0850 555 5555</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-secondary-light text-sm">
          Son Güncelleme Tarihi: 01.01.2023
        </p>
      </div>
    </div>
  )
} 