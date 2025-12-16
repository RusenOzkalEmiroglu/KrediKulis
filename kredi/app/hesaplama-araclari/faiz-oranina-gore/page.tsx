import type { Metadata } from 'next';
import FaizOraninaGoreHesaplamaAraci from './FaizOraninaGoreHesaplamaAraci';
import FAQ from './FAQ';

export const metadata: Metadata = {
  title: 'Faiz Oranına Göre Kredi Hesaplama | HangiKredi',
  description: 'Faiz oranına göre kredi tutarı, taksit ve toplam ödeme hesaplayın.',
};

export default function FaizOraninaGoreHesaplama() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#ff3d00] to-[#ff6333] bg-clip-text text-transparent">Faiz Oranına Göre Kredi Hesaplama</h1>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-10">Kredi türü, tutarı, vadesi ve faiz oranına göre aylık taksit ve toplam ödeme tutarınızı hesaplayın.</p>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <FaizOraninaGoreHesaplamaAraci />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <FAQ />
      </div>
    </main>
  );
}
