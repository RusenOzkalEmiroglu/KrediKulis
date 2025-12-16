import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const res = await fetch('https://bigpara.hurriyet.com.tr/altin/', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      },
      cache: 'no-store',
    });
    const html = await res.text();
    console.log('Fetched HTML length:', html.length);
    console.log('HTML preview:', html.slice(0, 1000));
    const $ = cheerio.load(html);
    const rows = $('.tBody tr');
    console.log('Found rows in .tBody:', rows.length);
    if (rows.length === 0) {
      console.warn('No rows found in .tBody. Check if Bigpara structure changed or access is blocked.');
    }
    const results: any[] = [];
    rows.each((_, row) => {
      const cols = $(row).find('td');
      if (cols.length >= 4) {
        results.push({
          name: $(cols[0]).text().trim(),
          buy: $(cols[1]).text().trim(),
          sell: $(cols[2]).text().trim(),
          change: $(cols[3]).text().trim(),
        });
      }
    });
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}
