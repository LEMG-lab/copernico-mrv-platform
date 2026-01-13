export interface AchievementConfig {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'impact' | 'consistency' | 'community' | 'special';
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    xp_reward: number;
    seeds_reward: number;
    criteria: Record<string, number>;
}

export const PARTNER_ACHIEVEMENTS: AchievementConfig[] = [
    { id: "first_delivery", name: "Primera Entrega", description: "Realiza tu primera entrega de residuos", icon: "rocket", category: "impact", rarity: "common", xp_reward: 50, seeds_reward: 0, criteria: { deliveries: 1 } },
    { id: "week_streak_4", name: "Mes Consistente", description: "4 semanas consecutivas entregando", icon: "flame", category: "consistency", rarity: "uncommon", xp_reward: 100, seeds_reward: 0, criteria: { streak_weeks: 4 } },
    { id: "week_streak_12", name: "Trimestre Impecable", description: "12 semanas consecutivas entregando", icon: "fire", category: "consistency", rarity: "rare", xp_reward: 300, seeds_reward: 0, criteria: { streak_weeks: 12 } },
    { id: "week_streak_52", name: "Año Perfecto", description: "52 semanas consecutivas entregando", icon: "crown", category: "consistency", rarity: "legendary", xp_reward: 1000, seeds_reward: 0, criteria: { streak_weeks: 52 } },
    { id: "kg_100", name: "Centenario", description: "100 kg de residuos trazados", icon: "package", category: "impact", rarity: "common", xp_reward: 50, seeds_reward: 0, criteria: { total_kg: 100 } },
    { id: "kg_1000", name: "Tonelada", description: "1,000 kg de residuos trazados", icon: "package-check", category: "impact", rarity: "uncommon", xp_reward: 200, seeds_reward: 0, criteria: { total_kg: 1000 } },
    { id: "kg_10000", name: "Diez Toneladas", description: "10,000 kg de residuos trazados", icon: "boxes", category: "impact", rarity: "rare", xp_reward: 500, seeds_reward: 0, criteria: { total_kg: 10000 } },
    { id: "kg_100000", name: "Cien Toneladas", description: "100,000 kg de residuos trazados", icon: "warehouse", category: "impact", rarity: "legendary", xp_reward: 2000, seeds_reward: 0, criteria: { total_kg: 100000 } },
    { id: "scans_100", name: "Popular", description: "100 clientes escanearon tu QR", icon: "users", category: "community", rarity: "uncommon", xp_reward: 150, seeds_reward: 0, criteria: { total_scans: 100 } },
    { id: "scans_1000", name: "Viral", description: "1,000 clientes escanearon tu QR", icon: "trending-up", category: "community", rarity: "rare", xp_reward: 400, seeds_reward: 0, criteria: { total_scans: 1000 } },
    { id: "referrals_5", name: "Embajador", description: "Referiste 5 nuevos partners", icon: "megaphone", category: "community", rarity: "rare", xp_reward: 500, seeds_reward: 0, criteria: { referrals: 5 } },
    { id: "partner_of_month", name: "Partner del Mes", description: "Fuiste nombrado Partner del Mes", icon: "star", category: "special", rarity: "epic", xp_reward: 1000, seeds_reward: 0, criteria: { partner_of_month: 1 } }
];

export const CONSUMER_ACHIEVEMENTS: AchievementConfig[] = [
    { id: "first_scan", name: "Curioso Verde", description: "Realiza tu primer escaneo", icon: "scan", category: "impact", rarity: "common", xp_reward: 25, seeds_reward: 50, criteria: { scans: 1 } },
    { id: "scans_10", name: "Explorador", description: "Escanea 10 veces", icon: "compass", category: "impact", rarity: "common", xp_reward: 50, seeds_reward: 100, criteria: { scans: 10 } },
    { id: "scans_50", name: "Aventurero", description: "Escanea 50 veces", icon: "map", category: "impact", rarity: "uncommon", xp_reward: 150, seeds_reward: 300, criteria: { scans: 50 } },
    { id: "scans_100", name: "Veterano", description: "Escanea 100 veces", icon: "award", category: "impact", rarity: "rare", xp_reward: 300, seeds_reward: 500, criteria: { scans: 100 } },
    { id: "unique_partners_5", name: "Diversificado", description: "Visita 5 partners diferentes", icon: "grid", category: "impact", rarity: "common", xp_reward: 75, seeds_reward: 150, criteria: { unique_partners: 5 } },
    { id: "unique_partners_20", name: "Coleccionista", description: "Visita 20 partners diferentes", icon: "layers", category: "impact", rarity: "uncommon", xp_reward: 200, seeds_reward: 400, criteria: { unique_partners: 20 } },
    { id: "first_donation", name: "Generoso", description: "Realiza tu primera donación", icon: "heart", category: "community", rarity: "common", xp_reward: 100, seeds_reward: 200, criteria: { donations: 1 } },
    { id: "donations_10", name: "Filantrópico", description: "Realiza 10 donaciones", icon: "hearts", category: "community", rarity: "rare", xp_reward: 300, seeds_reward: 600, criteria: { donations: 10 } },
    { id: "first_referral", name: "Influyente", description: "Refiere a tu primer amigo", icon: "user-plus", category: "community", rarity: "common", xp_reward: 75, seeds_reward: 150, criteria: { referrals: 1 } },
    { id: "referrals_10", name: "Líder de Manada", description: "Refiere a 10 amigos", icon: "users", category: "community", rarity: "rare", xp_reward: 400, seeds_reward: 800, criteria: { referrals: 10 } },
    { id: "week_streak_4", name: "Hábito Verde", description: "Escanea al menos 1 vez por semana, 4 semanas seguidas", icon: "calendar-check", category: "consistency", rarity: "uncommon", xp_reward: 150, seeds_reward: 300, criteria: { streak_weeks: 4 } },
    { id: "early_adopter", name: "Early Adopter", description: "Te uniste en los primeros 1000 usuarios", icon: "zap", category: "special", rarity: "legendary", xp_reward: 1000, seeds_reward: 2000, criteria: { user_number: 1000 } }
];

export interface ChallengeConfig {
    id: string;
    name: string;
    description: string;
    type: 'daily' | 'weekly' | 'monthly' | 'special';
    category: string;
    target: number;
    xp_reward: number;
    seeds_reward: number;
    icon: string;
}

export const CONSUMER_CHALLENGES: ChallengeConfig[] = [
    { id: "daily_scan", name: "Escaneo del Día", description: "Escanea al menos 1 partner hoy", type: "daily", category: "scans", target: 1, xp_reward: 15, seeds_reward: 20, icon: "scan" },
    { id: "daily_share", name: "Comparte el Impacto", description: "Comparte tu impacto en redes sociales", type: "daily", category: "social", target: 1, xp_reward: 10, seeds_reward: 25, icon: "share-2" },
    { id: "weekly_5_scans", name: "Semana Activa", description: "Escanea 5 veces esta semana", type: "weekly", category: "scans", target: 5, xp_reward: 75, seeds_reward: 150, icon: "calendar" },
    { id: "weekly_3_partners", name: "Explorador Semanal", description: "Visita 3 partners diferentes esta semana", type: "weekly", category: "partners", target: 3, xp_reward: 100, seeds_reward: 200, icon: "map-pin" },
    { id: "weekly_referral", name: "Trae un Amigo", description: "Invita a un amigo que haga su primer escaneo", type: "weekly", category: "referrals", target: 1, xp_reward: 150, seeds_reward: 300, icon: "user-plus" },
    { id: "monthly_20_scans", name: "Mes Verde", description: "Escanea 20 veces este mes", type: "monthly", category: "scans", target: 20, xp_reward: 300, seeds_reward: 600, icon: "leaf" },
    { id: "monthly_10_partners", name: "Descubridor del Mes", description: "Visita 10 partners diferentes este mes", type: "monthly", category: "partners", target: 10, xp_reward: 400, seeds_reward: 800, icon: "compass" },
    { id: "monthly_donation", name: "Corazón Verde", description: "Realiza al menos una donación este mes", type: "monthly", category: "donations", target: 1, xp_reward: 200, seeds_reward: 400, icon: "heart" }
];

export const PARTNER_CHALLENGES: ChallengeConfig[] = [
    { id: "weekly_consistency", name: "Semana Perfecta", description: "Entrega todos los días programados", type: "weekly", category: "consistency", target: 7, xp_reward: 100, seeds_reward: 0, icon: "check-circle" },
    { id: "monthly_increase", name: "Crecimiento", description: "Incrementa 10% tus kg vs mes anterior", type: "monthly", category: "growth", target: 10, xp_reward: 300, seeds_reward: 0, icon: "trending-up" },
    { id: "monthly_scans", name: "Engagement", description: "Logra que 50 clientes escaneen tu QR", type: "monthly", category: "community", target: 50, xp_reward: 200, seeds_reward: 0, icon: "users" },
    { id: "special_recruit", name: "Reclutador", description: "Refiere a 1 nuevo partner este mes", type: "monthly", category: "referrals", target: 1, xp_reward: 500, seeds_reward: 0, icon: "user-plus" }
];
