-- Masthead tablosuna gerekli sütunları ekle
ALTER TABLE masthead 
ADD COLUMN IF NOT EXISTS impressions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS clicks INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_impression TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_click TIMESTAMP WITH TIME ZONE;

-- Mevcut kayıtları sıfır değerleriyle güncelle
UPDATE masthead SET impressions = 0, clicks = 0 WHERE impressions IS NULL OR clicks IS NULL;
