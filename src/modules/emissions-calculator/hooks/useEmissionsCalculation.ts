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

    const verifyBlockchain = async () => {
        if (!calculation) return;

        // Optimistic update to 'verifying'
        setCalculation(prev => prev ? ({
            ...prev,
            verification: { ...prev.verification, status: 'verifying' }
        }) : null);

        try {
            const verifiedCalc = await emissionsService.verifyOnChain(calculation);
            setCalculation(verifiedCalc);
        } catch (e) {
            console.error("Error verifying on chain", e);
            // Revert state if error (ideal, but for simplicity just staying in pending might be fine or verify failed)
            setCalculation(prev => prev ? ({
                ...prev,
                verification: { ...prev.verification, status: 'pending' }
            }) : null);
        }
    };

    return {
        wasteInput,
        calculation,
        updateInput,
        verifyBlockchain,
        wasteTypes: IPCC_FACTORS.wasteTypes,
        landfillTypes: IPCC_FACTORS.capture_efficiency
    };
};
