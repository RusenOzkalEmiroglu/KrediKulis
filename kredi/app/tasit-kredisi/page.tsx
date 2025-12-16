"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Shield, Star } from 'lucide-react';

export default function TasitKredisi() {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [vehicleCondition, setVehicleCondition] = useState<'0' | '2. el'>('0');
  const router = useRouter();

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/tasit-kredisi-hesaplama?amount=${amount}&term=${term}&vehicleCondition=${vehicleCondition}`);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 bg-white">
        <h1 className="text-4xl font-extrabold text-gray-900">Taşıt Kredisi</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Hayalinizdeki araca sahip olmak için en uygun taşıt kredisi seçeneklerini karşılaştırın, anında başvurun.
        </p>
      </div>

      {/* Calculator Section */}
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6">Taşıt Kredisi Hesaplama</h2>
        <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Kredi Tutarı</label>
            <input
              id="amount"
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Örn: 250.000 ₺"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-2">Vade (Ay)</label>
            <input
              id="term"
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Örn: 36 Ay"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="vehicleCondition" className="block text-sm font-medium text-gray-700 mb-2">Araç Durumu</label>
            <select
              id="vehicleCondition"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={vehicleCondition}
              onChange={(e) => setVehicleCondition(e.target.value as '0' | '2. el')}
            >
              <option value="0">0 km</option>
              <option value="2. el">2. el</option>
            </select>
          </div>
          <button type="submit" className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center">
            Hesapla <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Information Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 my-12">
        <div className="flex items-start">
          <CheckCircle className="h-8 w-8 text-green-500 mr-4 mt-1" />
          <div>
            <h3 className="font-bold text-lg">Hızlı Başvuru</h3>
            <p className="text-gray-600">Kredi başvurunuzu online olarak hızla tamamlayın, anında yanıt alın.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Shield className="h-8 w-8 text-blue-500 mr-4 mt-1" />
          <div>
            <h3 className="font-bold text-lg">Geniş Kapsam</h3>
            <p className="text-gray-600">Hem sıfır hem de ikinci el araçlar için en uygun kredi çözümleri.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Star className="h-8 w-8 text-yellow-500 mr-4 mt-1" />
          <div>
            <h3 className="font-bold text-lg">Rekabetçi Faiz Oranları</h3>
            <p className="text-gray-600">Piyasadaki en iyi faiz oranlarını karşılaştırarak bütçenize en uygun krediyi bulun.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Sıkça Sorulan Sorular</h2>
        <div className="space-y-4">
          <details className="p-4 border rounded-lg bg-white">
            <summary className="font-semibold cursor-pointer">Taşıt kredisi nedir?</summary>
            <p className="mt-2 text-gray-700">Taşıt kredisi, bireylerin veya işletmelerin sıfır veya ikinci el bir araç satın almasını finanse etmek amacıyla bankalardan aldığı bir kredi türüdür.</p>
          </details>
          <details className="p-4 border rounded-lg bg-white">
            <summary className="font-semibold cursor-pointer">Kimler taşıt kredisi kullanabilir?</summary>
            <p className="mt-2 text-gray-700">18 yaşını doldurmuş, düzenli gelire sahip ve kredi notu yeterli olan herkes taşıt kredisi için başvurabilir.</p>
          </details>
          <details className="p-4 border rounded-lg bg-white">
            <summary className="font-semibold cursor-pointer">Kredinin vadesi en fazla kaç ay olabilir?</summary>
            <p className="mt-2 text-gray-700">Taşıt kredisinde vade, aracın fatura değerine göre değişiklik göstermektedir. Genellikle 48 aya kadar vade imkanı sunulmaktadır.</p>
          </details>
        </div>
      </div>
    </div>
  );
}