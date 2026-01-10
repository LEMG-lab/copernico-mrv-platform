import { useState, useEffect } from 'react';
import { Parcel, ParcelComparison, DEMO_PARCELS } from '../types/parcel.types';
import { parcelAnalysisService } from '../services/parcelAnalysisService';

export const useNDVIComparison = () => {
    const [loading, setLoading] = useState(false);
    const [comparison, setComparison] = useState<ParcelComparison | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [dateRange, setDateRange] = useState({
        from: '2025-06-01', // 6 meses atrás aproximado desde demo date
        to: '2025-12-22'    // Fecha del prompt simulada
    });

    const runAnalysis = async () => {
        setLoading(true);
        setError(null);
        try {
            const terralinkParcel = DEMO_PARCELS.find(p => p.type === 'terralink')!;
            const controlParcel = DEMO_PARCELS.find(p => p.type === 'control')!;

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
        runAnalysis,
        demoParcels: DEMO_PARCELS
    };
};
