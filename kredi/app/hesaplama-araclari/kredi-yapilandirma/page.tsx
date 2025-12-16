import type { Metadata } from 'next';
import KrediYapilandirmaHesaplamaAraci from './KrediYapilandirmaHesaplamaAraci';
import FAQ from './FAQ';

export const metadata: Metadata = {
  title: 'Kredi Yapılandırma Hesaplama | HangiKredi',
  description: 'Mevcut kredinizi yapılandırarak yeni ödeme planınızı hesaplayın ve ne kadar tasarruf edebileceğinizi görün.',
};

export default function KrediYapilandirmaHesaplama() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#ff3d00] to-[#ff6333] bg-clip-text text-transparent">Kredi Yapılandırma Hesaplama Aracı</h1>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-10">Mevcut kredinizi daha uygun koşullarla yapılandırarak ne kadar tasarruf edebileceğinizi hesaplayın.</p>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <KrediYapilandirmaHesaplamaAraci />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <FAQ />
      </div>
    </main>
  );
}
