export const BSF_REQUIREMENTS = {
    temperature: {
        optimal_min: 25,
        optimal_max: 32,
        acceptable_min: 18,
        acceptable_max: 38,
        lethal_min: 10,
        lethal_max: 45
    },
    humidity: {
        optimal_min: 60,
        optimal_max: 80,
        acceptable_min: 40,
        acceptable_max: 90
    },
    land_per_capacity: {
        // m2 por ton/dia de capacidad
        small: 150,   // < 10 ton/dia
        medium: 120,  // 10-50 ton/dia
        large: 100    // > 50 ton/dia
    }
};
