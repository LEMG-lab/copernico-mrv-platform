-- Seed Data for LarvaLINK MRV

-- 1. Create a demo company
INSERT INTO companies (id, name, country, website)
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'LarvaLINK Global', 'Mexico', 'https://larvalink.bio');

-- 2. Create the fixed locations from constants/locations.ts
INSERT INTO plants (id, company_id, name, status, city, country, latitude, longitude, operational_data, is_verified)
VALUES
-- Planta Papalotla (Operativa)
(
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Planta Tepetloztoc',
  'operativa',
  'Tepetloztoc',
  'Mexico',
  19.575,
  -98.845,
  '{
    "capacity_tons_day": 50,
    "co2eq_avoided_ytd": 1200,
    "waste_types": ["agricultural", "organic"],
    "products": ["protein_meal", "frass"]
  }',
  true
),
-- Xochimilco UNESCO (En Desarrollo)
(
  'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Xochimilco UNESCO',
  'construction',
  'Ciudad de Mexico',
  'Mexico',
  19.27,
  -99.10,
  '{
    "capacity_tons_day": 20,
    "description": "Procesamiento de lirio acuatico"
  }',
  false
),
-- Campeche (Planeada)
(
  'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Campeche',
  'planned',
  'Campeche',
  'Mexico',
  19.85,
  -90.55,
  '{
    "capacity_tons_day": 100,
    "description": "Zona de referencia para baseline"
  }',
  false
);

-- 3. Initial MRV Records (Simulated Satellite Data)
INSERT INTO mrv_records (plant_id, record_date, record_type, data, verification_status)
VALUES
(
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', -- Papalotla
  NOW(),
  'satellite_ndvi',
  '{"mean": 0.45, "max": 0.62, "cloud_cover": 12.5}'::JSONB,
  'verified'
);
