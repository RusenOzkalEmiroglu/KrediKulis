import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export async function GET() {
  try {
    // TCMB'nin günlük döviz kurları XML servisini çağır
    const response = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml');
    const xmlData = await response.text();
    
    // XML verisini JSON'a çevir
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: ""
    });
    const result = parser.parse(xmlData);
    
    // JSON verisini döndür
    return NextResponse.json(result);
  } catch (error) {
    console.error('TCMB API hatası (Detailed):', error);
    return NextResponse.json(
      { error: 'TCMB döviz kurları alınırken bir hata oluştu' }, 
      { status: 500 }
    );
  }
} 