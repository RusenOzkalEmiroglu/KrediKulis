-- Add bsmv_rate and kkdf_rate to banks table if they don't exist
ALTER TABLE banks ADD COLUMN IF NOT EXISTS bsmv_rate numeric;
ALTER TABLE banks ADD COLUMN IF NOT EXISTS kkdf_rate numeric;

-- Update all banks to have the standard rates
UPDATE banks SET bsmv_rate = 5, kkdf_rate = 15;

-- Drop bsmv and kkdf from consumer_loans table if they exist
ALTER TABLE consumer_loans DROP COLUMN IF EXISTS bsmv;
ALTER TABLE consumer_loans DROP COLUMN IF EXISTS kkdf;
