"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase'; // Keep for reading banks

interface ZeroInterestLoan {
  id: number;
  bank_name: string;
  bank_logo: string;
  offer_description: string;
  offer_link: string;
  bank_color: string;
  criteria: string;
}

export default function FaizsizKredilerAdmin() {
  const [loans, setLoans] = useState<ZeroInterestLoan[]>([]);
  const [banks, setBanks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<ZeroInterestLoan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<ZeroInterestLoan>>({});

  useEffect(() => {
    fetchLoans();
    fetchBanks();
  }, []);

  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/zero-interest-loans');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch loans');
      }
      const data = await response.json();
      setLoans(data || []);
    } catch (error: any) {
      console.error('Error fetching loans:', error);
      alert(`Fırsatlar yüklenirken bir hata oluştu: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBanks = async () => {
    try {
      const { data, error } = await supabase.from('banks').select('*');
      if (error) throw error;
      setBanks(data || []);
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bankName = e.target.value;
    const selectedBank = banks.find(bank => bank.name === bankName);
    if (selectedBank) {
      setFormData(prev => ({
        ...prev,
        bank_name: selectedBank.name,
        bank_logo: selectedBank.logo_url, // Assuming 'logo_url' and 'primary_color' from your banks table
        bank_color: selectedBank.primary_color,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEditing = !!editingLoan;
      const url = '/api/admin/zero-interest-loans';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEditing ? { ...formData, id: editingLoan.id } : formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} loan`);
      }

      fetchLoans();
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving loan:', error);
      alert(`Fırsat kaydedilirken bir hata oluştu: ${error.message}`);
    }
  };

  const handleEdit = (loan: ZeroInterestLoan) => {
    setEditingLoan(loan);
    setFormData(loan);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu fırsatı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch('/api/admin/zero-interest-loans', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete loan');
        }

        fetchLoans();
      } catch (error: any) {
        console.error('Error deleting loan:', error);
        alert(`Fırsat silinirken bir hata oluştu: ${error.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLoan(null);
    setFormData({});
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600"/>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold">Faizsiz Kredi Fırsatları Yönetimi</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Yeni Fırsat Ekle
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banka</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Açıklama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.bank_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.offer_description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button onClick={() => handleEdit(loan)} className="text-blue-600 hover:text-blue-900 transition-colors"><Pencil size={20} /></button>
                        <button onClick={() => handleDelete(loan.id)} className="text-red-600 hover:text-red-900 transition-colors"><Trash2 size={20} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">{editingLoan ? 'Fırsatı Düzenle' : 'Yeni Fırsat Ekle'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Banka</label>
                  <select
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={handleBankChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  >
                    <option value="">Banka Seçin</option>
                    {banks.map((bank) => (<option key={bank.id} value={bank.name}>{bank.name}</option>))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Fırsat Açıklaması</label>
                  <input type="text" name="offer_description" value={formData.offer_description || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Fırsat Linki</label>
                  <input type="text" name="offer_link" value={formData.offer_link || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Kriterler</label>
                  <textarea name="criteria" value={formData.criteria || ''} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">İptal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{editingLoan ? 'Güncelle' : 'Kaydet'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}