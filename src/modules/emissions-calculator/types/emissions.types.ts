import { IPCC_FACTORS } from '../constants/ipccFactors';

export interface Plant {
    id: string;
    name: string;
    location: string;
    coordinates: {
        lat: number;
        lng: number;
        bbox: [number, number, number, number];
    };
    capacity_tons_day: number;
    status: 'operativa' | 'construccion' | 'planeada';
}

export type WasteType = keyof typeof IPCC_FACTORS.wasteTypes;
export type Period = 'day' | 'month' | 'year';
export type LandfillType = keyof typeof IPCC_FACTORS.capture_efficiency;

export interface WasteInput {
    wasteType: WasteType;
    tons: number;
    period: Period;
    landfillType: LandfillType;
}

export interface EmissionsCalculation {
    input: WasteInput;
    baseline: {
        ch4_kg: number;
        co2eq_tons: number;
        methodology: string;
    };
    project: {
        ch4_kg: number;
        co2eq_tons: number;
    };
    avoided: {
        ch4_kg: number;
        co2eq_tons: number;
        percentage: number;
    };
    equivalencies: {
        trees: number;
        car_km: number;
        homes: number;
        flights: number;
    };
    verification: {
        hash: string;
        timestamp: string;
        factors_source: string;
    };
}

export interface RegionalMethane {
    date: string;
    value_ppb: number;  // Parts per billion
    anomaly: number;    // Diferencia vs promedio historico
    loading: boolean;
}

export const LARVALINK_PLANTS: Plant[] = [
    {
        id: "papalotla",
        name: "Planta Papalotla",
        location: "Tlaxcala, México",
        coordinates: {
            lat: 19.16, // Coordenadas ajustadas a zona real Papalotla
            lng: -98.20,
            bbox: [-98.22, 19.14, -98.18, 19.18]
        },
        capacity_tons_day: 18,
        status: "operativa"
    },
    {
        id: "xochimilco",
        name: "Planta Xochimilco",
        location: "CDMX, México",
        coordinates: {
            lat: 19.27,
            lng: -99.10,
            bbox: [-99.15, 19.24, -99.05, 19.30]
        },
        capacity_tons_day: 50,
        status: "construccion"
    },
    {
        id: "queretaro",
        name: "Planta Querétaro",
        location: "Querétaro, México",
        coordinates: {
            lat: 20.59,
            lng: -100.39,
            bbox: [-100.42, 20.57, -100.36, 20.61]
        },
        capacity_tons_day: 100,
        status: "planeada"
    }
];
