# Kredi Hesaplama Sitesi UI/UX Tasarım Kural Dosyası

## 1. Renk Paleti

### Ana Renkler
- **Mavi (Ana Marka Rengi)**: #0A3EA6
- **Açık Mavi (Ana Kontrast)**: #56A1BF
- **Sarı (Ana Kontrast)**: #F2CF66
- **Turuncu (Ana Kontrast)**:rgb(242, 175, 94)
- **Koyu Turuncu (Ana Marka Rengi)**:rgb(237, 143, 89)


### İkincil Renkler
- **Mavi (Ana Marka Rengi)**:rgb(50, 89, 168)
- **Açık Mavi (Ana Kontrast)**:rgb(105, 169, 195)
- **Sarı (Ana Kontrast)**:rgb(239, 213, 135)
- **Turuncu (Ana Kontrast)**:rgb(242, 174, 91)
- **Koyu Turuncu (Ana Marka Rengi)**:rgb(240, 143, 87)

### Fonksiyonel Renkler
- **Başarı Yeşili**: #4CAF50
- **Uyarı Sarısı**: #FFC107
- **Hata Kırmızısı**: #F44336
- **Bilgi Mavisi**: #2196F3

### Arka Plan Renkleri
- **Birincil Arka Plan**: #FFFFFF
- **İkincil Arka Plan**: #F5F5F5
- **Turuncu Gradient**: linear-gradient(135deg, #FF6B00, #FF9E40)
- **Siyah Gradient**: linear-gradient(135deg, #1A1A1A, #333333)

## 2. Tipografi

### Font Ailesi
- **Başlıklar**: 'Montserrat', sans-serif
- **Gövde Metni**: 'Open Sans', sans-serif
- **Sayılar/Değerler**: 'Roboto Mono', monospace (özellikle finansal değerler için)

### Font Boyutları
- **Büyük Başlık (H1)**: 32px
- **Orta Başlık (H2)**: 24px
- **Küçük Başlık (H3)**: 20px
- **Alt Başlık (H4)**: 18px
- **Gövde Metni**: 16px
- **Küçük Metin**: 14px
- **Çok Küçük Metin**: 12px

### Font Ağırlıkları
- **Başlıklar**: 700 (Bold)
- **Alt Başlıklar**: 600 (Semi-Bold)
- **Gövde Metni**: 400 (Regular)
- **Vurgulu Metin**: 500 (Medium)

## 3. Bileşenler

### Butonlar
- **Birincil Buton**: 
  - Arka plan: #FF6B00
  - Metin: #FFFFFF
  - Hover: #E65100
  - Aktif: #FF9E40
  - Köşe Yuvarlaklığı: 8px
  - Padding: 12px 24px
  - Geçiş: 0.3s ease

- **İkincil Buton**: 
  - Arka plan: Transparan
  - Kenarlık: 2px solid #FF6B00
  - Metin: #FF6B00
  - Hover: #FF6B00 (bg), #FFFFFF (text)
  - Köşe Yuvarlaklığı: 8px
  - Padding: 12px 24px

- **Üçüncül Buton**: 
  - Arka plan: Transparan
  - Metin: #1A1A1A
  - Hover: #F5F5F5
  - Köşe Yuvarlaklığı: 8px
  - Padding: 12px 24px

### Formlar

- **Giriş Alanları**:
  - Arka plan: #FFFFFF
  - Kenarlık: 1px solid #DDDDDD
  - Odaklanma: 2px solid #FF6B00
  - Padding: 12px 16px
  - Köşe Yuvarlaklığı: 8px
  - Placeholder Rengi: #777777

- **Kaydırıcılar (Slider)**:
  - İz Rengi: #DDDDDD
  - Aktif İz: #FF6B00
  - Başlık Rengi: #1A1A1A
  - Başlık Boyutu: 24px
  - Başlık Ağırlığı: 600
  - Değer Görüntüleme: İnteraktif tooltip

- **Seçiciler (Dropdown)**:
  - Arka plan: #FFFFFF
  - Kenarlık: 1px solid #DDDDDD
  - Odaklanma: 2px solid #FF6B00
  - Ok İkonu: Turuncu (#FF6B00)
  - Açılır Menü Gölge: 0px 4px 12px rgba(0, 0, 0, 0.1)

### Kartlar

- **Kredi Kartı**:
  - Arka plan: Turuncu Gradient
  - Metin: #FFFFFF
  - Köşe Yuvarlaklığı: 12px
  - Padding: 24px
  - Gölge: 0px 8px 16px rgba(255, 107, 0, 0.2)

- **Bilgi Kartı**:
  - Arka plan: #FFFFFF
  - Kenarlık: 1px solid #EEEEEE
  - Köşe Yuvarlaklığı: 12px
  - Padding: 20px
  - Gölge: 0px 4px 12px rgba(0, 0, 0, 0.05)
  - Başlık Rengi: #1A1A1A
  - Metin Rengi: #333333

- **Sonuç Kartı**:
  - Arka plan: #FFFFFF
  - Kenarlık Sol: 4px solid #FF6B00
  - Köşe Yuvarlaklığı: 12px
  - Padding: 24px
  - Gölge: 0px 6px 16px rgba(0, 0, 0, 0.08)

## 4. Grafikler ve Veri Görselleştirme

### Grafikler
- **Ana Grafik Rengi**: #FF6B00
- **İkincil Grafik Rengi**: #1A1A1A
- **Karşılaştırma Rengi**: #777777
- **Izgara Çizgileri**: #EEEEEE
- **Eksen Etiketleri**: #777777
- **Başlık Rengi**: #1A1A1A
- **Tooltip Arka plan**: #FFFFFF
- **Tooltip Gölge**: 0px 4px 12px rgba(0, 0, 0, 0.1)

### Veri Görselleştirme
- **Pasta Grafikleri**: 
  - Ana Dilim: #FF6B00
  - İkincil Dilimler: #FF9E40, #E65100, #333333
  - Etiket Rengi: #1A1A1A

- **Çubuk Grafikler**:
  - Ana Çubuk: #FF6B00
  - İkincil Çubuk: #333333
  - Hover Durum: %10 daha parlak

## 5. Navigasyon

### Menü
- **Arka plan**: #1A1A1A
- **Metin**: #FFFFFF
- **Aktif Öğe**: #FF6B00
- **Hover Durum**: #333333
- **Kenar Çizgisi**: 1px solid #333333
- **Dropdown Gölge**: 0px 4px 12px rgba(0, 0, 0, 0.2)

### İlerleme Göstergesi
- **Tamamlanmış Adım**: #FF6B00
- **Aktif Adım**: #FF9E40
- **Bekleyen Adım**: #EEEEEE
- **Adım Metni**: #1A1A1A
- **Adım Numarası**: #FFFFFF

## 6. Animasyonlar ve Geçişler

### Bileşen Geçişleri
- **Standart Geçiş**: 0.3s ease
- **Yavaş Geçiş**: 0.5s ease-in-out
- **Hızlı Geçiş**: 0.2s ease-out

### Animasyonlar
- **Yükleme İkonları**: Turuncu (#FF6B00) dönme animasyonu
- **Veri Güncellemesi**: Yumuşak solma (0.3s)
- **Kart Hover**: Hafif yükselme (transform: translateY(-4px))
- **Sonuç Görüntüleme**: Yukarıdan aşağıya kayma (0.4s)

### Mikroetkileşimler
- **Buton Tıklama**: Hafif küçülme animasyonu
- **Kaydırıcı Hareket**: Değer balonunun yumuşak hareketi
- **Form Odaklanması**: Yumuşak kenarlık geçişi
- **Hata Mesajları**: Hafif sarsıntı animasyonu

## 7. Düzen ve Izgara

### Izgara Sistemi
- **Ana Izgara**: 12 sütunlu
- **Sütun Aralığı**: 24px
- **Kenar Boşlukları**: 
  - Masaüstü: 64px
  - Tablet: 48px
  - Mobil: 24px

### Boşluk Hiyerarşisi
- **Büyük Boşluk**: 48px
- **Orta Boşluk**: 32px
- **Küçük Boşluk**: 16px
- **Çok Küçük Boşluk**: 8px

### Duyarlı Tasarım
- **Masaüstü**: 1200px ve üzeri
- **Küçük Masaüstü**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Mobil**: 767px ve altı

## 8. İkonlar ve Görsel Öğeler

### İkonlar
- **Stil**: Çizgisel (Outline)
- **Kalınlık**: 2px
- **Renk**: #FF6B00 (Birincil), #1A1A1A (İkincil)
- **Boyut**: 
  - Büyük: 32px
  - Orta: 24px
  - Küçük: 16px

### Görseller
- **Fotoğraflar**: Finansal başarı, güven ve profesyonellik temalı
- **İllüstrasyonlar**: Minimalist, düz çizgi stili
- **Arka Plan Desenleri**: Soyut, geometrik, turuncu/siyah tonlarında

## 9. Erişilebilirlik

### Renk Kontrastı
- **Metin Kontrastı**: WCAG 2.1 AA standartlarına uygun (minimum 4.5:1)
- **Büyük Metin Kontrastı**: Minimum 3:1
- **UI Bileşenleri**: Minimum 3:1 kontrast oranı

### Klavye Navigasyonu
- Tüm etkileşimli öğeler için belirgin odaklanma göstergeleri
- Mantıksal sekme sırası
- Kısayol tuşları için özel ipuçları

### Sesli Okuyucu Uyumluluğu
- Tüm formlar ve etkileşimli bileşenler için ARIA etiketleri
- Anlamlı alt metinler ve açıklamalar
- İkon ve görsel öğeler için açıklayıcı metinler

## 10. Mobil Tasarım Özellikleri

### Dokunmatik Hedef Boyutları
- **Birincil Butonlar**: 48px x 48px minimum
- **Form Alanları**: 44px yükseklik minimum
- **Dokunmatik Hedefler Arası Mesafe**: Minimum 8px

### Mobil Özel Özellikler
- **Alt Navigasyon Çubuğu**: Kolay erişim için
- **Hızlı Hesaplama Kartları**: Yatay kaydırma ile
- **Sonuç Gösterge Paneli**: Yapışkan (sticky) başlık
- **Kaydırıcılar**: Dokunmatik cihazlar için optimizasyon

### Yönlendirme
- **Dikey Mod**: Tam özellikli deneyim
- **Yatay Mod**: Grafik ve hesaplama sonuçları için genişletilmiş görünüm