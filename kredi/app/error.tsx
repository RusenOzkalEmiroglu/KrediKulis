'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Hata loglama servisi burada entegre edilebilir
    console.error('Uygulama hatası:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Bir sorun oluştu
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Beklenmeyen bir hata meydana geldi. Özür dileriz.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={reset}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Tekrar Dene
          </button>
          <div className="text-center">
            <a
              href="/"
              className="font-medium text-primary hover:text-primary/80"
            >
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
