import { supabase } from '../../../lib/supabase';
import { PlantLocation } from '../data/globalPlants';

export const networkService = {
    async getPlants(): Promise<PlantLocation[]> {
        const { data, error } = await supabase
            .from('plants')
            .select('*');

        if (error) {
            console.error('Error fetching plants:', error);
            throw error;
        }

        // Transform Supabase rows to app entity
        return data.map((row: any) => ({
            id: row.id,
            name: row.name,
            city: row.city || 'Desconocida',
            country: row.country || 'Desconocido',
            address: row.address,
            zipCode: row.postal_code,
            // Fallback para coordenadas si vienen en null (evitar crash en mapa)
            coordinates: [row.latitude || 0, row.longitude || 0],

            // Mapeo de Status
            type: determineType(row),
            capacity: row.capacity_tons_day || 0,
            status: mapStatus(row.status)
        }));
    },

    async updatePlant(id: string, updates: Partial<PlantLocation>): Promise<void> {
        // Convert Frontend updates to DB columns
        const dbUpdates: any = {};
        if (updates.name) dbUpdates.name = updates.name;
        if (updates.city) dbUpdates.city = updates.city;
        if (updates.country) dbUpdates.country = updates.country;
        if (updates.address) dbUpdates.address = updates.address;
        if (updates.coordinates) {
            dbUpdates.latitude = updates.coordinates[0];
            dbUpdates.longitude = updates.coordinates[1];
        }

        const { error } = await supabase
            .from('plants')
            .update(dbUpdates)
            .eq('id', id);

        if (error) throw error;
    }
};

// Helpers para mapeo
function determineType(row: any): 'partner' | 'competitor' | 'potential' {
    // Si la empresa es LarvaLINK (ID seed conocido), es Partner
    if (row.company_id === 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11') return 'partner';
    if (row.company_id === 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22') return 'partner';
    return 'potential';
}

function mapStatus(dbStatus: string): 'active' | 'construction' | 'planned' {
    switch (dbStatus) {
        case 'active': return 'active';
        case 'operativa': return 'active';
        case 'verified': return 'active';
        case 'construction': return 'construction';
        case 'pending_verification': return 'construction'; // Asumimos en proceso
        case 'planned': return 'planned';
        default: return 'planned';
    }
}
