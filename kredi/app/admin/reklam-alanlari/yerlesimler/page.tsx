// kredi/app/admin/reklam-alanlari/yerlesimler/page.tsx
"use client";

import React, { useState, useEffect } from 'react';

// Type Definitions
interface Advertisement {
  id: string;
  name: string;
}

interface AdGroup {
  id: string;
  name: string;
}

// Corrected interface to match API response
interface AdPlacement {
  id: string;
  placement_key: string;
  display_name: string;
  advertisements: Advertisement | null; // Renamed from advertisement
  ad_groups: AdGroup | null;      // Renamed from ad_group
}

const AdPlacementsPage = () => {
  const [placements, setPlacements] = useState<AdPlacement[]>([]);
  const [allAds, setAllAds] = useState<Advertisement[]>([]);
  const [allGroups, setAllGroups] = useState<AdGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [placementsRes, adsRes, groupsRes] = await Promise.all([
        fetch('/api/admin/ad-placements'),
        fetch('/api/admin/advertisements'),
        fetch('/api/admin/ad-groups')
      ]);

      if (!placementsRes.ok || !adsRes.ok || !groupsRes.ok) {
        throw new Error('Veri yüklenemedi.');
      }

      const placementsData = await placementsRes.json();
      const adsData = await adsRes.json();
      const groupsData = await groupsRes.json();

      setPlacements(placementsData);
      setAllAds(adsData);
      setAllGroups(groupsData);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdatePlacement = async (placementId: string, adId: string | null, groupId: string | null) => {
    const response = await fetch(`/api/admin/ad-placements/${placementId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        advertisement_id: adId,
        ad_group_id: groupId,
      }),
    });

    if (response.ok) {
      alert('Yerleşim güncellendi!');
      fetchData(); // Refresh data
    } else {
      const result = await response.json();
      alert(`Hata: ${result.error}`);
    }
  };

  const PlacementCard = ({ placement }: { placement: AdPlacement }) => {
    // Correctly initialize state using the plural form from the API
    const [selectedAd, setSelectedAd] = useState(placement.advertisements?.id || '');
    const [selectedGroup, setSelectedGroup] = useState(placement.ad_groups?.id || '');

    // Sync state with props when they change after a fetch
    useEffect(() => {
      setSelectedAd(placement.advertisements?.id || '');
      setSelectedGroup(placement.ad_groups?.id || '');
    }, [placement]);

    const onSave = () => {
      handleUpdatePlacement(placement.id, selectedAd || null, selectedGroup || null);
    };
    
    return (
      <div className="p-4 border rounded-lg bg-white">
        <h3 className="text-lg font-bold">{placement.display_name}</h3>
        <p className="text-sm text-gray-500 mb-4">Anahtar: <code>{placement.placement_key}</code></p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tekil Reklam Ata</label>
            <select
              value={selectedAd}
              onChange={(e) => { setSelectedAd(e.target.value); setSelectedGroup(''); }}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              disabled={!!selectedGroup}
            >
              <option value="">-- Reklam Yok --</option>
              {allAds.map(ad => <option key={ad.id} value={ad.id}>{ad.name}</option>)}
            </select>
          </div>

          <div className="text-center text-sm font-bold text-gray-500">VEYA</div>

          <div>
            <label className="block text-sm font-medium">Reklam Grubu Ata</label>
            <select
              value={selectedGroup}
              onChange={(e) => { setSelectedGroup(e.target.value); setSelectedAd(''); }}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              disabled={!!selectedAd}
            >
              <option value="">-- Grup Yok --</option>
              {allGroups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button onClick={onSave} className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Kaydet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reklam Yerleşimleri</h1>
      <p className="text-gray-700 mb-6">
        Sitedeki sabit reklam alanlarına hangi reklam veya grupların gösterileceğini buradan yönetin.
      </p>

      {isLoading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {placements.map(p => <PlacementCard key={p.id} placement={p} />)}
      </div>
    </div>
  );
};

export default AdPlacementsPage;
