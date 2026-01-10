import React, { useState } from 'react';
import { GlobalMap } from './components/GlobalMap';
import { NetworkStats } from './components/NetworkStats';
import { OpportunityCard } from './components/OpportunityCard';
import { METHANE_HOTSPOTS } from './data/methaneHotspots';
import { NetworkFilters } from './types/network.types';
import { Navigation } from '../../components/Navigation';

export const GlobalNetworkDashboard: React.FC = () => {
    const [filters, setFilters] = useState<NetworkFilters>({
        showLarvaLink: true,
        showThirdParty: true,
        showHotspots: true,
        regions: ['Americas', 'Europe', 'Asia', 'Africa']
    });

    const toggleFilter = (key: keyof NetworkFilters) => {
        // @ts-ignore
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-[#0F172A] font-sans text-slate-200 flex flex-col h-screen overflow-hidden">
            <Navigation />

            {/* Header Compacto */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-6 shrink-0 gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 flex items-center gap-3">
                        <span className="text-3xl">🌏</span> Red Global de Bioconversión BSF
                    </h1>
                </div>

                {/* Controles de Filtros Rápidos */}
                <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                    <button
                        onClick={() => toggleFilter('showLarvaLink')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-2 ${filters.showLarvaLink ? 'bg-[#2ECC71]/20 text-[#2ECC71]' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${filters.showLarvaLink ? 'bg-[#2ECC71]' : 'bg-slate-600'}`}></span>
                        LarvaLINK
                    </button>
                    <div className="w-[1px] bg-slate-700 mx-1"></div>
                    <button
                        onClick={() => toggleFilter('showThirdParty')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-2 ${filters.showThirdParty ? 'bg-[#3498DB]/20 text-[#3498DB]' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${filters.showThirdParty ? 'bg-[#3498DB]' : 'bg-slate-600'}`}></span>
                        Terceros
                    </button>
                    <div className="w-[1px] bg-slate-700 mx-1"></div>
                    <button
                        onClick={() => toggleFilter('showHotspots')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-2 ${filters.showHotspots ? 'bg-[#E74C3C]/20 text-[#E74C3C]' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${filters.showHotspots ? 'bg-[#E74C3C]' : 'bg-slate-600'}`}></span>
                        Oportunidades
                    </button>
                </div>

                <a href="/" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm border border-slate-600 transition-colors">
                    Salir
                </a>
            </header>

            {/* Layout Principal: Mapa y Sidebar */}
            <div className="flex-1 flex gap-6 min-h-0">

                {/* Columna Izquierda: Mapa (Grow) */}
                <div className="flex-1 flex flex-col min-h-0 gap-4">
                    {/* Estadísticas Top */}
                    <div className="shrink-0">
                        <NetworkStats />
                    </div>

                    {/* Contenedor Mapa */}
                    <div className="flex-1 rounded-xl overflow-hidden border border-slate-700 relative bg-slate-900 shadow-2xl">
                        <GlobalMap filters={filters} />
                    </div>
                </div>

                {/* Columna Derecha: Detalles (Fijo 350px) */}
                <div className="w-[350px] flex flex-col gap-6 shrink-0 overflow-y-auto pr-1 custom-scrollbar">

                    {/* Contexto de Industria */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                        <h3 className="text-white font-bold mb-3 border-b border-slate-700 pb-2">Industria Global BSF</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Plantas activas (est)</span>
                                <span className="text-white font-mono">~45</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Capacidad Global</span>
                                <span className="text-white font-mono">~2,500 t/d</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Share LarvaLINK (LatAm)</span>
                                <span className="text-green-400 font-bold font-mono">6.7%</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-2 italic bg-slate-900/50 p-2 rounded">
                                "La bioconversión representa la solución más escalable para residuos orgánicos en megaciudades."
                                <br />— FAO Report 2024
                            </div>
                        </div>
                    </div>

                    {/* Lista Oportunidades */}
                    <div className="flex-1 flex flex-col min-h-0 bg-slate-800/50 rounded-xl border border-slate-700 p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-bold">🎯 Top Oportunidades</h3>
                            <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded">Sentinel-5P</span>
                        </div>

                        <div className="space-y-3 overflow-y-auto pr-1">
                            {METHANE_HOTSPOTS.map((hotspot, idx) => (
                                <OpportunityCard key={idx} hotspot={hotspot} rank={idx + 1} />
                            ))}
                        </div>
                    </div>

                    {/* Footer Verificación */}
                    <div className="text-[10px] text-slate-500 text-center px-4">
                        <p>Datos de red actualizados en tiempo real mediante oráculos de LarvaLINK Chain.</p>
                        <p className="mt-1">Fuentes de terceros: Informes públicos agregados.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GlobalNetworkDashboard;
