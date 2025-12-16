'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Home, Briefcase, FileText, BookOpen } from 'lucide-react'; // Removed unused Info

// Basit menü öğeleri
const menuItems = [
  { title: 'Kredi', href: '/kredi', icon: <Home size={16} className="mr-2" /> },
  { title: 'Kredi Kartı', href: '/kredi-karti', icon: <CreditCard size={16} className="mr-2" /> },
  { title: 'Varlıklar', href: '/varliklar', icon: <Briefcase size={16} className="mr-2" /> },
  { title: 'Hesaplama Araçları', href: '/hesaplama-araclari', icon: <FileText size={16} className="mr-2" /> }
];

// Alt menü verileri
const submenuData: { [key: string]: { img?: string, title: string, href: string }[] } = { // Added optional img type
  'Kredi': [
    { img: '/images/menu-backgrounds/ihtiyac-kredisi.png', title: 'İhtiyaç Kredisi', href: '/kredi/ihtiyac-kredisi' },
    { img: '/images/menu-backgrounds/tasit-kredisi.png', title: 'Taşıt Kredisi', href: '/kredi/tasit-kredisi' },
    { img: '/images/menu-backgrounds/konut-kredisi.png', title: 'Konut Kredisi', href: '/kredi/konut-kredisi' },
    { img: '/images/menu-backgrounds/ticari-kredi.png', title: 'Ticari Kredi', href: '/kredi/ticari-kredi' },
  ],
  'Kredi Kartı': [
    { img: '/images/menu-backgrounds/aidatsiz-kart.png', title: 'Aidatsız Kartlar', href: '/kredi-karti/aidatsiz-kartlar' },
    { img: '/images/menu-backgrounds/extrali-kartlar.png', title: 'Extralı Kartlar', href: '/kredi-karti/extrali-kartlar' },
    { img: '/images/menu-backgrounds/ogrenci-kart.png', title: 'Öğrenci Kartları', href: '/kredi-karti/ogrenci-kartlari' },
    { img: '/images/menu-backgrounds/ticari-kart.png', title: 'Ticari Kartlar', href: '/kredi-karti/ticari' },
  ],
  'Varlıklar': [
    { img: '/images/menu-backgrounds/mevduat.png', title: 'Mevduat', href: '/varliklar/mevduat' },
    { img: '/images/menu-backgrounds/doviz.png', title: 'Döviz', href: '/varliklar/doviz' },
    { img: '/images/menu-backgrounds/altin.png', title: 'Altın', href: '/varliklar/altin' },
    { img: '/images/menu-backgrounds/hisse-senedi.png', title: 'Hisse Senedi', href: '/varliklar/hisse-senetleri' },
    { img: '/images/menu-backgrounds/yatirim-fonlari.png', title: 'Yatırım Fonları', href: '/varliklar/yatirim-fonlari' },
  ],
  'Hesaplama Araçları': [
    { img: '/images/menu-backgrounds/kredi-hesaplama-araclari.png', title: 'Ne Kadar Kredi Çekebilirim?', href: '/hesaplama-araclari/ne-kadar-kredi' },
    { img: '/images/menu-backgrounds/1.png', title: 'Taksitli Nakit Avans', href: '/hesaplama-araclari/kredi-karti-taksitli-nakit-avans' },
    { img: '/images/menu-backgrounds/2.png', title: 'Kart Asgari Ödeme Tutarı', href: '/hesaplama-araclari/kredi-karti-asgari-odeme' },
    { img: '/images/menu-backgrounds/3.png', title: 'Kart Gecikme Faizi', href: '/hesaplama-araclari/kredi-karti-gecikme-faizi' },
    { img: '/images/menu-backgrounds/4.png', title: 'Faiz Oranına Göre Hesaplama', href: '/hesaplama-araclari/faiz-oranina-gore' },
    { img: '/images/menu-backgrounds/5.png', title: 'Kredi Yapılandırma', href: '/hesaplama-araclari/kredi-yapilandirma' },
    { img: '/images/menu-backgrounds/6.png', title: 'Bileşik Faiz Hesaplama', href: '/hesaplama-araclari/bilesik-faiz' },
    { img: '/images/menu-backgrounds/7.png', title: 'Taksite Göre Hesaplama', href: '/hesaplama-araclari/taksite-gore' },
  ]
};

export default function MainMenu() {
  // Basit durum: sadece hangi menünün açık olduğunu tutar
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fare menü alanına girdiğinde ilgili menüyü aç
  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(title);
  };

  // Fare menü alanından çıktığında kısa bir gecikmeyle menüyü kapat
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Delay closing the menu slightly to allow moving mouse to submenu
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150); // 150ms delay
  };

  // Dışarı tıklayınca kapatmak için
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null); // Close menu if clicked outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // Cleanup timeout on unmount
    };
  }, []);

  // Basit SVG placeholder
  const getImageUrl = (img: string | undefined, title: string) => {
    if (img) return img;
    // Simple gray placeholder with first letter
    const svg = `<svg width='80' height='64' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' rx='8' fill='#f3f4f6'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='#9ca3af' font-family='Arial, sans-serif'>${title[0]}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  return (
    // Added menuRef here for outside click detection
    <div ref={menuRef} className="relative">
      {/* Main Navigation Bar */}
      <nav className="bg-white border-t-4 border-t-[#ff3d00] shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16"> {/* Use justify-between */}

            {/* Logo */}
            <Link href="/" className="flex-shrink-0"> {/* Removed unnecessary flex items-center */}
              <Image
                src="/images/logo.png"
                alt="Kredi Kulis Logo"
                width={150} // Adjusted size
                height={40} // Adjusted size
                priority
                style={{ height: 'auto' }}
              />
            </Link>

            {/* Main Menu Items - Centered */}
            <div className="hidden md:flex flex-1 justify-center h-full"> {/* Centered items */}
              {menuItems.map((menu) => (
                <div
                  key={menu.title}
                  className="h-full flex items-center" // Removed justify-center and flex-1 here
                  onMouseEnter={() => handleMouseEnter(menu.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={menu.href}
                    // Use standard Tailwind classes for active/hover state
                    className={`h-full px-5 flex items-center font-bold text-base transition-colors duration-200 border-l border-gray-100 first:border-l-0
                      ${activeMenu === menu.title ? 'bg-[#ff3d00] text-white' : 'text-[#333] hover:bg-gray-100 hover:text-[#ff3d00]'}
                    `}
                    style={{ minWidth: 120 }} // Ensure items have some minimum width
                  >
                    <span className="mr-2">{menu.icon}</span>
                    <span>{menu.title}</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Section (Finansal Rapor, Blog) */}
            <div className="hidden md:flex items-center space-x-2 ml-auto"> {/* Kept ml-auto to push right */}
              <Link href="/rapor" className="px-4 py-2 flex items-center font-bold text-[#333] hover:bg-gray-100 hover:text-[#ff3d00] rounded-md transition-colors duration-200">
                <FileText size={16} className="mr-2" />
                Finansal Rapor
              </Link>
              <Link href="/bilgi" className="px-4 py-2 flex items-center font-bold text-[#333] hover:bg-gray-100 hover:text-[#ff3d00] rounded-md transition-colors duration-200">
                <BookOpen size={16} className="mr-2" />
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Dropdown Submenu Area */}
      {/* Only render submenu if activeMenu is set and data exists */}
      {activeMenu && submenuData[activeMenu] && (
        <div
          className="absolute left-0 right-0 top-full w-full bg-white shadow-lg z-40 border-t border-gray-200"
          // Keep submenu open if mouse enters it
          onMouseEnter={() => handleMouseEnter(activeMenu)}
          // Close submenu if mouse leaves it
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto py-4 px-4">
            <div className="flex flex-wrap justify-center gap-4"> {/* Centered submenu items */}
              {submenuData[activeMenu]?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  // Simplified styling for submenu items
                  className="flex flex-col items-center w-[140px] rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 bg-gray-50 p-2"
                  onClick={() => setActiveMenu(null)} // Close menu on submenu item click
                >
                  <div
                    className="w-full h-16 bg-contain bg-center bg-no-repeat mb-1 rounded" // Image container
                    style={{ backgroundImage: `url(${getImageUrl(item.img, item.title)})` }}
                  />
                  <span className="text-sm font-semibold text-center text-[#ff3d00]">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}