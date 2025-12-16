'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

interface Stats {
  totalBanks: number;
  totalLoans: number;
  totalCreditCards: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBanks: 0,
    totalLoans: 0,
    totalCreditCards: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total banks
        const { count: banksCount, error: banksError } = await supabase
          .from('banks')
          .select('*', { count: 'exact', head: true });

        // Fetch total consumer loans
        const { count: loansCount, error: loansError } = await supabase
          .from('consumer_loans')
          .select('*', { count: 'exact', head: true });

        if (banksError) throw banksError;
        if (loansError) throw loansError;

        setStats({
          totalBanks: banksCount || 0,
          totalLoans: loansCount || 0,
          totalCreditCards: 0 // Bu kısım kredi kartları tablosu oluşturulduğunda güncellenecek
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Banka</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalBanks}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Kredi</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalLoans}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Kredi Kartı</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCreditCards}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hoş Geldiniz</h2>
        <p className="text-gray-600">
          KrediKulis Admin Paneline hoş geldiniz. Bu panel üzerinden bankaları, kredileri, kredi kartlarını ve diğer finansal ürünleri yönetebilirsiniz.
        </p>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/bankalar" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium text-gray-900">Bankalar</h3>
            <p className="text-sm text-gray-600">Banka bilgilerini yönetin</p>
          </Link>
          <Link href="/admin/ihtiyac-kredisi" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium text-gray-900">İhtiyaç Kredileri</h3>
            <p className="text-sm text-gray-600">Kredi tekliflerini yönetin</p>
          </Link>
          <Link href="/admin/kredi-karti" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium text-gray-900">Kredi Kartları</h3>
            <p className="text-sm text-gray-600">Kart tekliflerini yönetin</p>
          </Link>
          <Link href="/admin/ayarlar" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium text-gray-900">Ayarlar</h3>
            <p className="text-sm text-gray-600">Sistem ayarlarını yönetin</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 