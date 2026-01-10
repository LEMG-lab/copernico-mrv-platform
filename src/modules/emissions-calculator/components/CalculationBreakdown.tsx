import React from 'react';
import { EmissionsCalculation } from '../types/emissions.types';

interface CalculationBreakdownProps {
    calculation: EmissionsCalculation;
}

export const CalculationBreakdown: React.FC<CalculationBreakdownProps> = ({ calculation }) => {
    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col h-full">
            <h3 className="text-white font-bold mb-4">🔬 Desglose Científico del Cálculo</h3>

            <div className="flex-1 space-y-4 text-sm">

                {/* Baseline */}
                <div className="bg-slate-900/50 p-3 rounded border-l-4 border-red-500">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-300">Baseline (Relleno Sanitario)</span>
                        <span className="text-red-400 font-mono font-bold">{calculation.baseline.co2eq_tons.toLocaleString()} tCO2eq</span>
                    </div>
                    <div className="text-xs text-slate-500 flex justify-between">
                        <span>Emisión CH4 (Metano):</span>
                        <span>{calculation.baseline.ch4_kg.toLocaleString()} kg</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 italic">
                        Metodología: {calculation.baseline.methodology}
                    </div>
                </div>

                {/* Proyecto */}
                <div className="bg-slate-900/50 p-3 rounded border-l-4 border-blue-500">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-300">Proyecto LarvaLINK (BSF)</span>
                        <span className="text-blue-400 font-mono font-bold">{calculation.project.co2eq_tons.toLocaleString()} tCO2eq</span>
                    </div>
                    <div className="text-xs text-slate-500 flex justify-between">
                        <span>Emisión CH4 (Metano):</span>
                        <span>{calculation.project.ch4_kg.toLocaleString()} kg</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 italic">
                        Factor BSF: ~0.5 kg CH4/ton (Mertenat et al.)
                    </div>
                </div>

                {/* Resultado Neto */}
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30 mt-2">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-green-400">Total Evitado</span>
                        <span className="text-xl font-bold text-white">{calculation.avoided.co2eq_tons.toLocaleString()} <span className="text-xs font-normal text-slate-400">tCO2eq</span></span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: `${calculation.avoided.percentage}%` }}></div>
                    </div>
                    <div className="text-right text-xs text-green-400 mt-1">
                        Reducción del {calculation.avoided.percentage.toFixed(1)}% vs Baseline
                    </div>
                </div>

            </div>
        </div>
    );
};
