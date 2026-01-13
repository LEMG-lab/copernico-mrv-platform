// ============================================
// PARTNER (COMERCIO) TYPES
// ============================================

export type PartnerCategory =
    | 'restaurant'
    | 'hotel'
    | 'hospital'
    | 'school'
    | 'supermarket'
    | 'food_factory'
    | 'central_abasto'
    | 'catering'
    | 'corporate_cafeteria'
    | 'coffee_shop'
    | 'bakery'
    | 'bar_club'
    | 'event_venue'
    | 'gym_spa'
    | 'other';

export type PartnerStatus =
    | 'pending_verification'
    | 'active'
    | 'suspended'
    | 'inactive'
    | 'churned';

export type PartnerTier =
    | 'bronze'
    | 'silver'
    | 'gold'
    | 'platinum'
    | 'champion';

export type CollectionFrequency =
    | 'daily'
    | 'twice_weekly'
    | 'weekly'
    | 'on_demand';

export type WasteType =
    | 'kitchen_prep'
    | 'plate_waste'
    | 'fruits_vegetables'
    | 'bread_bakery'
    | 'dairy'
    | 'coffee_grounds'
    | 'eggshells'
    | 'garden_waste'
    | 'flowers'
    | 'other_organic';

export interface PartnerLocation {
    address: string;
    interior?: string;
    neighborhood: string;
    city: string;
    municipality?: string;
    state: string;
    country: string;
    postal_code: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    timezone: string;
    google_place_id?: string;
    what3words?: string;
}

export interface PartnerContact {
    primary: {
        name: string;
        role: string;
        email: string;
        phone: string;
        whatsapp?: string;
    };
    billing?: {
        name: string;
        email: string;
        phone: string;
    };
    operations?: {
        name: string;
        email: string;
        phone: string;
    };
}

export interface PartnerOperations {
    employees: number;
    operating_hours: string;
    operating_days: string[];
    avg_daily_waste_kg: number;
    peak_days?: string[];
    waste_types: WasteType[];
    collection_frequency: CollectionFrequency;
    collection_days?: string[];
    collection_time_preference?: string;
    container_type?: string;
    container_count?: number;
    special_requirements?: string;
    has_loading_dock?: boolean;
    parking_available?: boolean;
}

export interface PartnerMetrics {
    current_month: {
        deliveries: number;
        total_kg: number;
        co2_avoided_kg: number;
        scans: number;
        donations_received: number;
        donations_amount: number;
    };
    lifetime: {
        deliveries: number;
        total_kg: number;
        co2_avoided_kg: number;
        trees_equivalent: number;
        cars_off_road_days: number;
        meals_equivalent: number;
        water_saved_liters: number;
        scans: number;
        unique_scanners: number;
        donations_count: number;
        donations_amount: number;
    };
    yearly: {
        year: number;
        deliveries: number;
        total_kg: number;
        co2_avoided_kg: number;
    }[];
    monthly: {
        month: string;
        deliveries: number;
        total_kg: number;
        co2_avoided_kg: number;
    }[];
    averages: {
        kg_per_delivery: number;
        deliveries_per_week: number;
        kg_per_employee: number;
    };
    streak: {
        current_weeks: number;
        best_weeks: number;
        consistency_score: number;
    };
    rankings: {
        city_rank: number;
        city_total: number;
        category_rank: number;
        category_total: number;
        national_rank: number;
        national_total: number;
    };
}

export interface PartnerGamification {
    level: number;
    level_name: string;
    xp_current: number;
    xp_next_level: number;
    achievements: Achievement[];
    badges: Badge[];
    challenges_completed: number;
    challenges_active: string[];
    partner_of_month_count: number;
    last_partner_of_month?: string;
}

export interface PartnerBenefits {
    discount_percentage: number;
    free_collections_remaining: number;
    priority_collection: boolean;
    dedicated_account_manager: boolean;
    custom_reports: boolean;
    api_access: boolean;
    white_label_certificate: boolean;
    credits_balance: number;
    credits_expiry?: string;
}

export interface CustomerIncentive {
    type: 'discount' | 'freebie' | 'raffle' | 'points' | 'donation_match';
    value: string;
    description: string;
    terms?: string;
    valid_until?: string;
    redemption_code?: string;
    max_redemptions?: number;
    current_redemptions: number;
}

export interface Partner {
    id: string;
    business_name: string;
    trade_name: string;
    slug: string;
    tax_id: string;
    category: PartnerCategory;
    subcategory?: string;
    description?: string;
    location: PartnerLocation;
    contact: PartnerContact;
    digital: {
        website?: string;
        instagram?: string;
        facebook?: string;
        tiktok?: string;
        google_maps_url?: string;
        google_place_id?: string;
        tripadvisor_url?: string;
    };
    operations: PartnerOperations;
    status: PartnerStatus;
    tier: PartnerTier;
    verified_at?: string;
    verified_by?: string;
    certificate_number: string;
    qr_code_url: string;
    qr_short_code: string;
    public_profile_url: string;
    metrics: PartnerMetrics;
    gamification: PartnerGamification;
    benefits: PartnerBenefits;
    referrals: {
        code: string;
        referred_count: number;
        earned_credits: number;
    };
    blockchain: {
        wallet_address: string;
        first_transaction: string;
        total_transactions: number;
        last_transaction: string;
        verification_hash: string;
    };
    images: {
        logo?: string;
        cover?: string;
        storefront?: string;
        interior?: string;
        waste_area?: string;
        certificate_display?: string;
        gallery?: string[];
    };
    customer_incentive?: CustomerIncentive;
    subscription: {
        plan: 'starter' | 'growth' | 'professional' | 'enterprise';
        status: 'active' | 'past_due' | 'cancelled' | 'trial';
        trial_ends_at?: string;
        current_period_end: string;
        price_monthly: number;
    };
    registered_at: string;
    activated_at?: string;
    last_delivery_at?: string;
    last_login_at?: string;
}

// ============================================
// DELIVERY TYPES
// ============================================

export interface Delivery {
    id: string;
    partner_id: string;
    scheduled_at?: string;
    collected_at: string;
    weight_kg: number;
    waste_composition: {
        type: WasteType;
        percentage: number;
    }[];
    quality_score?: number;
    contamination_detected?: boolean;
    contamination_notes?: string;
    collector: {
        id: string;
        name: string;
        vehicle_id: string;
        vehicle_plate: string;
    };
    route_id?: string;
    route_sequence?: number;
    plant_id: string;
    plant_name: string;
    photos: {
        collection?: string;
        weight_scale?: string;
        container?: string;
    };
    signed_by?: string;
    signature_url?: string;
    notes?: string;
    impact: {
        co2_avoided_kg: number;
        methane_avoided_kg: number;
        protein_potential_kg: number;
        frass_potential_kg: number;
    };
    blockchain: {
        tx_hash: string;
        block_number: number;
        timestamp: string;
        verification_url: string;
    };
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
}

// ============================================
// CONSUMER TYPES
// ============================================

export type ConsumerLevel =
    | 'eco_curious'
    | 'eco_apprentice'
    | 'eco_warrior'
    | 'eco_champion'
    | 'eco_legend';

export interface ScanRecord {
    id: string;
    partner_id: string;
    partner_name: string;
    partner_category: PartnerCategory;
    scanned_at: string;
    location?: { lat: number; lng: number };
    estimated_impact: {
        kg_supported: number;
        co2_avoided_kg: number;
    };
    seeds_earned: number;
    incentive_claimed?: boolean;
    incentive_details?: string;
}

export interface Donation {
    id: string;
    partner_id?: string;
    scan_id?: string;
    amount: number;
    currency: 'MXN' | 'USD';
    foundation: '+1_ac' | 'frqtal';
    project?: string;
    payment_method: 'card' | 'paypal' | 'oxxo' | 'spei';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    blockchain_tx?: string;
    seeds_earned: number;
    receipt_url?: string;
    tax_deductible: boolean;
    created_at: string;
    completed_at?: string;
}

export interface Redemption {
    id: string;
    type: 'discount' | 'product' | 'experience' | 'donation' | 'nft';
    item_id: string;
    item_name: string;
    seeds_spent: number;
    partner_id?: string;
    status: 'pending' | 'completed' | 'expired' | 'cancelled';
    redemption_code?: string;
    valid_until?: string;
    created_at: string;
    used_at?: string;
}

export interface Consumer {
    id: string;
    email: string;
    phone?: string;
    name?: string;
    nickname?: string;
    avatar_url?: string;
    city?: string;
    state?: string;
    country: string;
    seeds: {
        balance: number;
        lifetime_earned: number;
        lifetime_redeemed: number;
        pending: number;
    };
    level: {
        current: ConsumerLevel;
        xp_current: number;
        xp_next_level: number;
        benefits: string[];
    };
    impact: {
        total_scans: number;
        unique_partners: number;
        total_kg_supported: number;
        total_co2_avoided_kg: number;
        trees_equivalent: number;
        donations_count: number;
        donations_amount: number;
    };
    achievements: Achievement[];
    badges: Badge[];
    challenges_completed: number;
    current_challenges: string[];
    scan_history: ScanRecord[];
    donation_history: Donation[];
    redemption_history: Redemption[];
    referral_code: string;
    referred_by?: string;
    referrals_count: number;
    referral_earnings: number;
    preferences: {
        notifications_enabled: boolean;
        email_updates: boolean;
        share_profile_publicly: boolean;
        favorite_partners: string[];
    };
    created_at: string;
    last_scan_at?: string;
    last_active_at: string;
}

// ============================================
// GAMIFICATION TYPES
// ============================================

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'impact' | 'consistency' | 'community' | 'special';
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    xp_reward: number;
    seeds_reward: number;
    unlocked: boolean;
    unlocked_at?: string;
    progress?: {
        current: number;
        target: number;
    };
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    image_url: string;
    tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
    earned_at: string;
    display_priority: number;
}

export interface Challenge {
    id: string;
    name: string;
    description: string;
    type: 'daily' | 'weekly' | 'monthly' | 'special';
    category: 'scans' | 'partners' | 'donations' | 'referrals' | 'social';
    target: number;
    current: number;
    xp_reward: number;
    seeds_reward: number;
    badge_reward?: string;
    starts_at: string;
    ends_at: string;
    completed: boolean;
    completed_at?: string;
}

export interface LeaderboardEntry {
    rank: number;
    id: string;
    name: string;
    avatar_url?: string;
    level: ConsumerLevel | PartnerTier;
    score: number;
    metric_label: string;
    change: number;
    is_current_user?: boolean;
}

// ============================================
// SEEDS (LOYALTY) TYPES
// ============================================

export type SeedsSource =
    | 'scan'
    | 'first_scan_partner'
    | 'donation'
    | 'referral_signup'
    | 'referral_scan'
    | 'social_share'
    | 'challenge_complete'
    | 'achievement_unlock'
    | 'streak_bonus'
    | 'level_up'
    | 'promo_code'
    | 'admin_bonus'
    | 'redemption'
    | 'expiration';

export interface SeedsTransaction {
    id: string;
    consumer_id: string;
    type: 'earn' | 'spend' | 'expire' | 'bonus' | 'refund';
    amount: number;
    balance_after: number;
    source: SeedsSource;
    reference_id?: string;
    description: string;
    created_at: string;
    expires_at?: string;
}

export interface RedeemableItem {
    id: string;
    name: string;
    description: string;
    image_url: string;
    category: 'discount' | 'product' | 'experience' | 'donation' | 'nft';
    seeds_cost: number;
    original_value?: string;
    partner_id?: string;
    partner_name?: string;
    quantity_available?: number;
    valid_until?: string;
    terms?: string;
    featured: boolean;
}

// ============================================
// NETWORK STATS
// ============================================

export interface NetworkStats {
    total_partners: number;
    active_partners: number;
    pending_partners: number;
    total_consumers: number;
    active_consumers_30d: number;
    total_kg_collected: number;
    total_co2_avoided_kg: number;
    total_deliveries: number;
    total_scans: number;
    total_donations: number;
    total_donations_amount: number;
    cities_covered: number;
    states_covered: number;
    countries_covered: number;
    by_category: Record<PartnerCategory, number>;
    by_tier: Record<PartnerTier, number>;
    by_city: { city: string; count: number }[];
    growth: {
        partners_this_month: number;
        partners_growth_pct: number;
        kg_this_month: number;
        kg_growth_pct: number;
    };
    top_partners: {
        by_kg: { id: string; name: string; kg: number }[];
        by_streak: { id: string; name: string; weeks: number }[];
        by_scans: { id: string; name: string; scans: number }[];
    };
}
