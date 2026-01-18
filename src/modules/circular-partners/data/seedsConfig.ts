import { ConsumerLevel, RedeemableItem } from '../types/partners.types';

export interface LevelConfig {
    name: string;
    min_xp: number;
    max_xp: number | null;
    color: string;
    benefits: string[];
}

export const SEEDS_CONFIG = {
    earning: {
        scan_qr: { base: 10, description: "Escanear QR de un partner" },
        first_scan_partner: { base: 50, description: "Primera visita a un nuevo partner" },
        donation: { multiplier: 2, description: "2 semillas por cada peso donado" },
        referral_signup: { base: 100, description: "Amigo se registra con tu código" },
        referral_first_scan: { base: 50, description: "Amigo hace su primer escaneo" },
        social_share: { base: 25, description: "Compartir en redes sociales" },
        complete_challenge: { base: 100, description: "Completar un reto" },
        achievement_unlock: { base: 50, description: "Desbloquear un logro" },
        streak_weekly: { base: 20, description: "Bonus por semana consecutiva" },
        level_up: { base: 200, description: "Subir de nivel" },
        profile_complete: { base: 50, description: "Completar perfil" },
        first_donation: { base: 100, description: "Primera donación" }
    },

    expiration: {
        days: 365,
        warning_days: 30
    }
};

export const CONSUMER_LEVELS: Record<ConsumerLevel, LevelConfig> = {
    eco_curious: {
        name: "Eco Curioso",
        min_xp: 0,
        max_xp: 99,
        color: "#95A5A6",
        benefits: ["Acceso básico a la app", "Acumular semillas"]
    },
    eco_apprentice: {
        name: "Eco Aprendiz",
        min_xp: 100,
        max_xp: 499,
        color: "#3498DB",
        benefits: ["10% extra de semillas", "Badge de nivel", "Acceso a retos semanales"]
    },
    eco_warrior: {
        name: "Eco Guerrero",
        min_xp: 500,
        max_xp: 1999,
        color: "#2ECC71",
        benefits: ["25% extra de semillas", "Descuentos exclusivos", "Acceso anticipado a promos"]
    },
    eco_champion: {
        name: "Eco Campeón",
        min_xp: 2000,
        max_xp: 4999,
        color: "#F39C12",
        benefits: ["50% extra de semillas", "Experiencias VIP", "Mención en redes"]
    },
    eco_legend: {
        name: "Eco Leyenda",
        min_xp: 5000,
        max_xp: null,
        color: "#9B59B6",
        benefits: ["100% extra de semillas", "Acceso a eventos", "NFT exclusivo"]
    }
};

export const REDEEMABLE_ITEMS: RedeemableItem[] = [
    {
        id: "discount-10-any",
        name: "10% en cualquier partner",
        description: "Descuento del 10% en tu próxima visita a cualquier partner",
        image_url: "/rewards/discount-10.png",
        category: "discount",
        seeds_cost: 200,
        original_value: "Variable",
        featured: true
    },
    {
        id: "discount-20-featured",
        name: "20% en partner destacado",
        description: "Descuento del 20% en el partner destacado del mes",
        image_url: "/rewards/discount-20.png",
        category: "discount",
        seeds_cost: 350,
        featured: true
    },
    {
        id: "product-composta-kit",
        name: "Kit de Composta Casera",
        description: "Kit completo para iniciar tu composta en casa",
        image_url: "/rewards/composta-kit.png",
        category: "product",
        seeds_cost: 1500,
        original_value: "$450 MXN",
        quantity_available: 50,
        featured: true
    },
    {
        id: "product-terralink-1kg",
        name: "TerraLINK 1kg",
        description: "1 kg de biofertilizante premium",
        image_url: "/rewards/terralink-1kg.png",
        category: "product",
        seeds_cost: 500,
        original_value: "$150 MXN",
        quantity_available: 200,
        featured: false
    },
    {
        id: "experience-plant-tour",
        name: "Tour a Planta BSF",
        description: "Visita guiada a la planta de Tepetlaoxtoc",
        image_url: "/rewards/plant-tour.png",
        category: "experience",
        seeds_cost: 2000,
        original_value: "$500 MXN",
        quantity_available: 20,
        featured: true
    },
    {
        id: "experience-chef-dinner",
        name: "Cena con Chef Sustentable",
        description: "Cena de 5 tiempos con ingredientes trazados",
        image_url: "/rewards/chef-dinner.png",
        category: "experience",
        seeds_cost: 5000,
        original_value: "$1,500 MXN",
        quantity_available: 10,
        featured: true
    },
    {
        id: "donation-100",
        name: "Donar $100",
        description: "Convierte tus semillas en donación de $100 MXN",
        image_url: "/rewards/donation.png",
        category: "donation",
        seeds_cost: 400,
        original_value: "$100 MXN",
        featured: false
    },
    {
        id: "nft-founder",
        name: "NFT Fundador CircularLINK",
        description: "NFT exclusivo para los primeros 1000 usuarios",
        image_url: "/rewards/nft-founder.png",
        category: "nft",
        seeds_cost: 3000,
        quantity_available: 1000,
        featured: true
    }
];

export const getLevelConfig = (level: ConsumerLevel): LevelConfig => CONSUMER_LEVELS[level];

export const getLevelByXp = (xp: number): ConsumerLevel => {
    if (xp >= 5000) return 'eco_legend';
    if (xp >= 2000) return 'eco_champion';
    if (xp >= 500) return 'eco_warrior';
    if (xp >= 100) return 'eco_apprentice';
    return 'eco_curious';
};
