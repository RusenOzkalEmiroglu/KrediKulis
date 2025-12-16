"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { ArrowRight } from 'lucide-react';

import { calculateMonthlyPayment, formatCurrency } from '../../utils/formatters';

interface VehicleLoan {
  id: number;
  bank_id: number;
  vehicle_condition: '0' | '2. el';
  maks_tutar: number;
  maks_vade: number;
  interest_rate: number;
  allocation_fee: number;
  kkdf: number;
  bsmv: number;
  real_interest_rate: number;
  annual_cost_rate: number;
  description?: string;
  created_at?: string;
  bank?: { name: string };
}

export default function TasitKredisiHesaplama() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const term = searchParams.get('term');
  const vehicleCondition = searchParams.get('vehicleCondition');

  const [loans, setLoans] = useState<VehicleLoan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const { data, error } = await supabase
          .from('vehicle_loans')
          .select(`
            *,
            bank:banks(name)
          `)
          .eq('vehicle_condition', vehicleCondition)
          .gte('maks_tutar', parseFloat(amount!))
          .gte('maks_vade', parseInt(term!));

        if (error) {
          throw error;
        }

        setLoans(data || []);
      } catch (error) {
        console.error('Error fetching loans:', error);
        alert('Krediler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    if (amount && term && vehicleCondition) {
      fetchLoans();
    }
  }, [amount, term, vehicleCondition]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Taşıt Kredisi Hesaplama Sonuçları</h1>
        <p className="text-gray-600 mt-2">
          {amount} TL tutarında, {term} ay vadeli ve {vehicleCondition === '0' ? '0 km' : '2. el'} araç için bankaların teklifleri:
        </p>
      </div>

      {/* Sonuçlar */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          loans.map((loan) => {
            const monthlyPayment = calculateMonthlyPayment(
              parseFloat(amount!),
              loan.interest_rate,
              parseInt(term!)
            );
            const totalPayment = monthlyPayment * parseInt(term!);

            return (
              <div key={loan.id} className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold">{loan.bank?.name}</h2>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Aylık Taksit</p>
                    <p className="text-lg font-semibold">{formatCurrency(monthlyPayment)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Toplam Ödeme</p>
                    <p className="text-lg font-semibold">{formatCurrency(totalPayment)}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                      Başvur
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}