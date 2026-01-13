import { supabase } from '../../../lib/supabase';
import { Consumer, SeedsTransaction } from '../types/partners.types';

// Mock current user for dev
const MOCK_CONSUMER: Consumer = {
    id: 'user-123',
    name: 'Ana Sofia Ramos',
    email: 'ana.ramos@email.com',
    avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    country: 'MX',
    level: {
        current: 'eco_champion',
        xp_current: 2350,
        xp_next_level: 3000,
        benefits: ['Bonus 1.25x semillas', 'Acceso anticipado a recompensas']
    },
    seeds: {
        balance: 840,
        lifetime_earned: 1250,
        lifetime_redeemed: 410,
        pending: 0
    },
    impact: {
        total_scans: 47,
        unique_partners: 12,
        total_kg_supported: 45.5,
        total_co2_avoided_kg: 8.2,
        trees_equivalent: 2,
        donations_count: 5,
        donations_amount: 250
    },
    achievements: [],
    badges: [],
    challenges_completed: 12,
    current_challenges: [],
    scan_history: [],
    donation_history: [],
    redemption_history: [],
    referral_code: 'ANA2024',
    referrals_count: 5,
    referral_earnings: 500,
    preferences: {
        notifications_enabled: true,
        email_updates: true,
        share_profile_publicly: true,
        favorite_partners: []
    },
    created_at: '2024-01-15T10:00:00Z',
    last_active_at: new Date().toISOString()
};

const USE_MOCK = false;

export const consumerService = {
    /**
     * Get current user profile
     */
    async getProfile(): Promise<Consumer | null> {
        if (USE_MOCK) return MOCK_CONSUMER;

        const { data: { user } } = await supabase.auth.getUser();

        // DEMO BYPASS: If no user is logged in, use the seeded profile ID
        // This allows viewing the app without implementing full auth UI yet
        let userId = user?.id;
        if (!userId) {
            // Check if we have a seeded profile. In lack of a hardcoded one, 
            // we'll try to fetch ANY profile from the DB for demo purposes.
            const { data: fallback } = await supabase.from('profiles').select('id').limit(1).single();
            if (fallback) userId = fallback.id;
        }

        if (!userId) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;

        // Map DB fields to Consumer type
        // Map DB fields to Consumer type
        return {
            id: data.id,
            name: data.full_name,
            email: data.email,
            avatar_url: data.avatar_url,
            country: 'MX',
            level: {
                current: 'eco_curious', // Logic needed to calculate based on XP
                xp_current: data.current_xp,
                xp_next_level: 1000,
                benefits: []
            },
            seeds: {
                balance: data.seeds_balance,
                lifetime_earned: data.lifetime_seeds_earned,
                lifetime_redeemed: 0,
                pending: 0
            },
            impact: {
                total_scans: 0,
                unique_partners: 0,
                total_kg_supported: data.total_kg_diverted,
                total_co2_avoided_kg: data.co2_avoided_kg,
                trees_equivalent: Math.floor(data.co2_avoided_kg / 20),
                donations_count: 0,
                donations_amount: 0
            },
            achievements: [],
            badges: [],
            challenges_completed: 0,
            current_challenges: [],
            scan_history: [],
            donation_history: [],
            redemption_history: [],
            referral_code: data.username || 'USER',
            referrals_count: 0,
            referral_earnings: 0,
            preferences: {
                notifications_enabled: true,
                email_updates: true,
                share_profile_publicly: true,
                favorite_partners: []
            },
            created_at: data.created_at,
            last_active_at: new Date().toISOString()
        };
    },

    /**
     * Get transaction history
     */
    async getTransactions(): Promise<SeedsTransaction[]> {
        if (USE_MOCK) {
            return [
                { id: '1', type: 'earn', title: 'Entrega en CEDA Tlaxcala', amount: 50, timestamp: new Date().toISOString(), partner_name: 'CEDA Tlaxcala' },
                { id: '2', type: 'earn', title: 'Visita a El Bajío', amount: 15, timestamp: new Date(Date.now() - 86400000).toISOString(), partner_name: 'El Bajío Roma' },
                { id: '3', type: 'spend', title: 'Canje Café del Día', amount: -60, timestamp: new Date(Date.now() - 172800000).toISOString(), partner_name: 'Starbucks' }
            ] as any[];
        }

        const { data, error } = await supabase
            .from('seeds_transactions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as any[];
    }
};
