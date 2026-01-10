// src/modules/global-network/services/globalMethaneService.ts

export class GlobalMethaneService {

    // Simulación de obtención de capa WMS para Sentinel-5P CH4
    getGlobalMethaneLayerUrl(): string {
        // URL de ejemplo de Sentinel Hub WMS (requeriría autenticación real)
        // return "https://services.sentinel-hub.com/ogc/wms/...";
        return "";
    }

    async getMethaneTimeSeries(bbox: [number, number, number, number]): Promise<any[]> {
        // Simular fetch de datos temporales
        await new Promise(resolve => setTimeout(resolve, 800));
        return Array.from({ length: 12 }, (_, i) => ({
            date: new Date(2025, i, 1).toISOString(),
            value: 1850 + Math.random() * 100
        }));
    }
}

export const globalMethaneService = new GlobalMethaneService();
