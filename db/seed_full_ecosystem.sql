-- DATA SEED FOR LARVALINK ECOSYSTEM
-- Run this AFTER schema_full_ecosystem.sql

-- 0. CLEANUP (Prevent Duplicates if run multiple times)
TRUNCATE TABLE companies, plants, profiles, market_listings, market_orders, investment_projects, user_investments, mrv_records, carbon_credits, parcels, soil_samples, plant_applications, plant_documents, alerts RESTART IDENTITY CASCADE;

-- 1. COMPANIES
INSERT INTO companies (id, name, country, website) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'LarvaLINK Global', 'Mexico', 'https://larvalink.bio'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'AgroInsects Colombia', 'Colombia', 'https://agroinsects.co'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', 'Kenya Biocycle', 'Kenya', NULL);

-- 2. PLANTS
INSERT INTO plants (id, company_id, name, status, city, country, latitude, longitude, capacity_tons_day, waste_types, products) VALUES
-- Papalotla (Active)
('11111111-1111-4111-8111-111111111111', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Planta Tepetloztoc', 'active', 'Tepetloztoc', 'Mexico', 19.575, -98.845, 50, '["agricultural", "market_waste"]', '["protein_meal", "frass", "oil"]'),
-- Xochimilco (Construction)
('22222222-2222-4222-8222-222222222222', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Xochimilco UNESCO', 'pending_verification', 'CDMX', 'Mexico', 19.27, -99.10, 20, '["aquatic_lily"]', '["frass"]'),
-- Colombia (Active Partner)
('33333333-3333-4333-8333-333333333333', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Medellín Hub', 'active', 'Medellín', 'Colombia', 6.24, -75.58, 15, '["fruit_waste"]', '["live_larvae"]');

-- 3. MARKETPLACE LISTINGS
INSERT INTO market_listings (plant_id, product_type, title, description, price_per_unit, currency, available_quantity, unit, status) VALUES
('11111111-1111-4111-8111-111111111111', 'dried_larvae', 'Larva Deshidratada Premium (50% Proteína)', 'Ideal para alimento de mascotas y acuacultura. Certificación HACCP.', 2500.00, 'USD', 5.0, 'ton', 'active'),
('11111111-1111-4111-8111-111111111111', 'frass', 'Biofertilizante LarvaLINK (Frass)', 'Fertilizante orgánico de alto impacto, rico en quitina.', 450.00, 'USD', 20.0, 'ton', 'active'),
('33333333-3333-4333-8333-333333333333', 'live_larvae', 'Larva Viva para Aves', 'Suministro local en Medellín para avicultura.', 1200.00, 'USD', 2.0, 'ton', 'active');

-- 4. INVESTMENT PROJECTS
INSERT INTO investment_projects (id, plant_id, title, description, target_amount, raised_amount, min_investment, apy_percentage, status) VALUES
('44444444-4444-4444-4444-444444444444', '22222222-2222-4222-8222-222222222222', 'Expansión Xochimilco - Fase 2', 'Infraestructura para procesar 20 toneladas adicionales de lirio acuático por día.', 150000.00, 45000.00, 1000.00, 18.5, 'funding'),
('55555555-5555-5555-5555-555555555555', '11111111-1111-4111-8111-111111111111', 'Automatización Tepetloztoc', 'Sistemas de climatización y alimentación automática para mejorar rendimiento en 15%.', 80000.00, 80000.00, 5000.00, 14.2, 'active');

-- 5. MRV RECORDS (Demo Data)
INSERT INTO mrv_records (plant_id, record_date, type, data, blockchain_hash) VALUES
('11111111-1111-4111-8111-111111111111', NOW() - INTERVAL '1 day', 'satellite_methane', '{"methane_ppb": 1850, "anomaly": false}', '0x8f2d...29a1'),
('11111111-1111-4111-8111-111111111111', NOW() - INTERVAL '2 days', 'iot_sensor', '{"temperature": 28.5, "humidity": 65}', '0x7b3c...11b2');

-- 6. CARBON CREDITS
INSERT INTO carbon_credits (plant_id, vintage_year, amount_tons, status, token_id) VALUES
('11111111-1111-4111-8111-111111111111', 2025, 150.00, 'issued', 'LL-CO2-2025-001'),
('11111111-1111-4111-8111-111111111111', 2025, 50.00, 'sold', 'LL-CO2-2025-002');

-- 7. NOTIFICATIONS
-- Assuming a generic demo, we don't link to specific user UUIDs yet, but store logic handles it.
-- This part is usually created by triggers or app logic.
