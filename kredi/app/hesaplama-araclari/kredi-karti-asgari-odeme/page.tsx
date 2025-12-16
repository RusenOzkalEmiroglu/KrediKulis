import type { Metadata } from 'next';
import AsgariOdemeTutariHesaplamaAraci from './AsgariOdemeTutariHesaplamaAraci';
import FAQ from './FAQ';

export const metadata: Metadata = {
  title: 'Kredi Kartı Asgari Ödeme Tutarı Hesaplama | HangiKredi',
  description: 'Kredi kartı asgari ödeme tutarını hesaplayın.',
};

export default function AsgariOdemeTutariHesaplama() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#ff3d00] to-[#ff6333] bg-clip-text text-transparent">Asgari Ödeme Tutarı Hesaplama Aracı</h1>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-10">Kredi kartı asgari ödeme tutarınızı kolayca hesaplayın.</p>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <AsgariOdemeTutariHesaplamaAraci />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <FAQ />
      </div>
    </main>
  );
}
