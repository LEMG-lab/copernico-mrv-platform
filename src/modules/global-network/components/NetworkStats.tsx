import React from 'react';
import { useNetworkStats } from '../hooks/useNetworkStats';
import { ImpactCounter } from './ImpactCounter';

export const NetworkStats: React.FC = () => {
    const stats = useNetworkStats();

    if (!stats) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {/* Plantas LarvaLINK */}
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl flex flex-col justify-between">
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">Plantas LarvaLINK</div>
                <div className="text-3xl font-bold text-green-400">
                    <ImpactCounter end={stats.larvalink.count} duration={1000} />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Activas y planeadas</div>
            </div>

            {/* Capacidad */}
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl flex flex-col justify-between">
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">Capacidad Propia</div>
                <div className="text-3xl font-bold text-blue-400">
                    <ImpactCounter end={stats.larvalink.capacity} duration={1500} /> <span className="text-sm font-normal">t/día</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Procesamiento diario</div>
            </div>

            {/* CO2 Evitado */}
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl flex flex-col justify-between">
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">CO2eq Evitado</div>
                <div className="text-3xl font-bold text-teal-400">
                    <ImpactCounter end={stats.larvalink.co2Avoided} duration={2000} /> <span className="text-sm font-normal">t</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Impacto histórico</div>
            </div>

            {/* Mercado Global */}
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl flex flex-col justify-between">
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">Valor Industria</div>
                <div className="text-3xl font-bold text-purple-400">
                    $<ImpactCounter end={stats.industry.marketValue} duration={2000} />M
                </div>
                <div className="text-[10px] text-slate-500 mt-1">CAGR Estimado: {stats.industry.cagr}%</div>
            </div>
        </div>
    );
};
