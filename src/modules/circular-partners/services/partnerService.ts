import { supabase } from '../../../lib/supabase';
import { Partner, PartnerCategory } from '../types/partners.types';
import { MOCK_PARTNERS } from '../data/mockPartners';

const USE_MOCK = false; // Toggle this to switch between Mock and Real DB

export const partnerService = {
    /**
     * Fetch all partners with optional filters
     */
    async getPartners(filters?: { category?: string, tier?: string, search?: string }): Promise<Partner[]> {
        if (USE_MOCK) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

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
                    p.business_name.toLowerCase().includes(q) ||
                    p.location.city.toLowerCase().includes(q)
                );
            }
            return data;
        }

        // Real Supabase Implementation
        let query = supabase
            .from('circular_partners')
            .select(`
                *,
                category:partner_categories(*),
                tier:partner_tiers(*)
            `);

        if (filters?.category && filters.category !== 'all') {
            query = query.eq('category_id', filters.category);
        }
        if (filters?.tier && filters.tier !== 'all') {
            query = query.eq('tier_id', filters.tier);
        }
        if (filters?.search) {
            query = query.ilike('name', `%${filters.search}%`);
        }

        const { data, error } = await query;
        if (error) throw error;

        return (data as any[]).map(mapDbPartnerToApp);
    },

    /**
     * Get single partner by slug
     */
    async getPartnerBySlug(slug: string): Promise<Partner | null> {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return MOCK_PARTNERS.find(p => p.slug === slug) || null;
        }

        const { data, error } = await supabase
            .from('circular_partners')
            .select(`
                *,
                category:partner_categories(*),
                tier:partner_tiers(*)
            `)
            .eq('slug', slug)
            .single();

        if (error || !data) return null;
        return mapDbPartnerToApp(data);
    }
};

// Helper: Map Flat DB structure to Nested App Structure
const mapDbPartnerToApp = (dbPartner: any): Partner => {
    return {
        id: dbPartner.id,
        slug: dbPartner.slug,
        business_name: dbPartner.name, // Mapping name to business_name
        trade_name: dbPartner.name,
        tax_id: 'XXX010101000', // Not in DB yet
        description: dbPartner.description,
        category: dbPartner.category?.id || 'other',
        subcategory: dbPartner.category?.label,
        status: dbPartner.status || 'active',
        tier: dbPartner.tier?.id || 'bronze',
        verified_at: dbPartner.is_verified ? dbPartner.created_at : undefined,
        certificate_number: `CERT-${dbPartner.slug.toUpperCase().substring(0, 4)}-001`,
        qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${dbPartner.id}`,
        qr_short_code: dbPartner.id.substring(0, 6).toUpperCase(),
        public_profile_url: `https://larvalink.com/p/${dbPartner.slug}`,

        location: {
            address: dbPartner.address || '',
            city: dbPartner.city || '',
            state: dbPartner.state || '',
            country: 'Mexico',
            postal_code: dbPartner.postal_code || '',
            coordinates: {
                lat: dbPartner.latitude || 0,
                lng: dbPartner.longitude || 0
            },
            neighborhood: '', // Missing in DB
            timezone: 'America/Mexico_City'
        },

        contact: {
            primary: {
                name: 'Gerente',
                role: 'Gerente General',
                email: 'contacto@partner.com',
                phone: '5500000000'
            }
        },

        metrics: {
            current_month: {
                deliveries: 4, // Mock calculation
                total_kg: dbPartner.monthly_average_kg || 0,
                co2_avoided_kg: (dbPartner.monthly_average_kg || 0) * 0.15,
                scans: 12,
                donations_received: 0,
                donations_amount: 0
            },
            lifetime: {
                deliveries: 48,
                total_kg: dbPartner.total_collected_kg || 0,
                co2_avoided_kg: (dbPartner.total_collected_kg || 0) * 0.15,
                trees_equivalent: Math.floor((dbPartner.total_collected_kg || 0) / 100),
                cars_off_road_days: Math.floor((dbPartner.total_collected_kg || 0) / 50),
                meals_equivalent: Math.floor((dbPartner.total_collected_kg || 0) * 2),
                water_saved_liters: Math.floor((dbPartner.total_collected_kg || 0) * 5),
                scans: 150,
                unique_scanners: 80,
                donations_count: 5,
                donations_amount: 500
            },
            yearly: [],
            monthly: [],
            averages: {
                kg_per_delivery: (dbPartner.monthly_average_kg || 0) / 4,
                deliveries_per_week: 1,
                kg_per_employee: 10
            },
            streak: {
                current_weeks: 4,
                best_weeks: 12,
                consistency_score: 95
            },
            rankings: {
                city_rank: 5,
                city_total: 100,
                category_rank: 2,
                category_total: 20,
                national_rank: 50,
                national_total: 500
            }
        },

        gamification: {
            level: 1,
            level_name: 'Novato',
            xp_current: 100,
            xp_next_level: 500,
            achievements: [],
            badges: [],
            challenges_completed: 0,
            challenges_active: [],
            partner_of_month_count: 0
        },

        benefits: {
            discount_percentage: dbPartner.tier?.multiplier ? (dbPartner.tier.multiplier - 1) * 10 : 0,
            free_collections_remaining: 0,
            priority_collection: false,
            dedicated_account_manager: false,
            custom_reports: false,
            api_access: false,
            white_label_certificate: false,
            credits_balance: 0
        },

        customer_incentive: dbPartner.customer_incentive ? JSON.parse(dbPartner.customer_incentive) : undefined,

        blockchain: {
            wallet_address: dbPartner.wallet_address || '0x',
            first_transaction: dbPartner.created_at,
            total_transactions: 10,
            last_transaction: dbPartner.updated_at,
            verification_hash: '0x123...'
        },

        images: {
            logo: dbPartner.logo_url,
            cover: dbPartner.cover_url,
            storefront: dbPartner.cover_url
        },

        // Defaults for required fields not in DB
        operations: {
            employees: 10,
            operating_hours: '9:00 - 18:00',
            operating_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            avg_daily_waste_kg: (dbPartner.monthly_average_kg || 0) / 30,
            waste_types: ['kitchen_prep'],
            collection_frequency: 'weekly'
        },
        digital: {},
        referrals: { code: 'REF123', referred_count: 0, earned_credits: 0 },
        subscription: {
            plan: 'starter',
            status: 'active',
            current_period_end: new Date().toISOString(),
            price_monthly: 0
        },
        registered_at: dbPartner.created_at
    };
};
