import { Credit, Plant } from '../types/marketplace.types';

export const MOCK_PLANTS: Plant[] = [
    {
        id: "plant-001",
        name: "LarvaLINK Tepetlaoxtoc",
        country: "Mexico",
        region: "Tlaxcala",
        coordinates: { lat: 19.575, lng: -98.845 },
        capacity_tons_day: 18,
        certification_date: "2025-10-15",
        verification_level: "full",
        rating: 4.9,
        total_credits_sold: 2847,
        avatar_url: "/plants/tepetlaoxtoc.jpg"
    },
    {
        id: "plant-002",
        name: "Protix Dongen",
        country: "Netherlands",
        region: "Noord-Brabant",
        coordinates: { lat: 51.69, lng: 5.30 },
        capacity_tons_day: 300,
        certification_date: "2024-03-20",
        verification_level: "satellite_iot",
        rating: 4.7,
        total_credits_sold: 45000,
        avatar_url: "/plants/protix.jpg"
    },
    {
        id: "plant-003",
        name: "InnovaFeed Nesle",
        country: "France",
        region: "Picardie",
        coordinates: { lat: 49.42, lng: 2.83 },
        capacity_tons_day: 200,
        certification_date: "2024-06-10",
        verification_level: "satellite_iot",
        rating: 4.8,
        total_credits_sold: 32000,
        avatar_url: "/plants/innovafeed.jpg"
    },
    {
        id: "plant-004",
        name: "Entobel Vietnam",
        country: "Vietnam",
        region: "Ho Chi Minh",
        coordinates: { lat: 10.82, lng: 106.63 },
        capacity_tons_day: 80,
        certification_date: "2025-01-15",
        verification_level: "satellite",
        rating: 4.5,
        total_credits_sold: 8500,
        avatar_url: "/plants/entobel.jpg"
    },
    {
        id: "plant-005",
        name: "AgriProtein Cape Town",
        country: "South Africa",
        region: "Western Cape",
        coordinates: { lat: -33.93, lng: 18.42 },
        capacity_tons_day: 100,
        certification_date: "2024-09-01",
        verification_level: "satellite_iot",
        rating: 4.6,
        total_credits_sold: 15000,
        avatar_url: "/plants/agriprotein.jpg"
    }
];

export const MOCK_CREDITS: Credit[] = [
    {
        id: "credit-001",
        type: "carbon",
        plant: MOCK_PLANTS[0],
        vintage: "2025",
        quantity: 500,
        unit: "tCO2eq",
        price_per_unit: 28,
        currency: "USD",
        status: "available",
        created_at: "2025-12-01T00:00:00Z",
        verification: {
            level: "full",
            satellite_hash: "0x7f3a8b2c9e1d4f5a6b7c8d9e0f1a2b3c",
            iot_hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
            blockchain_tx: "0xabc123def456789",
            methodology: "IPCC 2019 + AR6 GWP20",
            last_verified: "2025-12-20T14:30:00Z"
        },
        metadata: {
            waste_type: "Residuos de alimentos",
            beneficiaries: 150,
            sdg_alignment: [2, 8, 12, 13]
        },
        images: {
            satellite_before: "/satellites/tepetlaoxtoc-before.jpg",
            satellite_after: "/satellites/tepetlaoxtoc-after.jpg",
            plant_photo: "/plants/tepetlaoxtoc-interior.jpg"
        }
    },
    {
        id: "credit-002",
        type: "circular",
        plant: MOCK_PLANTS[0],
        vintage: "2025",
        quantity: 1200,
        unit: "tons",
        price_per_unit: 12,
        currency: "USD",
        status: "available",
        created_at: "2025-12-01T00:00:00Z",
        verification: {
            level: "full",
            satellite_hash: "0x8a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
            iot_hash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e",
            blockchain_tx: "0xdef456789abc123",
            methodology: "Circular Economy Index v2.1",
            last_verified: "2025-12-20T14:30:00Z"
        },
        metadata: {
            waste_type: "Residuos de mercado",
            sdg_alignment: [11, 12]
        },
        images: {}
    },
    {
        id: "credit-003",
        type: "bio",
        plant: MOCK_PLANTS[0],
        vintage: "2025",
        quantity: 25,
        unit: "hectares",
        price_per_unit: 65,
        currency: "USD",
        status: "available",
        created_at: "2025-11-15T00:00:00Z",
        verification: {
            level: "satellite_iot",
            satellite_hash: "0x9b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e",
            iot_hash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
            blockchain_tx: "0x789abc123def456",
            methodology: "NDVI Delta + Soil Carbon Proxy",
            last_verified: "2025-12-18T10:00:00Z"
        },
        metadata: {
            crop_improved: "Maiz",
            sdg_alignment: [2, 15]
        },
        images: {
            satellite_before: "/satellites/parcela-before.jpg",
            satellite_after: "/satellites/parcela-after.jpg"
        }
    },
    {
        id: "credit-004",
        type: "carbon",
        plant: MOCK_PLANTS[1],
        vintage: "2025",
        quantity: 5000,
        unit: "tCO2eq",
        price_per_unit: 32,
        currency: "USD",
        status: "available",
        created_at: "2025-11-01T00:00:00Z",
        verification: {
            level: "satellite_iot",
            satellite_hash: "0xab6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e",
            blockchain_tx: "0x456789abc123def",
            methodology: "IPCC 2019 + AR6 GWP20",
            last_verified: "2025-12-19T16:00:00Z"
        },
        metadata: {
            waste_type: "Residuos agroindustriales",
            beneficiaries: 450,
            sdg_alignment: [8, 12, 13]
        },
        images: {}
    },
    {
        id: "credit-005",
        type: "carbon",
        plant: MOCK_PLANTS[2],
        vintage: "2025",
        quantity: 3500,
        unit: "tCO2eq",
        price_per_unit: 35,
        currency: "USD",
        status: "available",
        created_at: "2025-10-20T00:00:00Z",
        verification: {
            level: "satellite_iot",
            satellite_hash: "0xbc7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f",
            blockchain_tx: "0x123def456789abc",
            methodology: "IPCC 2019 + AR6 GWP20",
            last_verified: "2025-12-15T12:00:00Z"
        },
        metadata: {
            waste_type: "Residuos de cerveceria",
            beneficiaries: 320,
            sdg_alignment: [8, 12, 13]
        },
        images: {}
    },
    {
        id: "credit-006",
        type: "social",
        plant: MOCK_PLANTS[4],
        vintage: "2025",
        quantity: 200,
        unit: "beneficiaries",
        price_per_unit: 45,
        currency: "USD",
        status: "available",
        created_at: "2025-09-01T00:00:00Z",
        verification: {
            level: "full",
            satellite_hash: "0xcd8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a",
            iot_hash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
            blockchain_tx: "0xabc789def123456",
            methodology: "Social Impact Assessment v1.0",
            last_verified: "2025-12-10T09:00:00Z"
        },
        metadata: {
            beneficiaries: 200,
            sdg_alignment: [1, 8, 10]
        },
        images: {
            plant_photo: "/plants/agriprotein-community.jpg"
        }
    }
];

export const PRICE_HISTORY = {
    carbon: [
        { date: "2025-01", price: 22 },
        { date: "2025-02", price: 23 },
        { date: "2025-03", price: 24 },
        { date: "2025-04", price: 23 },
        { date: "2025-05", price: 25 },
        { date: "2025-06", price: 26 },
        { date: "2025-07", price: 27 },
        { date: "2025-08", price: 26 },
        { date: "2025-09", price: 28 },
        { date: "2025-10", price: 29 },
        { date: "2025-11", price: 30 },
        { date: "2025-12", price: 28 }
    ],
    circular: [
        { date: "2025-01", price: 8 },
        { date: "2025-06", price: 10 },
        { date: "2025-12", price: 12 }
    ]
};
