'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Masthead {
  id: string;
  type: 'image' | 'code';
  title?: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  html_code?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  impressions?: number;
  clicks?: number;
  last_impression?: string;
  last_click?: string;
}

export default function MastheadAdminPage() {
  const [mastheads, setMastheads] = useState<Masthead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/masthead')
      .then(res => res.json())
      .then(data => { 
        // API'den gelen veri bir dizi değilse, boş dizi olarak ayarla
        setMastheads(Array.isArray(data) ? data : []); 
        setLoading(false); 
        
        // Debug için konsola yazdır
        console.log('API response:', data);
        console.log('Is array:', Array.isArray(data));
      })
      .catch(err => {
        console.error('Masthead verileri yüklenirken hata oluştu:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bu masthead\'i silmek istediğinize emin misiniz?')) return;
    
    try {
      console.log('Silme işlemi başlatılıyor, ID:', id);
      
      const response = await fetch(`/api/masthead?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
        // body kısmını kaldırdık, query parametresi kullanıyoruz
      });
      
      const result = await response.json();
      console.log('Silme işlemi sonucu:', result);
      
      if (!response.ok) {
        throw new Error(`Silme işlemi başarısız oldu: ${result.error || response.statusText}`);
      }
      
      // Başarılı silme işleminden sonra listeyi güncelle
      setMastheads(mastheads.filter(masthead => masthead.id !== id));
      alert('Masthead başarıyla silindi');
    } catch (error) {
      console.error('Masthead silinirken hata oluştu:', error);
      alert(`Masthead silinirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  };

  const handleToggleActive = async (masthead: Masthead) => {
    try {
      const response = await fetch(`/api/masthead/${masthead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...masthead,
          is_active: !masthead.is_active
        }),
      });
      
      if (!response.ok) {
        throw new Error('Durum değiştirme işlemi başarısız oldu');
      }
      
      const updatedMasthead = await response.json();
      
      // Eğer bir masthead aktif hale getirildiyse, diğerlerini pasif yap
      if (updatedMasthead.is_active) {
        setMastheads(mastheads.map(item => 
          item.id === updatedMasthead.id 
            ? updatedMasthead 
            : { ...item, is_active: false }
        ));
      } else {
        // Sadece ilgili masthead'i güncelle
        setMastheads(mastheads.map(item => 
          item.id === updatedMasthead.id ? updatedMasthead : item
        ));
      }
    } catch (error) {
      console.error('Masthead durumu değiştirilirken hata oluştu:', error);
      alert('Masthead durumu değiştirilirken bir hata oluştu');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Masthead Alanı Yönetimi</h1>
        <Link href="/admin/reklam-alanlari/masthead/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          Yeni Masthead Ekle
        </Link>
      </div>
      
      <p className="mb-4 text-gray-600">
        Masthead, sitenin en üst kısmında (menünün üzerinde) görüntülenen reklam veya duyuru alanıdır. 
        Aynı anda sadece bir masthead aktif olabilir.
      </p>
      
      {loading ? (
        <p>Yükleniyor...</p>
      ) : mastheads.length === 0 ? (
        <p>Henüz masthead eklenmemiş.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tip</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlık</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İçerik</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gösterim</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tıklama</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(mastheads) && mastheads.map((masthead) => (
                <tr key={masthead.id} className={masthead.is_active ? "bg-green-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      masthead.type === 'image' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {masthead.type === 'image' ? 'Resim' : 'HTML Kodu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{masthead.title || '-'}</td>
                  <td className="px-6 py-4">
                    {masthead.type === 'image' ? (
                      <div className="flex items-center">
                        {masthead.image_url && (
                          <img src={masthead.image_url} alt={masthead.title || 'Masthead'} className="h-10 w-16 object-cover mr-2 rounded" />
                        )}
                        <a href={masthead.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 truncate max-w-xs">
                          {masthead.link_url}
                        </a>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        <code className="bg-gray-100 px-1 py-0.5 rounded">{masthead.html_code?.substring(0, 50)}...</code>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">{masthead.impressions || 0}</span>
                      {masthead.last_impression && (
                        <span className="text-xs text-gray-500">
                          Son: {new Date(masthead.last_impression).toLocaleDateString('tr-TR')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">{masthead.clicks || 0}</span>
                      {masthead.last_click && (
                        <span className="text-xs text-gray-500">
                          Son: {new Date(masthead.last_click).toLocaleDateString('tr-TR')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(masthead)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        masthead.is_active 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {masthead.is_active ? 'Aktif' : 'Pasif'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/reklam-alanlari/masthead/${masthead.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(masthead.id)}
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
