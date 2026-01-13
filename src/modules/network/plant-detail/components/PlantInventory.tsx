import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { Package, Scale, ArrowRight } from 'lucide-react';

export const PlantInventory: React.FC<{ plant: PlantDetail }> = ({ plant }) => {
    if (!plant.inventory) return null;

    const feedstockPercentage = (plant.inventory.feedstock_tons / plant.inventory.feedstock_capacity) * 100;
    const feedstockColor = feedstockPercentage > 80 ? 'bg-red-500' : feedstockPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500';

    return (
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                Estado de Inventario y Producción
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Inputs: Feedstock */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Materia Prima (Inputs)</h3>

                    <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700 relative overflow-hidden">
                        <div className="flex justify-between items-end mb-2 relative z-10">
                            <div>
                                <div className="text-sm text-slate-400 mb-1">Residuos Orgánicos</div>
                                <div className="text-3xl font-black text-white">{plant.inventory.feedstock_tons} <span className="text-lg font-normal text-slate-500">t</span></div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-500">Capacidad</div>
                                <div className="text-sm font-bold text-slate-300">{plant.inventory.feedstock_capacity} t</div>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden relative z-10">
                            <div
                                className={`h-full ${feedstockColor} transition-all duration-500`}
                                style={{ width: `${feedstockPercentage}%` }}
                            />
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute right-0 top-0 opacity-5">
                            <Scale className="w-32 h-32" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-900/30 p-3 rounded-lg border border-slate-800">
                            <div className="text-xs text-slate-500">Próxima Entrega</div>
                            <div className="font-bold text-white">Mañana, 08:00</div>
                        </div>
                        <div className="bg-slate-900/30 p-3 rounded-lg border border-slate-800">
                            <div className="text-xs text-slate-500">Proveedor Principal</div>
                            <div className="font-bold text-white">Central de Abastos</div>
                        </div>
                    </div>
                </div>

                {/* Bioconversion Process */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">En Proceso (Bioconversion)</h3>

                    <div className="space-y-3">
                        {/* Larvae Stages */}
                        {[
                            { label: 'Larva Neonata (Stage 1)', val: plant.inventory.larvae_stage_1_kg, max: 500, color: 'bg-emerald-500' },
                            { label: 'Larva Crecimiento (Stage 2)', val: plant.inventory.larvae_stage_2_kg, max: 2500, color: 'bg-emerald-400' },
                            { label: 'Larva Madura (Stage 3)', val: plant.inventory.larvae_stage_3_kg, max: 6000, color: 'bg-emerald-300' },
                        ].map((stage, i) => (
                            <div key={i} className="bg-slate-900/30 p-3 rounded-lg border border-slate-800">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">{stage.label}</span>
                                    <span className="font-mono text-emerald-400">{stage.val} kg</span>
                                </div>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${stage.color}`}
                                        style={{ width: `${(stage.val / stage.max) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Outputs */}
            <div className="mt-8 pt-6 border-t border-slate-700">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Productos Listos (Outputs)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border border-amber-700/30 p-4 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-amber-200 text-sm font-bold">Frass (Biofertilizante)</div>
                            <div className="text-2xl font-black text-white">{plant.inventory.frass_tons} <span className="text-sm font-normal text-amber-200/50">toneladas</span></div>
                        </div>
                        <div className="bg-amber-500/20 p-2 rounded-lg">
                            <span className="text-xl">🍂</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-700/30 p-4 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-blue-200 text-sm font-bold">Harina y Aceite</div>
                            <div className="text-2xl font-black text-white">{plant.inventory.product_ready_tons} <span className="text-sm font-normal text-blue-200/50">toneladas</span></div>
                        </div>
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <span className="text-xl">📦</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
