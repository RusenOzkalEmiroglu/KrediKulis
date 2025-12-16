import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // TCMB'nin günlük döviz kurları XML servisini çağır
    const response = await axios.get('https://www.tcmb.gov.tr/kurlar/today.xml', {
      responseType: 'text'
    });
    
    // XML verisini doğrudan döndür
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('TCMB API hatası:', error);
    return NextResponse.json(
      { error: 'TCMB döviz kurları alınırken bir hata oluştu' }, 
      { status: 500 }
    );
  }
} 