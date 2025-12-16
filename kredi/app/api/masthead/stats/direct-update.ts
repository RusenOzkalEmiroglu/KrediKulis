import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Supabase bağlantısı için client oluştur
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', supabaseUrl);
// API anahtarının ilk ve son 5 karakterini göster, güvenlik için ortasını gizle
const maskedKey = supabaseKey ? `${supabaseKey.substring(0, 5)}...${supabaseKey.substring(supabaseKey.length - 5)}` : '';
console.log('Supabase Key (masked):', maskedKey);

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Tıklama ve gösterim sayılarını artır
export async function POST(req: NextRequest) {
  try {
    const { id, type } = await req.json();
    
    console.log(`%c İstatistik güncelleniyor: ${type} - ID: ${id}`, 'background: #ff9900; color: black; font-size: 14px');
    
    if (!id) {
      console.error('ID zorunlu');
      return NextResponse.json({ error: 'ID zorunlu' }, { status: 400 });
    }
    
    if (!['impression', 'click'].includes(type)) {
      console.error('Geçersiz tip:', type);
      return NextResponse.json({ error: 'Geçersiz tip. "impression" veya "click" olmalıdır.' }, { status: 400 });
    }
    
    // Önce mevcut veriyi kontrol et
    console.log('Mevcut veriyi kontrol ediyorum...');
    const { data: existingData, error: fetchError } = await supabase
      .from('masthead')
      .select('*')
      .eq('id', id)
      .single();
    
    if (fetchError) {
      console.error('Veri getirme hatası:', fetchError);
      throw new Error(`Masthead bulunamadı: ${fetchError.message}`);
    }
    
    console.log('Mevcut veri:', existingData);
    
    // Tablo yapısını kontrol et
    console.log('Tablo sütunları:', Object.keys(existingData));
    
    // Sütunların varlığını kontrol et
    if (type === 'click' && !('clicks' in existingData)) {
      console.error('clicks sütunu bulunamadı! Supabase SQL komutlarını çalıştırdınız mı?');
    }
    
    if (type === 'impression' && !('impressions' in existingData)) {
      console.error('impressions sütunu bulunamadı! Supabase SQL komutlarını çalıştırdınız mı?');
    }
    
    // Değeri manuel olarak artır
    let updateData: any = {};
    let now = new Date().toISOString();
    
    if (type === 'impression') {
      // Gösterim sayısını artır
      const currentValue = existingData.impressions || 0;
      updateData = {
        impressions: currentValue + 1,
        last_impression: now
      };
    } else {
      // Tıklama sayısını artır
      const currentValue = existingData.clicks || 0;
      updateData = {
        clicks: currentValue + 1,
        last_click: now
      };
    }
    
    console.log('Güncellenecek veri:', updateData);
    
    // Güncelleme işlemi
    const { data: updateResult, error: updateError } = await supabase
      .from('masthead')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (updateError) {
      console.error('Güncelleme hatası:', updateError);
      
      // RLS politikalarını kontrol et
      console.log('RLS politikaları kontrol ediliyor...');
      
      // Güncelleme hatası detaylarını incele
      if (updateError.message.includes('permission denied')) {
        console.error('İzin hatası: Supabase RLS politikalarını kontrol edin!');
        return NextResponse.json({
          success: false,
          message: 'Veritabanı izin hatası. RLS politikalarını kontrol edin.',
          error: updateError.message
        }, { status: 403 });
      }
      
      throw new Error(`Güncelleme başarısız oldu: ${updateError.message}`);
    }
    
    console.log('%c Güncelleme başarılı:', 'background: #00ff00; color: black; font-size: 14px', updateResult);
    
    return NextResponse.json({
      success: true,
      message: `${type} istatistiği güncellendi`,
      data: updateResult,
      previousData: existingData
    });
  } catch (error: any) {
    console.error('%c İstatistik güncellemesi sırasında hata:', 'background: #ff0000; color: white; font-size: 14px', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
