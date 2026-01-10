export type OnboardingStep =
    | 'basic_info'
    | 'location'
    | 'operations'
    | 'sensors'
    | 'verification'
    | 'plan';

export type PlantStatus =
    | 'draft'
    | 'pending_verification'
    | 'verified'
    | 'active'
    | 'suspended';

export type SensorType =
    | 'temperature'
    | 'humidity'
    | 'weight_scale'
    | 'co2'
    | 'methane'
    | 'camera';

export type SubscriptionPlan = 'starter' | 'growth' | 'enterprise' | 'partner';

export interface PlantBasicInfo {
    company_name: string;
    plant_name: string;
    tax_id: string;
    country: string;
    website?: string;
    year_founded: number;
    contact: {
        name: string;
        email: string;
        phone: string;
        role: string;
    };
}

export interface PlantLocation {
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
}

export interface PlantOperations {
    capacity_tons_day: number;
    current_utilization: number;
    operational_since: string;
    waste_types: WasteType[];
    products: ProductType[];
    certifications: string[];
    employees: {
        total: number;
        women_count: number;
    };
}

export type WasteType =
    | 'food_waste'
    | 'market_waste'
    | 'agricultural'
    | 'manure'
    | 'brewery'
    | 'food_processing'
    | 'municipal'
    | 'other';

export type ProductType =
    | 'protein_meal'
    | 'dried_larvae'
    | 'live_larvae'
    | 'oil'
    | 'frass'
    | 'chitin';

export interface SensorConfig {
    has_sensors: boolean;
    sensor_brand?: string;
    sensors: {
        type: SensorType;
        model?: string;
        location_in_plant: string;
        serial_number?: string;
    }[];
    data_frequency: 'realtime' | 'hourly' | 'daily' | 'manual';
    integration_method: 'api' | 'mqtt' | 'manual_upload';
}

export interface VerificationDocuments {
    business_license: DocumentUpload | null;
    environmental_permit?: DocumentUpload | null;
    sanitary_permit?: DocumentUpload | null;
    facility_photos: DocumentUpload[];
    product_lab_results?: DocumentUpload | null;
    additional_certifications?: DocumentUpload[];
}

export interface DocumentUpload {
    file_name: string;
    file_url: string;
    file_type: string;
    file_size: number;
    uploaded_at: string;
    status: 'pending' | 'approved' | 'rejected';
    rejection_reason?: string;
}

export interface SubscriptionDetails {
    plan: SubscriptionPlan;
    billing_cycle: 'monthly' | 'annual';
    price_usd: number;
    commission_rate: number;
    features: string[];
    payment_method?: PaymentMethod;
}

export interface PaymentMethod {
    type: 'card' | 'bank_transfer' | 'paypal';
    last_four?: string;
    brand?: string;
}

export interface OnboardingState {
    current_step: OnboardingStep;
    completed_steps: OnboardingStep[];
    basic_info: Partial<PlantBasicInfo>;
    location: Partial<PlantLocation>;
    operations: Partial<PlantOperations>;
    sensors: Partial<SensorConfig>;
    documents: Partial<VerificationDocuments>;
    subscription: Partial<SubscriptionDetails>;
    started_at: string;
    last_saved_at: string;
}

export interface PlantApplication {
    id: string;
    status: PlantStatus;
    onboarding: OnboardingState;
    verification: {
        satellite_check: boolean;
        document_check: boolean;
        video_call_completed: boolean;
        verified_at?: string;
        verified_by?: string;
        notes?: string;
    };
    created_at: string;
    updated_at: string;
}
