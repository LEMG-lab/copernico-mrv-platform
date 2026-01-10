import { ThirdPartyPlant } from '../types/network.types';

export const THIRD_PARTY_BSF_PLANTS: ThirdPartyPlant[] = [
    // USA
    { name: "EnviroFlight", country: "USA", coordinates: { lat: 39.96, lng: -82.99 }, capacity_tons_day: 50, source: "Public records" },
    { name: "Grubbly Farms", country: "USA", coordinates: { lat: 33.75, lng: -84.39 }, capacity_tons_day: 30, source: "News articles" },

    // Europa
    { name: "Protix", country: "Netherlands", coordinates: { lat: 51.69, lng: 5.30 }, capacity_tons_day: 300, source: "Company website" },
    { name: "InnovaFeed", country: "France", coordinates: { lat: 49.42, lng: 2.83 }, capacity_tons_day: 200, source: "Press releases" },
    { name: "Ynsect (BSF division)", country: "France", coordinates: { lat: 47.32, lng: 5.04 }, capacity_tons_day: 100, source: "Industry reports" },

    // Asia
    { name: "Entobel", country: "Vietnam", coordinates: { lat: 10.82, lng: 106.63 }, capacity_tons_day: 80, source: "Company website" },
    { name: "Nutrition Technologies", country: "Malaysia", coordinates: { lat: 1.55, lng: 103.64 }, capacity_tons_day: 60, source: "Press releases" },

    // Africa
    { name: "AgriProtein", country: "South Africa", coordinates: { lat: -33.93, lng: 18.42 }, capacity_tons_day: 100, source: "Public records" },
    { name: "Sanergy", country: "Kenya", coordinates: { lat: -1.29, lng: 36.82 }, capacity_tons_day: 40, source: "Impact reports" }
];
