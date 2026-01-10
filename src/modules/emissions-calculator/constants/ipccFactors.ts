// src/modules/emissions-calculator/constants/ipccFactors.ts

export const IPCC_FACTORS = {
    // Emision de metano por tipo de residuo en relleno sanitario
    // Fuente: IPCC 2019 Refinement, Chapter 3
    wasteTypes: {
        food_waste: {
            name: "Residuos de alimentos",
            ch4_kg_per_ton: 62,
            moisture_content: 0.70,
            doc: 0.15, // Degradable Organic Carbon
            source: "IPCC 2019, Table 3.1"
        },
        market_waste: {
            name: "Residuos de mercado/central de abasto",
            ch4_kg_per_ton: 58,
            moisture_content: 0.65,
            doc: 0.13,
            source: "IPCC 2019, Table 3.1"
        },
        agricultural_waste: {
            name: "Residuos agricolas",
            ch4_kg_per_ton: 45,
            moisture_content: 0.50,
            doc: 0.10,
            source: "IPCC 2019, Table 3.1"
        },
        manure: {
            name: "Estiercol/gallinaza",
            ch4_kg_per_ton: 55,
            moisture_content: 0.75,
            doc: 0.12,
            source: "IPCC 2006, Chapter 10"
        }
    },

    // Global Warming Potential del metano
    gwp: {
        ch4_100yr: 28,  // GWP a 100 años (AR5)
        ch4_20yr: 84,   // GWP a 20 años (AR6) - mas relevante para corto plazo
        source: "IPCC AR6, 2021"
    },

    // Emision de planta BSF (literatura cientifica)
    bsf_plant: {
        ch4_kg_per_ton: 0.5,  // Casi negligible
        source: "Mertenat et al., 2019; Pang et al., 2020"
    },

    // Factor de oxidacion en relleno
    oxidation_factor: 0.10,  // 10% se oxida antes de escapar

    // Eficiencia de captura en rellenos con sistema de gas
    capture_efficiency: {
        no_capture: 0,
        passive_venting: 0.10,
        active_collection: 0.50,
        flaring: 0.75
    }
} as const; // as const para asegurar inmutabilidad de tipos literales

// Equivalencias para comunicacion
export const EQUIVALENCIES = {
    trees_per_tco2: 45,           // Arboles necesarios para absorber 1 tCO2 en 1 año
    km_car_per_tco2: 4000,        // Km en auto promedio por tCO2
    homes_energy_per_tco2: 0.12,  // Hogares/año por tCO2
    flights_mx_ny_per_tco2: 0.5   // Vuelos Mexico-NY por tCO2
};
