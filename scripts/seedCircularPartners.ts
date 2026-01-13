
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import data
import { MOCK_PARTNERS } from '../src/modules/circular-partners/data/mockPartners';
import { PARTNER_CATEGORIES } from '../src/modules/circular-partners/data/partnerCategories';
import { TIER_CONFIG } from '../src/modules/circular-partners/data/tierConfig';
import { CONSUMER_ACHIEVEMENTS } from '../src/modules/circular-partners/data/achievementsConfig';
import { REDEEMABLE_ITEMS } from '../src/modules/circular-partners/data/seedsConfig';

// Load env vars manually since we are outside Vite context often
const loadEnv = () => {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const envPath = path.resolve(__dirname, '../.env');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const env: Record<string, string> = {};
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                env[key.trim()] = value.trim();
            }
        });
        return env;
    } catch (e) {
        console.warn('Could not load .env file manually, relying on process.env');
        return {};
    }
};

const env = { ...process.env, ...loadEnv() };
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log('🌱 Starting seed of CircularLINK Partners data...');

    // 1. Categories
    console.log('... Seeding Partner Categories');
    for (const [id, cat] of Object.entries(PARTNER_CATEGORIES)) {
        const { error } = await supabase.from('partner_categories').upsert({
            id: id,
            label: cat.name, // Fixed: cat.name (Reference: partnerCategories.ts has 'name' not 'label' in config object, but DB expects 'label')
            icon_name: cat.icon, // Fixed: cat.icon
            color_hex: cat.color
        });
        if (error) console.error(`Error seeding category ${id}:`, error.message);
    }

    // 2. Tiers
    console.log('... Seeding Partner Tiers');
    for (const [id, tier] of Object.entries(TIER_CONFIG)) {
        const { error } = await supabase.from('partner_tiers').upsert({
            id: id,
            label: tier.name, // Fixed: tier.name
            min_monthly_kg: tier.min_kg_month, // Fixed: tier.min_kg_month
            multiplier: 1.0, // Default multiplier not in config, assuming 1.0 or use TIER_XP_MULTIPLIERS logic if needed
            color_hex: tier.color
        });
        if (error) console.error(`Error seeding tier ${id}:`, error.message);
    }

    // 3. Achievements
    console.log('... Seeding Achievements');
    for (const ach of CONSUMER_ACHIEVEMENTS) {
        const metricType = Object.keys(ach.criteria)[0];
        const targetValue = Object.values(ach.criteria)[0];

        const { error } = await supabase.from('achievements').upsert({
            id: ach.id,
            title: ach.name, // Fixed: ach.name (AchievementConfig has 'name' -> DB 'title')
            description: ach.description,
            icon_url: ach.icon, // Fixed: ach.icon
            rarity: ach.rarity,
            target_value: targetValue,
            metric_type: metricType,
            reward_xp: ach.xp_reward,
            reward_seeds: ach.seeds_reward
        });
        if (error) console.error(`Error seeding achievement ${ach.id}:`, error.message);
    }

    // 4. Rewards
    console.log('... Seeding Redeemable Items');
    for (const item of REDEEMABLE_ITEMS) {
        const { error } = await supabase.from('redeemable_items').upsert({
            id: item.id,
            title: item.name,
            description: item.description,
            image_url: item.image_url,
            cost_seeds: item.seeds_cost,
            type: item.category,
            provider_name: item.partner_name || 'LarvaLINK',
            is_active: true,
            stock_quantity: item.quantity_available
        });
        if (error) console.error(`Error seeding item ${item.id}:`, error.message);
    }

    // 5. Partners
    console.log('... Seeding Partners');
    for (const partner of MOCK_PARTNERS) {
        const { error } = await supabase.from('circular_partners').upsert({
            id: partner.id,
            slug: partner.slug,
            name: partner.trade_name,
            category_id: partner.category,
            tier_id: partner.tier,
            status: partner.status,
            is_verified: true,

            // Location
            address: partner.location.address,
            city: partner.location.city,
            state: partner.location.state,
            postal_code: partner.location.postal_code,
            latitude: partner.location.coordinates.lat,
            longitude: partner.location.coordinates.lng,

            // Branding
            logo_url: partner.images.logo,
            cover_url: partner.images.cover,
            description: partner.description,

            // Helpers
            wallet_address: partner.blockchain.wallet_address,
            customer_incentive: partner.customer_incentive ? JSON.stringify(partner.customer_incentive) : null,

            // Metrics
            total_collected_kg: partner.metrics.lifetime.total_kg,
            monthly_average_kg: partner.metrics.averages.kg_per_delivery * 4 // approx
        });
        if (error) console.error(`Error seeding partner ${partner.slug}:`, error.message);
    }

    console.log('✅ Seeding completed!');
}

seed().catch(console.error);
