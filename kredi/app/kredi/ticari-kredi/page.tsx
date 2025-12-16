"use client";

import { ShoppingBag, CheckCircle, DollarSign, Clock, Calendar, ArrowRight, Briefcase, BarChart, PieChart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
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

interface CommercialLoan {
  id: number;
  bank_id: number;
  loan_name: string;
  maks_tutar: number;
  maks_vade: number;
  interest_rate: number;
  description?: string;
  bank: Bank; // Corrected: Made bank required
  created_at?: string;
  application_url?: string;
  allocation_fee?: number;
  kkdf?: number;
  bsmv?: number;
  real_interest_rate?: number;
  annual_cost_rate?: number;
}

interface DisplayLoan extends CommercialLoan {
  amount: number;
  term: number;
  monthly_payment: number;
  total_payment: number;
  total_interest?: number;
  total_taxes?: number;
  isCalculating?: boolean;
  calculationTime?: number;
}


export default function TicariKrediPage() {
  const [amount, setAmount] = useState('250000');
  const [term, setTerm] = useState('36');
  
  const [loanProducts, setLoanProducts] = useState<CommercialLoan[]>([]);
  const [displayLoans, setDisplayLoans] = useState<DisplayLoan[]>([]);
  const [interestFreeLoans, setInterestFreeLoans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLoanForDetail, setSelectedLoanForDetail] = useState<DisplayLoan | null>(null);

  const termOptions = [12, 24, 36, 48, 60, 120];

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

  const updateDisplayLoans = (baseAmount: number, baseTerm: number, products: CommercialLoan[]) => {
    const updatedLoans = products.map(product => {
      const displayAmount = Math.min(baseAmount, product.maks_tutar);
      const displayTerm = Math.min(baseTerm, product.maks_vade); 

      const bsmv_rate = product.bank?.bsmv_rate || 0.15;
      const kkdf_rate = product.bank?.kkdf_rate || 0.15;

      const details = calculateLoanDetails(displayAmount, displayTerm, product.interest_rate, bsmv_rate, kkdf_rate);

      return {
        ...product,
        amount: displayAmount,
        term: displayTerm,
        ...details,
      };
    });
    setDisplayLoans(updatedLoans as DisplayLoan[]);
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
      setIsLoading(true);
      try {
        const commercialLoansPromise = supabase
          .from('commercial_loans')
          .select(`*, bank:banks (id, name, logo, color, bsmv_rate, kkdf_rate)`);

        const interestFreePromise = fetch('/api/zero-interest-loans', { cache: 'no-store' });

        const [commercialLoansResponse, interestFreeResponse] = await Promise.all([
          commercialLoansPromise,
          interestFreePromise
        ]);

        if (commercialLoansResponse.error) throw commercialLoansResponse.error;
        if (commercialLoansResponse.data) {
          const shuffledData = shuffle(commercialLoansResponse.data.filter(d => d.bank)); // Ensure bank is not null
          setLoanProducts(shuffledData as CommercialLoan[]);
          updateDisplayLoans(parseFloat(amount), parseInt(term, 10), shuffledData as CommercialLoan[]);
        }

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
          const displayAmount = Math.min(numericAmount, product.maks_tutar);
          const displayTerm = Math.min(numericTerm, product.maks_vade);
          const bsmv_rate = product.bank?.bsmv_rate || 0.15;
          const kkdf_rate = product.bank?.kkdf_rate || 0.15;
          const details = calculateLoanDetails(displayAmount, displayTerm, product.interest_rate, bsmv_rate, kkdf_rate);
          
          const updatedLoan = { 
            ...product,
            amount: displayAmount,
            term: displayTerm,
            ...details,
            isCalculating: false, 
            calculationTime: Date.now() + index 
          };
          resolve(updatedLoan as DisplayLoan);
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
        let newAmount = field === 'amount' ? parseFloat(value.replace(/[^0-9]/g, '')) : loan.amount;
        let newTerm = field === 'term' ? parseInt(value, 10) : loan.term;

        if (isNaN(newAmount) || isNaN(newTerm) || newAmount <= 0) {
            return { ...loan, [field === 'amount' ? 'amount' : 'term']: value };
        }

        const displayAmount = Math.min(newAmount, loan.maks_tutar);
        const displayTerm = Math.min(newTerm, loan.maks_vade);

        const bsmv_rate = loan.bank?.bsmv_rate || 0.15;
        const kkdf_rate = loan.bank?.kkdf_rate || 0.15;
        const details = calculateLoanDetails(displayAmount, displayTerm, loan.interest_rate, bsmv_rate, kkdf_rate);

        return {
          ...loan,
          amount: displayAmount,
          term: displayTerm,
          ...details
        };
      }
      return loan;
    });
    setDisplayLoans(newDisplayLoans);
  };
  
  return (
    <main className="flex-grow mt-5">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="bg-[#ff3d00] text-white rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold">Ticari Kredi Hesaplama</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı (₺)</label>
              <input 
                className="w-full p-2 border border-gray-300 rounded-md" 
                type="text" 
                value={new Intl.NumberFormat('tr-TR').format(Number(amount))}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vade (Ay)</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              >
                {termOptions.map(opt => <option key={opt} value={opt}>{opt} Ay</option>)}
              </select>
            </div>
            <button 
              onClick={handleCalculate}
              className="bg-[#ff3d00] text-white px-8 py-2 rounded-md hover:bg-[#e63900] transition-colors h-[42px]">
              {isCalculating ? <Loader2 className="animate-spin mx-auto"/> : "Hesapla"}
            {isCalculating ? <Loader2 className="animate-spin mx-auto"/> : "Hesapla"}
            </button>
          </div>
        </div>

        {/* Sıfır Faiz Fırsatları */}
        <SifirFaizFirsatlari loans={interestFreeLoans} isCalculating={isCalculating} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {isLoading ? (
              <p className="col-span-full text-center">Teklifler Yükleniyor...</p>
            ) : displayLoans.length > 0 ? (
              displayLoans.map(loan => (
                <div 
                  key={loan.id} 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 hover:scale-[1.02] cursor-pointer"
                  style={{ borderColor: loan.bank?.color || '#808080' }}
                >
                  <div className="flex justify-center items-center mb-4 h-12">
                    {loan.bank?.logo && <img src={loan.bank.logo} alt={loan.bank.name || 'Banka Logosu'} className="h-full max-w-full object-contain" />}
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
                          value={new Intl.NumberFormat('tr-TR').format(loan.amount)}
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
                          {Array.from({ length: loan.maks_vade || 36 }, (_, i) => i + 1).map(opt => (
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
              <p className="col-span-full text-center">Gösterilecek kredi ürünü bulunamadı.</p>
            )}
        </div>

        <LoanDetailModal 
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            loan={selectedLoanForDetail}
        />

        {/* Static Content Sections */}
        <div className="relative rounded-xl overflow-hidden my-10">
            <Image src="https://picsum.photos/id/0/1200/400" alt="Ticari Kredi" width={1200} height={400} className="w-full h-64 object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-center">
                <div className="px-8 py-6 text-white max-w-lg">
                    <h2 className="text-3xl font-bold mb-2">İşinizi Büyütün</h2>
                    <p className="mb-4">Büyük ve küçük ölçekli işletmeler için özel hazırlanmış finansman çözümleri.</p>
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">Hemen Başvur</button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4"><Briefcase className="h-6 w-6"/></div>
                <h3 className="text-xl font-semibold mb-2">Sektöre Özel</h3>
                <p className="text-gray-600">Sektörünüzün özelliklerine uygun kredi çözümleri.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4"><BarChart className="h-6 w-6"/></div>
                <h3 className="text-xl font-semibold mb-2">Esnek Ödeme</h3>
                <p className="text-gray-600">İşletmenizin nakit akışına uygun ödeme planları.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4"><PieChart className="h-6 w-6"/></div>
                <h3 className="text-xl font-semibold mb-2">Finansal Analiz</h3>
                <p className="text-gray-600">İşletmenize özel finansal analiz ve danışmanlık.</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-xl font-semibold mb-4">Ticari Kredi Detayları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-medium mb-3">Kredi Özellikleri</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >100.000 TL'den 50.000.000 TL'ye kadar kredi imkanı</span></li>
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >3 aydan 120 aya kadar vade seçenekleri</span></li>
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >Sabit veya değişken faiz seçenekleri</span></li>
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >İşletme sermayesi ve yatırım amaçlı krediler</span></li>
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >Proje bazlı özel finansman yapılandırması</span></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-medium mb-3">Gerekli Belgeler</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >Son 3 yıla ait finansal tablolar</span></li>
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >Vergi levhası ve sicil gazetesi</span></li>
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >İmza sirküleri ve ortaklık yapısı</span></li>
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >Proje veya yatırım planı (gerekli hallerde)</span></li>
                        <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5"/><span >Teminat belgeleri</span></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sık Sorulan Sorular</h2>
            <div className="space-y-4">
                <details className="border-b pb-2"><summary className="font-medium cursor-pointer">Ticari kredi başvurusu için firmanın kaç yıllık olması gerekir?</summary><p className="mt-2 text-gray-600">Genellikle en az 2 yıllık işletmeler için ticari kredi başvurusu değerlendirmeye alınmaktadır. Ancak belirli sektörler ve projeler için farklı kriterler uygulanabilir.</p></details>
                <details className="border-b pb-2"><summary className="font-medium cursor-pointer">Ticari krediler için ne tür teminatlar kabul edilmektedir?</summary><p className="mt-2 text-gray-600">Gayrimenkul ipoteği, araç rehni, mevduat rehni, ticari alacak temliği, çek/senet, şirket ortaklarının kefaleti gibi çeşitli teminat türleri kredi tutarına ve yapısına göre kabul edilmektedir.</p></details>
                <details className="border-b pb-2"><summary className="font-medium cursor-pointer">Yatırım kredileri için hangi değerlendirme kriterleri uygulanır?</summary><p className="mt-2 text-gray-600">Yatırım kredilerinde işletmenin finansal performansı, projenin fizibilitesi, sektörel dinamikler, yatırımın geri dönüş süresi ve firmanın yönetim kalitesi gibi kriterler değerlendirilir.</p></details>
                <details className="border-b pb-2"><summary className="font-medium cursor-pointer">KOBİ tanımına giren işletmeler için özel avantajlar var mı?</summary><p className="mt-2 text-gray-600">Evet, KOBİ'ler için KOSGEB destekli, düşük faizli ve uzun vadeli kredi seçenekleri bulunmaktadır. Ayrıca çeşitli sektörel teşvik programları kapsamında KOBİ'lere özel finansman paketleri sunulmaktadır.</p></details>
            </div>
            <div className="mt-4 text-center"><a className="text-blue-600 font-medium flex items-center justify-center" href="/kredi/sik-sorulan-sorular">Tüm Soruları Görüntüle <ArrowRight className="ml-1 h-4 w-4"/></a></div>
        </div>
      </div>
    </main>
  );
}