import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { KPICard } from './KPICard';
import { Leaf, Wind, Trash2, Droplets, Trees, Car, Orbit } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

interface EnvironmentalImpactProps {
    plant: PlantDetail;
}

export const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({ plant }) => {
    const { environmental_impact } = plant;

    return (
        <section className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8">
            <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1 text-xs font-bold text-blue-400">
                    <Orbit className="w-3.5 h-3.5" />
                    MRV Satelital Verificado
                </div>
            </div>

            <div className="mb-8 relative z-10">
                <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-500" />
                    Impacto Ambiental Verificado
                </h2>
                <p className="text-slate-400 text-sm">Validado mediante MRV Digital y Blockchain</p>
            </div>

            {/* Core Enviro Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Leaf className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-slate-400 text-xs font-bold uppercase">CO2eq Evitado</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {formatNumber(environmental_impact.co2eq_avoided_tons)} <span className="text-lg text-slate-500">t</span>
                    </div>
                    <div className="text-xs text-green-400 font-medium">↑ 18% vs periodo anterior</div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-slate-500/20 rounded-lg">
                            <Wind className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="text-slate-400 text-xs font-bold uppercase">Metano Reducido</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {formatNumber(environmental_impact.methane_avoided_kg)} <span className="text-lg text-slate-500">kg</span>
                    </div>
                    <div className="text-xs text-slate-500">Potencial calórico 28x vs CO2</div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                            <Trash2 className="w-5 h-5 text-orange-400" />
                        </div>
                        <span className="text-slate-400 text-xs font-bold uppercase">Residuos Desviados</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {formatNumber(environmental_impact.waste_diverted_tons)} <span className="text-lg text-slate-500">t</span>
                    </div>
                    <div className="text-xs text-slate-500">De rellenos sanitarios</div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Droplets className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-slate-400 text-xs font-bold uppercase">Agua Ahorrada</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {formatNumber(environmental_impact.water_saved_m3)} <span className="text-lg text-slate-500">m³</span>
                    </div>
                    <div className="text-xs text-slate-500">Vs. proteína convencional</div>
                </div>
            </div>

            {/* Equivalencies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 flex items-center gap-4">
                    <div className="p-3 bg-green-500/20 rounded-full">
                        <Trees className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{formatNumber(environmental_impact.trees_equivalent)}</div>
                        <div className="text-sm text-green-200/70">Árboles plantados equivalentes</div>
                    </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                        <Car className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{formatNumber(environmental_impact.cars_off_road_equivalent)}</div>
                        <div className="text-sm text-blue-200/70">Autos retirados de circulación</div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </section>
    );
};
