// kredi/app/admin/reklam-alanlari/ekle/page.tsx
"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import ImageManager from '@/app/components/admin/ImageManager';

// Define the type for an advertisement, now including dimensions
interface Advertisement {
  id: string;
  name: string;
  type: 'image' | 'code';
  image_url: string | null;
  target_url: string | null;
  html_code: string | null;
  is_active: boolean;
  created_at: string;
  image_width?: number | null;
  image_height?: number | null;
}

interface StorageFile {
    name: string;
    id: string;
    publicUrl: string;
}




const ManageAdsPage = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [adType, setAdType] = useState<'image' | 'code'>('image');
  const [imageUrl, setImageUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);


  // Editing state
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);


  const fetchAds = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/advertisements');
      if (!response.ok) throw new Error('Reklamlar yüklenemedi.');
      const data = await response.json();
      setAds(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);
  
  const resetForm = () => {
    setName('');
    setAdType('image');
    setImageUrl('');
    setTargetUrl('');
    setHtmlCode('');
    setIsActive(true);
    setEditingAd(null);
    setImageWidth(null);
    setImageHeight(null);
  }

  const handleImageSelect = (url: string) => {
    setImageUrl(url);
    const img = new Image();
    img.onload = () => {
        setImageWidth(img.naturalWidth);
        setImageHeight(img.naturalHeight);
    };
    img.src = url;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      name,
      type: adType,
      is_active: isActive,
      image_url: adType === 'image' ? imageUrl : null,
      target_url: targetUrl, 
      html_code: adType === 'code' ? htmlCode : null,
      image_width: adType === 'image' ? imageWidth : null,
      image_height: adType === 'image' ? imageHeight : null,
    };
    
    // Validation
    if (adType === 'image' && (!imageWidth || !imageHeight)) {
        setError('Görsel boyutları alınamadı. Lütfen farklı bir görsel seçin veya biraz bekleyin.');
        return;
    }

    const url = editingAd ? `/api/admin/advertisements/${editingAd.id}` : '/api/admin/advertisements';
    const method = editingAd ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      resetForm();
      fetchAds();
    } else {
      const result = await response.json();
      setError(result.error || (editingAd ? 'Reklam güncellenemedi.' : 'Reklam oluşturulamadı.'));
    }
  };

  const handleEdit = (ad: Advertisement) => {
    setEditingAd(ad);
    setName(ad.name);
    setAdType(ad.type);
    setIsActive(ad.is_active);
    setImageUrl(ad.image_url || '');
    setTargetUrl(ad.target_url || '');
    setHtmlCode(ad.html_code || '');
    setImageWidth(ad.image_width || null);
    setImageHeight(ad.image_height || null);
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu reklamı silmek istediğinizden emin misiniz?')) {
        const response = await fetch(`/api/admin/advertisements/${id}`, {
            method: 'DELETE',
        });

        if(response.ok) {
            fetchAds();
        } else {
            const result = await response.json();
            setError(result.error || 'Reklam silinemedi.');
        }
    }
  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{editingAd ? 'Reklamı Düzenle' : 'Reklam Ekle ve Listele'}</h1>
      
      {/* Ad Creation/Editing Form */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-3">{editingAd ? `"${editingAd.name}" düzenleniyor` : 'Yeni Reklam Ekle'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ad Type */}
          <div className="flex gap-4">
            <label><input type="radio" value="image" checked={adType === 'image'} onChange={() => setAdType('image')} /> Resim Reklamı</label>
            <label><input type="radio" value="code" checked={adType === 'code'} onChange={() => setAdType('code')} /> Kod Reklamı</label>
          </div>
          
          {/* Common Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Reklam Adı</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" required/>
          </div>

          {/* Image Ad Fields */}
          {adType === 'image' && (
            <>

              <div>
                <label className="block text-sm font-medium text-gray-700">Görsel Seç</label>
                <ImageManager value={imageUrl} onImageSelect={handleImageSelect} bucket="ad-images" />
                 {imageUrl && (
                    <div className='mt-2'>
                        <input type="text" value={imageUrl} readOnly className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"/>
                        {imageWidth && imageHeight && (
                            <p className="text-sm text-gray-600 mt-1">
                                Algılanan Boyutlar: {imageWidth}px x {imageHeight}px
                            </p>
                        )}
                    </div>
                 )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hedef URL</label>
                <input type="text" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" required={adType === 'image'}/>
              </div>
            </>
          )}

          {/* Code Ad Fields */}
          {adType === 'code' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">HTML Kodu</label>
                <textarea value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} rows={5} className="mt-1 block w-full px-3 py-2 border rounded-md" required={adType === 'code'}></textarea>
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700">Tıklama URL (Opsiyonel)</label>
                <input type="text" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md"/>
                <p className="text-xs text-gray-500">Kod içi tıklama takibi yoksa, buraya girilen URL kullanılır.</p>
              </div>
            </>
          )}

          <div className="flex items-center">
            <input id="isActive" type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 text-orange-600 rounded"/>
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Aktif mi?</label>
          </div>
          
          <div className='flex gap-4 items-center'>
            <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              {editingAd ? 'Değişiklikleri Kaydet' : 'Reklamı Kaydet'}
            </button>
            {editingAd && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 text-black rounded-md">İptal</button>}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>

      {/* Existing Ads List */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Mevcut Reklamlar</h2>
        {isLoading ? <p>Yükleniyor...</p> : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Adı</th>
                  <th className="py-2 px-4 border-b text-left">Türü</th>
                  <th className="py-2 px-4 border-b text-left">Önizleme</th>
                  <th className="py-2 px-4 border-b text-left">Durum</th>
                  <th className="py-2 px-4 border-b text-left">Eylemler</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{ad.name}</td>
                    <td className="py-2 px-4 border-b uppercase text-xs font-bold">{ad.type}</td>
                    <td className="py-2 px-4 border-b">
                      {ad.type === 'image' && ad.image_url ? (
                        <div className='relative'>
                            <img src={ad.image_url} alt={ad.name} className="h-10 w-auto" />
                            {ad.image_width && ad.image_height && (
                                <span className="text-xs text-gray-500">{ad.image_width}x{ad.image_height}</span>
                            )}
                        </div>
                      ) : (
                        <pre className="text-xs bg-gray-100 p-1 rounded"><code>{ad.html_code?.substring(0, 30)}...</code></pre>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ ad.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
                        {ad.is_active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b flex gap-2">
                        <button onClick={() => handleEdit(ad)} className="text-blue-600 hover:text-blue-800">Düzenle</button>
                        <button onClick={() => handleDelete(ad.id)} className="text-red-600 hover:text-red-800">Sil</button>
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

export default ManageAdsPage;