'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

interface Masthead {
  id: string;
  type: 'image' | 'code';
  title?: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  html_code?: string;
  is_active: boolean;
}

export default function EditMastheadPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  
  const [type, setType] = useState<'image' | 'code'>('image');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchMasthead() {
      try {
        const response = await fetch(`/api/masthead/${id}`);
        if (!response.ok) {
          throw new Error('Masthead bulunamadı');
        }
        
        const masthead: Masthead = await response.json();
        
        setType(masthead.type);
        setTitle(masthead.title || '');
        setDescription(masthead.description || '');
        setImageUrl(masthead.image_url || '');
        setLinkUrl(masthead.link_url || '');
        setHtmlCode(masthead.html_code || '');
        setIsActive(masthead.is_active);
      } catch (error: any) {
        setError('Masthead yüklenirken bir hata oluştu: ' + error.message);
      } finally {
        setInitialLoading(false);
      }
    }
    
    fetchMasthead();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    setError('');
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `masthead/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasyon
    if (type === 'image') {
      if (!imageUrl) {
        setError('Lütfen bir görsel yükleyin.');
        return;
      }
      
      if (!linkUrl) {
        setError('Lütfen bir URL girin.');
        return;
      }
    } else { // type === 'code'
      if (!htmlCode) {
        setError('Lütfen HTML kodu girin.');
        return;
      }
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`/api/masthead/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          title,
          description,
          image_url: imageUrl,
          link_url: linkUrl,
          html_code: htmlCode,
          is_active: isActive
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Bir hata oluştu');
      }
      
      router.push('/admin/reklam-alanlari/masthead');
    } catch (error: any) {
      setError('Masthead güncellenirken bir hata oluştu: ' + error.message);
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
        <h2 className="text-xl font-bold">Masthead Düzenle</h2>
        <Link href="/admin/reklam-alanlari/masthead" className="text-blue-600">
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
            Masthead Tipi *
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="type"
                value="image"
                checked={type === 'image'}
                onChange={() => setType('image')}
              />
              <span className="ml-2">Resim</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="type"
                value="code"
                checked={type === 'code'}
                onChange={() => setType('code')}
              />
              <span className="ml-2">Kod</span>
            </label>
          </div>
        </div>
        
        <div>
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
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Açıklama (Opsiyonel)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={2}
          />
        </div>
        
        {type === 'image' ? (
          <>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Görsel *
              </label>
              {imageUrl && (
                <div className="mb-2">
                  <img src={imageUrl} alt="Current" className="h-32 object-cover rounded" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
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
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              HTML Kodu *
            </label>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
              rows={8}
              placeholder="<div>HTML kodunuzu buraya yazın</div>"
            />
            <p className="text-xs text-gray-500 mt-1">
              HTML kodu doğrudan sayfa içerisine eklenecektir. Güvenlik için kodunuzu kontrol edin.
            </p>
          </div>
        )}
        
        <div className="flex items-center">
          <input
            id="is_active"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
            Aktif (Anasayfada göster)
          </label>
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
