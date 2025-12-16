// kredi/app/admin/kredi-kartlari/extrali/page.tsx
"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import ImageManager from '@/app/components/admin/ImageManager';

interface Bank {
    id: number;
    name: string;
    color: string;
}

interface CardFeature {
    id: string;
    feature: string;
    is_primary?: boolean;
}

interface CreditCard {
  id: string;
  name: string;
  bank_id: number;
  bank_name: string;
  bank_color: string;
  image_url: string | null;
  annual_fee: number | null;
  interest_rate: number | null;
  extra_advantage: string | null;
  apply_url: string | null;
  card_type: string;
  is_active: boolean;
  created_at: string;
  features: CardFeature[];
}

const FeatureManager = ({ features, setFeatures }: { features: CardFeature[], setFeatures: React.Dispatch<React.SetStateAction<CardFeature[]>> }) => {
    const [allFeatures, setAllFeatures] = useState<CardFeature[]>([]);
    const [newFeature, setNewFeature] = useState('');

    useEffect(() => {
        const fetchFeatures = async () => {
            const response = await fetch('/api/admin/card-features');
            const data = await response.json();
            setAllFeatures(data);
        };
        fetchFeatures();
    }, []);

    const handleAddFeature = async () => {
        if (!newFeature) return;
        
        let featureToAdd = allFeatures.find(f => f.feature.toLowerCase() === newFeature.toLowerCase());

        if(!featureToAdd) {
            const response = await fetch('/api/admin/card-features', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feature: newFeature }),
            });
            featureToAdd = await response.json();
            if (featureToAdd) {
                setAllFeatures([...allFeatures, featureToAdd]);
            }
        }

        if (featureToAdd && !features.some(f => f.id === featureToAdd.id)) {
            setFeatures([...features, { ...featureToAdd, is_primary: false }]);
        }
        setNewFeature('');
    };
    
    const handleRemoveFeature = (featureId: string) => {
        setFeatures(features.filter(f => f.id !== featureId));
    };

    const handleTogglePrimary = (featureId: string) => {
        const primaryCount = features.filter(f => f.is_primary).length;
        const feature = features.find(f => f.id === featureId);

        if (!feature) return;

        if (!feature.is_primary && primaryCount >= 3) {
            alert('En fazla 3 ana özellik seçebilirsiniz.');
            return;
        }

        setFeatures(features.map(f =>
            f.id === featureId ? { ...f, is_primary: !f.is_primary } : f
        ));
    };

    return (
        <div className="space-y-2 p-3 border rounded-md bg-gray-100">
            <h3 className="text-sm font-medium text-gray-800">Kart Özellikleri (Ana sayfada 3 tanesi gösterilir)</h3>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Yeni özellik ekle"
                    className="flex-grow px-2 py-1 border rounded-md"
                />
                <button type="button" onClick={handleAddFeature} className="px-3 py-1 bg-green-500 text-white rounded-md text-sm">Ekle</button>
            </div>
            <ul className="space-y-1">
                {features.map(f => (
                    <li key={f.id} className="flex justify-between items-center bg-white p-1 rounded-md">
                        <span className="text-sm">{f.feature}</span>
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={f.is_primary}
                                    onChange={() => handleTogglePrimary(f.id)}
                                    className="mr-1"
                                />
                                Ana Özellik
                            </label>
                            <button type="button" onClick={() => handleRemoveFeature(f.id)} className="text-red-500 text-xs">Kaldır</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const ManageExtraCreditCardsPage = () => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [bankId, setBankId] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [annualFee, setAnnualFee] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [extraAdvantage, setExtraAdvantage] = useState('');
  const [applyUrl, setApplyUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [features, setFeatures] = useState<CardFeature[]>([]);

  // Editing state
  const [editingCard, setEditingCard] = useState<CreditCard | null>(null);
  const [showImageModal, setShowImageModal] = useState<string | null>(null);


    const fetchBanks = async () => {
        const { data, error } = await supabase.from('banks').select('id, name, color');
        if (error) {
            console.error('Error fetching banks:', error);
            return;
        }
        setBanks(data);
    }


  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/credit-cards');
      if (!response.ok) throw new Error('Kredi kartları yüklenemedi.');
      const data = await response.json();
      setCards(data.filter((card: CreditCard) => card.card_type === 'extra_card'));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
    fetchCards();
  }, []);

  const resetForm = () => {
    setName('');
    setBankId(null);
    setImageUrl('');
    setAnnualFee('');
    setInterestRate('');
    setExtraAdvantage('');
    setApplyUrl('');
    setIsActive(true);
    setFeatures([]);
    setEditingCard(null);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      name,
      bank_id: bankId,
      image_url: imageUrl,
      annual_fee: annualFee ? parseInt(annualFee) : null,
      interest_rate: interestRate ? parseFloat(interestRate) : null,
      extra_advantage: extraAdvantage,
      apply_url: applyUrl,
      card_type: 'extra_card',
      is_active: isActive,
      features: features.map(f => ({ id: f.id, is_primary: f.is_primary || false })),
    };

    const url = editingCard ? `/api/admin/credit-cards/${editingCard.id}` : '/api/admin/credit-cards';
    const method = editingCard ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      resetForm();
      fetchCards();
    } else {
      const result = await response.json();
      setError(result.error || (editingCard ? 'Kredi kartı güncellenemedi.' : 'Kredi kartı oluşturulamadı.'));
    }
  };

  const handleEdit = (card: CreditCard) => {
    setEditingCard(card);
    setName(card.name);
    setBankId(card.bank_id);
    setImageUrl(card.image_url || '');
    setAnnualFee(card.annual_fee?.toString() || '');
    setInterestRate(card.interest_rate?.toString() || '');
    setExtraAdvantage(card.extra_advantage || '');
    setApplyUrl(card.apply_url || '');
    setIsActive(card.is_active);
    setFeatures(card.features || []);
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu kredi kartını silmek istediğinizden emin misiniz?')) {
        const response = await fetch(`/api/admin/credit-cards/${id}`, {
            method: 'DELETE',
        });

        if(response.ok) {
            fetchCards();
        } else {
            const result = await response.json();
            setError(result.error || 'Kredi kartı silinemedi.');
        }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{editingCard ? 'Extralı Kredi Kartını Düzenle' : 'Extralı Kredi Kartı Ekle ve Listele'}</h1>
      
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={() => setShowImageModal(null)}>
            <img src={showImageModal} alt="Kart Görseli" className="max-w-lg max-h-lg"/>
        </div>
      )}

      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-3">{editingCard ? `"${editingCard.name}" düzenleniyor` : 'Yeni Kart Ekle'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-4">
                <input type="text" placeholder="Kart Adı" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
                <select value={bankId || ''} onChange={(e) => setBankId(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" required>
                    <option value="" disabled>Banka Seçin</option>
                    {banks.map(bank => (
                        <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                </select>
                <ImageManager value={imageUrl} onImageSelect={setImageUrl} bucket="card-images" />
                <input type="number" placeholder="Yıllık Ücret" value={annualFee} onChange={(e) => setAnnualFee(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                <input type="number" step="0.01" placeholder="Faiz Oranı" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                <input type="text" placeholder="Ekstra Avantaj" value={extraAdvantage} onChange={(e) => setExtraAdvantage(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                <input type="text" placeholder="Başvuru URL" value={applyUrl} onChange={(e) => setApplyUrl(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                 <div className="flex items-center">
                    <input id="isActive" type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 text-orange-600 rounded"/>
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Aktif mi?</label>
                </div>
            </div>
            <div className="space-y-4">
                <FeatureManager features={features} setFeatures={setFeatures} />
            </div>

            <div className='col-span-1 md:col-span-2 flex gap-4 items-center'>
                <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                {editingCard ? 'Değişiklikleri Kaydet' : 'Kartı Kaydet'}
                </button>
                {editingCard && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 text-black rounded-md">İptal</button>}
            </div>
          {error && <p className="col-span-1 md:col-span-2 text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Mevcut Extralı Kredi Kartları</h2>
        {isLoading ? <p>Yükleniyor...</p> : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Görsel</th>
                  <th className="py-2 px-4 border-b text-left">Kart Adı</th>
                  <th className="py-2 px-4 border-b text-left">Banka Adı</th>
                  <th className="py-2 px-4 border-b text-left">Özellik Sayısı</th>
                  <th className="py-2 px-4 border-b text-left">Durum</th>
                  <th className="py-2 px-4 border-b text-left">Eylemler</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card) => (
                  <tr key={card.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                        <img 
                            src={card.image_url || ''} 
                            alt={card.name} 
                            className="h-10 w-16 object-contain cursor-pointer"
                            onClick={() => setShowImageModal(card.image_url)}
                        />
                    </td>
                    <td className="py-2 px-4 border-b">{card.name}</td>
                    <td className="py-2 px-4 border-b">
                        <span className="font-semibold" style={{color: card.bank_color}}>{card.bank_name}</span>
                    </td>
                    <td className="py-2 px-4 border-b">{card.features?.length || 0}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ card.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
                        {card.is_active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b flex gap-2">
                        <button onClick={() => handleEdit(card)} className="text-blue-600 hover:text-blue-800">Düzenle</button>
                        <button onClick={() => handleDelete(card.id)} className="text-red-600 hover:text-red-800">Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageExtraCreditCardsPage;