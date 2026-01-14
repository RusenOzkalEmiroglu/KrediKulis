import { NextResponse } from 'next/server';

interface GoldItem {
  name: string;
  buyPrice: string;
  sellPrice: string;
  change: string;
  updateTime: string;
  url: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  /*
  console.log('API çağrısı yapıldı:', new Date().toLocaleTimeString());
  try {
    const cheerioModule = await import('cheerio');
    // @ts-ignore
    const cheerio = cheerioModule.default || cheerioModule;
    // BigPara'dan altın fiyatlarını çek
    const response = await fetch('https://bigpara.hurriyet.com.tr/altin/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`BigPara yanıtı başarısız: ${response.status}`);
    }

    const html = await response.text();
    // @ts-ignore
    const $ = cheerio.load(html);
    const goldItems: GoldItem[] = [];

    // tBody sınıfı içindeki verileri çek
    $('.tBody ul').each((index: any, element: any) => {
      const cells = $(element).find('li');
      
      // En az 4 hücre varsa (isim, alış, satış, değişim, güncelleme)
      if (cells.length >= 4) {
        const nameElement = $(cells[0]).find('h3 a');
        const name = nameElement.text().trim();
        const url = nameElement.attr('href') || '';
        
        const buyPrice = $(cells[1]).text().trim();
        const sellPrice = $(cells[2]).text().trim();
        const change = $(cells[3]).text().trim();
        const updateTime = cells.length >= 5 ? $(cells[4]).text().trim() : new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        
        goldItems.push({
          name,
          buyPrice,
          sellPrice,
          change,
          updateTime,
          url
        });
      }
    });

    // Veri bulunamadıysa hata fırlat
    if (goldItems.length === 0) {
      throw new Error('Altın fiyatları bulunamadı');
    }

    return NextResponse.json(goldItems);
  } catch (error) {
    console.error('Altın fiyatları API hatası:', error);
    return NextResponse.json(
      { error: 'Altın fiyatları alınırken bir hata oluştu' }, 
      { status: 500 }
    );
  }
  */
  return NextResponse.json([]);
}