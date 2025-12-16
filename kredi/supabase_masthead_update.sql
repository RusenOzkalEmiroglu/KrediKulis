-- Masthead tablosuna gösterim ve tıklanma sayılarını ekle
ALTER TABLE masthead 
ADD COLUMN IF NOT EXISTS impressions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS clicks INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_impression TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_click TIMESTAMP WITH TIME ZONE;

-- İstatistik güncellemeleri için fonksiyonlar
CREATE OR REPLACE FUNCTION increment_masthead_impression(masthead_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE masthead
  SET 
    impressions = impressions + 1,
    last_impression = NOW()
  WHERE id = masthead_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_masthead_click(masthead_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE masthead
  SET 
    clicks = clicks + 1,
    last_click = NOW()
  WHERE id = masthead_id;
END;
$$ LANGUAGE plpgsql;
