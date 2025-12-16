// kredi/app/admin/reklam-alanlari/page.tsx
import React from 'react';

const AdManagementDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reklam Yönetimi Genel Bakış</h1>
      <p className="text-gray-700">
        Bu panel üzerinden reklam yerleşimlerini, reklam gruplarını ve yeni reklamları yönetebilirsiniz.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Hızlı İstatistikler</h2>
          <p>Toplam Reklam: <span className="font-bold">0</span></p>
          <p>Toplam Reklam Grubu: <span className="font-bold">0</span></p>
          <p>Aktif Yerleşim: <span className="font-bold">2</span></p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Son Aktiviteler</h2>
          <p className="text-sm text-gray-500">Henüz bir aktivite bulunmuyor.</p>
        </div>
      </div>
    </div>
  );
};

export default AdManagementDashboard;
