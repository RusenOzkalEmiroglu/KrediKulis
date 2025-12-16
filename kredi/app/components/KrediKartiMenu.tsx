'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, Award, Target, GraduationCap, Briefcase } from 'lucide-react';

interface KrediKartiMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export default function KrediKartiMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: KrediKartiMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-0 right-0 top-[64px] bg-white shadow-md border-t border-gray-200 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/kredi-karti/aidatsiz-kartlar" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <CreditCard size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Aidat̀sız Kartlar</h3>
                  <p className="mt-1 text-xs text-gray-500">Aidat̀sız kart seçenekleri, karşılaştırın ve en avantajlısına hemen başvurun.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/kredi-karti/mil-veren-kartlar" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Award size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Mil Veren Kartlar</h3>
                  <p className="mt-1 text-xs text-gray-500">Uçuş ve seyahat tutkunuysanız, mil puan biriktiren kart kartlarını karşılaştırın, mil kazanmaya başlayın.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/kredi-karti/extrali-kartlar" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Target size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Extralı Kartlar</h3>
                  <p className="mt-1 text-xs text-gray-500">Alışveriş keyfini ekstra avantajlarla ikiye katlayın, size en uygun extralı kartları bulun.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/kredi-karti/ogrenci-kartlari" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Öğrenci Kartları</h3>
                  <p className="mt-1 text-xs text-gray-500">En avantajlı öğrenci kredi kartlarını listeleyin, sizin için en avantajlısına hemen başvurun.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/kredi-karti/ticari-kartlar" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Briefcase size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Ticari Kartlar</h3>
                  <p className="mt-1 text-xs text-gray-500">İşletmeniz için ihtiyaç duyduğunuz ticari kredi kartlarını listeleyin, hemen ücretsiz başvurun.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 