'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Target, TrendingUp, Users, Award, Clock, Shield, Heart, ArrowRight } from 'lucide-react'

export default function HakkimizdaPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-4">Hakkımızda</h1>
        <p className="text-secondary-light text-lg">
          Finansal hayatınızı kolaylaştırmak ve doğru kararlar almanıza yardımcı olmak için buradayız.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-heading font-subheading text-secondary mb-6">
            Biz Kimiz?
          </h2>
          <p className="text-secondary-light mb-4">
            Finans Platformu olarak, 2015 yılından bu yana Türkiye'nin finansal ekosisteminde önemli bir yere sahibiz. Kullanıcılarımıza doğru finansal kararlar almalarında yardımcı olmak ve karmaşık finansal konuları herkesin anlayabileceği bir dille sunmak için çalışıyoruz.
          </p>
          <p className="text-secondary-light mb-6">
            Bağımsız bir finansal karşılaştırma ve bilgilendirme platformu olarak, tarafsız bilgiler ve güvenilir karşılaştırmalar sunarak, finansal okuryazarlığı artırmayı ve herkes için daha şeffaf bir finansal dünya oluşturmayı hedefliyoruz.
          </p>
          <div className="flex space-x-4">
            <Link href="/hakkimizda/ekibimiz" className="btn-primary">
              Ekibimizi Tanıyın
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link href="/hakkimizda/kariyer" className="btn-secondary">
              Kariyer Fırsatları
            </Link>
          </div>
        </div>
        <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/about-us/800/600" 
            alt="Finans Platformu Ekibi" 
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-background-secondary rounded-card p-8 md:p-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/mission/800/600" 
                alt="Misyonumuz" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                <Target size={20} />
              </div>
              <h2 className="text-2xl font-heading font-subheading text-secondary">Misyonumuz</h2>
            </div>
            <p className="text-secondary-light mb-6">
              Karmaşık finansal kararları basitleştirerek, her bireyin ve işletmenin doğru finansal kararlar almasına yardımcı olmak. Tarafsız bilgi, karşılaştırmalar ve araçlar sunarak finansal okuryazarlığı artırmak ve herkesin finansal refahını iyileştirmek.
            </p>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                <TrendingUp size={20} />
              </div>
              <h2 className="text-2xl font-heading font-subheading text-secondary">Vizyonumuz</h2>
            </div>
            <p className="text-secondary-light">
              Türkiye'nin önde gelen finansal bilgi ve karşılaştırma platformu olarak, finansal şeffaflığı artırarak, her bireyin finansal geleceğini güvence altına alabildiği bir ekosistem oluşturmak. Teknoloji ve insani değerleri birleştirerek finansal hizmetlere erişimi kolaylaştırmak.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-10 text-center">
          Değerlerimiz
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-background p-6 rounded-card shadow-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-heading font-subheading text-secondary mb-2 text-center">Kullanıcı Odaklılık</h3>
            <p className="text-secondary-light text-center">
              Her kararımızın merkezinde kullanıcılarımızın ihtiyaçları ve memnuniyeti yer alır. Sürekli olarak kullanıcı deneyimini iyileştirmek için çalışırız.
            </p>
          </div>

          <div className="bg-background p-6 rounded-card shadow-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
              <Award size={24} />
            </div>
            <h3 className="text-xl font-heading font-subheading text-secondary mb-2 text-center">Dürüstlük ve Şeffaflık</h3>
            <p className="text-secondary-light text-center">
              Kullanıcılarımıza her zaman dürüst ve şeffaf bilgiler sunarız. Tarafsız karşılaştırmalar ve açık bilgiler ile güveninizi kazanırız.
            </p>
          </div>

          <div className="bg-background p-6 rounded-card shadow-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-heading font-subheading text-secondary mb-2 text-center">Güvenilirlik</h3>
            <p className="text-secondary-light text-center">
              Finansal kararlar güven gerektirir. Doğru, güncel ve güvenilir bilgiler sunarak, kullanıcılarımızın güvenini kazanmak en büyük önceliğimizdir.
            </p>
          </div>

          <div className="bg-background p-6 rounded-card shadow-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-heading font-subheading text-secondary mb-2 text-center">Toplumsal Sorumluluk</h3>
            <p className="text-secondary-light text-center">
              Finansal okuryazarlığı artırarak ve herkesin erişebileceği finansal bilgiler sunarak topluma katkıda bulunmayı amaçlıyoruz.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-10 text-center">
          Kilometre Taşlarımız
        </h2>
        <div className="relative border-l-4 border-primary/20 pl-8 ml-4 md:ml-12 space-y-12 py-6">
          <div className="relative">
            <div className="absolute left-[-36px] h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div className="bg-background rounded-card shadow-card p-6">
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">2015 - Kuruluş</h3>
              <p className="text-secondary-light">
                Finans Platformu, finansal karşılaştırma ve bilgilendirme platformu olarak kuruldu. İlk yılımızda 10,000 kullanıcıya ulaştık.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-36px] h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div className="bg-background rounded-card shadow-card p-6">
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">2017 - Genişleme</h3>
              <p className="text-secondary-light">
                Ürün yelpazemizi genişleterek, kredi, kredi kartı ve mevduat karşılaştırmalarına ek olarak sigorta ve yatırım ürünlerini de ekledik.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-36px] h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div className="bg-background rounded-card shadow-card p-6">
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">2019 - Mobil Uygulama</h3>
              <p className="text-secondary-light">
                İlk mobil uygulamamızı piyasaya sürdük, kullanıcılarımıza her yerden finansal bilgilere erişim imkanı sağladık.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-36px] h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div className="bg-background rounded-card shadow-card p-6">
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">2021 - Finansal Eğitim İçerikleri</h3>
              <p className="text-secondary-light">
                Finansal okuryazarlığı artırmak amacıyla, kapsamlı eğitim içerikleri ve webinarlar sunmaya başladık.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-36px] h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div className="bg-background rounded-card shadow-card p-6">
              <h3 className="text-xl font-heading font-subheading text-secondary mb-2">2023 - Yapay Zeka Entegrasyonu</h3>
              <p className="text-secondary-light">
                Kişiselleştirilmiş finansal tavsiyeler sunmak için yapay zeka teknolojilerini platformumuza entegre ettik.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-background-secondary p-8 rounded-card">
          <div className="text-4xl font-heading font-bold text-primary mb-2">100+</div>
          <p className="text-secondary text-lg">Finansal Ürün</p>
          <p className="text-secondary-light mt-2">Karşılaştırma ve değerlendirme için sunduğumuz ürün sayısı</p>
        </div>

        <div className="bg-background-secondary p-8 rounded-card">
          <div className="text-4xl font-heading font-bold text-primary mb-2">500K+</div>
          <p className="text-secondary text-lg">Aktif Kullanıcı</p>
          <p className="text-secondary-light mt-2">Her ay sitemizi ziyaret eden ve finansal araçlarımızı kullanan kişi sayısı</p>
        </div>

        <div className="bg-background-secondary p-8 rounded-card">
          <div className="text-4xl font-heading font-bold text-primary mb-2">25+</div>
          <p className="text-secondary text-lg">Finansal Kurum</p>
          <p className="text-secondary-light mt-2">İş birliği yaptığımız ve ürünlerini karşılaştırdığımız kurum sayısı</p>
        </div>
      </div>

      <div className="bg-primary/5 rounded-card p-8 md:p-12 text-center">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-6">
          Bize Katılın
        </h2>
        <p className="text-secondary-light max-w-2xl mx-auto mb-8">
          Finans dünyasında fark yaratmak ve herkesin finansal kararlarını bilinçli almasına yardımcı olmak istiyorsanız, ekibimize katılın. Dinamik, yenilikçi ve etik değerlere sahip bir ortamda çalışarak kariyer hedeflerinize ulaşın.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <Link href="/hakkimizda/ekibimiz" className="btn-secondary">
            Ekibimizi Tanıyın
          </Link>
          <Link href="/hakkimizda/kariyer" className="btn-primary">
            Kariyer Fırsatları
            <ArrowRight size={16} className="ml-2" />
          </Link>
          <Link href="/iletisim" className="btn-secondary">
            İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  )
} 