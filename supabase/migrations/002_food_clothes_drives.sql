-- Create food_clothes_drives table
CREATE TABLE IF NOT EXISTS public.food_clothes_drives (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  drive_type TEXT NOT NULL CHECK (drive_type IN ('food', 'clothes', 'both')),
  items_description TEXT NOT NULL,
  quantity TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  special_instructions TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS food_clothes_drives_status_idx ON public.food_clothes_drives (status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS food_clothes_drives_created_at_idx ON public.food_clothes_drives (created_at DESC);

-- Create index on email for searching
CREATE INDEX IF NOT EXISTS food_clothes_drives_email_idx ON public.food_clothes_drives (email);

-- Enable RLS
ALTER TABLE public.food_clothes_drives ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public can submit donations)
CREATE POLICY "Anyone can submit donation requests" ON public.food_clothes_drives
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow read access for admins (we'll check email manually)
CREATE POLICY "Admins can view all donations" ON public.food_clothes_drives
  FOR SELECT
  USING (true);

-- Create policy for updates by admins
CREATE POLICY "Allow updates to donation status" ON public.food_clothes_drives
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
