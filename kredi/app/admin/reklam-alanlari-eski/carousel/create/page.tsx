'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default function CreateCarouselPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Görsel boyut kontrolü
    const img = new Image();
    img.onload = async () => {
      URL.revokeObjectURL(img.src);
      
      if (img.width !== 2400 || img.height !== 504) {
        setError('Görsel boyutu 2400x504 piksel olmalıdır.');
        return;
      }
      
      setError('');
      setUploading(true);
      
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `carousel/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('carousel')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('carousel')
          .getPublicUrl(filePath);
          
        setImageUrl(publicUrl);
      } catch (error: any) {
        setError('Görsel yüklenirken bir hata oluştu: ' + error.message);
      } finally {
        setUploading(false);
      }
    };
    
    img.src = URL.createObjectURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      const response = await fetch('/api/carousel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          image_url: imageUrl,
          link_url: linkUrl,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Bir hata oluştu');
      }
      
      router.push('/admin/reklam-alanlari/carousel');
    } catch (error: any) {
      setError('Carousel eklenirken bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Yeni Carousel Ekle</h2>
        <Link href="/admin/reklam-alanlari/carousel" className="text-blue-600">
          Geri Dön
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Başlık (Opsiyonel)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Görsel (2400x504 px) *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">Yükleniyor...</p>}
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Preview" className="h-24 object-cover" />
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Not: Görsel boyutu tam olarak 2400x504 piksel olmalıdır.
          </p>
        </div>
        
        <div className="mb-6">
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
