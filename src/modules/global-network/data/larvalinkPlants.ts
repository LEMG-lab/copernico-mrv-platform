import { LarvaLinkPlant } from '../types/network.types';

export const LARVALINK_PLANTS: LarvaLinkPlant[] = [
    // --- AMERICAS (MEXICO) ---
    {
        id: "ll-001", name: "Tepetlaoxtoc", country: "Mexico", city: "Tepetlaoxtoc",
        coordinates: { lat: 19.575, lng: -98.845 },
        capacity_tons_day: 50, status: "operativa", start_date: "2025-01", co2eq_avoided_ytd: 2847, verified: true, blockchain_hash: "0x7f3a2c1...", type: "LarvaLINK"
    },
    {
        id: "ll-002", name: "Xochimilco", country: "Mexico", city: "CDMX",
        coordinates: { lat: 19.27, lng: -99.10 },
        capacity_tons_day: 50, status: "construccion", start_date: "2026-Q2", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-003", name: "Querétaro Ind.", country: "Mexico", city: "Querétaro",
        coordinates: { lat: 20.61, lng: -100.41 },
        capacity_tons_day: 120, status: "planeada", start_date: "2026-Q4", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-004", name: "Iztapalapa Central", country: "Mexico", city: "CDMX",
        coordinates: { lat: 19.34, lng: -99.05 },
        capacity_tons_day: 200, status: "operativa", start_date: "2024-05", co2eq_avoided_ytd: 15400, verified: true, blockchain_hash: "0x9d2e1f..."
    },
    {
        id: "ll-005", name: "Ecatepec Waste Hub", country: "Mexico", city: "Ecatepec",
        coordinates: { lat: 19.57, lng: -99.04 },
        capacity_tons_day: 150, status: "operativa", start_date: "2024-08", co2eq_avoided_ytd: 8900, verified: true, blockchain_hash: "0xa1b2c3..."
    },
    {
        id: "ll-006", name: "Naucalpan Industrial", country: "Mexico", city: "Naucalpan",
        coordinates: { lat: 19.45, lng: -99.24 },
        capacity_tons_day: 80, status: "operativa", start_date: "2025-02", co2eq_avoided_ytd: 3200, verified: true, blockchain_hash: "0xd4e5f6..."
    },
    {
        id: "ll-007", name: "Tlalnepantla Logística", country: "Mexico", city: "Tlalnepantla",
        coordinates: { lat: 19.53, lng: -99.20 },
        capacity_tons_day: 95, status: "construccion", start_date: "2026-Q1", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },
    {
        id: "ll-008", name: "Toluca Lerma", country: "Mexico", city: "Toluca",
        coordinates: { lat: 19.29, lng: -99.55 },
        capacity_tons_day: 110, status: "operativa", start_date: "2024-12", co2eq_avoided_ytd: 4500, verified: true, blockchain_hash: "0x1a2b3c..."
    },
    {
        id: "ll-009", name: "Puebla Sur", country: "Mexico", city: "Puebla",
        coordinates: { lat: 18.98, lng: -98.24 },
        capacity_tons_day: 60, status: "operativa", start_date: "2025-01", co2eq_avoided_ytd: 1200, verified: true, blockchain_hash: "0x4d5e6f..."
    },
    {
        id: "ll-010", name: "León Bajío", country: "Mexico", city: "León",
        coordinates: { lat: 21.08, lng: -101.65 },
        capacity_tons_day: 85, status: "planeada", start_date: "2026-Q3", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },
    {
        id: "ll-011", name: "Guadalajara El Salto", country: "Mexico", city: "Guadalajara",
        coordinates: { lat: 20.53, lng: -103.22 },
        capacity_tons_day: 140, status: "operativa", start_date: "2023-11", co2eq_avoided_ytd: 22000, verified: true, blockchain_hash: "0x7f8e9d..."
    },
    {
        id: "ll-012", name: "Monterrey Apodaca", country: "Mexico", city: "Monterrey",
        coordinates: { lat: 25.75, lng: -100.20 },
        capacity_tons_day: 160, status: "operativa", start_date: "2024-03", co2eq_avoided_ytd: 18500, verified: true, blockchain_hash: "0x0a1b2c..."
    },
    {
        id: "ll-013", name: "Tijuana Maquila", country: "Mexico", city: "Tijuana",
        coordinates: { lat: 32.48, lng: -116.90 },
        capacity_tons_day: 90, status: "construccion", start_date: "2026-Q2", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-014", name: "Ciudad Juárez Norte", country: "Mexico", city: "Juárez",
        coordinates: { lat: 31.65, lng: -106.40 },
        capacity_tons_day: 75, status: "operativa", start_date: "2025-01", co2eq_avoided_ytd: 1100, verified: true, blockchain_hash: "0x3c4d5e..."
    },
    {
        id: "ll-015", name: "Hermosillo Agro", country: "Mexico", city: "Hermosillo",
        coordinates: { lat: 29.08, lng: -110.96 },
        capacity_tons_day: 45, status: "planeada", start_date: "2027-Q1", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },
    {
        id: "ll-016", name: "Culiacán Sinaloa", country: "Mexico", city: "Culiacán",
        coordinates: { lat: 24.78, lng: -107.41 },
        capacity_tons_day: 100, status: "operativa", start_date: "2024-09", co2eq_avoided_ytd: 5600, verified: true, blockchain_hash: "0x6f7g8h..."
    },
    {
        id: "ll-017", name: "Veracruz Puerto", country: "Mexico", city: "Veracruz",
        coordinates: { lat: 19.18, lng: -96.16 },
        capacity_tons_day: 55, status: "operativa", start_date: "2025-02", co2eq_avoided_ytd: 800, verified: true, blockchain_hash: "0x9i0j1k..."
    },
    {
        id: "ll-018", name: "Mérida Kanasín", country: "Mexico", city: "Mérida",
        coordinates: { lat: 20.93, lng: -89.56 },
        capacity_tons_day: 65, status: "construccion", start_date: "2026-Q1", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-019", name: "Cancún Benito Juárez", country: "Mexico", city: "Cancún",
        coordinates: { lat: 21.17, lng: -86.84 },
        capacity_tons_day: 180, status: "operativa", start_date: "2023-08", co2eq_avoided_ytd: 28000, verified: true, blockchain_hash: "0x2l3m4n..."
    },
    {
        id: "ll-020", name: "Villahermosa Tabasco", country: "Mexico", city: "Villahermosa",
        coordinates: { lat: 18.01, lng: -92.93 },
        capacity_tons_day: 50, status: "planeada", start_date: "2026-Q4", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },

    // --- LATAM (BRAZIL, COLOMBIA, ETC) --- (20-44)
    {
        id: "ll-021", name: "São Paulo Zona Leste", country: "Brazil", city: "São Paulo",
        coordinates: { lat: -23.53, lng: -46.52 },
        capacity_tons_day: 250, status: "operativa", start_date: "2023-01", co2eq_avoided_ytd: 45000, verified: true, blockchain_hash: "0x5o6p7q..."
    },
    {
        id: "ll-022", name: "Guarulhos Airport Hub", country: "Brazil", city: "Guarulhos",
        coordinates: { lat: -23.43, lng: -46.47 },
        capacity_tons_day: 120, status: "operativa", start_date: "2024-04", co2eq_avoided_ytd: 15600, verified: true, blockchain_hash: "0x8r9s0t..."
    },
    {
        id: "ll-023", name: "Osasco Industrial", country: "Brazil", city: "Osasco",
        coordinates: { lat: -23.52, lng: -46.79 },
        capacity_tons_day: 95, status: "construccion", start_date: "2026-Q1", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-024", name: "Rio Duque de Caxias", country: "Brazil", city: "Rio de Janeiro",
        coordinates: { lat: -22.78, lng: -43.31 },
        capacity_tons_day: 160, status: "operativa", start_date: "2023-10", co2eq_avoided_ytd: 21000, verified: true, blockchain_hash: "0x1u2v3w..."
    },
    {
        id: "ll-025", name: "Belo Horizonte Contagem", country: "Brazil", city: "Belo Horizonte",
        coordinates: { lat: -19.93, lng: -44.05 },
        capacity_tons_day: 110, status: "operativa", start_date: "2024-07", co2eq_avoided_ytd: 9800, verified: true, blockchain_hash: "0x4x5y6z..."
    },
    {
        id: "ll-026", name: "Curitiba CIC", country: "Brazil", city: "Curitiba",
        coordinates: { lat: -25.50, lng: -49.32 },
        capacity_tons_day: 80, status: "operativa", start_date: "2025-01", co2eq_avoided_ytd: 1500, verified: true, blockchain_hash: "0x7a8b9c..."
    },
    {
        id: "ll-027", name: "Porto Alegre Norte", country: "Brazil", city: "Porto Alegre",
        coordinates: { lat: -29.98, lng: -51.11 },
        capacity_tons_day: 70, status: "planeada", start_date: "2026-Q3", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },
    {
        id: "ll-028", name: "Salvador Camaçari", country: "Brazil", city: "Salvador",
        coordinates: { lat: -12.70, lng: -38.32 },
        capacity_tons_day: 90, status: "operativa", start_date: "2024-11", co2eq_avoided_ytd: 3400, verified: true, blockchain_hash: "0x0d1e2f..."
    },
    {
        id: "ll-029", name: "Recife Suape", country: "Brazil", city: "Recife",
        coordinates: { lat: -8.38, lng: -35.03 },
        capacity_tons_day: 60, status: "construccion", start_date: "2026-Q2", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-030", name: "Manaus Zona Franca", country: "Brazil", city: "Manaus",
        coordinates: { lat: -3.09, lng: -59.98 },
        capacity_tons_day: 130, status: "operativa", start_date: "2023-05", co2eq_avoided_ytd: 26000, verified: true, blockchain_hash: "0x3g4h5i..."
    },
    {
        id: "ll-031", name: "Bogotá Soacha", country: "Colombia", city: "Bogotá",
        coordinates: { lat: 4.58, lng: -74.22 },
        capacity_tons_day: 180, status: "operativa", start_date: "2023-09", co2eq_avoided_ytd: 31000, verified: true, blockchain_hash: "0x6j7k8l..."
    },
    {
        id: "ll-032", name: "Bogotá Fontibón", country: "Colombia", city: "Bogotá",
        coordinates: { lat: 4.67, lng: -74.15 },
        capacity_tons_day: 95, status: "construccion", start_date: "2026-Q1", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-033", name: "Medellín Itagüí", country: "Colombia", city: "Medellín",
        coordinates: { lat: 6.17, lng: -75.60 },
        capacity_tons_day: 110, status: "operativa", start_date: "2024-02", co2eq_avoided_ytd: 14500, verified: true, blockchain_hash: "0x9m0n1o..."
    },
    {
        id: "ll-034", name: "Cali Yumbo", country: "Colombia", city: "Cali",
        coordinates: { lat: 3.52, lng: -76.50 },
        capacity_tons_day: 85, status: "operativa", start_date: "2025-01", co2eq_avoided_ytd: 1200, verified: true, blockchain_hash: "0x2p3q4r..."
    },
    {
        id: "ll-035", name: "Barranquilla Via 40", country: "Colombia", city: "Barranquilla",
        coordinates: { lat: 11.02, lng: -74.80 },
        capacity_tons_day: 70, status: "planeada", start_date: "2026-Q4", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },
    {
        id: "ll-036", name: "Lima Callao", country: "Peru", city: "Lima",
        coordinates: { lat: -11.95, lng: -77.12 },
        capacity_tons_day: 150, status: "operativa", start_date: "2023-12", co2eq_avoided_ytd: 19800, verified: true, blockchain_hash: "0x5s6t7u..."
    },
    {
        id: "ll-037", name: "Lima San Juan", country: "Peru", city: "Lima",
        coordinates: { lat: -12.15, lng: -76.97 },
        capacity_tons_day: 100, status: "construccion", start_date: "2026-Q1", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-038", name: "Arequipa Parque Ind.", country: "Peru", city: "Arequipa",
        coordinates: { lat: -16.42, lng: -71.55 },
        capacity_tons_day: 60, status: "planeada", start_date: "2027-Q1", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },
    {
        id: "ll-039", name: "Santiago Quilicura", country: "Chile", city: "Santiago",
        coordinates: { lat: -33.36, lng: -70.72 },
        capacity_tons_day: 125, status: "operativa", start_date: "2024-06", co2eq_avoided_ytd: 11200, verified: true, blockchain_hash: "0x8v9w0x..."
    },
    {
        id: "ll-040", name: "Buenos Aires La Matanza", country: "Argentina", city: "Buenos Aires",
        coordinates: { lat: -34.70, lng: -58.55 },
        capacity_tons_day: 190, status: "operativa", start_date: "2023-03", co2eq_avoided_ytd: 29500, verified: true, blockchain_hash: "0x1y2z3a..."
    },
    {
        id: "ll-041", name: "Córdoba Ferreyra", country: "Argentina", city: "Córdoba",
        coordinates: { lat: -31.45, lng: -64.12 },
        capacity_tons_day: 80, status: "construccion", start_date: "2026-Q2", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },

    // --- ASIA (INDIA, CHINA, SE ASIA) --- (42-70)
    {
        id: "ll-042", name: "Delhi Okhla Phase III", country: "India", city: "Delhi",
        coordinates: { lat: 28.52, lng: 77.27 },
        capacity_tons_day: 350, status: "operativa", start_date: "2022-11", co2eq_avoided_ytd: 85000, verified: true, blockchain_hash: "0x4b5c6d..."
    },
    {
        id: "ll-043", name: "Delhi Ghazipur", country: "India", city: "Delhi",
        coordinates: { lat: 28.62, lng: 77.33 },
        capacity_tons_day: 400, status: "construccion", start_date: "2026-Q1", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-044", name: "Mumbai Deonar", country: "India", city: "Mumbai",
        coordinates: { lat: 19.06, lng: 72.91 },
        capacity_tons_day: 450, status: "operativa", start_date: "2022-08", co2eq_avoided_ytd: 110000, verified: true, blockchain_hash: "0x7e8f9g..."
    },
    {
        id: "ll-045", name: "Bangalore Peenya", country: "India", city: "Bangalore",
        coordinates: { lat: 13.03, lng: 77.51 },
        capacity_tons_day: 200, status: "operativa", start_date: "2023-06", co2eq_avoided_ytd: 35000, verified: true, blockchain_hash: "0x0h1i2j..."
    },
    {
        id: "ll-046", name: "Chennai Ambattur", country: "India", city: "Chennai",
        coordinates: { lat: 13.10, lng: 80.15 },
        capacity_tons_day: 160, status: "planeada", start_date: "2026-Q3", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },
    {
        id: "ll-047", name: "Beijing Chaoyang", country: "China", city: "Beijing",
        coordinates: { lat: 39.95, lng: 116.55 },
        capacity_tons_day: 300, status: "operativa", start_date: "2023-04", co2eq_avoided_ytd: 52000, verified: true, blockchain_hash: "0x3k4l5m..."
    },
    {
        id: "ll-048", name: "Shanghai Pudong", country: "China", city: "Shanghai",
        coordinates: { lat: 31.22, lng: 121.55 },
        capacity_tons_day: 320, status: "operativa", start_date: "2023-02", co2eq_avoided_ytd: 58000, verified: true, blockchain_hash: "0x6n7o8p..."
    },
    {
        id: "ll-049", name: "Shenzhen Longgang", country: "China", city: "Shenzhen",
        coordinates: { lat: 22.70, lng: 114.24 },
        capacity_tons_day: 280, status: "operativa", start_date: "2024-01", co2eq_avoided_ytd: 24000, verified: true, blockchain_hash: "0x9q0r1s..."
    },
    {
        id: "ll-050", name: "Jakarta Bantar Gebang", country: "Indonesia", city: "Jakarta",
        coordinates: { lat: -6.34, lng: 107.00 },
        capacity_tons_day: 500, status: "construccion", start_date: "2025-10", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-051", name: "Manila Payatas", country: "Philippines", city: "Quezon City",
        coordinates: { lat: 14.71, lng: 121.11 },
        capacity_tons_day: 220, status: "operativa", start_date: "2023-11", co2eq_avoided_ytd: 38000, verified: true, blockchain_hash: "0x2t3u4v..."
    },
    {
        id: "ll-052", name: "Bangkok On Nut", country: "Thailand", city: "Bangkok",
        coordinates: { lat: 13.70, lng: 100.65 },
        capacity_tons_day: 190, status: "operativa", start_date: "2024-05", co2eq_avoided_ytd: 12500, verified: true, blockchain_hash: "0x5w6x7y..."
    },
    {
        id: "ll-053", name: "Ho Chi Minh Cu Chi", country: "Vietnam", city: "HCMC",
        coordinates: { lat: 10.98, lng: 106.50 },
        capacity_tons_day: 150, status: "planeada", start_date: "2026-Q4", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },

    // --- AFRICA (71-85) ---
    {
        id: "ll-071", name: "Lagos Olusosun", country: "Nigeria", city: "Lagos",
        coordinates: { lat: 6.58, lng: 3.37 },
        capacity_tons_day: 350, status: "operativa", start_date: "2023-08", co2eq_avoided_ytd: 42000, verified: true, blockchain_hash: "0x8z9a0b..."
    },
    {
        id: "ll-072", name: "Lagos Epe", country: "Nigeria", city: "Lagos",
        coordinates: { lat: 6.58, lng: 3.98 },
        capacity_tons_day: 120, status: "construccion", start_date: "2026-Q1", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-073", name: "Cairo Zabaleen Hub", country: "Egypt", city: "Cairo",
        coordinates: { lat: 30.03, lng: 31.27 },
        capacity_tons_day: 400, status: "operativa", start_date: "2022-12", co2eq_avoided_ytd: 65000, verified: true, blockchain_hash: "0x1c2d3e..."
    },
    {
        id: "ll-074", name: "Nairobi Dandora", country: "Kenya", city: "Nairobi",
        coordinates: { lat: -1.24, lng: 36.89 },
        capacity_tons_day: 250, status: "operativa", start_date: "2023-07", co2eq_avoided_ytd: 28000, verified: true, blockchain_hash: "0x4f5g6h..."
    },
    {
        id: "ll-075", name: "Accra Agbogbloshie", country: "Ghana", city: "Accra",
        coordinates: { lat: 5.55, lng: -0.21 },
        capacity_tons_day: 90, status: "construccion", start_date: "2026-Q2", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-076", name: "Johannesburg Robinson", country: "South Africa", city: "Johannesburg",
        coordinates: { lat: -26.22, lng: 28.02 },
        capacity_tons_day: 140, status: "operativa", start_date: "2024-03", co2eq_avoided_ytd: 8500, verified: true, blockchain_hash: "0x7i8j9k..."
    },
    {
        id: "ll-077", name: "Kinshasa Limete", country: "DRC", city: "Kinshasa",
        coordinates: { lat: -4.35, lng: 15.34 },
        capacity_tons_day: 180, status: "planeada", start_date: "2027-Q1", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },

    // --- US/EUROPE/OTHERS (86-100) ---
    {
        id: "ll-086", name: "Bronx Recovery", country: "USA", city: "New York",
        coordinates: { lat: 40.80, lng: -73.88 },
        capacity_tons_day: 120, status: "operativa", start_date: "2023-10", co2eq_avoided_ytd: 14000, verified: true, blockchain_hash: "0x0l1m2n..."
    },
    {
        id: "ll-087", name: "Los Angeles Vernon", country: "USA", city: "Los Angeles",
        coordinates: { lat: 34.00, lng: -118.20 },
        capacity_tons_day: 150, status: "operativa", start_date: "2024-02", co2eq_avoided_ytd: 11500, verified: true, blockchain_hash: "0x3o4p5q..."
    },
    {
        id: "ll-088", name: "Chicago South Side", country: "USA", city: "Chicago",
        coordinates: { lat: 41.75, lng: -87.65 },
        capacity_tons_day: 110, status: "construccion", start_date: "2026-Q1", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-089", name: "East London Bio", country: "UK", city: "London",
        coordinates: { lat: 51.52, lng: 0.05 },
        capacity_tons_day: 95, status: "operativa", start_date: "2024-09", co2eq_avoided_ytd: 3800, verified: true, blockchain_hash: "0x6r7s8t..."
    },
    {
        id: "ll-090", name: "Paris Rungis", country: "France", city: "Paris",
        coordinates: { lat: 48.75, lng: 2.35 },
        capacity_tons_day: 130, status: "operativa", start_date: "2023-11", co2eq_avoided_ytd: 16500, verified: true, blockchain_hash: "0x9u0v1w..."
    },
    {
        id: "ll-091", name: "Madrid Valdemingómez", country: "Spain", city: "Madrid",
        coordinates: { lat: 40.36, lng: -3.62 },
        capacity_tons_day: 140, status: "operativa", start_date: "2024-01", co2eq_avoided_ytd: 12000, verified: true, blockchain_hash: "0x2x3y4z..."
    },
    {
        id: "ll-092", name: "Berlin Neukölln", country: "Germany", city: "Berlin",
        coordinates: { lat: 52.47, lng: 13.44 },
        capacity_tons_day: 80, status: "planeada", start_date: "2026-Q2", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },
    {
        id: "ll-093", name: "Istanbul Tuzla", country: "Turkey", city: "Istanbul",
        coordinates: { lat: 40.85, lng: 29.30 },
        capacity_tons_day: 160, status: "operativa", start_date: "2023-05", co2eq_avoided_ytd: 22500, verified: true, blockchain_hash: "0x5a6b7c..."
    },
    {
        id: "ll-094", name: "Moscow Lyubertsy", country: "Russia", city: "Moscow",
        coordinates: { lat: 55.67, lng: 37.88 },
        capacity_tons_day: 190, status: "operativa", start_date: "2024-08", co2eq_avoided_ytd: 9500, verified: true, blockchain_hash: "0x8d9e0f..."
    },
    {
        id: "ll-095", name: "Tokyo Bay Echo", country: "Japan", city: "Tokyo",
        coordinates: { lat: 35.61, lng: 139.78 },
        capacity_tons_day: 110, status: "operativa", start_date: "2025-01", co2eq_avoided_ytd: 1800, verified: true, blockchain_hash: "0x1g2h3i..."
    },
    {
        id: "ll-096", name: "Seoul Mapo", country: "South Korea", city: "Seoul",
        coordinates: { lat: 37.57, lng: 126.90 },
        capacity_tons_day: 100, status: "construccion", start_date: "2026-Q1", co2eq_avoided_ytd: 0, verified: true, blockchain_hash: null
    },
    {
        id: "ll-097", name: "Dubai Warsan", country: "UAE", city: "Dubai",
        coordinates: { lat: 25.15, lng: 55.40 },
        capacity_tons_day: 250, status: "operativa", start_date: "2022-10", co2eq_avoided_ytd: 55000, verified: true, blockchain_hash: "0x4j5k6l..."
    },
    {
        id: "ll-098", name: "Riyadh South", country: "Saudi Arabia", city: "Riyadh",
        coordinates: { lat: 24.58, lng: 46.75 },
        capacity_tons_day: 200, status: "planeada", start_date: "2027-Q1", co2eq_avoided_ytd: 0, verified: false, blockchain_hash: null
    },
    {
        id: "ll-099", name: "Sydney Western", country: "Australia", city: "Sydney",
        coordinates: { lat: -33.85, lng: 150.90 },
        capacity_tons_day: 90, status: "operativa", start_date: "2024-06", co2eq_avoided_ytd: 5200, verified: true, blockchain_hash: "0x7m8n9o..."
    },
    {
        id: "ll-100", name: "Toronto Scarborough", country: "Canada", city: "Toronto",
        coordinates: { lat: 43.75, lng: -79.25 },
        capacity_tons_day: 85, status: "operativa", start_date: "2024-11", co2eq_avoided_ytd: 2100, verified: true, blockchain_hash: "0x0p1q2r..."
    }
];
