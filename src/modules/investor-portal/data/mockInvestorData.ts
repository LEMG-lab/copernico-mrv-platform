import { Alert, ComplianceStatus, FinancialMetrics, ImpactMetrics, Investor, Report, SDGContribution } from "../types/investor.types";

export const MOCK_INVESTOR: Investor = {
    id: "inv-001",
    name: "Mirova Natural Capital",
    type: "impact_fund",
    logo_url: "https://ui-avatars.com/api/?name=Mirova+Natural&background=0D8ABC&color=fff&size=128", // Placeholder
    mandate: {
        min_climate_allocation: 50,
        target_co2_avoided: 10000,
        target_jobs: 100,
        gender_target: 30,
        geographic_focus: ["Mexico", "Latin America"],
        sdg_priority: [2, 8, 12, 13],
        sfdr_article: 9,
        excluded_sectors: ["fossil_fuels", "weapons", "tobacco"]
    },
    investment: {
        amount_usd: 2500000,
        instrument: "equity",
        date: "2025-06-15",
        valuation_at_entry: 10000000,
        current_valuation: 12500000,
        ownership_percentage: 25,
        expected_irr: 25,
        expected_exit_year: 2030
    },
    contacts: [
        { name: "Marie Dupont", role: "Investment Director", email: "marie@mirova.com" },
        { name: "Carlos Ruiz", role: "ESG Analyst", email: "carlos@mirova.com" }
    ]
};

export const MOCK_IMPACT_CURRENT: ImpactMetrics = {
    period: "2025-Q4",
    co2eq_avoided: 2847,
    waste_diverted_tons: 1642,
    methane_reduced_kg: 34200,
    water_saved_m3: 125000,
    hectares_regenerated: 45,
    direct_jobs: 47,
    indirect_jobs: 156,
    women_employed_pct: 52,
    training_hours: 2400,
    communities_benefited: 8,
    revenue_generated: 485000,
    taxes_paid: 42000,
    local_procurement_pct: 78,
    satellite_verified: true,
    blockchain_hash: "0x7f3a8b2c9e1d4f5a6b7c8d9e0f1a2b3c",
    last_audit_date: "2025-11-15"
};

export const MOCK_FINANCIALS: FinancialMetrics = {
    period: "2025-Q4",
    revenue: 485000,
    gross_margin: 0.42,
    ebitda: 125000,
    net_income: 78000,
    revenue_growth_yoy: 0.85,
    customer_growth: 0.45,
    mrr: 18500,
    arr: 222000,
    churn_rate: 0.02,
    ltv_cac_ratio: 8.5,
    current_ratio: 2.1,
    debt_to_equity: 0.35,
    cash_position: 1250000,
    burn_rate: 85000,
    runway_months: 14.7
};

export const MOCK_SDG_CONTRIBUTIONS: SDGContribution[] = [
    {
        sdg: 2,
        score: 78,
        metrics: [
            { indicator: "Proteina producida", value: 156, unit: "tons", target: 200 },
            { indicator: "Agricultores beneficiados", value: 45, unit: "productores" }
        ]
    },
    {
        sdg: 8,
        score: 65,
        metrics: [
            { indicator: "Empleos directos", value: 47, unit: "empleos", target: 100 },
            { indicator: "Salario promedio vs minimo", value: 2.3, unit: "x" }
        ]
    },
    {
        sdg: 12,
        score: 92,
        metrics: [
            { indicator: "Residuos desviados", value: 1642, unit: "tons" },
            { indicator: "Tasa de circularidad", value: 94, unit: "%" }
        ]
    },
    {
        sdg: 13,
        score: 95,
        metrics: [
            { indicator: "CO2eq evitado", value: 2847, unit: "tCO2eq", target: 10000 },
            { indicator: "Metano reducido", value: 34.2, unit: "tons CH4" }
        ]
    },
    {
        sdg: 15,
        score: 71,
        metrics: [
            { indicator: "Hectareas regeneradas", value: 45, unit: "ha" },
            { indicator: "Mejora NDVI promedio", value: 32, unit: "%" }
        ]
    }
];

export const MOCK_COMPLIANCE: ComplianceStatus[] = [
    { requirement: "50% inversion climatica", status: "compliant", evidence_url: "/docs/climate-allocation.pdf" },
    { requirement: ">10,000 tCO2eq/año", status: "in_progress", notes: "28% de meta (2,847 de 10,000)" },
    { requirement: ">100 empleos directos", status: "in_progress", notes: "47% de meta" },
    { requirement: ">30% mujeres empleadas", status: "compliant", evidence_url: "/docs/gender-report.pdf" },
    { requirement: "SFDR Article 9", status: "compliant", evidence_url: "/docs/sfdr-pai.xlsx" },
    { requirement: "Auditoria anual de impacto", status: "compliant", due_date: "2026-03-31" }
];

export const MOCK_ALERTS: Alert[] = [
    {
        id: "alert-001",
        type: "positive",
        title: "Meta de genero superada",
        message: "52% de empleados son mujeres, superando la meta de 30%",
        created_at: "2025-12-20T10:00:00Z",
        read: false
    },
    {
        id: "alert-002",
        type: "info",
        title: "Nuevo reporte trimestral disponible",
        message: "El reporte Q4 2025 esta listo para descarga",
        created_at: "2025-12-18T14:30:00Z",
        read: true,
        action_url: "/reports/q4-2025"
    },
    {
        id: "alert-003",
        type: "warning",
        title: "Meta CO2 requiere aceleracion",
        message: "Al ritmo actual, se alcanzara 85% de la meta anual",
        created_at: "2025-12-15T09:00:00Z",
        read: true
    }
];

export const MOCK_IMPACT_HISTORY = [
    { period: "2025-Q1", co2eq: 450, waste: 280, jobs: 25 },
    { period: "2025-Q2", co2eq: 920, waste: 540, jobs: 32 },
    { period: "2025-Q3", co2eq: 1680, waste: 980, jobs: 39 },
    { period: "2025-Q4", co2eq: 2847, waste: 1642, jobs: 47 }
];

export const MOCK_REPORTS: Report[] = [
    { id: "r-001", type: "monthly_flash", period: "Dic 2025", generated_at: "2025-12-20", file_url: "/reports/flash-dic-2025.pdf", file_size: 2100000 },
    { id: "r-002", type: "quarterly", period: "Q4 2025", generated_at: "2025-12-18", file_url: "/reports/q4-2025.pdf", file_size: 8500000 },
    { id: "r-003", type: "sfdr_pai", period: "2025", generated_at: "2025-12-15", file_url: "/reports/sfdr-pai-2025.xlsx", file_size: 1200000 },
    { id: "r-004", type: "monthly_flash", period: "Nov 2025", generated_at: "2025-11-20", file_url: "/reports/flash-nov-2025.pdf", file_size: 2000000 }
];
