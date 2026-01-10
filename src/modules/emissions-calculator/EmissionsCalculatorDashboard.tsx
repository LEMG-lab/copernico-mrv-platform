import React, { useState } from 'react';
import { PlantSelector } from './components/PlantSelector';
import { WasteInputForm } from './components/WasteInputForm';
import { EmissionsGauge } from './components/EmissionsGauge';
import { CalculationBreakdown } from './components/CalculationBreakdown';
import { EquivalenciesCard } from './components/EquivalenciesCard';
import { MethaneMapContext } from './components/MethaneMapContext';
import { BlockchainRegistry } from './components/BlockchainRegistry';
import { useEmissionsCalculation } from './hooks/useEmissionsCalculation';
import { LARVALINK_PLANTS, Plant } from './types/emissions.types';

export const EmissionsCalculatorDashboard: React.FC = () => {
    const [selectedPlant, setSelectedPlant] = useState<Plant>(LARVALINK_PLANTS[0]); // Default Papalotla
    const { wasteInput, calculation, updateInput } = useEmissionsCalculation();
    const [showReport, setShowReport] = useState(false); // Simulación de descarga

    const handleDownloadReport = () => {
        setShowReport(true);
        setTimeout(() => setShowReport(false), 3000);
        alert("Generando reporte certificado IPCC (Simulado)...");
    };

    return (
        <div className="min-h-screen bg-[#0F172A] p-6 lg:p-10 font-sans text-slate-200">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-slate-700 gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">
                        Calculadora de Emisiones Evitadas
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Cuantificación de impacto ambiental por bioconversión de residuos • Metodología IPCC
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleDownloadReport}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-colors border border-slate-600 font-medium"
                    >
                        📄 Descargar Reporte
                    </button>
                    <a href="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium">
                        Volver al Inicio
                    </a>
                </div>
            </header>

            <div className="max-w-7xl mx-auto space-y-6">

                {/* 1. Selector de Planta */}
                <PlantSelector selectedPlant={selectedPlant} onSelect={setSelectedPlant} />

                {/* 2. Área Interactiva Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                    {/* Inputs (4 cols) */}
                    <div className="lg:col-span-4">
                        <WasteInputForm input={wasteInput} onChange={updateInput} />
                    </div>

                    {/* Gauge Visual (3 cols) */}
                    <div className="lg:col-span-3">
                        {calculation && (
                            <EmissionsGauge percentage={calculation.avoided.percentage} />
                        )}
                    </div>

                    {/* Desglose Numérico (5 cols) */}
                    <div className="lg:col-span-5">
                        {calculation && (
                            <CalculationBreakdown calculation={calculation} />
                        )}
                    </div>
                </div>

                {/* 3. Equivalencias e Impacto */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {calculation && (
                        <EquivalenciesCard data={calculation.equivalencies} />
                    )}

                    {/* 4. Contexto Regional Sentinel-5P */}
                    <div>
                        <MethaneMapContext plant={selectedPlant} />
                    </div>
                </div>

                {/* 5. Footer: Blockchain y Legal */}
                {calculation && (
                    <div className="mt-8">
                        <BlockchainRegistry hash={calculation.verification.hash} timestamp={calculation.verification.timestamp} />

                        <div className="mt-8 text-center border-t border-slate-800 pt-6">
                            <p className="text-[10px] text-slate-500 max-w-3xl mx-auto leading-relaxed">
                                DISCLAIMER LEGAL: La "Calculadora de Emisiones Evitadas por Bioconversion" genera estimaciones basadas estrictamente en factores de emisión del IPCC 2019 Refinement y los Potenciales de Calentamiento Global (GWP20) del reporte AR6 del IPCC.
                                Los resultados representan el potencial teórico de mitigación al desviar residuos de rellenos sanitarios.
                                Estos cálculos son para propósitos informativos y de monitoreo interno. Para la emisión y comercialización de créditos de carbono (offsets), se requiere una validación y verificación formal por un tercer organismo acreditado bajo estándares como Verra o Gold Standard.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmissionsCalculatorDashboard;
