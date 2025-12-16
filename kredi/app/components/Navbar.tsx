'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import KrediMenu from './KrediMenu';
import KrediKartiMenu from './KrediKartiMenu';
import VarliklarMenu from './VarliklarMenu';
import DigerUrunlerMenu from './DigerUrunlerMenu';

interface MenuItem {
  title: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Kredi',
    href: '/kredi',
  },
  {
    title: 'Kredi Kartı',
    href: '/kredi-karti',
  },
  {
    title: 'Mevduat/Yatırım',
    href: '/mevduat-yatirim',
  },
  {
    title: 'Diğer Bankacılık Ürünleri',
    href: '/diger-bankacilik-urunleri',
  }
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMenuEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(title);
  };

  const handleMenuLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100); // Kısa bir gecikme ekleyerek fare işaretçisinin dropdown'a geçiş yapmasına imkan tanıyoruz
  };

  // Açık dropdown dışındaki tıklamaları dinle
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Temizlik
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getMenuProps = (title: string) => ({
    isOpen: activeMenu === title,
    onClose: () => setActiveMenu(null),
    onMouseEnter: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  });

  return (
    <div ref={navRef}>
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="HangiKredi" 
                width={300} 
                height={100} 
                className="my-2"
                priority 
                style={{ height: 'auto' }}
              />
            </Link>

            {/* Main Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((menu) => (
                <div
                  key={menu.title}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(menu.title)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link 
                    href={menu.href}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-primary"
                  >
                    <span>{menu.title}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Additional Menu Items */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/rapor" className="text-gray-700 hover:text-primary">
                HangiKredi Finansal Raporu
              </Link>
              <Link href="/bilgi" className="text-gray-700 hover:text-primary">
                HangiBilgi
              </Link>
              <Link
                href="/giris"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Dropdown Menus */}
      <KrediMenu 
        isOpen={activeMenu === 'Kredi'} 
        onClose={() => setActiveMenu(null)}
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }}
        onMouseLeave={handleMenuLeave}
      />
      <KrediKartiMenu
        isOpen={activeMenu === 'Kredi Kartı'}
        onClose={() => setActiveMenu(null)}
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }}
        onMouseLeave={handleMenuLeave}
      />
      <VarliklarMenu
        isOpen={activeMenu === 'Mevduat/Yatırım'}
        onClose={() => setActiveMenu(null)}
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }}
        onMouseLeave={handleMenuLeave}
      />
      <DigerUrunlerMenu
        isOpen={activeMenu === 'Diğer Bankacılık Ürünleri'}
        onClose={() => setActiveMenu(null)}
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }}
        onMouseLeave={handleMenuLeave}
      />
    </div>
  );
} 