export interface PlantDetail {
    id: string;
    name: string;
    company: string;
    status: 'operational' | 'construction' | 'planned' | 'pilot';

    // Datos corporativos
    corporate: {
        legal_name: string;
        tax_id: string;
        website?: string;
        email: string;
        phone: string;
        founded_year: number;
        employees: {
            total: number;
            women: number;
            women_percentage: number;
        };
    };

    // Ubicacion
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        postal_code: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        timezone: string;
        google_maps_url?: string;
        street_view_url?: string;
    };

    // Capacidad y operacion
    operations: {
        capacity_tons_day: number;
        current_utilization: number;
        operational_since: string;
        operating_hours: string;
        waste_types: string[];
        products: string[];
        certifications: string[];
    };

    // Metricas de produccion
    production: {
        period: string;
        waste_processed_tons: number;
        protein_produced_kg: number;
        oil_produced_liters: number;
        frass_produced_kg: number;
        live_larvae_kg: number;
        conversion_rate: number;
        utilization_history?: { date: string; value: number }[]; // Added for potential charts
    };

    // Impacto ambiental
    environmental_impact: {
        period: string;
        co2eq_avoided_tons: number;
        methane_avoided_kg: number;
        waste_diverted_tons: number;
        water_saved_m3: number;
        hectares_fertilized: number;
        trees_equivalent: number;
        cars_off_road_equivalent: number;
    };

    // Impacto social
    social_impact: {
        direct_jobs: number;
        indirect_jobs: number;
        avg_salary_vs_minimum: number;
        training_hours: number;
        communities_benefited: number;
        local_suppliers: number;
    };

    // Verificacion blockchain
    blockchain: {
        network: string;
        contract_address: string;
        last_verification: string;
        total_transactions: number;
        verification_hash: string;
        explorer_url: string;
    };

    // Sensores IoT y Ambiente
    environment: {
        temperature: { current: number; trend: 'up' | 'down' | 'stable'; history: number[] };
        humidity: { current: number; trend: 'up' | 'down' | 'stable'; history: number[] };
        co2: { current: number; status: 'nominal' | 'warning' | 'critical' };
        airflow: { current: number; status: 'nominal' | 'warning' | 'critical' };
    };

    // Inventario Actual
    inventory: {
        feedstock_tons: number;
        feedstock_capacity: number;
        larvae_stage_1_kg: number;
        larvae_stage_2_kg: number;
        larvae_stage_3_kg: number;
        frass_tons: number;
        product_ready_tons: number;
    };

    // Personal y Turnos
    staffing: {
        current_shift: 'morning' | 'afternoon' | 'night';
        operators_active: number;
        supervisors_active: number;
        safety_status: 'safe' | 'warning' | 'incident';
    };

    // Sensores IoT Resumen
    sensors: {
        total: number;
        online: number;
        types: string[];
        last_reading: string;
        data_frequency: string;
    };

    // Roadmap
    roadmap: RoadmapItem[];

    // ODS
    sdg_contributions: SDGContribution[];

    // Imagenes
    images: {
        main: string;
        gallery: string[];
        satellite?: string;
    };

    // Contacto
    contacts: {
        name: string;
        role: string;
        email: string;
        phone?: string;
    }[];
}

export interface RoadmapItem {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'in_progress' | 'planned';
    target_date: string;
    completion_date?: string;
    category: 'expansion' | 'technology' | 'certification' | 'product' | 'partnership';
}

export interface SDGContribution {
    sdg_number: number;
    sdg_name: string;
    sdg_icon_color: string;
    contribution_description: string;
    metrics: {
        indicator: string;
        value: string;
        unit?: string;
    }[];
    is_primary: boolean;
}
