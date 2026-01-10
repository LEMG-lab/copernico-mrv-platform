export interface Parcel {
    id: string;
    name: string;
    type: 'terralink' | 'control';
    coordinates: {
        bbox: [number, number, number, number]; // [west, south, east, north]
        center: [number, number]; // [lng, lat]
    };
    crop: string;
    plantingDate: string;
    area_hectares: number;
}

export interface NDVIReading {
    date: string;
    value: number;
    cloudCoverage: number;
}

export interface ParcelComparison {
    terralink: {
        parcel: Parcel;
        ndviHistory: NDVIReading[];
        currentNDVI: number;
        avgMoisture: number;
    };
    control: {
        parcel: Parcel;
        ndviHistory: NDVIReading[];
        currentNDVI: number;
        avgMoisture: number;
    };
    improvement: {
        ndviDelta: number;
        ndviPercentage: number;
        moistureDelta: number;
        moisturePercentage: number;
    };
    timestamp: string;
    verificationHash: string;
}

export const DEMO_PARCELS: Parcel[] = [
    {
        id: "terralink-001",
        name: "Parcela A - TerraLINK",
        type: "terralink",
        coordinates: {
            bbox: [-98.225, 19.315, -98.220, 19.320],
            center: [-98.2225, 19.3175]
        },
        crop: "Maíz",
        plantingDate: "2025-03-15",
        area_hectares: 2.5
    },
    {
        id: "control-001",
        name: "Parcela B - Control",
        type: "control",
        coordinates: {
            bbox: [-98.230, 19.315, -98.225, 19.320],
            center: [-98.2275, 19.3175]
        },
        crop: "Maíz",
        plantingDate: "2025-03-15",
        area_hectares: 2.5
    }
];
