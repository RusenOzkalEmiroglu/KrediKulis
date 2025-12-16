// kredi/app/admin/reklam-alanlari/raporlar/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from 'date-fns';

interface AdReport {
  name: string;
  views: number;
  clicks: number;
}

const AdReportsPage = () => {
  const [reports, setReports] = useState<AdReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate.toISOString());
      if (endDate) params.append('endDate', endDate.toISOString());

      const response = await fetch(`/api/admin/ad-reports?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Rapor verileri yüklenemedi.');
      }
      const data = await response.json();
      setReports(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [startDate, endDate]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reklam Raporları</h1>
      <p className="text-gray-700 mb-6">
        Reklamların toplam gösterim ve tıklanma sayıları.
      </p>

      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
        <div>
          <label className="block text-sm font-medium text-gray-700">Başlangıç Tarihi</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bitiş Tarihi</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
         <button onClick={fetchReports} className="self-end px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Filtrele
        </button>
      </div>
      
      {isLoading ? <p>Yükleniyor...</p> : error ? <p className="text-red-500">{error}</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b text-left">Reklam Adı</th>
                <th className="py-2 px-4 border-b text-left">Gösterim (View)</th>
                <th className="py-2 px-4 border-b text-left">Tıklama (Click)</th>
                <th className="py-2 px-4 border-b text-left">Tıklama Oranı (CTR)</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.name} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b font-medium">{report.name}</td>
                  <td className="py-2 px-4 border-b">{report.views.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{report.clicks.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">
                    {report.views > 0 ? 
                      ((report.clicks / report.views) * 100).toFixed(2) + '%' 
                      : 'N/A'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdReportsPage;