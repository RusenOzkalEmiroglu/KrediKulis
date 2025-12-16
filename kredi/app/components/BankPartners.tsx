"use client";

import React from 'react';
import Image from 'next/image';

// Gelen banka verisinin tipini tanımlıyoruz
interface Bank {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface BankPartnersProps {
  banks: Bank[];
}

export default function BankPartners({ banks }: BankPartnersProps) {
  if (!banks || banks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">İş Ortaklarımız</h2>
        <p className="text-gray-500">Gösterilecek banka bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">İş Ortaklarımız</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
        {banks.map((bank) => (
          <div key={bank.id} className="flex items-center justify-center border border-gray-100 rounded-md p-2 h-16">
            <div 
              className="flex items-center justify-center w-full h-full rounded-md group relative"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src={bank.logo}
                  alt={`${bank.name} logo`}
                  width={80}
                  height={30}
                  style={{ objectFit: 'contain' }}
                  className="max-w-full max-h-full"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} // Hide if logo is not found
                />
                {/* Animated bottom bar */}
                <span
                  className="absolute left-0 bottom-0 h-1 w-0 rounded transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: bank.color || '#cccccc' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
