import { LarvaLinkPlant } from '../types/network.types';

export const LARVALINK_PLANTS: LarvaLinkPlant[] = [
    {
        id: "ll-001",
        name: "Papalotla",
        country: "Mexico",
        coordinates: { lat: 19.16, lng: -98.20 },
        capacity_tons_day: 18,
        status: "operativa",
        start_date: "2025-10",
        co2eq_avoided_ytd: 2847,
        verified: true,
        blockchain_hash: "0x7f3a2c1b9d8e..."
    },
    {
        id: "ll-002",
        name: "Xochimilco",
        country: "Mexico",
        coordinates: { lat: 19.27, lng: -99.10 },
        capacity_tons_day: 50,
        status: "construccion",
        start_date: "2026-Q2",
        co2eq_avoided_ytd: 0,
        verified: true,
        blockchain_hash: null
    },
    {
        id: "ll-003",
        name: "Querétaro",
        country: "Mexico",
        coordinates: { lat: 20.59, lng: -100.39 },
        capacity_tons_day: 100,
        status: "planeada",
        start_date: "2026-Q4",
        co2eq_avoided_ytd: 0,
        verified: true,
        blockchain_hash: null
    }
];
