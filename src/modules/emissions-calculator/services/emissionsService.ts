import { IPCC_FACTORS, EQUIVALENCIES } from '../constants/ipccFactors';
import { WasteInput, EmissionsCalculation } from '../types/emissions.types';
import CryptoJS from 'crypto-js';

export class EmissionsService {

    calculateEmissions(input: WasteInput): EmissionsCalculation {
        const factor = IPCC_FACTORS.wasteTypes[input.wasteType];
        const gwp = IPCC_FACTORS.gwp.ch4_20yr; // Usar 20 años para impacto a corto plazo (más impactante y urgente)

        // Obtener eficiencia de captura según el tipo seleccionado, default a 0 si no existe
        // @ts-ignore - acceso dinámico seguro dado el tipo WasteInput
        const capture = IPCC_FACTORS.capture_efficiency[input.landfillType] || 0;

        const oxidation = IPCC_FACTORS.oxidation_factor;

        // Normalizar a tons/año para el reporte
        let tons_year = input.tons;
        if (input.period === 'day') tons_year = input.tons * 365;
        if (input.period === 'month') tons_year = input.tons * 12;

        // BASELINE: Emisiones en relleno sanitario
        // Fórmula: Waste * CH4_Generation * (1 - Oxidation) * (1 - Capture)
        const baseline_ch4_kg = tons_year * factor.ch4_kg_per_ton * (1 - oxidation) * (1 - capture);
        const baseline_co2eq = (baseline_ch4_kg / 1000) * gwp;

        // PROYECTO: Emisiones en planta BSF
        const project_ch4_kg = tons_year * IPCC_FACTORS.bsf_plant.ch4_kg_per_ton;
        const project_co2eq = (project_ch4_kg / 1000) * gwp;

        // EVITADO
        const avoided_ch4_kg = baseline_ch4_kg - project_ch4_kg;
        const avoided_co2eq = baseline_co2eq - project_co2eq;
        const avoided_percentage = baseline_ch4_kg > 0 ? (avoided_ch4_kg / baseline_ch4_kg) * 100 : 0;

        // EQUIVALENCIAS
        const equivalencies = {
            trees: Math.round(avoided_co2eq * EQUIVALENCIES.trees_per_tco2),
            car_km: Math.round(avoided_co2eq * EQUIVALENCIES.km_car_per_tco2),
            homes: Math.round((avoided_co2eq * EQUIVALENCIES.homes_energy_per_tco2) * 10) / 10,
            flights: Math.round((avoided_co2eq * EQUIVALENCIES.flights_mx_ny_per_tco2) * 10) / 10
        };

        // HASH DE VERIFICACION
        const dataToHash = {
            input,
            baseline_co2eq,
            avoided_co2eq,
            timestamp: new Date().toISOString(),
            methodology: "IPCC 2019 + AR6 GWP20"
        };
        const hash = this.generateHash(dataToHash);

        return {
            input,
            baseline: {
                ch4_kg: Math.round(baseline_ch4_kg),
                co2eq_tons: Math.round(baseline_co2eq * 100) / 100,
                methodology: `${factor.source}, GWP20=${gwp}`
            },
            project: {
                ch4_kg: Math.round(project_ch4_kg),
                co2eq_tons: Math.round(project_co2eq * 100) / 100
            },
            avoided: {
                ch4_kg: Math.round(avoided_ch4_kg),
                co2eq_tons: Math.round(avoided_co2eq * 100) / 100,
                percentage: Math.round(avoided_percentage * 10) / 10
            },
            equivalencies,
            verification: {
                hash,
                timestamp: new Date().toISOString(),
                factors_source: "IPCC 2019 Refinement + IPCC AR6 2021"
            }
        };
    }

    generateHash(data: any): string {
        return CryptoJS.SHA256(JSON.stringify(data)).toString();
    }
}

export const emissionsService = new EmissionsService();
