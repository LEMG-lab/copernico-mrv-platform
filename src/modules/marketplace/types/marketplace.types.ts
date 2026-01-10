export type CreditType =
    | 'carbon'      // CarbonLINK - tCO2eq evitado
    | 'circular'    // CircularLINK - tons residuo desviado
    | 'bio'         // BioLINK - hectareas regeneradas
    | 'water'       // WaterLINK - m3 agua ahorrada
    | 'social';     // SocialLINK - empleos/comunidades

export type CreditStatus =
    | 'available'   // Disponible para compra
    | 'reserved'    // Reservado (en proceso de compra)
    | 'sold'        // Vendido
    | 'retired';    // Retirado (usado para compensacion)

export type VerificationLevel =
    | 'satellite'   // Solo verificacion satelital
    | 'satellite_iot'  // Satelite + sensores IoT
    | 'full';       // Satelite + IoT + auditoria tercero

export interface Plant {
    id: string;
    name: string;
    country: string;
    region: string;
    coordinates: { lat: number; lng: number };
    capacity_tons_day: number;
    certification_date: string;
    verification_level: VerificationLevel;
    rating: number;  // 1 a 5 estrellas basado en historico
    total_credits_sold: number;
    avatar_url?: string;
}

export interface Credit {
    id: string;
    type: CreditType;
    plant: Plant;
    vintage: string;  // Año de generacion "2025"
    quantity: number;
    unit: string;  // "tCO2eq", "tons", "hectares", "m3"
    price_per_unit: number;
    currency: "USD";
    status: CreditStatus;
    created_at: string;
    expires_at?: string;

    // Verificacion
    verification: {
        level: VerificationLevel;
        satellite_hash: string;
        iot_hash?: string;
        blockchain_tx: string;
        methodology: string;
        last_verified: string;
    };

    // Metadata
    metadata: {
        waste_type?: string;
        crop_improved?: string;
        beneficiaries?: number;
        sdg_alignment: number[];  // [2, 8, 12, 13, 15]
    };

    // Imagenes
    images: {
        satellite_before?: string;
        satellite_after?: string;
        plant_photo?: string;
    };
}

export interface Transaction {
    id: string;
    credit_id: string;
    buyer_id: string;
    seller_id: string;
    quantity: number;
    price_per_unit: number;
    total_amount: number;
    commission: number;  // 15-20%
    commission_rate: number;
    status: 'pending' | 'completed' | 'cancelled' | 'refunded';
    blockchain_tx: string;
    created_at: string;
    completed_at?: string;
}

export interface Portfolio {
    user_id: string;
    credits_owned: Credit[];
    credits_listed: Credit[];
    total_invested: number;
    total_earned: number;
    carbon_offset_total: number;
    transactions_count: number;
}

export interface FilterOptions {
    creditTypes: CreditType[];
    countries: string[];
    priceRange: { min: number; max: number };
    verificationLevels: VerificationLevel[];
    vintages: string[];
    minRating: number;
}
