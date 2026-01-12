import { LARVALINK_PLANTS } from './larvalinkPlants';

export interface PlantLocation {
    id: string;
    name: string;
    city: string;
    country: string;
    address?: string; // Calle y número
    zipCode?: string; // Código postal
    coordinates: [number, number]; // [lat, lng]
    type: 'partner' | 'competitor' | 'potential';
    capacity: number; // Toneladas/día
    status: 'active' | 'construction' | 'planned';
}

export const generatePlants = (): PlantLocation[] => {
    // Lista de ciudades importantes para bioconversión (climas templados/tropicales o grandes urbes)
    const hubs = [
        { city: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
        { city: "Guadalajara", country: "Mexico", lat: 20.6597, lng: -103.3496 },
        { city: "Bogota", country: "Colombia", lat: 4.7110, lng: -74.0721 },
        { city: "Sao Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
        { city: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },
        { city: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
        { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
        { city: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050 },
        { city: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
        { city: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219 },
        { city: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777 },
        { city: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
        { city: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 },
        { city: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
        { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
        { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
        { city: "Austin", country: "USA", lat: 30.2672, lng: -97.7431 },
        { city: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194 },
        { city: "Toronto", country: "Canada", lat: 43.65107, lng: -79.347015 },
        { city: "London", country: "UK", lat: 51.5074, lng: -0.1278 }
    ];

    // Start with the verified LarvaLINK plants
    const plants: PlantLocation[] = [...LARVALINK_PLANTS.map(p => ({
        id: p.id,
        name: p.name,
        city: p.city,
        country: p.country,
        address: `${p.city}, ${p.country}`,
        zipCode: '00000',
        coordinates: [p.coordinates.lat, p.coordinates.lng] as [number, number],
        type: 'partner' as const,
        capacity: p.capacity_tons_day,
        status: p.status === 'operativa' ? 'active' : p.status === 'construccion' ? 'construction' : 'planned'
    }))];

    // Generar 50 plantas adicionales arbitrarias de competidores/potenciales
    for (let i = 0; i < 50; i++) {
        const hub = hubs[Math.floor(Math.random() * hubs.length)];

        // Añadir "fuzz" (dispersión) aleatoria a las coordenadas para que no estén encimadas
        const latFuzz = (Math.random() - 0.5) * 2.0; // +/- 1 grado aprox
        const lngFuzz = (Math.random() - 0.5) * 2.0;

        const typeRoll = Math.random();
        let type: 'partner' | 'competitor' | 'potential' = 'potential';
        // Menos partners random porque ya tenemos los reales
        if (typeRoll > 0.9) type = 'partner';
        else if (typeRoll > 0.6) type = 'competitor';

        const statusRoll = Math.random();
        let status: 'active' | 'construction' | 'planned' = 'planned';
        if (statusRoll > 0.5) status = 'active';
        else if (statusRoll > 0.3) status = 'construction';

        plants.push({
            id: `plant-${i + 1}`,
            name: `${type === 'partner' ? 'LarvaLINK' : 'BSF Plant'} ${hub.city} ${i + 1}`,
            city: hub.city,
            country: hub.country,
            coordinates: [hub.lat + latFuzz, hub.lng + lngFuzz],
            type,
            capacity: Math.floor(Math.random() * 50) + 10,
            status: status as 'active' | 'construction' | 'planned'
        });
    }

    return plants;
};

export const GLOBAL_PLANTS = generatePlants();
