-- Enable PostGIS for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. COMPANIES (Organizations/Clients)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tax_id TEXT,
  website TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PLANTS (Physical Facilities)
CREATE TABLE plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft', 'pending_verification', 'verified', 'active', 'suspended', 'operative', 'construction', 'planned'
  
  -- Location (Structured)
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  
  -- Geospatial (Lat/Lng)
  -- Note: We store as standard columns for simplicity in frontend, but could use GEOGRAPHY(POINT)
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  location GEOGRAPHY(POINT, 4326), -- For spatial queries
  
  -- Operational Data (stored flexibly as JSONB)
  -- Includes: capacity_tons_day, waste_types, products, employees
  operational_data JSONB DEFAULT '{}'::JSONB,
  
  -- Sensors Config
  sensor_config JSONB DEFAULT '{}'::JSONB,
  
  -- Verification Metadata
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PLANT APPLICATIONS (Onboarding Process)
-- Stores the in-progress wizard state
CREATE TABLE plant_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID, -- Links to auth.users if available, otherwise nullable for public demo
  
  status TEXT DEFAULT 'draft', -- 'draft', 'submitted', 'under_review', 'approved', 'rejected'
  current_step TEXT DEFAULT 'basic_info',
  
  -- Stores the COMPLETE state of the wizard
  form_state JSONB DEFAULT '{}'::JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ
);

-- 4. MRV RECORDS (Monitoring & Verification)
CREATE TABLE mrv_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES plants(id),
  
  record_date DATE NOT NULL,
  record_type TEXT NOT NULL, -- 'satellite_ndvi', 'satellite_methane', 'iot_sensor', 'manual_report'
  
  -- The actual measurements
  data JSONB NOT NULL, 
  
  -- Verification
  blockchain_hash TEXT,
  verification_status TEXT DEFAULT 'pending',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DOCUMENTS (File References)
CREATE TABLE plant_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES plants(id),
  application_id UUID REFERENCES plant_applications(id), -- Optional link to onboarding
  
  document_type TEXT, -- 'license', 'permit', 'photo', 'lab_result'
  file_name TEXT,
  file_url TEXT, -- Storage path
  file_size INTEGER,
  
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES (Row Level Security) - Basic Setup
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE plant_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE mrv_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE plant_documents ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for development (WARNING: Secure this before production!)
CREATE POLICY "Public Access" ON companies FOR ALL USING (true);
CREATE POLICY "Public Access" ON plants FOR ALL USING (true);
CREATE POLICY "Public Access" ON plant_applications FOR ALL USING (true);
CREATE POLICY "Public Access" ON mrv_records FOR ALL USING (true);
CREATE POLICY "Public Access" ON plant_documents FOR ALL USING (true);
