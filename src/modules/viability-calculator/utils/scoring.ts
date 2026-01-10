import { Location, ProjectParameters, ClimateData, WasteAvailability, MarketAnalysis, RegulatoryEnvironment, Competitor } from '../types/viability.types';

export function calculateViabilityScore(
    location: Location,
    params: ProjectParameters,
    climate: ClimateData,
    waste: WasteAvailability,
    market: MarketAnalysis,
    regulatory: RegulatoryEnvironment,
    competitors: Competitor[]
): number {

    // Ponderaciones
    const weights = {
        climate: 0.20,
        waste: 0.25,
        market: 0.20,
        regulatory: 0.15,
        competition: 0.10,
        infrastructure: 0.10
    };

    // Calcular score de competencia (mejor si no hay competidores cercanos)
    // Si no hay competidores, el score es 100. Si hay, el score aumenta con la distancia.
    // 500km = 100 puntos seguros.
    const nearestCompetitor = competitors.sort((a, b) => a.distance_km - b.distance_km)[0];
    const competitionScore = !nearestCompetitor
        ? 100
        : Math.min(100, (nearestCompetitor.distance_km / 500) * 100);

    // Score ponderado
    const weightedScore =
        (climate.climate_score * weights.climate) +
        (waste.score * weights.waste) +
        (market.score * weights.market) +
        (regulatory.score * weights.regulatory) +
        (competitionScore * weights.competition) +
        (75 * weights.infrastructure); // Placeholder de infraestructura

    return Math.round(weightedScore);
}

export function getRecommendation(score: number): 'highly_viable' | 'viable' | 'challenging' | 'not_recommended' {
    if (score >= 80) return 'highly_viable';
    if (score >= 60) return 'viable';
    if (score >= 40) return 'challenging';
    return 'not_recommended';
}
