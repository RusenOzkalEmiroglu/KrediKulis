'use client';
import Link from 'next/link';

export default function AdminReklamAlanlari() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold mb-4">Reklam Alanları Yönetimi</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <Link href="/admin/reklam-alanlari/carousel" className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <h2 className="text-lg font-medium text-blue-600">Carousel</h2>
          <p className="text-gray-600 mt-1">Ana sayfada gösterilen carousel reklamlarını yönetin</p>
        </Link>
        
        <Link href="/admin/reklam-alanlari/masthead" className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <h2 className="text-lg font-medium text-blue-600">Masthead Alanı</h2>
          <p className="text-gray-600 mt-1">Menünün üzerinde gösterilen masthead reklamlarını yönetin</p>
        </Link>
        {/* Diğer reklam alanları buraya eklenebilir */}
      </div>
    </div>
  );
}