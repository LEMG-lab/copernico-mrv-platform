import { Partner, NetworkStats, Delivery } from '../types/partners.types';

export const MOCK_PARTNERS: Partner[] = [
    {
        id: "partner-001",
        business_name: "Restaurantes El Bajío S.A. de C.V.",
        trade_name: "El Bajío Roma",
        slug: "el-bajio-roma",
        tax_id: "REB920101XXX",
        category: "restaurant",
        description: "Cocina mexicana tradicional desde 1972. Especialistas en carnitas, barbacoa y moles.",
        location: {
            address: "Calle Durango 248",
            neighborhood: "Roma Norte",
            city: "Ciudad de México",
            municipality: "Cuauhtémoc",
            state: "CDMX",
            country: "México",
            postal_code: "06700",
            coordinates: { lat: 19.4195, lng: -99.1625 },
            timezone: "America/Mexico_City"
        },
        contact: {
            primary: { name: "Carmen López Martínez", role: "Gerente General", email: "carmen@elbajio.com.mx", phone: "+52 55 5564 1234", whatsapp: "+52 55 5564 1234" },
            operations: { name: "Miguel Ángel Reyes", email: "operaciones@elbajio.com.mx", phone: "+52 55 5564 1235" }
        },
        digital: { website: "https://elbajio.com.mx", instagram: "@elbajiomx", facebook: "ElBajioRestaurante" },
        operations: {
            employees: 45,
            operating_hours: "8:00 AM - 11:00 PM",
            operating_days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            avg_daily_waste_kg: 85,
            peak_days: ["Sábado", "Domingo"],
            waste_types: ['kitchen_prep', 'plate_waste', 'fruits_vegetables', 'eggshells'],
            collection_frequency: "daily",
            collection_days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            collection_time_preference: "7:00 AM - 8:00 AM",
            container_type: "240L bin",
            container_count: 3,
            has_loading_dock: false,
            parking_available: true
        },
        status: "active",
        tier: "gold",
        verified_at: "2025-06-15T10:00:00Z",
        verified_by: "María García",
        certificate_number: "CL-2025-00001",
        qr_code_url: "/qr/partner-001.png",
        qr_short_code: "BAJIO01",
        public_profile_url: "/partners/el-bajio-roma",
        metrics: {
            current_month: { deliveries: 28, total_kg: 2380, co2_avoided_kg: 4284, scans: 342, donations_received: 23, donations_amount: 4560 },
            lifetime: { deliveries: 185, total_kg: 15725, co2_avoided_kg: 28305, trees_equivalent: 1287, cars_off_road_days: 354, meals_equivalent: 31450, water_saved_liters: 157250, scans: 2847, unique_scanners: 1892, donations_count: 156, donations_amount: 28450 },
            yearly: [{ year: 2025, deliveries: 185, total_kg: 15725, co2_avoided_kg: 28305 }],
            monthly: [
                { month: "2025-12", deliveries: 28, total_kg: 2380, co2_avoided_kg: 4284 },
                { month: "2025-11", deliveries: 30, total_kg: 2550, co2_avoided_kg: 4590 },
                { month: "2025-10", deliveries: 31, total_kg: 2635, co2_avoided_kg: 4743 }
            ],
            averages: { kg_per_delivery: 85, deliveries_per_week: 7, kg_per_employee: 350 },
            streak: { current_weeks: 26, best_weeks: 26, consistency_score: 98 },
            rankings: { city_rank: 3, city_total: 45, category_rank: 2, category_total: 28, national_rank: 15, national_total: 127 }
        },
        gamification: {
            level: 8,
            level_name: "Veterano Verde",
            xp_current: 2450,
            xp_next_level: 3000,
            achievements: [
                { id: "first_delivery", name: "Primera Entrega", description: "", icon: "rocket", category: "impact", rarity: "common", xp_reward: 50, seeds_reward: 0, unlocked: true, unlocked_at: "2025-06-15" },
                { id: "kg_10000", name: "Diez Toneladas", description: "", icon: "boxes", category: "impact", rarity: "rare", xp_reward: 500, seeds_reward: 0, unlocked: true, unlocked_at: "2025-11-05" },
                { id: "scans_1000", name: "Viral", description: "", icon: "trending-up", category: "community", rarity: "rare", xp_reward: 400, seeds_reward: 0, unlocked: true, unlocked_at: "2025-11-30" }
            ],
            badges: [
                { id: "gold_tier", name: "Partner Oro", description: "Alcanzaste el tier Oro", image_url: "/badges/gold.png", tier: "gold", earned_at: "2025-09-01", display_priority: 1 }
            ],
            challenges_completed: 18,
            challenges_active: ["monthly_scans", "weekly_consistency"],
            partner_of_month_count: 1,
            last_partner_of_month: "2025-10"
        },
        benefits: { discount_percentage: 10, free_collections_remaining: 0, priority_collection: true, dedicated_account_manager: false, custom_reports: false, api_access: false, white_label_certificate: false, credits_balance: 2500, credits_expiry: "2026-06-15" },
        referrals: { code: "BAJIO2025", referred_count: 3, earned_credits: 4500 },
        blockchain: { wallet_address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", first_transaction: "2025-06-15T10:30:00Z", total_transactions: 185, last_transaction: "2025-12-22T07:45:00Z", verification_hash: "0xabc123def456789abc123def456789abc123def456789" },
        images: { logo: "/partners/elbajio-logo.png", cover: "/partners/elbajio-cover.jpg", storefront: "/partners/elbajio-storefront.jpg" },
        customer_incentive: { type: "discount", value: "10%", description: "10% de descuento en tu cuenta al mostrar el código", terms: "Válido de lunes a jueves.", redemption_code: "CIRCULAR10", max_redemptions: 500, current_redemptions: 127 },
        subscription: { plan: "growth", status: "active", current_period_end: "2026-06-15", price_monthly: 999 },
        registered_at: "2025-06-01T00:00:00Z",
        activated_at: "2025-06-15T10:00:00Z",
        last_delivery_at: "2025-12-22T07:45:00Z",
        last_login_at: "2025-12-22T09:00:00Z"
    },
    {
        id: "partner-002",
        business_name: "Casa Oaxaca S.A. de C.V.",
        trade_name: "Casa Oaxaca",
        slug: "casa-oaxaca",
        tax_id: "COA980101XXX",
        category: "hotel",
        description: "Hotel boutique con restaurante de cocina oaxaqueña tradicional. 5 estrellas.",
        location: {
            address: "García Vigil 407",
            neighborhood: "Centro Histórico",
            city: "Oaxaca de Juárez",
            state: "Oaxaca",
            country: "México",
            postal_code: "68000",
            coordinates: { lat: 17.0632, lng: -96.7219 },
            timezone: "America/Mexico_City"
        },
        contact: {
            primary: { name: "Alejandro García", role: "Director General", email: "alejandro@casaoaxaca.com.mx", phone: "+52 951 514 4173" }
        },
        digital: { website: "https://casaoaxaca.com.mx", instagram: "@casaoaxaca" },
        operations: {
            employees: 65,
            operating_hours: "24 horas",
            operating_days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            avg_daily_waste_kg: 120,
            waste_types: ['kitchen_prep', 'plate_waste', 'fruits_vegetables', 'garden_waste', 'flowers'],
            collection_frequency: "daily",
            container_count: 4,
            has_loading_dock: true,
            parking_available: true
        },
        status: "active",
        tier: "platinum",
        verified_at: "2025-03-20T10:00:00Z",
        certificate_number: "CL-2025-00002",
        qr_code_url: "/qr/partner-002.png",
        qr_short_code: "CASAOX",
        public_profile_url: "/partners/casa-oaxaca",
        metrics: {
            current_month: { deliveries: 30, total_kg: 3600, co2_avoided_kg: 6480, scans: 189, donations_received: 45, donations_amount: 8900 },
            lifetime: { deliveries: 280, total_kg: 33600, co2_avoided_kg: 60480, trees_equivalent: 2750, cars_off_road_days: 756, meals_equivalent: 67200, water_saved_liters: 336000, scans: 1654, unique_scanners: 1234, donations_count: 289, donations_amount: 52450 },
            yearly: [{ year: 2025, deliveries: 280, total_kg: 33600, co2_avoided_kg: 60480 }],
            monthly: [{ month: "2025-12", deliveries: 30, total_kg: 3600, co2_avoided_kg: 6480 }],
            averages: { kg_per_delivery: 120, deliveries_per_week: 7, kg_per_employee: 517 },
            streak: { current_weeks: 35, best_weeks: 35, consistency_score: 100 },
            rankings: { city_rank: 1, city_total: 10, category_rank: 3, category_total: 18, national_rank: 8, national_total: 127 }
        },
        gamification: { level: 12, level_name: "Champion", xp_current: 4800, xp_next_level: 5000, achievements: [], badges: [], challenges_completed: 28, challenges_active: [], partner_of_month_count: 2 },
        benefits: { discount_percentage: 15, free_collections_remaining: 2, priority_collection: true, dedicated_account_manager: true, custom_reports: true, api_access: false, white_label_certificate: false, credits_balance: 8500 },
        referrals: { code: "CASAOX25", referred_count: 5, earned_credits: 7500 },
        blockchain: { wallet_address: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c", first_transaction: "2025-03-20T10:30:00Z", total_transactions: 280, last_transaction: "2025-12-22T08:00:00Z", verification_hash: "0xdef456789abc123def456789abc123def456789abc1" },
        images: { logo: "/partners/casaoaxaca-logo.png", cover: "/partners/casaoaxaca-cover.jpg" },
        customer_incentive: { type: "discount", value: "15%", description: "15% en consumo de restaurante", terms: "Presentando código QR.", redemption_code: "OAXACA15", max_redemptions: 200, current_redemptions: 89 },
        subscription: { plan: "professional", status: "active", current_period_end: "2026-03-20", price_monthly: 2499 },
        registered_at: "2025-03-01T00:00:00Z",
        activated_at: "2025-03-20T10:00:00Z",
        last_delivery_at: "2025-12-22T08:00:00Z"
    },
    {
        id: "partner-003",
        business_name: "Central de Abastos de Tlaxcala",
        trade_name: "CEDA Tlaxcala",
        slug: "ceda-tlaxcala",
        tax_id: "CAT850101XXX",
        category: "central_abasto",
        description: "Central de abastos con más de 500 locatarios. Principal distribuidor de frutas y verduras del estado.",
        location: {
            address: "Blvd. Guillermo Valle 1500",
            neighborhood: "San Pablo Apetatitlán",
            city: "Tlaxcala",
            state: "Tlaxcala",
            country: "México",
            postal_code: "90600",
            coordinates: { lat: 19.3182, lng: -98.2375 },
            timezone: "America/Mexico_City"
        },
        contact: {
            primary: { name: "Roberto Hernández", role: "Administrador General", email: "admin@cedatlaxcala.com", phone: "+52 246 462 1234" }
        },
        digital: {},
        operations: {
            employees: 25,
            operating_hours: "4:00 AM - 6:00 PM",
            operating_days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            avg_daily_waste_kg: 2500,
            waste_types: ['fruits_vegetables', 'flowers'],
            collection_frequency: "daily",
            container_count: 20,
            has_loading_dock: true,
            parking_available: true
        },
        status: "active",
        tier: "champion",
        verified_at: "2024-06-01T10:00:00Z",
        certificate_number: "CL-2024-00003",
        qr_code_url: "/qr/partner-003.png",
        qr_short_code: "CEDATX",
        public_profile_url: "/partners/ceda-tlaxcala",
        metrics: {
            current_month: { deliveries: 31, total_kg: 77500, co2_avoided_kg: 139500, scans: 45, donations_received: 12, donations_amount: 2400 },
            lifetime: { deliveries: 560, total_kg: 712500, co2_avoided_kg: 1282500, trees_equivalent: 58300, cars_off_road_days: 16031, meals_equivalent: 1425000, water_saved_liters: 7125000, scans: 456, unique_scanners: 234, donations_count: 89, donations_amount: 18900 },
            yearly: [{ year: 2025, deliveries: 365, total_kg: 475000, co2_avoided_kg: 855000 }],
            monthly: [{ month: "2025-12", deliveries: 31, total_kg: 77500, co2_avoided_kg: 139500 }],
            averages: { kg_per_delivery: 2500, deliveries_per_week: 7, kg_per_employee: 28500 },
            streak: { current_weeks: 46, best_weeks: 46, consistency_score: 100 },
            rankings: { city_rank: 1, city_total: 5, category_rank: 1, category_total: 3, national_rank: 1, national_total: 127 }
        },
        gamification: { level: 20, level_name: "Leyenda", xp_current: 15000, xp_next_level: 20000, achievements: [], badges: [], challenges_completed: 45, challenges_active: [], partner_of_month_count: 5 },
        benefits: { discount_percentage: 20, free_collections_remaining: 10, priority_collection: true, dedicated_account_manager: true, custom_reports: true, api_access: true, white_label_certificate: true, credits_balance: 45000 },
        referrals: { code: "CEDATX24", referred_count: 12, earned_credits: 18000 },
        blockchain: { wallet_address: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d", first_transaction: "2024-06-01T05:00:00Z", total_transactions: 560, last_transaction: "2025-12-22T05:30:00Z", verification_hash: "0x789abc123def456789abc123def456789abc123def4" },
        images: { logo: "/partners/ceda-logo.png", cover: "/partners/ceda-cover.jpg" },
        subscription: { plan: "enterprise", status: "active", current_period_end: "2026-06-01", price_monthly: 4999 },
        registered_at: "2024-05-15T00:00:00Z",
        activated_at: "2024-06-01T10:00:00Z",
        last_delivery_at: "2025-12-22T05:30:00Z"
    },
    {
        id: "partner-004",
        business_name: "Starbucks Coffee México S.A. de C.V.",
        trade_name: "Starbucks Reforma 222",
        slug: "starbucks-reforma-222",
        tax_id: "SCM990101XXX",
        category: "coffee_shop",
        description: "Sucursal premium de Starbucks en el centro comercial Reforma 222.",
        location: {
            address: "Av. Paseo de la Reforma 222",
            neighborhood: "Juárez",
            city: "Ciudad de México",
            municipality: "Cuauhtémoc",
            state: "CDMX",
            country: "México",
            postal_code: "06600",
            coordinates: { lat: 19.4274, lng: -99.1582 },
            timezone: "America/Mexico_City"
        },
        contact: {
            primary: { name: "Laura Mendoza", role: "Store Manager", email: "laura.mendoza@starbucks.com.mx", phone: "+52 55 5208 3456" }
        },
        digital: { website: "https://starbucks.com.mx", instagram: "@staborationsmx" },
        operations: {
            employees: 18,
            operating_hours: "7:00 AM - 10:00 PM",
            operating_days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            avg_daily_waste_kg: 25,
            waste_types: ['coffee_grounds', 'bread_bakery', 'dairy'],
            collection_frequency: "daily",
            container_count: 2,
            has_loading_dock: false,
            parking_available: true
        },
        status: "active",
        tier: "silver",
        verified_at: "2025-08-10T10:00:00Z",
        certificate_number: "CL-2025-00004",
        qr_code_url: "/qr/partner-004.png",
        qr_short_code: "SBUX222",
        public_profile_url: "/partners/starbucks-reforma-222",
        metrics: {
            current_month: { deliveries: 28, total_kg: 700, co2_avoided_kg: 1260, scans: 456, donations_received: 67, donations_amount: 13450 },
            lifetime: { deliveries: 140, total_kg: 3500, co2_avoided_kg: 6300, trees_equivalent: 287, cars_off_road_days: 79, meals_equivalent: 7000, water_saved_liters: 35000, scans: 1892, unique_scanners: 1567, donations_count: 234, donations_amount: 45890 },
            yearly: [{ year: 2025, deliveries: 140, total_kg: 3500, co2_avoided_kg: 6300 }],
            monthly: [{ month: "2025-12", deliveries: 28, total_kg: 700, co2_avoided_kg: 1260 }],
            averages: { kg_per_delivery: 25, deliveries_per_week: 7, kg_per_employee: 194 },
            streak: { current_weeks: 18, best_weeks: 18, consistency_score: 95 },
            rankings: { city_rank: 8, city_total: 45, category_rank: 1, category_total: 8, national_rank: 25, national_total: 127 }
        },
        gamification: { level: 5, level_name: "Activo", xp_current: 1200, xp_next_level: 1500, achievements: [], badges: [], challenges_completed: 8, challenges_active: ["monthly_scans"], partner_of_month_count: 0 },
        benefits: { discount_percentage: 5, free_collections_remaining: 0, priority_collection: false, dedicated_account_manager: false, custom_reports: false, api_access: false, white_label_certificate: false, credits_balance: 800 },
        referrals: { code: "SBUX2025", referred_count: 1, earned_credits: 1500 },
        blockchain: { wallet_address: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e", first_transaction: "2025-08-10T07:00:00Z", total_transactions: 140, last_transaction: "2025-12-22T07:15:00Z", verification_hash: "0xabc123def456789abc123def456789abc123def456" },
        images: { logo: "/partners/starbucks-logo.png" },
        customer_incentive: { type: "freebie", value: "Upgrade gratis", description: "Upgrade de tamaño gratis en tu bebida", terms: "Una vez por día.", redemption_code: "GREENUP", max_redemptions: 1000, current_redemptions: 345 },
        subscription: { plan: "growth", status: "active", current_period_end: "2026-08-10", price_monthly: 999 },
        registered_at: "2025-08-01T00:00:00Z",
        activated_at: "2025-08-10T10:00:00Z",
        last_delivery_at: "2025-12-22T07:15:00Z"
    },
    {
        id: "partner-005",
        business_name: "Hospital Ángeles Puebla S.A. de C.V.",
        trade_name: "Hospital Ángeles Puebla",
        slug: "hospital-angeles-puebla",
        tax_id: "HAP050101XXX",
        category: "hospital",
        description: "Hospital privado de alta especialidad con 350 camas y cafetería para pacientes.",
        location: {
            address: "Av. Kepler 2143",
            neighborhood: "Reserva Territorial Atlixcáyotl",
            city: "Puebla",
            state: "Puebla",
            country: "México",
            postal_code: "72190",
            coordinates: { lat: 19.0278, lng: -98.2265 },
            timezone: "America/Mexico_City"
        },
        contact: {
            primary: { name: "Dr. Fernando Ruiz", role: "Director Administrativo", email: "fernando.ruiz@hospitalesangeles.com", phone: "+52 222 303 6500" }
        },
        digital: { website: "https://hospitalesangeles.com/puebla" },
        operations: {
            employees: 850,
            operating_hours: "24 horas",
            operating_days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            avg_daily_waste_kg: 350,
            waste_types: ['kitchen_prep', 'plate_waste', 'fruits_vegetables'],
            collection_frequency: "daily",
            container_count: 8,
            has_loading_dock: true,
            parking_available: true
        },
        status: "active",
        tier: "champion",
        verified_at: "2024-09-01T10:00:00Z",
        certificate_number: "CL-2024-00005",
        qr_code_url: "/qr/partner-005.png",
        qr_short_code: "HAPUE",
        public_profile_url: "/partners/hospital-angeles-puebla",
        metrics: {
            current_month: { deliveries: 30, total_kg: 10500, co2_avoided_kg: 18900, scans: 78, donations_received: 25, donations_amount: 12500 },
            lifetime: { deliveries: 480, total_kg: 168000, co2_avoided_kg: 302400, trees_equivalent: 13750, cars_off_road_days: 3780, meals_equivalent: 336000, water_saved_liters: 1680000, scans: 892, unique_scanners: 645, donations_count: 178, donations_amount: 89500 },
            yearly: [{ year: 2025, deliveries: 350, total_kg: 126000, co2_avoided_kg: 226800 }],
            monthly: [{ month: "2025-12", deliveries: 30, total_kg: 10500, co2_avoided_kg: 18900 }],
            averages: { kg_per_delivery: 350, deliveries_per_week: 7, kg_per_employee: 198 },
            streak: { current_weeks: 40, best_weeks: 40, consistency_score: 100 },
            rankings: { city_rank: 1, city_total: 12, category_rank: 1, category_total: 8, national_rank: 3, national_total: 127 }
        },
        gamification: { level: 18, level_name: "Elite", xp_current: 12500, xp_next_level: 15000, achievements: [], badges: [], challenges_completed: 38, challenges_active: [], partner_of_month_count: 3 },
        benefits: { discount_percentage: 20, free_collections_remaining: 5, priority_collection: true, dedicated_account_manager: true, custom_reports: true, api_access: true, white_label_certificate: true, credits_balance: 35000 },
        referrals: { code: "HAPUE24", referred_count: 8, earned_credits: 12000 },
        blockchain: { wallet_address: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f", first_transaction: "2024-09-01T06:00:00Z", total_transactions: 480, last_transaction: "2025-12-22T06:30:00Z", verification_hash: "0xdef789abc123def456789abc123def456789abc123" },
        images: { logo: "/partners/hospitales-angeles-logo.png" },
        subscription: { plan: "enterprise", status: "active", current_period_end: "2026-09-01", price_monthly: 4999 },
        registered_at: "2024-08-15T00:00:00Z",
        activated_at: "2024-09-01T10:00:00Z",
        last_delivery_at: "2025-12-22T06:30:00Z"
    }
];

export const NETWORK_STATS: NetworkStats = {
    total_partners: 127,
    active_partners: 118,
    pending_partners: 9,
    total_consumers: 4892,
    active_consumers_30d: 1847,
    total_kg_collected: 2847500,
    total_co2_avoided_kg: 5125500,
    total_deliveries: 15847,
    total_scans: 47832,
    total_donations: 2847,
    total_donations_amount: 485600,
    cities_covered: 12,
    states_covered: 8,
    countries_covered: 1,
    by_category: {
        restaurant: 45, hotel: 18, hospital: 8, school: 12, supermarket: 15,
        food_factory: 6, central_abasto: 3, catering: 10, corporate_cafeteria: 7,
        coffee_shop: 8, bakery: 5, bar_club: 4, event_venue: 3, gym_spa: 2, other: 3
    },
    by_tier: { bronze: 35, silver: 42, gold: 28, platinum: 15, champion: 7 },
    by_city: [
        { city: "Ciudad de México", count: 45 },
        { city: "Guadalajara", count: 18 },
        { city: "Monterrey", count: 15 },
        { city: "Puebla", count: 12 },
        { city: "Oaxaca", count: 10 }
    ],
    growth: { partners_this_month: 12, partners_growth_pct: 10.4, kg_this_month: 285000, kg_growth_pct: 15.2 },
    top_partners: {
        by_kg: [
            { id: "partner-003", name: "CEDA Tlaxcala", kg: 712500 },
            { id: "partner-005", name: "Hospital Ángeles Puebla", kg: 168000 },
            { id: "partner-002", name: "Casa Oaxaca", kg: 33600 }
        ],
        by_streak: [
            { id: "partner-003", name: "CEDA Tlaxcala", weeks: 46 },
            { id: "partner-005", name: "Hospital Ángeles Puebla", weeks: 40 },
            { id: "partner-002", name: "Casa Oaxaca", weeks: 35 }
        ],
        by_scans: [
            { id: "partner-001", name: "El Bajío Roma", scans: 2847 },
            { id: "partner-004", name: "Starbucks Reforma 222", scans: 1892 },
            { id: "partner-002", name: "Casa Oaxaca", scans: 1654 }
        ]
    }
};

export const MOCK_DELIVERIES: Delivery[] = [
    {
        id: "del-001",
        partner_id: "partner-001",
        collected_at: "2025-12-22T07:45:00Z",
        weight_kg: 85,
        waste_composition: [
            { type: 'kitchen_prep', percentage: 45 },
            { type: 'plate_waste', percentage: 35 },
            { type: 'fruits_vegetables', percentage: 20 }
        ],
        quality_score: 95,
        contamination_detected: false,
        collector: { id: "col-001", name: "Juan Pérez", vehicle_id: "v-001", vehicle_plate: "ABC-123" },
        plant_id: "plant-papalotla",
        plant_name: "Planta Papalotla",
        photos: {},
        impact: { co2_avoided_kg: 153, methane_avoided_kg: 8.5, protein_potential_kg: 17, frass_potential_kg: 25.5 },
        blockchain: { tx_hash: "0x123abc456def789", block_number: 12345678, timestamp: "2025-12-22T07:50:00Z", verification_url: "https://explorer.globalforce.io/transaction/a44b8630b7072fd0b1689e781b9e5a786f97bdd3d9a5fdee2a7707e258426cd3" },
        status: "completed"
    }
];

export const getPartnerBySlug = (slug: string): Partner | undefined => {
    return MOCK_PARTNERS.find(p => p.slug === slug);
};

export const getPartnerById = (id: string): Partner | undefined => {
    return MOCK_PARTNERS.find(p => p.id === id);
};

export const getPartnersByCategory = (category: string): Partner[] => {
    return MOCK_PARTNERS.filter(p => p.category === category);
};

export const getPartnersByTier = (tier: string): Partner[] => {
    return MOCK_PARTNERS.filter(p => p.tier === tier);
};
