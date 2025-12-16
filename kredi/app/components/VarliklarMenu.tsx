'use client';

import React from 'react';
import Link from 'next/link';
import { PiggyBank, Coins, DollarSign, TrendingUp, LineChart, BarChart3 } from 'lucide-react';

interface VarliklarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export default function VarliklarMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: VarliklarMenuProps) {
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
            <Link href="/varliklar/mevduat" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <PiggyBank size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Mevduat</h3>
                  <p className="mt-1 text-xs text-gray-500">20'den fazla bankanın mevduat getirilerini karşılaştırabilir, en avantajlı mevduat faiz oranlarına ücretsiz başvurabilirsiniz.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/varliklar/altin" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Coins size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Altın</h3>
                  <p className="mt-1 text-xs text-gray-500">Güncel altın fiyatlarını takip edin. Serbest piyasa canlı altın fiyatlarını anlık olarak güncel kalın.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/varliklar/doviz" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <DollarSign size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Döviz</h3>
                  <p className="mt-1 text-xs text-gray-500">Döviz kurlarını takip edin. Euro, Dolar, Pound gibi döviz fiyatlarını izleyin, güncel kalın.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/varliklar/hisse-senetleri" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <TrendingUp size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Hisse Senetleri</h3>
                  <p className="mt-1 text-xs text-gray-500">Borsa İstanbul'da işlem gören tüm hisse senetlerini takip edebilirsiniz.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/varliklar/yatirim-fonlari" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <LineChart size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Yatırım Fonları</h3>
                  <p className="mt-1 text-xs text-gray-500">TEFAS'ta işlem gören tüm fonların detaylı bilgilerini kolayca görüntüleyebilirsiniz.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/varliklar/endeksler" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <BarChart3 size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Endeksler</h3>
                  <p className="mt-1 text-xs text-gray-500">BIST100 ve diğer borsa endekslerinin detaylı bilgilerini kolayca görüntüleyebilirsiniz.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 