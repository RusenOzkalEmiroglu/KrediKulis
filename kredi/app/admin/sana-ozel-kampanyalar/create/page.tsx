'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default function CreateCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
      const response = await fetch('/api/campaigns', {
        method: 'POST',
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
      setError('Kampanya eklenirken bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Yeni Kampanya Ekle</h2>
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, false)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">Yükleniyor...</p>}
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Preview" className="h-32 object-cover rounded" />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Logo (Opsiyonel)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, true)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">Yükleniyor...</p>}
          {logoUrl && (
            <div className="mt-2">
              <img src={logoUrl} alt="Logo Preview" className="h-16 object-contain" />
            </div>
          )}
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
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
