import type { Metadata } from 'next';
import BilesikFaizHesaplamaAraci from './BilesikFaizHesaplamaAraci';
import FAQ from './FAQ';

export const metadata: Metadata = {
  title: 'Bileşik Faiz Hesaplama | HangiKredi',
  description: 'Bileşik faiz hesaplama aracı ile yatırımınızın vade sonundaki değerini hesaplayın.',
};

export default function BilesikFaizHesaplama() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#ff3d00] to-[#ff6333] bg-clip-text text-transparent">Bileşik Faiz Hesaplama Aracı</h1>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-10">Yatırımınızın bileşik faizle ne kadar büyüyeceğini hesaplayın ve finansal hedeflerinize ulaşmak için planlama yapın.</p>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <BilesikFaizHesaplamaAraci />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <FAQ />
      </div>
    </main>
  );
}
