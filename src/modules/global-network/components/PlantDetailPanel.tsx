import React from 'react';
import { LarvaLinkPlant, ThirdPartyPlant } from '../types/network.types';
import { PlantLocation } from '../data/globalPlants';

// Definición de tipos para soportar tanto los tipos estrictos como los del store (PlantLocation)
type DisplayPlant = (LarvaLinkPlant | ThirdPartyPlant | PlantLocation) & { co2eq_avoided_ytd?: number, verified?: boolean };

interface PlantDetailPanelProps {
    plant: DisplayPlant;
    onClose: () => void;
}

const SDGCard: React.FC<{
    number: number;
    title: string;
    metric: string;
    unit: string;
    color: string;
    bgColor: string;
    description: string;
}> = ({ number, title, metric, unit, color, bgColor, description }) => (
    <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 hover:border-slate-500 transition-colors group relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-16 h-16 ${bgColor} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
        <div className="flex items-start gap-3 relative z-10">
            <div className={`w-10 h-10 shrink-0 ${bgColor} flex items-center justify-center text-white font-bold text-lg rounded shadow-lg`}>
                {number}
            </div>
            <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{title}</div>
                <div className="flex items-baseline gap-1">
                    <span className={`text-xl font-bold ${color}`}>{metric}</span>
                    <span className="text-[10px] text-slate-500">{unit}</span>
                </div>
            </div>
        </div>
        <div className="mt-2 text-[10px] text-slate-400 italic border-t border-slate-700/50 pt-1">
            {description}
        </div>
    </div>
);

export const PlantDetailPanel: React.FC<PlantDetailPanelProps> = ({ plant, onClose }) => {
    // Cálculos estimados para KPIs si no existen datos reales
    // @ts-ignore
    const capacity = plant.capacity || plant.capacity_tons_day || 0;

    // Si no tiene CO2 evitado real, estimamos (approx 0.5t CO2e per ton waste)
    const co2Avoided = plant.co2eq_avoided_ytd || Math.round(capacity * 365 * 0.5);

    // Estimación de nutrientes (approx 20% output frass/fertilizer)
    const fertilizerProduced = Math.round(capacity * 365 * 0.2);

    // Estimación Hogares (1 ton waste ~ resido diario de 1000 personas ~ 300 hogares?)
    // Promedio CDMX: 1kg/persona/dia. 1 ton = 1000 personas. 
    const peopleServed = Math.round(capacity * 1000);

    return (
        <div className="w-full h-full flex flex-col bg-slate-900 overflow-hidden relative">
            {/* Header */}
            <div className="p-5 border-b border-slate-700 bg-slate-800/50 backdrop-blur shrink-0 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    ✕
                </button>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-green-400 bg-green-900/30 px-1.5 py-0.5 rounded border border-green-500/30">
                        {/*@ts-ignore*/}
                        {plant.type === 'partner' || plant.verified ? 'RED LARVALINK' : 'MONITOREADO'}
                    </span>
                    {/*@ts-ignore*/}
                    {plant.status && (
                        <span className="text-xs font-mono text-blue-400 bg-blue-900/30 px-1.5 py-0.5 rounded border border-blue-500/30 uppercase">
                            {/*@ts-ignore*/}
                            {plant.status}
                        </span>
                    )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{plant.name}</h2>
                <div className="text-sm text-slate-400 flex items-center gap-1">
                    <span>📍</span> {plant.city}, {plant.country}
                </div>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                        <div className="text-xs text-slate-500 mb-1">Capacidad Procesamiento</div>
                        <div className="text-lg font-bold text-white">{capacity} <span className="text-xs text-slate-400 font-normal">t/día</span></div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                        <div className="text-xs text-slate-500 mb-1">Año Inicio</div>
                        <div className="text-lg font-bold text-white">2024</div>
                    </div>
                </div>

                {/* SDG Section */}
                <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="text-xl">🇺🇳</span> Impacto ODS (SDGs)
                    </h3>
                    <div className="space-y-3">
                        {/* SDG 13: Climate Action */}
                        <SDGCard
                            number={13}
                            title="Acción por el Clima"
                            metric={co2Avoided.toLocaleString()}
                            unit="tCO2e/año"
                            color="text-green-400"
                            bgColor="bg-[#3F7E44]"
                            description="Emisiones de metano evitadas vs relleno sanitario."
                        />

                        {/* SDG 11: Sustainable Cities */}
                        <SDGCard
                            number={11}
                            title="Ciudades Sostenibles"
                            metric={(capacity * 365).toLocaleString()}
                            unit="t/residuos"
                            color="text-orange-400"
                            bgColor="bg-[#FD9D24]"
                            description="Gestión local de residuos orgánicos urbanos."
                        />

                        {/* SDG 12: Responsible Consumption */}
                        <SDGCard
                            number={12}
                            title="Prod. Responsable"
                            metric={fertilizerProduced.toLocaleString()}
                            unit="t/biofertilizante"
                            color="text-amber-400"
                            bgColor="bg-[#BF8B2E]"
                            description="Retorno de nutrientes al suelo (Economía Circular)."
                        />

                        {/* SDG 2: Zero Hunger (Direct/Indirect) */}
                        <SDGCard
                            number={2}
                            title="Hambre Cero"
                            metric="Alta"
                            unit="Calidad"
                            color="text-yellow-400"
                            bgColor="bg-[#DDA63A]"
                            description="Producción de proteína sostenible para animal feed."
                        />
                    </div>
                </div>

                {/* KPI Chart Placeholder or Certification */}
                {/*@ts-ignore*/}
                {plant.verified && (
                    <div className="bg-slate-800/30 border border-dashed border-slate-700 p-4 rounded text-center">
                        <div className="text-xs text-slate-500 mb-2">VERIFICACIÓN ON-CHAIN</div>
                        <div className="font-mono text-[10px] text-green-500 break-all bg-black/30 p-2 rounded">
                            {/*@ts-ignore*/}
                            {plant.blockchain_hash || "0x94c0...a1b2 (Simulado)"}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
