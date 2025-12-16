'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Hata loglama servisi burada entegre edilebilir
    console.error('Altın sayfası hatası:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Bir sorun oluştu
            </h2>
            <p className="text-gray-600 mb-6">
              Altın fiyatları yüklenirken beklenmeyen bir hata meydana geldi.
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
