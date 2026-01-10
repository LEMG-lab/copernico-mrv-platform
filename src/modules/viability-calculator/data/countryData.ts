export const COUNTRY_DATA: Record<string, any> = {
    mexico: {
        insects_legal: true,
        waste_per_capita_kg_day: 1.2,
        protein_market_size_usd: 500000000,
        avg_labor_cost_usd_month: 800,
        electricity_cost_kwh: 0.08,
        carbon_market_access: true,
        regulatory_difficulty: 'medium',
        notes: ["Ley de Economia Circular 2024", "SENASICA regula produccion animal"]
    },
    brazil: {
        insects_legal: true,
        waste_per_capita_kg_day: 1.0,
        protein_market_size_usd: 2000000000,
        avg_labor_cost_usd_month: 600,
        electricity_cost_kwh: 0.12,
        carbon_market_access: true,
        regulatory_difficulty: 'medium',
        notes: ["Gran mercado de acuacultura", "MAPA regula"]
    },
    usa: {
        insects_legal: true,
        waste_per_capita_kg_day: 2.0,
        protein_market_size_usd: 8000000000,
        avg_labor_cost_usd_month: 4000,
        electricity_cost_kwh: 0.10,
        carbon_market_access: true,
        regulatory_difficulty: 'hard',
        notes: ["FDA aprobacion pendiente para humanos", "AAFCO regula pet food"]
    },
    netherlands: {
        insects_legal: true,
        waste_per_capita_kg_day: 1.4,
        protein_market_size_usd: 300000000,
        avg_labor_cost_usd_month: 4500,
        electricity_cost_kwh: 0.22,
        carbon_market_access: true,
        regulatory_difficulty: 'medium',
        notes: ["EFSA aprobacion completa", "Hub de innovacion BSF"]
    },
    vietnam: {
        insects_legal: true,
        waste_per_capita_kg_day: 0.8,
        protein_market_size_usd: 400000000,
        avg_labor_cost_usd_month: 350,
        electricity_cost_kwh: 0.08,
        carbon_market_access: false,
        regulatory_difficulty: 'easy',
        notes: ["Gran mercado de acuacultura", "Regulacion flexible"]
    },
    kenya: {
        insects_legal: true,
        waste_per_capita_kg_day: 0.6,
        protein_market_size_usd: 100000000,
        avg_labor_cost_usd_month: 250,
        electricity_cost_kwh: 0.15,
        carbon_market_access: true,
        regulatory_difficulty: 'easy',
        notes: ["KEBS aprobo insectos", "Alto crecimiento proyectado"]
    }
};
