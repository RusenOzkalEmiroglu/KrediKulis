'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface Setting {
  id: number;
  key: string;
  value: string | null;
}

export default function AdminAyarlarPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch all settings
  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('settings')
        .select('*');

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching settings:', error);
      alert('Ayarlar yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (id: number, value: string) => {
    setSettings(currentSettings =>
      currentSettings.map(setting =>
        setting.id === id ? { ...setting, value } : setting
      )
    );
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ayarlar kaydedilemedi.');
      }

      alert('Ayarlar başarıyla güncellendi!');
      fetchSettings(); // Refresh the data
      
    } catch(error: any) {
        console.error('Error saving settings:', error);
        alert(`Ayarlar kaydedilirken bir hata oluştu: ${error.message}`);
    } finally {
        setIsSaving(false);
    }
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-semibold text-gray-900">Genel Ayarlar</h1>
          <p className="text-sm text-gray-500 mt-1">Uygulama genelindeki ayarları buradan yönetin.</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {settings.map((setting) => (
            <div key={setting.id}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {setting.key.replace(/_/g, ' ')}
              </label>
              <input
                type="text"
                value={setting.value || ''}
                onChange={(e) => handleInputChange(setting.id, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
            <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
                {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
        </div>
      </div>
    </div>
  );
}