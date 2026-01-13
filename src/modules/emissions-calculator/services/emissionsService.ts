import { supabase } from '../../../lib/supabase';
import { Plant } from '../types/emissions.types';

export const emissionsService = {
    async getPlants(): Promise<Plant[]> {
        const { data: plantsData, error } = await supabase
            .from('plants')
            .select('*');

        if (error) {
            console.error('Error fetching emission plants:', error);
            throw error;
        }

        // Map DB plants to Emissions Plant type
        return plantsData.map((p: any) => ({
            id: p.id,
            name: p.name,
            location: `${p.city || 'Desconocido'}, ${p.country || ''}`,
            coordinates: {
                lat: p.latitude || 0,
                lng: p.longitude || 0,
                // Generate a rough bbox around the point if not available
                bbox: [
                    (p.longitude || 0) - 0.05,
                    (p.latitude || 0) - 0.05,
                    (p.longitude || 0) + 0.05,
                    (p.latitude || 0) + 0.05
                ]
            },
            capacity_tons_day: p.capacity_tons_day || 0,
            status: mapStatus(p.status),

            // Fields required by type but not currently in DB main table
            country: p.country || 'Unknown',
            operations_start_date: '2025-01-01', // Mock default
            waste_processed_ytd: 0 // Will fetch from MRV later or kept 0
        }));
    },

    async getPlantStats(plantId: string) {
        // Fetch latest emissions record
        const { data: mrvData } = await supabase
            .from('mrv_records')
            .select('*')
            .eq('plant_id', plantId)
            .eq('type', 'satellite_methane')
            .order('record_date', { ascending: false })
            .limit(1)
            .single();

        return {
            lastMethaneReading: mrvData?.data?.methane_ppb || null,
            lastRecordDate: mrvData?.record_date || null
        };
    }
};

function mapStatus(status: string): 'operativa' | 'construccion' | 'planeada' {
    const s = status?.toLowerCase();
    if (s === 'active' || s === 'operativa') return 'operativa';
    if (s === 'construction' || s === 'pending_verification') return 'construccion';
    return 'planeada';
}
