'use client';

import { Home, CheckCircle, DollarSign, Clock, Calendar, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import SifirFaizFirsatlari from "../../components/SifirFaizFirsatlari";
import LoanDetailModal from "../../components/LoanDetailModal";
import { calculateMonthlyPayment, formatCurrency } from "../../../utils/formatters";

// Define TypeScript interfaces for our data structures
interface Bank {
  id: number;
  name: string;
  logo: string;
  color: string;
  bsmv_rate?: number;
  kkdf_rate?: number;
}

interface LoanProduct {
  id: number;
  bank_id: number;
  loan_name: string;
  interest_rate: number;
  maks_tutar: number;
  maks_vade: number;
  bank: Bank; // Corrected
  application_url?: string;
  bsmv?: number;
  kkdf?: number;
}

interface DisplayLoan extends LoanProduct {
  amount: number;
  term: number;
  monthly_payment: number;
  total_payment: number;
  total_interest?: number;
  total_taxes?: number;
  isCalculating?: boolean;
  calculationTime?: number;
}

export default function KonutKredisi() {
  const [amount, setAmount] = useState('2000000');
  const [term, setTerm] = useState('120');
  
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
  const [displayLoans, setDisplayLoans] = useState<DisplayLoan[]>([]);
  const [interestFreeLoans, setInterestFreeLoans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLoanForDetail, setSelectedLoanForDetail] = useState<DisplayLoan | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const termOptions = Array.from({ length: 15 }, (_, i) => (i + 1) * 12);

  const handleOpenDetailModal = (loan: DisplayLoan) => {
    setSelectedLoanForDetail(loan);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedLoanForDetail(null);
  };

  const calculateLoanDetails = (pv: number, term: number, monthlyRatePercent: number, bsmv_rate: number, kkdf_rate: number) => {
    if (pv <= 0 || term <= 0) {
      return { monthly_payment: 0, total_payment: 0, total_interest: 0, total_taxes: 0 };
    }
  
    const monthlyPaymentPI = calculateMonthlyPayment(pv, monthlyRatePercent, term);
  
    if (monthlyPaymentPI === 0) {
      return { monthly_payment: pv / term, total_payment: pv, total_interest: 0, total_taxes: 0 };
    }
  
    const totalPaymentPI = monthlyPaymentPI * term;
    const totalInterest = totalPaymentPI - pv;
    const totalTaxes = totalInterest * (bsmv_rate + kkdf_rate);
    const totalPaymentWithTaxes = pv + totalInterest + totalTaxes;
    const monthlyPaymentWithTaxes = totalPaymentWithTaxes / term;
  
    return { 
      monthly_payment: monthlyPaymentWithTaxes, 
      total_payment: totalPaymentWithTaxes, 
      total_interest: totalInterest, 
      total_taxes: totalTaxes 
    };
  };

  const updateDisplayLoans = (baseAmount: number, baseTerm: number, products: LoanProduct[]) => {
    const updatedLoans = products.map(product => {
      const maks_tutar = product.maks_tutar || 9999999;
      const maks_vade = product.maks_vade || 180;
      const amount = Math.min(baseAmount, maks_tutar);
      const term = Math.min(baseTerm, maks_vade);
      
      const bsmv_rate = product.bank?.bsmv_rate || 0; // Konut kredisinde BSMV genellikle 0'dır
      const kkdf_rate = product.bank?.kkdf_rate || 0;

      const details = calculateLoanDetails(amount, term, product.interest_rate, bsmv_rate, kkdf_rate);

      return {
        ...product,
        amount: amount,
        term: term,
        ...details,
      };
    });
    setDisplayLoans(updatedLoans);
  };

  useEffect(() => {
    const shuffle = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const fetchAllLoans = async () => {
      console.log("Fetching initial loan data for housing page...");
      setIsLoading(true);
      try {
        // Set up both fetches to run in parallel
        const housingLoansPromise = supabase
          .from('housing_loans')
          .select(`*, application_url, bsmv, kkdf, bank:banks (id, name, logo, color, bsmv_rate, kkdf_rate)`);
        
        const interestFreePromise = fetch('/api/zero-interest-loans', { cache: 'no-store' });

        const [housingLoansResponse, interestFreeResponse] = await Promise.all([
          housingLoansPromise,
          interestFreePromise
        ]);

        // Handle housing loans
        if (housingLoansResponse.error) throw housingLoansResponse.error;
        if (housingLoansResponse.data) {
          console.log("Fetched housing loans:", housingLoansResponse.data);
          const shuffledData = shuffle(housingLoansResponse.data);
          setLoanProducts(shuffledData as LoanProduct[]);
          updateDisplayLoans(parseFloat(amount), parseInt(term, 10), shuffledData as LoanProduct[]);
        }

        // Handle interest-free loans
        if (interestFreeResponse.ok) {
          const interestFreeData = await interestFreeResponse.json();
          setInterestFreeLoans(interestFreeData);
        } else {
          console.error('Failed to fetch interest-free loans');
        }

      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllLoans();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCalculate = () => {
    const numericAmount = parseFloat(amount);
    const numericTerm = parseInt(term, 10);

    if (isNaN(numericAmount) || isNaN(numericTerm) || numericAmount <= 0) {
      alert("Lütfen geçerli bir kredi tutarı ve vade girin.");
      return;
    }
    
    setIsCalculating(true);

    const calculatingLoans = loanProducts.map(p => ({ ...p, isCalculating: true } as DisplayLoan));
    setDisplayLoans(calculatingLoans);

    const promises = loanProducts.map((product, index) => {
      return new Promise<DisplayLoan>(resolve => {
        const delay = Math.random() * 2000;
        setTimeout(() => {
          const maks_tutar = product.maks_tutar || 9999999;
          const maks_vade = product.maks_vade || 180;
          const amount = Math.min(numericAmount, maks_tutar);
          const term = Math.min(numericTerm, maks_vade);
          
          const bsmv_rate = product.bank?.bsmv_rate || 0;
          const kkdf_rate = product.bank?.kkdf_rate || 0;
    
          const details = calculateLoanDetails(amount, term, product.interest_rate, bsmv_rate, kkdf_rate);

          const updatedLoan = { 
            ...product, 
            amount: amount,
            term: term,
            ...details,
            isCalculating: false, 
            calculationTime: Date.now() + index 
          };
          resolve(updatedLoan);
        }, delay);
      });
    });

    promises.forEach(promise => {
      promise.then(calculatedLoan => {
        setDisplayLoans(prevLoans => {
          const updatedLoans = prevLoans.map(loan => 
            loan.id === calculatedLoan.id ? calculatedLoan : loan
          );
          return updatedLoans.sort((a, b) => (a.calculationTime || 0) - (b.calculationTime || 0));
        });
      });
    });

    Promise.all(promises).then(() => {
      setIsCalculating(false);
    });
  };

  const handleCardChange = (id: number, field: 'amount' | 'term', value: string) => {
    const newDisplayLoans = displayLoans.map(loan => {
      if (loan.id === id) {
        let newAmount = field === 'amount' ? parseFloat(value) : loan.amount;
        let newTerm = field === 'term' ? parseInt(value, 10) : loan.term;

        if (isNaN(newAmount) || isNaN(newTerm) || newAmount <= 0) {
            const tempUpdatedLoan = { ...loan, [field]: value };
            if(field === 'amount') tempUpdatedLoan.amount = 0;
            if(field === 'term') tempUpdatedLoan.term = 0;
            return tempUpdatedLoan;
        }

        const maks_tutar = loan.maks_tutar || 9999999;
        const maks_vade = loan.maks_vade || 180;

        if (newAmount > maks_tutar) newAmount = maks_tutar;
        if (newTerm > maks_vade) newTerm = maks_vade;
        
        const bsmv_rate = loan.bank?.bsmv_rate || 0;
        const kkdf_rate = loan.bank?.kkdf_rate || 0;

        const details = calculateLoanDetails(newAmount, newTerm, loan.interest_rate, bsmv_rate, kkdf_rate);

        return {
          ...loan,
          amount: newAmount,
          term: newTerm,
          ...details
        };
      }
      return loan;
    });
    setDisplayLoans(newDisplayLoans);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <div className="bg-[#ff3d00] text-white rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold">Konut Kredisi Hesaplama</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı (₺)</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vade (Ay)</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            >
              {termOptions.map((months) => (
                <option key={months} value={months}>
                  {months} Ay
                </option>
              ))}
            </select>
          </div>
          <button 
            onClick={handleCalculate}
            className="bg-[#ff3d00] text-white px-8 py-2 rounded-md hover:bg-[#e63900] transition-colors h-[42px]"
          >
            {isCalculating ? <Loader2 className="animate-spin mx-auto"/> : "Hesapla"}
          </button>
        </div>

        {/* Sıfır Faiz Fırsatları */}
        <SifirFaizFirsatlari loans={interestFreeLoans} isCalculating={isCalculating} />

        {/* Banka Teklifleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {isLoading ? (
              <p>Yükleniyor...</p>
            ) : displayLoans.length > 0 ? (
              displayLoans.map(loan => (
                <div 
                  key={loan.id} 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 hover:scale-[1.02] cursor-pointer"
                  style={{ borderColor: loan.bank?.color || '#808080' }}
                >
                  <div className="flex justify-center items-center mb-4 h-12">
                    <img src={loan.bank?.logo} alt={loan.bank?.name || 'Banka Logosu'} className="h-full max-w-full object-contain" />
                  </div>
                  <div
                    className="text-center text-white py-2 px-3 rounded-lg text-sm font-semibold mb-4"
                    style={{ backgroundColor: loan.bank?.color || '#808080' }}
                  >
                    {loan.loan_name}
                  </div>
                  {loan.isCalculating ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[240px]">
                      <Loader2 className="animate-spin h-8 w-8 text-gray-500"/>
                      <p className="mt-2 text-sm text-gray-500">Hesaplanıyor...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı</label>
                        <input 
                          type="text" 
                          value={loan.amount}
                          onChange={(e) => handleCardChange(loan.id, 'amount', e.target.value)}
                          className="w-full p-3 pr-12 border border-gray-300 rounded-lg"
                        />
                        <span className="absolute right-3 top-[38px] text-gray-500">₺</span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vade</label>
                        <select
                          value={loan.term}
                          onChange={(e) => handleCardChange(loan.id, 'term', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          {Array.from({ length: loan.maks_vade || 180 }, (_, i) => i + 1).map(opt => (
                             <option key={opt} value={opt}>{opt} Ay</option>
                          ))}
                        </select>
                      </div>
                      <div className="bg-gray-50 py-0.5 px-2 rounded-lg space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-[10px]">Faiz</span>
                          <span className="font-medium text-[10px]">% {loan.interest_rate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-[10px]">Taksit</span>
                          <span className="font-medium text-[10px]">{formatCurrency(loan.monthly_payment)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-[10px]">Toplam</span>
                          <span className="font-medium text-[10px]">{formatCurrency(loan.total_payment)}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleOpenDetailModal(loan)}
                        className="w-full text-white py-3 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        style={{ backgroundColor: loan.bank?.color || '#808080' }}
                      >
                        Detay
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Gösterilecek kredi ürünü bulunamadı.</p>
            )}
        </div>
      </div>

      <LoanDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        loan={selectedLoanForDetail}
      />
    </div>
  );
}