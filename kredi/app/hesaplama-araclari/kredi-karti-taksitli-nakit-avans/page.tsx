import type { Metadata } from 'next';
import TaksitliNakitAvansHesaplamaAraci from './TaksitliNakitAvansHesaplamaAraci';
import FAQ from './FAQ';


export const metadata: Metadata = {
  title: 'Kredi Kartı Taksitli Nakit Avans Hesaplama | HangiKredi',
  description: 'Kredi kartı nakit avans tutarını ve taksitlerini hesaplayın.',
};



export default function KrediKartiTaksitliNakitAvansHesaplama() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#ff3d00] to-[#ff6333] bg-clip-text text-transparent">Kredi Kartı Taksitli Nakit Avans Hesaplama</h1>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-10">Kredi kartı nakit avans tutarını ve taksitlerini hesaplayın.</p>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <TaksitliNakitAvansHesaplamaAraci />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <FAQ />
      </div>
    </main>
  );
}
