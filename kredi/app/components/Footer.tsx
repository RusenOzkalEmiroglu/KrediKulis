'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

const footerLinks = [
  {
    title: 'Ürünler',
    links: [
      { name: 'İhtiyaç Kredisi', url: '/kredi/ihtiyac-kredisi' },
      { name: 'Konut Kredisi', url: '/kredi/konut-kredisi' },
      { name: 'Taşıt Kredisi', url: '/kredi/tasit-kredisi' },
      { name: 'Kredi Kartı', url: '/kredi-karti' },
      { name: 'Mevduat', url: '/yatirim-araclari/mevduat-faiz-oranlari' },
      { name: 'KOBİ Kredisi', url: '/kredi/ticari-kredi' }
    ]
  },
  {
    title: 'Kredi Hesaplama',
    links: [
      { name: 'İhtiyaç Kredisi Hesaplama', url: '/kredi/kredi-hesaplama/ihtiyac-kredisi' },
      { name: 'Konut Kredisi Hesaplama', url: '/kredi/kredi-hesaplama/konut-kredisi' },
      { name: 'Taşıt Kredisi Hesaplama', url: '/kredi/kredi-hesaplama/tasit-kredisi' },
      { name: 'KKDF ve BSMV Hesaplama', url: '/kredi/kredi-hesaplama/kkdf-bsmv' },
      { name: 'Kredi Faiz Hesaplama', url: '/kredi/kredi-hesaplama/kredi-faizi' },
      { name: 'Kredi Erken Kapatma', url: '/kredi/kredi-hesaplama/erken-kapama' }
    ]
  },
  {
    title: 'Karşılaştırma',
    links: [
      { name: 'İhtiyaç Kredisi Karşılaştırma', url: '/karsilastirma/ihtiyac-kredisi' },
      { name: 'Konut Kredisi Karşılaştırma', url: '/karsilastirma/konut-kredisi' },
      { name: 'Taşıt Kredisi Karşılaştırma', url: '/karsilastirma/tasit-kredisi' },
      { name: 'Kredi Kartı Karşılaştırma', url: '/karsilastirma/kredi-karti' },
      { name: 'Mevduat Karşılaştırma', url: '/karsilastirma/mevduat' },
      { name: 'KOBİ Kredisi Karşılaştırma', url: '/karsilastirma/kobi-kredisi' }
    ]
  }
]

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube }
]

export default function Footer() {
  return (
    <footer className="bg-black-gradient text-white pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo.png"
              alt="KrediKulis"
              width={180}
              height={34}
              className="mb-4"
              style={{ height: 'auto' }}
            />
            <p className="mb-6 text-sm text-background">
              KrediKulis, Türkiye'nin en kapsamlı finansal ürün karşılaştırma platformudur.
            </p>
            <h3 className="mb-6 text-sm font-heading font-subheading uppercase text-background">KrediKulis Hakkında</h3>
            <ul className="space-y-4">
              <li>
                <a className="text-sm text-background hover:text-primary transition duration-default" href="/hakkimizda">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a className="text-sm text-background hover:text-primary transition duration-default" href="/iletisim">
                  İletişim
                </a>
              </li>
              <li>
                <a className="text-sm text-background hover:text-primary transition duration-default" href="/basin-odasi">
                  Basın
                </a>
              </li>
              <li>
                <a className="text-sm text-background hover:text-primary transition duration-default" href="/kariyer">
                  Kariyer
                </a>
              </li>
            </ul>
          </div>
          {footerLinks.map((group, index) => (
            <div key={index}>
              <h3 className="mb-6 text-sm font-heading font-subheading uppercase text-background">
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.url} className="text-sm text-background hover:text-primary transition duration-default">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-secondary-light py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="mb-6">
              <Image
                src="/images/logo.png"
                alt="KrediKulis"
                width={180}
                height={34}
                style={{ height: 'auto' }}
              />
              <p className="mt-4 max-w-md text-sm text-background">
                KrediKulis, Türkiye'nin en kapsamlı finansal ürün karşılaştırma platformudur. En iyi finansal ürünleri bulmak ve başvurmak için tek adresiniz.
              </p>
            </div>
            <p className="text-sm text-background">
              © {new Date().getFullYear()} KrediKulis. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-background hover:text-primary transition duration-default"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-light py-6 text-center text-xs text-background">
          <p>
            Bu sitede yer alan bilgiler yatırım tavsiyesi değildir. Yatırım danışmanlığı hizmeti; aracı kurumlar, portföy yönetim şirketleri, mevduat kabul etmeyen bankalar ile müşteri arasında imzalanacak yatırım danışmanlığı sözleşmesi çerçevesinde sunulmaktadır.
          </p>
        </div>
      </div>
    </footer>
  )
} 