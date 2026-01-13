-- ==========================================
-- RESET SCHEMA FOR CIRCULARLINK PARTNERS
-- (RUN THIS TO FIX UUID/TEXT ID CONFLICTS)
-- ==========================================
-- 1. DROP EXISTING TABLES (In correct order of dependencies)
DROP TABLE IF EXISTS qr_scans CASCADE;
DROP TABLE IF EXISTS redemptions CASCADE;
DROP TABLE IF EXISTS redeemable_items CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS seeds_transactions CASCADE;
DROP TABLE IF EXISTS circular_partners CASCADE;
DROP TABLE IF EXISTS partner_tiers CASCADE;
DROP TABLE IF EXISTS partner_categories CASCADE;
-- 1b. DROP EXISTING POLICIES ON SHARED TABLES
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
-- 2. CREATE EXTENSIONS (If needed)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 3. PROFILES EXTENSION
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
        AND column_name = 'username'
) THEN
ALTER TABLE profiles
ADD COLUMN username text unique;
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
        AND column_name = 'email'
) THEN
ALTER TABLE profiles
ADD COLUMN email text;
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
        AND column_name = 'level'
) THEN
ALTER TABLE profiles
ADD COLUMN level integer default 1;
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
        AND column_name = 'current_xp'
) THEN
ALTER TABLE profiles
ADD COLUMN current_xp integer default 0;
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
        AND column_name = 'seeds_balance'
) THEN
ALTER TABLE profiles
ADD COLUMN seeds_balance integer default 0;
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
        AND column_name = 'lifetime_seeds_earned'
) THEN
ALTER TABLE profiles
ADD COLUMN lifetime_seeds_earned integer default 0;
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
        AND column_name = 'total_kg_diverted'
) THEN
ALTER TABLE profiles
ADD COLUMN total_kg_diverted numeric(10, 2) default 0;
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
        AND column_name = 'co2_avoided_kg'
) THEN
ALTER TABLE profiles
ADD COLUMN co2_avoided_kg numeric(10, 2) default 0;
END IF;
END $$;
-- 4. CREATE TABLES (With TEXT IDs for mock data compatibility)
-- Partner Categories
create table partner_categories (
    id text primary key,
    label text not null,
    icon_name text,
    color_hex text
);
-- Partner Tiers
create table partner_tiers (
    id text primary key,
    label text not null,
    min_monthly_kg integer not null,
    multiplier numeric(3, 2) default 1.0,
    color_hex text
);
-- Partners
create table circular_partners (
    id text primary key,
    -- Text ID to match 'partner-001'
    slug text unique not null,
    name text not null,
    category_id text references partner_categories(id),
    logo_url text,
    cover_url text,
    description text,
    tier_id text references partner_tiers(id) default 'bronze',
    is_verified boolean default false,
    status text default 'active',
    address text,
    city text,
    state text,
    postal_code text,
    latitude numeric(10, 8),
    longitude numeric(11, 8),
    google_place_id text,
    total_collected_kg numeric(12, 2) default 0,
    monthly_average_kg numeric(10, 2) default 0,
    last_collection_date timestamptz,
    wallet_address text,
    customer_incentive text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
-- Seeds Transactions
create table seeds_transactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id),
    partner_id text references circular_partners(id),
    amount integer not null,
    type text not null,
    description text,
    balance_after integer,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now()
);
-- Achievements
create table achievements (
    id text primary key,
    title text not null,
    description text,
    icon_url text,
    rarity text default 'common',
    target_value integer,
    metric_type text,
    reward_xp integer default 0,
    reward_seeds integer default 0
);
-- User Achievements
create table user_achievements (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id),
    achievement_id text references achievements(id),
    unlocked_at timestamptz default now(),
    progress_value integer default 0,
    is_viewed boolean default false
);
-- Redeemable Items
create table redeemable_items (
    id text primary key,
    -- Text ID to match 'discount-10'
    title text not null,
    description text,
    image_url text,
    cost_seeds integer not null,
    type text not null,
    provider_name text,
    is_active boolean default true,
    stock_quantity integer,
    created_at timestamptz default now()
);
-- Redemptions
create table redemptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id),
    item_id text references redeemable_items(id),
    cost_seeds integer not null,
    status text default 'completed',
    redemption_code text,
    verified_at timestamptz,
    created_at timestamptz default now()
);
-- Scans
create table qr_scans (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id),
    partner_id text references circular_partners(id),
    qr_code_id text,
    location_lat numeric(10, 8),
    location_lng numeric(11, 8),
    device_info jsonb,
    is_valid boolean default true,
    failure_reason text,
    seeds_awarded integer default 0,
    created_at timestamptz default now()
);
-- 5. RLS POLICIES
alter table profiles enable row level security;
alter table circular_partners enable row level security;
alter table seeds_transactions enable row level security;
alter table user_achievements enable row level security;
alter table redemptions enable row level security;
alter table qr_scans enable row level security;
-- Public Access Policies
create policy "Public Read Partners" on circular_partners for
select using (true);
create policy "Public Read Configs" on partner_categories for
select using (true);
create policy "Public Read Tiers" on partner_tiers for
select using (true);
create policy "Public Read Rewards" on redeemable_items for
select using (true);
create policy "Public Read Achievements" on achievements for
select using (true);
-- User Access Policies
create policy "Users can read own profile" on profiles for
select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for
update using (auth.uid() = id);
create policy "Users read own transactions" on seeds_transactions for
select using (auth.uid() = user_id);
create policy "Users read own achievements" on user_achievements for
select using (auth.uid() = user_id);
create policy "Users read own redemptions" on redemptions for
select using (auth.uid() = user_id);