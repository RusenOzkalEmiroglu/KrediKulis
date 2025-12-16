// kredi/app/admin/reklam-alanlari/gruplar/page.tsx
"use client";

import React, { useState, useEffect, FormEvent } from 'react';

// Type definitions
interface Advertisement {
  id: string;
  name: string;
  image_url?: string;
  type?: string; // Added type property
}

interface AdGroup {
  id:string;
  name: string;
  description: string;
  advertisements: Advertisement[];
}

// Modal for editing a group
const EditGroupModal = ({ group, onClose, onSave }: { group: AdGroup, onClose: () => void, onSave: (id: string, name: string, description: string) => void }) => {
    const [name, setName] = useState(group.name);
    const [description, setDescription] = useState(group.description);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(group.id, name, description);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold mb-4">Grubu Düzenle</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Grup Adı"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full px-3 py-2 border rounded-md"
                        required
                    />
                    <textarea
                        placeholder="Açıklama"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full px-3 py-2 border rounded-md"
                    />
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">İptal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AdGroupsPage = () => {
  const [groups, setGroups] = useState<AdGroup[]>([]);
  const [allAds, setAllAds] = useState<Advertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for creating a new group
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  
  // State for managing ads in a group
  const [adToAdd, setAdToAdd] = useState<string>('');
  
  // State for editing
  const [editingGroup, setEditingGroup] = useState<AdGroup | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [groupsRes, adsRes] = await Promise.all([
        fetch('/api/admin/ad-groups'),
        fetch('/api/admin/advertisements')
      ]);
      if (!groupsRes.ok || !adsRes.ok) {
        throw new Error('Veri yüklenemedi.');
      }
      const groupsData = await groupsRes.json();
      const adsData = await adsRes.json();
      setGroups(groupsData);
      setAllAds(adsData.filter((ad: Advertisement) => ad.type === 'image'));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateGroup = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/admin/ad-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newGroupName, description: newGroupDescription }),
    });

    if (response.ok) {
      setNewGroupName('');
      setNewGroupDescription('');
      fetchData(); // Refresh data
    } else {
      const result = await response.json();
      alert(`Hata: ${result.error}`);
    }
  };

  const handleAddAdToGroup = async (groupId: string) => {
    if (!adToAdd) {
      alert('Lütfen bir reklam seçin.');
      return;
    }
    const response = await fetch(`/api/admin/ad-groups/${groupId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ advertisement_id: adToAdd }),
    });

    if (response.ok) {
      setAdToAdd('');
      fetchData();
    } else {
      const result = await response.json();
      alert(`Hata: ${result.error}`);
    }
  };

  const handleRemoveAdFromGroup = async (groupId: string, adId: string) => {
    const response = await fetch(`/api/admin/ad-groups/${groupId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ advertisement_id: adId }),
    });

    if (response.ok) {
      fetchData();
    } else {
      const result = await response.json();
      alert(`Hata: ${result.error}`);
    }
  };
  
  const handleEditGroup = (group: AdGroup) => {
    setEditingGroup(group);
  };
  
  const handleUpdateGroup = async (id: string, name: string, description: string) => {
    const response = await fetch(`/api/admin/ad-groups/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
    });

    if(response.ok) {
        setEditingGroup(null);
        fetchData();
    } else {
        const result = await response.json();
        alert(`Hata: ${result.error}`);
    }
  }

  const handleDeleteGroup = async (groupId: string) => {
    if (window.confirm('Bu grubu ve içindeki tüm reklam ilişkilerini silmek istediğinizden emin misiniz? Reklamların kendisi silinmeyecektir.')) {
        const response = await fetch(`/api/admin/ad-groups/${groupId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchData();
        } else {
            const result = await response.json();
            alert(`Hata: ${result.error}`);
        }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reklam Grupları</h1>

      {/* Edit Modal */}
      {editingGroup && <EditGroupModal group={editingGroup} onClose={() => setEditingGroup(null)} onSave={handleUpdateGroup} />}

      {/* Create New Group Form */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-3">Yeni Grup Oluştur</h2>
        <form onSubmit={handleCreateGroup} className="space-y-4">
          <input
            type="text"
            placeholder="Grup Adı"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="block w-full px-3 py-2 border rounded-md"
            required
          />
          <textarea
            placeholder="Açıklama"
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
            className="block w-full px-3 py-2 border rounded-md"
          />
          <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Grup Oluştur
          </button>
        </form>
      </div>

      {/* List of Ad Groups */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Mevcut Gruplar</h2>
        {isLoading && <p>Yükleniyor...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {groups.map((group) => (
          <div key={group.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.description}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => handleEditGroup(group)} className="text-blue-600 hover:text-blue-800">Düzenle</button>
                    <button onClick={() => handleDeleteGroup(group.id)} className="text-red-600 hover:text-red-800">Sil</button>
                </div>
            </div>

            {/* Ads in this group */}
            <div className="my-4">
              <h4 className="font-semibold">Gruptaki Reklamlar:</h4>
              {group.advertisements.length === 0 ? (
                <p className="text-sm text-gray-500">Bu grupta reklam yok.</p>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {group.advertisements.map(ad => (
                    <li key={ad.id} className="flex items-center justify-between">
                      <span className='flex items-center gap-2'>
                        {ad.image_url && <img src={ad.image_url} alt={ad.name} className='w-10 h-10 object-contain rounded'/>}
                        {ad.name}
                      </span>
                      <button onClick={() => handleRemoveAdFromGroup(group.id, ad.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Kaldır</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Add ad to this group */}
            <div className="mt-4 flex gap-2">
              <select onChange={(e) => setAdToAdd(e.target.value)} defaultValue="" className="flex-grow px-3 py-2 border rounded-md">
                <option value="" disabled>Gruba eklemek için bir reklam seçin</option>
                {allAds.filter(ad => !group.advertisements.some(ga => ga.id === ad.id)).map(ad => (
                  <option key={ad.id} value={ad.id}>{ad.name}</option>
                ))}
              </select>
              <button onClick={() => handleAddAdToGroup(group.id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Reklam Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdGroupsPage;