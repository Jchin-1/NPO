/**
 * Supabase Database Schema for NPO Website
 * 
 * This file contains the SQL schema for the PostgreSQL database
 * Run these queries in your Supabase SQL editor to set up the tables
 */

-- Create snow_requests table
CREATE TABLE IF NOT EXISTS public.snow_requests (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Request Information
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('high', 'medium', 'standard')),

  -- Status Tracking
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in-progress', 'completed', 'cancelled')),
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  service_date DATE
);

-- Create indexes for better query performance
CREATE INDEX idx_snow_requests_status ON public.snow_requests(status);
CREATE INDEX idx_snow_requests_priority ON public.snow_requests(priority);
CREATE INDEX idx_snow_requests_created_at ON public.snow_requests(created_at DESC);
CREATE INDEX idx_snow_requests_service_date ON public.snow_requests(service_date);

-- Create volunteers table (optional - for volunteer management)
CREATE TABLE IF NOT EXISTS public.volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  availability TEXT, -- JSON or comma-separated days
  skills TEXT, -- JSON or comma-separated skills
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_log table for tracking service requests
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES public.snow_requests(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS (Row Level Security) policies
ALTER TABLE public.snow_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert new requests
CREATE POLICY "Enable insert for all users" ON public.snow_requests
  FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can view their own requests (if you add user_id field later)
CREATE POLICY "Enable read access for authenticated users" ON public.snow_requests
  FOR SELECT
  USING (true);

-- Policy: Staff can update requests
CREATE POLICY "Enable update for authenticated users" ON public.snow_requests
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_snow_requests_updated_at BEFORE UPDATE
  ON public.snow_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteers_updated_at BEFORE UPDATE
  ON public.volunteers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
