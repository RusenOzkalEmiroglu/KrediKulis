'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CarouselAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/carousel')
      .then(res => res.json())
      .then(data => { setItems(data); setLoading(false); });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Carousel Yönetimi</h2>
      <Link href="/admin/reklam-alanlari/carousel/create" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">Yeni Carousel Ekle</Link>
      {loading ? <p>Yükleniyor...</p> : (
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Görsel</th>
              <th>Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b">
                <td>{item.title}</td>
                <td><img src={item.image_url} alt="carousel" className="h-16" /></td>
                <td><a href={item.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{item.link_url}</a></td>
                <td>
                  <Link href={`/admin/reklam-alanlari/carousel/${item.id}/edit`} className="text-orange-600 mr-2">Düzenle</Link>
                  <button className="text-red-600" onClick={async()=>{
                    if(confirm('Silmek istediğinize emin misiniz?')){
                      await fetch('/api/carousel', { method: 'DELETE', body: JSON.stringify({ id: item.id }) });
                      setItems(items.filter(i=>i.id!==item.id));
                    }
                  }}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
