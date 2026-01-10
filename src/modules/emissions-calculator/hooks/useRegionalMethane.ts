import { useState, useEffect } from 'react';
import { Plant, RegionalMethane } from '../types/emissions.types';
import { methaneService } from '../services/methaneService';

export const useRegionalMethane = (selectedPlant: Plant) => {
    const [data, setData] = useState<RegionalMethane | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await methaneService.getRegionalData(selectedPlant);
                if (mounted) {
                    setData(result);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching methane data", error);
                if (mounted) setLoading(false);
            }
        };

        fetchData();

        return () => { mounted = false; };
    }, [selectedPlant.id]);

    return { data, loading };
};
