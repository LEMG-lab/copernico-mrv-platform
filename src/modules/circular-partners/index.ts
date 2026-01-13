// CircularLINK Partners Module
// Exports for external use

// Types
export * from './types/partners.types';

// Data & Config
export { PARTNER_CATEGORIES, getCategoryConfig } from './data/partnerCategories';
export { TIER_CONFIG, TIER_XP_MULTIPLIERS, getTierConfig, getTierByKg } from './data/tierConfig';
export { SEEDS_CONFIG, CONSUMER_LEVELS, REDEEMABLE_ITEMS, getLevelConfig, getLevelByXp } from './data/seedsConfig';
export { PARTNER_ACHIEVEMENTS, CONSUMER_ACHIEVEMENTS, CONSUMER_CHALLENGES, PARTNER_CHALLENGES } from './data/achievementsConfig';
export { MOCK_PARTNERS, NETWORK_STATS, MOCK_DELIVERIES, getPartnerBySlug, getPartnerById, getPartnersByCategory, getPartnersByTier } from './data/mockPartners';

// Pages
export { PartnersMapPage } from './pages/PartnersMapPage';
export { PartnerDetailPage } from './pages/PartnerDetailPage';
export { ConsumerScanPage } from './pages/ConsumerScanPage';
export { PartnerDashboardPage } from './pages/PartnerDashboardPage';
export { ConsumerPortalPage } from './pages/ConsumerPortalPage';

// Gamification Components
export { TierBadge, AchievementCard, Leaderboard, SeedsBalance, generateMockLeaderboard, generateMockTransactions } from './components/Gamification';
