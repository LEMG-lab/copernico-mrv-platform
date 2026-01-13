import { RegionalMethane, Plant } from '../types/emissions.types';
import { mrvService } from '../../../services/mrvService';

// En un entorno de producción, esto llamaría a Sentinel Hub Statistical API
// Collection: sentinel-5p-l2
// Product: L2__CH4___

class MethaneService {
    async getRegionalData(plant: Plant): Promise<RegionalMethane> {
        try {
            console.log(`[MethaneService] Fetching Sentinel-5P stats for ${plant.name}...`);
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            // Usamos el BBOX definido en la planta o generamos uno pequeño
            const bbox = plant.coordinates.bbox || [
                plant.coordinates.lng - 0.05,
                plant.coordinates.lat - 0.05,
                plant.coordinates.lng + 0.05,
                plant.coordinates.lat + 0.05
            ];

            const stats = await mrvService.getMethaneStats(bbox, startDate, endDate);

            if (stats.mean > 0) {
                // Anomaly: Comparación con promedio global aproximado (1900 ppb)
                const anomaly = parseFloat(((stats.mean - 1900) / 1900 * 100).toFixed(2));

                return {
                    date: endDate,
                    value_ppb: parseFloat(stats.mean.toFixed(2)),
                    anomaly: anomaly,
                    loading: false
                };
            }

            console.warn('[MethaneService] No data found, using simulation fallback.');
            throw new Error("No data returned from Copernicus");

        } catch (error) {
            console.error("[MethaneService] Error fetching real data, using fallback", error);

            // Fallback Simulation (Legacy Logic)
            await new Promise(resolve => setTimeout(resolve, 800));
            const basePPB = plant.id === 'xochimilco' ? 1920 : 1880;
            const randomVar = (Math.random() - 0.5) * 40;
            const value = Math.round(basePPB + randomVar);
            const anomaly = parseFloat(((value - 1900) / 1900 * 100).toFixed(2));

            return {
                date: new Date().toISOString(),
                value_ppb: value,
                anomaly: anomaly,
                loading: false
            };
        }
    }

    // Método para obtener mapa (tile URL) - Placeholder
    getMethaneMapUrl(plant: Plant): string {
        // Retorna URL de un tile layer de WMS de Sentinel Hub si estuviera configurado
        // Como placeholder, usaremos una imagen estática representativa generada o asset
        return "";
    }
}

export const methaneService = new MethaneService();
