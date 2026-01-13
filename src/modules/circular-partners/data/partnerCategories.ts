import { PartnerCategory, WasteType } from '../types/partners.types';

export interface CategoryConfig {
    name: string;
    icon: string;
    color: string;
    description: string;
    avg_waste_kg: number;
    waste_types: WasteType[];
    examples: string[];
}

export const PARTNER_CATEGORIES: Record<PartnerCategory, CategoryConfig> = {
    restaurant: {
        name: "Restaurante",
        icon: "utensils",
        color: "#E74C3C",
        description: "Restaurantes, fondas, taquerías, cafeterías",
        avg_waste_kg: 50,
        waste_types: ['kitchen_prep', 'plate_waste', 'fruits_vegetables'],
        examples: ["Restaurante familiar", "Cadena de comida rápida", "Fine dining"]
    },
    hotel: {
        name: "Hotel",
        icon: "bed",
        color: "#9B59B6",
        description: "Hoteles, hostales, resorts",
        avg_waste_kg: 200,
        waste_types: ['kitchen_prep', 'plate_waste', 'fruits_vegetables', 'garden_waste'],
        examples: ["Hotel boutique", "Resort todo incluido", "Hostal"]
    },
    hospital: {
        name: "Hospital / Clínica",
        icon: "hospital",
        color: "#3498DB",
        description: "Hospitales, clínicas, asilos (residuos orgánicos no peligrosos)",
        avg_waste_kg: 300,
        waste_types: ['kitchen_prep', 'plate_waste', 'fruits_vegetables'],
        examples: ["Hospital general", "Clínica", "Asilo"]
    },
    school: {
        name: "Escuela / Universidad",
        icon: "graduation-cap",
        color: "#F39C12",
        description: "Cafeterías escolares, comedores universitarios",
        avg_waste_kg: 150,
        waste_types: ['kitchen_prep', 'plate_waste', 'fruits_vegetables'],
        examples: ["Primaria", "Universidad", "Colegio privado"]
    },
    supermarket: {
        name: "Supermercado / Tienda",
        icon: "shopping-cart",
        color: "#2ECC71",
        description: "Supermercados, tiendas de abarrotes, fruterías",
        avg_waste_kg: 100,
        waste_types: ['fruits_vegetables', 'bread_bakery', 'dairy'],
        examples: ["Supermercado", "Frutería", "Tienda orgánica"]
    },
    food_factory: {
        name: "Fábrica de Alimentos",
        icon: "factory",
        color: "#1ABC9C",
        description: "Procesadoras, empacadoras, panificadoras",
        avg_waste_kg: 500,
        waste_types: ['kitchen_prep', 'fruits_vegetables', 'bread_bakery'],
        examples: ["Panificadora", "Procesadora de lácteos", "Empacadora"]
    },
    central_abasto: {
        name: "Central de Abasto / Mercado",
        icon: "store",
        color: "#E67E22",
        description: "Mercados, centrales de abasto, tianguis",
        avg_waste_kg: 1000,
        waste_types: ['fruits_vegetables', 'flowers'],
        examples: ["Mercado municipal", "Central de abasto", "Tianguis"]
    },
    catering: {
        name: "Catering / Banquetes",
        icon: "cake",
        color: "#FF6B6B",
        description: "Empresas de catering, banqueteras",
        avg_waste_kg: 80,
        waste_types: ['kitchen_prep', 'plate_waste', 'fruits_vegetables'],
        examples: ["Catering corporativo", "Banquetera", "Food truck"]
    },
    corporate_cafeteria: {
        name: "Cafetería Corporativa",
        icon: "building",
        color: "#5D6D7E",
        description: "Comedores de empresas, oficinas",
        avg_waste_kg: 120,
        waste_types: ['kitchen_prep', 'plate_waste', 'coffee_grounds'],
        examples: ["Comedor industrial", "Cafetería de oficina"]
    },
    coffee_shop: {
        name: "Cafetería / Café",
        icon: "coffee",
        color: "#8B4513",
        description: "Cafeterías, coffee shops",
        avg_waste_kg: 30,
        waste_types: ['coffee_grounds', 'bread_bakery', 'dairy'],
        examples: ["Coffee shop", "Café de especialidad", "Cadena de café"]
    },
    bakery: {
        name: "Panadería / Pastelería",
        icon: "croissant",
        color: "#D4A574",
        description: "Panaderías, pastelerías, reposterías",
        avg_waste_kg: 40,
        waste_types: ['bread_bakery', 'eggshells', 'dairy'],
        examples: ["Panadería artesanal", "Pastelería", "Rosticería"]
    },
    bar_club: {
        name: "Bar / Antro",
        icon: "wine",
        color: "#8E44AD",
        description: "Bares, antros, cantinas",
        avg_waste_kg: 60,
        waste_types: ['fruits_vegetables', 'plate_waste'],
        examples: ["Bar de cócteles", "Antro", "Cantina"]
    },
    event_venue: {
        name: "Salón de Eventos",
        icon: "party-popper",
        color: "#FF69B4",
        description: "Salones de fiestas, centros de convenciones",
        avg_waste_kg: 150,
        waste_types: ['kitchen_prep', 'plate_waste', 'flowers'],
        examples: ["Salón de fiestas", "Centro de convenciones", "Jardín de eventos"]
    },
    gym_spa: {
        name: "Gimnasio / Spa",
        icon: "dumbbell",
        color: "#00CED1",
        description: "Gimnasios con cafetería, spas con restaurante",
        avg_waste_kg: 25,
        waste_types: ['fruits_vegetables', 'coffee_grounds'],
        examples: ["Gimnasio con juice bar", "Spa con restaurante", "Club deportivo"]
    },
    other: {
        name: "Otro",
        icon: "circle-dot",
        color: "#95A5A6",
        description: "Otros generadores de residuos orgánicos",
        avg_waste_kg: 50,
        waste_types: ['other_organic'],
        examples: ["Iglesia", "Asociación civil", "Otro"]
    }
};

export const getCategoryConfig = (category: PartnerCategory): CategoryConfig => {
    return PARTNER_CATEGORIES[category];
};
