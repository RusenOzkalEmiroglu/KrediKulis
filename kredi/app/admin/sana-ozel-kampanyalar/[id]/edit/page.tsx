'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

interface Campaign {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  logo_url?: string;
  link_url: string;
}

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const response = await fetch(`/api/campaigns/${id}`);
        if (!response.ok) {
          throw new Error('Kampanya bulunamadı');
        }
        
        const campaign: Campaign = await response.json();
        
        setTitle(campaign.title || '');
        setDescription(campaign.description || '');
        setImageUrl(campaign.image_url || '');
        setLogoUrl(campaign.logo_url || '');
        setLinkUrl(campaign.link_url || '');
      } catch (error: any) {
        setError('Kampanya yüklenirken bir hata oluştu: ' + error.message);
      } finally {
        setInitialLoading(false);
      }
    }
    
    fetchCampaign();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isLogo: boolean = false) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    setError('');
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `campaigns/${isLogo ? 'logos' : 'images'}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('carousel')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('carousel')
        .getPublicUrl(filePath);
        
      if (isLogo) {
        setLogoUrl(publicUrl);
      } else {
        setImageUrl(publicUrl);
      }
    } catch (error: any) {
      setError(`${isLogo ? 'Logo' : 'Görsel'} yüklenirken bir hata oluştu: ` + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      setError('Lütfen bir başlık girin.');
      return;
    }
    
    if (!imageUrl) {
      setError('Lütfen bir görsel yükleyin.');
      return;
    }
    
    if (!linkUrl) {
      setError('Lütfen bir URL girin.');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          image_url: imageUrl,
          logo_url: logoUrl,
          link_url: linkUrl,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Bir hata oluştu');
      }
      
      router.push('/admin/sana-ozel-kampanyalar');
    } catch (error: any) {
      setError('Kampanya güncellenirken bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Kampanya Düzenle</h2>
        <Link href="/admin/sana-ozel-kampanyalar" className="text-blue-600">
          Geri Dön
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Başlık *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Açıklama
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kampanya Görseli *
          </label>
          {imageUrl && (
            <div className="mb-2">
              <img src={imageUrl} alt="Current" className="h-32 object-cover rounded" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, false)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">Yükleniyor...</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Logo (Opsiyonel)
          </label>
          {logoUrl && (
            <div className="mb-2">
              <img src={logoUrl} alt="Logo Current" className="h-16 object-contain" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, true)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">Yükleniyor...</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Link URL *
          </label>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="https://example.com"
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading || uploading}
          >
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>
        </div>
      </form>
    </div>
  );
}
