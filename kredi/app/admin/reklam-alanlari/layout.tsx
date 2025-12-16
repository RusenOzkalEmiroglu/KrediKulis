// kredi/app/admin/reklam-alanlari/layout.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdManagementLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/reklam-alanlari', label: 'Genel Bakış' },
    { href: '/admin/reklam-alanlari/yerlesimler', label: 'Reklam Yerleşimleri' },
    { href: '/admin/reklam-alanlari/ekle', label: 'Reklam Ekle/Listele' },
    { href: '/admin/reklam-alanlari/gruplar', label: 'Reklam Grupları' },
    { href: '/admin/reklam-alanlari/raporlar', label: 'Raporlar' },
  ];

  return (
    <div className="flex h-full">
      <aside className="w-64 bg-gray-50 p-4 border-r">
        <h2 className="text-xl font-semibold mb-4 text-brand-orange">Reklam Yönetimi</h2>
        <nav>
          <ul>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="mb-2">
                  <Link href={item.href} legacyBehavior>
                    <a className={`block p-2 rounded ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'}`}>
                      {item.label}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  );
};

export default AdManagementLayout;
