
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import QRCode from 'qrcode.react';

interface ZeroInterestLoan {
  id: number;
  bank_name: string;
  bank_logo: string;
  offer_description: string;
  offer_link: string;
  bank_color: string;
  criteria: string;
}

export default function FaizsizKredilerPage() {
  const [loans, setLoans] = useState<ZeroInterestLoan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<ZeroInterestLoan | null>(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('zero_interest_loans')
        .select('*')
        .order('id', { ascending: false });

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

  const handleOpenModal = (loan: ZeroInterestLoan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Faizsiz Krediler</h1>
          <p className="text-gray-600">Size özel faizsiz kredi ve taksitli nakit avans fırsatları</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan) => (
            <div key={loan.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={loan.bank_logo} alt={loan.bank_name} className="h-10 w-auto" />
                  <h3 className="text-lg font-semibold">{loan.bank_name}</h3>
                </div>
                <p className="text-gray-700 mb-4">{loan.offer_description}</p>
                <button
                  onClick={() => handleOpenModal(loan)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  İncele
                </button>
              </div>
            </div>
          ))}
        </div>
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
}
