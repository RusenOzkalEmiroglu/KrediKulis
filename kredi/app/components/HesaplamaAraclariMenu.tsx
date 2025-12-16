'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, PiggyBank, DollarSign, CreditCard, Briefcase, Clock, Percent, CreditCard as CreditCardIcon } from 'lucide-react';

interface HesaplamaAraclariMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export default function HesaplamaAraclariMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: HesaplamaAraclariMenuProps) {
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
          <Link href="/hesaplama-araclari/ne-kadar-kredi" className="block group">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Calculator size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Ne Kadar Kredi Çekebilirim?</h3>
                <p className="mt-1 text-xs text-gray-500">Gelirinize göre çekebileceğiniz kredi tutarını hesaplayın.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-4">
          <Link href="/hesaplama-araclari/kredi-karti-taksitli-nakit-avans" className="block group">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <CreditCard size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Kredi Kartı Taksitli Nakit Avans Hesaplama</h3>
                <p className="mt-1 text-xs text-gray-500">Kredi kartı nakit avans tutarını ve taksitlerini hesaplayın.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-4">
          <Link href="/hesaplama-araclari/kredi-karti-asgari-odeme" className="block group">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <CreditCard size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Kredi Kartı Asgari Ödeme Tutarı Hesaplama</h3>
                <p className="mt-1 text-xs text-gray-500">Kredi kartınızın asgari ödeme tutarını hesaplayın.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-4">
          <Link href="/hesaplama-araclari/kredi-karti-gecikme-faizi" className="block group">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <CreditCard size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Kredi Kartı Gecikme Faizi Hesaplama</h3>
                <p className="mt-1 text-xs text-gray-500">Gecikme durumunda ödeyeceğiniz faiz tutarını hesaplayın.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <div className="space-y-4">
          <Link href="/hesaplama-araclari/faiz-oranina-gore" className="block group">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Percent size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Faiz Oranına Göre Hesaplama</h3>
                <p className="mt-1 text-xs text-gray-500">Kredi faiz oranına göre ödeme planınızı hesaplayın.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-4">
          <Link href="/hesaplama-araclari/kredi-yapilandirma" className="block group">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Calculator size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Kredi Yapılandırma Hesaplama</h3>
                <p className="mt-1 text-xs text-gray-500">Kredinizi yapılandırma sonrası ödeme planınızı görün.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-4">
          <Link href="/hesaplama-araclari/kredim-onaylanir-mi" className="block group">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <CreditCardIcon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Kredim Onaylanır Mı?</h3>
                <p className="mt-1 text-xs text-gray-500">Kredi başvurunuzun onaylanma ihtimalini hesaplayın.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-4">
          <Link href="/hesaplama-araclari/bilesik-faiz" className="block group">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Percent size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Bileşik Faiz Hesaplama</h3>
                <p className="mt-1 text-xs text-gray-500">Bileşik faiz yöntemiyle yatırımınızın getirisini hesaplayın.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <div className="space-y-4">
          <Link href="/hesaplama-araclari/taksite-gore" className="block group">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Taksite Göre Hesaplama</h3>
                <p className="mt-1 text-xs text-gray-500">Ödeyebileceğiniz taksit tutarına göre kredi miktarını hesaplayın.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
