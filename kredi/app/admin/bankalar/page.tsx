'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import ImageManager from '@/app/components/admin/ImageManager';

interface Bank {
  id: number;
  name: string;
  website: string;
  address: string;
  phone: string;
  logo: string;
  color: string;
  created_at?: string;
  bsmv_rate?: number;
  kkdf_rate?: number;
}

export default function AdminBankalar() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    address: '',
    phone: '',
    logo: '',
    color: '#FFFFFF',
    bsmv_rate: 0.15,
    kkdf_rate: 0.15
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchBanks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/banks');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch banks');
      }
      const data = await response.json();
      setBanks(data || []);
    } catch (error: any) {
      console.error('Error fetching banks:', error);
      alert(`Bankalar yüklenirken bir hata oluştu: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (url: string) => {
    setFormData(prev => ({ ...prev, logo: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEditing = !!editingBank;
      const url = '/api/admin/banks';
      const method = isEditing ? 'PUT' : 'POST';
      
      const body = isEditing ? { ...formData, id: editingBank.id } : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} bank`);
      }

      // Refresh banks list
      fetchBanks();
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving bank:', error);
      alert(`Banka kaydedilirken bir hata oluştu: ${error.message}`);
    }
  };

  const handleEdit = (bank: Bank) => {
    setEditingBank(bank);
    setFormData({
      ...bank,
      name: bank.name || '',
      website: bank.website || '',
      address: bank.address || '',
      phone: bank.phone || '',
      logo: bank.logo || '',
      color: bank.color || '#FFFFFF',
      bsmv_rate: bank.bsmv_rate ?? 0.15,
      kkdf_rate: bank.kkdf_rate ?? 0.15,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu bankayı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch('/api/admin/banks', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete bank');
        }

        // Refresh banks list
        fetchBanks();
      } catch (error: any) {
        console.error('Error deleting bank:', error);
        alert(`Banka silinirken bir hata oluştu: ${error.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBank(null);
    setFormData({
      name: '',
      website: '',
      address: '',
      phone: '',
      logo: '',
      color: '#FFFFFF',
      bsmv_rate: 0.15,
      kkdf_rate: 0.15
    });
  };
  
  // Keep the rest of the component (JSX) the same
  // ...
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
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-semibold text-gray-900">Banka Yönetimi</h1>
          <button
            onClick={() => {
              setEditingBank(null);
              setFormData({
                name: '',
                website: '',
                address: '',
                phone: '',
                logo: '',
                color: '#FFFFFF',
                bsmv_rate: 0.15,
                kkdf_rate: 0.15
              });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Yeni Banka Ekle
          </button>
        </div>

        {/* Banks List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banka Adı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banks.map((bank) => (
                  <tr key={bank.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={bank.logo} alt={bank.name} className="h-10 w-10 object-contain"/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div style={{ backgroundColor: bank.color }} className="w-10 h-10 rounded-full"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bank.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bank.website}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bank.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(bank)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(bank.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {editingBank ? 'Banka Düzenle' : 'Yeni Banka Ekle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-2"> {/* Scrollable wrapper */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Banka İsmi</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Web Sayfası</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Banka Adresi</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Çağrı Merkezi Numarası</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Logo</label>
                  <ImageManager value={formData.logo} onImageSelect={handleImageSelect} bucket="bank-logos" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Renk Kodu</label>
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">BSMV Oranı (%)</label>
                    <input
                      type="number"
                      step="0.0001"
                      name="bsmv_rate"
                      value={formData.bsmv_rate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">KKDF Oranı (%)</label>
                    <input
                      type="number"
                      step="0.0001"
                      name="kkdf_rate"
                      value={formData.kkdf_rate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div> {/* End of scrollable wrapper */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingBank ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}