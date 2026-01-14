/**
 * CircularLINK Partners Backend Test Script
 * 
 * Tests connectivity and data in Supabase tables:
 * - partner_categories
 * - partner_tiers
 * - circular_partners
 * - achievements
 * - redeemable_items
 * 
 * Usage: VITE_SUPABASE_URL=xxx VITE_SUPABASE_ANON_KEY=xxx npx tsx scripts/testCircularPartnersBackend.ts
 */

import { createClient } from '@supabase/supabase-js';

// Read from environment (set in terminal or .env.local via shell)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    console.log('   Required variables:');
    console.log('   - VITE_SUPABASE_URL');
    console.log('   - VITE_SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCircularPartnersBackend() {
    console.log('🧪 Testing CircularLINK Partners Backend...\n');
    console.log(`   Supabase URL: ${supabaseUrl?.substring(0, 30)}...`);
    console.log('');

    let success = true;

    // ==========================================
    // Test 1: partner_categories
    // ==========================================
    console.log('1️⃣  Testing partner_categories...');
    try {
        const { data: categories, error } = await supabase
            .from('partner_categories')
            .select('id, label, color_hex');

        if (error) {
            console.log(`   ❌ Error: ${error.message}`);
            success = false;
        } else if (categories && categories.length > 0) {
            console.log(`   ✅ Found ${categories.length} categories`);
            categories.slice(0, 3).forEach(c => {
                console.log(`      • ${c.label} (${c.id})`);
            });
            if (categories.length > 3) console.log(`      ... and ${categories.length - 3} more`);
        } else {
            console.log('   ⚠️  No categories found (table empty)');
        }
    } catch (e: any) {
        console.log(`   ❌ Exception: ${e.message}`);
        success = false;
    }

    // ==========================================
    // Test 2: partner_tiers
    // ==========================================
    console.log('\n2️⃣  Testing partner_tiers...');
    try {
        const { data: tiers, error } = await supabase
            .from('partner_tiers')
            .select('id, label, min_monthly_kg, color_hex')
            .order('min_monthly_kg');

        if (error) {
            console.log(`   ❌ Error: ${error.message}`);
            success = false;
        } else if (tiers && tiers.length > 0) {
            console.log(`   ✅ Found ${tiers.length} tiers`);
            tiers.forEach(t => {
                console.log(`      • ${t.label}: >${t.min_monthly_kg} kg/mes`);
            });
        } else {
            console.log('   ⚠️  No tiers found (table empty)');
        }
    } catch (e: any) {
        console.log(`   ❌ Exception: ${e.message}`);
        success = false;
    }

    // ==========================================
    // Test 3: circular_partners
    // ==========================================
    console.log('\n3️⃣  Testing circular_partners...');
    try {
        const { data: partners, error } = await supabase
            .from('circular_partners')
            .select('id, name, city, tier_id, total_collected_kg')
            .eq('status', 'active')
            .order('total_collected_kg', { ascending: false })
            .limit(10);

        if (error) {
            console.log(`   ❌ Error: ${error.message}`);
            success = false;
        } else if (partners && partners.length > 0) {
            console.log(`   ✅ Found ${partners.length} active partners`);
            console.log('   Top partners by kg collected:');
            partners.forEach((p, i) => {
                const tier = p.tier_id?.replace('tier_', '') || 'bronze';
                console.log(`      ${i + 1}. ${p.name} (${p.city}) - ${(p.total_collected_kg / 1000).toFixed(1)}t [${tier}]`);
            });
        } else {
            console.log('   ⚠️  No partners found (table empty)');
        }
    } catch (e: any) {
        console.log(`   ❌ Exception: ${e.message}`);
        success = false;
    }

    // ==========================================
    // Test 4: achievements
    // ==========================================
    console.log('\n4️⃣  Testing achievements...');
    try {
        const { data: achievements, error } = await supabase
            .from('achievements')
            .select('id, title, rarity, reward_seeds')
            .order('reward_seeds', { ascending: false });

        if (error) {
            console.log(`   ❌ Error: ${error.message}`);
            success = false;
        } else if (achievements && achievements.length > 0) {
            console.log(`   ✅ Found ${achievements.length} achievements`);
            const byRarity = achievements.reduce((acc: any, a) => {
                acc[a.rarity] = (acc[a.rarity] || 0) + 1;
                return acc;
            }, {});
            console.log(`      • Common: ${byRarity.common || 0}`);
            console.log(`      • Rare: ${byRarity.rare || 0}`);
            console.log(`      • Legendary: ${byRarity.legendary || 0}`);
        } else {
            console.log('   ⚠️  No achievements found (table empty)');
        }
    } catch (e: any) {
        console.log(`   ❌ Exception: ${e.message}`);
        success = false;
    }

    // ==========================================
    // Test 5: redeemable_items
    // ==========================================
    console.log('\n5️⃣  Testing redeemable_items...');
    try {
        const { data: items, error } = await supabase
            .from('redeemable_items')
            .select('id, title, cost_seeds, type, is_active')
            .eq('is_active', true)
            .order('cost_seeds');

        if (error) {
            console.log(`   ❌ Error: ${error.message}`);
            success = false;
        } else if (items && items.length > 0) {
            console.log(`   ✅ Found ${items.length} redeemable items`);
            items.slice(0, 5).forEach(item => {
                console.log(`      • ${item.title}: ${item.cost_seeds} seeds (${item.type})`);
            });
            if (items.length > 5) console.log(`      ... and ${items.length - 5} more`);
        } else {
            console.log('   ⚠️  No redeemable items found (table empty)');
        }
    } catch (e: any) {
        console.log(`   ❌ Exception: ${e.message}`);
        success = false;
    }

    // ==========================================
    // Summary
    // ==========================================
    console.log('\n' + '='.repeat(50));
    if (success) {
        console.log('✅ Backend test completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('   1. If tables are empty, run: db/seed_circular_partners.sql');
        console.log('   2. Open http://localhost:3000/partners to verify');
    } else {
        console.log('❌ Some tests failed.');
        console.log('\n📋 Troubleshooting:');
        console.log('   1. Check Supabase credentials in .env.local');
        console.log('   2. Ensure tables exist (run db/schema_circular_partners.sql)');
        console.log('   3. Check RLS policies allow public read');
    }
    console.log('='.repeat(50));
}

testCircularPartnersBackend().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
