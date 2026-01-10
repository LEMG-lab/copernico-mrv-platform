import React from 'react';
import { ImpactMetrics as MetricsType } from '../types/investor.types';

interface ImpactMetricsProps {
    metrics: MetricsType;
}

export const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ metrics }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>

            {/* CO2 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                        🌍
                    </div>
                    <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                        ↑ 12%
                    </div>
                </div>
                <div className="text-3xl font-bold text-slate-800 tracking-tight">
                    {metrics.co2eq_avoided.toLocaleString()}
                </div>
                <div className="text-sm font-medium text-slate-500">tCO2eq evitadas</div>
            </div>

            {/* Waste */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">
                        ♻️
                    </div>
                    <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                        ↑ 8%
                    </div>
                </div>
                <div className="text-3xl font-bold text-slate-800 tracking-tight">
                    {metrics.waste_diverted_tons.toLocaleString()}
                </div>
                <div className="text-sm font-medium text-slate-500">Tons residuos</div>
            </div>

            {/* Jobs */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                        👥
                    </div>
                    <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                        ↑ 4.5%
                    </div>
                </div>
                <div className="text-3xl font-bold text-slate-800 tracking-tight">
                    {metrics.direct_jobs + metrics.indirect_jobs}
                </div>
                <div className="text-sm font-medium text-slate-500">Empleos totales</div>
            </div>

            {/* Hectares */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
                        🌱
                    </div>
                    <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                        ↑ 15%
                    </div>
                </div>
                <div className="text-3xl font-bold text-slate-800 tracking-tight">
                    {metrics.hectares_regenerated}
                </div>
                <div className="text-sm font-medium text-slate-500">Has. regeneradas</div>
            </div>

        </div>
    );
};
