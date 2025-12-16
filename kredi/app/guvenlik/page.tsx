'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Shield, Lock, Eye, FileText, CheckCircle2, ArrowRight } from 'lucide-react'

export default function GuvenlikPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-4">Güvenlik</h1>
        <p className="text-secondary-light text-lg">
          Verilerinizin güvenliği bizim önceliğimizdir. En yüksek güvenlik standartlarını uygulayarak bilgilerinizi koruyoruz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-heading font-subheading text-secondary mb-6">
            Güvenlik Taahhüdümüz
          </h2>
          <p className="text-secondary-light mb-4">
            Finans Platformu olarak, kullanıcılarımızın kişisel ve finansal verilerinin güvenliğini sağlamak en önemli önceliğimizdir. Sektördeki en iyi güvenlik uygulamalarını takip ederek, verilerinizi yetkisiz erişime, değişikliğe ve ifşaya karşı korumak için çok katmanlı güvenlik önlemleri uyguluyoruz.
          </p>
          <p className="text-secondary-light mb-6">
            Platformumuz, düzenli güvenlik denetimleri, şifreleme teknolojileri ve sıkı erişim kontrolleri ile korunmaktadır. Kullanıcılarımızın finansal bilgilerini en yüksek güvenlik standartlarında işleme, saklama ve iletme konusunda kararlıyız.
          </p>
          <Link href="/guvenlik/bilgi-guvenligi-politikamiz" className="btn-primary">
            Detaylı Bilgi
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/security/800/600" 
            alt="Güvenlik" 
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-background-secondary rounded-card p-8 md:p-12 mb-20">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-10 text-center">
          Güvenlik Önlemlerimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-card p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4">Veri Şifreleme</h3>
            <p className="text-secondary-light">
              Hassas verilerinizi en son şifreleme teknolojileri ile koruyoruz. Verileriniz hem iletim sırasında (SSL/TLS protokolleri ile) hem de depolama sırasında (AES-256 şifreleme ile) şifrelenir.
            </p>
          </div>

          <div className="bg-background rounded-card p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4">Güvenli Kimlik Doğrulama</h3>
            <p className="text-secondary-light">
              Güçlü şifre politikaları ve iki faktörlü kimlik doğrulama (2FA) ile hesaplarınıza yetkisiz erişimleri engelliyoruz. Şüpheli giriş denemeleri anında tespit edilir ve size bildirilir.
            </p>
          </div>

          <div className="bg-background rounded-card p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4">7/24 İzleme</h3>
            <p className="text-secondary-light">
              Sistemlerimiz 7/24 izlenmekte ve olası güvenlik tehditlerine karşı sürekli taranmaktadır. Gelişmiş yapay zeka algoritmaları ile şüpheli aktiviteler anında tespit edilir ve gerekli önlemler alınır.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-10 text-center">
          Güvenlik Belgeleri ve Politikalar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/guvenlik/bilgi-guvenligi-politikamiz" className="bg-background rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow flex">
            <div className="mr-4 text-primary">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">Bilgi Güvenliği Politikamız</h3>
              <p className="text-secondary-light">
                Bilgi güvenliği politikamız, veri koruma yaklaşımımızı, güvenlik kontrollerimizi ve yönetim taahhütlerimizi açıklar.
              </p>
            </div>
          </Link>

          <Link href="/guvenlik/kisisel-verilerin-korunmasi" className="bg-background rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow flex">
            <div className="mr-4 text-primary">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">Kişisel Verilerin Korunması</h3>
              <p className="text-secondary-light">
                KVKK kapsamında kişisel verilerinizin nasıl işlendiği, saklandığı ve korunduğu hakkında bilgi edinebilirsiniz.
              </p>
            </div>
          </Link>

          <Link href="/guvenlik/acik-riza-metni" className="bg-background rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow flex">
            <div className="mr-4 text-primary">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">Açık Rıza Metni</h3>
              <p className="text-secondary-light">
                Kişisel verilerinizin işlenmesine ilişkin açık rıza metnini inceleyebilirsiniz.
              </p>
            </div>
          </Link>

          <Link href="/guvenlik/gizlilik-bildirimi" className="bg-background rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow flex">
            <div className="mr-4 text-primary">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">Gizlilik Bildirimi</h3>
              <p className="text-secondary-light">
                Platformumuzun gizlilik politikasını, çerezlerin kullanımını ve veri paylaşım prensiplerimizi öğrenebilirsiniz.
              </p>
            </div>
          </Link>

          <Link href="/guvenlik/kullanim-kosullari" className="bg-background rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow flex">
            <div className="mr-4 text-primary">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">Kullanım Koşulları</h3>
              <p className="text-secondary-light">
                Platformumuzu kullanırken uymanız gereken kurallar ve koşullar hakkında bilgi alabilirsiniz.
              </p>
            </div>
          </Link>

          <Link href="/guvenlik/kalite-politikamiz" className="bg-background rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow flex">
            <div className="mr-4 text-primary">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">Kalite Politikamız</h3>
              <p className="text-secondary-light">
                Hizmet kalitemizi sürekli iyileştirme taahhüdümüz ve kalite standartlarımız hakkında bilgi edinebilirsiniz.
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-10 text-center">
          Güvenlik Tavsiyeleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-background rounded-card shadow-card p-6">
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4 flex items-center">
              <CheckCircle2 size={20} className="text-primary mr-2" />
              Güçlü Şifreler Kullanın
            </h3>
            <p className="text-secondary-light">
              En az 12 karakter uzunluğunda, büyük-küçük harfler, rakamlar ve özel karakterler içeren güçlü şifreler oluşturun. Her hesap için farklı şifreler kullanmaya özen gösterin ve düzenli olarak şifrelerinizi değiştirin.
            </p>
          </div>

          <div className="bg-background rounded-card shadow-card p-6">
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4 flex items-center">
              <CheckCircle2 size={20} className="text-primary mr-2" />
              İki Faktörlü Kimlik Doğrulamayı Etkinleştirin
            </h3>
            <p className="text-secondary-light">
              Hesabınıza ekstra güvenlik katmanı eklemek için iki faktörlü kimlik doğrulamayı (2FA) etkinleştirin. Bu, şifrenizle birlikte telefonunuza gelen bir kod veya biyometrik doğrulama gibi ikinci bir doğrulama faktörü gerektirir.
            </p>
          </div>

          <div className="bg-background rounded-card shadow-card p-6">
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4 flex items-center">
              <CheckCircle2 size={20} className="text-primary mr-2" />
              Bilgisayar ve Mobil Cihazlarınızı Güncel Tutun
            </h3>
            <p className="text-secondary-light">
              İşletim sisteminizi, tarayıcınızı ve uygulamalarınızı her zaman en son sürümle güncel tutun. Güncellemeler genellikle güvenlik açıklarını kapatır ve cihazınızı daha güvenli hale getirir.
            </p>
          </div>

          <div className="bg-background rounded-card shadow-card p-6">
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4 flex items-center">
              <CheckCircle2 size={20} className="text-primary mr-2" />
              Şüpheli E-posta ve Mesajlara Dikkat Edin
            </h3>
            <p className="text-secondary-light">
              Phishing saldırılarına karşı dikkatli olun. Tanımadığınız kaynaklardan gelen e-postalardaki bağlantılara tıklamayın, kişisel bilgilerinizi paylaşmayın ve şüpheli e-postaları spam olarak işaretleyin.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-card p-8 md:p-12 text-center">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-6">
          Güvenlik Sorunları Bildirimi
        </h2>
        <p className="text-secondary-light max-w-2xl mx-auto mb-8">
          Platformumuzda herhangi bir güvenlik açığı veya şüpheli aktivite fark ederseniz, lütfen hemen bizimle iletişime geçin. Güvenlik ekibimiz raporu inceleyecek ve gerekli önlemleri alacaktır.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/iletisim" className="btn-primary">
            Güvenlik Bildirimi Yap
          </Link>
          <a href="mailto:security@finansplatform.com" className="btn-secondary">
            security@finansplatform.com
          </a>
        </div>
      </div>
    </div>
  )
}