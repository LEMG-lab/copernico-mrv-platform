import { LARVALINK_PLANTS } from '../data/larvalinkPlants';
import { THIRD_PARTY_BSF_PLANTS } from '../data/thirdPartyPlants';

export class NetworkDataService {

    getNetworkStats() {
        // Calcular estadísticas en tiempo real
        const larvalinkCapacity = LARVALINK_PLANTS.reduce((acc, p) => acc + p.capacity_tons_day, 0);
        const thirdPartyCapacity = THIRD_PARTY_BSF_PLANTS.reduce((acc, p) => acc + p.capacity_tons_day, 0);

        // Estimaciones para la industria
        const totalMarketValue = 1200; // Millones USD
        const cagr = 28.5; // Porcentaje

        // Impacto acumulado (simulado)
        const totalWasteProcessed = LARVALINK_PLANTS.reduce((acc, p) => {
            // Simular dias operativos * capacidad * factor uso
            return acc + (p.status === 'operativa' ? p.capacity_tons_day * 300 : 0);
        }, 0);

        return {
            larvalink: {
                count: LARVALINK_PLANTS.length,
                capacity: larvalinkCapacity,
                wasteProcessedYTD: Math.round(totalWasteProcessed * 0.4), // YTD aproximado
                co2Avoided: LARVALINK_PLANTS.reduce((acc, p) => acc + p.co2eq_avoided_ytd, 0)
            },
            industry: {
                count: 45, // Estimado global
                knownCount: THIRD_PARTY_BSF_PLANTS.length,
                capacity: thirdPartyCapacity + 1500, // +1500 de otros no listados
                marketValue: totalMarketValue,
                cagr: cagr
            }
        };
    }
}

export const networkDataService = new NetworkDataService();
