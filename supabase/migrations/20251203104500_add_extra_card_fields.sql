-- Add new columns to credit_cards table for extra cards functionality
ALTER TABLE public.credit_cards
ADD COLUMN IF NOT EXISTS card_type TEXT,
ADD COLUMN IF NOT EXISTS annual_fee NUMERIC,
ADD COLUMN IF NOT EXISTS extra_advantage TEXT,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
