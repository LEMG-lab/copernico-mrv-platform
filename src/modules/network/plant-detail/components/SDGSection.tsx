import React, { useState } from 'react';
import { PlantDetail, SDGContribution } from '../types/plantDetail.types';
import { SDG_DATA } from '../data/sdgData';
import { SDGCard } from './SDGCard';
import { SDGDetailModal } from './SDGDetailModal';
import { Globe, ArrowUpRight } from 'lucide-react';

interface SDGSectionProps {
    plant: PlantDetail;
}

export const SDGSection: React.FC<SDGSectionProps> = ({ plant }) => {
    const [selectedSDG, setSelectedSDG] = useState<SDGContribution | null>(null);

    const primarySDGs = plant.sdg_contributions.filter(s => s.is_primary);
    const secondarySDGs = plant.sdg_contributions.filter(s => !s.is_primary);

    return (
        <section className="mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Globe className="w-6 h-6 text-blue-500" />
                        Contribución a los ODS
                    </h2>
                    <p className="text-slate-400 max-w-2xl">
                        LarvaLINK contribuye directamente a 15 de los 17 Objetivos de Desarrollo Sostenible de la ONU.
                        Esta alineación es verificable y rastreable a través de nuestra capa blockchain TrackLINK.
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-3">
                        <span className="text-slate-400 text-sm">Impacto Total:</span>
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-bold text-white">15</span>
                            <span className="text-slate-500 text-sm mr-2">/ 17 ODS</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Primary SDGs - Detailed Cards */}
            <div className="mb-10">
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    ODS Primarios (Impacto Directo)
                </h3>
                <div className="space-y-4">
                    {primarySDGs.map(sdg => (
                        <SDGCard
                            key={sdg.sdg_number}
                            sdg={sdg}
                            sdgMeta={SDG_DATA[sdg.sdg_number]}
                            isExpandedDefault={sdg.sdg_number === 12} // Default open Responsible Consumption
                        />
                    ))}
                </div>
            </div>

            {/* Secondary SDGs - Compact Grid */}
            <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                    ODS Secundarios (Click para ver impacto)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                    {secondarySDGs.map(sdg => {
                        const meta = SDG_DATA[sdg.sdg_number];
                        return (
                            <div
                                key={sdg.sdg_number}
                                onClick={() => setSelectedSDG(sdg)}
                                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-3 flex flex-col items-center text-center transition-all group cursor-pointer relative overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-blue-900/20"
                                title={`Ver impacto en ${meta.name}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div
                                    className="w-8 h-8 rounded mb-2 flex items-center justify-center text-white font-bold text-sm shadow-sm z-10"
                                    style={{ backgroundColor: meta.color }}
                                >
                                    {meta.number}
                                </div>
                                <span className="text-xs text-slate-400 group-hover:text-white transition-colors z-10 line-clamp-2">
                                    {meta.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal */}
            {selectedSDG && (
                <SDGDetailModal
                    sdg={selectedSDG}
                    onClose={() => setSelectedSDG(null)}
                />
            )}
        </section>
    );
};
