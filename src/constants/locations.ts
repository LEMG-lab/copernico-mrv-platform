/**
 * Ubicaciones de plantas LarvaLINK para monitoreo MRV
 */

export interface LarvaLinkLocation {
    id: string;
    name: string;
    description: string;
    bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
    center: [number, number]; // [lat, lon] - Leaflet usa [lat, lon], STAC usa [lon, lat]
    status: 'operativa' | 'en_desarrollo' | 'planeada';
}

export const LARVALINK_LOCATIONS: LarvaLinkLocation[] = [
    {
        id: "tepetlaoxtoc",
        name: "Planta Tepetlaoxtoc",
        description: "Planta piloto operativa desde octubre 2025",
        bbox: [-98.87, 19.55, -98.82, 19.60], // Keeping same bbox for now or should update? Assuming same region
        center: [19.575, -98.845],
        status: "operativa"
    },
    {
        id: "xochimilco",
        name: "Xochimilco UNESCO",
        description: "Proyecto de procesamiento de lirio acuatico",
        bbox: [-99.15, 19.24, -99.05, 19.30],
        center: [19.27, -99.10], // Leaflet format [lat, lon]
        status: "en_desarrollo"
    },
    {
        id: "campeche",
        name: "Campeche",
        description: "Zona de referencia para baseline de emisiones",
        bbox: [-90.60, 19.80, -90.50, 19.90],
        center: [19.85, -90.55], // Leaflet format [lat, lon]
        status: "planeada"
    }
];
