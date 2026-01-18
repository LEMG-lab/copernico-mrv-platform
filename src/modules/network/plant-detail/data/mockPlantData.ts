import { PlantDetail } from "../types/plantDetail.types";
import { LARVALINK_SDG_CONTRIBUTIONS } from "./sdgData";

export const MOCK_PLANT_TEPETLAOXTOC: PlantDetail = {
    id: "ll-100",
    name: "LarvaLINK Tepetlaoxtoc",
    company: "LarvaLINK MetaBioconversion S.A. de C.V.",
    status: "operational",

    corporate: {
        legal_name: "LarvaLINK MetaBioconversion 3.0 S.A. de C.V.",
        tax_id: "LMB251015XXX",
        website: "https://larvalink.com",
        email: "contacto@larvalink.com",
        phone: "+52 55 1234 5678",
        founded_year: 2024,
        employees: {
            total: 47,
            women: 33,
            women_percentage: 70
        }
    },

    location: {
        address: "Carretera Federal 117 Km 5.5",
        city: "Tepetlaoxtoc de Hidalgo",
        state: "Estado de México",
        country: "Mexico",
        postal_code: "56070",
        coordinates: {
            lat: 19.5701, // Updated to Tepetlaoxtoc approx (or keep specific mock coords if needed, but this is safer)
            lng: -98.8217
        },
        timezone: "America/Mexico_City",
        google_maps_url: "https://maps.google.com/?q=19.5701,-98.8217",
        street_view_url: "https://www.google.com/maps/@19.5701,-98.8217,3a,75y,90t/data=!3m6!1e1!3m4!1s..."
    },

    operations: {
        capacity_tons_day: 18,
        current_utilization: 65,
        operational_since: "2025-10-15",
        operating_hours: "24/7",
        waste_types: [
            "Residuos de alimentos",
            "Residuos de mercado",
            "Procesamiento de alimentos"
        ],
        products: [
            "Harina de proteina (ProLINK)",
            "Aceite de larva (LipiLINK)",
            "Biofertilizante (TerraLINK)",
            "Larva viva"
        ],
        certifications: [
            "Registro SENASICA (en proceso)",
            "Licencia Ambiental SEMARNAT"
        ]
    },

    production: {
        period: "2025-Q4",
        waste_processed_tons: 1642,
        protein_produced_kg: 287350,
        oil_produced_liters: 82140,
        frass_produced_kg: 657800,
        live_larvae_kg: 45000,
        conversion_rate: 0.175
    },

    environmental_impact: {
        period: "2025-Q4",
        co2eq_avoided_tons: 2847,
        methane_avoided_kg: 34200,
        waste_diverted_tons: 1642,
        water_saved_m3: 125000,
        hectares_fertilized: 45,
        trees_equivalent: 47450,
        cars_off_road_equivalent: 617
    },

    social_impact: {
        direct_jobs: 47,
        indirect_jobs: 156,
        avg_salary_vs_minimum: 4.8,
        training_hours: 2400,
        communities_benefited: 8,
        local_suppliers: 23
    },

    blockchain: {
        network: "Global Force",
        contract_address: "0x7f3a8b2c9e1d4f5a6b7c8d9e0f1a2b3c4d5e6f7a",
        last_verification: "2025-12-22T08:30:00Z",
        total_transactions: 4847,
        verification_hash: "0xabc123def456789abc123def456789abc123def456789",
        explorer_url: "https://explorer.globalforce.io/transaction/a44b8630b7072fd0b1689e781b9e5a786f97bdd3d9a5fdee2a7707e258426cd3"
    },

    environment: {
        temperature: { current: 28.5, trend: 'stable', history: [27.8, 28.1, 28.4, 28.5, 28.5, 28.3, 28.5] },
        humidity: { current: 65, trend: 'up', history: [62, 63, 64, 64, 65, 66, 65] },
        co2: { current: 450, status: 'nominal' },
        airflow: { current: 1200, status: 'nominal' }
    },

    inventory: {
        feedstock_tons: 45.5,
        feedstock_capacity: 100,
        larvae_stage_1_kg: 250,
        larvae_stage_2_kg: 1800,
        larvae_stage_3_kg: 5200,
        frass_tons: 12.8,
        product_ready_tons: 5.2
    },

    staffing: {
        current_shift: 'morning',
        operators_active: 12,
        supervisors_active: 2,
        safety_status: 'safe'
    },

    sensors: {
        total: 24,
        online: 23,
        types: ["Temperatura", "Humedad", "CO2", "Bascula", "Camara", "Flujo Aire"],
        last_reading: "2025-12-22T10:45:00Z",
        data_frequency: "Tiempo real (cada 15 min)"
    },

    roadmap: [
        {
            id: "rm-001",
            title: "Inicio de operaciones piloto",
            description: "Primera produccion comercial de la planta",
            status: "completed",
            target_date: "2025-10-15",
            completion_date: "2025-10-15",
            category: "expansion"
        },
        {
            id: "rm-002",
            title: "Certificacion SENASICA",
            description: "Obtener registro como productor de alimento animal",
            status: "in_progress",
            target_date: "2026-02-01",
            category: "certification"
        },
        {
            id: "rm-003",
            title: "Expansion a 30 tons/dia",
            description: "Duplicar capacidad de procesamiento",
            status: "planned",
            target_date: "2026-06-01",
            category: "expansion"
        },
        {
            id: "rm-004",
            title: "Integracion METAFEED AI",
            description: "Sistema de optimizacion de sustratos con IA",
            status: "in_progress",
            target_date: "2026-03-01",
            category: "technology"
        },
        {
            id: "rm-005",
            title: "Certificacion ISO 14001",
            description: "Sistema de gestion ambiental certificado",
            status: "planned",
            target_date: "2026-09-01",
            category: "certification"
        },
        {
            id: "rm-006",
            title: "Linea de aceite cosmetico",
            description: "Lanzamiento de LipiLINK para industria cosmetica",
            status: "planned",
            target_date: "2026-12-01",
            category: "product"
        }
    ],

    sdg_contributions: LARVALINK_SDG_CONTRIBUTIONS,

    images: {
        main: "/plants/tepetlaoxtoc-main.jpg", // Keeping filenames as they might exist or be placeholders
        gallery: [
            "/plants/tepetlaoxtoc-exterior.jpg",
            "/plants/tepetlaoxtoc-cria.jpg",
            "/plants/tepetlaoxtoc-procesamiento.jpg",
            "/plants/tepetlaoxtoc-producto.jpg"
        ],
        satellite: "/satellites/tepetlaoxtoc-sentinel.jpg"
    },

    contacts: [
        {
            name: "Dr. Roberto Rendon",
            role: "Director de Operaciones",
            email: "roberto@larvalink.com",
            phone: "+52 55 1234 5678"
        },
        {
            name: "Maria Garcia",
            role: "Gerente de Planta",
            email: "maria.garcia@larvalink.com"
        }
    ]
};
