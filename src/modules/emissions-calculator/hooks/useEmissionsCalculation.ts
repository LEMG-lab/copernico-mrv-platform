import { useState, useEffect } from 'react';
import { WasteInput, EmissionsCalculation, Plant, WasteType, Period, LandfillType } from '../types/emissions.types';
import { emissionsService } from '../services/emissionsService';
import { IPCC_FACTORS } from '../constants/ipccFactors';

export const useEmissionsCalculation = () => {
    const [wasteInput, setWasteInput] = useState<WasteInput>({
        wasteType: 'food_waste',
        tons: 500,
        period: 'month',
        landfillType: 'no_capture'
    });

    const [calculation, setCalculation] = useState<EmissionsCalculation | null>(null);

    // Calcular automáticamente cuando cambia el input
    useEffect(() => {
        try {
            const result = emissionsService.calculateEmissions(wasteInput);
            setCalculation(result);
        } catch (e) {
            console.error("Error calculating emissions", e);
        }
    }, [wasteInput]);

    const updateInput = (field: keyof WasteInput, value: any) => {
        setWasteInput(prev => ({ ...prev, [field]: value }));
    };

    return {
        wasteInput,
        calculation,
        updateInput,
        wasteTypes: IPCC_FACTORS.wasteTypes,
        landfillTypes: IPCC_FACTORS.capture_efficiency
    };
};
