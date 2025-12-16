import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Supabase bağlantısı için client oluştur
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Gösterim veya tıklama sayısını artır - çok basit versiyon
export async function POST(req: NextRequest) {
  try {
    const { id, type } = await req.json();
    
    console.log(`İstatistik güncelleniyor: ${type} - ID: ${id}`);
    
    if (!id) {
      return NextResponse.json({ error: 'ID zorunlu' }, { status: 400 });
    }
    
    if (!['impression', 'click'].includes(type)) {
      return NextResponse.json({ error: 'Geçersiz tip. "impression" veya "click" olmalıdır.' }, { status: 400 });
    }
    
    // Önce mevcut veriyi al
    const { data: masthead, error: fetchError } = await supabase
      .from('masthead')
      .select('*')
      .eq('id', id)
      .single();
    
    if (fetchError) {
      console.error('Veri alma hatası:', fetchError);
      throw new Error(`Masthead bulunamadı: ${fetchError.message}`);
    }
    
    if (!masthead) {
      throw new Error(`ID ile eşleşen masthead bulunamadı: ${id}`);
    }
    
    console.log('Mevcut veri:', masthead);
    
    // Güncelleme verisi
    const updateData: Record<string, any> = {};
    const now = new Date().toISOString();
    
    if (type === 'impression') {
      // Gösterim sayısını güncelle
      const currentImpressions = typeof masthead.impressions === 'number' ? masthead.impressions : 0;
      updateData.impressions = currentImpressions + 1;
      updateData.last_impression = now;
    } else {
      // Tıklama sayısını güncelle
      const currentClicks = typeof masthead.clicks === 'number' ? masthead.clicks : 0;
      updateData.clicks = currentClicks + 1;
      updateData.last_click = now;
    }
    
    console.log('Güncelleme verisi:', updateData);
    
    // Veritabanını güncelle
    const { data: updateResult, error: updateError } = await supabase
      .from('masthead')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (updateError) {
      console.error('Güncelleme hatası:', updateError);
      throw new Error(`Güncelleme başarısız oldu: ${updateError.message}`);
    }
    
    console.log('Güncelleme başarılı:', updateResult);
    
    return NextResponse.json({
      success: true,
      message: type === 'impression' ? 'Gösterim sayısı artırıldı' : 'Tıklama sayısı artırıldı',
      data: updateResult
    });
  } catch (error: any) {
    console.error('Masthead istatistik güncellemesi sırasında hata:', error);
    
    // Hata olsa bile başarılı yanıt döndür
    return NextResponse.json({
      success: true,
      message: 'Hata oluştu ancak işlem devam ediyor',
      error: error.message
    });
  }
}
