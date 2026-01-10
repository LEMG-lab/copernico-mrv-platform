export const SUBSCRIPTION_PLANS = {
    starter: {
        name: "Starter",
        price_monthly: 50,
        price_annual: 500,
        commission_rate: 0.20,
        features: [
            "Certificacion basica de impacto",
            "1 tipo de credito (CarbonLINK)",
            "Verificacion satelital mensual",
            "Reporte trimestral",
            "Soporte por email"
        ],
        limits: {
            max_capacity: 20,
            max_credits_month: 500
        },
        recommended_for: "Plantas pequeñas iniciando operaciones"
    },
    growth: {
        name: "Growth",
        price_monthly: 200,
        price_annual: 2000,
        commission_rate: 0.15,
        features: [
            "Todos los tipos de creditos",
            "Verificacion satelital semanal",
            "Dashboard completo de metricas",
            "API de integracion",
            "Reportes personalizados",
            "Soporte prioritario",
            "Badge verificado en marketplace"
        ],
        limits: {
            max_capacity: 100,
            max_credits_month: 5000
        },
        recommended_for: "Plantas en crecimiento con operaciones estables"
    },
    enterprise: {
        name: "Enterprise",
        price_monthly: 500,
        price_annual: 5000,
        commission_rate: 0.10,
        features: [
            "Todo lo de Growth",
            "Verificacion satelital diaria",
            "White label para reportes",
            "Integraciones personalizadas",
            "Account manager dedicado",
            "SLA garantizado 99.9%",
            "Acceso anticipado a nuevas funciones"
        ],
        limits: {
            max_capacity: null,
            max_credits_month: null
        },
        recommended_for: "Plantas grandes con altos volumenes"
    },
    partner: {
        name: "Network Partner",
        price_monthly: 0,
        price_annual: 0,
        commission_rate: 0.05,
        features: [
            "Todo lo de Enterprise",
            "Co-branding",
            "Exclusividad regional negociable",
            "Participacion en governance",
            "Revenue share en referidos",
            "Acceso a red de inversionistas"
        ],
        limits: {
            max_capacity: null,
            max_credits_month: null
        },
        recommended_for: "Aliados estrategicos y grandes operadores",
        requires_approval: true
    }
};

export const WASTE_TYPES_INFO = {
    food_waste: { label: "Residuos de alimentos", ch4_factor: 62 },
    market_waste: { label: "Residuos de mercado/central de abasto", ch4_factor: 58 },
    agricultural: { label: "Residuos agricolas", ch4_factor: 45 },
    manure: { label: "Estiercol/gallinaza", ch4_factor: 55 },
    brewery: { label: "Residuos de cerveceria/destileria", ch4_factor: 50 },
    food_processing: { label: "Procesamiento de alimentos", ch4_factor: 60 },
    municipal: { label: "Recoleccion municipal organica", ch4_factor: 55 },
    other: { label: "Otro", ch4_factor: 50 }
};

export const PRODUCT_TYPES_INFO = {
    protein_meal: { label: "Harina de proteina", unit: "kg", avg_price: 1.8 },
    dried_larvae: { label: "Larva seca entera", unit: "kg", avg_price: 2.5 },
    live_larvae: { label: "Larva viva", unit: "kg", avg_price: 1.2 },
    oil: { label: "Aceite de larva", unit: "L", avg_price: 3.0 },
    frass: { label: "Frass/biofertilizante", unit: "kg", avg_price: 0.3 },
    chitin: { label: "Quitina/quitosano", unit: "kg", avg_price: 15.0 }
};
