
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight } from 'lucide-react';
import QRCode from 'qrcode.react';

interface ZeroInterestLoan {
  id: number;
  bank: { // Corrected from 'banks'
    id: number;
    name: string;
    logo: string;
    color: string;
  };
  offer_description: string;
  offer_link: string;
  criteria: string;
  isCalculating?: boolean;
}

const SifirFaizFirsatlari = ({ loans: propLoans, isCalculating: propIsCalculating }: { loans?: ZeroInterestLoan[], isCalculating?: boolean }) => {
  const [loans, setLoans] = useState<ZeroInterestLoan[]>(propLoans || []);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<ZeroInterestLoan | null>(null);

  useEffect(() => {
    const shuffle = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    if (propLoans && propLoans.length > 0) {
      setLoans(shuffle(propLoans));
      setIsLoading(false);
      return;
    }

    const fetchZeroInterestLoans = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/zero-interest-loans');
        if (!response.ok) {
          throw new Error('Failed to fetch zero interest loans');
        }
        const data = await response.json();
        setLoans(shuffle(data));
      } catch (error) {
        console.error('Error fetching zero interest loans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchZeroInterestLoans();
  }, [propLoans]);

  useEffect(() => {
    if (propIsCalculating) {
      const shuffle = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const calculatingLoans = loans.map(l => ({ ...l, isCalculating: true }));
      setLoans(shuffle(calculatingLoans));

      const promises = loans.map(() => {
        return new Promise<void>(resolve => {
          const delay = Math.random() * 2000;
          setTimeout(() => {
            resolve();
          }, delay);
        });
      });

      Promise.all(promises).then(() => {
        const finishedLoans = loans.map(l => ({ ...l, isCalculating: false }));
        setLoans(finishedLoans);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propIsCalculating]);

  const handleOpenModal = (loan: ZeroInterestLoan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
  };

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (loans.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <div key={loan.id} className="border rounded-lg p-4 flex flex-col justify-between relative overflow-hidden" style={{ borderColor: loan.bank?.color ?? '#808080' }}>
            <div className="absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white" style={{ backgroundColor: loan.bank?.color ?? '#808080', borderTopLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>Faizsiz</div>
            {loan.isCalculating ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="mt-2 text-sm text-gray-500">Krediniz hesaplanıyor...</p>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-center mb-4 h-10">
                    <img src={loan.bank?.logo ?? ''} alt={`${loan.bank?.name ?? 'Banka'} logo`} className="h-full w-auto mx-auto object-contain" />
                  </div>
                  <p className="text-gray-600 mb-4">{loan.offer_description}</p>
                </div>
                <div onClick={() => handleOpenModal(loan)}>
                  <button 
                    className="w-full text-white py-2 rounded-lg transition-colors font-medium cursor-pointer"
                    style={{ backgroundColor: loan.bank?.color ?? '#808080' }}
                  >
                    Fırsatı İncele <ArrowRight className="inline-block ml-2 h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Kredi Fırsatı</h2>
            <div className="flex justify-center mb-4">
              <QRCode value={selectedLoan.offer_link} size={256} />
            </div>
            <p className="text-gray-600 mb-4">{selectedLoan.offer_description}</p>
            <div className="text-left">
              <h3 className="font-semibold">Kredi/Nakit Avans Kriterleri</h3>
              <p className="text-gray-600">{selectedLoan.criteria}</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-6 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SifirFaizFirsatlari;
