import { Location, ProjectParameters, ViabilityResult, ClimateData, WasteAvailability, MarketAnalysis, RegulatoryEnvironment, Competitor, FinancialProjection, ImpactProjection } from '../types/viability.types';
import { calculateViabilityScore, getRecommendation } from '../utils/scoring';
import { KNOWN_BSF_PLANTS } from '../data/competitorDatabase';
import { COUNTRY_DATA } from '../data/countryData';

// Helper para calcular distancia (Haversine simple)
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

export const viabilityService = {

    async calculateViability(location: Location, params: ProjectParameters): Promise<ViabilityResult> {

        // Simular delay de análisis APIS
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 1. Clima Simulado (basado en latitud para hacerlo medio realista)
        const distFromEquator = Math.abs(location.lat);
        let avgTemp = 25;
        if (distFromEquator > 40) avgTemp = 15;
        else if (distFromEquator > 20) avgTemp = 22;
        // Si está en México, hardcodeamos algo bueno
        if (location.country === "Mexico") avgTemp = 24;

        const climate: ClimateData = {
            avg_temperature: avgTemp,
            min_temperature: avgTemp - 5,
            max_temperature: avgTemp + 5,
            avg_humidity: 65,
            rainfall_mm_year: 800,
            climate_score: avgTemp >= 22 && avgTemp <= 30 ? 95 : 70,
            climate_notes: ["Temperatura óptima para BSF todo el año"]
        };

        // 2. Residuos (Estimación poblacional)
        // Asumimos 1kg per capita si no hay dato, o usamos countryData
        const cData = COUNTRY_DATA[location.country.toLowerCase()] || { waste_per_capita_kg_day: 1.0, regulatory_difficulty: 'medium' };
        const pop = location.population || 100000; // default
        const estWaste = pop * cData.waste_per_capita_kg_day * 0.4; // 40% orgánico accesible

        const waste: WasteAvailability = {
            estimated_tons_day: Math.round(estWaste / 1000), // a tons
            main_sources: ["Mercados", "Residencial", "Restaurantes"],
            competition_level: 'low',
            score: estWaste > (params.capacity_tons_day * 1000 * 2) ? 95 : 60 // Si hay el doble disponible que lo requerido, buen score
        };

        // 3. Competencia
        const competitors: Competitor[] = KNOWN_BSF_PLANTS.map(plant => {
            const dist = getDistanceFromLatLonInKm(location.lat, location.lng, plant.location!.lat, plant.location!.lng);
            return {
                name: plant.name!,
                location: plant.location!,
                capacity_tons_day: plant.capacity_tons_day!,
                distance_km: Math.round(dist)
            };
        }).filter(c => c.distance_km < 1000).sort((a, b) => a.distance_km - b.distance_km);

        // 4. Mercado y Regulación
        const market: MarketAnalysis = {
            protein_demand_score: 80,
            fertilizer_demand_score: 85,
            carbon_market_access: cData.carbon_market_access ?? true,
            export_potential: true,
            score: 85
        };

        const regulatory: RegulatoryEnvironment = {
            insects_as_feed_legal: cData.insects_legal ?? true,
            organic_waste_regulations: "Favorable",
            environmental_permits_difficulty: cData.regulatory_difficulty || 'medium',
            score: cData.regulatory_difficulty === 'easy' ? 90 : cData.regulatory_difficulty === 'hard' ? 50 : 70,
            notes: cData.notes || []
        };

        // 5. Score Final
        const score = calculateViabilityScore(location, params, climate, waste, market, regulatory, competitors);

        // 6. Proyecciones Financieras Básicas
        const capexTotal = params.capacity_tons_day * 15000; // $15k USD por ton instalada aprox (economía escala)
        const revenueYear1 = params.capacity_tons_day * 300 * 0.8 * 800; // 300 dias, 80% eficiencia, $800 avg revenue/ton input (muy simplificado)

        const financial: FinancialProjection = {
            capex: {
                total: capexTotal,
                breakdown: {
                    construction: capexTotal * 0.45,
                    equipment: capexTotal * 0.35,
                    initial_colony: capexTotal * 0.05,
                    permits: capexTotal * 0.05,
                    working_capital: capexTotal * 0.10
                }
            },
            opex_annual: {
                total: capexTotal * 0.3, // 30% del capex anual
                breakdown: { labor: 100000, utilities: 50000, maintenance: 20000, logistics: 30000, admin: 40000 }
            },
            revenue_projections: {
                year1: revenueYear1,
                year2: revenueYear1 * 1.5,
                year3: revenueYear1 * 1.8,
                breakdown: { protein: 0.45, frass: 0.25, oil: 0.15, carbon_credits: 0.10, tipping_fees: 0.05 }
            },
            metrics: {
                payback_years: 2.8,
                irr: 28,
                npv: capexTotal * 1.5,
                break_even_months: 18
            }
        };

        // 7. Impacto
        const impact: ImpactProjection = {
            co2eq_avoided_year: params.capacity_tons_day * 365 * 0.5, // 0.5 ton Co2 por ton residuo
            waste_diverted_year: params.capacity_tons_day * 365,
            direct_jobs: Math.ceil(params.capacity_tons_day * 0.5),
            indirect_jobs: Math.ceil(params.capacity_tons_day * 1.5),
            hectares_fertilized: params.capacity_tons_day * 10,
            water_saved_m3: params.capacity_tons_day * 20,
            sdg_contribution: [2, 8, 9, 11, 12, 13]
        };

        return {
            overall_score: score,
            recommendation: getRecommendation(score),
            factors: [
                { name: "Clima", score: climate.climate_score, weight: 0.2, status: climate.climate_score > 80 ? "excellent" : "good", details: "Temperatura ideal" },
                { name: "Residuos", score: waste.score, weight: 0.25, status: waste.score > 80 ? "excellent" : "acceptable", details: "Alto volumen disponible" },
                { name: "Competencia", score: competitionScore, weight: 0.1, status: competitionScore === 100 ? "excellent" : "good", details: competitors.length === 0 ? "Sin competencia directa" : `${competitors.length} plantas cercanas` },
                { name: "Mercado", score: market.score, weight: 0.2, status: "good", details: "Demanda creciente" }
            ],
            climate,
            waste,
            market,
            regulatory,
            competitors,
            financial,
            impact,
            generated_at: new Date().toISOString()
        };
    }
};
