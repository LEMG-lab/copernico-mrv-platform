import { MethaneHotspot } from '../types/network.types';

export const METHANE_HOTSPOTS: MethaneHotspot[] = [
    { name: "Valle de México", country: "Mexico", coordinates: { lat: 19.43, lng: -99.13 }, ch4_anomaly: "+15%", opportunity: "Alta densidad de residuos orgánicos" },
    { name: "Sao Paulo", country: "Brazil", coordinates: { lat: -23.55, lng: -46.63 }, ch4_anomaly: "+22%", opportunity: "Mayor generador de residuos de Latam" },
    { name: "Delhi NCR", country: "India", coordinates: { lat: 28.61, lng: 77.21 }, ch4_anomaly: "+31%", opportunity: "Crisis de rellenos sanitarios" },
    { name: "Lagos", country: "Nigeria", coordinates: { lat: 6.52, lng: 3.38 }, ch4_anomaly: "+28%", opportunity: "Crecimiento urbano acelerado" },
    { name: "Jakarta", country: "Indonesia", coordinates: { lat: -6.21, lng: 106.85 }, ch4_anomaly: "+19%", opportunity: "Políticas nuevas de residuos" }
];
