import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { NextRequest } from 'next/server';
import { ilk100Hisse } from './bist-data';

// Cache kontrolü için headers
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Sayfalama parametrelerini al
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    
    // HTML parsing hatalarını önlemek için örnek veri kullanıyoruz
    // Gerçek bir API entegrasyonu için CORS ve rate limiting sorunlarını çözmek gerekir
    
    // BIST 100 hisse senedi verileri
    const hisseler = ilk100Hisse;

    // Endeks verileri
    const endeksler = [
      { kod: 'BIST100', isim: 'BIST 100', deger: '9.875,42', degisim: '+1,35%', trend: 'up' },
      { kod: 'BIST30', isim: 'BIST 30', deger: '10.542,68', degisim: '+1,42%', trend: 'up' },
      { kod: 'BISTBANK', isim: 'BIST Banka', deger: '8.765,34', degisim: '-0,28%', trend: 'down' },
      { kod: 'BISTHOLD', isim: 'BIST Holding', deger: '9.234,56', degisim: '+0,95%', trend: 'up' }
    ];

    // Arama filtresini uygula
    let filteredHisseler = hisseler;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredHisseler = hisseler.filter(hisse => 
        hisse.kod.toLowerCase().includes(searchLower) || 
        hisse.isim.toLowerCase().includes(searchLower)
      );
    }
    
    // Toplam sonuç sayısı
    const total = filteredHisseler.length;
    
    // Sayfalama uygula
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedHisseler = filteredHisseler.slice(startIndex, endIndex);
    
    // Sayfalama bilgilerini hazırla
    const pagination = {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      limit,
      hasNextPage: endIndex < total,
      hasPrevPage: page > 1
    };
    
    // Güncellenme zamanı
    const guncellenmeZamani = new Date().toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Simüle edilmiş bir gecikme ekleyerek gerçek API davranışını taklit ediyoruz
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ 
      hisseler: paginatedHisseler, 
      endeksler, 
      guncellenmeZamani,
      pagination,
      basarili: true 
    });
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return NextResponse.json({ 
      hata: 'Hisse senedi verileri çekilemedi', 
      basarili: false 
    }, { status: 500 });
  }
}
