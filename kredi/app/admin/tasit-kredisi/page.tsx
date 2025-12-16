'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase'; // Keep for reading banks

interface Bank {
  id: number;
  name: string;
}

interface VehicleLoan {
  id: number;
  bank_id: number;
  loan_type: '0' | '2. el';
  amount: number;
  term: number;
  interest_rate: number;
  allocation_fee: number;
  kkdf: number;
  bsmv: number;
  real_interest_rate: number;
  annual_cost_rate: number;
  description?: string;
  created_at?: string;
  application_url?: string;
  bank?: Bank;
}

export default function AdminVehicleLoans() {
  const [loans, setLoans] = useState<VehicleLoan[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<VehicleLoan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<VehicleLoan>>({});

  useEffect(() => {
    fetchLoans();
    fetchBanks();
  }, []);

  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/vehicle-loans');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch vehicle loans');
      }
      const data = await response.json();
      setLoans(data || []);
    } catch (error: any) {
      console.error('Error fetching loans:', error);
      alert(`Taşıt kredileri yüklenirken bir hata oluştu: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBanks = async () => {
    try {
      const { data, error } = await supabase.from('banks').select('id, name').order('name');
      if (error) throw error;
      setBanks(data || []);
    } catch (error: any) {
      console.error('Error fetching banks:', error);
      alert(`Bankalar yüklenirken bir hata oluştu: ${error.message}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loanData = {
        ...formData,
        bank_id: Number(formData.bank_id),
        amount: Number(formData.amount),
        term: Number(formData.term),
        interest_rate: Number(formData.interest_rate),
      };

      const isEditing = !!editingLoan;
      const url = '/api/admin/vehicle-loans';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEditing ? { ...loanData, id: editingLoan.id } : loanData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} loan`);
      }
      
      fetchLoans();
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving loan:', error);
      alert(`Kredi kaydedilirken bir hata oluştu: ${error.message}`);
    }
  };

  const handleEdit = (loan: VehicleLoan) => {
    setEditingLoan(loan);
    setFormData(loan);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu krediyi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch('/api/admin/vehicle-loans', {
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
        alert(`Kredi silinirken bir hata oluştu: ${error.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLoan(null);
    setFormData({
      bank_id: 0,
      loan_type: '0',
      amount: 0,
      term: 0,
      interest_rate: 0,
      allocation_fee: 0,
      kkdf: 0,
      bsmv: 0,
      real_interest_rate: 0,
      annual_cost_rate: 0,
      description: ''
    });
  };

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    return value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
  };

  const formatPercentage = (value: number) => {
    return `%${value.toFixed(2)}`;
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
          <h1 className="text-2xl font-bold">Taşıt Kredileri Yönetimi</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Yeni Kredi Ekle
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banka</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Araç Durumu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maks. Tutar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maks. Vade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faiz Oranı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.bank?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.loan_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(loan.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.term} Ay</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPercentage(loan.interest_rate)}</td>
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
            <h2 className="text-xl font-semibold mb-4 text-gray-900">{editingLoan ? 'Kredi Düzenle' : 'Yeni Kredi Ekle'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Banka</label>
                  <select name="bank_id" value={formData.bank_id || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                    <option value="">Banka Seçin</option>
                    {banks.map((bank) => (<option key={bank.id} value={bank.id}>{bank.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Araç Durumu</label>
                  <select name="loan_type" value={formData.loan_type || '0'} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                    <option value="0">0</option>
                    <option value="2. el">2. el</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tutar (₺)</label>
                  <input type="number" name="amount" value={formData.amount || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vade (Ay)</label>
                  <input type="number" name="term" value={formData.term || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Aylık Faiz Oranı (%)</label>
                  <input type="number" step="0.01" name="interest_rate" value={formData.interest_rate || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Başvuru Linki</label>
                    <input
                        type="url"
                        name="application_url"
                        value={formData.application_url || ''}
                        onChange={handleInputChange}
                        placeholder="https://banka.com/basvuru/tasit-kredisi-123"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Açıklama</label>
                  <textarea name="description" value={formData.description || ''} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
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