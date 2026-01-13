import { supabase } from '../../../lib/supabase';
import { Achievement, Challenge, RedeemableItem } from '../types/partners.types';

// Mock Config Data
import { CONSUMER_ACHIEVEMENTS } from '../data/achievementsConfig';
import { REDEEMABLE_ITEMS } from '../data/seedsConfig';

const USE_MOCK = false;

export const gamificationService = {
    /**
     * Get available rewards
     */
    async getRewards(): Promise<RedeemableItem[]> {
        if (USE_MOCK) return REDEEMABLE_ITEMS;

        const { data, error } = await supabase
            .from('redeemable_items')
            .select('*')
            .eq('is_active', true);

        if (error) throw error;
        return data as any[];
    },

    /**
     * Get user achievements status
     */
    async getAchievements(userId?: string): Promise<Achievement[]> {
        if (USE_MOCK) return CONSUMER_ACHIEVEMENTS as any[];

        // In real impl, we'd join achievements with user_achievements
        const { data, error } = await supabase
            .from('achievements')
            .select('*');

        if (error) throw error;
        return data as any[];
    }
};
