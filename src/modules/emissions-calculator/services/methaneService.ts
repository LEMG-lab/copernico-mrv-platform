import { RegionalMethane, Plant } from '../types/emissions.types';

// En un entorno de producción, esto llamaría a Sentinel Hub Statistical API
// Collection: sentinel-5p-l2
// Product: L2__CH4___

class MethaneService {
    async getRegionalData(plant: Plant): Promise<RegionalMethane> {
        // Simulación de latencia de red
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generar valores realistas de metano atmosférico (aprox 1800-1950 ppb es el background global/regional)
        // Variación según ubicación para realismo
        const basePPB = plant.id === 'xochimilco' ? 1920 : 1880;
        const randomVar = (Math.random() - 0.5) * 40; // +/- 20 ppb

        const value = Math.round(basePPB + randomVar);

        // Anomaly: Comparación con promedio 2024 (simulado)
        const anomaly = parseFloat(((value - 1900) / 1900 * 100).toFixed(2));

        return {
            date: new Date().toISOString(),
            value_ppb: value,
            anomaly: anomaly,
            loading: false
        };
    }

    // Método para obtener mapa (tile URL) - Placeholder
    getMethaneMapUrl(plant: Plant): string {
        // Retorna URL de un tile layer de WMS de Sentinel Hub si estuviera configurado
        // Como placeholder, usaremos una imagen estática representativa generada o asset
        return "";
    }
}

export const methaneService = new MethaneService();
