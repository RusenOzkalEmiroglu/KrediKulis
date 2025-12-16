'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface MenuItem {
    href: string;
    label: string;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/bankalar', label: 'Bankalar' },
    { 
        href: '#', 
        label: 'Krediler',
        children: [
            { href: '/admin/ihtiyac-kredisi', label: 'İhtiyaç Kredisi' },
            { href: '/admin/faizsiz-krediler', label: 'Faizsiz Krediler' },
            { href: '/admin/konut-kredisi', label: 'Konut Kredisi' },
            { href: '/admin/tasit-kredisi', label: 'Taşıt Kredisi' },
            { href: '/admin/commercial-loans', label: 'Ticari Krediler' },
        ]
    },
    {
        href: '#',
        label: 'Kredi Kartları',
        children: [
            { href: '/admin/kredi-kartlari/aidatsiz-kartlar', label: 'Aidatsız Kredi Kartları' },
            { href: '/admin/kredi-kartlari/extrali', label: 'Extralı Kredi Kartları' },
            { href: '/admin/kredi-kartlari/ogrenci-kartlari', label: 'Öğrenci Kredi Kartları' },
            { href: '/admin/kredi-kartlari/ticari-kartlari', label: 'Ticari Kredi Kartları' },
        ]
    },
    { href: '/admin/mevduat', label: 'Mevduat' },
    { 
        href: '#',
        label: 'Yatırım Araçları',
        children: [
            { href: '/admin/altin', label: 'Altın' },
            { href: '/admin/doviz', label: 'Döviz' },
            { href: '/admin/hisse-senedi', label: 'Hisse Senedi' },
            { href: '/admin/yatirim-fonlari', label: 'Yatırım Fonları' },
        ]
    },
    { href: '/admin/reklam-alanlari', label: 'Reklam Alanları' },
    { href: '/admin/sana-ozel-kampanyalar', label: 'Sana Özel Kampanyalar' },
    { href: '/admin/kullanici-yonetimi', label: 'Kullanıcı Yönetimi' },
    { href: '/admin/ayarlar', label: 'Ayarlar' },
];

const SubMenu = ({ item }: { item: MenuItem }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(item.children?.some(child => pathname.startsWith(child.href)) || false);

    const isActive = item.children?.some(child => pathname.startsWith(child.href));

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                    isActive ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors`}
            >
                <span className="flex items-center">{item.label}</span>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {isOpen && (
                <div className="pl-4 mt-1 space-y-1">
                    {item.children?.map(child => {
                        const isChildActive = pathname === child.href;
                        return (
                            <Link
                                key={child.href}
                                href={child.href}
                                className={`${
                                    isChildActive ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900'
                                } group flex items-center px-3 py-2 text-sm rounded-md transition-colors`}
                            >
                                {child.label}
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.href === pathname) return item.label;
      if (item.children) {
        for (const child of item.children) {
          if (child.href === pathname) return child.label;
        }
      }
    }
    return 'Dashboard';
  }


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Link href="/admin" className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="KrediKulis Admin" 
                width={150} 
                height={30}
                priority
                style={{ height: 'auto' }}
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-1">
              {menuItems.map((item) => {
                if(item.children) {
                    return <SubMenu key={item.label} item={item} />
                }
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="fixed top-0 right-0 left-64 h-16 bg-white shadow-sm z-20">
          <div className="flex items-center justify-between h-full px-6">
            <h1 className="text-xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin Panel</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
 