import { PartnerTier } from '../types/partners.types';

export interface TierConfig {
    name: string;
    min_kg_month: number;
    max_kg_month: number | null;
    color: string;
    gradient: string;
    icon: string;
    benefits: string[];
    discount_percentage: number;
    priority_collection: boolean;
}

export const TIER_CONFIG: Record<PartnerTier, TierConfig> = {
    bronze: {
        name: "Bronce",
        min_kg_month: 0,
        max_kg_month: 100,
        color: "#CD7F32",
        gradient: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)",
        icon: "medal",
        benefits: [
            "Certificado digital descargable",
            "QR code básico",
            "Perfil público en directorio",
            "Reporte mensual automático",
            "Soporte por email"
        ],
        discount_percentage: 0,
        priority_collection: false
    },
    silver: {
        name: "Plata",
        min_kg_month: 100,
        max_kg_month: 500,
        color: "#C0C0C0",
        gradient: "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)",
        icon: "medal",
        benefits: [
            "Todo lo de Bronce",
            "Badge físico para mostrar",
            "Mención en redes sociales",
            "Reporte semanal",
            "Toolkit de marketing básico",
            "5% descuento en recolección"
        ],
        discount_percentage: 5,
        priority_collection: false
    },
    gold: {
        name: "Oro",
        min_kg_month: 500,
        max_kg_month: 2000,
        color: "#FFD700",
        gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
        icon: "trophy",
        benefits: [
            "Todo lo de Plata",
            "Dashboard analítico avanzado",
            "Prioridad en recolección",
            "Co-marketing en campañas",
            "Certificado impreso enmarcado",
            "10% descuento en recolección",
            "Acceso a red B2B de partners"
        ],
        discount_percentage: 10,
        priority_collection: true
    },
    platinum: {
        name: "Platino",
        min_kg_month: 2000,
        max_kg_month: 10000,
        color: "#E5E4E2",
        gradient: "linear-gradient(135deg, #E5E4E2 0%, #BDC3C7 100%)",
        icon: "crown",
        benefits: [
            "Todo lo de Oro",
            "Account manager dedicado",
            "Reportes personalizados",
            "API access para integraciones",
            "15% descuento en recolección",
            "Invitación a eventos exclusivos",
            "Case study destacado"
        ],
        discount_percentage: 15,
        priority_collection: true
    },
    champion: {
        name: "Champion",
        min_kg_month: 10000,
        max_kg_month: null,
        color: "#50C878",
        gradient: "linear-gradient(135deg, #50C878 0%, #228B22 100%)",
        icon: "gem",
        benefits: [
            "Todo lo de Platino",
            "Asiento en Advisory Board",
            "Presentación a inversionistas",
            "White label en certificados",
            "20% descuento en recolección",
            "Revenue share en referidos",
            "Prioridad para nuevos productos",
            "Reconocimiento en reportes anuales"
        ],
        discount_percentage: 20,
        priority_collection: true
    }
};

export const TIER_XP_MULTIPLIERS: Record<PartnerTier, number> = {
    bronze: 1.0,
    silver: 1.2,
    gold: 1.5,
    platinum: 2.0,
    champion: 3.0
};

export const getTierConfig = (tier: PartnerTier): TierConfig => TIER_CONFIG[tier];

export const getTierByKg = (kgMonth: number): PartnerTier => {
    if (kgMonth >= 10000) return 'champion';
    if (kgMonth >= 2000) return 'platinum';
    if (kgMonth >= 500) return 'gold';
    if (kgMonth >= 100) return 'silver';
    return 'bronze';
};
