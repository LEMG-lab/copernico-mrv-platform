-- CircularLINK Partners & Gamification Module Schema
-- 1. PROFILES (Consumers)
-- Extends the default Supabase auth.users table
-- 1. PROFILES (Consumers)
-- Extends the existing profiles table from LarvaLINK-MRV
DO $$ BEGIN -- Add gamification columns if they don't exist
IF NOT EXISTS (
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
-- 2. PARTNER CONFIG (Lookups)
create table if not exists partner_categories (
    id text primary key,
    -- e.g., 'restaurant', 'hotel'
    label text not null,
    icon_name text,
    color_hex text
);
create table if not exists partner_tiers (
    id text primary key,
    -- 'bronze', 'silver', 'gold', 'platinum', 'champion'
    label text not null,
    min_monthly_kg integer not null,
    multiplier numeric(3, 2) default 1.0,
    -- Seeds multiplier (e.g. 1.25x)
    color_hex text
);
-- 3. PARTNERS (Commercial Entities)
create table if not exists circular_partners (
    id text primary key,
    slug text unique not null,
    name text not null,
    category_id text references partner_categories(id),
    -- Branding
    logo_url text,
    cover_url text,
    description text,
    -- Status
    tier_id text references partner_tiers(id) default 'bronze',
    is_verified boolean default false,
    status text default 'active',
    -- 'active', 'inactive', 'pending'
    -- Location
    address text,
    city text,
    state text,
    postal_code text,
    latitude numeric(10, 8),
    longitude numeric(11, 8),
    google_place_id text,
    -- Metrics (Aggregated for performance)
    total_collected_kg numeric(12, 2) default 0,
    monthly_average_kg numeric(10, 2) default 0,
    last_collection_date timestamptz,
    -- Blockchain
    wallet_address text,
    -- Config
    customer_incentive text,
    -- e.g., "10% de descuento en consumo"
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
-- 4. SEEDS TRANSACTIONS (Ledger)
create table if not exists seeds_transactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id),
    partner_id text references circular_partners(id),
    -- Optional, if earned at a partner
    amount integer not null,
    -- Positive for earn, negative for spend
    type text not null,
    -- 'earn_scan', 'earn_bonus', 'spend_reward', 'spend_donation', 'adjustment'
    description text,
    balance_after integer,
    -- Snapshot for audit
    metadata jsonb default '{}'::jsonb,
    -- Store specific details
    created_at timestamptz default now()
);
-- 5. GAMIFICATION (Achievements)
create table if not exists achievements (
    id text primary key,
    -- e.g., 'early_adopter', 'recycling_hero_1'
    title text not null,
    description text,
    icon_url text,
    rarity text default 'common',
    -- 'common', 'rare', 'epic', 'legendary'
    -- Criteria
    target_value integer,
    metric_type text,
    -- 'scans', 'kg', 'partners_visited', 'referrals'
    reward_xp integer default 0,
    reward_seeds integer default 0
);
create table if not exists user_achievements (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id),
    achievement_id text references achievements(id),
    unlocked_at timestamptz default now(),
    progress_value integer default 0,
    -- Store current progress if partially completed logic is moved to DB
    is_viewed boolean default false -- For notification badge
);
-- 6. REWARDS & REDEMPTIONS
create table if not exists redeemable_items (
    id text primary key,
    title text not null,
    description text,
    image_url text,
    cost_seeds integer not null,
    type text not null,
    -- 'discount', 'product', 'donation', 'experience'
    provider_name text,
    -- 'Starbucks', 'LarvaLINK', 'WWF'
    is_active boolean default true,
    stock_quantity integer,
    -- Null for infinite
    created_at timestamptz default now()
);
create table if not exists redemptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id),
    item_id text references redeemable_items(id),
    cost_seeds integer not null,
    status text default 'completed',
    -- 'pending', 'completed', 'refunded'
    redemption_code text,
    -- Generated code for user to show
    verified_at timestamptz,
    created_at timestamptz default now()
);
-- 7. SCANS (Security & Analytics)
create table if not exists qr_scans (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id),
    partner_id text references circular_partners(id),
    qr_code_id text,
    -- ID encoded in the QR
    location_lat numeric(10, 8),
    location_lng numeric(11, 8),
    device_info jsonb,
    is_valid boolean default true,
    failure_reason text,
    seeds_awarded integer default 0,
    created_at timestamptz default now()
);
-- RLS POLICIES (Preliminary)
alter table profiles enable row level security;
alter table circular_partners enable row level security;
alter table seeds_transactions enable row level security;
alter table user_achievements enable row level security;
alter table redemptions enable row level security;
alter table qr_scans enable row level security;
-- Drop existing policies to ensure idempotency
drop policy if exists "Public Read Partners" on circular_partners;
drop policy if exists "Public Read Configs" on partner_categories;
drop policy if exists "Public Read Tiers" on partner_tiers;
drop policy if exists "Public Read Rewards" on redeemable_items;
drop policy if exists "Public Read Achievements" on achievements;
drop policy if exists "Users can read own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Users read own transactions" on seeds_transactions;
drop policy if exists "Users read own achievements" on user_achievements;
drop policy if exists "Users read own redemptions" on redemptions;
-- Public Read Policies (for dev/demo)
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
-- User Private Policies
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