export type InvestorType =
    | 'green_fund'
    | 'climate_vc'
    | 'impact_fund'
    | 'family_office'
    | 'corporate_vc'
    | 'dfi';

export interface Investor {
    id: string;
    name: string;
    type: InvestorType;
    logo_url?: string;
    mandate: InvestorMandate;
    investment: Investment;
    contacts: Contact[];
}

export interface InvestorMandate {
    min_climate_allocation: number;
    target_co2_avoided: number;
    target_jobs: number;
    gender_target?: number;
    geographic_focus: string[];
    sdg_priority: number[];
    sfdr_article?: 8 | 9;
    excluded_sectors: string[];
}

export interface Investment {
    amount_usd: number;
    instrument: 'equity' | 'debt' | 'convertible' | 'grant' | 'rpu';
    date: string;
    valuation_at_entry?: number;
    current_valuation?: number;
    ownership_percentage?: number;
    expected_irr?: number;
    expected_exit_year?: number;
}

export interface Contact {
    name: string;
    role: string;
    email: string;
    phone?: string;
}

export interface ImpactMetrics {
    period: string;
    co2eq_avoided: number;
    waste_diverted_tons: number;
    methane_reduced_kg: number;
    water_saved_m3: number;
    hectares_regenerated: number;
    direct_jobs: number;
    indirect_jobs: number;
    women_employed_pct: number;
    training_hours: number;
    communities_benefited: number;
    revenue_generated: number;
    taxes_paid: number;
    local_procurement_pct: number;
    satellite_verified: boolean;
    blockchain_hash: string;
    last_audit_date?: string;
}

export interface FinancialMetrics {
    period: string;
    revenue: number;
    gross_margin: number;
    ebitda: number;
    net_income: number;
    revenue_growth_yoy: number;
    customer_growth: number;
    mrr?: number;
    arr?: number;
    churn_rate?: number;
    ltv_cac_ratio?: number;
    current_ratio: number;
    debt_to_equity: number;
    cash_position: number;
    burn_rate: number;
    runway_months: number;
}

export interface SDGContribution {
    sdg: number;
    score: number;
    metrics: {
        indicator: string;
        value: number;
        unit: string;
        target?: number;
    }[];
}

export interface ComplianceStatus {
    requirement: string;
    status: 'compliant' | 'in_progress' | 'at_risk' | 'non_compliant';
    due_date?: string;
    evidence_url?: string;
    notes?: string;
}

export interface Report {
    id: string;
    type: 'monthly_flash' | 'quarterly' | 'annual' | 'sfdr_pai' | 'custom';
    period: string;
    generated_at: string;
    file_url: string;
    file_size: number;
}

export interface Alert {
    id: string;
    type: 'info' | 'warning' | 'critical' | 'positive';
    title: string;
    message: string;
    created_at: string;
    read: boolean;
    action_url?: string;
}
