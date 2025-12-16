'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Twitter, Mail, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface TeamMember {
  id: string
  name: string
  title: string
  department: string
  bio: string
  imageUrl: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

export default function EkibimizPage() {
  const [expandedBio, setExpandedBio] = useState<string | null>(null)

  const toggleBio = (id: string) => {
    if (expandedBio === id) {
      setExpandedBio(null)
    } else {
      setExpandedBio(id)
    }
  }

  const executiveTeam: TeamMember[] = [
    {
      id: 'ahmet-yilmaz',
      name: 'Ahmet Yılmaz',
      title: 'CEO & Kurucu',
      department: 'Yönetim',
      bio: 'Ahmet Yılmaz, 15 yılı aşkın finans sektörü tecrübesiyle Finans Platformu\'nun kurucusu ve CEO\'sudur. Boğaziçi Üniversitesi İşletme bölümünden mezun olduktan sonra, önde gelen bankalarda yöneticilik pozisyonlarında görev almıştır. 2015 yılında finansal karşılaştırma ve bilgilendirme platformu olarak Finans Platformu\'nu kurmuştur. Ahmet, finansal teknolojilerin herkes için erişilebilir olması ve finansal okuryazarlığın artırılması konularında tutkulu bir savunucudur.',
      imageUrl: 'https://picsum.photos/seed/ceo/400/400',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'ahmet@finansplatform.com'
      }
    },
    {
      id: 'ayse-kaya',
      name: 'Ayşe Kaya',
      title: 'Teknoloji Direktörü',
      department: 'Teknoloji',
      bio: 'Ayşe Kaya, ODTÜ Bilgisayar Mühendisliği mezunu olup, teknoloji ve finans alanında 12 yıllık deneyime sahiptir. Finans Platformu\'na katılmadan önce, çeşitli fintech şirketlerinde yazılım mimarı ve teknoloji yöneticisi olarak görev yapmıştır. Yapay zeka, büyük veri analizi ve kullanıcı deneyimi konularında uzmanlığa sahip olan Ayşe, platformun teknolojik altyapısından ve yenilikçi çözümlerinden sorumludur.',
      imageUrl: 'https://picsum.photos/seed/cto/400/400',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'ayse@finansplatform.com'
      }
    },
    {
      id: 'mehmet-demir',
      name: 'Mehmet Demir',
      title: 'Finansal İçerik Direktörü',
      department: 'İçerik',
      bio: 'Mehmet Demir, İstanbul Üniversitesi Ekonomi bölümünden mezun olup, finans gazeteciliği ve içerik yönetimi alanında 10 yılı aşkın deneyime sahiptir. Çeşitli ekonomi dergilerinde editörlük yapan Mehmet, karmaşık finansal konuları herkesin anlayabileceği bir dille anlatma konusunda uzmanlaşmıştır. Platformun tüm içerik stratejisinden ve finansal eğitim materyallerinden sorumludur.',
      imageUrl: 'https://picsum.photos/seed/content/400/400',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        email: 'mehmet@finansplatform.com'
      }
    },
    {
      id: 'zeynep-yildiz',
      name: 'Zeynep Yıldız',
      title: 'Pazarlama Direktörü',
      department: 'Pazarlama',
      bio: 'Zeynep Yıldız, Koç Üniversitesi Pazarlama bölümü mezunu olup, dijital pazarlama stratejileri konusunda uzmandır. E-ticaret ve fintech sektörlerinde 8 yıllık pazarlama tecrübesine sahiptir. Finans Platformu\'ndaki görevi, platformun bilinirliğini artırmak, kullanıcı kazanımı stratejilerini geliştirmek ve marka konumlandırmasını güçlendirmektir. Veri odaklı pazarlama yaklaşımıyla tanınan Zeynep, sosyal medya ve içerik pazarlaması konularında başarılı kampanyalara imza atmıştır.',
      imageUrl: 'https://picsum.photos/seed/marketing/400/400',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'zeynep@finansplatform.com'
      }
    }
  ]

  const teamMembers: TeamMember[] = [
    {
      id: 'can-ozturk',
      name: 'Can Öztürk',
      title: 'Kıdemli Yazılım Geliştirici',
      department: 'Teknoloji',
      bio: 'Can Öztürk, backend sistemleri ve veritabanı optimizasyonu konusunda uzmanlaşmış kıdemli bir yazılım geliştiricisidir. 7 yıllık yazılım tecrübesiyle ekibe katılan Can, platformun performans ve ölçeklenebilirlik çalışmalarını yönetmektedir.',
      imageUrl: 'https://picsum.photos/seed/developer1/400/400',
    },
    {
      id: 'elif-sahin',
      name: 'Elif Şahin',
      title: 'UX/UI Tasarımcısı',
      department: 'Teknoloji',
      bio: 'Elif Şahin, kullanıcı deneyimi ve arayüz tasarımı konusunda 5 yıllık deneyime sahip yaratıcı bir tasarımcıdır. Platformun kullanıcı dostu ve estetik arayüzünün arkasındaki isim olan Elif, kullanıcı odaklı tasarım prensiplerini benimsemektedir.',
      imageUrl: 'https://picsum.photos/seed/designer/400/400',
    },
    {
      id: 'berk-yilmaz',
      name: 'Berk Yılmaz',
      title: 'Veri Analisti',
      department: 'İçerik',
      bio: 'Berk Yılmaz, veri analizi ve istatistik konularında uzmanlaşmış bir analisttir. Finansal verileri analiz ederek içgörü çıkarma ve kullanıcı davranışlarını anlama konusunda platformun veri odaklı kararlar almasına yardımcı olmaktadır.',
      imageUrl: 'https://picsum.photos/seed/analyst/400/400',
    },
    {
      id: 'deniz-kara',
      name: 'Deniz Kara',
      title: 'Finansal İçerik Uzmanı',
      department: 'İçerik',
      bio: 'Deniz Kara, ekonomi eğitimi almış ve finans sektöründe 6 yıl çalışmış bir içerik uzmanıdır. Kredi, yatırım ve tasarruf konularında uzmanlaşan Deniz, platformun bilgilendirici içeriklerinin hazırlanmasından sorumludur.',
      imageUrl: 'https://picsum.photos/seed/content2/400/400',
    },
    {
      id: 'ceren-yildirim',
      name: 'Ceren Yıldırım',
      title: 'Müşteri İlişkileri Yöneticisi',
      department: 'Operasyon',
      bio: 'Ceren Yıldırım, kullanıcı memnuniyeti ve müşteri ilişkileri konusunda 7 yıllık deneyime sahiptir. Platformun kullanıcılarının sorularını yanıtlama ve sorunlarına çözüm bulma konusunda uzman olan Ceren, müşteri deneyimini iyileştirme süreçlerini yönetmektedir.',
      imageUrl: 'https://picsum.photos/seed/customer/400/400',
    },
    {
      id: 'tolgahan-aksoy',
      name: 'Tolgahan Aksoy',
      title: 'SEO Uzmanı',
      department: 'Pazarlama',
      bio: 'Tolgahan Aksoy, arama motoru optimizasyonu ve içerik stratejisi konularında uzmanlaşmış bir dijital pazarlama profesyonelidir. Platformun arama motorlarındaki görünürlüğünü artırmak ve organik trafiği yükseltmek için çalışmaktadır.',
      imageUrl: 'https://picsum.photos/seed/seo/400/400',
    },
    {
      id: 'seda-yavuz',
      name: 'Seda Yavuz',
      title: 'Sosyal Medya Uzmanı',
      department: 'Pazarlama',
      bio: 'Seda Yavuz, sosyal medya stratejileri ve içerik yönetimi konusunda 4 yıllık deneyime sahiptir. Platformun sosyal medya hesaplarını yöneten Seda, topluluk oluşturma ve etkileşim artırma konularında başarılı çalışmalar yürütmektedir.',
      imageUrl: 'https://picsum.photos/seed/social/400/400',
    }
  ]

  const departments = [
    { id: 'yonetim', name: 'Yönetim' },
    { id: 'teknoloji', name: 'Teknoloji' },
    { id: 'icerik', name: 'İçerik' },
    { id: 'pazarlama', name: 'Pazarlama' },
    { id: 'operasyon', name: 'Operasyon' }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-4">Ekibimiz</h1>
        <p className="text-secondary-light text-lg">
          Finansal dünyayı daha anlaşılır ve erişilebilir kılmak için çalışan tutkulu ekibimizle tanışın.
        </p>
      </div>

      <section className="mb-20">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-10 text-center">Yönetim Ekibi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executiveTeam.map(member => (
            <div key={member.id} className="bg-background rounded-card shadow-card overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={member.imageUrl} 
                  alt={member.name} 
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-subheading text-secondary mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-1">{member.title}</p>
                <p className="text-secondary-light text-sm mb-4">{member.department}</p>
                
                <div className="relative">
                  <p className={`text-secondary-light text-sm ${expandedBio === member.id ? '' : 'line-clamp-3'}`}>
                    {member.bio}
                  </p>
                  <button 
                    onClick={() => toggleBio(member.id)}
                    className="text-primary text-sm font-medium mt-2 flex items-center"
                  >
                    {expandedBio === member.id ? (
                      <>
                        Daha Az Göster
                        <ChevronUp size={16} className="ml-1" />
                      </>
                    ) : (
                      <>
                        Daha Fazla Göster
                        <ChevronDown size={16} className="ml-1" />
                      </>
                    )}
                  </button>
                </div>
                
                {member.socialLinks && (
                  <div className="flex mt-4 space-x-3">
                    {member.socialLinks.linkedin && (
                      <a 
                        href={member.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-secondary-medium hover:text-primary transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a 
                        href={member.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-secondary-medium hover:text-primary transition-colors"
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {member.socialLinks.email && (
                      <a 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-secondary-medium hover:text-primary transition-colors"
                      >
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-10 text-center">Ekip Üyelerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <div key={member.id} className="bg-background rounded-card shadow-card overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={member.imageUrl} 
                  alt={member.name} 
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-heading font-subheading text-secondary mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-1">{member.title}</p>
                <p className="text-secondary-light text-sm mb-4">{member.department}</p>
                
                <div className="relative">
                  <p className={`text-secondary-light text-sm ${expandedBio === member.id ? '' : 'line-clamp-2'}`}>
                    {member.bio}
                  </p>
                  <button 
                    onClick={() => toggleBio(member.id)}
                    className="text-primary text-sm font-medium mt-2 flex items-center"
                  >
                    {expandedBio === member.id ? (
                      <>
                        Daha Az Göster
                        <ChevronUp size={16} className="ml-1" />
                      </>
                    ) : (
                      <>
                        Daha Fazla Göster
                        <ChevronDown size={16} className="ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-10 text-center">Departmanlarımız</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-card shadow-card p-6">
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4">Teknoloji</h3>
            <p className="text-secondary-light mb-4">
              Teknoloji ekibimiz, platformun tüm teknik altyapısından, yazılım geliştirme süreçlerinden ve kullanıcı deneyiminden sorumludur. Yenilikçi çözümler geliştirerek, kullanıcılarımıza en iyi dijital finans deneyimini sunmak için çalışırlar.
            </p>
            <ul className="list-disc list-inside text-secondary-light ml-2 space-y-1">
              <li>Yazılım Geliştirme</li>
              <li>UX/UI Tasarım</li>
              <li>Veritabanı Yönetimi</li>
              <li>Yapay Zeka ve Makine Öğrenimi</li>
              <li>Sistem Güvenliği</li>
            </ul>
          </div>

          <div className="bg-background rounded-card shadow-card p-6">
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4">İçerik</h3>
            <p className="text-secondary-light mb-4">
              İçerik ekibimiz, finansal bilgileri herkesin anlayabileceği bir dile çevirerek, kullanıcılarımızın doğru finansal kararlar almasına yardımcı olur. Güncel ekonomik gelişmeleri takip ederek, platformdaki tüm bilgilerin doğru ve güncel olmasını sağlarlar.
            </p>
            <ul className="list-disc list-inside text-secondary-light ml-2 space-y-1">
              <li>Finansal İçerik Üretimi</li>
              <li>Veri Analizi</li>
              <li>Ekonomi Haberleri</li>
              <li>Finansal Eğitim Materyalleri</li>
              <li>Ürün Karşılaştırmaları</li>
            </ul>
          </div>

          <div className="bg-background rounded-card shadow-card p-6">
            <h3 className="text-xl font-heading font-subheading text-secondary mb-4">Pazarlama</h3>
            <p className="text-secondary-light mb-4">
              Pazarlama ekibimiz, platformumuzun bilinirliğini artırmak ve daha fazla kişiye ulaşmak için çalışır. Dijital pazarlama stratejileri geliştirerek, kullanıcı kazanımı ve marka konumlandırması konularında başarılı çalışmalar yürütürler.
            </p>
            <ul className="list-disc list-inside text-secondary-light ml-2 space-y-1">
              <li>Dijital Pazarlama</li>
              <li>SEO ve İçerik Stratejisi</li>
              <li>Sosyal Medya Yönetimi</li>
              <li>Kullanıcı Kazanımı</li>
              <li>İş Ortaklıkları</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="bg-primary/5 rounded-card p-8 md:p-12 text-center">
        <h2 className="text-3xl font-heading font-subheading text-secondary mb-6">
          Ekibimize Katılın
        </h2>
        <p className="text-secondary-light max-w-2xl mx-auto mb-8">
          Fintech dünyasında iz bırakmak ve kariyerinizi geliştirmek istiyorsanız, sizleri aramızda görmekten mutluluk duyarız. Yenilikçi, dinamik ve tutkulu bir ekipte çalışarak, finansal geleceği şekillendirmek için bize katılın.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/hakkimizda/kariyer" className="btn-primary">
            Açık Pozisyonlar
          </Link>
          <Link href="/iletisim" className="btn-secondary">
            İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  )
} 