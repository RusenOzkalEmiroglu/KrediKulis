'use client';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

interface Campaign {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  logo_url?: string;
  link_url: string;
  criteria?: string;
}

export default function SpecialCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch('/api/campaigns');
        if (!response.ok) {
          throw new Error('Kampanya verileri alınamadı');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        console.error('Kampanyalar yüklenirken hata oluştu:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  const handleOpenModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  if (loading) {
    return <div className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>;
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-purple-900 mb-6">Sana özel banka ve kredi kampanyaları</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div 
            key={campaign.id} 
            className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleOpenModal(campaign)}
          >
            <div className="relative">
              <img 
                src={campaign.image_url} 
                alt={campaign.title} 
                className="w-full h-48 object-cover"
              />
              {campaign.logo_url && (
                <div className="absolute bottom-3 right-3">
                  <img 
                    src={campaign.logo_url} 
                    alt={`${campaign.title} logo`} 
                    className="h-10 w-auto object-contain bg-white rounded-full p-1 shadow"
                  />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{campaign.title}</h3>
              {campaign.description && (
                <p className="text-gray-600 text-sm">{campaign.description}</p>
              )}
              <div className="mt-3 flex justify-end">
                <span className="text-blue-600 text-sm font-medium">Fırsatı İncele</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Kredi Fırsatı</h2>
            <div className="flex justify-center mb-4">
              <QRCode value={selectedCampaign.link_url} size={256} />
            </div>
            <p className="text-gray-600 mb-4">{selectedCampaign.description}</p>
            <div className="text-left">
              <h3 className="font-semibold">Kredi/Nakit Avans Kriterleri</h3>
              <p className="text-gray-600">{selectedCampaign.criteria || 'Bankanın yeni müşterisi olmak.'}</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-6 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
