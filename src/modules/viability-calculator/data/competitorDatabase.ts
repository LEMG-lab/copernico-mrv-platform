import { Competitor } from "../types/viability.types";

export const KNOWN_BSF_PLANTS: Partial<Competitor>[] = [
    { name: "Protix", location: { lat: 51.69, lng: 5.30, country: "Netherlands", city: "Dongen", region: "NB" } as any, capacity_tons_day: 300 },
    { name: "InnovaFeed", location: { lat: 49.42, lng: 2.83, country: "France", city: "Nesle", region: "Hauts-de-France" } as any, capacity_tons_day: 200 },
    { name: "EnviroFlight", location: { lat: 39.96, lng: -82.99, country: "USA", city: "Maysville", region: "KY" } as any, capacity_tons_day: 50 },
    { name: "Entobel", location: { lat: 10.82, lng: 106.63, country: "Vietnam", city: "Vung Tau", region: "Ba Ria" } as any, capacity_tons_day: 80 },
    { name: "AgriProtein", location: { lat: -33.93, lng: 18.42, country: "South Africa", city: "Cape Town", region: "Western Cape" } as any, capacity_tons_day: 100 },
    { name: "Nutrition Technologies", location: { lat: 1.55, lng: 103.64, country: "Malaysia", city: "Iskandar Puteri", region: "Johor" } as any, capacity_tons_day: 60 },
    { name: "Grubbly Farms", location: { lat: 33.75, lng: -84.39, country: "USA", city: "Atlanta", region: "GA" } as any, capacity_tons_day: 30 },
    { name: "LarvaLINK Papalotla", location: { lat: 19.575, lng: -98.845, country: "Mexico", city: "Papalotla", region: "Tlaxcala" } as any, capacity_tons_day: 18 },
];
