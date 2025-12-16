'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

// Define interfaces for our data structures
interface Bank {
  id: number;
  name: string;
}

interface Deposit {
  id: number;
  created_at?: string;
  bank_id: number;
  term_type: 'daily' | 'standard';
  interest_rate_try: number;
  interest_rate_usd: number;
  interest_rate_eur: number;
  banks?: Bank; // For joined data
}

const initialFormData: Omit<Deposit, 'id' | 'created_at' | 'banks'> = {
  bank_id: 0,
  term_type: 'standard',
  interest_rate_try: 0,
  interest_rate_usd: 0,
  interest_rate_eur: 0,
};

export default function AdminMevduatPage() {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeposit, setEditingDeposit] = useState<Deposit | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data (deposits and banks)
  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Fetch deposits with bank info
      const { data: depositsData, error: depositsError } = await supabase
        .from('deposits')
        .select('*, banks(id, name)')
        .order('created_at', { ascending: false });

      if (depositsError) throw depositsError;
      setDeposits(depositsData || []);

      // Fetch all banks for the dropdown
      const { data: banksData, error: banksError } = await supabase
        .from('banks')
        .select('id, name')
        .order('name');
      
      if (banksError) throw banksError;
      setBanks(banksData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Veriler yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: ['interest_rate_try', 'interest_rate_usd', 'interest_rate_eur', 'bank_id'].includes(name) ? Number(value) : value 
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.bank_id === 0) {
      alert('Lütfen bir banka seçin.');
      return;
    }

    try {
      let response;
      if (editingDeposit) {
        // Update existing deposit
        response = await fetch(`/api/admin/deposits/${editingDeposit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Add new deposit
        response = await fetch('/api/admin/deposits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'İşlem başarısız oldu.');
      }

      // Refresh deposits list and close modal
      fetchData();
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving deposit:', error);
      alert(`Mevduat kaydedilirken bir hata oluştu: ${error.message}`);
    }
  };

  const handleEdit = (deposit: Deposit) => {
    setEditingDeposit(deposit);
    setFormData({
        bank_id: deposit.bank_id,
        term_type: deposit.term_type,
        interest_rate_try: deposit.interest_rate_try,
        interest_rate_usd: deposit.interest_rate_usd,
        interest_rate_eur: deposit.interest_rate_eur
    });
    setIsModalOpen(true);
  };
  
  const handleDelete = async (id: number) => {
    if (confirm('Bu mevduat oranını silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/deposits/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Silme işlemi başarısız oldu.');
        }

        // Refresh deposits list
        fetchData();
      } catch (error: any) {
        console.error('Error deleting deposit:', error);
        alert(`Mevduat silinirken bir hata oluştu: ${error.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDeposit(null);
    setFormData(initialFormData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-semibold text-gray-900">Mevduat Yönetimi</h1>
          <button
            onClick={() => {
              setEditingDeposit(null);
              setFormData(initialFormData);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Yeni Mevduat Ekle
          </button>
        </div>

        {/* Deposits List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banka</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vade Tipi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TL Oran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USD Oran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EUR Oran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deposits.map((deposit) => (
                  <tr key={deposit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deposit.banks?.name || 'Banka Bulunamadı'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deposit.term_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deposit.interest_rate_try}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deposit.interest_rate_usd}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deposit.interest_rate_eur}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button onClick={() => handleEdit(deposit)} className="text-blue-600 hover:text-blue-900"><Pencil size={20} /></button>
                        <button onClick={() => handleDelete(deposit.id)} className="text-red-600 hover:text-red-900"><Trash2 size={20} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {editingDeposit ? 'Mevduat Düzenle' : 'Yeni Mevduat Ekle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Banka</label>
                <select name="bank_id" value={formData.bank_id} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value={0} disabled>Banka Seçin</option>
                  {banks.map(bank => (
                    <option key={bank.id} value={bank.id}>{bank.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vade Tipi</label>
                <select name="term_type" value={formData.term_type} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="standard">Standart</option>
                  <option value="daily">Günlük</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">TL Faiz Oranı (%)</label>
                <input type="number" name="interest_rate_try" value={formData.interest_rate_try} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" step="0.01" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">USD Faiz Oranı (%)</label>
                <input type="number" name="interest_rate_usd" value={formData.interest_rate_usd} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" step="0.01" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">EUR Faiz Oranı (%)</label>
                <input type="number" name="interest_rate_eur" value={formData.interest_rate_eur} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" step="0.01" />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 border border-gray-300 rounded-md">İptal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">{editingDeposit ? 'Güncelle' : 'Ekle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}