export interface Location {
    lat: number;
    lng: number;
    country: string;
    region: string;
    city: string;
    population?: number;
}

export interface ProjectParameters {
    capacity_tons_day: number;
    waste_sources: WasteSource[];
    has_land: boolean;
    land_size_m2?: number;
    has_capital: boolean;
    capital_range?: CapitalRange;
    target_products: ProductType[];
    timeline: 'immediate' | '6_months' | '1_year' | '2_years';
}

export type WasteSource =
    | 'food_markets'
    | 'restaurants'
    | 'agroindustry'
    | 'municipality'
    | 'food_processing'
    | 'breweries';

export type ProductType =
    | 'protein_meal'
    | 'oil'
    | 'frass'
    | 'live_larvae'
    | 'carbon_credits';

export type CapitalRange =
    | 'under_100k'
    | '100k_500k'
    | '500k_1m'
    | '1m_5m'
    | 'over_5m';

export interface ClimateData {
    avg_temperature: number;
    min_temperature: number;
    max_temperature: number;
    avg_humidity: number;
    rainfall_mm_year: number;
    climate_score: number;
    climate_notes: string[];
}

export interface WasteAvailability {
    estimated_tons_day: number;
    main_sources: string[];
    competition_level: 'low' | 'medium' | 'high';
    score: number;
}

export interface MarketAnalysis {
    protein_demand_score: number;
    fertilizer_demand_score: number;
    carbon_market_access: boolean;
    export_potential: boolean;
    score: number;
}

export interface RegulatoryEnvironment {
    insects_as_feed_legal: boolean;
    organic_waste_regulations: string;
    environmental_permits_difficulty: 'easy' | 'medium' | 'hard';
    score: number;
    notes: string[];
}

export interface Competitor {
    name: string;
    location: Location;
    capacity_tons_day: number;
    distance_km: number;
}

export interface ViabilityFactor {
    name: string;
    score: number;  // 0-100
    weight: number; // Factor de ponderacion
    status: 'excellent' | 'good' | 'acceptable' | 'poor';
    details: string;
}

export interface FinancialProjection {
    capex: {
        total: number;
        breakdown: {
            construction: number;
            equipment: number;
            initial_colony: number;
            permits: number;
            working_capital: number;
        };
    };
    opex_annual: {
        total: number;
        breakdown: {
            labor: number;
            utilities: number;
            maintenance: number;
            logistics: number;
            admin: number;
        };
    };
    revenue_projections: {
        year1: number;
        year2: number;
        year3: number;
        breakdown: {
            protein: number;
            frass: number;
            oil: number;
            carbon_credits: number;
            tipping_fees: number;
        };
    };
    metrics: {
        payback_years: number;
        irr: number;
        npv: number;
        break_even_months: number;
    };
}

export interface ImpactProjection {
    co2eq_avoided_year: number;
    waste_diverted_year: number;
    direct_jobs: number;
    indirect_jobs: number;
    hectares_fertilized: number;
    water_saved_m3: number;
    sdg_contribution: number[];
}

export interface ViabilityResult {
    overall_score: number;  // 0-100
    recommendation: 'highly_viable' | 'viable' | 'challenging' | 'not_recommended';
    factors: ViabilityFactor[];
    climate: ClimateData;
    waste: WasteAvailability;
    market: MarketAnalysis;
    regulatory: RegulatoryEnvironment;
    competitors: Competitor[];
    financial: FinancialProjection;
    impact: ImpactProjection;
    generated_at: string;
}
