
import { partnerService } from '../src/modules/circular-partners/services/partnerService';
import { supabase } from '../src/lib/supabase';

// Mock Supabase Auth for RLS? No, we are using anon key which has Public Read policies.
// So we can fetch partners without logging in first.

async function testBackend() {
    console.log('🧪 Testing Real Backend Connectivity...');

    try {
        // 1. Fetch Partners
        console.log('\n--- Fetching All Partners ---');
        const partners = await partnerService.getPartners();
        console.log(`✅ Success! Retrieved ${partners.length} partners.`);

        if (partners.length > 0) {
            const p = partners[0];
            console.log('Sample Partner:', p.business_name);
            console.log('📍 Location:', p.location.city);
            console.log('📊 Metrics:', p.metrics.lifetime.total_kg, 'kg');
            console.log('🔗 Maps:', p.images.cover ? 'Image URL OK' : 'No Image');
        } else {
            console.warn('⚠️ No partners found. Did you run the seed?');
        }

        // 2. Fetch Single Partner details
        if (partners.length > 0) {
            console.log(`\n--- Fetching Details for ${partners[0].slug} ---`);
            const details = await partnerService.getPartnerBySlug(partners[0].slug);
            if (details) {
                console.log('✅ Details fetched successfully.');
                console.log('Category:', details.category);
                console.log('Tier:', details.tier);
            } else {
                console.error('❌ Failed to fetch partner details.');
            }
        }

    } catch (error) {
        console.error('❌ Backend Test Failed:', error);
    }
}

testBackend();
