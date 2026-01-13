import { useState, useEffect } from 'react';
import { Parcel, ParcelComparison } from '../types/parcel.types';
import { parcelAnalysisService } from '../services/parcelAnalysisService';
import { terralinkService } from '../services/terralinkService';

export const useNDVIComparison = () => {
    const [loading, setLoading] = useState(false);
    const [comparison, setComparison] = useState<ParcelComparison | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [dateRange, setDateRange] = useState({
        from: '2025-06-01', // 6 meses atrás aproximado
        to: '2025-12-22'
    });

    const runAnalysis = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Obtener parcelas reales de Supabase
            const parcels = await terralinkService.getParcels();

            if (!parcels || parcels.length < 2) {
                throw new Error("No se encontraron suficientes parcelas (TerraLINK + Control) en la base de datos.");
            }

            const terralinkParcel = parcels.find(p => p.type === 'terralink') || parcels[0];
            const controlParcel = parcels.find(p => p.type === 'control') || parcels[1];

            // Obtener imágenes (opcional, se puede cargar on-demand, aquí pre-cargamos URLs si el servicio es rápido)
            // Por simplicidad, el componente las pedirá, aquí solo pedimos datos numéricos.

            const result = await parcelAnalysisService.compareParcels(
                terralinkParcel,
                controlParcel,
                dateRange.from,
                dateRange.to
            );

            setComparison(result);
        } catch (err: any) {
            console.error(err);
            setError('Error al ejecutar el análisis comparativo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Ejecutar análisis inicial al montar
        runAnalysis();
    }, []);

    return {
        loading,
        comparison,
        error,
        runAnalysis
    };
};
