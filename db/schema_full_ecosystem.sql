-- Enable PostGIS for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- ==========================================
-- 1. CORE & AUTH (Usuarios y Perfiles)
-- ==========================================
-- Extiende la tabla auth.users de Supabase
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user', -- 'admin', 'plant_owner', 'investor', 'buyer'
  company_id UUID, -- Link opcional a una empresa
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Empresas / Organizaciones
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tax_id TEXT,
  website TEXT,
  country TEXT,
  wallet_address TEXT, -- Para blockchain integration
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. RED GLOBAL & PLANTAS (Global Network)
-- ==========================================
CREATE TABLE plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft', 'pending_verification', 'verified', 'active', 'suspended'
  
  -- Location
  address TEXT,
  city TEXT,
  country TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  location GEOGRAPHY(POINT, 4326),
  
  -- Operations
  capacity_tons_day DECIMAL(10, 2),
  waste_types JSONB, -- Array de tipos de residuos
  products JSONB, -- Array de productos generados
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Onboarding de Plantas
CREATE TABLE plant_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'draft',
  current_step TEXT DEFAULT 'basic_info',
  form_state JSONB DEFAULT '{}'::JSONB, -- Todo el estado del wizard
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documentos de Plantas (Licencias, Permisos)
CREATE TABLE plant_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES plants(id),
  application_id UUID REFERENCES plant_applications(id),
  type TEXT, -- 'license', 'permit', 'lab_result'
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. MRV & IMPACTO (Emissions & Satellites)
-- ==========================================
-- Registros de Monitoreo (Satelital + IoT)
CREATE TABLE mrv_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES plants(id),
  record_date DATE NOT NULL,
  type TEXT NOT NULL, -- 'satellite_ndvi', 'satellite_methane', 'iot_sensor'
  data JSONB NOT NULL, -- { "mean": 0.45, "methane_ppb": 1800 }
  blockchain_hash TEXT, -- Hash de verificación
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Créditos de Carbono Generados
CREATE TABLE carbon_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES plants(id),
  vintage_year INTEGER,
  amount_tons DECIMAL(10, 2),
  status TEXT DEFAULT 'issued', -- 'issued', 'retired', 'sold'
  token_id TEXT, -- ID del token en blockchain
  certificate_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. TERRALINK (Parcelas y Suelo)
-- ==========================================
CREATE TABLE parcels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES plants(id), -- Planta que provee el fertilizante
  owner_name TEXT,
  crop_type TEXT, -- 'corn', 'avocado', etc.
  area_hectares DECIMAL(10, 2),
  
  -- Geospatial Poly
  boundaries GEOGRAPHY(POLYGON, 4326),
  
  is_control BOOLEAN DEFAULT FALSE, -- Si es parcela de control
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE soil_samples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcel_id UUID REFERENCES parcels(id),
  sample_date DATE,
  nitrogen DECIMAL,
  phosphorus DECIMAL,
  potassium DECIMAL,
  organic_matter DECIMAL,
  ph_level DECIMAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. MARKETPLACE (Venta de Productos)
-- ==========================================
CREATE TABLE market_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES plants(id), -- Vendedor
  product_type TEXT, -- 'dried_larvae', 'frass', 'carbon_credit'
  title TEXT NOT NULL,
  description TEXT,
  price_per_unit DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  available_quantity DECIMAL(10, 2),
  unit TEXT, -- 'kg', 'ton', 'credit'
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE market_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES profiles(id),
  listing_id UUID REFERENCES market_listings(id),
  quantity DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'shipped', 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 6. INVESTOR PORTAL (Inversiones)
-- ==========================================
CREATE TABLE investment_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL(15, 2),
  raised_amount DECIMAL(15, 2) DEFAULT 0,
  min_investment DECIMAL(10, 2),
  apy_percentage DECIMAL(5, 2), -- Retorno estimado
  status TEXT DEFAULT 'funding', -- 'funding', 'active', 'completed', 'repaying'
  plant_id UUID REFERENCES plants(id), -- Planta asociada (opcional)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  project_id UUID REFERENCES investment_projects(id),
  amount DECIMAL(15, 2),
  invested_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active'
);

-- ==========================================
-- 7. ALERTS & NOTIFICATIONS
-- ==========================================
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  type TEXT, -- 'methane_spike', 'production_drop', 'market_order'
  severity TEXT, -- 'info', 'warning', 'critical'
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB, -- Datos extra del evento
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Setup RLS (Basic Open Access for Dev)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Profiles" ON profiles FOR ALL USING (true);
-- (Repeat similar policies for all tables for dev mode, 
--  in prod use restrictive policies based on auth.uid())
