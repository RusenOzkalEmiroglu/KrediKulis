"use client";

import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calculateMonthlyPayment, formatCurrency } from "../../utils/formatters";

// Define a unified interface for loan products from different pages
interface Bank {
  id: number;
  name: string;
  logo: string;
  color: string;
  bsmv_rate?: number;
  kkdf_rate?: number;
}

interface DisplayLoan {
  id: number;
  bank_id: number;
  loan_name: string;
  interest_rate: number;
  maks_tutar: number;
  maks_vade: number;
  bank: Bank; // Corrected from 'banks' to 'bank'
  amount: number;
  term: number;
  monthly_payment: number;
  total_payment: number;
  application_url?: string;
  bsmv?: number;
  kkdf?: number;
  total_interest?: number;
  total_taxes?: number;
}

interface LoanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: DisplayLoan | null;
}

export default function LoanDetailModal({ isOpen, onClose, loan }: LoanDetailModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Recalculate monthly payment using the centralized function to ensure accuracy
  const monthlyPayment = useMemo(() => {
    if (!loan) return 0;
    return calculateMonthlyPayment(loan.amount, loan.interest_rate, loan.term);
  }, [loan]);

  const amortizationSchedule = useMemo(() => {
    if (!loan) return [];

    let balance = loan.amount;
    // Use the correct monthly rate calculation, directly from the passed rate
    const monthlyRate = loan.interest_rate / 100; 
    const schedule = [];

    for (let i = 1; i <= loan.term; i++) {
      const interestPayment = balance * monthlyRate;
      
      let principalPayment = monthlyPayment - interestPayment;
      
      // On the final payment, the principal should be the remaining balance
      if (i === loan.term) {
        principalPayment = balance;
      }

      // Prevent balance from going negative due to floating point inaccuracies
      if (balance < principalPayment) {
        principalPayment = balance;
      }

      const newBalance = balance - principalPayment;

      schedule.push({
        month: i,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: newBalance > 0 ? newBalance : 0,
      });

      balance = newBalance;
    }
    return schedule;
  }, [loan, monthlyPayment]);

  const { totalInterest, totalTaxes, totalPayment } = useMemo(() => {
    if (!loan) return { totalInterest: 0, totalTaxes: 0, totalPayment: 0 };
    
    const bsmv_rate = loan.bank?.bsmv_rate ?? 0;
    const kkdf_rate = loan.bank?.kkdf_rate ?? 0;
    
    const totalCalculatedInterest = amortizationSchedule.reduce((acc, curr) => acc + curr.interest, 0);
    const calculatedTaxes = totalCalculatedInterest * (bsmv_rate + kkdf_rate);
    const calculatedTotalPayment = loan.amount + totalCalculatedInterest + calculatedTaxes;

    return {
      totalInterest: totalCalculatedInterest,
      totalTaxes: calculatedTaxes,
      totalPayment: calculatedTotalPayment
    };
  }, [loan, amortizationSchedule]);


  const pieChartData = useMemo(() => {
    if (!loan) return [];
    return [
      { name: 'Ana Para', value: loan.amount },
      { name: 'Faiz', value: totalInterest },
      { name: 'Vergiler (BSMV+KKDF)', value: totalTaxes },
    ];
  }, [loan, totalInterest, totalTaxes]);


  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  if (!isOpen || !loan) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full h-full max-w-7xl max-h-[95vh] rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={loan.bank.logo}
              alt={loan.bank.name}
              className="h-10 object-contain"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{loan.loan_name}</h2>
              <p className="text-sm text-gray-500">{loan.bank.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {loan.application_url && (
                <a
                    href={loan.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: loan.bank.color || '#4CAF50' }}
                >
                    Başvur
                </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow p-6 overflow-y-auto">

          {/* Summary */}
          <div className="mb-8 bg-slate-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Ödeme Özeti</h3>
            <div className="flex flex-wrap items-center justify-center md:justify-between">
              {/* Left Side: Text Summary */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-x-8 gap-y-4 text-center md:text-left">
                <div>
                  <p className="text-sm text-gray-500">Kredi Tutarı (Anapara)</p>
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(loan.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Toplam Faiz</p>
                  <p className="text-xl font-bold text-orange-600">{formatCurrency(totalInterest)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Toplam Vergiler (BSMV+KKDF)</p>
                  <p className="text-xl font-bold text-red-600">{formatCurrency(totalTaxes)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Toplam Geri Ödeme</p>
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(totalPayment)}</p>
                </div>
              </div>
              {/* Right Side: Pie Chart */}
              <div className="w-full md:w-1/2 h-64 mt-4 md:mt-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value as number)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side: Chart */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Ödeme Planı Grafiği</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={amortizationSchedule}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Ay', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                  <Tooltip formatter={(value: number) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="principal" stackId="a" name="Ana Para" fill="#8884d8" />
                  <Bar dataKey="interest" stackId="a" name="Faiz" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Right Side: Table */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Ödeme Planı Tablosu</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden flex-grow">
                <div className="h-full overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ay</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ana Para</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faiz</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kalan Bakiye</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {amortizationSchedule.map((row) => (
                        <tr key={row.month}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.month}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(row.principal)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(row.interest)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(row.remainingBalance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add some basic animations to globals.css if they don't exist
/*
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
*/
