'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, LineChart, Terminal, Building } from 'lucide-react';

interface DigerUrunlerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export default function DigerUrunlerMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: DigerUrunlerMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-0 right-0 top-[64px] bg-white shadow-md border-t border-gray-200 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Link href="/diger/sigorta" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Shield size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Sigorta</h3>
                  <p className="mt-1 text-xs text-gray-500">Birçok farklı sigorta şirketinin tekliflerini karşılaştırın ve ihtiyacınıza en uygun olanına hemen başvurun.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/diger/bes" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <LineChart size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Bireysel Emeklilik</h3>
                  <p className="mt-1 text-xs text-gray-500">Emeklilik sisteminde devlet katkısı fırsatlarıyla geleceğinizi güvence altına alın. Bireysel emeklilik ürünlerini karşılaştırın.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/diger/pos" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Terminal size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">POS Başvurusu</h3>
                  <p className="mt-1 text-xs text-gray-500">İşletmeniz için ihtiyaç duyduğunuz POS cihazlarına anında başvurun.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/diger/ticari-hesap" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Building size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Ticari Hesap</h3>
                  <p className="mt-1 text-xs text-gray-500">İşletmeniz için en uygun ticari hesapları bulabilir, bankaların ticari müşterilere özel kampanyalarını takip edebilirsiniz.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 