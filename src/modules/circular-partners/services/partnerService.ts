/**
 * CircularLINK Partner Service
 * Connects to Supabase with mock data fallback
 * 
 * @description Fetches partner data from Supabase, falls back to MOCK_PARTNERS if unavailable
 * @version 2.0.0
 * @date 2026-01-13
 */

import { supabase } from '../../../lib/supabase';
import { Partner, NetworkStats } from '../types/partners.types';
import { MOCK_PARTNERS, NETWORK_STATS } from '../data/mockPartners';
import { PARTNER_CATEGORIES } from '../data/partnerCategories';
import { TIER_CONFIG } from '../data/tierConfig';

class PartnerService {

    /**
     * Fetch all active partners
     * Falls back to MOCK_PARTNERS if Supabase fails or returns empty
     */
    async getPartners(filters?: { category?: string; tier?: string; search?: string }): Promise<Partner[]> {
        try {
            let query = supabase
                .from('circular_partners')
                .select(`
                    *,
                    category:partner_categories(*),
                    tier:partner_tiers(*)
                `)
                .eq('status', 'active')
                .order('total_collected_kg', { ascending: false });

            // Apply filters if provided
            if (filters?.category && filters.category !== 'all') {
                query = query.eq('category_id', `cat_${filters.category}`);
            }
            if (filters?.tier && filters.tier !== 'all') {
                query = query.eq('tier_id', `tier_${filters.tier}`);
            }
            if (filters?.search) {
                query = query.ilike('name', `%${filters.search}%`);
            }

            const { data, error } = await query;

            if (error) {
                console.warn('Supabase error, using mock data:', error.message);
                return this.filterMockPartners(filters);
            }

            if (data && data.length > 0) {
                console.log(`Loaded ${data.length} partners from Supabase`);
                return data.map(item => this.mapDbToPartner(item));
            }

            // Fallback to mock data
            console.log('No partners in DB, using mock data');
            return this.filterMockPartners(filters);

        } catch (error) {
            console.error('Error fetching partners:', error);
            return this.filterMockPartners(filters);
        }
    }

    /**
     * Get a single partner by slug
     */
    async getPartnerBySlug(slug: string): Promise<Partner | null> {
        try {
            const { data, error } = await supabase
                .from('circular_partners')
                .select(`
                    *,
                    category:partner_categories(*),
                    tier:partner_tiers(*)
                `)
                .eq('slug', slug)
                .single();

            if (error) {
                console.warn('Partner not found in DB, checking mock:', slug);
                return MOCK_PARTNERS.find(p => p.slug === slug) || null;
            }

            if (data) {
                return this.mapDbToPartner(data);
            }

            return MOCK_PARTNERS.find(p => p.slug === slug) || null;

        } catch (error) {
            console.error('Error fetching partner by slug:', error);
            return MOCK_PARTNERS.find(p => p.slug === slug) || null;
        }
    }

    /**
     * Get partner by QR short code
     */
    async getPartnerByQRCode(code: string): Promise<Partner | null> {
        const upperCode = code.toUpperCase();

        try {
            // First try matching the partner ID pattern
            const { data, error } = await supabase
                .from('circular_partners')
                .select(`
                    *,
                    category:partner_categories(*),
                    tier:partner_tiers(*)
                `)
                .or(`id.eq.${code},slug.ilike.%${code.toLowerCase()}%`)
                .single();

            if (error || !data) {
                // Fallback to mock by qr_short_code
                const mockPartner = MOCK_PARTNERS.find(
                    p => p.qr_short_code?.toUpperCase() === upperCode
                );
                return mockPartner || null;
            }

            return this.mapDbToPartner(data);

        } catch (error) {
            console.error('Error fetching partner by QR:', error);
            const mockPartner = MOCK_PARTNERS.find(
                p => p.qr_short_code?.toUpperCase() === upperCode
            );
            return mockPartner || null;
        }
    }

    /**
     * Get partner categories
     */
    async getCategories(): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('partner_categories')
                .select('*')
                .order('label');

            if (error || !data || data.length === 0) {
                return Object.entries(PARTNER_CATEGORIES).map(([key, value]) => ({
                    id: `cat_${key}`,
                    slug: key,
                    ...value
                }));
            }

            return data;

        } catch (error) {
            console.error('Error fetching categories:', error);
            return Object.entries(PARTNER_CATEGORIES).map(([key, value]) => ({
                id: `cat_${key}`,
                slug: key,
                ...value
            }));
        }
    }

    /**
     * Get partner tiers
     */
    async getTiers(): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('partner_tiers')
                .select('*')
                .order('min_monthly_kg');

            if (error || !data || data.length === 0) {
                return Object.entries(TIER_CONFIG).map(([key, value]) => ({
                    id: `tier_${key}`,
                    slug: key,
                    ...value
                }));
            }

            return data;

        } catch (error) {
            console.error('Error fetching tiers:', error);
            return Object.entries(TIER_CONFIG).map(([key, value]) => ({
                id: `tier_${key}`,
                slug: key,
                ...value
            }));
        }
    }

    /**
     * Get network-wide statistics
     */
    async getNetworkStats(): Promise<NetworkStats> {
        try {
            const { data, error } = await supabase
                .from('circular_partners')
                .select('total_collected_kg, monthly_average_kg')
                .eq('status', 'active');

            if (error || !data || data.length === 0) {
                return NETWORK_STATS;
            }

            const totalPartners = data.length;
            const totalCollectedKg = data.reduce((sum, p) => sum + (p.total_collected_kg || 0), 0);
            const totalCO2Avoided = totalCollectedKg * 1.8; // Conversion factor

            return {
                ...NETWORK_STATS,
                total_partners: totalPartners,
                active_partners: totalPartners,
                total_kg_collected: totalCollectedKg,
                total_co2_avoided_kg: totalCO2Avoided,
            };

        } catch (error) {
            console.error('Error fetching network stats:', error);
            return NETWORK_STATS;
        }
    }

    /**
     * Get achievements list
     */
    async getAchievements(): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .order('reward_seeds', { ascending: false });

            if (error || !data || data.length === 0) {
                // Return empty array or mock achievements
                return [];
            }

            return data;

        } catch (error) {
            console.error('Error fetching achievements:', error);
            return [];
        }
    }

    /**
     * Get redeemable items catalog
     */
    async getRedeemableItems(): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('redeemable_items')
                .select('*')
                .eq('is_active', true)
                .order('cost_seeds');

            if (error || !data || data.length === 0) {
                return [];
            }

            return data;

        } catch (error) {
            console.error('Error fetching redeemable items:', error);
            return [];
        }
    }

    // ==========================================
    // PRIVATE HELPER METHODS
    // ==========================================

    /**
     * Filter mock partners based on provided filters
     */
    private filterMockPartners(filters?: { category?: string; tier?: string; search?: string }): Partner[] {
        let data = [...MOCK_PARTNERS];

        if (filters?.category && filters.category !== 'all') {
            data = data.filter(p => p.category === filters.category);
        }
        if (filters?.tier && filters.tier !== 'all') {
            data = data.filter(p => p.tier === filters.tier);
        }
        if (filters?.search) {
            const q = filters.search.toLowerCase();
            data = data.filter(p =>
                p.trade_name.toLowerCase().includes(q) ||
                p.location.city.toLowerCase().includes(q)
            );
        }

        return data;
    }

    /**
     * Map Supabase DB row to Partner type
     */
    private mapDbToPartner(dbRow: any): Partner {
        // Extract tier slug from tier_id (e.g., 'tier_gold' -> 'gold')
        const tierSlug = dbRow.tier?.id?.replace('tier_', '') ||
            dbRow.tier_id?.replace('tier_', '') ||
            'bronze';

        // Extract category slug
        const categorySlug = dbRow.category?.id?.replace('cat_', '') ||
            dbRow.category_id?.replace('cat_', '') ||
            'other';

        const totalKg = dbRow.total_collected_kg || 0;
        const monthlyKg = dbRow.monthly_average_kg || 0;
        const co2Avoided = totalKg * 1.8; // 1.8 kg CO2 per kg waste

        return {
            id: dbRow.id,
            slug: dbRow.slug,
            business_name: dbRow.name || dbRow.business_name || '',
            trade_name: dbRow.name || dbRow.trade_name || '',
            tax_id: 'XXX010101000',
            description: dbRow.description || '',
            category: categorySlug,
            status: dbRow.status || 'active',
            tier: tierSlug,
            verified_at: dbRow.is_verified ? dbRow.created_at : undefined,
            certificate_number: `CL-${new Date().getFullYear()}-${dbRow.id?.slice(-5) || '00001'}`,
            qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://larvalink.com/scan/${dbRow.slug}`,
            qr_short_code: dbRow.slug?.toUpperCase().replace(/-/g, '').slice(0, 8) || 'PARTNER',
            public_profile_url: `/partners/${dbRow.slug}`,

            location: {
                address: dbRow.address || '',
                city: dbRow.city || '',
                state: dbRow.state || '',
                country: dbRow.country || 'México',
                postal_code: dbRow.postal_code || '',
                neighborhood: '',
                coordinates: {
                    lat: dbRow.latitude || 19.4326,
                    lng: dbRow.longitude || -99.1332
                },
                timezone: 'America/Mexico_City'
            },

            contact: {
                primary: {
                    name: 'Gerente General',
                    role: 'manager',
                    email: `contacto@${dbRow.slug?.split('-')[0] || 'partner'}.com`,
                    phone: '+52 55 0000 0000'
                }
            },

            operations: {
                employees: 20,
                operating_hours: '8:00 AM - 10:00 PM',
                operating_days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                avg_daily_waste_kg: monthlyKg / 30,
                waste_types: ['kitchen_prep', 'fruits_vegetables'],
                collection_frequency: 'daily'
            },

            digital: {
                website: dbRow.website,
                instagram: dbRow.instagram
            },

            metrics: {
                current_month: {
                    deliveries: 28,
                    total_kg: monthlyKg,
                    co2_avoided_kg: monthlyKg * 1.8,
                    scans: 150,
                    donations_received: 10,
                    donations_amount: 2000
                },
                lifetime: {
                    deliveries: Math.floor(totalKg / (monthlyKg || 1)),
                    total_kg: totalKg,
                    co2_avoided_kg: co2Avoided,
                    trees_equivalent: Math.floor(co2Avoided / 22),
                    cars_off_road_days: Math.floor(co2Avoided / 8),
                    meals_equivalent: Math.floor(totalKg * 2),
                    water_saved_liters: Math.floor(totalKg * 10),
                    scans: 1500,
                    unique_scanners: 800,
                    donations_count: 50,
                    donations_amount: 15000
                },
                yearly: [],
                monthly: [],
                averages: {
                    kg_per_delivery: monthlyKg / 28,
                    deliveries_per_week: 7,
                    kg_per_employee: totalKg / 20
                },
                streak: {
                    current_weeks: 26,
                    best_weeks: 26,
                    consistency_score: 95
                },
                rankings: {
                    city_rank: 5,
                    city_total: 50,
                    category_rank: 3,
                    category_total: 20,
                    national_rank: 25,
                    national_total: 127
                }
            },

            gamification: {
                level: Math.floor(totalKg / 1000) + 1,
                level_name: totalKg > 100000 ? 'Leyenda' : totalKg > 10000 ? 'Champion' : 'Activo',
                xp_current: totalKg * 2,
                xp_next_level: (Math.floor(totalKg / 1000) + 2) * 1000,
                achievements: [],
                badges: [],
                challenges_completed: 10,
                challenges_active: [],
                partner_of_month_count: 0
            },

            benefits: {
                discount_percentage: tierSlug === 'champion' ? 20 : tierSlug === 'platinum' ? 15 : tierSlug === 'gold' ? 10 : tierSlug === 'silver' ? 5 : 0,
                free_collections_remaining: 0,
                priority_collection: ['platinum', 'champion'].includes(tierSlug),
                dedicated_account_manager: ['platinum', 'champion'].includes(tierSlug),
                custom_reports: ['gold', 'platinum', 'champion'].includes(tierSlug),
                api_access: ['platinum', 'champion'].includes(tierSlug),
                white_label_certificate: tierSlug === 'champion',
                credits_balance: Math.floor(totalKg / 10)
            },

            referrals: {
                code: `REF${dbRow.slug?.toUpperCase().slice(0, 4) || 'XXXX'}`,
                referred_count: 0,
                earned_credits: 0
            },

            blockchain: {
                wallet_address: dbRow.wallet_address || '0x0000000000000000000000000000000000000000',
                first_transaction: dbRow.created_at,
                total_transactions: Math.floor(totalKg / 100),
                last_transaction: dbRow.updated_at || dbRow.created_at,
                verification_hash: `0x${Math.random().toString(16).slice(2, 10)}...`
            },

            images: {
                logo: dbRow.logo_url || 'https://placehold.co/200x200/2ECC71/white?text=Partner',
                cover: dbRow.cover_url || 'https://placehold.co/800x400/2ECC71/white?text=Cover',
                storefront: dbRow.cover_url
            },

            subscription: {
                plan: tierSlug === 'champion' ? 'enterprise' : tierSlug === 'platinum' ? 'professional' : 'growth',
                status: 'active',
                current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                price_monthly: tierSlug === 'champion' ? 4999 : tierSlug === 'platinum' ? 2499 : 999
            },

            registered_at: dbRow.created_at
        };
    }
}

export const partnerService = new PartnerService();
export default partnerService;
