'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  logo_url?: string;
  link_url: string;
  created_at?: string;
}

export default function CampaignsAdminPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => { 
        setCampaigns(data); 
        setLoading(false); 
      })
      .catch(err => {
        console.error('Kampanyalar yüklenirken hata oluştu:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) return;
    
    try {
      const response = await fetch('/api/campaigns', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error('Silme işlemi başarısız oldu');
      }
      
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    } catch (error) {
      console.error('Kampanya silinirken hata oluştu:', error);
      alert('Kampanya silinirken bir hata oluştu');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sana Özel Kampanyalar</h1>
        <Link href="/admin/sana-ozel-kampanyalar/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          Yeni Kampanya Ekle
        </Link>
      </div>
      
      {loading ? (
        <p>Yükleniyor...</p>
      ) : campaigns.length === 0 ? (
        <p>Henüz kampanya eklenmemiş.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Görsel</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlık</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Açıklama</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={campaign.image_url} alt={campaign.title} className="h-16 w-24 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.logo_url && (
                      <img src={campaign.logo_url} alt={`${campaign.title} logo`} className="h-10 w-10 object-contain" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{campaign.title}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{campaign.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={campaign.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 truncate max-w-xs block">
                      {campaign.link_url}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/sana-ozel-kampanyalar/${campaign.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
