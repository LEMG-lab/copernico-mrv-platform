import { supabase } from '../../../lib/supabase';
import { Parcel, DEMO_PARCELS } from '../types/parcel.types';

export const terralinkService = {
    async getParcels(plantId?: string): Promise<Parcel[]> {
        try {
            const { data, error } = await supabase
                .from('parcels')
                .select('*');

            if (error) {
                console.warn("Error fetching parcels from DB, using demo data:", error.message);
                return DEMO_PARCELS;
            }

            // Fallback to demo data if no parcels in database
            if (!data || data.length < 2) {
                console.info("No sufficient parcels in DB, using demo data for TerraLINK analysis");
                return DEMO_PARCELS;
            }

            return data.map((row: any, index: number) => ({
                id: row.id,
                name: row.owner_name || `Parcela ${index + 1}`,
                type: row.is_control ? 'control' : 'terralink',
                crop: row.crop_type || 'Desconocido',
                plantingDate: '2025-03-15', // Mock default
                area_hectares: row.area_hectares || 2.5,

                // Coordinates: In a real app we would parse the PostGIS WKB or use a DB View/One-to-one mapping
                // For this milestone, we will use the ID to check if it matches our seed data knowledge 
                // or just provide offsets so they are visible on map near Tepetloztoc.
                coordinates: {
                    // Tepetloztoc default area
                    center: [
                        -98.845 + (index * 0.005),
                        19.575 + (index * 0.005)
                    ],
                    bbox: [
                        -98.85 + (index * 0.005), 19.57 + (index * 0.005),
                        -98.84 + (index * 0.005), 19.58 + (index * 0.005)
                    ]
                }
            }));
        } catch (err) {
            console.warn("Failed to fetch parcels, falling back to demo data:", err);
            return DEMO_PARCELS;
        }
    },

    async getSoilSamples(parcelId: string) {
        const { data, error } = await supabase
            .from('soil_samples')
            .select('*')
            .eq('parcel_id', parcelId)
            .order('sample_date', { ascending: false });

        return { data, error };
    }
};
