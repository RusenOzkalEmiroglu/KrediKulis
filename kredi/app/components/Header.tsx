'use client'

import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

const navItems = [
  {
    title: 'Kredi',
    href: '/kredi',
    subItems: [
      {
        title: 'İhtiyaç Kredisi',
        href: '/kredi/ihtiyac-kredisi',
        description: 'İhtiyaç kredisi faiz oranlarını karşılaştırın, şubeye gitmeden hemen başvurun, size özel faiz oranlarını kaçırmayın.',
        icon: '/images/is logo.png',
      },
      {
        title: 'Konut Kredisi',
        href: '/kredi/konut-kredisi',
        description: 'Hayalinizdeki evi almak için en avantajlı konut kredilerini listeleyin, ev kredisi faiz oranlarını hesaplayın ve ücretsiz başvurun.',
        icon: '/images/ziraat logo.jpg',
      },
      {
        title: 'Kredi Hesaplama Araçları',
        href: '/kredi/kredi-hesaplama',
        description: '20\'den fazia bankanın kredi faiz oranlarını karşılaştırabilir, aylık ödemelerinizi kolayca hesaplayabilir, hemen başvuru yapabilirsiniz.',
        icon: '/images/kuveyt logo.jpeg',
      },
      {
        title: 'Taşıt Kredisi',
        href: '/kredi/tasit-kredisi',
        description: 'Almak istediğiniz araba için sıfır ve ikinci el taşıt kredilerini hesaplayın, faiz oranlarını karşılaştırın ve ücretsiz başvurun.',
        icon: '/images/garanti logo.png',
      },
      {
        title: 'Kobi Kredisi',
        href: '/kredi/ticari-kredi',
        description: 'İşletmeniz için ihtiyaç duyduğunuz KOBİ ve esnaf kredilerini karşılaştırın, en avantajlısına hemen başvurun.',
        icon: '/images/Yapi logo.png',
      },
    ],
  },
  {
    title: 'Kredi Kartı',
    href: '/kredi-karti',
    subItems: [
      {
        title: 'Aidatsız Kartlar',
        href: '/kredi-karti/sorgulama/aidatsiz-kartlar',
        description: 'Aidatsız kredi kartlarını listeleyin, karşılaştırın ve en avantajlısına hızlıca başvurun. Aidat ücreti ödemeden rahatça kullanın.',
        icon: '/images/Yapi logo.png',
      },
      {
        title: 'Mil Veren Kartlar',
        href: '/kredi-karti/sorgulama/mil-veren-kartlar',
        description: 'Uçuşlarınızda kullanmak üzere mil puan biriktirmek için mil veren kredi kartlarını inceleyin, mil avantajlarını kaçırmayın.',
        icon: '/images/garanti logo.png',
      },
      {
        title: 'Puan Veren Kartlar',
        href: '/kredi-karti/sorgulama/puan-veren-kartlar',
        description: 'Alışverişin keyfini katlayan puanları toplamak için puan veren kartları inceleyin, en avantajlısına hemen başvurun.',
        icon: '/images/is logo.png',
      },
      {
        title: 'Öğrenci Kartları',
        href: '/kredi-karti/sorgulama/ogrenci-karti',
        description: 'En avantajlı öğrenci kredi kartlarını listeleyin, sizin için en avantajlısına hızlıca başvurun.',
        icon: '/images/ziraat logo.jpg',
      },
      {
        title: 'Ticari Kartlar',
        href: '/kredi-karti/ticari',
        description: 'İşletmeniz için ihtiyaç duyduğunuz ticari kredi kartlarını listeleyin, hemen ücretsiz başvurun.',
        icon: '/images/kuveyt logo.jpeg',
      },
    ],
  },
  {
    title: 'Mevduat/Yatırım',
    href: '/yatirim-araclari',
    subItems: [
      {
        title: 'Mevduat',
        href: '/yatirim-araclari/mevduat-faiz-oranlari',
        description: '20\'den fazla bankanın mevduat getirilerini karşılaştırın. En avantajlı mevduat faiz oranlarına ücretsiz başvurun.',
        icon: '/images/is logo.png',
      },
      {
        title: 'Altın',
        href: '/yatirim-araclari/altin-fiyatlari',
        description: 'Güncel altın fiyatlarını takip edin. Serbest piyasa canlı altın fiyatlarını anlık takip edin, güncel bilgileri kaçırmayın.',
        icon: '/images/garanti logo.png',
      },
      {
        title: 'Döviz',
        href: '/yatirim-araclari/doviz-kurlari',
        description: 'Döviz kurlarını takip edin. Euro, Dolar, Pound gibi döviz fiyatlarını inceleyin, güncel kalın.',
        icon: '/images/Yapi logo.png',
      },
      {
        title: 'Hisse Senetleri',
        href: '/yatirim-araclari/hisse-senetleri',
        description: 'Borsa İstanbul\'da işlem gören tüm hisse senetlerini takip edebilirsin.',
        icon: '/images/ziraat logo.jpg',
      },
      {
        title: 'Yatırım Fonları',
        href: '/yatirim-araclari/fon',
        description: 'TEFAS\'ta işlem gören tüm fonların detaylı bilgilerini kolayca görüntüleyebilirsin.',
        icon: '/images/kuveyt logo.jpeg',
      },
      {
        title: 'Endeksler',
        href: '/yatirim-araclari/endeksler',
        description: 'BIST100 ve diğer borsa endekslerinin detaylı bilgilerini kolayca görüntüleyebilirsin.',
        icon: '/images/is logo.png',
      },
    ],
  },
  {
    title: 'Diğer Bankacılık Ürünleri',
    href: '/',
    subItems: [
      {
        title: 'Emekli Bankacılığı',
        href: '/emekli-bankaciligi',
        description: 'Bankaların emekli bankacılığı ürünlerini listeleyin, karşılaştırın ve en avantajlı emekli promosyonlarına hemen başvurun.',
        icon: '/images/ziraat logo.jpg',
      },
      {
        title: 'Bankaların Müşterisi Ol',
        href: '/uzaktan-musteri-edinimi',
        description: 'Şubeye gitmeden bankaları listeleyin, karşılaştırın, zaman kaybetmeden seçtiğiniz bankanın müşterisi olun.',
        icon: '/images/garanti logo.png',
      },
    ],
  },
  {
    title: 'KrediKulis Finansal Raporu',
    href: '/kredi-notu',
    iconUrl: '/images/is logo.png',
  },
  {
    title: 'KrediBilgi',
    href: '/bilgi-merkezi/',
  },
]

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

  const handleMenuHover = (index: number) => {
    setActiveMenu(index)
  }

  const handleMenuLeave = () => {
    setActiveMenu(null)
  }

  return (
    <header className="relative md:flex md:h-[78px] md:items-center md:justify-between md:p-4 md:shadow-xs xl:py-0">
      <Link href="/" className="inline-block py-3 md:py-0">
        <Image 
          src="/images/logo.png" 
          alt="KrediKulis"
          width={200}
          height={38}
          priority
          style={{ height: 'auto' }}
        />
      </Link>

      <div className="flex items-center gap-x-6">
        <nav className="flex items-center">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-x-1 px-3 py-[27px] text-secondary hover:bg-background-secondary hover:text-primary [&amp;>div]:hover:block [&amp;>svg]:hover:-rotate-90 [&amp;>svg]:hover:fill-primary"
              onMouseEnter={() => item.subItems && handleMenuHover(index)}
              onMouseLeave={handleMenuLeave}
            >
              {item.iconUrl && (
                <img
                  src={item.iconUrl}
                  alt="icon"
                  className="h-[16px]"
                  width={23}
                  height={16}
                />
              )}
              <Link href={item.href} title={item.title}>
                {item.title}
              </Link>
              {item.subItems && (
                <>
                  <ChevronDown className="rotate-90 fill-secondary-light" size={18} />
                  {activeMenu === index && (
                    <div className="absolute left-0 top-[78px] z-10 w-full cursor-default bg-background-secondary py-8 shadow-lg">
                      <ul id="sub-menu" className="container flex flex-wrap gap-x-10 gap-y-8">
                        {item.subItems.map((subItem, subIndex) => (
                          <li className="w-[330px]" role="none" key={subIndex}>
                            <Link href={subItem.href} title={subItem.title}>
                              <div className="h-[130px] rounded-card bg-background px-5 py-6 text-secondary hover:text-primary transition duration-default" role="none">
                                <div className="flex items-center gap-x-2">
                                  <img alt="icon" loading="lazy" width="20" height="20" src={subItem.icon} />
                                  <div className="flex w-full justify-between">
                                    <span className="line-clamp-1 text-sm font-subheading leading-tight">{subItem.title}</span>
                                  </div>
                                </div>
                                <div className="mt-2 line-clamp-3 text-xs leading-extra-tight text-secondary-medium">
                                  <p>{subItem.description}</p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        <div className="btn-primary flex items-center cursor-pointer h-12 text-sm px-6">
          <span className="flex select-none items-center gap-x-1">
            Giriş Yap
            <ChevronDown size={18} />
          </span>
        </div>
      </div>
    </header>
  )
} 