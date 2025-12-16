'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, Home, Car, Calculator, Briefcase } from 'lucide-react';

interface KrediMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export default function KrediMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: KrediMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-0 right-0 top-[64px] bg-white shadow-md border-t border-gray-200 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/kredi/ihtiyac-kredisi" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <CreditCard size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">İhtiyaç Kredisi</h3>
                  <p className="mt-1 text-xs text-gray-500">İhtiyaç kredisi faiz oranlarını karşılaştırın, günlük ihtiyaç faiz oranlarını kaçırmayın.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/kredi/konut-kredisi" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Home size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Konut Kredisi</h3>
                  <p className="mt-1 text-xs text-gray-500">Hayalinizdeki ev sitmini için en avantajlı konut faiz oranlarını karşılaştırın ve hemen başvurun.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/kredi/tasit-kredisi" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Car size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Taşıt Kredisi</h3>
                  <p className="mt-1 text-xs text-gray-500">Araçlara ödediğiniz tutarı avantajlı hale getirmek için faiz oranlarını karşılaştırın.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/kredi/ticari-kredi" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Briefcase size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Ticari Kredi</h3>
                  <p className="mt-1 text-xs text-gray-500">İşletmeniz için en uygun ticari kredileri karşılaştırın.</p>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
} 