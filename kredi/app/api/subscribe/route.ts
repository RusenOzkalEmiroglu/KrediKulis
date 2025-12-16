import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Veritabanı yerine JSON dosyası kullanıyoruz
// Gerçek projede bu kısım bir veritabanı bağlantısı ile değiştirilmelidir
const DB_PATH = path.join(process.cwd(), 'data', 'subscribers.json');

// Dosyanın var olduğundan emin olalım
const ensureDirectoryExists = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
};

// E-posta adreslerini oku
const getSubscribers = (): any[] => {
  ensureDirectoryExists();
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscribers:', error);
    return [];
  }
};

// E-posta adreslerini kaydet
const saveSubscriber = (subscriber: any) => {
  ensureDirectoryExists();
  try {
    const subscribers = getSubscribers();
    
    // E-posta adresi zaten var mı kontrol et
    const existingIndex = subscribers.findIndex(
      (s) => s.email.toLowerCase() === subscriber.email.toLowerCase()
    );
    
    if (existingIndex >= 0) {
      // Varsa güncelle
      subscribers[existingIndex] = {
        ...subscribers[existingIndex],
        ...subscriber,
        updatedAt: new Date().toISOString(),
      };
    } else {
      // Yoksa ekle
      subscribers.push({
        ...subscriber,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
    }
    
    fs.writeFileSync(DB_PATH, JSON.stringify(subscribers, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return false;
  }
};

// E-posta formatını doğrula
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, marketingConsent, dataProcessingConsent } = body;
    
    // E-posta adresi kontrolü
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'E-posta adresi gereklidir.' },
        { status: 400 }
      );
    }
    
    // E-posta formatı kontrolü
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }
    
    // İzinler kontrolü
    if (!marketingConsent || !dataProcessingConsent) {
      return NextResponse.json(
        { success: false, message: 'Gerekli izinleri onaylamanız gerekmektedir.' },
        { status: 400 }
      );
    }
    
    // Abone bilgilerini kaydet
    const subscriber = {
      email,
      marketingConsent,
      dataProcessingConsent,
      subscriptionDate: new Date().toISOString(),
    };
    
    const saved = saveSubscriber(subscriber);
    
    if (saved) {
      return NextResponse.json(
        { success: true, message: 'E-posta adresiniz başarıyla kaydedildi.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in subscribe API:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Bu endpoint sadece admin paneli için kullanılabilir
  // Gerçek projede yetkilendirme eklenmelidir
  return NextResponse.json(
    { success: false, message: 'Yetkisiz erişim.' },
    { status: 401 }
  );
}
