export type PlantStatus = 'operativa' | 'construccion' | 'planeada';

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface BaseEntity {
    name: string;
    country: string;
    city?: string;
    coordinates: Coordinates;
}

export interface LarvaLinkPlant extends BaseEntity {
    id: string;
    capacity_tons_day: number;
    status: PlantStatus;
    start_date: string;
    co2eq_avoided_ytd: number;
    verified: boolean;
    blockchain_hash: string | null;
}

export interface ThirdPartyPlant extends BaseEntity {
    capacity_tons_day: number;
    source: string;
}

export interface MethaneHotspot extends BaseEntity {
    ch4_anomaly: string;
    opportunity: string;
    live_data?: {
        min: number;
        max: number;
        mean: number;
        stDev: number;
        last_updated: string;
    };
}

export interface NetworkFilters {
    showLarvaLink: boolean;
    showThirdParty: boolean;
    showHotspots: boolean;
    regions: string[];
}
