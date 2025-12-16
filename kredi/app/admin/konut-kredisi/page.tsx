'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase'; // Keep for reading banks

interface Bank {
  id: number;
  name: string;
}

interface HousingLoan {
  id: number;
  bank_id: number;
  interest_rate: number;
  maks_tutar: number;
  maks_vade: number;
  application_url?: string;
  banks: Bank;
}

export default function HousingLoansPage() {
  const [loans, setLoans] = useState<HousingLoan[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<HousingLoan | null>(null);
  const [formData, setFormData] = useState<Partial<HousingLoan>>({});

  useEffect(() => {
    fetchLoans();
    fetchBanks();
  }, []);

  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/housing-loans');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch housing loans');
      }
      const data = await response.json();
      setLoans(data || []);
    } catch (error: any) {
      console.error('Error fetching loans:', error);
      alert(`Konut kredileri yüklenirken bir hata oluştu: ${error.message}`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loanData = {
        ...formData,
        bank_id: Number(formData.bank_id),
        interest_rate: Number(formData.interest_rate),
        maks_tutar: Number(formData.maks_tutar),
        maks_vade: Number(formData.maks_vade),
      };

      const isEditing = !!editingLoan;
      const url = '/api/admin/housing-loans';
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

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu krediyi silmek istediğinizden emin misiniz?')) {
        try {
            const response = await fetch('/api/admin/housing-loans', {
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

  const handleEdit = (loan: HousingLoan) => {
    setEditingLoan(loan);
    setFormData(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLoan(null);
    setFormData({});
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `%${value.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Konut Kredileri</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Kredi Ekle
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">{editingLoan ? 'Kredi Düzenle' : 'Yeni Kredi Ekle'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banka</label>
                <select name="bank_id" value={formData.bank_id || ''} onChange={handleInputChange} className="w-full p-2 border rounded-md" required>
                  <option value="">Banka Seçin</option>
                  {banks.map((bank) => (<option key={bank.id} value={bank.id}>{bank.name}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aylık Faiz Oranı (%)</label>
                <input type="number" name="interest_rate" value={formData.interest_rate || ''} onChange={handleInputChange} className="w-full p-2 border rounded-md" step="0.01" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maksimum Tutar (₺)</label>
                <input type="number" name="maks_tutar" value={formData.maks_tutar || ''} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maksimum Vade (Ay)</label>
                <input type="number" name="maks_vade" value={formData.maks_vade || ''} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başvuru Linki</label>
                <input
                    type="url"
                    name="application_url"
                    value={formData.application_url || ''}
                    onChange={handleInputChange}
                    placeholder="https://banka.com/basvuru/konut-kredisi-123"
                    className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">İptal</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editingLoan ? 'Güncelle' : 'Ekle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banka</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faiz Oranı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maks. Tutar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maks. Vade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className="px-6 py-4 whitespace-nowrap">{loan.banks.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatPercentage(loan.interest_rate)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(loan.maks_tutar)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.maks_vade} Ay</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => handleEdit(loan)} className="text-indigo-600 hover:text-indigo-900"><Pencil className="h-5 w-5" /></button>
                  <button onClick={() => handleDelete(loan.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-5 w-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}